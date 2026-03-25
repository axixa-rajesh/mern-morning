import React, { useState } from 'react';
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { store } from "../../libs/db"
const MySwal = withReactContent(Swal)
function Login(props) {
        const [formData, setFormData] = useState({
         
            email: "",
            password: "",
            
        })
    const handleChange = (e) => {
        const { name, value } = e.target
        // setFormData({ ...formData, [name]: value })
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const [errors, setErrors] = useState({})
    const validate = () => {

        let newErrors = {}

     
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


        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }
     const handleSubmit = async (e) => {
    
            e.preventDefault()
    
            // Validate first
            if (!validate()) return
    
            const info = {
              
                email: formData.email,
                password: formData.password
            }
    
            try {
    
                /*
                SweetAlert Loading State
                */
                MySwal.fire({
                    title: "Login...",
                    allowOutsideClick: false,
                    didOpen: () => {
                        MySwal.showLoading()
                    }
                })
    
                /*
                API CALL
                */
                const res = await store("auth/signin", info)
                localStorage.setItem( "token", res.token );
                
                MySwal.hideLoading()
    
                /*
                SUCCESS RESPONSE
                */
                MySwal.fire({
                    title: res?.message || "Login Successful",
                    icon: "success",
                    text:  "Login successfully"
                })
    
                /*
                RESET FORM
                */
                setFormData({
                  
                    email: "",
                    password: "",
                 
                })
    
            } catch (err) {
                console.log(err);
                
                MySwal.hideLoading()
    
                /*
                ERROR HANDLING
                - 400 → Email already exists
                */
                if (err?.status === 400) {
                    MySwal.fire({
                        title: "Login Failed",
                        icon: "error",
                        text: err?.data?.message || ""
                    })
                } else if (err?.status === 500) {
                    MySwal.fire({
                        title: "Login Failed",
                        icon: "error",
                        text: err?.data?.message || ""
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
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">

            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">

                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    Create Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">


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

                

                    {/* SUBMIT BUTTON */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;