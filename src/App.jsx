// import { useState, useEffect } from "react";
// import AddItemForm from "./Components/AddItemForm";
// import AddItemFormWithBarcode from "./Components/AddItemWithCameraBarcode";
// import AddItemFormExternalBarcode from "./Components/ExternalBarcodeScannerforAddingItem";

// import jsPDF from "jspdf";

// const DUMMY_ITEMS = [
//   {
//     id: 1,
//     barcode: "1234567890",
//     name: "Apple",
//     price: 0.99,
//     stock: 50,
//     category: "Fruit",
//   },
//   {
//     id: 2,
//     barcode: "2345678901",
//     name: "Banana",
//     price: 0.79,
//     stock: 100,
//     category: "Fruit",
//   },
//   {
//     id: 3,
//     barcode: "3456789012",
//     name: "Milk",
//     price: 1.99,
//     stock: 30,
//     category: "Dairy",
//   },
//   {
//     id: 4,
//     barcode: "4567890123",
//     name: "Bread",
//     price: 2.49,
//     stock: 40,
//     category: "Bakery",
//   },
//   {
//     id: 5,
//     barcode: "5678901234",
//     name: "Eggs",
//     price: 3.99,
//     stock: 60,
//     category: "Dairy",
//   },
//   {
//     id: 6,
//     barcode: "6789012345",
//     name: "Orange Juice",
//     price: 4.99,
//     stock: 25,
//     category: "Beverages",
//   },
//   {
//     id: 7,
//     barcode: "7890123456",
//     name: "Chicken Breast",
//     price: 5.49,
//     stock: 20,
//     category: "Meat",
//   },
//   {
//     id: 8,
//     barcode: "8901234567",
//     name: "Rice",
//     price: 1.29,
//     stock: 80,
//     category: "Grains",
//   },
//   {
//     id: 9,
//     barcode: "9012345678",
//     name: "Cheese",
//     price: 3.49,
//     stock: 35,
//     category: "Dairy",
//   },
//   {
//     id: 10,
//     barcode: "0123456789",
//     name: "Tomato",
//     price: 0.69,
//     stock: 70,
//     category: "Vegetables",
//   },
// ];

// function App() {
//   const [items, setItems] = useState(() => {
//     const saved = localStorage.getItem("items");
//     return saved ? JSON.parse(saved) : DUMMY_ITEMS;
//   });

//   const [editingItemId, setEditingItemId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("All");

//   useEffect(() => {
//     localStorage.setItem("items", JSON.stringify(items));
//   }, [items]);

//   const handleAddItem = (item) => {
//     if (editingItemId) {
//       setItems((prev) =>
//         prev.map((i) => (i.id === editingItemId ? { ...item, id: i.id } : i))
//       );
//       setEditingItemId(null);
//     } else {
//       setItems([...items, item]);
//     }
//   };

//   const handleEdit = (item) => {
//     setEditingItemId(item.id);
//   };

//   const handleDelete = (id) => {
//     if (confirm("Are you sure you want to delete this item?")) {
//       setItems(items.filter((i) => i.id !== id));
//       if (editingItemId === id) setEditingItemId(null);
//     }
//   };

//   const currentItem = items.find((i) => i.id === editingItemId);

//   // Get unique categories for dropdown, sorted alphabetically
//   const categories = [
//     "All",
//     ...Array.from(new Set(items.map((item) => item.category))).sort(),
//   ];

//   // Filter items by search term AND category
//   const filteredItems = items.filter((item) => {
//     const term = searchTerm.toLowerCase();
//     const matchesSearch =
//       item.name.toLowerCase().includes(term) ||
//       item.barcode.toLowerCase().includes(term) ||
//       item.category.toLowerCase().includes(term);

//     const matchesCategory =
//       categoryFilter === "All" || item.category === categoryFilter;

//     return matchesSearch && matchesCategory;
//   });

//   // CSV Export function
//   const exportToCSV = () => {
//     const headers = ["Barcode", "Name", "Price", "Stock", "Category"];
//     const rows = filteredItems.map((item) => [
//       item.barcode,
//       item.name,
//       item.price,
//       item.stock,
//       item.category,
//     ]);

//     let csvContent =
//       "data:text/csv;charset=utf-8," +
//       [headers, ...rows].map((e) => e.join(",")).join("\n");

//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "items_export.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // PDF Export function
//   const exportToPDF = () => {
//     const doc = new jsPDF();

//     const tableColumn = ["Barcode", "Name", "Price", "Stock", "Category"];
//     const tableRows = [];

//     filteredItems.forEach((item) => {
//       const itemData = [
//         item.barcode,
//         item.name,
//         item.price.toString(),
//         item.stock.toString(),
//         item.category,
//       ];
//       tableRows.push(itemData);
//     });

//     doc.setFontSize(18);
//     doc.text("Items List Export", 14, 22);

//     let startY = 30;
//     const rowHeight = 10;
//     const colWidths = [40, 40, 20, 20, 40];
//     let x = 14;

//     tableColumn.forEach((col, i) => {
//       doc.text(col, x, startY);
//       x += colWidths[i];
//     });

//     let y = startY + rowHeight;
//     tableRows.forEach((row) => {
//       let x = 14;
//       row.forEach((cell, i) => {
//         doc.text(cell, x, y);
//         x += colWidths[i];
//       });
//       y += rowHeight;
//     });

//     doc.save("items_export.pdf");
//   };

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen max-w-7xl mx-auto">
//       <AddItemForm
//         onAddItem={handleAddItem}
//         editingItem={currentItem}
//         categories={categories.filter((c) => c !== "All")} // remove "All" from dropdown options
//       />

//       <div className="mt-6 mb-4 flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
//         <input
//           type="text"
//           placeholder="🔍 Search by name, barcode, or category..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="flex-grow p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
//         />

//         <select
//           value={categoryFilter}
//           onChange={(e) => setCategoryFilter(e.target.value)}
//           className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 max-w-xs"
//         >
//           {categories.map((cat) => (
//             <option key={cat} value={cat}>
//               {cat}
//             </option>
//           ))}
//         </select>

//         <button
//           onClick={exportToCSV}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Export CSV
//         </button>

//         <button
//           onClick={exportToPDF}
//           className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//         >
//           Export PDF
//         </button>
//       </div>

//       <div className="mt-6 bg-white p-4 rounded shadow">
//         <h2 className="text-xl font-bold mb-4">🧾 Items List</h2>
//         {filteredItems.length === 0 ? (
//           <p className="text-gray-500">No items found.</p>
//         ) : (
//           <table className="w-full text-left border">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="p-2 border">Barcode</th>
//                 <th className="p-2 border">Name</th>
//                 <th className="p-2 border">Price</th>
//                 <th className="p-2 border">Stock</th>
//                 <th className="p-2 border">Category</th>
//                 <th className="p-2 border">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredItems.map((item) => (
//                 <tr key={item.id} className="hover:bg-gray-50">
//                   <td className="p-2 border">{item.barcode}</td>
//                   <td className="p-2 border">{item.name}</td>
//                   <td className="p-2 border">${item.price.toFixed(2)}</td>
//                   <td className="p-2 border">{item.stock}</td>
//                   <td className="p-2 border">{item.category}</td>
//                   <td className="p-2 border space-x-2">
//                     <button
//                       onClick={() => handleEdit(item)}
//                       className="px-2 py-1 bg-yellow-400 text-white rounded"
//                     >
//                       ✏️ Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(item.id)}
//                       className="px-2 py-1 bg-red-600 text-white rounded"
//                     >
//                       🗑️ Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SellerPage from "./Pages/SellerPage";
import AddItemForm from "./Components/AddItemForm";
import InvoicesPage from "./Pages/InvoicesPage";

function App() {
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
    <Router>
      {/* <nav className="bg-blue-600 text-white p-4 flex gap-4">
        <Link to="/" className="hover:underline">
          Inventory
        </Link>
        <Link to="/seller" className="hover:underline">
          Seller
        </Link>
      </nav> */}
      <nav className="bg-blue-600 text-white p-4 flex gap-4">
        <Link to="/" className="hover:underline">
          Inventory
        </Link>
        <Link to="/seller" className="hover:underline">
          Seller
        </Link>
        <Link to="/invoices" className="hover:underline">
          Invoices
        </Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <div className="p-8 bg-gray-100 min-h-screen">
              <h1 className="text-3xl font-bold mb-4">
                📦 Inventory Management
              </h1>
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
                          <td className="p-2 border">
                            ${item.price.toFixed(2)}
                          </td>
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
          }
        />
        <Route path="/seller" element={<SellerPage />} />
        <Route path="/invoices" element={<InvoicesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
