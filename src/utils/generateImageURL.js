import axios from "axios";

const generateImageURL = async (image) => {
  const file = new FormData();
  file.append("file", image);

  // Replace the Cloudinary URL with your own Express backend endpoint
  const { data } = await axios.post(
    `http://localhost:5000/upload`, // Backend URL
    file,
    {
      headers: {
        "Content-Type": "multipart/form-data", // Ensure file is sent as form data
      },
    }
  );
  return data;
};

export default generateImageURL;
