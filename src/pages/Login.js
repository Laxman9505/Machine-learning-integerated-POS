/** @format */

import { Alert, Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { Modal as BootStrapModal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Register from "./Register";
function Login() {
  const dispatch = useDispatch();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const loginSubmitHandler = (values) => {
    dispatch({
      type: "LOGIN_REQUEST",
      payload: values,
    });
  };
  const [form] = Form.useForm();

  const {
    error,
    isLoading,
    isLoggedIn,
    isOperationSuccessful,
    isSendOTPSuccess,
  } = useSelector((state) => state.authenticationReducer);

  useEffect(() => {
    if (isLoggedIn) {
      window.location.replace("/");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isOperationSuccessful) {
      setShowRegisterModal(false);
      dispatch({
        type: "CLEAR_FORM",
      });
    }
  }, [isOperationSuccessful]);

  return (
    <div
      className="container-scroller h100 loginPage"
      style={{ background: "#F0F3F9" }}
    >
      <BootStrapModal
        size={isSendOTPSuccess ? "lg" : ""}
        backdrop="static"
        show={showRegisterModal}
        footer={null}
        title="Register Now"
        className="register"
        onHide={() => {
          setShowRegisterModal(false);
          dispatch({
            type: "CLEAR_FORM",
          });
        }}
        // width={"50vw"}
        style={{ top: "2rem", padding: "15px" }}
      >
        <BootStrapModal.Header closeButton>
          <BootStrapModal.Title id="example-modal-sizes-title-lg">
            Register Now
          </BootStrapModal.Title>
        </BootStrapModal.Header>
        <Register setShowRegisterModal={setShowRegisterModal} />
      </BootStrapModal>
      {/* partial */}
      <div className="container pt-4 categoryField">
        <section className="">
          <div className="row  justify-content-center align-items-center d-flex-row text-center h-100">
            <div className="col-12 col-md-4  ">
              <div className="card shadow">
                <div className="card-body ">
                  <img
                    src="assets/images/splash.png"
                    className="w-80 img-fluid"
                    alt="login"
                  />

                  <h4 className="card-title mt-4 text-center mb-4">
                    Login to POS
                  </h4>

                  {error && (
                    <Alert
                      message={error}
                      type="error"
                      //   showIcon
                      //   icon={<InfoCircleOutlined />}
                      style={{
                        fontSize: "13px",
                        margin: "15px 0",
                        textAlign: "left",
                      }}
                    />
                  )}
                  <Form
                    name="form"
                    form={form}
                    autoComplete="off"
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={loginSubmitHandler}
                  >
                    <Form.Item
                      name="Email"
                      label="Email"
                      rules={[
                        {
                          required: true,
                          message: "Please input your email!",
                        },
                        {
                          type: "email",
                          message: "Please enter valid email!",
                        },
                      ]}
                    >
                      <Input
                        // addonBefore={<UserOutlined />}
                        placeholder="Enter Email"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Password "
                      name="Password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input.Password
                        // prefix={<VerifiedUserOutlined />}
                        type="password"
                        placeholder="Enter Password"
                      />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        className="btn btn-success btn-block w-100"
                        htmlType="submit"
                        loading={isLoading}
                        style={{
                          height: "48px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "10px",
                        }}
                      >
                        Login
                      </Button>
                    </Form.Item>
                  </Form>
                  <p className="text-center">
                    New to POS ?{" "}
                    <a
                      onClick={(e) => {
                        setShowRegisterModal(true);
                      }}
                      className="text-danger"
                    >
                      <span className="ms-1 fw-bold">Register</span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* page-body-wrapper ends */}
    </div>
  );
}

export default Login;
