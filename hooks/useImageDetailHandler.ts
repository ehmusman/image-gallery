import { useEffect, useState } from "react"
import { toast } from "react-toastify"

interface IComment {
    id: string;
    text: string
  }
interface IImage {
    image: string;
    id: string;
    comments: IComment[];
  }

export default function useImageDetailHandler(id: string){
    const [isUploading, setIsUploading] = useState(false)
    const [image, setImage] = useState<IImage | null>(null)
    const [isError, setIsError] = useState(false)
  
    // Comment Adding Handler
    const addComment = async (text: string) => {
      try {
        setIsUploading(true)
        const reqBody = { text, id }
        const response = await fetch('/api/comment', {
          method: "post",
          body: JSON.stringify(reqBody),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
        if (response.status !== 400) {
          setIsUploading(false)
          setImage(data.data)
          toast.success(data.message)
        } else {
          setIsUploading(false)
          toast.error(data.message)
          console.log("error", data.message)
        }
      } catch (error: any) {
        setIsUploading(false)
        toast.error(error.message)
        console.log("error", error)
      }
    }
  
  
    // Getting Single Image Data Handler
    const handleSingleImage = async (id: string | string[]) => {
      try {
        const response = await fetch('/api/' + id)
        const data = await response.json()
        if (response.status !== 400) {
          setImage(data.image)
        } else {
          toast.error(data.message)
          setIsError(true)
        }
      } catch (error) {
        setIsError(true)
      }
    }

    // Add Comment Handler with State Manager
    const handleAddComment = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const commentText = event.currentTarget.comment.value;
        if (commentText) {
          addComment(commentText);
          event.currentTarget.comment.value = ""
        }
      };

    //   Fetching Image Details On Changing Image ID
    useEffect(() => {
      if (id) {
        handleSingleImage(id)
      }
    }, [id])
  return {
    image,
    isError,
    isUploading,
    handleAddComment,

  }
} 