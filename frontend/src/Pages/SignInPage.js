import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import IsLoading from "../Components/IsLoading";
import { useSelector, useDispatch } from "react-redux";

// icons
import { FaUser, FaMobile } from "react-icons/fa";
import { MdEmail, MdPassword } from "react-icons/md";
import { BsChatTextFill } from "react-icons/bs";
import DevelopedBy from "../Components/DevelopedBy";
import DarkLightToggleBtn from "../Components/DarkLightMode/DarkLightToggleBtn";
import { loginUserAsync } from "../redux/slices/UsersSlice";

const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usersRedux = useSelector((state) => state.users);

  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .min(2, "Too Short!")
      .max(8, "Too Long!")
      .required("*Required"),

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

        <div
          className="rightSide col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9"
          style={{ padding: "50px 80px" }}
        >
          <h3 className="text-center">Register Account</h3>

          <div className="formContent">
            <Formik
              initialValues={{
                emailAddress: "",

                password: "",
              }}
              validationSchema={SignupSchema}
              onSubmit={async (values, { setSubmitting }) => {
                const actionResult = await dispatch(
                  loginUserAsync({
                    email: values.emailAddress,
                    password: values.password,
                  })
                );

                if (actionResult.payload.msg === "Password Wrong") {
                  toast.error(actionResult.payload.msg);
                }

                if (actionResult.payload.msg === "User Doesn't Exist") {
                  toast.error(actionResult.payload.msg);
                }

                if (actionResult.payload.msg === "Logged In Successfull") {
                  toast.success(actionResult.payload.msg);
                  const { id, username, email, createdAt } =
                    actionResult.payload.userObject;
                  const userObject = {
                    isUserLogged: true,
                    id,
                    username,
                    email,
                    createdAt,
                  };
                  localStorage.setItem(
                    "loggedData",
                    JSON.stringify(userObject)
                  );
                  window.location.replace("/");
                  // console.log(actionResult);
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

                  <button
                    type="submit"
                    className="submitBtn mt-3"
                    disabled={isSubmitting}
                  >
                    Sign In
                  </button>
                </form>
              )}
            </Formik>

            <div className="textMuted d-flex flex-row mt-3">
              <p className="">Don't Have an Account ? </p>
              <Link to="/signup" className="px-3">
                SignUp{" "}
              </Link>

              <IsLoading
                isLoading={usersRedux?.isLoading && usersRedux?.isLoading}
                color="#fff"
              />
            </div>

            <DevelopedBy color="#000" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignInPage;
