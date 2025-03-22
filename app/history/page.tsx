"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { getProductHistory, deleteProductFromHistory } from "@/lib/db"
import type { Product } from "@/lib/types"

export default function HistoryPage() {
  const router = useRouter()
  const [history, setHistory] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const products = await getProductHistory()
        setHistory(products)
      } catch (error) {
        console.error("Error loading history:", error)
      } finally {
        setLoading(false)
      }
    }

    loadHistory()
  }, [])

  const handleViewProduct = (product: Product) => {
    // Store the product in localStorage to view in dashboard
    localStorage.setItem("selectedProduct", JSON.stringify(product))
    router.push("/dashboard")
  }

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProductFromHistory(id)
      setHistory(history.filter((product) => product.id !== id))
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <header className="p-4 flex items-center border-b">
        <Button variant="ghost" onClick={() => router.push("/")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-xl font-bold ml-4">Your History</h1>
      </header>

      <main className="container max-w-4xl mx-auto p-4">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-pulse text-center">
              <div className="h-8 w-32 bg-muted rounded mx-auto mb-4"></div>
              <div className="h-4 w-48 bg-muted rounded mx-auto"></div>
            </div>
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-2">No History Yet</h2>
            <p className="text-muted-foreground mb-6">
              You haven't scanned any products yet. Take a picture to get started!
            </p>
            <Button onClick={() => router.push("/")}>Take a Picture</Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {history.map((product, index) => (
              <motion.div
                key={product.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col">
                  <div className="h-[150px] bg-muted rounded-t-lg overflow-hidden">
                    <img
                      src={product.imageUrl || "/placeholder.svg?height=150&width=250"}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4 flex-grow">
                    <h3 className="font-semibold line-clamp-1">{product.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{product.description}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Button variant="outline" size="sm" onClick={() => handleViewProduct(product)}>
                      View Details
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

