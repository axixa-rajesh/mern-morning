import React, { useState } from "react";
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

                    <a href="/" className="hover:text-yellow-400">Home</a>


                    <a href="/categories" className="hover:text-yellow-400">Categories</a>

                    <a href="/products" className="hover:text-yellow-400">Products</a>
                    {!token ? (
                        <>
                            <a href="/user/login" className="hover:text-yellow-400">Login</a>
                            <a href="/user/create" className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-300">
                                Register
                            </a>
                        </>
                    ) : (
                        <>
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

                    <a href="/">Home</a>

                    <a href="/category/electronics">Electronics</a>
                    <a href="/category/fashion">Fashion</a>
                    <a href="/category/books">Books</a>

                    <a href="/products">Products</a>

                    {!token ? (
                        <>
                            <a href="/login">Login</a>
                            <a href="/register">Register</a>
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