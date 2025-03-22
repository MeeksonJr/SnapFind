"use client"

import { motion } from "framer-motion"
import { Check, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"

interface ProductDetailsProps {
  product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {product.categories.map((category, index) => (
            <Badge key={index} variant="secondary">
              {category}
            </Badge>
          ))}
        </div>
      </motion.div>

      <motion.div variants={item}>
        <p className="text-muted-foreground mb-6">{product.description}</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <motion.div variants={item}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-green-600 flex items-center">
                <Check className="mr-2 h-5 w-5" />
                Pros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {product.pros.map((pro, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-4 w-4 text-green-600 mr-2 mt-1 shrink-0" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-red-600 flex items-center">
                <X className="mr-2 h-5 w-5" />
                Cons
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {product.cons.map((con, index) => (
                  <li key={index} className="flex items-start">
                    <X className="h-4 w-4 text-red-600 mr-2 mt-1 shrink-0" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={item}>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Specifications</CardTitle>
            <CardDescription>Technical details about this product</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <span className="text-sm text-muted-foreground">{key}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

