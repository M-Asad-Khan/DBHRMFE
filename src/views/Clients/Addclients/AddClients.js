import React from 'react'
import './addclients.css'

const addclients = ({ setState,
	state,
	isAddClient,
	setIsAddClient,
	setClients }) => {
		function handleChange(evt) {
			const value = evt.target.value;
			setState({
				...state,
				[evt.target.name]: value
			});
		}
		const handleCancel = () => {
			setState({})
			setIsAddClient(false);
		}
		const handleAddTeam = () => {
			setTeams(oldArray => [...oldArray, state]);
			setIsAddClient(false)
		}
  return (

   <div className="container-fluid px-1 py-5 mx-auto">
   <div className="row d-flex justify-content-center">
      
           
           <div className="card">
               
               <form className="form-card" onsubmit="event.preventDefault()">
                   <div className="row justify-content-between text-left">
                       <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Client ID<span className="text-danger"> *</span></label> <input type="text" id="cid" name="cid" placeholder="" onblur="validate(1)"/> </div>
                       <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Name<span className="text-danger"> *</span></label> <input type="text" id="lname" name="lname" placeholder="" onblur="validate(2)"/> </div>
                   </div>
                   <div className="row justify-content-between text-left">
                       <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Business email<span className="text-danger"> *</span></label> <input type="text" id="email" name="email" placeholder="" onblur="validate(3)"/> </div>
                       <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Phone number<span className="text-danger"> *</span></label> <input type="text" id="mob" name="mob" placeholder="" onblur="validate(4)"/> </div>
                   </div>
                   <div className="row justify-content-between text-left">
                       <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Country<span className="text-danger"> *</span></label> <input type="text" id="country" name="country" placeholder="" onblur="validate(10)"/> </div>
                       <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Project<span className="text-danger"> *</span></label> <input type="text" id="project" name="project" placeholder="" onblur="validate(9)"/> </div>
                   </div>
                   <div className="row justify-content-between text-left">
                       <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Technology<span className="text-danger"> *</span></label> <input type="text" id="tech" name="tech" placeholder="" onblur="validate(5)"/> </div>
                      
                   </div>
                  
                   <div className="row justify-content-between text-left">
							<div className="form-group col-sm-6 ">
								<button className="btn-block btn-primary" onClick={handleCancel}>Cancel</button>
							</div>
							<div className="form-group col-sm-6 ">
								<button className="btn-block btn-primary" onClick={handleAddTeam}>Add Employee</button>
							</div>
						</div>
               </form>
           </div>
       </div>
   </div>

  )
}

export default addclients
