import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Api from "../common";
import displayINRCurrency from "../helpers/displayCurrency";

const ProductOrder = ({ orderId, onClose, callFunc }) => {
  const [productsOrder, setProductsOrder] = useState([]);

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
        setProductsOrder(responseData?.data?.products);
        callFunc();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [orderId]); // Fetch products when orderId changes

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-10 bg-slate-200 bg-opacity-50">
      <div className="mx-auto bg-white shadow-md p-4 rounded-lg w-full max-w-4xl">
        <button className="block ml-auto" onClick={onClose}>
          <IoMdClose className="text-xl" />
        </button>

        <h1 className="pb-4 text-lg font-medium">Products Order</h1>

        {/* Responsive Table for Desktop */}
        <div className="hidden md:block">
          <table className="w-full userTable">
            <thead>
              <tr className="bg-black text-white">
                <th>Index</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {productsOrder.map((el, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{el?.productId?.productName}</td>
                  <td>{el?.productId?.category}</td>
                  <td>{displayINRCurrency(el?.productId?.sellingPrice)}</td>
                  <td>{el?.quantity}</td>
                  <td>{displayINRCurrency(el?.productId?.sellingPrice * el?.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Responsive Card Layout for Mobile */}
        <div className="block md:hidden">
          {productsOrder.map((el, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow mb-4">
              <h3 className="font-bold">Product Name: {el?.productId?.productName}</h3>
              <p><strong>Category:</strong> {el?.productId?.category}</p>
              <p><strong>Price:</strong> {displayINRCurrency(el?.productId?.sellingPrice)}</p>
              <p><strong>Quantity:</strong> {el?.quantity}</p>
              <p><strong>Total Price:</strong> {displayINRCurrency(el?.productId?.sellingPrice * el?.quantity)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductOrder;
