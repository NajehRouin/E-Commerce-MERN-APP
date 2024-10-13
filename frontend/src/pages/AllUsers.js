import React, { useEffect, useState } from "react";
import Api from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    phone: "",
    adress: "",
    _id: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(12);

  const fetchAllUsers = async () => {
    try {
      const fetchData = await fetch(
        `${Api.allUser.url}?page=${currentPage}&limit=${limit}`,
        {
          method: Api.allUser.method,
          credentials: "include",
        }
      );

      const dataResponse = await fetchData.json();

      if (dataResponse.success) {
        setAllUsers(dataResponse.data);
        setTotalPages(dataResponse.pagination.totalPages);
      } else if (dataResponse.error) {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error("Failed to fetch users.");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, [currentPage]);

  const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="p-4">
      <div className="bg-white py-2 px-4 flex justify-between items-center flex-wrap">
        <h2 className="font-bold text-lg">All Users</h2>
      </div>

      {/* Table for Desktop */}
      <div className="hidden md:block bg-white pb-4 overflow-x-auto mt-5">
        <table className="w-full userTable min-w-[600px]">
          <thead>
            <tr className="bg-black text-white">
              <th>Index</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Created Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUser.map((el, index) => (
              <tr key={index}>
                <td>{(currentPage - 1) * limit + index + 1}</td>
                <td>{el.name}</td>
                <td>{el.email}</td>
                <td>{el.phone}</td>
                <td>{el.adress}</td>
                <td>{moment(el.createdAt).format("LL")}</td>
                <td className="flex justify-evenly items-center">
                  <button
                    className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                    onClick={() => {
                      setUpdateUserDetails(el);
                      setOpenUpdateRole(true);
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
        {allUser.map((el, index) => (
          <div
            key={index}
             className="border rounded-lg p-4 mb-4 shadow-md bg-gray-50"
          >
            <p>
              <strong>Index:</strong> {(currentPage - 1) * limit + index + 1}
            </p>
            <p>
              <strong>Name:</strong> {el.name}
            </p>
            <p>
              <strong>Email:</strong> {el.email}
            </p>
            <p>
              <strong>Phone:</strong> {el.phone}
            </p>
            <p>
              <strong>Address:</strong> {el.adress}
            </p>
            <p>
              <strong>Created Date:</strong> {moment(el.createdAt).format("LL")}
            </p>
            <button
              className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white mt-2"
              onClick={() => {
                setUpdateUserDetails(el);
                setOpenUpdateRole(true);
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

      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          phone={updateUserDetails.phone}
          adress={updateUserDetails.adress}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
