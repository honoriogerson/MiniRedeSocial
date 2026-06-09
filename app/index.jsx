
//activity indicator para mostrar um carregamento
//enquanto os posts são buscados
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet, 
  TextInput
} from 'react-native'

//importar a função para buscar os posts da api
//useEffect para carregar os posts quando o componente for montado
//useState para armazenar os posts e o estado de carregamento
import {
  useEffect,
  useState
} from 'react'

import { router } from 'expo-router'

//importar a função para buscar os posts da api
import { buscarPosts }from '../src/services/api'

//importar o componente para exibir um post
import PostCard from '../src/components/PostCard'

export default function Home() {

  //estado com quando abrimos a tela, os posts ainda não foram carregados
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [busca, setBusca] = useState('')

  async function carregarPosts() {

    try {

      //service para buscar os posts da api
      const dados = await buscarPosts()

      console.log(dados)

      //setPosts(dados)
      setPosts(dados.slice(0, 20)) 

    } catch (error) {

      console.log(error)

    } finally {

      //independente se deu certo ou deu erro, 
      //o carregamento terminou
      setLoading(false)

    }

  }

  useEffect(() => {carregarPosts()}, [])

  if (loading) {
    return (
      <View style={styles.loading}>

        <ActivityIndicator
          size="large"
        />

        <Text>
          Carregando...
        </Text>

      </View>
    )
  }
  
  //filtrar os posts pelo título, usando o estado de busca
  const postsFiltrados = posts.filter(post =>
    post.title.toLowerCase().includes(
      busca.toLowerCase()
    )
  )

  return (
    <View style={styles.container}>

      <Text style={styles.pesquisa}>
              Pesquise por um post usando o título
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Pesquisar post..."
        value={busca}
        onChangeText={setBusca}
      />

      <Text style={styles.titulo}>
        Mini Rede Social
      </Text>

      <Text style={styles.contador}>
        Total: {posts.length}
      </Text>

      <Text style={styles.contador}>
        Post Filtrados: {postsFiltrados.length}
      </Text>

      <FlatList
        data={postsFiltrados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (

          <PostCard
            post={item}
            onPress={() =>
              router.push({
                pathname: '/detalhes',
                params: {
                  title: item.title,
                  body: item.body
                }
              })
            }
          />
        )}
      />

    </View>

  )

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    marginTop: 50
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10
  },

  pesquisa: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },

  contador: {
    marginBottom: 20,
    fontSize: 16
  }, 

  input: {
  borderWidth: 1,
  borderColor: '#ccc',
  padding: 12,
  borderRadius: 10,
  marginBottom: 15
},

})