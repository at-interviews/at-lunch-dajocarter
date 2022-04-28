import { NextApiRequest, NextApiResponse } from "next"

export default async function handler (request: NextApiRequest, response: NextApiResponse) {
  const photoId = request.query.id
  console.log(`REQUESTING PHOTO FROM REFERENCE "${photoId}"`)
  const photoResponse = await fetch(`https://maps.googleapis.com/maps/api/place/photo?photo_reference=${photoId}&maxwidth=64&maxheight=64&key=${process.env.NEXT_PUBLIC_GMAPS_API_KEY}`)
  if (!photoResponse.url) {
    return response.status(404).json({ url: '' })
  }
  return response.json({url: photoResponse.url})
}