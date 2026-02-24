import React, { useState } from 'react';
import { useRef } from 'react';
import { find, update } from '../../libs/db';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const MySwal = withReactContent(Swal)
function Edit() {
    let redirect = useNavigate();
    let categoryname = useRef('');
    let categorydescription = useRef('');
    let [info,setInfo] = useState({});
    let id = useParams().id;
    useEffect(() => {
        find(`category/${id}`).then(r => {
            setInfo(r);
        }).catch(e => {
            console.log(e);
        }) 
    },[]);
    
    const saveData = (e) => {
        e.preventDefault();
        const info = {
            name: categoryname.current.value,
            description: categorydescription.current.value
        };
        MySwal.fire({
            title: 'Trying to updating',
            html: <p>Please wait…</p>,
            allowOutsideClick: false,
            didOpen: async () => {
                MySwal.showLoading()

                try {
                    const res = await update('category/'+id, info)
                    
                    
                    MySwal.hideLoading()

                    MySwal.update({
                        title: res.message,
                        icon: 'success',
                        html: <p>{res.data}</p>
                    })
                   
                        redirect('/categories');
                   

                } catch (err) {
                    MySwal.hideLoading()

                    MySwal.update({
                        title: 'Error',
                        icon: 'error',
                        text: 'API call failed',
                        html: err.data.message
                    })
                }
            }
        })




    };
    return (

        <div className={ "min-h-screen bg-gray-100 flex items-center justify-center px-4" }>
                This is rajesh branch data
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">

                        <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                            Edit Category
                        </h2>

                            <p className="text-sm text-gray-500 mb-6">
                                Edit category to organize your content.
                            </p>
                        
                {/* Form */}
                <form className="space-y-5">

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category Name
                        </label>
                        <input
                            type="text"
                            ref={categoryname}
                            defaultValue={info['name']}
                            placeholder="e.g. Electronics"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            rows="4" ref={categorydescription}
                            placeholder="Write a short description..."
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm resize-none
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            defaultValue={ info.description }></textarea>
                    </div>

                    {/* Action */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium
                       hover:bg-indigo-700 transition duration-200"
                        onClick={saveData}

                    >
                        Update Category
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Edit;