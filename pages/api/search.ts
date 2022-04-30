import { NextApiRequest, NextApiResponse } from "next"
import { Restaurant } from "../index"

export default async function handler (request: NextApiRequest, response: NextApiResponse) {
  const searchQuery = request.query.keyword
  const location = request.query.location
  console.log(`SEARCHING FOR "${searchQuery}" IN ${location}`)

  const resp = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=500&type=restaurant&keyword=${searchQuery}&key=${process.env.NEXT_PUBLIC_GMAPS_API_KEY}`)

  const data = await resp.json()

  const results = await Promise.all(data.results.map(async (place: Restaurant): Promise<Restaurant> => {
    if (!place?.photos?.length) return place

    const photoId = place.photos[0].photo_reference
    const photoResponse = await fetch(`https://maps.googleapis.com/maps/api/place/photo?photo_reference=${photoId}&maxwidth=64&maxheight=64&key=${process.env.NEXT_PUBLIC_GMAPS_API_KEY}`)

    place.photo_url = photoResponse.url
    return place
  }))

  return response.json(results)
}