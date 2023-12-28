import client from '../../mongoConnection';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  await client.connect();

  const collection = client.db('sala').collection('games');

  try {
    const games = await collection
      .aggregate([
        {
          $lookup: {
            from: 'clubs',
            localField: 'home_club', // ajustado para corresponder ao campo correto
            foreignField: 'club_name',
            as: 'homeClubData',
          },
        },
        {
          $unwind: {
            path: '$homeClubData',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'clubs',
            localField: 'away_club', // ajustado para corresponder ao campo correto
            foreignField: 'club_name',
            as: 'awayClubData',
          },
        },
        {
          $unwind: {
            path: '$awayClubData',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 1,
            date: 1, // Adicionando o campo date
            home_club: 1,
            away_club: 1,
            homeClubData: '$homeClubData.logo_name',
            awayClubData: '$awayClubData.logo_name',
            championship: 1,
            final_result_away: 1,
            final_result_home: 1,
            game_id: 1,
            round: 1,
          },
        },
      ])
      .toArray();

    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
