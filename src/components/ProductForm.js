import React, { useState, useEffect } from "react"
import { Button } from "./ui/button"

export default function ProductForm({ product, onClose, onAdd, onEdit }) {
  const [form, setForm] = useState({
    id: null,
    title: "",
    price: "",
    category: "",
    stock: "",
  })

  useEffect(() => {
    if (product) setForm({ ...product }) // keep id for editing
  }, [product])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (product) onEdit(form)
    else onAdd(form)
    onClose()
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-80">
      <h2 className="text-lg font-semibold mb-3">
        {product ? "Edit Product" : "Add Product"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
        />
        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{product ? "Update" : "Add"}</Button>
        </div>
      </form>
    </div>
  )
}
