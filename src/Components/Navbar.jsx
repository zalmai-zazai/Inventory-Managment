import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Navbar() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <div>
        <Link to="/" className="mr-4">
          Dashboard
        </Link>
      </div>
      <div>
        {currentUser ? (
          <>
            <span className="mr-4">{currentUser.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">
              Login
            </Link>
            <Link to="/signup" className="bg-blue-600 px-3 py-1 rounded">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
