export const calculateDateAgo = (daysAgo) => {
  const dateAgo = new Date();
  dateAgo.setDate(dateAgo.getDate() - daysAgo);
  return dateAgo.toISOString().split("T")[0]; // Retorna a data no formato YYYY-MM-DD
};
