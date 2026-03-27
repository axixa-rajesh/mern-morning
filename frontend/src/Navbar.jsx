import React, { useState } from "react";
import { Link } from "react-router-dom";
function Navbar(props) {
    const [isOpen, setIsOpen] = useState(false);

    // Simulate auth (replace with real JWT logic)
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <nav className="bg-gray-900 text-white px-6 py-4">
            <div className="flex items-center justify-between">

                {/* Logo */}
                <h1 className="text-2xl font-bold">MyStore</h1>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">



                    <Link to="/categories" className="hover:text-yellow-400">Categories</Link>

                    <Link to="/products" className="hover:text-yellow-400">Products</Link>
                    {!token ? (
                        <>
                            <Link to="/" className="hover:text-yellow-400">Home</Link>

                            <Link to="/user/login" className="hover:text-yellow-400">Login</Link>
                            <Link to="/user/create" className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-300">
                                Register
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/dashboard" className="hover:text-yellow-400">Home</Link>
                            <span className="text-green-400">Welcome User</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 px-3 py-1 rounded hover:bg-red-400"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile Button */}
                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    ☰
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="mt-4 flex flex-col gap-3 md:hidden">

                    <Link to="/">Home</Link>

                    <Link to="/category/electronics">Electronics</Link>
                    <Link to="/category/fashion">Fashion</Link>
                    <Link to="/category/books">Books</Link>

                    <Link to="/products">Products</Link>

                    {!token ? (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    ) : (
                        <>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Navbar;