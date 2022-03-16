import React,{useState} from 'react'
import './addteams.css'
import Select from 'react-select';


const addteams = () => {
 const [employee,setEmployee]=useState();
 const options = [
    { value: 'andy', label: 'Andy' },
    { value: 'Aysha', label: 'Aysha' },
    { value: 'Amna', label: 'Amna' },
    { value: 'Nancy', label: 'Nancy' },
    { value: 'El', label: 'Eleven' },
    { value: 'cadillac', label: 'Cadillac' },
  ];
  return (
    <div className="container-fluid px-1 py-5 mx-auto">
    <div className="row d-flex justify-content-center">
       
            
            <div className="card">
                
                <form className="form-card" onsubmit="event.preventDefault()">
                    <div className="row justify-content-between text-left">
                        <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Team ID<span className="text-danger"> *</span></label> <input type="text" id="tid" name="tid" placeholder="Enter Team ID" onblur="validate(1)"/> </div>
                        <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Project Manager<span className="text-danger"> *</span></label> <input type="text" id="pm" name="pm" placeholder="" onblur="validate(2)"/> </div>
                    </div>
                    <div className="row justify-content-between text-left">
                        <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Team Lead<span className="text-danger"> *</span></label> <input type="text" id="tl" name="tl" placeholder="" onblur="validate(10)"/> </div>
                        <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Project Name<span className="text-danger"> *</span></label> <input type="text" id="pname" name="pname" placeholder="" onblur="validate(9)"/> </div>
                    </div>
                    <div className="row justify-content-between text-left">
                        <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Enter Start Date<span className="text-danger"> *</span></label> <input type="text" id="date" name="date" placeholder="" onblur="validate(3)"/> </div>
                        <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Enter End Date<span className="text-danger"> *</span></label> <input type="text" id="edate" name="edate" placeholder="" onblur="validate(4)"/> </div>
                    </div>
                   
                    <div className="col-md-6 mb-4">
                                <div className="form-group"> <label for="form_need">Please select Employees *</label>
                                <Select
                                defaultValue={[options[1], options[2]]}
                                isMulti
                                name="employees"
                                options={options}
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />
                            </div>

                            {/* <select className="selectpicker" multiple searchable="Search here..">
    <option >USA</option>
    <option >Germany</option>
    <option >France</option>
    <option >Poland</option>
    <option >Japan</option>
  </select> */}
                                    </div>
                    
                    <div className="row justify-content-end">
                        <div className="form-group col-sm-6"> <button type="submit" className="btn-block btn-primary">Add Teams</button> </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

  )
}

export default addteams
