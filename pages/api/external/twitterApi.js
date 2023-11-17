import axios from "axios";
import { handleError } from "../../../utils/errorHandler";
import { twitterConfig } from "./twitterConfig";

export default async function getTweetsHandler() {
  const { basePath, bearerToken, username } = twitterConfig;

  const apiUrl = `${basePath}/tweets/search/recent?query=from:${username}&tweet.fields=text,created_at`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    if (response.status === 200) {
      handleTwitterResponse(res, response.data);
    } else {
      throw new Error(response.data.errors[0].detail);
    }
  } catch (error) {
    handleError(res, error.message);
  }
}

const handleTwitterResponse = (res, data) => {
  const formattedData = {
    data: data.data.map((user) => ({
      created_at: user.created_at,
      id: user.id,
      name: user.name,
      username: user.username,
    })),
    includes: {
      tweets:
        data.includes?.tweets.map((tweet) => ({
          author_id: tweet.author_id,
          created_at: tweet.created_at,
          id: tweet.id,
          text: tweet.text,
        })) || [],
    },
  };

  res.status(200).json(formattedData);
};
