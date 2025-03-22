import type { Product } from "./types"

export async function generateProductDetails(objectLabel: string, imageBase64: string): Promise<Product> {
  try {
    console.log(`Generating product details for: ${objectLabel}`)

    // Since the Gemini API is not enabled, we'll use our fallback approach
    // In a production app, you would implement the Gemini API call here

    return generateEnhancedProductDetails(objectLabel)
  } catch (error) {
    console.error("Error generating product details:", error)
    return generateEnhancedProductDetails(objectLabel)
  }
}

async function generateEnhancedProductDetails(objectLabel: string): Promise<Product> {
  // Extract the main object name (remove any text after a comma)
  const mainObject = objectLabel.split(",")[0].trim()

  // Map of predefined product details for common detected objects
  const productDetailsMap: Record<string, Product> = {
    "cowboy hat": {
      id: Date.now().toString(),
      title: "Premium Western Cowboy Hat",
      description:
        "Authentic Western-style cowboy hat crafted from premium materials. Features a classic design with a shapeable brim and comfortable interior sweatband for all-day wear.",
      categories: ["Fashion", "Western Wear", "Accessories", "Headwear"],
      pros: [
        "Genuine materials for authentic look and feel",
        "Shapeable brim allows for customized styling",
        "Moisture-wicking sweatband for comfort",
        "Weather-resistant construction",
      ],
      cons: [
        "Premium pricing compared to synthetic alternatives",
        "Requires proper care and maintenance",
        "May need reshaping after exposure to rain",
      ],
      specifications: {
        Material: "Premium felt with leather accents",
        "Crown Height": "4.5 inches",
        "Brim Width": "3.75 inches",
        "Colors Available": "Black, Brown, Tan, White",
        Sizes: "S, M, L, XL (6¾ to 8)",
        Care: "Spot clean, store in hat box when not in use",
      },
      relatedItems: [
        {
          id: "1",
          title: "Deluxe Leather Cowboy Hat",
          description: "Premium leather construction with decorative band.",
          price: "$189.99",
          imageUrl: "/placeholder.svg?height=150&width=250",
        },
        {
          id: "2",
          title: "Straw Cowboy Hat",
          description: "Lightweight summer option with ventilated design.",
          price: "$79.99",
          imageUrl: "/placeholder.svg?height=150&width=250",
        },
        {
          id: "3",
          title: "Hat Care Kit",
          description: "Everything needed to maintain your hat's shape and finish.",
          price: "$34.99",
          imageUrl: "/placeholder.svg?height=150&width=250",
        },
        {
          id: "4",
          title: "Western Hat Rack",
          description: "Wall-mounted storage for up to 6 hats.",
          price: "$45.99",
          imageUrl: "/placeholder.svg?height=150&width=250",
        },
      ],
    },
    sombrero: {
      id: Date.now().toString(),
      title: "Authentic Mexican Sombrero",
      description:
        "Traditional wide-brimmed Mexican sombrero with colorful decorative elements. Handcrafted by artisans using traditional techniques and materials.",
      categories: ["Cultural Wear", "Traditional Hats", "Mexican Attire", "Festival Wear"],
      pros: [
        "Authentic handcrafted design",
        "Wide brim provides excellent sun protection",
        "Vibrant, traditional decorative elements",
        "Conversation starter at parties and events",
      ],
      cons: [
        "Large size can be cumbersome for storage",
        "Decorative versions not ideal for everyday wear",
        "May require special cleaning methods",
      ],
      specifications: {
        Material: "Palm leaves or straw with fabric trim",
        "Brim Width": "12-15 inches",
        "Crown Height": "6 inches",
        Decoration: "Colorful embroidery and pom-poms",
        Weight: "Approximately 1.5 lbs",
        Origin: "Mexico",
      },
      relatedItems: [
        {
          id: "1",
          title: "Mini Decorative Sombrero",
          description: "Perfect for table decorations or as a souvenir.",
          price: "$24.99",
          imageUrl: "/placeholder.svg?height=150&width=250",
        },
        {
          id: "2",
          title: "Premium Charro Sombrero",
          description: "Elegant embroidered sombrero for special occasions.",
          price: "$149.99",
          imageUrl: "/placeholder.svg?height=150&width=250",
        },
        {
          id: "3",
          title: "Sombrero Display Stand",
          description: "Showcase your sombrero as a decorative piece.",
          price: "$39.99",
          imageUrl: "/placeholder.svg?height=150&width=250",
        },
        {
          id: "4",
          title: "Mexican Serape Blanket",
          description: "Colorful traditional blanket to complement your sombrero.",
          price: "$59.99",
          imageUrl: "/placeholder.svg?height=150&width=250",
        },
      ],
    },
    microphone: {
      id: Date.now().toString(),
      title: "Professional Dynamic Vocal Microphone",
      description:
        "Studio-quality dynamic microphone designed for vocal performances, podcasting, and recording. Features cardioid pickup pattern to minimize background noise and feedback.",
      categories: ["Audio Equipment", "Recording Gear", "Performance Tools", "Podcasting"],
      pros: [
        "Exceptional sound clarity and vocal reproduction",
        "Durable metal construction for stage use",
        "Cardioid pattern reduces unwanted background noise",
        "Low handling noise for professional recordings",
      ],
      cons: [
        "Requires proper technique for optimal results",
        "May need additional accessories (stand, pop filter)",
        "Higher price point than entry-level options",
      ],
      specifications: {
        Type: "Dynamic",
        "Polar Pattern": "Cardioid",
        "Frequency Response": "50Hz to 15kHz",
        Impedance: "150 ohms",
        Connector: "XLR",
        Weight: "0.66 lbs (300g)",
      },
      relatedItems: [
        {
          id: "1",
          title: "Adjustable Microphone Stand",
          description: "Heavy-duty stand with boom arm for flexible positioning.",
          price: "$49.99",
          imageUrl: "/placeholder.svg?height=150&width=250",
        },
        {
          id: "2",
          title: "Pop Filter",
          description: "Reduces plosives for cleaner vocal recordings.",
          price: "$19.99",
          imageUrl: "/placeholder.svg?height=150&width=250",
        },
        {
          id: "3",
          title: "XLR Cable (20ft)",
          description: "Professional-grade cable for clear signal transmission.",
          price: "$29.99",
          imageUrl: "/placeholder.svg?height=150&width=250",
        },
        {
          id: "4",
          title: "Portable Audio Interface",
          description: "Connect your microphone to any computer for recording.",
          price: "$119.99",
          imageUrl: "/placeholder.svg?height=150&width=250",
        },
      ],
    },
    stage: {
      id: Date.now().toString(),
      title: "Professional Performance Stage Platform",
      description:
        "Modular performance stage platform designed for events, concerts, and theatrical productions. Features a sturdy construction with adjustable height and non-slip surface.",
      categories: ["Event Equipment", "Performance Gear", "Theater Supplies", "Concert Hardware"],
      pros: [
        "Modular design for customizable configurations",
        "Quick and easy assembly with minimal tools",
        "Adjustable height to accommodate various venues",
        "High weight capacity for performers and equipment",
      ],
      cons: [
        "Requires storage space when not in use",
        "Multiple units needed for larger performances",
        "Professional installation recommended for complex setups",
      ],
      specifications: {
        Dimensions: "4ft x 4ft (standard panel)",
        "Height Range": "1-3ft (adjustable)",
        "Weight Capacity": "Up to 125 lbs per square foot",
        Material: "Aluminum frame with non-slip surface",
        "Setup Time": "Approximately 30 minutes per section",
        Includes: "Adjustable legs, connectors, and safety rails",
      },
      relatedItems: [
        {
          id: "1",
          title: "Stage Skirting (16ft)",
          description: "Professional pleated fabric to conceal under-stage area.",
          price: "$129.99",
          imageUrl: "/placeholder.svg?height=150&width=250",
        },
        {
          id: "2",
          title: "Stage Steps with Handrail",
          description: "Safe and secure access to elevated stages.",
          price: "$249.99",
          imageUrl: "/placeholder.svg?height=150&width=250",
        },
        {
          id: "3",
          title: "Transport Cart",
          description: "Heavy-duty cart for moving stage platforms.",
          price: "$189.99",
          imageUrl: "/placeholder.svg?height=150&width=250",
        },
        {
          id: "4",
          title: "LED Stage Lighting Kit",
          description: "Complete lighting solution for small to medium stages.",
          price: "$399.99",
          imageUrl: "/placeholder.svg?height=150&width=250",
        },
      ],
    },
  }

  // Check for exact matches first
  for (const [key, details] of Object.entries(productDetailsMap)) {
    if (mainObject.toLowerCase().includes(key)) {
      return {
        ...details,
        id: Date.now().toString(), // Ensure a unique ID
      }
    }
  }

  // If no exact match, create a generic product based on the detected object
  const title = mainObject.replace(/\b\w/g, (l) => l.toUpperCase()) // Capitalize first letter of each word

  return {
    id: Date.now().toString(),
    title: title,
    description: `High-quality ${mainObject.toLowerCase()} with premium materials and excellent craftsmanship. Perfect for both casual and formal occasions.`,
    categories: ["Fashion", "Accessories", "Apparel"],
    pros: ["Premium quality materials", "Stylish design", "Comfortable fit", "Durable construction"],
    cons: ["Premium price point", "Limited color options", "May require special care"],
    specifications: {
      Material: "Premium fabrics and materials",
      Style: "Contemporary",
      Care: "Hand wash or dry clean recommended",
      Origin: "Imported",
      Warranty: "1 year manufacturer warranty",
    },
    relatedItems: [
      {
        id: "1",
        title: `Deluxe ${title}`,
        description: `A premium version with enhanced features.`,
        price: "$129.99",
        imageUrl: "/placeholder.svg?height=150&width=250",
      },
      {
        id: "2",
        title: `${title} Essentials`,
        description: `A more affordable version with core features.`,
        price: "$59.99",
        imageUrl: "/placeholder.svg?height=150&width=250",
      },
      {
        id: "3",
        title: `${title} Care Kit`,
        description: `Everything you need for proper maintenance.`,
        price: "$24.99",
        imageUrl: "/placeholder.svg?height=150&width=250",
      },
      {
        id: "4",
        title: `${title} Accessories`,
        description: `Enhance your experience with these matching accessories.`,
        price: "$39.99",
        imageUrl: "/placeholder.svg?height=150&width=250",
      },
    ],
  }
}

