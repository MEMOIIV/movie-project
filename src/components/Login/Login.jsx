import React, { useState } from "react";
import Joi from 'joi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loginCss from "./login.module.css";

export default function Login({loginTkn}) {
  const navigate = useNavigate();
  const [joiErrors, setJoiErrors] = useState({});
  const [dataUser, setDataUser] = useState({
    email: "",
    password: "",
  });

  function getDataUsr(e) {
    let input_Value = e.target.value;
    let propertyName = e.target.id;
    let newUser = { ...dataUser };
    newUser[propertyName] = input_Value;
    setDataUser(newUser);
  }

  function submitUser(e) {
    e.preventDefault();

    const allowedEmails = ['peter@reqres.in', 'john@reqres.in', 'eve.holt@reqres.in'];

    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .valid(...allowedEmails) // اجعل Joi يقبل البريد الإلكتروني من قائمة المسموح به
        .required()
        .messages({
          "string.empty": "Email is required Hint : eve.holt@reqres.in",
          "string.email": "Please enter a valid email address. Hint : eve.holt@reqres.in",
          "any.only": "This email is not allowed. Please use one of the allowed emails. Hint : eve.holt@reqres.in"
        }),
        password: Joi.string()
        .min(4)  // تحديد الحد الأدنى لعدد الأحرف (يمكن تغييره حسب الحاجة)
        .max(8) // الحد الأقصى لعدد الأحرف
        .required()
        .messages({
          "string.empty": "Password is required ",
          "string.min": "Password must be at least 8 characters long.",
          "string.max": "Password must be at most 10 characters long.",
        }),
    });

    let joiResponse = schema.validate(dataUser, { abortEarly: false });

    if (joiResponse.error === undefined) {
      // إذا كانت البيانات صالحة، أرسلها إلى الخادم
      sendDataUser();
      clr();
      setJoiErrors({});
    } else {
      const errors = {};
      joiResponse.error.details.forEach((error) => {
        errors[error.path[0]] = error.message;
      });
      setJoiErrors(errors);
    }
  }

  async function sendDataUser() {
    const response = await axios.post("https://reqres.in/api/login", {
      email: dataUser.email,
      password: dataUser.password,
    });

    if (response.data.token!=null) {
      navigate('/home');
      localStorage.setItem('token' , response.data.token)
      if (typeof loginTkn === 'function') {
        loginTkn();  // استدعاء الدالة loginTkn بعد تسجيل الدخول بنجاح
      }
      
    } else {
      setJoiErrors({ wrong: "Invalid email or password." });
    }
  }

  function clr() {
    document.querySelector("#email").value = '';
    document.querySelector("#password").value = '';
  }

  return (
    <form onSubmit={submitUser} className={loginCss.myRegister + " w-50 m-auto my-3 "}>
      <div className="mt-5 pt-5">
        <h4>LogIn</h4>
        <label htmlFor="email">Email: </label>
        <input
          onChange={getDataUsr}
          type="email"
          className="form-control"
          placeholder="Example@gmail.com"
          id="email"
        />
        {joiErrors.email && <p style={{ color: "red", marginTop: "5px" }}>{joiErrors.email}</p>}

        <label htmlFor="password">Password: </label>
        <input
          onChange={getDataUsr}
          type="password"
          className="form-control"
          placeholder="password"
          id="password"
        />
        {joiErrors.password && <p style={{ color: "red", marginTop: "5px" }}>{joiErrors.password}</p>}
        {joiErrors.wrong && <p style={{ color: "red", marginTop: "5px" }}>{joiErrors.wrong}</p>}
        <div className="mt-4 text-end">
          <button className="btn btn-outline-info px-3 ">LogIn</button>
        </div>
      </div>
    </form>
  );
}
