  import React, { useState } from "react"
import ProductTable from "./ProductTable"

export default function Layout() {
  const [resetCount, setResetCount] = useState(0)

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-white shadow-md hidden md:flex flex-col">
        <div className="p-4 text-xl font-bold border-b">My Dashboard</div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setResetCount((c) => c + 1)}
            className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100"
          >
            Products
          </button>
          <a href="#" className="block px-3 py-2 rounded hover:bg-gray-100">
            Settings
          </a>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-14 bg-white shadow flex items-center px-4">
          <h1 className="text-lg font-semibold">Product Dashboard</h1>
        </header>

        <main className="flex-1 p-6">
          <ProductTable resetTrigger={resetCount} />
        </main>
      </div>
    </div>
  )
} 
