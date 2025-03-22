import { type NextRequest, NextResponse } from "next/server"
import type { Product } from "@/lib/types"
import { generateProductDetails } from "@/lib/gemini"

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json()

    if (!image) {
      return NextResponse.json({ error: "No image data provided" }, { status: 400 })
    }

    console.log("Received image data, length:", image.length)

    try {
      // Step 1: Use Hugging Face API for image analysis
      const analysisResult = await analyzeWithHuggingFace(image)
      console.log("Hugging Face API response:", JSON.stringify(analysisResult).slice(0, 200) + "...")

      // Step 2: Extract the top prediction
      const topPrediction = analysisResult[0] || { label: "unknown", score: 0 }
      console.log("Top prediction:", topPrediction)

      // Step 3: Use our enhanced product details generator
      const productDetails = await generateProductDetails(topPrediction.label, image)

      return NextResponse.json({
        product: productDetails,
        detectedObject: topPrediction.label,
      })
    } catch (error: any) {
      console.error("API processing error:", error)

      // Use fallback if API fails
      console.log("Using fallback product information")
      const fallbackProduct = await getProductInformationFallback()

      return NextResponse.json({
        product: fallbackProduct,
        warning: "Using demo data. The image analysis API encountered an error.",
      })
    }
  } catch (error) {
    console.error("Error in analyze-image API:", error)
    return NextResponse.json({ error: "Failed to analyze image" }, { status: 500 })
  }
}

async function analyzeWithHuggingFace(imageBase64: string) {
  try {
    console.log("Using Hugging Face API for image analysis...")

    // Get the Hugging Face token
    const hfToken = process.env.HUGGING_FACE_TOKEN

    if (!hfToken) {
      throw new Error("Hugging Face token is not configured")
    }

    // Convert base64 to buffer for the API request
    const imageBuffer = Buffer.from(imageBase64, "base64")

    // Use the Hugging Face image classification model
    const response = await fetch("https://api-inference.huggingface.co/models/google/vit-base-patch16-224", {
      headers: {
        Authorization: `Bearer ${hfToken}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: imageBuffer,
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Hugging Face API error response:", errorText)
      throw new Error(`Hugging Face API error: ${response.status} - ${errorText}`)
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error("Error using Hugging Face API:", error)
    throw error
  }
}

async function getProductInformationFallback(): Promise<Product> {
  // Create a generic product as fallback
  return {
    id: Date.now().toString(),
    title: "Smart Device",
    description:
      "A versatile smart device with excellent features and design. Perfect for everyday use and built to last.",
    categories: ["Electronics", "Gadgets", "Technology"],
    pros: ["High quality materials", "Excellent durability", "Great value for money", "Stylish design"],
    cons: ["May be more expensive than alternatives", "Limited color options", "Requires occasional maintenance"],
    specifications: {
      Brand: "Premium Brand",
      Material: "High-grade materials",
      Dimensions: "10 x 15 x 5 inches",
      Weight: "1.2 lbs",
      Warranty: "2 years",
    },
    relatedItems: [
      {
        id: "1",
        title: "Premium Smart Device",
        description: "A higher-end version with additional features.",
        price: "$129.99",
        imageUrl: "/placeholder.svg?height=150&width=250",
      },
      {
        id: "2",
        title: "Smart Device Lite",
        description: "A more affordable version.",
        price: "$79.99",
        imageUrl: "/placeholder.svg?height=150&width=250",
      },
      {
        id: "3",
        title: "Smart Device Pro",
        description: "Professional-grade for serious users.",
        price: "$199.99",
        imageUrl: "/placeholder.svg?height=150&width=250",
      },
      {
        id: "4",
        title: "Smart Device Accessories",
        description: "Essential accessories.",
        price: "$49.99",
        imageUrl: "/placeholder.svg?height=150&width=250",
      },
    ],
  }
}

