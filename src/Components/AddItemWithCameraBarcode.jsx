import { useState, useEffect } from "react";
import BarcodeScanner from "./BarcodeScanner";

export default function AddItemFormWithBarcode({ onAddItem, editingItem }) {
  const [barcode, setBarcode] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    if (editingItem) {
      setBarcode(editingItem.barcode);
      setName(editingItem.name);
      setPrice(editingItem.price.toString());
      setStock(editingItem.stock.toString());
      setCategory(editingItem.category);
    }
  }, [editingItem]);

  const handleAddItem = () => {
    if (
      !barcode.trim() ||
      !name.trim() ||
      parseFloat(price) <= 0 ||
      parseInt(stock) < 0
    ) {
      alert("❌ Please fill in all fields correctly.");
      return;
    }

    const newItem = {
      id: editingItem?.id || Date.now(),
      barcode: barcode.trim(),
      name: name.trim(),
      price: parseFloat(price),
      stock: parseInt(stock, 10),
      category: category.trim(),
    };

    onAddItem(newItem);

    setBarcode("");
    setName("");
    setPrice("");
    setStock("");
    setCategory("");
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-4">
        {editingItem ? "✏️ Edit Item" : "➕ Add New Item"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <input
            type="text"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            placeholder="Barcode"
            className="p-2 border rounded w-full"
          />
          <button
            type="button"
            onClick={() => setShowScanner(true)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-2 py-1 rounded text-sm"
          >
            📷 Scan
          </button>
        </div>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item Name"
          className="p-2 border rounded"
        />
        <input
          type="number"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="p-2 border rounded"
        />
        <input
          type="number"
          min="0"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Stock Quantity"
          className="p-2 border rounded"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select Category</option>
          <option value="Beverages">Beverages</option>
          <option value="Snacks">Snacks</option>
          <option value="Groceries">Groceries</option>
          <option value="Personal Care">Personal Care</option>
          <option value="Household">Household</option>
        </select>
      </div>

      <button
        onClick={handleAddItem}
        className={`mt-4 px-4 py-2 ${
          editingItem ? "bg-yellow-500" : "bg-green-600"
        } text-white rounded`}
      >
        {editingItem ? "✅ Save Changes" : "➕ Add Item"}
      </button>

      {showScanner && (
        <BarcodeScanner
          onScanSuccess={(scanned) => setBarcode(scanned)}
          onClose={() => setShowScanner(false)}
        />
      )}
    </div>
  );
}
