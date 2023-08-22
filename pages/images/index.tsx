import React from 'react'
import { extractFilePath } from '../api/image'
import { readFileSync } from 'fs'
import ImageCard from '../../components/ImageCard';
import { useRouter } from 'next/router';
import { SimpleGrid } from '@chakra-ui/react';
import Loader from '../../components/Loader';
import ImageWithFallback from '../../components/ImageWithFallback';

interface IComment {
  id: string;
  text: string
}
interface IImage {
  image: string;
  id: string;
  comments: IComment[];
}
interface IImages {
  images: IImage[],
  error: boolean
}


const Images: React.FC<IImages> = ({ images, error }) => {
  const router = useRouter()

  // Routing Image to Detailed Page
  const handleImageRoute = (id: string) => {
    router.push("/images/" + id)
  }

  // Loader If Images are not present
  if (!images.length && !error) return <Loader />

  // Not Found Error in the case of Error
  if (error) return <ImageWithFallback
    alt='Images Not Found'
    fallbackText='Images Not Found'
    src='/notfound.jpg'
  />

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4}>
      {images?.map((image: IImage) =>
        <ImageCard
          key={image.id}
          buttonText='Explore'
          imageUrl={image.image}
          id={image.id}
          onButtonClick={handleImageRoute}
        />
      )}
    </SimpleGrid>
  )
}

export default Images

// Getting Server Side Props
export async function getServerSideProps() {
  const filePath = extractFilePath()
  const data: any = readFileSync(filePath)
  const images = JSON.parse(data)
  return {
    props: {
      images,
      error: !images.length ? true : false
    }
  }
}