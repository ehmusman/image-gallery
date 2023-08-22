import React from 'react'
import { useRouter } from 'next/router'
import ImageDetail from '../../components/ImageDetail'
import Loader from '../../components/Loader'


const Image = () => {
  const { query: { id } } = useRouter()

  if(!id) return <Loader />
  return (
    <>
      <ImageDetail id={id}/>
    </>
  )
}

export default Image
