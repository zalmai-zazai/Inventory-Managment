import { useEffect, useState } from "react";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("sales-invoices");
    if (stored) setInvoices(JSON.parse(stored));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">📜 Invoice History</h2>

      <label className="block mb-4">
        Filter by Date:{" "}
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border p-2 rounded"
        />
      </label>

      <div className="space-y-4 max-h-[60vh] overflow-auto">
        {invoices.length === 0 ? (
          <p>No invoices found.</p>
        ) : (
          invoices
            .filter((inv) => (filterDate ? inv.date === filterDate : true))
            .map((inv, index) => (
              <div key={inv.id} className="border p-4 bg-white rounded shadow">
                <p>
                  <strong>Invoice #:</strong> {inv.id || index + 1}
                </p>
                <p>
                  <strong>Date:</strong> {inv.date}
                </p>
                <p>
                  <strong>Total:</strong> ${inv.total.toFixed(2)}
                </p>
                <details>
                  <summary className="cursor-pointer mt-2 text-blue-600">
                    View Items
                  </summary>
                  <ul className="ml-4 mt-2 list-disc">
                    {inv.items.map((item) => (
                      <li key={item.barcode}>
                        {item.name} x{item.qty} — $
                        {(item.price * item.qty).toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
            ))
        )}
      </div>

      {filterDate && (
        <p className="mt-6 font-bold">
          💰 Total Sales on {filterDate}: $
          {invoices
            .filter((inv) => inv.date === filterDate)
            .reduce((sum, inv) => sum + inv.total, 0)
            .toFixed(2)}
        </p>
      )}
    </div>
  );
}
