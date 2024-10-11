import React, { useState } from 'react';
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({
    data,
    fetchdata
}) => {
    const [editProduct, setEditProduct] = useState(false);

    return (
        <div className='bg-white p-4 rounded shadow-md flex flex-col'>
            <div className='w-full flex justify-center mb-2'>
                <img 
                    src={data?.productImage[0]} 
                    className='w-full h-32 object-contain' 
                    alt={data.productName} 
                />
            </div>
            <h1 className='text-ellipsis line-clamp-2 text-lg font-semibold'>{data.productName}</h1>
            <p className='font-semibold text-xl'>
                {displayINRCurrency(data.sellingPrice)}
            </p>
            <div className='flex justify-end mt-2'>
                <div className='w-fit p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={() => setEditProduct(true)}>
                    <MdModeEditOutline />
                </div>
            </div>
            {editProduct && (
                <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata} />
            )}
        </div>
    );
}

export default AdminProductCard;
