import { useState, useEffect } from "react";
import AddItemForm from "./Components/AddItemForm";
import jsPDF from "jspdf";

const DUMMY_ITEMS = [
  {
    id: 1,
    barcode: "1234567890",
    name: "Apple",
    price: 0.99,
    stock: 50,
    category: "Fruit",
  },
  {
    id: 2,
    barcode: "2345678901",
    name: "Banana",
    price: 0.79,
    stock: 100,
    category: "Fruit",
  },
  {
    id: 3,
    barcode: "3456789012",
    name: "Milk",
    price: 1.99,
    stock: 30,
    category: "Dairy",
  },
  {
    id: 4,
    barcode: "4567890123",
    name: "Bread",
    price: 2.49,
    stock: 40,
    category: "Bakery",
  },
  {
    id: 5,
    barcode: "5678901234",
    name: "Eggs",
    price: 3.99,
    stock: 60,
    category: "Dairy",
  },
  {
    id: 6,
    barcode: "6789012345",
    name: "Orange Juice",
    price: 4.99,
    stock: 25,
    category: "Beverages",
  },
  {
    id: 7,
    barcode: "7890123456",
    name: "Chicken Breast",
    price: 5.49,
    stock: 20,
    category: "Meat",
  },
  {
    id: 8,
    barcode: "8901234567",
    name: "Rice",
    price: 1.29,
    stock: 80,
    category: "Grains",
  },
  {
    id: 9,
    barcode: "9012345678",
    name: "Cheese",
    price: 3.49,
    stock: 35,
    category: "Dairy",
  },
  {
    id: 10,
    barcode: "0123456789",
    name: "Tomato",
    price: 0.69,
    stock: 70,
    category: "Vegetables",
  },
];

function App() {
  const [items, setItems] = useState(() => {
    // Load from localStorage or fallback to dummy data
    const saved = localStorage.getItem("items");
    return saved ? JSON.parse(saved) : DUMMY_ITEMS;
  });

  const [editingItemId, setEditingItemId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
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
  const filteredItems = items.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      item.barcode.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term)
    );
  });

  // CSV Export function
  const exportToCSV = () => {
    const headers = ["Barcode", "Name", "Price", "Stock", "Category"];
    const rows = filteredItems.map((item) => [
      item.barcode,
      item.name,
      item.price,
      item.stock,
      item.category,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "items_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // PDF Export function
  const exportToPDF = () => {
    const doc = new jsPDF();

    const tableColumn = ["Barcode", "Name", "Price", "Stock", "Category"];
    const tableRows = [];

    filteredItems.forEach((item) => {
      const itemData = [
        item.barcode,
        item.name,
        item.price.toString(),
        item.stock.toString(),
        item.category,
      ];
      tableRows.push(itemData);
    });

    // Title
    doc.setFontSize(18);
    doc.text("Items List Export", 14, 22);

    // Draw headers
    let startY = 30;
    const rowHeight = 10;
    const colWidths = [40, 40, 20, 20, 40];
    let x = 14;
    tableColumn.forEach((col, i) => {
      doc.text(col, x, startY);
      x += colWidths[i];
    });

    // Draw rows
    let y = startY + rowHeight;
    tableRows.forEach((row) => {
      let x = 14;
      row.forEach((cell, i) => {
        doc.text(cell, x, y);
        x += colWidths[i];
      });
      y += rowHeight;
    });

    doc.save("items_export.pdf");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen max-w-7xl mx-auto">
      <AddItemForm onAddItem={handleAddItem} editingItem={currentItem} />

      <div className="mt-6 mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="🔍 Search by name, barcode, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          onClick={exportToCSV}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Export CSV
        </button>

        <button
          onClick={exportToPDF}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Export PDF
        </button>
      </div>

      <div className="mt-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">🧾 Items List</h2>
        {filteredItems.length === 0 ? (
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
              {filteredItems.map((item) => (
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
  );
}

export default App;
