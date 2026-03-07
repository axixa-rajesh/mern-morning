import { useState } from 'react'
import { all, deletes } from '../../libs/db'
import { useEffect } from 'react'
import Modal from './Modal'
import Create from './Create'
import {Link} from "react-router-dom"
function List(props) {
    const [data, setData] = useState([])
    const [isReload, setReload] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        all('category').then(fdata => {
            setData(fdata);
        }).catch(e => {
            window.alert(e);

        })
    }, [isReload]);
    const deleteit = (id) => {
        if (window.confirm("Do you really want to delete this record?")) {
            deletes('category/' + id).then(fdata => {
                setData(fdata);
                setReload(!isReload)
                window.alert("Deleted");

            }).catch(e => {
                window.alert(e);

            })
        }
    }
    return (
        <>
           
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 shadow-lg transition-all"
                >
                   Create
                </button>

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Category : : Create"
                   
                >
                <Create usingModel={true} closeModal={setIsModalOpen} loaddata={[isReload,setReload]} > </Create>
                </Modal>
           
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden border-b flex items-center justify-center border-gray-200 shadow sm:rounded-lg">
                            <table className="min-w-300 divide-y  pt-1 divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>S.No</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>Name</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>Description</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {
                                        data.length ?
                                            data.map((info, index) => {
                                                return <tr key={"row" + index} className="hover:bg-gray-50 transition-colors">
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{index + 1}</td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{info.name}</td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{info.description}</td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                        <Link className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 shadow-lg transition-all" to={"/categories/edit/" + info._id}>Edit</Link>
                                                        <button className="px-6 py-3 mx-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 shadow-lg transition-all" onClick={() => {
                                                            deleteit(info._id)
                                                        }}>Delete</button>
                                                    </td>
                                                </tr>
                                            })
                                            :
                                            <tr>
                                                <th colSpan={3}>
                                                    Data not Found
                                                </th>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default List;
