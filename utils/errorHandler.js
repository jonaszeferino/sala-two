export const handleError = (res, errorMessage) => {
  res.status(500).json({ error: errorMessage });
};

export const handleNewsResponse = (res, newsApiResponse) => {
  if (newsApiResponse.status === "ok") {
    const newsArticles = newsApiResponse.articles;
    res.status(200).json(newsArticles);
  } else {
    handleError(res, "Erro na consulta à NewsAPI");
  }
};
