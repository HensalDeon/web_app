import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {actionCreators} from "../redux/index";
import {bindActionCreators} from 'redux'
import { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { profileValidation } from "../helper/validate";
import avatar from '../assets/profile.png'
import convertToBase64 from '../helper/convert';

import styles from '../styles/Username.module.css'
import extend from '../styles/Profile.module.css'

export default function Register() {
  const dispatch = useDispatch();
  const profileImage = useSelector(state => state.profileImage.profileImage);
  const {updateProfileImage} = bindActionCreators(actionCreators, dispatch)
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "test@gmail.com",
      mobile: "",
      address: ""
    },
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      values = await Object.assign(values, { profile: profileImage || '' })
      console.log(values);
    }
  });

  /** formik doesn't support file upload so we need to create this handler */
  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    updateProfileImage(base64);
  }
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center ">
        <div className={`${styles.glass} ${extend.glass}`} style={{ width: "45%" }}>
          <div className="title flex-col flex items-center">
            <h4 className="text-5xl font-bold ">Profile</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              You can update the details!
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile" name="profile">
                <img src={profileImage || avatar} className={`${styles.profile_image} ${extend.profile_image}`} alt="avatar" />
              </label>
              <input onChange={onUpload} type="file" id="profile" />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <div className="name flex w-3/4 gap-10">
                <input {...formik.getFieldProps('firstname')} type="text" className={`${styles.textbox} ${extend.textbox}`} placeholder="Firstname" />
                <input {...formik.getFieldProps('lastname')} type="text" className={`${styles.textbox} ${extend.textbox}`} placeholder="Lastname" />
              </div>
              <div className="name flex w-3/4 gap-10">
                <input {...formik.getFieldProps('mobile')} type="text" className={`${styles.textbox} ${extend.textbox}`} placeholder="Mobile No." />
                <input {...formik.getFieldProps('email')} type="text" className={`${styles.textbox} ${extend.textbox}`} placeholder="Email*" />
              </div>
                <input {...formik.getFieldProps('address')} type="text" className={`${styles.textbox} ${extend.textbox}`} placeholder="Address" />
              <button type="submit" className={styles.btn}>Update</button>
            </div>
            <div className="text-center py-4" >
              <span className="text-gray-500">Come back later? <button className="text-red-500">Logout </button></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
