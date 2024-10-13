import React, { useEffect, useState } from "react";
import loginIcons from "../assest/signin.gif";
import imageTobase64 from "../helpers/imageTobase64";
import Api from "../common";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../store/userSlice";

function ProfilUser() {
  const user = useSelector((state) => state?.user?.user); // Lire l'utilisateur depuis Redux
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: user?.email || "",
    name: user?.name || "",
    profilePic: user?.profilePic || "",
    phone: user?.phone || "",
    adress: user?.adress || "",
  });

  // Mettre à jour les champs locaux lorsque le store Redux change
  useEffect(() => {
    setData({
      email: user?.email || "",
      name: user?.name || "",
      profilePic: user?.profilePic || "",
      phone: user?.phone || "",
      adress: user?.adress || "",
    });
  }, [user]); // Déclencher chaque fois que l'utilisateur dans Redux change

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imagePic = await imageTobase64(file);
      setData((prev) => ({
        ...prev,
        profilePic: imagePic,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(Api.updateCurrentUser.url, {
        method: Api.updateCurrentUser.method,
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        // Mise à jour du store Redux immédiatement après la modification
        
        dispatch(setUserDetails(result.data));
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <section>
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <img src={data.profilePic || loginIcons} alt="User Profile" />
            <form>
              <label>
                <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                  Upload Photo
                </div>
                <input type="file" className="hidden" onChange={handleUploadPic} />
              </label>
            </form>
          </div>

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Name:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="grid">
              <label>Email:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="grid">
              <label>Phone:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  name="phone"
                  value={data.phone}
                  onChange={handleOnChange}
                  maxLength={8}
                  onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ""))}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="grid">
              <label>Address:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="Enter address"
                  name="adress"
                  value={data.adress}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <button
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6"
              type="submit"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ProfilUser;
