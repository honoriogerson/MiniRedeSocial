//url api 
const URL =  'https://jsonplaceholder.typicode.com/posts'

//função para buscar os posts da api
export async function buscarPosts() {

  const response = await fetch(URL)

  //verificar se a resposta foi bem sucedida
  if (!response.ok) {
    throw new Error('Erro ao buscar os posts')
  }

  //converter a resposta para json
  const dados = await response.json()

  //retornar os dados
  return dados

}