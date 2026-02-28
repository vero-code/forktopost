export async function uploadToImgBB(apiKey: string, base64Image: string): Promise<string> {
  // Remove the data URI prefix if it exists
  const imageData = base64Image.replace(/^data:image\/\w+;base64,/, "");
  
  const formData = new FormData();
  formData.append("image", imageData);

  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to upload image to ImgBB");
    }

    const result = await response.json();
    return result.data.url;
  } catch (error) {
    console.error("ImgBB upload error:", error);
    throw error;
  }
}
