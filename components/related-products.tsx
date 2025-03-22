"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { RelatedProduct } from "@/lib/types"

interface RelatedProductsProps {
  relatedProducts: RelatedProduct[]
}

export default function RelatedProducts({ relatedProducts }: RelatedProductsProps) {
  const carouselRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { current } = carouselRef
      const scrollAmount = direction === "left" ? -300 : 300
      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  if (!relatedProducts.length) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="my-8"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Related Products</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => scroll("left")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => scroll("right")}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide snap-x"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {relatedProducts.map((product, index) => (
          <Card key={index} className="min-w-[250px] max-w-[250px] snap-start">
            <div className="h-[150px] bg-muted rounded-t-lg overflow-hidden">
              <img
                src={product.imageUrl || "/placeholder.svg?height=150&width=250"}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold line-clamp-1">{product.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{product.description}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <span className="font-bold">{product.price}</span>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}

