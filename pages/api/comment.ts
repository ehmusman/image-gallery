// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs"
import { NextApiRequest, NextApiResponse } from "next"
import path from "path"

export function extractFilePath(): string {
  return path.join(process.cwd(), 'data', 'images.json')
}
export function readFileSync(filePath: any): Buffer {
  return fs.readFileSync(filePath)
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  // POST Route
  if (req.method === "POST") {
    try {
      // Getting Image ID and comment Text from Request
      const { text, id } = req.body

      // Validating If Image and Id exists in Body or not
      if (!text || !id) return res.status(400).send({ message: "Text and Id is required" })

      // Creating the Comment Structure that'll be save in File
      const comment = {
        text,
        id: Math.floor(Date.now() * Math.random() * 10000000)
      }

      // Extracting Path of File for saving Comment
      const filePath = extractFilePath()

      // Reading Image File
      const readFile = readFileSync(filePath)

      // Parsing the Data for further Business Logic
      const images = JSON.parse(readFile.toString())


      // Checking if Image with this ID Exists or Not
      let selectedImage = images.find((image: any) => image.id == id)
      if (!selectedImage) {
        return res.status(400).send({ message: "Image is not found" })
      }

      // Updating the Parsed Date to add the New Comment 
      let newData = images.map((image: any) => image.id == id ? { ...image, comments: [...image.comments, comment] } : image)

      // Saving File 
      fs.writeFileSync(filePath, JSON.stringify(newData))

      // Sending Response to Frontend
      res.status(201).send({ message: "comment is added", data: { ...selectedImage, comments: [...selectedImage.comments, comment] } })

    } catch (error: any) {
      // Server Error
      res.status(500).send({ message: error.message })
    }
  }
}
