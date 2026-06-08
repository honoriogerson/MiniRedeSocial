import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet
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
import { buscarPosts }
from '../src/services/api'

//importar o componente para exibir um post
import PostCard
from '../src/components/PostCard'

export default function Home() {

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  async function carregarPosts() {

    try {

      const dados =
        await buscarPosts()

      console.log(dados)

      setPosts(dados)

    } catch (error) {

      console.log(error)

    } finally {

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

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Mini Rede Social
      </Text>

      <Text style={styles.contador}>
        Total: {posts.length}
      </Text>

      <FlatList
        data={posts}
        keyExtractor={(item) =>
          item.id.toString()
        }
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

  contador: {
    marginBottom: 20,
    fontSize: 16
  }

})