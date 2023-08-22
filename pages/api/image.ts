import fs from "fs"
import path from "path"
import { v2 as cloudinary } from "cloudinary"
import { NextApiRequest, NextApiResponse } from "next"


// Extracting Absolute Path to save Data in a file
export function extractFilePath(): string {
  return path.join(process.cwd(), 'data', 'images.json')
}
// Reading File on the base of absolute path
export function readFileSync(filePath: any): Buffer {
  return fs.readFileSync(filePath)
}

// Handler function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Cloudinary Configuration to store images on cloudinary
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  })

  if (req.method === "POST") {
    try {

      // Getting image from body
      const { image } = req.body

      // validating if image exists or not
      if (!image) return res.status(400).send({ message: "Image is required" })

      // Uploading Base64 Image to Cloudinary in qode folder
      const result = await cloudinary.uploader.upload(image, {
        folder: "qode"
      });

      // Creating New Image Object that will be saved in JSON file
      const newImage = {
        id: Math.floor(Date.now() * Math.random() * 10000000),
        image: result.secure_url,
        comments: []
      }

      // Extracting Path of DB file
      const filePath = extractFilePath()

      // Reading File content Synchronously
      const readFile = readFileSync(filePath)

      // Parsing the Data for further business logic
      const data: any[] = JSON.parse(readFile.toString())

      // Adding new image to existing data
      data.push(newImage)

      // Writing file synchronously to save new data in file
      fs.writeFileSync(filePath, JSON.stringify(data))

      // Sending Status to frontend
      res.status(201).send({ message: "image is added", data: newImage })
    } catch (error: any) {
      res.status(400).send({ message: error.message })

    }
  }
  // Get Route to Gel all the Images and Comments
  if (req.method === "GET") {
    // Extracting Absolute path of file
    const filePath = extractFilePath()

    // Reading content of file
    const readFile: any = readFileSync(filePath)
    
    // Parsing Data
    const data = JSON.parse(readFile)

    // Sending Response to frontend
    res.status(200).send(data)
  }
}
