export default {
  name: 'article',
  type: 'document',
  title: 'Crônica',
  fields: [
    {
      title: 'Título',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Texto',
      name: 'body',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Imagem',
      name: 'image',
      type: 'image',
    },
    {
      title: 'Data',
      name: 'date',
      type: 'date',
    },
    {
      title: 'Autor',
      name: 'author',
      type: 'reference',
      to: [{ type: 'author' }],
    },
  ],
};
