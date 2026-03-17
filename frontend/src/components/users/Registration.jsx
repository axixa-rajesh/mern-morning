/*
===========================================================
Registration Component
-----------------------------------------------------------
Features:
1. Tailwind CSS based responsive UI
2. Frontend validations
3. Password & Confirm Password matching
4. SweetAlert2 for success / error messages
5. Uses store() function for DB insertion
6. Clean and documented code
===========================================================
*/

import React, { useState } from "react"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

// DB helper function
import { store } from "../../libs/db"

// SweetAlert instance
const MySwal = withReactContent(Swal)

const Registration = () => {

    /*
    ===========================================
    STATE MANAGEMENT
    ===========================================
    formData -> form fields values
    errors -> validation error messages
    */
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [errors, setErrors] = useState({})



    /*
    ===========================================
    HANDLE INPUT CHANGE
    Updates form state dynamically
    ===========================================
    */
    const handleChange = (e) => {

        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }



    /*
    ===========================================
    FORM VALIDATION
    Checks all frontend validation rules
    ===========================================
    */
    const validate = () => {

        let newErrors = {}

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = "Name is required"
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format"
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = "Password is required"
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters"
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Confirm password is required"
        }

        // Password match validation
        if (
            formData.password &&
            formData.confirmPassword &&
            formData.password !== formData.confirmPassword
        ) {
            newErrors.confirmPassword = "Passwords do not match"
        }

        setErrors(newErrors)

        // return true if no error
        return Object.keys(newErrors).length === 0
    }



    /*
    ===========================================
    HANDLE FORM SUBMISSION
    ===========================================
    */
    const handleSubmit = async (e) => {

        e.preventDefault()

        // Validate form
        if (!validate()) return


        /*
        Data to be stored in database
        confirmPassword normally not stored
        */
        const info = {
            name: formData.name,
            email: formData.email,
            password: formData.password
        }

        try {

            /*
            SweetAlert loading state
            */
            MySwal.fire({
                title: "Registering...",
                allowOutsideClick: false,
                didOpen: () => {
                    MySwal.showLoading()
                }
            })

            /*
            Database insert
            */
            const res = await store("users", info)

            MySwal.hideLoading()

            /*
            Success response
            */
            MySwal.fire({
                title: res.message || "Registration Successful",
                icon: "success",
                html: <p>{res.data}</p>
            })

            /*
            Reset form after success
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
            Error response
            */
            MySwal.fire({
                title: "Error",
                icon: "error",
                html: err?.data?.message || "API call failed"
            })
        }
    }



    /*
    ===========================================
    UI DESIGN
    ===========================================
    */

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

                <h2 className="text-2xl font-bold text-center mb-6">
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
                            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                            placeholder="Enter your name"
                        />

                        {errors.name && (
                            <p className="text-red-500 text-sm">
                                {errors.name}
                            </p>
                        )}
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
                            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                            placeholder="Enter your email"
                        />

                        {errors.email && (
                            <p className="text-red-500 text-sm">
                                {errors.email}
                            </p>
                        )}
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
                            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                            placeholder="Enter password"
                        />

                        {errors.password && (
                            <p className="text-red-500 text-sm">
                                {errors.password}
                            </p>
                        )}
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
                            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                            placeholder="Confirm password"
                        />

                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm">
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>



                    {/* SUBMIT BUTTON */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Register
                    </button>

                </form>

            </div>

        </div>
    )
}

export default Registration