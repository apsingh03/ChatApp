import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
// icons
import { FaUser, FaMobile } from "react-icons/fa";
import { MdEmail, MdPassword } from "react-icons/md";
import { BsChatTextFill } from "react-icons/bs";
import DevelopedBy from "../Components/DevelopedBy";
import DarkLightToggleBtn from "../Components/DarkLightMode/DarkLightToggleBtn";

const ForgotPasswordPage = () => {
  const SignupSchema = Yup.object().shape({
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
          style={{ padding: "80px 80px" }}
        >
          <h3 className="text-center">Register Account</h3>

          <div className="formContent">
            <Formik
              initialValues={{
                emailAddress: "",
              }}
              validationSchema={SignupSchema}
              onSubmit={(values, { setSubmitting }) => {
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

                  <button
                    type="submit"
                    className="submitBtn mt-3"
                    disabled={isSubmitting}
                  >
                    Forgot It
                  </button>
                </form>
              )}
            </Formik>

            <div className="textMuted d-flex flex-row mt-3">
              <p className="">Want to ? </p>
              <Link to="/signin" className="px-3">
                Login{" "}
              </Link>
            </div>

            <DevelopedBy color="#000" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPasswordPage;
