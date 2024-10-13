import React, {  useState } from 'react'
import loginIcons from '../assest/signin.gif'

import { Link, useNavigate } from 'react-router-dom';
import Api from '../common';
import { toast } from 'react-toastify';


const ForgotPassowrd = () => {

  const [data,setData] = useState({
      email : ""
  })
  const navigate = useNavigate()
  

  const handleOnChange = (e) =>{
      const { name , value } = e.target

      setData((preve)=>{
          return{
              ...preve,
              [name] : value
          }
      })
  }


  const handleSubmit = async(e) =>{
      e.preventDefault()

      const dataResponse = await fetch(Api.resetPassword.url,{
          method : Api.resetPassword.method,
          credentials : 'include',
          headers : {
              "content-type" : "application/json"
          },
          body : JSON.stringify(data)
      })

      const dataApi = await dataResponse.json()

      if(dataApi.success){
          toast.success(dataApi.message)
          navigate('/login')
          
      }

      if(dataApi.error){
          toast.error(dataApi.message)
      }

  }
  return (
    <section id='login'>
        <div className='mx-auto container p-4'>

            <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                    <div className='w-20 h-20 mx-auto'>
                        <img src={loginIcons} alt='login icons'/>
                    </div>

                    <div className='flex item-center justify-center'>
                       <strong>Reset password </strong>
                    </div>
                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Email : </label>
                            <div className='bg-slate-100 p-2'>
                                <input 
                                    type='email' 
                                    placeholder='enter email' 
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'/>
                            </div>
                        </div>

                       
                        <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Send</button>

                    </form>

                    <p className="my-5">
            Already have account ?{" "}
            <Link
              to={"/login"}
              className=" text-red-600 hover:text-red-700 hover:underline"
            >
              Login
            </Link>
          </p>
            </div>


        </div>
    </section>
  )
}

export default ForgotPassowrd