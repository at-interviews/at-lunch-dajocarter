import { NextApiRequest, NextApiResponse } from "next"

export default async function handler (request: NextApiRequest, response: NextApiResponse) {
  const searchQuery = request.query.keyword
  const location = request.query.location
  console.log(`SEARCHING FOR "${searchQuery}" IN ${location}`)
  const resp = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=500&type=restaurant&keyword=${searchQuery}&key=${process.env.NEXT_PUBLIC_GMAPS_API_KEY}`)
  const data = await resp.json()
  return response.json(data.results)
}