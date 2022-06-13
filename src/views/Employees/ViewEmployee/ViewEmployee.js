import React, { useState ,useEffect} from "react";
import "./viewEmployee.css";
import { useSelector, useDispatch } from "react-redux";
import {
  updateIsViewEmpClickedAction,
  updateNewEmployeeAction,
} from "src/redux/Employees/employees.actions";
import { IoArrowBackSharp } from "react-icons/io5";
import { FiUser, FiLayers } from "react-icons/fi";
import { MdCastForEducation,MdPermDataSetting } from "react-icons/md";
import {
  BsFillCalendarDateFill,
  BsCalendar2Date,
  BsTelephoneForward,
  BsBagPlus,
} from "react-icons/bs";import { GrUserSettings } from "react-icons/gr";
import { BsHandThumbsUp } from "react-icons/bs";
import { GiPlayerTime } from "react-icons/gi";
import {  FcIdea} from "react-icons/fc";
import { employeeEvaluationRequests } from "src/API/employeeEvaluationApi";
import { BiTimeFive } from "react-icons/bi";
import { FaRegAddressBook, FaUserTie,FaUsers, FaHandRock,FaUserClock, FaUsersCog } from "react-icons/fa";
import { RiSettings2Line,RiUserSearchLine, RiUserFollowLine,RiTimeLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import { GrProjects } from "react-icons/gr";
import { useHistory } from "react-router-dom";
import {updateIsAddPostingClickedAction} from "../../../redux/jobPosting/jobPosting.actions"


const ViewEmployee = () => {
  const state = useSelector((state) => state.employees);
  const currentUser = useSelector((state) => state.login.currentUser);
  const [employeesRecord, setEmployeesRecord] = useState();
  const history = useHistory();


  const dispatch = useDispatch();
  useEffect(() => {
    handleGetEmployeesRecordApi();
  }, []);
  const handleGetEmployeesRecordApi = async () => {
    try {
      const res = await employeeEvaluationRequests.getEmployeesRecordApi(state?.newEmployee?.employee?.id);
           
      if (res.error === false) {
      /*   var tempArr = [];
        var tempArr = res.data.map((x) => {
         
          return { ...x, value: x.name, label: x.name };
        });
       // console.log("tempArr", tempArr); */
        setEmployeesRecord(res.data);
      }
    } catch (err) {
      //console.log(err);
    }
  };
  const handleCancel = () => {
    dispatch(updateIsViewEmpClickedAction(false));
    dispatch(updateNewEmployeeAction({}));
  };
  console.log("employeesRecord", employeesRecord);

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
  return (
    <>
      <div>
        <div className="row d-flex justify-content-center">
          <div className="col-sm-12">
            <div className="card">
                <div className="">
                  <button
                    className="btn btn-outline-primary"
                    onClick={handleCancel}
                  >
                    <IoArrowBackSharp />
                  </button>
                </div>
              <div className="form-card">
                <div className="d-flex">
                  <img
                    className="rounded-circle mx-auto"
                    alt="100x100"
                    src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg"
                    data-holder-rendered="true"
                  />
                </div>
                <div className="text-center">
                  <h2>{state?.newEmployee?.employee?.name}</h2>
                  <h6 className="" style={{ color: "dimgrey" }}>
                    {state?.newEmployee?.employee?.email}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-4">
            <div className="card" style={{ height: "338px" }}>
              <h2 className="border-bottom">Personal Details</h2>
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <BiTimeFive className="icon-design" />
                  <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                    Age:
                  </h6>
                </div>
                <div>{state?.newEmployee?.employee?.dateOfBirth &&getAge(state?.newEmployee?.employee?.dateOfBirth?.slice(0, 10))}</div>
              </div>

              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <FiUser className="icon-design" />
                  <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                    Gender:
                  </h6>
                </div>
                <div>{state?.newEmployee?.employee?.gender}</div>
              </div>

              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <FiLayers className="icon-design" />
                  <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                    Salary:
                  </h6>
                </div>
                <div>{state?.newEmployee?.employee?.salary}</div>
              </div>

              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <MdCastForEducation className="icon-design" />
                  <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                    Education:
                  </h6>
                </div>
                <div>{state?.newEmployee?.employee?.education}</div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <BsFillCalendarDateFill className="icon-design" />
                  <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                    Date of Birth:
                  </h6>
                </div>

                <div>{state?.newEmployee?.employee?.dateOfBirth?.slice(0, 10)}</div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <BsCalendar2Date className="icon-design" />
                  <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                    joiningDate:
                  </h6>
                </div>
                <div>{state?.newEmployee?.employee?.joiningDate?.slice(0, 10)}</div>
              </div>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="card" style={{ height: "338px" }}>
              <div className="row d-flex justify-content-center">
                <h2 className="border-bottom">Contact Details</h2>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <BsTelephoneForward className="icon-design" />
                    <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Phone Number:
                    </h6>
                  </div>
                  <div>{state?.newEmployee?.employee?.phoneNumber}</div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <AiOutlineMail className="icon-design" />
                    <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Email:
                    </h6>
                  </div>
                  <div>{state?.newEmployee?.employee?.email}</div>
                </div>

                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <FaRegAddressBook className="icon-design" />
                    <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Address:
                    </h6>
                  </div>
                  <div className="w-50">{state?.newEmployee?.employee?.address}</div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <FaUserTie className="icon-design" />
                    <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Designation:
                    </h6>
                  </div>
                  <div>{state?.newEmployee?.employee?.designation}</div>
                </div>
                {currentUser?.Profile?.id ===
                  state?.newEmployee?.employee?.id ? (
                  <span
                    onClick={() =>{ 
                      dispatch(updateIsAddPostingClickedAction(true)); history.push('/jobPosting')}}
                    className="anchor font weight-bold"
                    title="Performance Evaluation Form"
                  >
                    Post Job Positinon 
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="card" style={{ height: "338px" }}>
              <div className="row d-flex justify-content-center">
                <h2 className="border-bottom">History</h2>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <BsBagPlus className="icon-design" />
                    <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Work Experience:
                    </h6>
                  </div>
                  <div>{state?.newEmployee?.employee?.workExperience}</div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <RiSettings2Line className="icon-design" />
                    <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Technology:
                    </h6>
                  </div>
                  <div>{state?.newEmployee?.employee?.technology}</div>
                </div>
                <div>
                  <div className="d-flex">
                    <GrProjects className="icon-design" />
                    <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                      Teams:
                    </h6>
                  </div>
                  <ul>
                    {state?.newEmployee?.workHistory?.map((item, i) => {
                      return item.team &&<li key={i}>{item.team.teamName}</li>;
                    })}
                  </ul>
                </div>{" "}
               
                
              </div>
            </div>
          </div>
        </div>

        <div className="row">
        <h2 className="border-bottom">Evaluation Details</h2>
        {employeesRecord && employeesRecord.map((x,i)=>{
                    return(
              <div className="col-6">
                <div className="card" >
                  <div className="row d-flex justify-content-center">
                    <h2 className="border-bottom text-center">{x?.team?.teamName}</h2>
                      <div className="d-flex justify-content-between">
                      <div className="d-flex">
                      <FaUsers className="icon-design" />
                        <h6 className=" d-flex w-full" style={{ color: "dimgrey" }}>
                          Employee Name:
                        </h6>
                      </div>
                      <div className="d-flex justify-content-end">{x?.employee?.name}</div>
                      </div>
                    
                    <div className="d-flex justify-content-between">
                      <div className="d-flex">
                        <GrUserSettings className="icon-design" />
                        <h6 className=" d-flex w-full" style={{ color: "dimgrey" }}>
                          Work Quality:
                        </h6>
                      </div>
                      <div>{x?.employeeWorkQuality}</div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex">
                        <RiUserSearchLine className="icon-design" />
                          <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                            Employee Observation:
                          </h6>
                        </div>
                        <div>{x?.employeeObservation}</div>
                    </div>

                      <div className="d-flex justify-content-between">
                        <div className="d-flex">
                        <FaHandRock className="icon-design" />
                          <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                            Employee Strength:
                          </h6>
                        </div>
                        <div>{x?.employeeStrength}</div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div className="d-flex">
                        <GiPlayerTime className="icon-design" />
                          <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                            Employee Discipline:
                          </h6>
                        </div>
                        <div>{x?.employeeDiscipline}</div>
                      </div>
                      
                      <div className="d-flex justify-content-between">
                        <div className="d-flex">
                        <RiUserFollowLine className="icon-design" />
                          <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                            Decision Ability:
                          </h6>
                        </div>
                        <div>{x?.decisionMakingAbility}</div>
                      </div>

                    <div className="d-flex justify-content-between">
                      <div className="d-flex">
                        <MdPermDataSetting className="icon-design" />
                        <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                          Productivity:
                        </h6>
                      </div>
                      <div>{x?.productivity}</div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex">
                        <FaUserClock className="icon-design" />
                          <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                            Punctuality:
                          </h6>
                        </div>
                        <div>{x?.punctuality}</div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div className="d-flex">
                        <FaUsersCog className="icon-design" />
                          <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                            Job Knowledge:
                          </h6>
                        </div>
                        <div>{x?.jobKnowledgeAndProficiency}</div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div className="d-flex">
                        <FaUsersCog className="icon-design" />
                          <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                            Involvement in Team:
                          </h6>
                        </div>
                        <div>{x?.involvementOfWorkerInTeamEffort}</div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div className="d-flex">
                        <RiTimeLine className="icon-design" />
                          <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                            Work Consistency:
                          </h6>
                        </div>
                        <div>{x?.workConsistency}</div>
                      </div>

                      <div className="d-flex justify-content-between">
                        <div className="d-flex">
                        <RiTimeLine className="icon-design" />
                          <h6 className="d-flex w-full" style={{ color: "dimgrey" }}>
                            Date Of Evaluation:
                          </h6>
                        </div>
                        <div>{x?.dateOfEvaluation?.slice(0,10)}</div>
                      </div>



                    
          
                  </div>
                </div>
              </div>
               )
              })}
          </div>

        
      </div>
    </>
  );
};
export default ViewEmployee;
