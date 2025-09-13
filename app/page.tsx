"use client"

import { useState } from "react"
import { ProductsHeader } from "@/components/products-header"
import { ProductsStats } from "@/components/products-stats"
import { ProductsTable } from "@/components/products-table"
import { ProductModal } from "@/components/product-modal"
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"

export interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: "active" | "inactive"
  image: string
  description: string
  createdAt: string
}

// Mock data for demonstration
const initialProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 199.99,
    stock: 45,
    status: "active",
    image: "/wireless-headphones.png",
    description: "Premium wireless headphones with noise cancellation",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Smart Watch",
    category: "Electronics",
    price: 299.99,
    stock: 23,
    status: "active",
    image: "/smartwatch-lifestyle.png",
    description: "Advanced fitness tracking smartwatch",
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    name: "Coffee Maker",
    category: "Appliances",
    price: 149.99,
    stock: 0,
    status: "inactive",
    image: "/modern-coffee-maker.png",
    description: "Automatic drip coffee maker with timer",
    createdAt: "2024-01-05",
  },
  {
    id: "4",
    name: "Yoga Mat",
    category: "Fitness",
    price: 39.99,
    stock: 78,
    status: "active",
    image: "/rolled-yoga-mat.png",
    description: "Non-slip premium yoga mat",
    createdAt: "2024-01-20",
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [productIdCounter, setProductIdCounter] = useState(5)

  const handleCreateProduct = (productData: Omit<Product, "id" | "createdAt">) => {
    const newProduct: Product = {
      ...productData,
      id: productIdCounter.toString(),
      createdAt: new Date().toISOString().split("T")[0],
    }
    setProducts([newProduct, ...products])
    setProductIdCounter((prev) => prev + 1)
    setIsModalOpen(false)
  }

  const handleUpdateProduct = (productData: Omit<Product, "id" | "createdAt">) => {
    if (!editingProduct) return

    const updatedProduct: Product = {
      ...productData,
      id: editingProduct.id,
      createdAt: editingProduct.createdAt,
    }

    setProducts(products.map((p) => (p.id === editingProduct.id ? updatedProduct : p)))
    setEditingProduct(null)
    setIsModalOpen(false)
  }

  const handleDeleteProduct = () => {
    if (!deleteProduct) return
    setProducts(products.filter((p) => p.id !== deleteProduct.id))
    setDeleteProduct(null)
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || product.category.toLowerCase() === filterCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  const categories = Array.from(new Set(products.map((p) => p.category)))

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        <ProductsHeader
          onAddProduct={() => setIsModalOpen(true)}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterCategory={filterCategory}
          onFilterChange={setFilterCategory}
          categories={categories}
        />

        <ProductsStats products={products} />

        <ProductsTable products={filteredProducts} onEdit={handleEditProduct} onDelete={setDeleteProduct} />

        <ProductModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingProduct(null)
          }}
          onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
          product={editingProduct}
        />

        <DeleteConfirmDialog
          isOpen={!!deleteProduct}
          onClose={() => setDeleteProduct(null)}
          onConfirm={handleDeleteProduct}
          productName={deleteProduct?.name || ""}
        />
      </div>
    </div>
  )
}
