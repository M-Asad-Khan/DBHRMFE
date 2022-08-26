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
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { loginRequest } from "src/API/LoginApi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentUserAction } from "src/redux/Login/login.actions";
import { useHistory } from "react-router-dom";

const Login = () => {
	let history = useHistory();

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.login.currentUser);
  const [tempLogin, setTempLogin] = useState({});
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

               
        // dispatch(updateRolesAction([ res.data]));
        // dispatch(updateIsAddRoleClickedAction(false));
        // dispatch(updateIsEditRoleClickedAction(false));
      }
      if (res.error === true) {
               
        if (res?.data?.response.status === 401) {
          toast.error("Unauthorized !");
        }
        // dispatch(updateRolesAction([ res.data]));
        // dispatch(updateIsAddRoleClickedAction(false));
        // dispatch(updateIsEditRoleClickedAction(false));
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
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">
                      Sign In to your account
                    </p>
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
                          debugger
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
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      If you do not have account please register here..
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
