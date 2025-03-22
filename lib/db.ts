import type { Product } from "./types"

// In a real app, this would connect to Neon PostgreSQL
// For now, we'll use localStorage for demo purposes

export async function saveProductToHistory(product: Product): Promise<void> {
  try {
    // Get existing history
    const historyString = localStorage.getItem("productHistory")
    const history: Product[] = historyString ? JSON.parse(historyString) : []

    // Add the new product with a unique ID if it doesn't have one
    if (!product.id) {
      product.id = Date.now().toString()
    }

    // Add to the beginning of the array
    history.unshift(product)

    // Limit history to 20 items
    const limitedHistory = history.slice(0, 20)

    // Save back to localStorage
    localStorage.setItem("productHistory", JSON.stringify(limitedHistory))
  } catch (error) {
    console.error("Error saving to history:", error)
    throw error
  }
}

export async function getProductHistory(): Promise<Product[]> {
  try {
    const historyString = localStorage.getItem("productHistory")
    return historyString ? JSON.parse(historyString) : []
  } catch (error) {
    console.error("Error getting history:", error)
    return []
  }
}

export async function deleteProductFromHistory(id: string): Promise<void> {
  try {
    const historyString = localStorage.getItem("productHistory")
    if (!historyString) return

    const history: Product[] = JSON.parse(historyString)
    const updatedHistory = history.filter((product) => product.id !== id)

    localStorage.setItem("productHistory", JSON.stringify(updatedHistory))
  } catch (error) {
    console.error("Error deleting from history:", error)
    throw error
  }
}

