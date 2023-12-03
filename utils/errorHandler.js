export const handleError = (res, errorMessage) => {
  res.status(500).json({ error: errorMessage });
};
