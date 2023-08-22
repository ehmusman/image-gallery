import { NextApiRequest, NextApiResponse } from "next"
import { extractFilePath, readFileSync } from "./image"
function handler(req: NextApiRequest, res: NextApiResponse) {
    // GET Request Route
    if (req.method === "GET") {

        try {

            //  Getting Image Id from Query Param
            const imageId = req.query.id

            // Extracting Path of File
            const filePath = extractFilePath()

            // Reading File Sync
            const data = readFileSync(filePath)

            // Parsing Data for further logic
            const images = JSON.parse(data.toString())

            const selectedImage = images.find((image: any) => image.id == imageId)

            // Checkiong if Image with same ID Exists or Not
            if (!selectedImage) {
                return res.status(400).send({ message: "Image is not found" })
            }

            // Sending Response to User
            return res.status(200).send({ image: selectedImage })

        } catch (error: any) {
            return res.status(500).send({ message: error.message })

        }
    }
}

export default handler;