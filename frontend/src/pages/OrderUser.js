import React, { useEffect, useState } from "react";
import Api from "../common";
import moment from "moment";
import { toast } from "react-toastify";
import displayINRCurrency from "../helpers/displayCurrency";

function OrderUser() {
  const [allOrders, setAllOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(12);

  const fetchAllOrders = async (page = 1) => {
    try {
      const fetchData = await fetch(
        `${Api.OrderUser.url}?page=${page}&limit=${limit}`,
        {
          method: Api.OrderUser.method,
          credentials: "include",
        }
      );

      const dataResponse = await fetchData.json();

      if (dataResponse.success) {
        setAllOrders(dataResponse.data);
        setTotalPages(dataResponse.pagination.totalPages);
      } else if (dataResponse.error) {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error("Failed to fetch orders.");
    }
  };

  useEffect(() => {
    fetchAllOrders(currentPage);
  }, [currentPage]);

  const handlePrevious = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));

  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="bg-white pb-4">
      {/* Table in Desktop Mode */}
      <div className="hidden md:block bg-white pb-4 overflow-x-auto mt-5">
        <table className="w-full userTable min-w-[600px]">
          <thead>
          <tr className="bg-black text-white">
              <th>Index</th>
              <th>Order Number</th>
              <th>Total Qty</th>
              <th>Total Price</th>
              <th>State</th>
              <th>Created Date</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((el, index) => (
              <tr key={index}>
                <td>{(currentPage - 1) * limit + index + 1}</td>
                <td>{el?.NumberOrder}</td>
                <td>{el?.totalQty}</td>
                <td>{displayINRCurrency(el?.totalPrice)}</td>
                <td>{el?.etat}</td>
                <td>{moment(el?.createdAt).format("LL")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards in Mobile Mode */}
      <div className="block md:hidden mt-5">
        {allOrders.map((el, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 mb-4 shadow-md bg-gray-50"
          >
            <p>
              <strong>Index:</strong> {(currentPage - 1) * limit + index + 1}
            </p>
            <p>
              <strong>Order Number:</strong> {el?.NumberOrder}
            </p>
            <p>
              <strong>Total Qty:</strong> {el?.totalQty}
            </p>
            <p>
              <strong>Total Price:</strong> {displayINRCurrency(el?.totalPrice)}
            </p>
            <p>
              <strong>State:</strong> {el?.etat}
            </p>
            <p>
              <strong>Created Date:</strong> {moment(el?.createdAt).format("LL")}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center py-4 p-5">
        <button
          className={`bg-blue-500 text-white py-2 px-4 rounded ${
            currentPage === 1 ? "bg-gray-500 cursor-not-allowed" : ""
          }`}
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`bg-blue-500 text-white py-2 px-4 rounded ${
            currentPage === totalPages ? "bg-gray-500 cursor-not-allowed" : ""
          }`}
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default OrderUser;
