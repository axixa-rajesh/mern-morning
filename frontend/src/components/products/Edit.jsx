import React, { useState } from 'react';
import { useRef } from 'react';
import { find, update,all } from '../../libs/db';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Select from 'react-select'
const MySwal = withReactContent(Swal)
function Edit() {
    const [options, loadOptions] = useState([]);
    let redirect = useNavigate();
    let name = useRef('');
    let price = useRef('');
    let [info, setInfo] = useState({});
    const [category_id, setCategory] = useState({});
    let id = useParams().id;
    useEffect(() => {
         
        find(`products/${id}`).then(fr => {
            setInfo(fr);
            all('category').then(r => {
                const data = r.map(info => ({ value: info.id, label: info.name }))
                loadOptions(data);
                setCategory(data.find(val => val.value == fr.category_id))

            })
        }).catch(e => {
            console.log(e);
        })
       
    }, []);
    
   
    
    const saveData = (e) => {
        e.preventDefault();
        const info = {
            name: name.current.value,
            price: price.current.value,
            category_id:category_id.value
        };
        MySwal.fire({
            title: 'Trying to updating',
            html: <p>Please wait…</p>,
            allowOutsideClick: false,
            didOpen: async () => {
                MySwal.showLoading()

                try {
                    const res = await update('products/'+id, info)
                    
                    
                    MySwal.hideLoading()

                    MySwal.update({
                        title: res.message,
                        icon: 'success',
                        html: <p>{res.data}</p>
                    })
                   
                        redirect('/products');
                   

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
               
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">

                        <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                            Edit Products
                        </h2>

                            <p className="text-sm text-gray-500 mb-6">
                                Edit products to organize your content.
                            </p>
                        
                {/* Form */}
                <form className="space-y-5">

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Products Name
                        </label>
                        <input
                            type="text"
                            ref={name}
                            defaultValue={info['name']}
                            placeholder="e.g. Electronics"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Select Category
                        </label>
                        <Select value={category_id}
                           
                            onChange={setCategory} options={options}
                            
                        />
                    </div>
                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Price
                        </label>
                        <textarea
                            rows="4" ref={price}
                            placeholder="Write a short price..."
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm resize-none
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            defaultValue={ info.price }></textarea>
                    </div>

                    {/* Action */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium
                       hover:bg-indigo-700 transition duration-200"
                        onClick={saveData}

                    >
                        Update Products
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Edit;