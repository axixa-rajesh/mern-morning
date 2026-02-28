import React from 'react';
import { useRef } from 'react';
import { all, store } from '../../libs/db';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Select from 'react-select'
import { useState } from 'react';
import { useEffect } from 'react';
const MySwal = withReactContent(Swal)
function Create({ usingModel, closeModal, loaddata }) {
    const [options, loadOptions] = useState([]);
    let name = useRef('');
    let price = useRef('');
    const [category_id, setCategory] = useState(null);
    useEffect(() => {
        all('category').then(r => {
            const data = r.map(info => ({ value: info.id, label: info.name }))
            loadOptions(data);
           console.log(data);
           
            
            
        })
    }, []);
    
    const saveData = (e) => {
        e.preventDefault();
        const info = {
            name: name.current.value,
            price: price.current.value,
            category_id: category_id.value
        };
        MySwal.fire({
            title: 'Trying to storing',
            html: <p>Please wait…</p>,
            allowOutsideClick: false,
            didOpen: async () => {
                MySwal.showLoading()

                try {
                    const res = await store('products', info)
                 
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
                        html: err.data.message
                    })
                }
            }
        })
    };
   

    return (
        
        <div className={!usingModel ? "min-h-screen bg-gray-100 flex items-center justify-center px-4" : ''}>
        
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
   
                {/* Header */}
                {
                    !usingModel ?
                (<><h2 className="text-2xl font-semibold text-gray-800 mb-1">
                    Create Product
                </h2>
                
                    <p className="text-sm text-gray-500 mb-6">
                        Add a new product to organize your content.
                            </p></>)
                        :""
                }
                {/* Form */}
                <form className="space-y-5">

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Product Name
                        </label>
                        <input
                            type="text"
                            ref={name} 
                            placeholder="e.g. Electronics"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Select Category
                        </label>
                        <Select value={category_id}
                            onChange={setCategory} options={options} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Price
                        </label>
                        <input
                            type="number"
                            ref={price}
                            placeholder="e.g. Electronics"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {/* Action */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium
                       hover:bg-indigo-700 transition duration-200"
                        onClick={saveData}
                        
                    >
                        Save Product
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Create;