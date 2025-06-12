# 🧾 Inventory Management System

This is a simple **Inventory and Sales Management** system built using **React**, designed to help small businesses track their product inventory and generate invoices for each sale.

## 🚀 Features

- 📦 **Inventory Management**: Add, update, and track stock levels by barcode.
- 🛒 **Cart System**: Add items to the cart by scanning a barcode or clicking on items.
- 🧾 **Sales Invoicing**: Auto-generates a new invoice number for every sale.
- 📈 **Sales Summary**: Shows total sales made for the current day.
- 🖨️ **Print Receipt**: Generates and saves a clean receipt as PDF using `react-to-print`.

## 📁 Project Structure

```
├── src/
│   ├── components/
│   ├── SellerPage.jsx
│   └── ...
├── public/
│   └── ...
└── README.md
```

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/your-username/inventory-management.git

# Navigate to the project directory
cd inventory-management

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 📦 Local Storage Keys

- `inventory-items`: stores inventory product data.
- `sales-invoices`: stores generated invoices.
- `last-invoice-number`: stores the most recent invoice number for auto-incrementing.

## 📄 Technologies Used

- React (with Hooks)
- Local Storage API
- Tailwind CSS (for styling)
- react-to-print (for generating printable receipts)

## 📜 License

This project is licensed under the MIT License.

---

> Made with 💻 by Zalmai Zazai
