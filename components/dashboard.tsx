"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowLeft, Camera, History, Loader2, AlertTriangle, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import ProductDetails from "./product-details"
import RelatedProducts from "./related-products"
import { analyzeImage } from "@/lib/api"
import type { Product } from "@/lib/types"
import { saveProductToHistory } from "@/lib/db"

export function Dashboard() {
  const router = useRouter()
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [warning, setWarning] = useState<string | null>(null)
  const [detectedObject, setDetectedObject] = useState<string | null>(null)

  useEffect(() => {
    // Get the image from localStorage
    const storedImage = localStorage.getItem("capturedImage")
    if (storedImage) {
      setImage(storedImage)
      analyzeProductImage(storedImage)
    }
  }, [])

  const analyzeProductImage = async (imageData: string) => {
    setLoading(true)
    setError(null)
    setWarning(null)
    setDetectedObject(null)

    try {
      const response = await analyzeImage(imageData)
      setProduct(response.product)

      // Check if there's a detected object
      if (response.detectedObject) {
        setDetectedObject(response.detectedObject)
      }

      // Check if there's a warning from the API
      if (response.warning) {
        setWarning(response.warning)
      }

      // Save to history
      await saveProductToHistory(response.product)
    } catch (err) {
      console.error("Error analyzing image:", err)
      setError("Failed to analyze the image. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleNewImage = () => {
    localStorage.removeItem("capturedImage")
    router.push("/")
  }

  const handleViewHistory = () => {
    router.push("/history")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <header className="p-4 flex items-center justify-between border-b">
        <Button variant="ghost" onClick={() => router.push("/")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          SnapFind
        </h1>
        <Button variant="ghost" onClick={handleViewHistory}>
          <History className="h-4 w-4 mr-2" />
          History
        </Button>
      </header>

      <main className="container max-w-4xl mx-auto p-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-lg text-muted-foreground">Analyzing your product...</p>
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-destructive/10 p-4 rounded-lg text-center my-8"
          >
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={handleNewImage}>Try Again</Button>
          </motion.div>
        ) : warning ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
            <Alert variant="warning">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Demo Mode</AlertTitle>
              <AlertDescription>{warning}</AlertDescription>
            </Alert>
          </motion.div>
        ) : null}

        {detectedObject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Tag className="h-4 w-4" />
              <span>Detected:</span>
              <Badge variant="outline" className="font-normal">
                {detectedObject}
              </Badge>
            </div>
          </motion.div>
        )}

        {product && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="grid md:grid-cols-[300px_1fr] gap-6 my-6">
              {image && (
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img src={image || "/placeholder.svg"} alt="Product" className="w-full h-auto object-cover" />
                </div>
              )}

              <ProductDetails product={product} />
            </div>

            <RelatedProducts relatedProducts={product.relatedItems} />

            <div className="flex justify-center mt-8">
              <Button onClick={handleNewImage} className="flex items-center">
                <Camera className="mr-2 h-4 w-4" />
                Analyze Another Product
              </Button>
            </div>
          </motion.div>
        )}

        {!loading && !product && !error && (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">No product data found.</p>
            <Button onClick={handleNewImage}>Take a Picture</Button>
          </div>
        )}
      </main>
    </div>
  )
}

