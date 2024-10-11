import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import Api from "../common";
import AdminProductCard from "../components/AdminProductCard";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1);

  const fetchAllProduct = async (currentPage = 1) => {
    try {
      setLoading(true);
      setError(null);

    
      const response = await fetch(
        `${Api.allProduct.url}?page=${currentPage}&limit=18`
      );
      const dataResponse = await response.json();

      setAllProduct(dataResponse?.data || []);
      setPage(dataResponse.page);
      setTotalPages(dataResponse.totalPages);
    } catch (err) {
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProduct(page);
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="p-4">
  <div className="bg-white py-2 px-4 flex justify-between items-center flex-wrap">
    <h2 className="font-bold text-lg">All Products</h2>
    <button
      className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full"
      onClick={() => setOpenUploadProduct(true)}
    >
      Add New Product
    </button>
  </div>

  {loading && <p className="text-center py-4">Loading products...</p>}
  {error && <p className="text-red-600 text-center">{error}</p>}

  {/** Product Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 py-4 h-[calc(100vh-190px)] overflow-y-auto">
    {allProduct.map((product, index) => (
        <AdminProductCard
            data={product}
            key={index}
            fetchdata={fetchAllProduct}
        />
    ))}
</div>

  {/** Pagination */}
  <div className="flex justify-between items-center py-4">
    <button
      onClick={handlePrevPage}
      disabled={page === 1}
      className={`bg-blue-500 text-white py-2 px-4 rounded ${page === 1 ? "bg-gray-500 cursor-not-allowed" : ""}`}
    >
      Previous
    </button>
    <span>
      Page {page} of {totalPages}
    </span>
    <button
      onClick={handleNextPage}
      disabled={page === totalPages}
      className={`bg-blue-500 text-white py-2 px-4 rounded ${page === totalPages ? "bg-gray-500 cursor-not-allowed" : ""}`}
    >
      Next
    </button>
  </div>

  {openUploadProduct && (
    <UploadProduct
      onClose={() => setOpenUploadProduct(false)}
      fetchData={fetchAllProduct}
    />
  )}
</div>

  );
};

export default AllProducts;
