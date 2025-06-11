import { useState, useEffect } from "react";

export default function AddItemForm({
  onAddItem,
  editingItem,
  categories,
  setCategories,
}) {
  const [barcode, setBarcode] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    if (editingItem) {
      setBarcode(editingItem.barcode);
      setName(editingItem.name);
      setPrice(editingItem.price.toString());
      setStock(editingItem.stock.toString());
      setCategory(editingItem.category);
      setIsAddingCategory(false);
      setNewCategory("");
    }
  }, [editingItem]);

  const handleAddItem = () => {
    const finalCategory = isAddingCategory
      ? newCategory.trim()
      : category.trim();

    if (
      !barcode.trim() ||
      !name.trim() ||
      parseFloat(price) <= 0 ||
      parseInt(stock) < 0 ||
      !finalCategory
    ) {
      alert("❌ Please fill in all fields correctly.");
      return;
    }

    // Add new category to the list if not already included
    if (
      isAddingCategory &&
      finalCategory &&
      !categories.includes(finalCategory)
    ) {
      setCategories([...categories, finalCategory]);
    }

    const newItem = {
      id: editingItem?.id || Date.now(),
      barcode: barcode.trim(),
      name: name.trim(),
      price: parseFloat(price),
      stock: parseInt(stock, 10),
      category: finalCategory,
    };

    onAddItem(newItem);

    // Reset form
    setBarcode("");
    setName("");
    setPrice("");
    setStock("");
    setCategory("");
    setIsAddingCategory(false);
    setNewCategory("");
  };

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    if (val === "__add_new__") {
      setIsAddingCategory(true);
      setCategory("");
      setNewCategory("");
    } else {
      setCategory(val);
      setIsAddingCategory(false);
      setNewCategory("");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-4">
        {editingItem ? "✏️ Edit Item" : "➕ Add New Item"}
      </h2>
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

        {!isAddingCategory ? (
          <select
            value={category}
            onChange={handleCategoryChange}
            className="p-2 border rounded"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
            <option value="__add_new__">➕ Add new category...</option>
          </select>
        ) : (
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter new category"
            className="p-2 border rounded"
          />
        )}
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
