import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaRegCircleUser, FaProductHunt } from "react-icons/fa6";
import { BiCategoryAlt } from "react-icons/bi";
import { MdHome } from "react-icons/md";
import { FaUsers, FaShoppingCart } from "react-icons/fa";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import ROLE from "../common/role";


const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col md:flex-row">
      <header className="bg-white p-4 flex justify-between items-center md:hidden">
        <div className="flex items-center">
          {user?.profilePic ? (
            <img
              src={user?.profilePic}
              className="w-10 h-10 rounded-full"
              alt={user?.name}
            />
          ) : (
            <FaRegCircleUser className="text-2xl" />
          )}
          <div className="ml-2">
            <p className="capitalize text-lg font-semibold">{user?.name}</p>
            <p className="text-sm">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-2xl focus:outline-none"
        >
          {isMenuOpen ? "✖️" : "☰"}
        </button>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="bg-white p-4 md:hidden">
          <Link
            to="/admin-panel/home"
            className={`block px-2 py-1 rounded-full mt-2 ${
              isActive("/admin-panel/home") ? "bg-slate-300" : "hover:bg-slate-500"
            }`}
          >
            <MdHome className="mr-2 w-5 h-5 inline" /> Home
          </Link>

          <Link
            to="/admin-panel/all-users"
            className={`block px-2 py-1 rounded-full mt-2 ${
              isActive("/admin-panel/all-users") ? "bg-slate-300" : "hover:bg-slate-500"
            }`}
          >
            <FaUsers className="mr-2 w-5 h-5 inline" /> All Users
          </Link>


      
          <Link
            to="/admin-panel/all-categorys"
            className={`block px-2 py-1 rounded-full mt-2 ${
              isActive("/admin-panel/all-categorys") ? "bg-slate-300" : "hover:bg-slate-500"
            }`}
          >
            <BiCategoryAlt className="mr-2 w-5 h-5 inline" /> All Categorys
          </Link>

          <Link
            to="/admin-panel/all-products"
            className={`block px-2 py-1 rounded-full mt-2 ${
              isActive("/admin-panel/all-products") ? "bg-slate-300" : "hover:bg-slate-500"
            }`}
          >
            <FaProductHunt className="mr-2 w-5 h-5 inline" /> All Products
          </Link>

          <Link
            to="/admin-panel/all-orders"
            className={`block px-2 py-1 rounded-full mt-2 ${
              isActive("/admin-panel/all-orders") ? "bg-slate-300" : "hover:bg-slate-500"
            }`}
          >
            <FaShoppingCart className="mr-2 w-5 h-5 inline" /> All Orders
          </Link>
        </nav>
      )}

      {/* Sidebar for larger screens */}
      <aside className="bg-white min-h-full w-full max-w-60 customShadow hidden md:block">
        <div className="h-32 flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                className="w-20 h-20 rounded-full"
                alt={user?.name}
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p className="text-sm">{user?.role}</p>
        </div>

        <nav className="grid p-4">
          <Link
            to="/admin-panel/home"
            className={`flex items-center px-2 py-1 rounded-full mt-2 ${
              isActive("/admin-panel/home") ? "bg-slate-300" : "hover:bg-slate-500"
            }`}
          >
            <MdHome className="mr-2 w-10 h-6" /> Home
          </Link>

          <Link
            to="/admin-panel/all-users"
            className={`flex items-center px-2 py-1 rounded-full mt-2 ${
              isActive("/admin-panel/all-users") ? "bg-slate-300" : "hover:bg-slate-500"
            }`}
          >
            <FaUsers className="mr-2 w-10 h-6" /> All Users
          </Link>


          
          <Link
            to="/admin-panel/all-categorys"
            className={`flex items-center px-2 py-1 rounded-full mt-2 ${
              isActive("/admin-panel/all-categorys") ? "bg-slate-300" : "hover:bg-slate-500"
            }`}
          >
            <BiCategoryAlt className="mr-2 w-10 h-6" /> All Categorys
          </Link>

          <Link
            to="/admin-panel/all-products"
            className={`flex items-center px-2 py-1 rounded-full mt-2 ${
              isActive("/admin-panel/all-products") ? "bg-slate-300" : "hover:bg-slate-500"
            }`}
          >
            <FaProductHunt className="mr-2 w-10 h-6" /> All Products
          </Link>

          <Link
            to="/admin-panel/all-orders"
            className={`flex items-center px-2 py-1 rounded-full mt-2 ${
              isActive("/admin-panel/all-orders") ? "bg-slate-300" : "hover:bg-slate-500"
            }`}
          >
            <FaShoppingCart className="mr-2 w-9 h-6" /> All Orders
          </Link>
        </nav>
      </aside>

      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
