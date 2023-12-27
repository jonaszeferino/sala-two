import NewsAPI from 'newsapi';
import { handleError } from '../../../utils/errorHandler';
import { calculateDateAgo } from '../../../utils/date';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    handleError(res, 'Method Not Allowed');
    return;
  }

  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;

  if (!apiKey) {
    handleError(res, 'Chave da API não configurada corretamente');
    return;
  }

  try {
    const newsApiResponse = await fetchNews(apiKey);
    res.status(200).json(translateNews(newsApiResponse));
  } catch (error) {
    handleError(res, error.message);
  }
}

const fetchNews = async (apiKey) => {
  const newsapi = new NewsAPI(apiKey);
  const queryOptions = {
    q: '"Grêmio" OR ( "Inter" NOT Miami NOT Milão NOT inter-raciais NOT banco inter NOT FMI NOT Polícia NOT CHAMPIONS)',
    // deveria funcionar assim pela lógica:
    //q: '"Grêmio" OR ("Inter" AND (time OR torcida OR campo OR técnico OR jogadores OR treino OR sócio OR dirigentes OR bola))',

    searchIn: 'description',
    excludeDomains: 'ig.com.br,conjur.com.br',
    language: 'pt',
    sortBy: 'publishedAt',
    from: calculateDateAgo(7),
    to: calculateDateAgo(0),
  };
  const headers = { 'X-No-Cache': true };
  const response = await newsapi.v2.everything(queryOptions, headers);

  if (response.status === 'error') {
    throw new Error(response.message);
  }

  return response;
};

// takes the return from API, add if it's a Grêmio or Inter news
// and sort it so there's a mix of both teams
const translateNews = (newsFromApi) => {
  const news = newsFromApi.articles.map((article) => {
    const { title, description } = article;

    const team =
      title?.includes('Grêmio') || description?.includes('Grêmio')
        ? 'Grêmio'
        : 'Inter';

    return {
      ...article,
      team,
    };
  });

  const filteredNews = news.filter((article) => article.title !== '[Removed]');
  const gremioNews = filteredNews.filter((article) => article.team === 'Grêmio');
  const interNews = filteredNews.filter((article) => article.team === 'Inter');
  
    const minLength = Math.min(gremioNews.length, interNews.length);

  const translatedNews = [];

  for (let i = 0; i < minLength; i++) {
    translatedNews.push(gremioNews[i], interNews[i]);
  }

  return translatedNews;
};
