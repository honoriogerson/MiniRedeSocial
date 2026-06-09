import {
  View,
  Text,
  Pressable,
  StyleSheet
} from 'react-native'

//componente para exibir um post
//recebe o post e a função onPress como props (propriedades)
export default function PostCard({post,onPress}) 
{
  return (

    <Pressable
      style={styles.card}
      onPress={onPress}
    >

      <Text style={styles.titulo}>
        {post.title}
      </Text>

      <Text
        numberOfLines={1}
        style={styles.texto}
      >
        {post.body}
      </Text>

    </Pressable>
  )
}

const styles = StyleSheet.create({

  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    backgroundColor: 'lightgray'
  },

  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },

  texto: {
    color: '#666'
  }

})