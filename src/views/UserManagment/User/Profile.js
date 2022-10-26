import React from "react";
import { useSelector} from "react-redux";
import { IoArrowBackSharp } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import AddUser from "./AddUser"
const Profile = () => {
  const currentUser = useSelector((state) => state.login.currentUser);
  const history = useHistory();
  console.log("user", currentUser);
  return (
    <>
      <div>
        <div className="row d-flex justify-content-center">
          <div className="col-sm-12">
            <div className="card">
              <div>
                <button
                  className="btn btn-outline-primary"
                  onClick={()=> history.goBack()}
                >
                  <IoArrowBackSharp />
                </button>
              </div>
              <div className="form-card">
                <div className="d-flex flex-column justify-content-center align-item-center text-center" >
                    <div>
                        <img
                        className="rounded-circle"
                        alt={currentUser?.user?.name + " Profile"}
                        style={{ "width": "200px", "height": "200px" }}
                        data-holder-rendered="true"
                        src={currentUser?.user?.picture}
                    />
                    </div>
                  <h2>{currentUser?.user?.name }</h2>
                  <span>{currentUser?.user?.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
                <div className="card" >
              <h2 className="border-bottom">Profile Settings</h2>
              <AddUser isprofile={true}/>
             </div>
         </div>
        </div>
      </div>
    </>
  );
};
export default Profile;