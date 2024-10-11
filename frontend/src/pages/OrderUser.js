import React, { useEffect, useState } from "react";
import Api from "../common";
import moment from "moment";
import { toast } from "react-toastify";
import displayINRCurrency from '../helpers/displayCurrency';

function OrderUser() {
  const [allOrders, setAllOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle
  const [totalPages, setTotalPages] = useState(1); // Nombre total de pages
  const [limit] = useState(12); // Nombre d'ordres par page

  const fetchAllOrders = async (page = 1) => {
    const fetchData = await fetch(`${Api.OrderUser.url}?page=${page}&limit=${limit}`, {
      method: Api.OrderUser.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      setAllOrders(dataResponse.data);
      setTotalPages(dataResponse.pagination.totalPages); // Mettre à jour le nombre total de pages
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllOrders(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white pb-4 overflow-x-auto">
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
          {allOrders?.map((el, index) => (
            <tr key={index}>
              <td>{(currentPage - 1) * limit + index + 1}</td> {/* Calculer l'index réel */}
              <td>{el?.NumberOrder}</td>
              <td>{el?.totalQty}</td>
              <td>{displayINRCurrency(el?.totalPrice)}</td>
              <td>{el?.etat}</td>
              <td>{moment(el?.createdAt).format("LL")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center py-4 p-5">
  <button
    className={`bg-blue-500 text-white py-2 px-4 rounded p-2 ${currentPage === 1 ? 'bg-gray-500 cursor-not-allowed' : ''}`}
    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
  >
    Previous
  </button>
  <span>Page {currentPage} of {totalPages}</span>
  <button
    className={`bg-blue-500 text-white py-2 px-4 rounded p-2 ${currentPage === totalPages ? 'bg-gray-500 cursor-not-allowed' : ''}`}
    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
  >
    Next
  </button>
</div>

    </div>
  );
}

export default OrderUser;
