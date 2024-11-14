import React, { useState } from "react";
import RegisterCss from "./Register.module.css";
import Joi from 'joi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [joiErrors, setJoiErrors] = useState({});
  
  // بيانات المستخدم
  const [dataUser, setDataUser] = useState({
    email: "",
    password: "",
  });

  // تحديث البيانات بناءً على إدخال المستخدم
  function getDataUsr(e) {
    const input_Value = e.target.value;
    const propertyName = e.target.id;
    setDataUser({ ...dataUser, [propertyName]: input_Value });
  }

  // التحقق من صحة البيانات باستخدام Joi والتحقق من الاستجابة
  function submitUser(e) {
    e.preventDefault();
    
    const allowedEmails = ['peter@reqres.in', 'john@reqres.in', 'eve.holt@reqres.in'];

    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .valid(...allowedEmails) // اجعل Joi يقبل البريد الإلكتروني من قائمة المسموح به
        .required()
        .messages({
          "string.empty": "Email is required. Hint : eve.holt@reqres.in",
          "string.email": "Please enter a valid email address. Hint : eve.holt@reqres.in",
          "any.only": "This email is not allowed. Please use one of the allowed emails. Hint : eve.holt@reqres.in"
        }),
        password: Joi.string()
        .min(4)  // تحديد الحد الأدنى لعدد الأحرف (يمكن تغييره حسب الحاجة)
        .max(10) // الحد الأقصى لعدد الأحرف
        .required()
        .messages({
          "string.empty": "Password is required.",
          "string.min": "Password must be at least 8 characters long.",
          "string.max": "Password must be at most 10 characters long.",
        }),
    });

    const joiResponse = schema.validate(dataUser, { abortEarly: false });
    
    if (joiResponse.error === undefined) {
      // إرسال البيانات إذا كانت صالحة
      sendDataUser();
      clr();
      setJoiErrors({});
    } else {
      // تخزين الأخطاء وعرضها
      const errors = {};
      joiResponse.error.details.forEach((error) => {
        errors[error.path[0]] = error.message;
      });
      setJoiErrors(errors);
    }
  }

  // إرسال بيانات التسجيل إلى API Reqres باستخدام async/await فقط
  async function sendDataUser() {
    try {
      const response = await axios.post("https://reqres.in/api/register", {
        email: dataUser.email,
        password: dataUser.password
      });

      if (response.data && response.data.id) {
        alert("User has been registered successfully!");
        navigate('/login');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Registration failed: " + (error.response.data.error || "Invalid data"));
      } else {
        alert("An error occurred during registration. Please try again later.");
      }
    }
  }

  // دالة لتنظيف الحقول بعد التسجيل
  function clr() {
    setDataUser({
      email: "",
      password: ""
    });
  }

  return (
    <>
      <form onSubmit={submitUser} className={`${RegisterCss.myRegister} w-50 m-auto mt-5 pt-5 `}>
        <h4>Registration Form</h4>
        <label htmlFor="email">Email : </label>
        <input
          onChange={getDataUsr}
          type="email"
          className="form-control"
          placeholder="Example@gmail.com"
          id="email"
          value={dataUser.email}
        />
        {joiErrors.email && <p style={{ color: "red", marginTop: "5px" }}>{joiErrors.email}</p>}

        <label htmlFor="password">Password : </label>
        <input
          onChange={getDataUsr}
          type="password"
          className="form-control"
          placeholder="password"
          id="password"
          value={dataUser.password}
        />
        {joiErrors.password && <p style={{ color: "red", marginTop: "5px" }}>{joiErrors.password}</p>}

        <div className="mt-4 text-end">
          <button className="btn btn-outline-info px-3">Register</button>
        </div>
      </form>
    </>
  );
}
