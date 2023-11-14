import NewsAPI from 'newsapi'
import { handleError, handleNewsResponse } from '../../../utils/errorHandler'
import { calculateDateAgo } from '../../../utils/date'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    handleError(res, 'Method Not Allowed')
    return
  }

  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY

  if (!apiKey) {
    handleError(res, 'Chave da API não configurada corretamente')
    return
  }

  try {
    const newsApiResponse = await fetchNews(apiKey)
    handleNewsResponse(res, newsApiResponse)
  } catch (error) {
    handleError(res, error.message)
  }
}

const fetchNews = async (apiKey) => {
  const newsapi = new NewsAPI(apiKey)

  try {
    const queryOptions = {
      q: 'Grêmio OR Inter',
      language: 'pt',
      sortBy: 'relevancy',
      domains:
        'clicrbs.com.br, ge.globo.com/rs/futebol/times/gremio/, ge.globo.com/rs/futebol/times/internacional/',
      from: calculateDateAgo(21),
      to: calculateDateAgo(0),
    }
    return await newsapi.v2.everything(queryOptions)
  } catch (error) {
    throw new Error(`Erro na consulta à NewsAPI: ${error.message}`)
  }
}
