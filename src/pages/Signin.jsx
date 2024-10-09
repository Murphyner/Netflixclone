import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'yup';
import { loginUser } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";


function Signin() {
    const [passwordVisible , setPasswordVisible] = useState(false)
    const {user , loading , error} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log(error);
    

    

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .required('Password is required'),
        }),
        onSubmit: async (values) => {
            try {
                const resultAction = await dispatch(loginUser({ email: values.email, password: values.password }));

                if (loginUser.fulfilled.match(resultAction)) {
                    window.location.reload();  
                }
            } catch (err) {
            }
        },
    })



  return (
    <div className='absolute left-0 right-0 mx-auto flex items-center flex-col justify-center h-[620px] '>
       <div className='w-[40%] flex-col text-white font-bold hidden lg:flex'>
            <h2 className='text-5xl font-extrabold text-white  text-center'>Unlimited movies, TV shows, and more</h2>
            <p className='text-center'>Ready to watch? Enter your email to create or restart your membership.</p>
       </div>
       <div className='w-full md:w-[40%] py-3'>
            <div className='bg-black bg-opacity-70 text-white flex flex-col gap-4 items-center justify-center  py-10 px-5'>
                <form onSubmit={formik.handleSubmit} className='flex flex-col w-[80%] gap-3'>
                    <h2 className='text-3xl font-bold'>Sign in</h2>
                    <div className='flex flex-col gap-2'>
                        <div className='h-12 bg-black relative'>
                              <input type="text" autoComplete='off' required className='bg-transparent form-input peer' 
                                  {...formik.getFieldProps('email')}
                              />
                              <span className='form-span'>Email or mobile address</span>
                        </div>
                        {formik.touched.email && formik.errors.email ? (
                              <div className="text-red-500 text-sm">* {formik.errors.email}</div>
                          ) : null}
                        <div className='h-12 bg-black relative'>
                            <input type={passwordVisible ? 'text' : 'password'} autoComplete='off' required className='bg-transparent form-input peer' 
                                  {...formik.getFieldProps('password')}
                            />
                            <span className='form-span'>Password</span>
                            <div className="absolute right-3 cursor-pointer top-4" onClick={() => setPasswordVisible(!passwordVisible)}>
                                {passwordVisible ? <IoMdEyeOff /> : <IoMdEye />}
                            </div>
                        </div>
                          {formik.touched.password && formik.errors.password ? (
                              <div className="text-red-500 text-sm">* {formik.errors.password}</div>
                          ) : null}
                    </div>
                    {error && <div className="text-red-500 text-sm">* {error}</div>} 
                    <button type="submit" className='h-12 font-bold bg-red-600 flex items-center justify-center rounded active:bg-red-700'> {loading ? 'Signing In...' : 'Sign In'}</button>
                </form>
                <div className="w-[80%] flex flex-col md:flex-row items-center md:justify-start whitespace-nowrap">
                    <p className="opacity-55">New to Netflix?</p>
                    <Link to={'signup'}>Sign up now.</Link>
                </div>
            </div>
       </div>
    </div>
  )
}

export default Signin
