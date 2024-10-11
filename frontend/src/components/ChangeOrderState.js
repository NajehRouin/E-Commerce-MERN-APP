import React, { useState } from "react";
import State from "../common/state";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import Api from "../common";

const ChangeOrderState = ({ orderId, state, onClose, callFunc }) => {
  const [stateOrder, setStateOrder] = useState(state);
  const handleOnChangeSelect = (e) => {
    if (e.target.value === "") {
      setStateOrder("");
    } else {
      setStateOrder(e.target.value);
    }
  };

  const updateStateOrder = async () => {
    try {
      if (stateOrder === "") {
        toast.error("required State");
      } else {
        const fetchResponse = await fetch(Api.updateStateOrder.url, {
          method: Api.updateStateOrder.method,
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            orderId: orderId,
            state: stateOrder,
          }),
        });

        const responseData = await fetchResponse.json();

        if (responseData.success) {
          toast.success(responseData.message);
          onClose();
          callFunc();
        }


        if (responseData.error) {
          toast.error(responseData.message);
         
        }
      }
    } catch (error) {}
  };
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50">
      <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm rounded-lg">
        <button className="block ml-auto" onClick={onClose}>
          <IoMdClose />
        </button>

        <h1 className="pb-4 text-lg font-medium">Change State Order</h1>

        <div className="flex items-center justify-between my-4">
          <p>State :</p>
          <select
            className="border px-4 py-1"
            value={stateOrder}
            onChange={handleOnChangeSelect}
          >
            <option value="">select order status</option>
            {Object.values(State).map((el) => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>

        <button
          className="w-fit mx-auto block  py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700"
          onClick={updateStateOrder}
        >
          Change State
        </button>
      </div>
    </div>
  );
};


export default ChangeOrderState;
