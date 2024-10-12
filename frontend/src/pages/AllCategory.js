import React, { useEffect, useState } from "react";
import Api from "../common";

import { toast } from "react-toastify";
import { MdModeEdit } from "react-icons/md";
import UploadCategory from "../components/UploadCategory";
import AdminEditCategory from "../components/AdminEditCategory";

function AllCategory() {
  const [allcategorys, SetAllCategorys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10); 

  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [editeCategory,SetEditeCategory]=useState(false)

  const [category,SetCategory] = useState({
    label: "",
    label: ""
  });

  const fetchAllcategorys = async () => {
    const fetchData = await fetch(
      `${Api.category.url}?page=${currentPage}&limit=${limit}`,
      {
        method: Api.category.method,
        credentials: "include",
      }
    );

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      SetAllCategorys(dataResponse.data);
      setTotalPages(dataResponse.totalPages); // Mettre à jour le nombre total de pages
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllcategorys();
  }, [currentPage]);

  return (
    <div className="p-4">
      <div className="bg-white py-2 px-4 flex justify-between items-center flex-wrap">
        <h2 className="font-bold text-lg">All Categorys</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full"
        onClick={() => setOpenUploadCategory(true)}
        >
          Add New category
        </button>
      </div>

      <div className="bg-white pb-4 overflow-x-auto mt-5">
        <table className="w-full userTable min-w-[600px]">
          <thead>
            <tr className="bg-black text-white">
              <th>Index</th>
              <th>Value</th>
              <th>Label</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allcategorys?.map((cate, index) => (
              <tr key={index}>
                <td>{(currentPage - 1) * limit + (index + 1)}</td>
                <td>{cate?.value} </td>
                <td>{cate?.label} </td>
                <td className="flex justify-evenly items-center">
                  <button
                    className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                    onClick={() => {
                      SetCategory(cate);
                        SetEditeCategory(true);
                    }}
                  >
                    <MdModeEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center py-4 p-5">
          <button
            className={` bg-blue-500 text-white py-2 px-4 rounded p-2 ${
              currentPage === 1 ? "bg-gray-500 cursor-not-allowed" : ""
            }`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`bg-blue-500 text-white py-2 px-4 rounded p-2 ${
              currentPage === totalPages ? "bg-gray-500 cursor-not-allowed" : ""
            }`}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {editeCategory && (
                <AdminEditCategory categoryData={category} onClose={() => SetEditeCategory(false)} fetchdata={fetchAllcategorys} />
            )
      }

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
