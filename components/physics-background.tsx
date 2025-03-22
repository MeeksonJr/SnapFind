"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { useTheme } from "next-themes"

export default function PhysicsBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)

    // Particles
    const particlesCount = 1500
    const positions = new Float32Array(particlesCount * 3)
    const colors = new Float32Array(particlesCount * 3)

    const colorOptions =
      theme === "dark"
        ? [new THREE.Color(0x9333ea), new THREE.Color(0xdb2777)] // Purple and pink for dark mode
        : [new THREE.Color(0x9333ea), new THREE.Color(0xdb2777)] // Same for light mode

    for (let i = 0; i < particlesCount; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10

      // Color
      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    const particlesGeometry = new THREE.BufferGeometry()
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // Camera position
    camera.position.z = 5

    // Mouse interaction
    const mouse = new THREE.Vector2()

    function onMouseMove(event: MouseEvent) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener("mousemove", onMouseMove)

    // Animation
    const originalPositions = positions.slice()

    function animate() {
      requestAnimationFrame(animate)

      // Rotate particles
      particles.rotation.x += 0.0005
      particles.rotation.y += 0.0005

      // Mouse interaction effect
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3

        // Get original position
        const x = originalPositions[i3]
        const y = originalPositions[i3 + 1]
        const z = originalPositions[i3 + 2]

        // Calculate distance from mouse (in 2D plane)
        const distX = x - mouse.x * 5
        const distY = y - mouse.y * 5

        // Apply force based on mouse position
        positions[i3] = x + Math.sin(Date.now() * 0.001) * 0.02 - distX * 0.02
        positions[i3 + 1] = y + Math.cos(Date.now() * 0.001) * 0.02 - distY * 0.02
        positions[i3 + 2] = z + Math.sin(Date.now() * 0.001 + i) * 0.02
      }

      particlesGeometry.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
    }

    // Handle window resize
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", onWindowResize)

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("resize", onWindowResize)
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [theme])

  return <div ref={containerRef} className="absolute inset-0 -z-10" />
}

