import axios from "axios";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const { APIKEY } = process.env;

export default async function (
  request: VercelRequest,
  response: VercelResponse
) {
  const { data: responseValue } = await axios.get("https://omdbapi.com", {
    params: { apikey: APIKEY, ...request.query }
  });
  response.status(200).json(responseValue);
}
