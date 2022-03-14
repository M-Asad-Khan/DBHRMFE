import React from 'react'
import './addteams.css'

const addteams = () => {
  return (
    <div class="container-fluid px-1 py-5 mx-auto">
    <div class="row d-flex justify-content-center">
       
            
            <div class="card">
                
                <form class="form-card" onsubmit="event.preventDefault()">
                    <div class="row justify-content-between text-left">
                        <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Team ID<span class="text-danger"> *</span></label> <input type="text" id="tid" name="tid" placeholder="Enter Team ID" onblur="validate(1)"/> </div>
                        <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Project Manager<span class="text-danger"> *</span></label> <input type="text" id="pm" name="pm" placeholder="" onblur="validate(2)"/> </div>
                    </div>
                    <div class="row justify-content-between text-left">
                        <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Team Lead<span class="text-danger"> *</span></label> <input type="text" id="tl" name="tl" placeholder="" onblur="validate(10)"/> </div>
                        <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Project Name<span class="text-danger"> *</span></label> <input type="text" id="pname" name="pname" placeholder="" onblur="validate(9)"/> </div>
                    </div>
                    <div class="row justify-content-between text-left">
                        <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Enter Start Date<span class="text-danger"> *</span></label> <input type="text" id="date" name="date" placeholder="" onblur="validate(3)"/> </div>
                        <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Enter End Date<span class="text-danger"> *</span></label> <input type="text" id="edate" name="edate" placeholder="" onblur="validate(4)"/> </div>
                    </div>
                   
                    <div class="col-md-6">
                                        <div class="form-group"> <label for="form_need">Please select Employees *</label> <select id="form_need" name="need" class="form-control"  required="required" data-error="Please specify your need." >
                                                <option value="" selected disabled>--Select Employees--</option>
                                                <option>Aysha</option>
                                                <option>Andy</option>
                                                <option>Amna</option>
                                                <option>wajeeha</option>
                                            </select> </div>
                                    </div>
                    
                    
                    <div class="row justify-content-end">
                        <div class="form-group col-sm-6"> <button type="submit" class="btn-block btn-primary">Add Teams</button> </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

  )
}

export default addteams
