import { useEffect, useRef, useState } from "react";
import html2pdf from "html2pdf.js";

export default function SellerPage() {
  const [inventory, setInventory] = useState([]);
  const [cart, setCart] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const scannerRef = useRef(null);
  const printRef = useRef(null);
  const newInvoiceNumberRef = useRef(null); // to track invoice number for PDF filename

  useEffect(() => {
    const storedInventory = localStorage.getItem("inventory-items");
    if (storedInventory) setInventory(JSON.parse(storedInventory));

    const storedInvoices = localStorage.getItem("sales-invoices");
    if (storedInvoices) setInvoices(JSON.parse(storedInvoices));
  }, []);

  const handleScan = (e) => {
    const code = e.target.value.trim();
    const item = inventory.find((i) => i.barcode === code);
    if (item) {
      addToCart(item);
    } else {
      alert("Item not found in inventory.");
    }
    e.target.value = "";
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.barcode === item.barcode);
      if (exists) {
        return prev.map((i) =>
          i.barcode === item.barcode ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        return [...prev, { ...item, qty: 1 }];
      }
    });
  };

  const removeFromCart = (barcode) => {
    setCart(cart.filter((i) => i.barcode !== barcode));
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  // PDF generation function with optional callback after saving
  const handleGeneratePDF = (callback) => {
    const element = printRef.current;
    if (!element) return;

    html2pdf()
      .set({
        margin: 0.5,
        filename: `Receipt_Invoice_${newInvoiceNumberRef.current}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .from(element)
      .save()
      .then(() => {
        if (callback) callback();
      });
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Cart is empty.");
      return;
    }

    let lastInvoiceNumber = parseInt(
      localStorage.getItem("last-invoice-number") || "1000",
      10
    );
    const newInvoiceNumber = lastInvoiceNumber + 1;
    newInvoiceNumberRef.current = newInvoiceNumber;
    localStorage.setItem("last-invoice-number", newInvoiceNumber.toString());

    const today = new Date();
    const invoiceDate = today.toISOString().split("T")[0];

    const newInvoice = {
      id: newInvoiceNumber,
      date: invoiceDate,
      items: cart,
      total,
    };

    const updatedInvoices = [...invoices, newInvoice];
    setInvoices(updatedInvoices);
    localStorage.setItem("sales-invoices", JSON.stringify(updatedInvoices));

    const updatedInventory = inventory.map((item) => {
      const cartItem = cart.find((c) => c.barcode === item.barcode);
      if (cartItem) {
        return { ...item, stock: item.stock - cartItem.qty };
      }
      return item;
    });
    setInventory(updatedInventory);
    localStorage.setItem("inventory-items", JSON.stringify(updatedInventory));

    // Wait briefly to ensure printRef updates with current cart, then generate PDF
    setTimeout(() => {
      handleGeneratePDF(() => {
        setCart([]); // clear cart only after PDF is saved
        alert(`✅ Receipt saved! Invoice #${newInvoiceNumber}`);
      });
    }, 300);
  };

  const todayDate = new Date().toISOString().split("T")[0];
  const todaysSales = invoices
    .filter((inv) => inv.date === todayDate)
    .reduce((sum, inv) => sum + inv.total, 0);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">🛒 Seller Page</h2>

      <input
        ref={scannerRef}
        onChange={handleScan}
        autoFocus
        className="opacity-0 absolute"
      />
      <button
        onClick={() => scannerRef.current?.focus()}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        📷 Activate Scanner
      </button>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Available Items</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {inventory.map((item) => (
            <div
              key={item.id}
              onClick={() => addToCart(item)}
              className="p-2 bg-white border rounded shadow hover:bg-gray-50 cursor-pointer"
            >
              <h4 className="font-bold">{item.name}</h4>
              <p>${item.price.toFixed(2)}</p>
              <p>Stock: {item.stock}</p>
              <p>Barcode: {item.barcode}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-lg font-bold mb-4">🧾 Cart</h3>
        {cart.length === 0 ? (
          <p>No items added.</p>
        ) : (
          <>
            <table className="w-full text-left border mb-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Qty</th>
                  <th className="p-2 border">Price</th>
                  <th className="p-2 border">Total</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((i) => (
                  <tr key={i.barcode}>
                    <td className="p-2 border">{i.name}</td>
                    <td className="p-2 border">{i.qty}</td>
                    <td className="p-2 border">${i.price.toFixed(2)}</td>
                    <td className="p-2 border">
                      ${(i.price * i.qty).toFixed(2)}
                    </td>
                    <td className="p-2 border">
                      <button
                        onClick={() => removeFromCart(i.barcode)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        ❌
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="text-lg font-bold mb-4">Total: ${total.toFixed(2)}</p>
            <button
              onClick={handleCheckout}
              className="px-4 py-2 bg-green-600 text-white rounded mr-2"
            >
              ✅ Checkout & Save PDF Receipt
            </button>
          </>
        )}
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-lg font-bold mb-2">📅 Today's Sales Summary</h3>
        <p>Total Sales: ${todaysSales.toFixed(2)}</p>
      </div>

      {/* Hidden receipt content for PDF */}
      <div
        ref={printRef}
        style={{ position: "absolute", left: "-9999px", top: 0 }}
      >
        <h2>🧾 Receipt</h2>
        <p>Invoice #: {newInvoiceNumberRef.current}</p>
        <p>Date: {new Date().toLocaleDateString()}</p>
        <ul>
          {cart.map((i) => (
            <li key={i.barcode}>
              {i.name} x{i.qty} = ${(i.qty * i.price).toFixed(2)}
            </li>
          ))}
        </ul>
        <p>Total: ${total.toFixed(2)}</p>
        <p>Thanks for shopping!</p>
      </div>
    </div>
  );
}
