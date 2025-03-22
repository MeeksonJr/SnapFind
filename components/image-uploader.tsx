"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Camera, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Webcam from "react-webcam"

interface ImageUploaderProps {
  onImageCaptured: (imageData: string) => void
  onCancel: () => void
}

export default function ImageUploader({ onImageCaptured, onCancel }: ImageUploaderProps) {
  const [captureMode, setCaptureMode] = useState<"camera" | "upload" | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const webcamRef = useRef<Webcam>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageSrc(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const captureImage = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      if (imageSrc) {
        setImageSrc(imageSrc)
      }
    }
  }, [webcamRef])

  const handleConfirm = () => {
    if (imageSrc) {
      onImageCaptured(imageSrc)
    }
  }

  const resetState = () => {
    setImageSrc(null)
    setCaptureMode(null)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {!captureMode && !imageSrc && (
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={() => setCaptureMode("camera")} className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            Use Camera
          </Button>
          <Button variant="outline" onClick={() => setCaptureMode("upload")} className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload Image
          </Button>
        </div>
      )}

      {captureMode === "camera" && !imageSrc && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "environment" }}
            className="rounded-lg overflow-hidden max-w-full w-[320px] h-[240px]"
          />
          <div className="flex justify-center mt-4 gap-2">
            <Button onClick={captureImage}>Capture</Button>
            <Button variant="outline" onClick={resetState}>
              Cancel
            </Button>
          </div>
        </motion.div>
      )}

      {captureMode === "upload" && !imageSrc && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          <label className="cursor-pointer border-2 border-dashed border-muted-foreground/50 rounded-lg p-8 flex flex-col items-center justify-center">
            <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Click to upload an image</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
          </label>
          <Button variant="outline" onClick={resetState} className="mt-4">
            Cancel
          </Button>
        </motion.div>
      )}

      {imageSrc && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          <div className="relative">
            <img src={imageSrc || "/placeholder.svg"} alt="Captured" className="rounded-lg max-w-full w-[320px]" />
            <Button
              variant="outline"
              size="icon"
              className="absolute top-2 right-2 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={resetState}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2 mt-4">
            <Button onClick={handleConfirm}>Analyze Image</Button>
            <Button variant="outline" onClick={resetState}>
              Try Again
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

