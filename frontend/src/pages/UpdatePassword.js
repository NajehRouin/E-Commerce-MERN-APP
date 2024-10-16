import React, { useState } from "react";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {  useNavigate } from "react-router-dom";

import Api from "../common";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";
function UpdatePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState({
    password: "",
    newPassword:"",
    confirmPassword: "",
  
  });
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const fetchData = await fetch(Api.logout_user.url, {
      method: Api.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


      const dataResponse = await fetch(Api.updatePassword.url, {
        method: Api.updatePassword.method,
        credentials : 'include',
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        setTimeout(() => {
          handleLogout()
             }, 3000);
       
      }

      if (dataApi.error) {
        toast.error(dataApi.message);
      }
    
  };
 
  return (
    <section id="signup">
      <div className="mx-auto container p-4">
      <div className="bg-white p-5 w-full max-w-sm mx-auto">

      <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
         

            <div>
              <label>Old Password : </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="enter old password"
                  value={data.password}
                  name="password"
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>

            <div>
              <label>New Password : </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="enter new Password "
                  value={data.newPassword}
                  name="newPassword"
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />

                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowNewPassword((preve) => !preve)}
                >
                  <span>
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>


            <div>
              <label>Confirm Password : </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="enter confirm password"
                  value={data.confirmPassword}
                  name="confirmPassword"
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />

                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowConfirmPassword((preve) => !preve)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            

          

            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
            Update
            </button>
          </form>
        </div>

        </div>
        </section>
  )
}


export default UpdatePassword