import { useState } from "react";
import AddItemForm from "./Componenets/AddItemForm";

function App() {
  const [items, setItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);

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
    }
  };

  const currentItem = items.find((i) => i.id === editingItemId);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <AddItemForm onAddItem={handleAddItem} editingItem={currentItem} />

      <div className="mt-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">🧾 Items List</h2>
        {items.length === 0 ? (
          <p className="text-gray-500">No items added yet.</p>
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
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{item.barcode}</td>
                  <td className="p-2 border">{item.name}</td>
                  <td className="p-2 border">${item.price}</td>
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
  );
}

export default App;
