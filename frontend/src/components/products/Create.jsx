import React from 'react';
import { useRef } from 'react';
import { store } from '../../libs/db';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
function Create({ usingModel, closeModal, loaddata }) {
    let categoryname = useRef('');
    let categorydescription = useRef('');
    const saveData = (e) => {
        e.preventDefault();
        const info = {
            name: categoryname.current.value,
            description: categorydescription.current.value
        };
        MySwal.fire({
            title: 'Trying to storing',
            html: <p>Please wait…</p>,
            allowOutsideClick: false,
            didOpen: async () => {
                MySwal.showLoading()

                try {
                    const res = await store('category', info)
                 
                    MySwal.hideLoading()

                    MySwal.update({
                        title: res.message,
                        icon: 'success',
                        html: <p>{res.data}</p>
                    })
                    if (closeModal) {
                        closeModal(false);
                    }
                    if (loaddata) {
                        loaddata[1](!loaddata[0])
                    }

                } catch (err) {
                    MySwal.hideLoading()

                    MySwal.update({
                        title: 'Error',
                        icon: 'error',
                        text: 'API call failed',
                        html:err.data.message
                    })
                }
            }
        })




/* 

        store('category', info).then(r => {
            MySwal.fire({
                title: <p>Hello World</p>,
                didOpen: () => {
                    // `MySwal` is a subclass of `Swal` with all the same instance & static methods
                    MySwal.showLoading()
                },
            }).then(() => {
                return MySwal.fire(<p>Shorthand works too</p>)
            })
            console.log(r);
            if (closeModal) {
                closeModal(false);
            }
        }).catch(e => {
            window.alert(e.data.data);
            
            console.log(e);
            
        }) */
          
    };
    return (
        
        <div className={!usingModel ? "min-h-screen bg-gray-100 flex items-center justify-center px-4" : ''}>
        
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        Rajesh kumar purohit
                {/* Header */}
                {
                    !usingModel ?
                (<><h2 className="text-2xl font-semibold text-gray-800 mb-1">
                    Create Category
                </h2>
                
                    <p className="text-sm text-gray-500 mb-6">
                        Add a new category to organize your content.
                            </p></>)
                        :""
                }
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
                            rows="4" ref = { categorydescription}
                            placeholder="Write a short description..."
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm resize-none
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        ></textarea>
                    </div>

                    {/* Action */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium
                       hover:bg-indigo-700 transition duration-200"
                        onClick={saveData}
                        
                    >
                        Save Category
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Create;