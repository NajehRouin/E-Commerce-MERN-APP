import React, { useEffect, useState } from "react";
import State from "../common/state";
import Product from "../common/Product";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import Api from "../common";
import displayINRCurrency from "../helpers/displayCurrency";

const ProductOrder = ({ orderId, onClose, callFunc }) => {
  const [productsOrder, SetProductsOrder] = useState([]);

  console.log("orderId",orderId)
  const getProducts = async () => {
    try {
      const fetchResponse = await fetch(Api.getOrderById.url, {
        method: Api.getOrderById.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderId,
        }),
      });

      const responseData = await fetchResponse.json();
   
      if (responseData.success) {
    
        SetProductsOrder(responseData?.data?.products);

       // onClose();
        callFunc();
      }
    } catch (error) {
        console.log("error",error)
    }
  };

  
  useEffect(()=>{
    getProducts()
},[])

return (
    <div className="fixed top-0 bottom-0 left-0 right-0 min-w-[600px] h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50 rounded-lg">
      <div className="mx-auto bg-white shadow-md p-4  min-w-[600px] rounded-lg">
        <button className="block ml-auto" onClick={onClose}>
          <IoMdClose />
        </button>

        <h1 className="pb-4 text-lg font-medium">Products Order</h1>

        <table className="w-full userTable min-w-[600px]">
        <thead>
          <tr className="bg-black text-white">
            <th>Index</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>totalPrice</th>
          </tr>
        </thead>
        <tbody>
          {productsOrder.map((el, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{el?.productId?.productName}</td>
                <td>{el?.productId?.category}</td>
                
                <td>{displayINRCurrency(el?.productId?.sellingPrice)}</td>
                <td>{el?.quantity}</td>
                <td>{displayINRCurrency(el?.productId?.sellingPrice  * el?.quantity)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

       
      </div>
    </div>
  );
};


export default ProductOrder;
