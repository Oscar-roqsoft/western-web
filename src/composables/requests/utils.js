import { useStore } from "@/stores";
import { baseURL } from "@/composables/configs";
import imageCompression from "browser-image-compression"


export const uploadImg = async (file) => {
    if (!file) {
        throw new Error('No file provided for upload');
    }

    const option = {
            maxSizeMB: 1,            // compress to 1MB
            maxWidthOrHeight: 800,   // resize
            useWebWorker: true
        }
        
    const compressedFile = await imageCompression(file, option)

    const formData = new FormData();
    formData.append('image', compressedFile);

    const pinia = useStore();
    const token = pinia.state.user?.token;

    if (!token) {
        throw new Error('No access token available');
    }

    const url = `${baseURL}/upload`; // Ensure correct endpoint
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
            // Remove 'Content-Type' header - let fetch handle it
        },
        body: formData
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const text = await response.text(); // Get raw response for debugging
            console.error('Server response:', text);
            throw new Error(`Upload failed with status ${response.status}: ${text}`);
        }

        const data = await response.json();
        return data; // Return the image URL from the response
    } catch (error) {
        console.error('Upload error:', error);
        throw error; // Re-throw to handle in the calling function
    }
};



// export const uploadImage = async (file) => {

//   const options = {
//     maxSizeMB: 1,            // compress to 1MB
//     maxWidthOrHeight: 800,   // resize
//     useWebWorker: true
//   }

//   const compressedFile = await imageCompression(file, options)

//   const formData = new FormData()
//   formData.append("file", compressedFile)
//   formData.append("upload_preset", "crypto_unsigned")

//   const res = await fetch(
//     "https://api.cloudinary.com/v1_1/oscar2020/image/upload",
//     {
//       method: "POST",
//       body: formData
//     }
//   )

//   const data = await res.json()

//   return data.secure_url
// }
