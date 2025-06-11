import { useState, useEffect, useRef } from "react";
import barcodeDatabase from "../data/barcodeDatabase";
import beepSound from "../assets/beep.mp3"; // put a beep.mp3 file here

export default function AddItemForm({ onAddItem, editingItem }) {
  const [barcode, setBarcode] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [scanStatus, setScanStatus] = useState("");
  const scannerInputRef = useRef(null);

  useEffect(() => {
    if (editingItem) {
      setBarcode(editingItem.barcode);
      setName(editingItem.name);
      setPrice(editingItem.price.toString());
      setStock(editingItem.stock.toString());
      setCategory(editingItem.category);
    }
  }, [editingItem]);

  useEffect(() => {
    if (scannerInputRef.current) {
      scannerInputRef.current.focus();
    }
  }, []);

  const handleScan = (e) => {
    const scannedCode = e.target.value.trim();
    if (!scannedCode) return;

    const beep = new Audio(beepSound);
    beep.play();

    setBarcode(scannedCode);
    const product = barcodeDatabase[scannedCode];
    if (product) {
      setName(product.name);
      setPrice(product.price.toString());
      setCategory(product.category);
      setScanStatus("✅ Product info found & filled");
    } else {
      setName("");
      setPrice("");
      setCategory("");
      setScanStatus("⚠️ Product not found. Please fill manually.");
    }

    setTimeout(() => setScanStatus(""), 3000);
    e.target.value = "";
  };

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
    <div className="bg-white p-4 rounded shadow mb-6 relative">
      <h2 className="text-xl font-bold mb-4">
        {editingItem ? "✏️ Edit Item" : "➕ Add New Item"}
      </h2>

      {/* Scanner input (hidden) */}
      <input
        ref={scannerInputRef}
        onChange={handleScan}
        className="absolute opacity-0 pointer-events-none"
        autoFocus
      />

      <button
        onClick={() => scannerInputRef.current?.focus()}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        📷 Activate Scanner
      </button>

      {scanStatus && (
        <div className="text-green-700 font-semibold mb-2">{scanStatus}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          placeholder="Barcode"
          className="p-2 border rounded"
        />
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
    </div>
  );
}
