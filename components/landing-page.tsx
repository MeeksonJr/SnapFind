"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import PhysicsBackground from "./physics-background"
import ImageUploader from "./image-uploader"

export default function LandingPage() {
  const router = useRouter()
  const [showUploader, setShowUploader] = useState(false)

  const handleImageCaptured = (imageData: string) => {
    // Store the image data in localStorage to pass to the dashboard
    localStorage.setItem("capturedImage", imageData)
    router.push("/dashboard")
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Physics background */}
      <PhysicsBackground />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            SnapFind
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-md mx-auto text-muted-foreground">
            Take a picture and discover everything about a product instantly
          </p>
        </motion.div>

        {!showUploader ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Button
              size="lg"
              className="rounded-full px-8 py-6 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
              onClick={() => setShowUploader(true)}
            >
              <Camera className="mr-2 h-5 w-5" />
              Take a Picture
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background/80 backdrop-blur-sm p-6 rounded-xl shadow-xl"
          >
            <ImageUploader onImageCaptured={handleImageCaptured} onCancel={() => setShowUploader(false)} />
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <motion.footer
        className="absolute bottom-4 text-center w-full text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <p>© 2025 SnapFind. All rights reserved.</p>
      </motion.footer>
    </div>
  )
}

