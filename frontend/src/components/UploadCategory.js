import React, { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
//import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import Api from "../common";
import { toast } from "react-toastify";

const UploadCategory = ({ onClose, fetchData }) => {

    const [data,setData] = useState({
        label : "",
        value : "",
      })


      const handleSubmit = async(e) =>{
        e.preventDefault()
        
        const response = await fetch(Api.createCategroy.url,{
          method : Api.createCategroy.method,
          credentials : 'include',
          headers : {
            "content-type" : "application/json"
          },
          body : JSON.stringify(data)
        })
    
        const responseData = await response.json()
    
        if(responseData.success){
            toast.success(responseData?.message)
            onClose()
            fetchData()
        }
    
    
        if(responseData.error){
          toast.error(responseData?.message)
        }
      
    
      }
      const handleOnChange = (e)=>{
        const { name, value} = e.target
  
        setData((preve)=>{
          return{
            ...preve,
            [name]  : value
          }
        })
    }

  return (
    <div className="fixed w-full rounded h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-xl h-full max-h-[50%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Upload Category</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>

        <form
          className="grid p-4 gap-2 overflow-y-scroll h-full pb-5"
          onSubmit={handleSubmit}
        >
          <label htmlFor="categorylabel">Label :</label>
          <input
            type="text"
            id="categorylabel"
            placeholder="enter category label"
            name="label"
            value={data.label}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="Value" className="mt-3">
            Value
          </label>
          <input
            type="text"
            id="Value"
            placeholder="enter category value"
            value={data.value}
            name="value"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />
         
          <button className="px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700">
            Upload Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadCategory;
