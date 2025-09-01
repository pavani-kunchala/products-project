import React, { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table"
import { Button } from "./ui/button"
import { Skeleton } from "./ui/skeleton"
import { Dialog } from "./ui/dialog"
import ProductForm from "./ProductForm"

const fetchProducts = async () => {
  const res = await axios.get("https://dummyjson.com/products?limit=50&delay=1000")
  return res.data.products
}

export default function ProductTable({ resetTrigger }) {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [categoryFilter, setCategoryFilter] = useState("")
 
   

  // Count products per category
  const categoryCounts = products.reduce((acc, p) => {
  acc[p.category] = (acc[p.category] || 0) + 1
  return acc
   }, {})


  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  })
  // Reset when resetTrigger changes
 
  useEffect(() => {
  setPage(0)
  setSearch("")
  setCategoryFilter("") // reset to all categories
}, [resetTrigger])


  useEffect(() => {
    if (data) setProducts(data)
  }, [data])

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    )
  }

  if (isError) return <p className="text-red-500">Error loading products</p>

 
  const filtered = products.filter((p) =>
  p.title.toLowerCase().includes(search.toLowerCase()) &&
  (categoryFilter === "" || p.category === categoryFilter)
)


  // Pagination
  const perPage = 9
  const totalPages = Math.ceil(filtered.length / perPage)
  const displayed = filtered.slice(page * perPage, (page + 1) * perPage)

  // Total count from API (or local cache)
  const totalCount = products.length
  const showingFrom = page * perPage + 1
  const showingTo = Math.min((page + 1) * perPage, filtered.length)

  // Handlers
  const handleAdd = (newProduct) => {
    const id = Math.max(...products.map((p) => p.id)) + 1
    setProducts([{ ...newProduct, id }, ...products])
  }

  const handleEdit = (updatedProduct) => {
    setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)))
  }

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(0) }}
          className="border rounded-md px-2 py-1"
        />

      <select
      value={categoryFilter}
      onChange={(e) => { setCategoryFilter(e.target.value); 
        setPage(0) 
        setSearch("")                     // clear search input
        setPage(0)   
       }}

       
      className="border rounded-md px-2 py-1"
       >
       <option value="">
         All Categories - {totalCount} products
       </option>
      {Object.entries(categoryCounts).map(([cat, count]) => (
      <option key={cat} value={cat}>
      {cat} - {count} products
      </option>
     ))}
    </select>

        <Button onClick={() => { setEditing(null); setOpen(true) }} 
            className="bg-blue-500 text-white hover:bg-blue-600 px-3 py-1 rounded-md shadow-md">
          Add Product
        </Button>
      </div>

      {displayed.length === 0 ? (
        <p>No products found</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayed.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.title}</TableCell>
                <TableCell>${p.price}</TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell>{p.stock}</TableCell>
                <TableCell className="space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => { setEditing(p); setOpen(true) }}
                    className="bg-yellow-400 text-white hover:bg-yellow-500 px-3 py-1 rounded-md shadow-md"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 text-white hover:bg-red-600 px-3 py-1 rounded-md shadow-md"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <div className="flex justify-between items-center">
        <Button
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
          variant="outline"
          className={`px-4 py-1 rounded-md shadow ${
          page === 0 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-green-500 text-white hover:bg-green-600"
  }`}
        >
          Previous
        </Button>
        
    <p className="text-sm text-gray-700">
       <span className="font-semibold text-cyan-600">{showingFrom}-{showingTo}</span> of{" "}
       <span className="font-semibold text-blue-600">{filtered.length}</span> products | 
       Page <span className="font-semibold text-green-600">{page + 1}</span> of{" "}
       <span className="font-semibold">{totalPages}</span>
    </p>


        <Button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage((p) => p + 1)}
          variant="outline"
          className={`px-4 py-1 rounded-md shadow ${
          page + 1 >= totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          Next
        </Button>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <ProductForm
          product={editing}
          onClose={() => setOpen(false)}
          onAdd={handleAdd}
          onEdit={handleEdit}
        />
      </Dialog>
    </div>
  )
}
