import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { toast } from "react-toastify";
import DevelopedBy from "../Components/DevelopedBy";
import DarkLightToggleBtn from "../Components/DarkLightMode/DarkLightToggleBtn";
import { useSelector, useDispatch } from "react-redux";
import { createUserAsync, getAllUsersAsync } from "../redux/slices/UsersSlice";
import IsLoading from "../Components/IsLoading";

// icons
import { FaUser, FaMobile } from "react-icons/fa";
import { MdEmail, MdPassword } from "react-icons/md";
import { BsChatTextFill } from "react-icons/bs";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usersRedux = useSelector((state) => state.users);
  // console.log( " usersRedux - " , usersRedux );

  useEffect(() => {
    // dispatch( getAllUsersAsync() );
  }, []);

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(5, "Too Short!")
      .max(10, "Too Long!")
      .required("*Required"),
    password: Yup.string()
      .min(2, "Too Short!")
      .max(8, "Too Long!")
      .required("*Required"),
    mobileNo: Yup.number().required("*Required"),
    emailAddress: Yup.string().email("Invalid email").required("*Required"),
  });

  return (
    <div id="authentication">
      <section className="row">
        <div className="leftSide col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
          <div>
            <h5>
              {" "}
              <span className="" style={{ marginRight: 10 }}>
                <BsChatTextFill color="#fff" size={25} />
              </span>{" "}
              Chat APP{" "}
            </h5>
            <h6 className="mt-3">Welcome to Mern Stack Chat App </h6>
            <div>
              <DarkLightToggleBtn />
            </div>
          </div>

          <div>
            <img src={"/images/one.png"} />
          </div>
        </div>

        <div className="rightSide col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9">
          <h3 className="text-center">Register Account </h3>

          <div className="formContent">
            <Formik
              initialValues={{
                emailAddress: "",
                username: "",
                password: "",
                mobileNo: "",
              }}
              validationSchema={SignupSchema}
              onSubmit={async (values, { setSubmitting }) => {
                const actionResult = await dispatch(
                  createUserAsync({
                    email: values.emailAddress,
                    username: values.username,
                    password: values.password,
                    mobile: values.mobileNo,
                  })
                );

                if (actionResult.payload.msg === "Email Already Exist") {
                  toast.error(actionResult.payload.msg);
                  values.emailAddress = "";
                }

                if (actionResult.payload.msg === "Username Already Exist") {
                  toast.error(actionResult.payload.msg);
                  values.username = "";
                }

                if (actionResult.payload.msg === "Sign Up Successful") {
                  toast.success(actionResult.payload.msg);
                  navigate("/signin");
                }

                setSubmitting(false);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <div className="d-flex align-items-baseline">
                      <label htmlFor="emailAddress">Email address</label>
                      <p className="inputFieldError px-3">
                        {errors.emailAddress &&
                          touched.emailAddress &&
                          errors.emailAddress}
                      </p>
                    </div>

                    <div className="inputContainer">
                      <div className="icon">
                        <MdEmail />
                      </div>

                      <input
                        type="email"
                        className="form-control"
                        id="emailAddress"
                        name="emailAddress"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.emailAddress}
                      />
                    </div>
                  </div>

                  <div className="form-group mb-3">
                    <div className="d-flex align-items-baseline">
                      <label htmlFor="username">UserName</label>
                      <p className="inputFieldError px-3">
                        {errors.username && touched.username && errors.username}
                      </p>
                    </div>
                    <div className="inputContainer">
                      <div className="icon">
                        <FaUser />
                      </div>

                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                      />
                    </div>
                  </div>

                  <div className="form-group mb-3">
                    <div className="d-flex align-items-baseline justify-content-between">
                      <div className="d-flex align-items-baseline">
                        <label htmlFor="password">Password</label>
                        <p className="inputFieldError px-3">
                          {errors.password &&
                            touched.password &&
                            errors.password}
                        </p>
                      </div>

                      <div>
                        <Link
                          to="/forgotPassword"
                          style={{ color: "#4eac6d", fontSize: "16px" }}
                        >
                          {" "}
                          Forgot Password{" "}
                        </Link>
                      </div>
                    </div>

                    <div className="inputContainer">
                      <div className="icon">
                        <MdPassword />
                      </div>

                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                    </div>
                  </div>

                  <div className="form-group mb-3">
                    <div className="d-flex align-items-baseline">
                      <label htmlFor="mobileNo">Mobile No</label>
                      <p className="inputFieldError px-3">
                        {errors.mobileNo && touched.mobileNo && errors.mobileNo}
                      </p>
                    </div>

                    <div className="inputContainer">
                      <div className="icon">
                        <FaMobile />
                      </div>

                      <input
                        type="tel"
                        className="form-control"
                        id="mobileNo"
                        name="mobileNo"
                        // pattern="[0-9]{10}-[0-9]{2}-[0-9]{3}"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.mobileNo}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="submitBtn mt-3"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </form>
              )}
            </Formik>

            <div className="textMuted d-flex flex-row mt-3">
              <p className="">Already Have an Account ? </p>
              <Link to="/signin" className="px-3">
                Login{" "}
              </Link>

              <IsLoading
                isLoading={usersRedux?.isLoading && usersRedux?.isLoading}
              />
            </div>

            <DevelopedBy color="#000" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUpPage;
