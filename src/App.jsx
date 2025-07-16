import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SellerPage from "./Pages/SellerPage";
import AddItemForm from "./components/AddItemForm";
import PrivateRoute from "./components/PrivateRoute";
import InvoicesPage from "./Pages/InvoicesPage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Navbar from "./components/Navbar";
import InventoryPage from "./Pages/InventoryPage";

function App() {
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
          Seller
        </Link>
        <Link to="/invoices" className="hover:underline">
          Invoices
        </Link>
        <Link to="/inventory" className="hover:underline">
          Inventory
        </Link>
      </nav>
      <Navbar />
      <Routes>
        <Route
          path="/inventory"
          element={
            <PrivateRoute>
              <InventoryPage />
            </PrivateRoute>
          }
        />
        {/* <Route path="/seller" element={<SellerPage />} /> */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <SellerPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/invoices"
          element={
            <PrivateRoute>
              <InvoicesPage />
            </PrivateRoute>
          }
        />
        {/* <Route path="/inventory" element={<InventoryPage />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
