import { useState, useEffect } from "react";
import AddItemForm from "./Components/AddItemForm";

const DUMMY_ITEMS = [
  {
    id: 1,
    barcode: "123456789",
    name: "Apple",
    price: 1.2,
    stock: 100,
    category: "Fruit",
  },
  {
    id: 2,
    barcode: "987654321",
    name: "Banana",
    price: 0.8,
    stock: 150,
    category: "Fruit",
  },
  {
    id: 3,
    barcode: "111222333",
    name: "Milk",
    price: 2.5,
    stock: 50,
    category: "Dairy",
  },
  {
    id: 4,
    barcode: "444555666",
    name: "Bread",
    price: 1.5,
    stock: 75,
    category: "Bakery",
  },
  {
    id: 5,
    barcode: "777888999",
    name: "Eggs",
    price: 3.0,
    stock: 200,
    category: "Dairy",
  },
  {
    id: 6,
    barcode: "222333444",
    name: "Carrot",
    price: 0.9,
    stock: 120,
    category: "Vegetable",
  },
  {
    id: 7,
    barcode: "555666777",
    name: "Tomato",
    price: 1.1,
    stock: 130,
    category: "Vegetable",
  },
  {
    id: 8,
    barcode: "888999000",
    name: "Chicken",
    price: 5.0,
    stock: 40,
    category: "Meat",
  },
  {
    id: 9,
    barcode: "333444555",
    name: "Cheese",
    price: 4.0,
    stock: 60,
    category: "Dairy",
  },
  {
    id: 10,
    barcode: "666777888",
    name: "Orange Juice",
    price: 3.5,
    stock: 80,
    category: "Beverage",
  },
];

function App() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("inventory-items");
    if (saved) return JSON.parse(saved);
    // If no saved data, load dummy data initially
    return DUMMY_ITEMS;
  });

  const [editingItemId, setEditingItemId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Save items to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("inventory-items", JSON.stringify(items));
  }, [items]);

  const handleAddItem = (item) => {
    if (editingItemId) {
      setItems((prev) =>
        prev.map((i) => (i.id === editingItemId ? { ...item, id: i.id } : i))
      );
      setEditingItemId(null);
    } else {
      setItems([...items, item]);
    }
  };

  const handleEdit = (item) => {
    setEditingItemId(item.id);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      setItems(items.filter((i) => i.id !== id));
      if (editingItemId === id) setEditingItemId(null);
    }
  };

  const currentItem = items.find((i) => i.id === editingItemId);

  // Filter items based on search term (case insensitive)
  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.barcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen max-w-7xl mx-auto">
      <AddItemForm onAddItem={handleAddItem} editingItem={currentItem} />

      {/* Search Input */}
      <div className="mt-6 mb-4">
        <input
          type="text"
          placeholder="🔍 Search by name, barcode, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">🧾 Items List</h2>
        {filteredItems.length === 0 ? (
          <p className="text-gray-500">No items found.</p>
        ) : (
          <table className="w-full text-left border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border border-gray-300">Barcode</th>
                <th className="p-2 border border-gray-300">Name</th>
                <th className="p-2 border border-gray-300">Price</th>
                <th className="p-2 border border-gray-300">Stock</th>
                <th className="p-2 border border-gray-300">Category</th>
                <th className="p-2 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 even:bg-gray-100 transition-colors"
                >
                  <td className="p-2 border border-gray-300">{item.barcode}</td>
                  <td className="p-2 border border-gray-300">{item.name}</td>
                  <td className="p-2 border border-gray-300">${item.price}</td>
                  <td className="p-2 border border-gray-300">{item.stock}</td>
                  <td className="p-2 border border-gray-300">
                    {item.category}
                  </td>
                  <td className="p-2 border border-gray-300 space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
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
  );
}

export default App;
