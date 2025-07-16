import React, { useState, useEffect } from "react";

import AddItemForm from "../Components/AddItemForm";

export default function InventoryPage() {
  // Lazy initialize items from localStorage or empty array
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem("inventory-items");
    return storedItems ? JSON.parse(storedItems) : [];
  });

  // Lazy initialize categories from localStorage or default categories
  const [categories, setCategories] = useState(() => {
    const storedCategories = localStorage.getItem("categories");
    return storedCategories
      ? JSON.parse(storedCategories)
      : ["Beverages", "Snacks", "Groceries", "Personal Care", "Household"];
  });

  const [editingItemId, setEditingItemId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  // Save items to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("inventory-items", JSON.stringify(items));
  }, [items]);

  // Save categories to localStorage whenever categories change
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const handleAddItem = (item) => {
    if (editingItemId) {
      setItems((prev) =>
        prev.map((i) => (i.id === editingItemId ? { ...item, id: i.id } : i))
      );
      setEditingItemId(null);
    } else {
      setItems([...items, item]);
    }

    // Add new category if it's not already in the list
    if (item.category && !categories.includes(item.category)) {
      setCategories([...categories, item.category]);
    }
  };

  const handleEdit = (item) => setEditingItemId(item.id);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setItems(items.filter((i) => i.id !== id));
    }
  };

  const currentItem = items.find((i) => i.id === editingItemId);

  const displayedItems = items.filter((item) => {
    const matchesCategory = !filterCategory || item.category === filterCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.barcode.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">📦 Inventory Management</h1>
        <AddItemForm
          onAddItem={handleAddItem}
          editingItem={currentItem}
          categories={categories}
        />

        <div className="flex mb-4 gap-4">
          <input
            type="text"
            placeholder="🔍 Search by name or barcode"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border rounded flex-grow"
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">🧾 Items List</h2>
          {displayedItems.length === 0 ? (
            <p className="text-gray-500">No items found.</p>
          ) : (
            <table className="w-full text-left border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Barcode</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Price</th>
                  <th className="p-2 border">Stock</th>
                  <th className="p-2 border">Category</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-2 border">{item.barcode}</td>
                    <td className="p-2 border">{item.name}</td>
                    <td className="p-2 border">${item.price.toFixed(2)}</td>
                    <td className="p-2 border">{item.stock}</td>
                    <td className="p-2 border">{item.category}</td>
                    <td className="p-2 border space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="px-2 py-1 bg-yellow-400 text-white rounded"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-2 py-1 bg-red-600 text-white rounded"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
