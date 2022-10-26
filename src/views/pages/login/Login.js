import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAvatar
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { loginRequest } from "src/API/LoginApi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentUserAction } from "src/redux/Login/login.actions";
import { useHistory } from "react-router-dom";
import logo from "../../../assets/images/team.jpeg"
import { userManagmentRequests } from "src/API/UserManagmentApi";

const Login = () => {
  let history = useHistory();

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.login.currentUser);
  const [tempLogin, setTempLogin] = useState({});
  const [isResetPassword, setIsResetPassword] = useState(false);
  const handleChange = (evt) => {
    setTempLogin({
      ...tempLogin,
      [evt.target.name]: evt.target.value,
    });
  };
  const handleLogin = async () => {
    try {

      const res = await loginRequest.loginApi(tempLogin);
      if (res.error === false) {
        toast.success("Wellcome !");
        dispatch(updateCurrentUserAction(res.data))
        localStorage.setItem("currentUser", JSON.stringify(res.data));

        history.push("/dashboard");


      }
      if (res.error === true) {

        if (res?.data?.response.status === 401) {
          toast.error("Unauthorized !");
        }

      }
    } catch (e) {
      toast.error("error !");

    }
  };


  const resetPassword = async () => {
    try {

      const res = await loginRequest.loginApi(tempLogin);
      if (res.error === false) {
        res.data.user.password = tempLogin.newpassword;
        res.data.user.user=res.data.user.id;
        const userUpdate = await userManagmentRequests.updateUser(res.data.user)
        if (userUpdate.error === false) {
          alert("Password updated")
        }
      }
      if (res.error === true) {

        if (res?.data?.response.status === 401) {
          toast.error("Invalid email OR current password !");
        }

      }
    } catch (e) {
      toast.error("error !");

    }
  };



  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>

            <CCardGroup>
              <CCard className="p-4">

                <CCardBody>
                  {!isResetPassword &&
                    <CForm>
                      <div style={{
                        textAlign: "center"
                      }}>
                        <img
                          className="rounded-circle mx-auto"
                          alt="100x100"
                          style={{ "width": "100px", "height": "100px" }}
                          src={logo}
                          data-holder-rendered="true"
                        />
                      </div>

                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          onChange={handleChange}
                          name="email"
                          placeholder="Email"
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          onChange={handleChange}
                          name="password"
                          type="password"
                          placeholder="Password"
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleLogin()
                            }
                          }}
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs={6}>
                          <CButton
                            onClick={handleLogin}
                            color="primary"
                            className="px-4"
                          >
                            Login
                          </CButton>
                        </CCol>
                        <CCol xs={6} className="text-right">
                          <CButton color="link" className="px-0"
                            onClick={() => setIsResetPassword(true)}
                          >

                            Reset password?
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  }
                  {isResetPassword &&

                    <CForm>
                      <div style={{
                        textAlign: "center"
                      }}>
                        <img
                          className="rounded-circle mx-auto"
                          alt="100x100"
                          style={{ "width": "100px", "height": "100px" }}
                          src={logo}
                          data-holder-rendered="true"
                        />
                      </div>


                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          onChange={handleChange}
                          name="email"
                          placeholder="Email"
                        />
                      </CInputGroup>

                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          onChange={handleChange}
                          name="password"
                          placeholder="Current Password"
                        />
                      </CInputGroup>

                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          onChange={handleChange}
                          name="newpassword"
                          placeholder="New Password"
                        />
                      </CInputGroup>

                      <CRow>
                        <CCol xs={6}>
                          <CButton
                            onClick={resetPassword}
                            color="primary"
                            className="px-4"
                          >
                            Reset Password
                          </CButton>
                        </CCol>
                        <CCol xs={6} className="text-right">
                          <CButton color="link" className="px-0"
                            onClick={() => setIsResetPassword(false)}
                          >

                            Back to Login
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  }
                </CCardBody>
              </CCard>

            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
