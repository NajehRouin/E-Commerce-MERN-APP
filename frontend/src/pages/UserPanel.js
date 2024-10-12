import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate,useLocation } from "react-router-dom";
import ROLE from "../common/role";
import { FaUsers, FaShoppingCart } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
const UserPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  useEffect(() => {
    if (user?.role !== ROLE.GENERAL) {
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
      to="/user-panel/my-profil"
      className={`block px-2 py-1 rounded-full mt-2 ${
        isActive("/user-panel/my-profil") ? "bg-slate-300" : "hover:bg-slate-500"
      }`}
    >
      <MdManageAccounts className="mr-2 w-5 h-5 inline" /> My profil
    </Link>

    <Link
      to="/user-panel/my-order"
      className={`block px-2 py-1 rounded-full mt-2 ${
        isActive("/user-panel/my-order") ? "bg-slate-300" : "hover:bg-slate-500"
      }`}
    >
      <FaShoppingCart className="mr-2 w-5 h-5 inline" /> My Order
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
      to="/user-panel/my-profil"
      className={`flex items-center px-2 py-1 rounded-full mt-2 ${
        isActive("/user-panel/my-profil") ? "bg-slate-300" : "hover:bg-slate-500"
      }`}
    >
      <MdManageAccounts className="mr-2 w-10 h-6 " /> My profil
    </Link>
    <Link
      to="/user-panel/my-order"
      className={`flex items-center px-2 py-1 rounded-full mt-2 ${
        isActive("/user-panel/my-order") ? "bg-slate-300" : "hover:bg-slate-500"
      }`}
    >
      <FaShoppingCart className="mr-2 w-10 h-6" /> My Order
    </Link>

  </nav>
</aside>

<main className="w-full h-full p-2">
  <Outlet />
</main>
</div>
  );
};

export default UserPanel;
