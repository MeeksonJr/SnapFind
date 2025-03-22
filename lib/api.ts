export async function analyzeImage(imageData: string): Promise<any> {
  try {
    // Remove the data URL prefix to get just the base64 data
    let base64Data = imageData

    // Check if the image data has a data URL prefix and remove it
    if (base64Data.startsWith("data:")) {
      base64Data = base64Data.split(",")[1]
    }

    // Call the API route
    const response = await fetch("/api/analyze-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: base64Data }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `API error: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error analyzing image:", error)
    throw error
  }
}

