import React, { useEffect, useState } from "react";
import {
    addTicketAction,
    isAddTicketClickedAction
} from "src/redux/HelpDesk/helpDesk.actions";
import { useSelector, useDispatch } from "react-redux";
import { IoArrowBackSharp } from "react-icons/io5";
import Select from "react-select";
import { CButton, CLink } from "@coreui/react";
import { PickerOverlay } from 'filestack-react';
import CIcon from '@coreui/icons-react';
import { cibAddthis } from '@coreui/icons'
import { helpDeskRequests } from "src/API/helpDeskApi";

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted pink',
        color: state.isSelected ? 'blue' : 'black',

    }),
    // control: () => ({
    //     // none of react-select's styles are passed to <Control />
    //     // width: 400,
    //   }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return { ...provided, opacity, transition };
    }


}

const AddTicket = ({ }) => {
    const [fieldsWithError, setFieldsWithError] = useState({
        title: false,
        category: false

    });
    const [errorInfo, setErrorInfo] = useState({});
    const dispatch = useDispatch();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [reload, setReload] = useState(false);
    const currentUser = useSelector((state) => state.login.currentUser);
    const state = useSelector((state) => state.helpDesk);

    function handleChange(evt) {
        const value = evt.target.value;
        dispatch(
            addTicketAction({
                ...state.ticket,
                [evt.target.name]: value,
            })
        );
    }




    const uploadDone = (res) => {
        state.ticket.file = res.filesUploaded[0].url;
        setReload(!reload);
    }

    const doValidation = () => {
        var tempFieldsWithError = { ...fieldsWithError };
        var isError = false;
        var tempErrorInfo = { ...errorInfo };


        Object.entries(fieldsWithError).forEach((x) => {

            if (state.ticket[x[0]] !== undefined) {
                if (state.ticket[x[0]] !== "") {
                 
                        tempFieldsWithError[x[0]] = false;
                        tempErrorInfo[x[0]] = false;
                        isError = false;
                    
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

    const addAndUpdateTicket = async () => {
        if (!doValidation()) {
            state.ticket.date=new Date();
            state.ticket.status="In Review";
            state.ticket.employeeid=currentUser?.Profile.id;
            await helpDeskRequests.addTicketApi(state.ticket);
            dispatch(
                isAddTicketClickedAction(false)
            );
        }
    }

    const handleCancel = () => {

        dispatch(
            isAddTicketClickedAction(false)
        );

    }

    const handleReactSelectChange = (param) => {
        dispatch(
            addTicketAction({
                ...state.ticket,
                [param.field]: param.value,
            })
        );
    };



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
                                <div className="form-group col-sm-6 flex-column d-flex">
                                    <label className="form-control-label px-3">
                                        Title<span className="text-danger"> *</span>
                                    </label>{" "}
                                    <input
                                        className={fieldsWithError.title === true ? "redBorder" : ""}
                                        value={state.ticket.title}
                                        onChange={handleChange}
                                        type="text"
                                        id="title"
                                        name="title"
                                        placeholder="Enter Ticket Title"
                                    />{" "}
                                    {fieldsWithError.title === true ? (
                                        <>
                                            <label className="error form-control-label px-3">
                                                {errorInfo.title}
                                            </label>{" "}
                                        </>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="form-group col-sm-6 flex-column d-flex" style={{ marginTop: "6px" }}>

                                    <label className="form-control-label px-3">
                                        Category<span className="text-danger"> *</span>
                                    </label>
                                    <Select
                                        styles={customStyles}
                                        value={{
                                            label: state.ticket.category
                                                ? state.ticket.category.charAt(0).toUpperCase() +
                                                state.ticket.category.slice(1)
                                                : null,
                                            value: state.ticket.category,
                                        }}
                                        id="category"
                                        name="category"
                                        options={[
                                            { label: "Admin", value: "Admin", field: "category" },
                                            { label: "Mess", value: "Mess", field: "category" },
                                            { label: "HR", value: "HR", field: "category" },
                                            { label: "Hardware", value: "Hardware", field: "category" },
                                            { label: "Utilties", value: "Utilties", field: "category" },
                                        ]}
                                        onChange={handleReactSelectChange}
                                    ></Select>
                                    {fieldsWithError.category === true ? (
                                        <div>
                                            <label style={{ color: "red" }}>please select one</label>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>

                            </div>

                            <div className="row justify-content-between text-left">
                                <div className="form-group col-12 flex-column d-flex">
                                    <label className="form-control-label">
                                        Ticket Description

                                    </label>
                                    <textarea

                                        value={state?.ticket?.description}
                                        onChange={handleChange}

                                        id="description"
                                        name="description"
                                        placeholder="Write your description here."
                                        rows="8"

                                    ></textarea>

                                </div>
                            </div>

                            <div className="row justify-content-between text-left">

                                <label className="form-control-label">
                                    Ticket file
                                </label>
                                <CIcon size={'3xl'} icon={cibAddthis} onClick={() => setIsFilePicked(true)} />
                                {state.ticket.file ?
                                    <CLink
                                        href={state.ticket.file}
                                        target="_blank"
                                    >
                                        {state.ticket.file}
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
                                <div className="form-group col-sm-6 ">
                                    <CButton

                                        className="btn-block btn-primary"
                                        onClick={() => addAndUpdateTicket()}
                                    >
                                        {state.isEditEmployeeClicked
                                            ? "Update Ticket"
                                            : "Add Ticket"}
                                    </CButton>
                                </div>
                            </div>




                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddTicket;
