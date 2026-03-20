/*
===========================================================
Registration Component
-----------------------------------------------------------
Features:
1. Tailwind CSS modern UI
2. Frontend validation (name, email, password)
3. Password & Confirm Password matching
4. SweetAlert2 for success & error handling
5. API integration using store("auth/register", info)
6. Handles 400 error (email already exists)
7. Clean and well-documented code
===========================================================
*/

import React, { useState } from "react"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

// DB/API helper
import { store } from "../../libs/db"

// SweetAlert instance
const MySwal = withReactContent(Swal)

const Registration = () => {

    /*
    ===========================================================
    STATE MANAGEMENT
    ===========================================================
    */
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [errors, setErrors] = useState({})



    /*
    ===========================================================
    HANDLE INPUT CHANGE
    ===========================================================
    */
    const handleChange = (e) => {
        const { name, value } = e.target
        // setFormData({ ...formData, [name]: value })
         setFormData(prev => ({
            ...prev,
            [name]: value
        })) 
    }



    /*
    ===========================================================
    VALIDATION FUNCTION
    ===========================================================
    */
    const validate = () => {

        let newErrors = {}

        // Name
        if (!formData.name.trim()) {
            newErrors.name = "Name is required"
        }

        // Email
        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format"
        }

        // Password
        if (!formData.password) {
            newErrors.password = "Password is required"
        } else if (formData.password.length < 6) {
            newErrors.password = "Minimum 6 characters required"
        }

        // Confirm Password
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Confirm password is required"
        }

        // Match Password
        if (
            formData.password &&
            formData.confirmPassword &&
            formData.password !== formData.confirmPassword
        ) {
            newErrors.confirmPassword = "Passwords do not match"
        }

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }



    /*
    ===========================================================
    HANDLE FORM SUBMIT
    ===========================================================
    */
    const handleSubmit = async (e) => {

        e.preventDefault()

        // Validate first
        if (!validate()) return

        const info = {
            name: formData.name,
            email: formData.email,
            password: formData.password
        }

        try {

            /*
            SweetAlert Loading State
            */
            MySwal.fire({
                title: "Registering...",
                allowOutsideClick: false,
                didOpen: () => {
                    MySwal.showLoading()
                }
            })

            /*
            API CALL
            */
            const res = await store("auth/register", info)

            MySwal.hideLoading()

            /*
            SUCCESS RESPONSE
            */
            MySwal.fire({
                title: res?.message || "Registration Successful",
                icon: "success",
                text:  "User registered successfully"
            })

            /*
            RESET FORM
            */
            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            })

        } catch (err) {

            MySwal.hideLoading()

            /*
            ERROR HANDLING
            - 400 → Email already exists
            */
            if (err?.status === 400) {
                MySwal.fire({
                    title: "Registration Failed",
                    icon: "error",
                    text: err?.msg || "Email already exists"
                })
            } else {
                MySwal.fire({
                    title: "Error",
                    icon: "error",
                    text: "Something went wrong"
                })
            }
        }
    }



    /*
    ===========================================================
    UI DESIGN (TAILWIND)
    ===========================================================
    */

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">

            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">

                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    Create Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* NAME */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            placeholder="Enter your name"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    {/* EMAIL */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            placeholder="Enter password"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            placeholder="Confirm password"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                        )}
                    </div>

                    {/* SUBMIT BUTTON */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Register
                    </button>

                </form>

            </div>

        </div>
    )
}

export default Registration