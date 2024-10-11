import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate,useLocation } from "react-router-dom";
import ROLE from "../common/role";
import { FaUsers, FaShoppingCart } from "react-icons/fa";
const UserPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;


  useEffect(() => {
    if (user?.role !== ROLE.GENERAL) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden">
      <aside className="bg-white min-h-full  w-full  max-w-60 customShadow">
        <div className="h-32  flex justify-center items-center flex-col">
          <div className="text-3xl cursor-pointer relative flex justify-center">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                className="w-16 h-16 rounded-full"
                alt={user?.name}
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p className="text-sm">{user?.role}</p>
        </div>

        {/***navigation */}
        <div>
          <nav className="grid p-4">
          


            <Link
        to='/user-panel/my-order'
        className={`flex items-center px-2 py-1 rounded-full mt-2 ${
          isActive('/user-panel/my-order') ? 'bg-slate-300' : 'hover:bg-slate-500'
        }`}
      >
        <FaShoppingCart className='mr-2 w-10 h-6' /> My Order
      </Link>
          </nav>
        </div>
      </aside>

      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default UserPanel;
