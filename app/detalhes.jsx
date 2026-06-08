import {
  View,
  Text,
  Pressable,
  StyleSheet
} from 'react-native'

import {
  router,
  useLocalSearchParams
} from 'expo-router'

export default function Detalhes() {

  const {
    title,
    body
  } = useLocalSearchParams()

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        {title}
      </Text>

      <Text style={styles.texto}>
        {body}
      </Text>

      <Pressable
        style={styles.botao}
        onPress={() => router.back()}
      >

        <Text style={styles.textoBotao}>
          Voltar
        </Text>

      </Pressable>

    </View>

  )

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },

  texto: {
    fontSize: 18,
    lineHeight: 28
  },

  botao: {
    backgroundColor: '#f34121',
    marginTop: 30,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },

  textoBotao: {
    color: '#FFF',
    fontWeight: 'bold'
  }

})