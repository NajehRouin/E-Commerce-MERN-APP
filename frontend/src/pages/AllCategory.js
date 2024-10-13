import React, { useEffect, useState } from "react";
import Api from "../common";
import { toast } from "react-toastify";
import { MdModeEdit } from "react-icons/md";
import UploadCategory from "../components/UploadCategory";
import AdminEditCategory from "../components/AdminEditCategory";

function AllCategory() {
  const [allcategorys, setAllCategorys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);

  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [category, setCategory] = useState({ label: "", value: "" });

  const fetchAllcategorys = async () => {
    try {
      const fetchData = await fetch(
        `${Api.category.url}?page=${currentPage}&limit=${limit}`,
        {
          method: Api.category.method,
          credentials: "include",
        }
      );
      const dataResponse = await fetchData.json();

      if (dataResponse.success) {
        setAllCategorys(dataResponse.data);
        setTotalPages(dataResponse.totalPages);
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error("Failed to fetch categories.");
    }
  };

  useEffect(() => {
    fetchAllcategorys();
  }, [currentPage]);

  const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="p-4">
      <div className="bg-white py-2 px-4 flex justify-between items-center flex-wrap">
        <h2 className="font-bold text-lg">All Categories</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full"
          onClick={() => setOpenUploadCategory(true)}
        >
          Add New Category
        </button>
      </div>

      {/* Table for Desktop */}
      <div className="hidden md:block bg-white pb-4 overflow-x-auto mt-5">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="bg-black text-white">
              <th>Index</th>
              <th>Value</th>
              <th>Label</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allcategorys.map((cate, index) => (
              <tr key={index}>
                <td>{(currentPage - 1) * limit + (index + 1)}</td>
                <td>{cate.value}</td>
                <td>{cate.label}</td>
                <td className="flex justify-evenly items-center">
                  <button
                    className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                    onClick={() => {
                      setCategory(cate);
                      setEditCategory(true);
                    }}
                  >
                    <MdModeEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for Mobile */}
      <div className="block md:hidden mt-5">
        {allcategorys.map((cate, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 mb-4 shadow-md bg-gray-50"
          >
            <p>
              <strong>Index:</strong> {(currentPage - 1) * limit + (index + 1)}
            </p>
            <p>
              <strong>Value:</strong> {cate.value}
            </p>
            <p>
              <strong>Label:</strong> {cate.label}
            </p>
            <button
              className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white mt-2"
              onClick={() => {
                setCategory(cate);
                setEditCategory(true);
              }}
            >
              <MdModeEdit />
            </button>
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

      {/* Modals */}
      {editCategory && (
        <AdminEditCategory
          categoryData={category}
          onClose={() => setEditCategory(false)}
          fetchData={fetchAllcategorys}
        />
      )}

      {openUploadCategory && (
        <UploadCategory
          onClose={() => setOpenUploadCategory(false)}
          fetchData={fetchAllcategorys}
        />
      )}
    </div>
  );
}

export default AllCategory;
