import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createUser } from '../store/authSlice'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';



function Signup() {
    const {user ,loading,error} = useSelector((state) => state.auth)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '', // Add confirm password field
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Username is required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(9, 'minimum length 9')
                .required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match') // Validation to ensure passwords match
                .required('Please confirm your password'),
        }),
        onSubmit: async (values) => {
            try {
                const resultAction = await dispatch(createUser({ email: values.email, password: values.password , displayName: values.name }));

                if (createUser.fulfilled.match(resultAction)) {
                    navigate('/')
                }
            } catch (err) {
                // Handle errors
            }
        },
    });


  return (
      <div className='absolute left-0 right-0 mx-auto flex items-center flex-col justify-center h-[620px] '>
          <div className='w-[40%] flex-col text-white font-bold hidden lg:flex'>
              <h2 className='text-5xl font-extrabold text-white  text-center'>Unlimited movies, TV shows, and more</h2>
              <p className='text-center'>Ready to watch? Enter your email to create or restart your membership.</p>
          </div>
          <div className='w-full  md:w-[40%] py-3'>
              <div className='bg-black bg-opacity-70 text-white flex flex-col gap-4 items-center justify-center  py-10 px-5'>
                  <form onSubmit={formik.handleSubmit} className='flex flex-col w-[80%] gap-3'>
                      <h2 className='text-3xl font-bold'>Sign up</h2>
                      <div className='flex flex-col gap-2'>
                          <div className='h-12 bg-black relative'>
                              <input type="text" autoComplete='off' required className='bg-transparent form-input peer'
                                  {...formik.getFieldProps('name')}
                              />
                              <span className='form-span'>Username</span>
                          </div>
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

                          {/* Confirm Password Field */}
                          <div className='h-12 bg-black relative'>
                              <input type={passwordVisible ? 'text' : 'password'} autoComplete='off' required className='bg-transparent form-input peer'
                                  {...formik.getFieldProps('confirmPassword')}
                              />
                              <span className='form-span'>Confirm Password</span>
                              <div className="absolute right-3 cursor-pointer top-4" onClick={() => setPasswordVisible(!passwordVisible)}>
                                  {passwordVisible ? <IoMdEyeOff /> : <IoMdEye />}
                              </div>
                          </div>
                          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                              <div className="text-red-500 text-sm">* {formik.errors.confirmPassword}</div>
                          ) : null}

                      </div>
                      {error && <div className="text-red-500 text-sm">* {error}</div>}
                      <button type="submit" className='h-12 font-bold bg-red-600 flex items-center justify-center rounded active:bg-red-700'>
                          {loading ? 'Signing Up...' : 'Sign Up'}
                      </button>
                  </form>

              </div>
          </div>
      </div>
  )
}

export default Signup
