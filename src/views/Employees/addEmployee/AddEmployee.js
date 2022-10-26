import React, { useEffect, useState } from "react";

import {
  updateNewEmployeeAction,
  updateEmployeesAction,
  updateIsAddEmployeeClickedAction,
  updateIsEditEmployeeClickedAction,
} from "../../../redux/Employees/employees.actions";
import { useSelector, useDispatch } from "react-redux";
import { employeeRequests } from "src/API/EmployeeApi";
import { candidateRequests } from "src/API/candidateApi";
import { IoArrowBackSharp } from "react-icons/io5";
import Select from "react-select";
import { CButton, CLink } from "@coreui/react";
import { toast } from "react-toastify";
import { PickerDropPane, PickerOverlay } from 'filestack-react';
import CIcon from '@coreui/icons-react';

import { cibAddthis } from '@coreui/icons'

const AddEmployee = ({ }) => {
  const empStatusOptions = [
    { value: "Active", label: "Active", field: "status" },
    { value: "Pending", label: "Pending", field: "status" },
    { value: "Associated", label: "Associated", field: "status" },
    { value: "FreePool", label: "FreePool", field: "status" },
    { value: "OnLeave", label: "OnLeave", field: "status" },
  ];

  const empDesignationOptions = [
 
    {
      value: "Associate PM",
      label: "Associate PM",
      field: "designation",
    },
    {
      value: "Technical Lead",
      label: "Technical Lead",
      field: "designation",
    },

   
    {
      value: "Sr. Software Engineer",
      label: "Sr. Software Engineer",
      field: "designation",
    },
    {
      value: "Software Engineer",
      label: "Software Engineer",
      field: "designation",
    },
    {
      value: "Associate Software Engineer",
      label: "Associate Software Engineer",
      field: "designation",
    },

    { value: "Team Lead", label: "Team Lead", field: "designation" },
    { value: "SQA Engineer", label: "SQA Engineer", field: "designation" },
    {
      value: "Sr. SQA Engineer",
      label: "Sr. SQA Engineer",
      field: "designation",
    },
    {
      value: "SQA",
      label: "SQA",
      field: "designation",
    },
    {
      value: "SQA Associate",
      label: "SQA Associate",
      field: "designation",
    },
    {
      value: "Automation Engineer",
      label: "Automation Engineer",
      field: "designation",
    },

    {
      value: "DevOps Engineer",
      label: "DevOps Engineer",
      field: "designation",
    },

    {
      value: "Sr.Automation Engineer",
      label: "Sr.Automation Engineer",
      field: "designation",
    },
    { value: "HR Executive", label: "HR Executive", field: "designation" },
    { value: "HR Intern", label: "HR Intern", field: "designation" },
    { value: "Tele sales representative", label: "Tele sales representative", field: "designation" },
    { value: "Other", label: "Other", field: "designation" },
  ];

  const [fieldsWithError, setFieldsWithError] = useState({
    name: false,
    employee_No: false,
    cnic: false,
    personalEmail: false,
    address: false,
    dateOfBirth: false,
    email: false,
    phoneNumber: false,
    joiningDate: false,
    designation: false,
    salary: false,
    education: false,
    linkedInProfile: false,
    gender: false,
    status: false,
    permanentDate: false,
    workExperience: false,
    technology: false,
    appointmentLetterStatus: false,
    agreementSignStatus: false,
  });
  const [errorInfo, setErrorInfo] = useState({});
  const dispatch = useDispatch();
  const [candidates, setCandidates] = useState([]);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [reload, setReload] = useState(false);
  const state = useSelector((state) => state.employees);

  const currentUser = useSelector((state) => state.login.currentUser);
  const [isAdmin, setIAdmin] = useState(false)



  useEffect(() => {
    if (currentUser && currentUser !== null) {
      currentUser.userPermission.map((x) => {
        if (x.role.name === "Admin") {
          setIAdmin(true)
        }
      });

    }
    handleGetCandidatesApi();
  }, []);

  function handleChange(evt) {

    const value = evt.target.value;
    dispatch(
      updateNewEmployeeAction({
        ...state.newEmployee,
        [evt.target.name]: value,
      })
    );
  }
  const handleCancel = () => {
    dispatch(updateNewEmployeeAction({}));
    dispatch(updateIsAddEmployeeClickedAction(false));
    dispatch(updateIsEditEmployeeClickedAction(false));
  };



  // const handleSubmission = async () => {
  //   let body = new FormData()
  //   body.set('key', '11017bd402e05bad935969f001eeeebf')
  //   body.append('image', selectedFile)

  //   const response = await axios({
  //     method: 'post',
  //     url: 'https://api.imgbb.com/1/upload',
  //     data: body
  //   })
  //   const url = response.data?.data?.display_url;
  //   return url;
  // };
  const uploadDone = (res) => {
    state.newEmployee.profile_url = res.filesUploaded[0].url;
    setReload(!reload);
  }
  const handleGetCandidatesApi = async () => {
    try {
      const res = await candidateRequests.getHiredCandidatesApi();

      if (res.error === false) {
        var tempArr = [];
        var tempArr = res.data.map((x) => {
          return { ...x, value: x.FirstName + " " + x.lastName, label: x.FirstName + " " + x.lastName };
        });
        // console.log("candidates", tempArr);
        setCandidates(tempArr);
      }
    } catch (err) {
      // console.log(err);
    }
  };



  const bulkAddEmployee = async () => {
    const empl = [
      {
        "employee_No": "EMP121101",
        "name": "Muhammad Hussain",
        "designation": "Technical Lead",
        "cnic": "3210225612443",
        "personalEmail": "",
        "email": "muhammad.hussain@devbox.co",
        "phoneNumber": "0333-6470508",
        "joiningDate": "01-Nov-12",
        "permanentDate": "Same",
        "status": "Active",
        "dateOfBirth": "20-Jun-1990",
        "education": "BSCS",
        "address": "Street#7A, Makkah Colony, Gulberg-III, Lahore.",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "https://www.linkedin.com/in/mhussain654/",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP141101",
        "name": "Suleman Jalil",
        "designation": "Associate PM",
        "cnic": "4210187608831",
        "personalEmail": "sulemanjalil@gmail.com",
        "email": "suleman.jalil@devbox.co",
        "phoneNumber": "0333-3108411",
        "joiningDate": "01-Nov-14",
        "permanentDate": "Same",
        "status": "Active",
        "dateOfBirth": "20-Jun-1984",
        "education": "Bachelor in Software Engineering",
        "address": "H# House no 100, street 2, block C, Askari 10 , Lahore.",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "https://www.linkedin.com/in/suleman-jalil-95b8301a/",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP150802",
        "name": "Aqeel Zafar",
        "designation": "Office Assistant ",
        "cnic": "3330395260545",
        "personalEmail": "aqeelzafar1996@gmail.com",
        "email": "aqeel.zafar@devbox.co",
        "phoneNumber": "364-5644803",
        "joiningDate": "01-Aug-15",
        "permanentDate": "Same",
        "status": "Active",
        "dateOfBirth": "01-Jan-1994",
        "education": "Matric",
        "address": "",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP150801",
        "name": "Abaid Ullah",
        "designation": "Sr. Software Engineer  ",
        "cnic": "",
        "personalEmail": "abaid.awan@ucp.edu.pk",
        "email": "abaid.ullah@devbox.co",
        "phoneNumber": "0322-8545065",
        "joiningDate": "01-Jun-15",
        "permanentDate": "Same",
        "status": "Active",
        "dateOfBirth": "28-Nov-1994",
        "education": "MSC",
        "address": "BataPure,Lahre",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "https://www.linkedin.com/in/abaid-awan-64388059/",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP160501",
        "name": "Touqeer Ahmad Nasir",
        "designation": "Sr. Software Engineer  ",
        "cnic": "3510139873105",
        "personalEmail": "antouqeer@gmail.com",
        "email": "touqeer.nasir@devbox.co ",
        "phoneNumber": "03017-989464",
        "joiningDate": "30-May-16",
        "permanentDate": "Same",
        "status": "Active",
        "dateOfBirth": "13-Mar-1991",
        "education": "BS (H) Computer Science",
        "address": "House No. 53, LDA Ittefaq Colony No. 2, Wahdat Colony, Lahore.",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "https://www.linkedin.com/in/antouqeer/",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP161101",
        "name": "Syed Muhammad Qasim",
        "designation": "Sr. Software Engineer  ",
        "cnic": "3520203663961",
        "personalEmail": "qasim.ali80812@gmail.com",
        "email": "qasim.ali@devbox.co",
        "phoneNumber": "0334-4354901",
        "joiningDate": "01-Nov-16",
        "permanentDate": "Same",
        "status": "Active",
        "dateOfBirth": "22-Jan-2021",
        "education": "MPhil (CS)",
        "address": "109B, B block, sajid garden, Lahore",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "https://www.linkedin.com/in/qasim-ali-31869bb5/",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP200703",
        "name": "Mohammad Haris",
        "designation": "Software Engineer  ",
        "cnic": "3520176318947",
        "personalEmail": "hariszahid944@gmail.com",
        "email": "mohammad.haris@devbox.co",
        "phoneNumber": "0323-4005103",
        "joiningDate": "01-Jul-20",
        "permanentDate": "Same",
        "status": "Not Active",
        "dateOfBirth": "14-Feb-1998",
        "education": "BS (Software Engineering)",
        "address": "H # 67-C, Muree Street #6, Sultan Mehmood road Shalimar town, Baghbanpura Lahore.",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "https://www.linkedin.com/in/mohammad-haris-9729a3170",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP200702",
        "name": "Arslan Ahmad",
        "designation": " Software Engineer",
        "cnic": "3520158348435",
        "personalEmail": "adhlan3680@gmail.com",
        "email": "arslan.ahmad@devbox.co",
        "phoneNumber": "0307-4705794",
        "joiningDate": "06-Jul-20",
        "permanentDate": "Same",
        "status": "Active",
        "dateOfBirth": "08-Aug-1998",
        "education": "Bachelors in Information and Technology",
        "address": "House no 40 Street no 14 D block Al-Faisal Town Jorry Pull , Lahore Cantt",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "https://www.linkedin.com/in/mohammad-arslan-ahmad-3680/",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP200701",
        "name": "Adil Ashraf",
        "designation": "Software Engineer  ",
        "cnic": "3520230752997",
        "personalEmail": "adilashraf4959@gmail.com",
        "email": "adil.ashraf@devbox.co",
        "phoneNumber": "0301-8036372",
        "joiningDate": "22-Jul-20",
        "permanentDate": "Same",
        "status": "Active",
        "dateOfBirth": "19-Mar-1999",
        "education": "BSIT",
        "address": "Home Address: House No. 26 Gulzar-e-Ahbab colony Multan Chungi, Multan Road, LHR.",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "https://www.linkedin.com/in/adil-ashraf-5b5b581a9",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP200902",
        "name": "Ameer Hamza",
        "designation": "Software Engineer  ",
        "cnic": "421014445623",
        "personalEmail": "ameer.hamza6555@yahoo.com",
        "email": "ameer.hamza@devbox.co",
        "phoneNumber": "0302-4421591",
        "joiningDate": "01-Sep-20",
        "permanentDate": "01-Feb-21",
        "status": "Active",
        "dateOfBirth": "14-Aug-1995",
        "education": "Bsc (Computer-Science)",
        "address": "House # 12 Street # 12 Meelad Chowk Mehmood Booti Bhagbanpura Lahore",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "https://www.linkedin.com/in/ali-hamza-54089421b/",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP200901",
        "name": "Abbas Anwar",
        "designation": "Sr. Software Engineer  ",
        "cnic": "3320282143931",
        "personalEmail": "abbasanwar158@gmail.com",
        "email": "abbas.anwar@devbox.co",
        "phoneNumber": "0303-4015601",
        "joiningDate": "01-Sep-20",
        "permanentDate": "01-Feb-21",
        "status": "Active",
        "dateOfBirth": "05-Dec-1999",
        "education": "BSCS",
        "address": "6-A F2 block jaffarabad market wapda town lahore",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "https://www.linkedin.com/in/abbas-anwar-9184ba13a/",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP201203",
        "name": "Umar Hayat",
        "designation": "Software Engineer  ",
        "cnic": "3520173414131",
        "personalEmail": "umar.hayat1668@gmail.com",
        "email": "umar.hayat@devbox.co",
        "phoneNumber": "0316-4244569",
        "joiningDate": "01-Dec-20",
        "permanentDate": "01-Mar-21",
        "status": "Active",
        "dateOfBirth": "18-Sep-1996",
        "education": "BS Computer Science",
        "address": "Al hafeez garden Main G.T road manawan, Lahore",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "https://www.linkedin.com/in/umar-hayat-01178b195/",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP201202",
        "name": "Mubashar Hassan",
        "designation": "Software Engineer",
        "cnic": "3520106665311",
        "personalEmail": "mubasharhassan1997@hotmail.com",
        "email": "mubashar.hassan@devbox.co",
        "phoneNumber": "0349-4948849",
        "joiningDate": "01-Dec-20",
        "permanentDate": "01-Mar-21",
        "status": "Active",
        "dateOfBirth": "26-May-1997",
        "education": "BSCS",
        "address": "Atto ky awan bata pur lahore opposite bata gate no.2",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "https://www.linkedin.com/in/mubashar-hassan-3700b3203/",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP201201",
        "name": "Asad Khan",
        "designation": "Software Engineer  ",
        "cnic": "3540219223115",
        "personalEmail": "asad91876@gmail.com",
        "email": "asad.khan@devbox.co",
        "phoneNumber": "0348-7411501",
        "joiningDate": "01-Dec-20",
        "permanentDate": "01-May-21",
        "status": "Active",
        "dateOfBirth": "04-Apr-1998",
        "education": "BS Computer Science",
        "address": "Chak  NO. 18 G.B , tehsil & district Nankana Sahib",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "https://www.linkedin.com/in/muhammad-asad-khan-2a32951a4/",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP210401",
        "name": "Jawad Ahmad",
        "designation": "ROR Associate ",
        "cnic": "3520112685331",
        "personalEmail": "jawad79ahmad@gmail.com",
        "email": "jawed@hotmail.com",
        "phoneNumber": "0324-4933440",
        "joiningDate": "01-Apr-21",
        "permanentDate": "01-Aug-21",
        "status": "Active",
        "dateOfBirth": "15-Apr-1998",
        "education": "BS IT Associate",
        "address": "House No 21, Street No 17, Muhallah Shahb pura Mehmoodbooti, Lahore Cantt",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "https://www.linkedin.com/in/jawad-ahmad-979a97229/",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP210501",
        "name": "M. Husnain Iqbal",
        "designation": "Office Helper",
        "cnic": "3320397441151",
        "personalEmail": "",
        "email": "",
        "phoneNumber": "",
        "joiningDate": "01-May-21",
        "permanentDate": "Same",
        "status": "Active",
        "dateOfBirth": "10-Apr-2006",
        "education": "",
        "address": "",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP210601",
        "name": "Ibtisam Khalid",
        "designation": "Sr. Software Engineer  ",
        "cnic": "3520212566927",
        "personalEmail": "mirza.ib.mughal@gmail.com",
        "email": "ibtisam.khalid@devbox.co",
        "phoneNumber": "0307-4584365",
        "joiningDate": "01-Jun-21",
        "permanentDate": "Same",
        "status": "Active",
        "dateOfBirth": "18-Jan-1994",
        "education": "BSCS(Hons)",
        "address": "House number 94 near abu ayub ansari mosque bhobtiyan raiwind road, Lahore.",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "https://www.linkedin.com/in/ibtisam-khalid-14223460/",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP210802",
        "name": "Amna Khalil",
        "designation": " SQA",
        "cnic": "3520194758616",
        "personalEmail": "amna.khalil309@gmail.com",
        "email": "amna.khalil@devbox.co",
        "phoneNumber": "0307-0110556",
        "joiningDate": "01-Aug-21",
        "permanentDate": "Same",
        "status": "Active",
        "dateOfBirth": "20-Sep-1996",
        "education": "MS-CS",
        "address": "Ismaeel Nagir, Chungi Amar Sadhu, Lahore.",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "https://www.linkedin.com/in/amna-khalil-940734150/",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP210804",
        "name": "Wajeeha Zahid",
        "designation": "SQA Associate ",
        "cnic": "3610460662028",
        "personalEmail": "wajeehazahid28@gmail.com",
        "email": "wajeehazahid28@gmail.com",
        "phoneNumber": "0313-6882037",
        "joiningDate": "01-Aug-21",
        "permanentDate": "01-Dec-21",
        "status": "Not Active",
        "dateOfBirth": "14-Feb-1998",
        "education": "MS-CS",
        "address": "rehmania town mian channu",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "https://www.linkedin.com/in/wajeeha-zahid-695681200/",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP210803",
        "name": "Aysha Areej",
        "designation": "SQA Associate ",
        "cnic": "3610385719802",
        "personalEmail": "ayshaareej71@gmail.com",
        "email": "ayshaareej71@gmail.com",
        "phoneNumber": "0310-8392901",
        "joiningDate": "01-Aug-21",
        "permanentDate": "Same",
        "status": "Active",
        "dateOfBirth": "06-Apr-2001",
        "education": "BS Software Engineering",
        "address": "Green town khanewal",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "https://www.linkedin.com/in/aysha-areej-514a28183/",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP210902",
        "name": "Ali Hamza",
        "designation": "Software Engineer  ",
        "cnic": "3450126411653",
        "personalEmail": "ranaalihamza1054@gmail.com",
        "email": "ali.hamza@devbox.co",
        "phoneNumber": "0333-7771054",
        "joiningDate": "27-Sep-21",
        "permanentDate": "01-Jan-21",
        "status": "Active",
        "dateOfBirth": "27-Nov-1997",
        "education": "BSSE",
        "address": "Mohallah chowkandi, NarowalaRome # 210, Subhan center Syed Moj-e-darya Road, Jain Mandir chowk, Lahore",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "https://www.linkedin.com/in/ali-hamza-54089421b/",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP211001",
        "name": "Janshair Khan",
        "designation": "DevOps Engineer ",
        "cnic": "3520249990245",
        "personalEmail": "kjanshair@gmail.com",
        "email": "janshair.khan@devbox.co",
        "phoneNumber": "3204522700",
        "joiningDate": "20-Oct-21",
        "permanentDate": "Same",
        "status": "Not Active",
        "dateOfBirth": "03-May-1992",
        "education": "BSCS",
        "address": "M. Tufail, st no 08, Rasiil park H block Sabza zar Lahore, Pakistan",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "https://www.linkedin.com/in/kjanshair/",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP211101",
        "name": "Ali Hasnain",
        "designation": "Sr. Software Engineer  ",
        "cnic": "3650165955715",
        "personalEmail": "ali.hasnain.awan103@gmail.com",
        "email": "ali.hasnain@devbox.co",
        "phoneNumber": "3366810374",
        "joiningDate": "01-Nov-21",
        "permanentDate": "Same",
        "status": "Active",
        "dateOfBirth": "06-Oct-1995",
        "education": "",
        "address": "",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "https://www.linkedin.com/in/ali-hasnain-201607145/",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP211102",
        "name": "Saddam Shahzad",
        "designation": "",
        "cnic": "",
        "personalEmail": "",
        "email": "",
        "phoneNumber": "",
        "joiningDate": "15-Nov-21",
        "permanentDate": "Same",
        "status": "Active",
        "dateOfBirth": "",
        "education": "",
        "address": "",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "https://www.linkedin.com/in/saddam-shahzad-443a192b/",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP211103",
        "name": "Rao Hamza",
        "designation": "RoR Training",
        "cnic": "3520266104131",
        "personalEmail": "raohamza150@gmail.com",
        "email": "rao.hamza@devbox.co",
        "phoneNumber": "3164158165",
        "joiningDate": "22-Nov-21",
        "permanentDate": "01-Feb-22",
        "status": "Active",
        "dateOfBirth": "19-Dec-2000",
        "education": "BS-SE",
        "address": "St # 13/A, Mohala new Shalimar Kaloni Noua kot Lahore",
        "appointmentLetterStatus": "YES",
        "agreementSignStatus": "",
        "linkedInProfile": "https://www.linkedin.com/in/rao-hamza-19a73a1b3/",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP211201",
        "name": "Muhammad Zeeshan",
        "designation": "Python Developer",
        "cnic": "3340104388101",
        "personalEmail": "zeeshan.nu@outlook.com",
        "email": "muhammad.zeeshan@devbox.co",
        "phoneNumber": "3457962931",
        "joiningDate": "10-Dec-21",
        "permanentDate": "Same",
        "status": "Not Active",
        "dateOfBirth": "09-Nov-1994",
        "education": "BSCS",
        "address": "Satellote Town, Chinoit ",
        "appointmentLetterStatus": "YES",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP220101",
        "name": "Arooba Saghir",
        "designation": "HR Executive",
        "cnic": "3520180425172",
        "personalEmail": "arooba.saghir27@gmail.com",
        "email": "arooba.saghir@devbox.co",
        "phoneNumber": "",
        "joiningDate": "12-Jan-22",
        "permanentDate": "Same",
        "status": "Active",
        "dateOfBirth": "27-Jan-1999",
        "education": "BSEL",
        "address": "DHA RAHBAR phase Eleven",
        "appointmentLetterStatus": "YES",
        "agreementSignStatus": "",
        "linkedInProfile": "https://www.linkedin.com/in/arooba-saghir-0a6352201/",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP220201",
        "name": "Muhammad Tayyab",
        "designation": "Software Engineer",
        "cnic": "3520118562223",
        "personalEmail": "tb643990@gmail.com",
        "email": "muhammad.tayyab@devbox.co",
        "phoneNumber": "3010559235",
        "joiningDate": "01-Feb-22",
        "permanentDate": "",
        "status": "Active",
        "dateOfBirth": "24-Dec-1998",
        "education": "BSCS",
        "address": "House#46, Nadeem Park, Kot Lakhpat",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "https://www.linkedin.com/in/muhammad-tayyab-5763961b6/",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP210901",
        "name": "Muhammad Raffy Asif",
        "designation": "Software Engineer  ",
        "cnic": "3520055738987",
        "personalEmail": "raffayasif123@gmail.com",
        "email": "raffay.asif@devbox.co",
        "phoneNumber": "0304-0641846",
        "joiningDate": "20-Sep-21",
        "permanentDate": "01-Dec-21",
        "status": "Active",
        "dateOfBirth": "21-Aug-1998",
        "education": "BS Software Engineer",
        "address": "House# 25, St# 3, Muhammad Ali Park, Jaranwala, District Faisalabad",
        "appointmentLetterStatus": "YES",
        "agreementSignStatus": "",
        "linkedInProfile": "https://www.linkedin.com/in/mraffayasif/",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP210903",
        "name": "Salman Tahir",
        "designation": "Software Engineer",
        "cnic": "3330165359013",
        "personalEmail": "salmantahir3249@gmail.com",
        "email": "salman.tahir@devbox.co",
        "phoneNumber": "03046-423249",
        "joiningDate": "27-Sep-21",
        "permanentDate": "01-Jan-22",
        "status": "Active",
        "dateOfBirth": "30-Aug-1998",
        "education": "BSSE",
        "address": "Rome # 210, Subhan center Syed Moj-e-darya Road, Jain Mandir chowk, Lahore",
        "appointmentLetterStatus": "YES",
        "agreementSignStatus": "",
        "linkedInProfile": "https://www.linkedin.com/in/salmantahir3249/",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP210904",
        "name": "Ahsan Raza",
        "designation": "",
        "cnic": "",
        "personalEmail": "",
        "email": "",
        "phoneNumber": "",
        "joiningDate": "20-May-21",
        "permanentDate": "01-Nov-21",
        "status": "Not Active",
        "dateOfBirth": "",
        "education": "",
        "address": "",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP220301",
        "name": "M. Mohsin Jamshaid",
        "designation": "Software Engineer",
        "cnic": "3520261909511",
        "personalEmail": "",
        "email": "mohsin.jamshaid@devbox.co",
        "phoneNumber": "3224878546",
        "joiningDate": "01-Mar-22",
        "permanentDate": "same",
        "status": "Not Active",
        "dateOfBirth": "15-Nov-1996",
        "education": "BSIT",
        "address": "House no.4, street #16, Kochupura Lahore",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP220302",
        "name": "Naqash Zafar",
        "designation": "Sr. QA Analyst",
        "cnic": "3520276198395",
        "personalEmail": "naqash.zafar-qa@gmail.com",
        "email": "naqash.zafar@devbox.co",
        "phoneNumber": "3134415154",
        "joiningDate": "14-Mar-22",
        "permanentDate": "same",
        "status": "Not Active",
        "dateOfBirth": "03-Aug-1991",
        "education": "BSCS",
        "address": "8-L Izmir town Lahore",
        "appointmentLetterStatus": "Yes",
        "agreementSignStatus": "Yes",
        "linkedInProfile": "",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP220303",
        "name": "Rana M. Nabeel",
        "designation": "Sr. Software Engineer",
        "cnic": "35202-0632082-5",
        "personalEmail": "nabeel.afzal3392@gmail.com",
        "email": "nabeel.afzal@devbox.co",
        "phoneNumber": "3219495915",
        "joiningDate": "21-Mar-22",
        "permanentDate": "same",
        "status": "Active",
        "dateOfBirth": "03-Mar-1992",
        "education": "BSIT",
        "address": "190 Gardenia block, sector C, Bahria Town Lahore",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP220601",
        "name": "Madiha Ilyas",
        "designation": "SQA Intern",
        "cnic": "33105-9006530-4",
        "personalEmail": "madihailyas4650@gmail.com",
        "email": "madiha.ilyas@devbox.co",
        "phoneNumber": "3015037986",
        "joiningDate": "06-Jun-22",
        "permanentDate": "06-Sep-22",
        "status": "Active",
        "dateOfBirth": "05-May-2000",
        "education": "BSSE",
        "address": "137 road samundri , Faislabad",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP220701",
        "name": "Zaiba Arooj",
        "designation": "SQA Intern",
        "cnic": "35501-0262064-6",
        "personalEmail": "zaibaarooj567@gmail.com",
        "email": "zaiba.arooj@devbox.co",
        "phoneNumber": "3466743433",
        "joiningDate": "18-Jul-22",
        "permanentDate": "18-Oct-22",
        "status": "Active",
        "dateOfBirth": "02-Mar-1999",
        "education": "BSCS",
        "address": "chack No.18 G.B Tehsil & District Nankana Sahib",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP220702",
        "name": "Nabiha Nisar",
        "designation": "HR Intern",
        "cnic": "35501-0299102-2",
        "personalEmail": "nabihanisar041@gmail.com",
        "email": "",
        "phoneNumber": "3233333004",
        "joiningDate": "18-Jul-22",
        "permanentDate": "",
        "status": "Active",
        "dateOfBirth": "22-Sep-2002",
        "education": "BSHEL",
        "address": "Pak Arab Society F1 block, Lahore",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP220703",
        "name": "Syed Shaheryar Tirmizi",
        "designation": "Trainee Software Engineer",
        "cnic": "36302-6510830-1",
        "personalEmail": "syedshaheryar1@gmail.com",
        "email": "syed.shaheryar@devbox.co",
        "phoneNumber": "3044208796",
        "joiningDate": "20-Jul-22",
        "permanentDate": "20-Oct-22",
        "status": "Active",
        "dateOfBirth": "17-Nov-2000",
        "education": "BSCS",
        "address": "Plot 319 F2 block Johar town.",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP220704",
        "name": "Khan Muhammad",
        "designation": "Sr. Software Engineer",
        "cnic": "36203-4341255-7",
        "personalEmail": "khanmuhammadmalik@gmail.com",
        "email": "khan.muhammad@devbox.co",
        "phoneNumber": "3006826451",
        "joiningDate": "21-Jul-22",
        "permanentDate": "Same",
        "status": "Active",
        "dateOfBirth": "01-May-1983",
        "education": "MSCS",
        "address": "Chah Lalain wala mouza lahori P/O Galawala Lodhran",
        "appointmentLetterStatus": "Yes",
        "agreementSignStatus": "Yes",
        "linkedInProfile": "",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP220705",
        "name": "Suleman Ahmad",
        "designation": "Sr. Software Engineer",
        "cnic": "34104-3795279-9",
        "personalEmail": "suleman.saleh@gmail.com",
        "email": "suleman.ahmad@devbox.co",
        "phoneNumber": "3226407056",
        "joiningDate": "22-Jul-22",
        "permanentDate": "Same",
        "status": "Active",
        "dateOfBirth": "15-Apr-1988",
        "education": "BSSE",
        "address": "House no. E 192 Gulshan Park, Nishat colony , Lahore cantt",
        "appointmentLetterStatus": "Yes",
        "agreementSignStatus": "Yes",
        "linkedInProfile": "",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP220901",
        "name": "Muhammad Abu Bakar",
        "designation": ".NET Automation Engineer",
        "cnic": "36103-6432308-3",
        "personalEmail": "mbakar.se@gmail.com",
        "email": "Abu.bakar@devbox.co",
        "phoneNumber": "3088688693",
        "joiningDate": "01-Sep-22",
        "permanentDate": "same",
        "status": "Active",
        "dateOfBirth": "13-Aug-1997",
        "education": "BSIT",
        "address": "House no.151, Nasir park, Tariq abaad khanewal, Punjab",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP220902",
        "name": "Arooj Asif",
        "designation": "Tele sales representative",
        "cnic": "38403-5988664-0",
        "personalEmail": "aarooj626@gmail.com",
        "email": "arooj.asif@devbox.co",
        "phoneNumber": "3157573013",
        "joiningDate": "05-Sep-22",
        "permanentDate": "5-Dec-22",
        "status": "Active",
        "dateOfBirth": "15-Aug-1999",
        "education": "BSMC",
        "address": "Chak no.84 s.b lahore road sargodha",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP220903",
        "name": "Hassan Mehmood",
        "designation": "Software Engineer",
        "cnic": "37405-7994116-1",
        "personalEmail": "hassanmehmood.psr@gmail.com",
        "email": "hassan.mehmood@devbox.co",
        "phoneNumber": "3486663184",
        "joiningDate": "19-Sep-22",
        "permanentDate": "1-Jan-23",
        "status": "Active",
        "dateOfBirth": "10-Jun-1998",
        "education": "BSCS",
        "address": "Mohalla sarkari haveli p.o kalas wala tehsil pasrur, Sialkot",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "male",
        "profile_url": ""
      },
      {
        "employee_No": "EMP160101",
        "name": "Habib Ali",
        "designation": "",
        "cnic": "",
        "personalEmail": "",
        "email": "",
        "phoneNumber": "",
        "joiningDate": "01-Jan-16",
        "permanentDate": "",
        "status": "Healthwire",
        "dateOfBirth": "",
        "education": "",
        "address": "",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "",
        "profile_url": ""
      },
      {
        "employee_No": "EMP161202",
        "name": "Talal Cheema",
        "designation": "",
        "cnic": "",
        "personalEmail": "",
        "email": "",
        "phoneNumber": "",
        "joiningDate": "01-Dec-16",
        "permanentDate": "",
        "status": "Healthwire",
        "dateOfBirth": "",
        "education": "",
        "address": "",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "",
        "profile_url": ""
      },
      {
        "employee_No": "EMP17100",
        "name": "Danish Rasheed",
        "designation": "",
        "cnic": "",
        "personalEmail": "",
        "email": "",
        "phoneNumber": "",
        "joiningDate": "01-Oct-17",
        "permanentDate": "",
        "status": "Healthwire",
        "dateOfBirth": "",
        "education": "",
        "address": "",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "",
        "profile_url": ""
      },
      {
        "employee_No": "EMP171101",
        "name": "Muhammad Ali",
        "designation": "",
        "cnic": "",
        "personalEmail": "",
        "email": "",
        "phoneNumber": "",
        "joiningDate": "01-Nov-17",
        "permanentDate": "",
        "status": "Healthwire",
        "dateOfBirth": "",
        "education": "",
        "address": "",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "",
        "profile_url": ""
      },
      {
        "employee_No": "EMP150501",
        "name": "Adnan Shafiq ",
        "designation": "",
        "cnic": "",
        "personalEmail": "",
        "email": "",
        "phoneNumber": "",
        "joiningDate": "01-May-15",
        "permanentDate": "",
        "status": "Not Active",
        "dateOfBirth": "",
        "education": "",
        "address": "",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "",
        "profile_url": ""
      },
      {
        "employee_No": "EMP150504",
        "name": "Fahad Muneer",
        "designation": "",
        "cnic": "",
        "personalEmail": "",
        "email": "",
        "phoneNumber": "",
        "joiningDate": "01-May-15",
        "permanentDate": "",
        "status": "Not Active",
        "dateOfBirth": "",
        "education": "",
        "address": "",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "",
        "profile_url": ""
      },
      {
        "employee_No": "EMP150503",
        "name": "Ghazanfar Mehdi",
        "designation": "",
        "cnic": "",
        "personalEmail": "",
        "email": "",
        "phoneNumber": "",
        "joiningDate": "01-May-15",
        "permanentDate": "",
        "status": "Not Active",
        "dateOfBirth": "",
        "education": "",
        "address": "",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "",
        "profile_url": ""
      },
      {
        "employee_No": "EMP150502",
        "name": "Naeem",
        "designation": "",
        "cnic": "",
        "personalEmail": "",
        "email": "",
        "phoneNumber": "",
        "joiningDate": "01-May-15",
        "permanentDate": "",
        "status": "Not Active",
        "dateOfBirth": "",
        "education": "",
        "address": "",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "",
        "profile_url": ""
      },
      {
        "employee_No": "EMP150804",
        "name": "Mirza Faraz",
        "designation": "",
        "cnic": "",
        "personalEmail": "",
        "email": "",
        "phoneNumber": "",
        "joiningDate": "01-Aug-15",
        "permanentDate": "",
        "status": "Not Active",
        "dateOfBirth": "",
        "education": "",
        "address": "",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "",
        "profile_url": ""
      },
      {
        "employee_No": "EMP150901",
        "name": "Aleem Nazar",
        "designation": "",
        "cnic": "",
        "personalEmail": "",
        "email": "",
        "phoneNumber": "",
        "joiningDate": "01-Sep-15",
        "permanentDate": "",
        "status": "Not Active",
        "dateOfBirth": "",
        "education": "",
        "address": "",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "",
        "profile_url": ""
      },
      {
        "employee_No": "EMP150902",
        "name": "Usman Ahmad",
        "designation": "",
        "cnic": "",
        "personalEmail": "",
        "email": "",
        "phoneNumber": "",
        "joiningDate": "01-Sep-15",
        "permanentDate": "",
        "status": "Not Active",
        "dateOfBirth": "",
        "education": "",
        "address": "",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "",
        "profile_url": ""
      },
      {
        "employee_No": "EMP160201",
        "name": "Afia Moin",
        "designation": "",
        "cnic": "",
        "personalEmail": "",
        "email": "",
        "phoneNumber": "",
        "joiningDate": "01-Feb-16",
        "permanentDate": "",
        "status": "Not Active",
        "dateOfBirth": "",
        "education": "",
        "address": "",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "",
        "profile_url": ""
      },
      {
        "employee_No": "EMP160301",
        "name": "Sajawal Khan",
        "designation": "",
        "cnic": "",
        "personalEmail": "",
        "email": "",
        "phoneNumber": "",
        "joiningDate": "01-Mar-16",
        "permanentDate": "",
        "status": "Not Active",
        "dateOfBirth": "",
        "education": "",
        "address": "",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "",
        "profile_url": ""
      },
      {
        "employee_No": "EMP160302",
        "name": "Waqar",
        "designation": "",
        "cnic": "",
        "personalEmail": "",
        "email": "",
        "phoneNumber": "",
        "joiningDate": "01-Mar-16",
        "permanentDate": "",
        "status": "Not Active",
        "dateOfBirth": "",
        "education": "",
        "address": "",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "",
        "profile_url": ""
      },
      {
        "employee_No": "EMP160401",
        "name": "Usama Maskhoor",
        "designation": "",
        "cnic": "",
        "personalEmail": "",
        "email": "",
        "phoneNumber": "",
        "joiningDate": "01-Apr-16",
        "permanentDate": "",
        "status": "Not Active",
        "dateOfBirth": "",
        "education": "",
        "address": "",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "",
        "profile_url": ""
      },
      {
        "employee_No": "EMP160602",
        "name": "Habib Ali",
        "designation": "",
        "cnic": "",
        "personalEmail": "",
        "email": "",
        "phoneNumber": "",
        "joiningDate": "01-Jun-16",
        "permanentDate": "",
        "status": "Not Active",
        "dateOfBirth": "",
        "education": "",
        "address": "",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "",
        "profile_url": ""
      },
      {
        "employee_No": "EMP160601",
        "name": "Hamza Hayat",
        "designation": "Intern",
        "cnic": "",
        "personalEmail": "",
        "email": "",
        "phoneNumber": "",
        "joiningDate": "01-Jun-16",
        "permanentDate": "",
        "status": "Not Active",
        "dateOfBirth": "",
        "education": "",
        "address": "",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "",
        "profile_url": ""
      },
      {
        "employee_No": "EMP160603",
        "name": "M. Husnain",
        "designation": "",
        "cnic": "",
        "personalEmail": "",
        "email": "",
        "phoneNumber": "",
        "joiningDate": "01-Jun-16",
        "permanentDate": "",
        "status": "Not Active",
        "dateOfBirth": "",
        "education": "",
        "address": "",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "",
        "profile_url": ""
      },
      {
        "employee_No": "EMP160604",
        "name": "Mussa Butt",
        "designation": "",
        "cnic": "",
        "personalEmail": "",
        "email": "",
        "phoneNumber": "",
        "joiningDate": "01-Jun-16",
        "permanentDate": "",
        "status": "Not Active",
        "dateOfBirth": "",
        "education": "",
        "address": "",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "",
        "profile_url": ""
      },
      {
        "employee_No": "EMP160605",
        "name": "Waqar Hassan",
        "designation": "",
        "cnic": "",
        "personalEmail": "",
        "email": "",
        "phoneNumber": "",
        "joiningDate": "01-Jun-16",
        "permanentDate": "",
        "status": "Not Active",
        "dateOfBirth": "",
        "education": "",
        "address": "",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "",
        "profile_url": ""
      },
      {
        "employee_No": "EMP161102",
        "name": "Faheem",
        "designation": "",
        "cnic": "",
        "personalEmail": "",
        "email": "",
        "phoneNumber": "",
        "joiningDate": "01-Nov-16",
        "permanentDate": "",
        "status": "Not Active",
        "dateOfBirth": "",
        "education": "",
        "address": "",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "",
        "profile_url": ""
      },
      {
        "employee_No": "EMP161103",
        "name": "Qasim Ali",
        "designation": "",
        "cnic": "",
        "personalEmail": "",
        "email": "",
        "phoneNumber": "",
        "joiningDate": "01-Nov-16",
        "permanentDate": "",
        "status": "Not Active",
        "dateOfBirth": "",
        "education": "",
        "address": "",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "",
        "profile_url": ""
      },
      {
        "employee_No": "EMP161104",
        "name": "Sidra Rashid",
        "designation": "",
        "cnic": "",
        "personalEmail": "",
        "email": "",
        "phoneNumber": "",
        "joiningDate": "01-Nov-16",
        "permanentDate": "",
        "status": "Not Active",
        "dateOfBirth": "",
        "education": "",
        "address": "",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "",
        "profile_url": ""
      },
      {
        "employee_No": "EMP170401",
        "name": "Usman Ismaeel",
        "designation": "",
        "cnic": "",
        "personalEmail": "",
        "email": "",
        "phoneNumber": "",
        "joiningDate": "01-Apr-17",
        "permanentDate": "",
        "status": "Not Active",
        "dateOfBirth": "",
        "education": "",
        "address": "",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "",
        "profile_url": ""
      },
      {
        "employee_No": "EMP171002",
        "name": "Waqas Shah",
        "designation": "",
        "cnic": "",
        "personalEmail": "",
        "email": "",
        "phoneNumber": "",
        "joiningDate": "01-Oct-17",
        "permanentDate": "",
        "status": "Not Active",
        "dateOfBirth": "",
        "education": "",
        "address": "",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "",
        "profile_url": ""
      },
      {
        "employee_No": "EMP200101",
        "name": "Shahzaib Iman",
        "designation": "",
        "cnic": "",
        "personalEmail": "",
        "email": "",
        "phoneNumber": "",
        "joiningDate": "20-Jan-20",
        "permanentDate": "",
        "status": "Not Active",
        "dateOfBirth": "",
        "education": "",
        "address": "",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "",
        "profile_url": ""
      },
      {
        "employee_No": "EMP200801",
        "name": "Muhammad Zirak Waheed",
        "designation": "",
        "cnic": "",
        "personalEmail": "",
        "email": "",
        "phoneNumber": "",
        "joiningDate": "10-Aug-20",
        "permanentDate": "",
        "status": "Not Active",
        "dateOfBirth": "",
        "education": "",
        "address": "",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "",
        "profile_url": ""
      },
      {
        "employee_No": "EMP210801",
        "name": "Ibrar Awan",
        "designation": "ROR Associate ",
        "cnic": "3520166908375",
        "personalEmail": "",
        "email": "ibrar.awan8@gmail.com",
        "phoneNumber": "0348-4834032",
        "joiningDate": "01-Aug-21",
        "permanentDate": "",
        "status": "Not Active",
        "dateOfBirth": "",
        "education": "",
        "address": "Opposite pso petrol pump near Bata police station GT road Lahore",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "",
        "profile_url": ""
      },
      {
        "employee_No": "EMP200701",
        "name": "Ammad Aslam",
        "designation": "Software Engineer  ",
        "cnic": "3520250814951",
        "personalEmail": "",
        "email": "ammad.aslam@devbox.co",
        "phoneNumber": "",
        "joiningDate": "08-Jul-20",
        "permanentDate": "",
        "status": "Resigned",
        "dateOfBirth": "",
        "education": "",
        "address": "",
        "appointmentLetterStatus": "",
        "agreementSignStatus": "",
        "linkedInProfile": "",
        "gender": "",
        "profile_url": ""
      }
    ]
    for (let i = 0; i < empl.length; i++) {
      const res = await employeeRequests.addBulkEmployeeApi(empl[i]);
    }
  }

  const addAndUpdateEmployee = async () => {

    if (!doValidation()) {
      if (state.isEditEmployeeClicked === true) {
        try {
          // const profile_url = await handleSubmission();

          // state.newEmployee.profile_url = profile_url;
          const res = await employeeRequests.updateEmployeeApi(state.newEmployee);
          console.log("updateEmployee Response", res);
          if (res.error === false) {

            toast.success("Employee Updated !");
            let temp = state.employees.filter((item) => item.id != res.data.id);
            dispatch(updateEmployeesAction([...temp, res.data]));
            dispatch(updateIsAddEmployeeClickedAction(false));
            dispatch(updateIsEditEmployeeClickedAction(false));
          }
        } catch (e) {
          toast.error("error !");

        }
      } else {
        try {
          // const profile_url = await handleSubmission();

          // state.newEmployee.profile_url = profile_url;
          const res = await employeeRequests.addEmployeeApi(state.newEmployee);
          console.log("addEmployeeApi Response", res);

          if (res.error === false) {
            toast.success("Employee Added !");

            dispatch(updateEmployeesAction([...state.employees, res.data]));
            dispatch(updateIsAddEmployeeClickedAction(false));
            dispatch(updateIsEditEmployeeClickedAction(false));
          }
        } catch (e) {

          toast.error("error");
        }
      }
    } else {
      toast.error("validation failed");
      console.log("validation failed");

    }
  };
  const doValidation = () => {
    var tempFieldsWithError = { ...fieldsWithError };
    var isError = false;
    var tempErrorInfo = { ...errorInfo };


    Object.entries(fieldsWithError).forEach((x) => {

      if (state.newEmployee[x[0]] !== undefined) {
        if (state.newEmployee[x[0]] !== "") {
          if (x[0] === "email" || x[0] === "phoneNumber") {
            isError = fieldsWithError[x[0]];
          } else {
            tempFieldsWithError[x[0]] = false;
            tempErrorInfo[x[0]] = false;
            isError = false;
          }
        } else {

          tempFieldsWithError[x[0]] = true;
          tempErrorInfo[x[0]] = `${x[0]} cannot be empty`;
          isError = true;
        }
      } else {

        tempFieldsWithError[x[0]] = true;
        tempErrorInfo[x[0]] = `${x[0]} cannot be empty`;
        isError = true;
      }
    });

    setErrorInfo(tempErrorInfo);
    setFieldsWithError(tempFieldsWithError);
    Object.entries(tempFieldsWithError).forEach((x) => {
      if (x[1] === true) {

        isError = true;
      }
    });

    return isError;
  };

  function validateEmail(email) {
    {
      var regx = /\S+@\S+\.\S+/;
      if (regx.test(email)) {
        console.log(true);
        setFieldsWithError({
          ...fieldsWithError,
          email: false,
        });
      } else {
        console.log(false);
        setFieldsWithError({
          ...fieldsWithError,
          email: true,
        });
        setErrorInfo({
          ...errorInfo,
          email: "You have entered an invalid email address!",
        });
      }
    }
  }

  function validateNumberOnly(num) {
    var reg = new RegExp("^[0-9]*$");

    if (reg.test(num) == false) {
      setFieldsWithError({
        ...fieldsWithError,
        phoneNumber: true,
      });
      setErrorInfo({
        ...errorInfo,
        phoneNumber: "only Numbers allowed",
      });
    } else {
      setFieldsWithError({
        ...fieldsWithError,
        phoneNumber: false,
      });
    }
  }
  const handleReactSelectChange = (param) => {
    dispatch(
      updateNewEmployeeAction({
        ...state.newEmployee,
        [param.field]: param.value,
      })
    );
  };
  const handleReactChange = (param) => {
    dispatch(
      updateNewEmployeeAction({
        ...state.newEmployee,
        name: param.value,
      })
    );
  };

  /*   console.log("fieldsWithError", fieldsWithError);
    console.log("errorInfo", errorInfo);
    console.log("state", state); */

  return (
    <>
      <div className="container-fluid px-1 mx-auto">
        <div className="row d-flex justify-content-center">
          <div className="card">
            <div className="form-card">
              <button
                className="btn btn-outline-primary mb-3"
                onClick={handleCancel}
              >
                <IoArrowBackSharp />
              </button>
              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex" style={{marginTop:"8px"}}>
                  <label className="form-control-label">
                    Name<span className="text-danger"> *</span>
                  </label>{" "}
                  <Select
                    type="text"
                    id="name"
                    value={{
                      label: state.newEmployee.name,
                    }}
                    name="name"
                    options={candidates}
                    onChange={handleReactChange}
                  ></Select>

                  {fieldsWithError.name === true ? (
                    <>
                      <label className="error form-control-label px-3">
                        {errorInfo.name}
                      </label>{" "}
                    </>
                  ) : (
                    ""
                  )}
                </div>

                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Employee No.<span className="text-danger"> *</span>
                  </label>{" "}
                  <input
                    className={
                      fieldsWithError.employee_No === true ? "redBorder" : ""
                    }
                    value={state.newEmployee.employee_No}
                    onChange={handleChange}
                    type="text"
                    id="employee_No"
                    name="employee_No"
                    placeholder="Enter Employee No."
                    disabled
                  />{" "}
                  {fieldsWithError.employee_No === true ? (
                    <>
                      <label className="error form-control-label px-3">
                        {errorInfo.employee_No}
                      </label>{" "}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    CNIC<span className="text-danger"> *</span>
                  </label>{" "}
                  <input
                    className={fieldsWithError.cnic === true ? "redBorder" : ""}
                    value={state.newEmployee.cnic}
                    onChange={handleChange}
                    type="text"
                    id="cnic"
                    name="cnic"
                    placeholder="Enter your CNIC"
                  />{" "}
                  {fieldsWithError.cnic === true ? (
                    <>
                      <label className="error form-control-label px-3">
                        {errorInfo.cnic}
                      </label>{" "}
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Date of Birth<span className="text-danger"> *</span>
                  </label>{" "}
                  <input
                    className={
                      fieldsWithError.dateOfBirth === true ? "redBorder" : ""
                    }
                    value={state?.newEmployee?.dateOfBirth?.slice(0, 10)}
                    onChange={handleChange}
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    placeholder="Enter your date of birth"
                  />{" "}
                  {fieldsWithError.dateOfBirth === true ? (
                    <>
                      <label className="error form-control-label px-3">
                        {errorInfo.dateOfBirth}
                      </label>{" "}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Business email<span className="text-danger"> *</span>
                  </label>{" "}
                  <input
                    className={
                      fieldsWithError.email === true ? "redBorder" : ""
                    }
                    value={state.newEmployee.email}
                    onChange={handleChange}
                    type="text"
                    id="email"
                    name="email"
                    placeholder=""
                    onBlur={(e) => validateEmail(e.target.value)}
                  />{" "}
                  {fieldsWithError.email === true ? (
                    <>
                      <label className="error form-control-label px-3">
                        {errorInfo.email}
                      </label>{" "}
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Personal Email<span className="text-danger"> *</span>
                  </label>{" "}
                  <input
                    className={
                      fieldsWithError.personalEmail === true ? "redBorder" : ""
                    }
                    value={state.newEmployee.personalEmail}
                    onChange={handleChange}
                    type="text"
                    id="personalEmail"
                    name="personalEmail"
                    placeholder=""
                    onBlur={(e) => validateEmail(e.target.value)}
                  />{" "}
                  {fieldsWithError.personalEmail === true ? (
                    <>
                      <label className="error form-control-label px-3">
                        {errorInfo.personalEmail}
                      </label>{" "}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Home Address<span className="text-danger"> *</span>
                  </label>{" "}
                  <input
                    className={
                      fieldsWithError.address === true ? "redBorder" : ""
                    }
                    value={state.newEmployee.address}
                    onChange={handleChange}
                    type="text"
                    id="address"
                    name="address"
                    placeholder=""
                  />{" "}
                  {fieldsWithError.address === true ? (
                    <>
                      <label className="error form-control-label px-3">
                        {errorInfo.address}
                      </label>{" "}
                    </>
                  ) : (
                    ""
                  )}
                </div>

                <div className="form-group col-sm-6 flex-column d-flex">
                  {" "}
                  <label className="form-control-label px-3">
                    Phone number<span className="text-danger"> *</span>
                  </label>{" "}
                  <input
                    className={
                      fieldsWithError.phoneNumber === true ? "redBorder" : ""
                    }
                    value={state.newEmployee.phoneNumber}
                    onChange={handleChange}
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder=""
                    onBlur={(e) => validateNumberOnly(e.target.value)}
                  />{" "}
                  {fieldsWithError.phoneNumber === true ? (
                    <>
                      <label className="error form-control-label px-3">
                        {errorInfo.phoneNumber}
                      </label>{" "}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Gender<span className="text-danger"> *</span>
                  </label>{" "}
                  <Select
                    /* value={} */
                    value={{
                      label: state.newEmployee.gender
                        ? state.newEmployee.gender.charAt(0).toUpperCase() +
                        state.newEmployee.gender.slice(1)
                        : null,
                      value: state.newEmployee.gender,
                    }}
                    id="gender"
                    name="gender"
                    options={[
                      { label: "Male", value: "male", field: "gender" },
                      { label: "Female", value: "female", field: "gender" },
                    ]}
                    onChange={handleReactSelectChange}
                  ></Select>{" "}
                  {fieldsWithError.gender === true ? (
                    <div>
                      <label style={{ color: "red" }}>please select one</label>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Status<span className="text-danger"> *</span>
                  </label>{" "}
                  <Select
                    /* value={} */
                    value={{
                      label: state.newEmployee.status
                        ? state.newEmployee.status.charAt(0).toUpperCase() +
                        state.newEmployee.status.slice(1)
                        : null,
                      value: state.newEmployee.status,
                    }}
                    id="status"
                    name="status"
                    options={empStatusOptions}
                    onChange={handleReactSelectChange}
                  ></Select>{" "}
                  {fieldsWithError.status === true ? (
                    <>
                      <label className="error form-control-label px-3">
                        {errorInfo.status}
                      </label>{" "}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Permanent Date<span className="text-danger"> *</span>
                  </label>{" "}
                  <input
                    className={
                      fieldsWithError.permanentDate === true ? "redBorder" : ""
                    }
                    value={state?.newEmployee?.permanentDate?.slice(0, 10)}
                    onChange={handleChange}
                    type="date"
                    id="permanentDate"
                    name="permanentDate"
                    placeholder=""
                  />{" "}
                  {fieldsWithError.permanentDate === true ? (
                    <>
                      <label className="error form-control-label px-3">
                        {errorInfo.permanentDate}
                      </label>{" "}
                    </>
                  ) : (
                    ""
                  )}
                </div>

                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Joining Date<span className="text-danger"> *</span>
                  </label>{" "}
                  <input
                    className={
                      fieldsWithError.joiningDate === true ? "redBorder" : ""
                    }
                    value={state?.newEmployee?.joiningDate?.slice(0, 10)}
                    onChange={handleChange}
                    type="date"
                    id="joiningDate"
                    name="joiningDate"
                    placeholder="Enter your Joining date"
                  />{" "}
                  {fieldsWithError.joiningDate === true ? (
                    <>
                      <label className="error form-control-label px-3">
                        {errorInfo.joiningDate}
                      </label>{" "}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Designation<span className="text-danger"> *</span>
                  </label>{" "}
                  <Select
                    /* value={} */
                    value={{
                      label: state.newEmployee.designation
                        ? state.newEmployee.designation
                          .charAt(0)
                          .toUpperCase() +
                        state.newEmployee.designation.slice(1)
                        : null,
                      value: state.newEmployee.designation,
                    }}
                    id="designation"
                    name="designation"
                    options={empDesignationOptions}
                    onChange={handleReactSelectChange}
                  ></Select>{" "}
                  {fieldsWithError.designation === true ? (
                    <>
                      <label className="error form-control-label px-3">
                        {errorInfo.designation}
                      </label>{" "}
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Salary<span className="text-danger"> *</span>
                  </label>{" "}
                  <input
                    className={
                      fieldsWithError.salary === true ? "redBorder" : ""
                    }
                    value={state.newEmployee.salary}
                    onChange={handleChange}
                    type="text"
                    id="salary"
                    name="salary"
                    placeholder="Enter salary"
                    onBlur={(e) => validateNumberOnly(e.target.value)}
                  />{" "}
                  {fieldsWithError.salary === true ? (
                    <>
                      <label className="error form-control-label px-3">
                        {errorInfo.salary}
                      </label>{" "}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Qualification<span className="text-danger"> *</span>
                  </label>{" "}
                  <input
                    className={
                      fieldsWithError.education === true ? "redBorder" : ""
                    }
                    value={state.newEmployee.education}
                    onChange={handleChange}
                    type="text"
                    id="education"
                    name="education"
                    placeholder=""
                  />{" "}
                  {fieldsWithError.education === true ? (
                    <>
                      <label className="error form-control-label px-3">
                        {errorInfo.education}
                      </label>{" "}
                    </>
                  ) : (
                    ""
                  )}
                </div>

                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    LinkedIn Profile<span className="text-danger"> *</span>
                  </label>{" "}
                  <input
                    className={
                      fieldsWithError.linkedInProfile === true ? "redBrder" : ""
                    }
                    value={state.newEmployee.linkedInProfile}
                    onChange={handleChange}
                    type="text"
                    id="linkedInProfile"
                    name="linkedInProfile"
                    placeholder=""
                  />{" "}
                  {fieldsWithError.linkedInProfile === true ? (
                    <>
                      <label className="error form-control-label px-3">
                        {errorInfo.linkedInProfile}
                      </label>{" "}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Technology<span className="text-danger"> *</span>
                  </label>{" "}
                  <input
                    className={
                      fieldsWithError.technology === true ? "redBorder" : ""
                    }
                    value={state.newEmployee.technology}
                    onChange={handleChange}
                    type="text"
                    id="technology"
                    name="technology"
                    placeholder=""
                  />{" "}
                  {fieldsWithError.technology === true ? (
                    <>
                      <label className="error form-control-label px-3">
                        {errorInfo.technology}
                      </label>{" "}
                    </>
                  ) : (
                    ""
                  )}
                </div>

                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">
                    Work Experience<span className="text-danger"> *</span>
                  </label>{" "}
                  <input
                    className={
                      fieldsWithError.workExperience === true ? "redBrder" : ""
                    }
                    value={state.newEmployee.workExperience}
                    onChange={handleChange}
                    type="text"
                    id="workExperience"
                    name="workExperience"
                    placeholder=""
                  />{" "}
                  {fieldsWithError.workExperience === true ? (
                    <>
                      <label className="error form-control-label px-3">
                        {errorInfo.workExperience}
                      </label>{" "}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <div className="maxl">
                    <label className="form-control-label px-3 radio inline">
                      Appointment Letter Status
                      <span className="text-danger"> *</span>
                    </label>
                    <input
                      id="appointmentLetterStatus"
                      type="radio"
                      checked={
                        state.newEmployee.appointmentLetterStatus === "true"
                      }
                      name="appointmentLetterStatus"
                      value="true"
                      onChange={(e) => handleChange(e)}
                    />
                    <span> Yes </span>

                    <label
                      style={{ marginLeft: "20px" }}
                      className="radio inline"
                    >
                      <input
                        id="appointmentLetterStatus"
                        type="radio"
                        checked={
                          state.newEmployee.appointmentLetterStatus === "false"
                        }
                        name="appointmentLetterStatus"
                        value="false"
                        onChange={(e) => handleChange(e)}
                      />
                      <span className="ml-1">No </span>
                    </label>
                    {fieldsWithError.appointmentLetterStatus === true ? (
                      <div>
                        <label style={{ color: "red" }}>
                          please select one
                        </label>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="form-group col-sm-6 flex-column d-flex">
                  <div className="maxl">
                    <label className="form-control-label px-3 radio inline">
                      Agreement Sign Status
                      <span className="text-danger"> *</span>
                    </label>
                    <input
                      id="agreementSignStatus"
                      type="radio"
                      checked={state.newEmployee.agreementSignStatus === "true"}
                      name="agreementSignStatus"
                      value={true}
                      onChange={(e) => handleChange(e)}
                    />
                    <span> Yes </span>

                    <label
                      style={{ marginLeft: "20px" }}
                      className="radio inline"
                    >
                      <input
                        id="agreementSignStatus"
                        type="radio"
                        checked={
                          state.newEmployee.agreementSignStatus === "false"
                        }
                        name="agreementSignStatus"
                        value={false}
                        onChange={(e) => handleChange(e)}
                      />
                      <span className="ml-1">No </span>
                    </label>
                    {fieldsWithError.agreementSignStatus === true ? (
                      <div>
                        <label style={{ color: "red" }}>
                          please select one
                        </label>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>

              <div className="row justify-content-between text-left">

                <label className="form-control-label">
                  Upload image
                </label>
                <CIcon size={'3xl'} icon={cibAddthis} onClick={() => setIsFilePicked(true)} />
                {state.newEmployee.profile_url ?
                  <CLink
                    href={state.newEmployee.profile_url}
                    target="_blank"
                  >
                    {state.newEmployee.profile_url}
                  </CLink>
                  : <></>}

                {isFilePicked ?
                  <PickerOverlay
                    pickerOptions={{
                      accept: "image/*",
                      onClose: (res) => {
                        setIsFilePicked(false);
                      }
                    }}
                    apikey={'AUs6NdV3RbWNpyzRd3VH1z'}
                    onSuccess={(res) => console.log(res)}
                    onUploadDone={(res) => uploadDone(res)}
                  />
                  : <></>}
              </div>

              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 ">
                  <button
                    className="btn-block btn-primary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
                {isAdmin &&
                  <div className="form-group col-sm-6 ">
                    <CButton

                      className="btn-block btn-primary"
                      onClick={() => addAndUpdateEmployee()}
                    >
                      {state.isEditEmployeeClicked
                        ? "Update Employee"
                        : "Add Employee"}
                    </CButton>

                    <CButton

                      className="btn-block btn-primary"
                      onClick={() => bulkAddEmployee()}
                    >
                      Bulk Employee ADD
                    </CButton>

                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;
