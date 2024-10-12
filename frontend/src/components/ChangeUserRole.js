import React, { useState } from "react";
import ROLE from "../common/role";
import { IoMdClose } from "react-icons/io";
import Api from "../common";
import { toast } from "react-toastify";

const ChangeUserRole = ({
  name,
  email,
  phone,
  adress,
 
  userId,
  onClose,
  callFunc,
}) => {

  const [userName, SetUserName] = useState(name);
  const [userEmail, SetUserEmail] = useState(email);
  const [userPhone, SetUserPhone] = useState(phone);
  const [userAdress, SetUserAdress] = useState(adress);

  const handleChangeName = (e) => {
    SetUserName(e.target.value);
  };
  const handleChangeEmail = (e) => {
    SetUserEmail(e.target.value);
  };

  const handleChangePhone = (e) => {
    SetUserPhone(e.target.value);
  };

  const handleChangeAdresse = (e) => {
    SetUserAdress(e.target.value);
  };

 

  const updateUser = async () => {
    const fetchResponse = await fetch(Api.updateUser.url, {
      method: Api.updateUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        name:userName,
        email:userEmail,
        phone:userPhone,
        adress:userAdress,
      }),
    });

    const responseData = await fetchResponse.json();

    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      callFunc();
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50">
      <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm rounded-lg">
        <button className="block ml-auto" onClick={onClose}>
          <IoMdClose />
        </button>

        <h1 className="pb-4 text-lg font-medium">Update User</h1>

        <div className="flex items-center justify-between">
          <label htmlFor="Name" >
            Name :
          </label>
          <input
            type="text"
            id="Name"
            placeholder="enter  name"
            value={userName}
            name="name"
            onChange={handleChangeName}
            className="p-2 bg-slate-100 border rounded"
            required
          />
        </div>

        <div className="flex items-center justify-between mt-3">
          <label htmlFor="Email" >
            Email :
          </label>
          <input
           type="email"
            id="Name"
            placeholder="enter  Email"
            value={userEmail}
            name="email"
            onChange={handleChangeEmail}
            className="p-2 bg-slate-100 border rounded"
            required
          />
        </div>


        <div className="flex items-center justify-between mt-3">
          <label htmlFor="Phone" >
            Phone :
          </label>
          <input
           type="tel"
            id="Phone"
            placeholder="enter  phone"
            value={userPhone}
            name="phone"
            maxLength={8}
            onChange={handleChangePhone}
            className="p-2 bg-slate-100 border rounded"
            onInput={(e) =>
                (e.target.value = e.target.value.replace(/\D/g, ""))
              }
            required
          />
        </div>
        <div className="flex items-center justify-between mt-3">
          <label htmlFor="Adress" >
            Adress :
          </label>
          <input
           type="text"
            id="Adresse"
            placeholder="enter  adress"
            value={userAdress}
            name="adress"
         
            onChange={handleChangeAdresse}
            className="p-2 bg-slate-100 border rounded"
           
            required
          />
        </div>


    

        <button
          className="w-fit mx-auto block  py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700 mt-5"
          onClick={updateUser}
        >
          Update User
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
