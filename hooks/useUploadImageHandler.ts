import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

export default function useUploadImageHandler() {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false)
    const router = useRouter()
    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);

            // Create a FileReader to read the selected image as a data URL (Base64-encoded)
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64Result = event.target?.result as string;
                setPreviewImage(base64Result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async () => {
        try {
            setIsUploading(true)
            const reqBody = { image: previewImage }

            const response = await fetch('/api/image', {
                method: "post",
                body: JSON.stringify(reqBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            console.log("dataaaaaa", data)
            if (response.status == 201) {
                setIsUploading(false)
                toast.success(data.message)
                // Reset the state after successful upload
                setSelectedImage(null);
                setPreviewImage(null);
                setTimeout(() => {
                    router.push("/images")
                }, 3000)
            } else {
                setIsUploading(false)
                toast.error(data.message)
            }

        } catch (error: any) {
            console.log("error", error)
            toast.error(error.message)

        }
    };

    return {
        previewImage,
        selectedImage,
        isUploading,
        handleUpload,
        handleImageSelect
    }
}