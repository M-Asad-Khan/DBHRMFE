import React from 'react'
import './addclients.css'

const addclients = () => {
  return (

   <div class="container-fluid px-1 py-5 mx-auto">
   <div class="row d-flex justify-content-center">
      
           
           <div class="card">
               
               <form class="form-card" onsubmit="event.preventDefault()">
                   <div class="row justify-content-between text-left">
                       <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Client ID<span class="text-danger"> *</span></label> <input type="text" id="cid" name="cid" placeholder="" onblur="validate(1)"/> </div>
                       <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Name<span class="text-danger"> *</span></label> <input type="text" id="lname" name="lname" placeholder="" onblur="validate(2)"/> </div>
                   </div>
                   <div class="row justify-content-between text-left">
                       <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Business email<span class="text-danger"> *</span></label> <input type="text" id="email" name="email" placeholder="" onblur="validate(3)"/> </div>
                       <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Phone number<span class="text-danger"> *</span></label> <input type="text" id="mob" name="mob" placeholder="" onblur="validate(4)"/> </div>
                   </div>
                   <div class="row justify-content-between text-left">
                       <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Country<span class="text-danger"> *</span></label> <input type="text" id="country" name="country" placeholder="" onblur="validate(10)"/> </div>
                       <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Project<span class="text-danger"> *</span></label> <input type="text" id="project" name="project" placeholder="" onblur="validate(9)"/> </div>
                   </div>
                   <div class="row justify-content-between text-left">
                       <div class="form-group col-sm-6 flex-column d-flex"> <label class="form-control-label px-3">Technology<span class="text-danger"> *</span></label> <input type="text" id="tech" name="tech" placeholder="" onblur="validate(5)"/> </div>
                      
                   </div>
                  
                   <div class="row justify-content-end">
                       <div class="form-group col-sm-6"> <button type="submit" class="btn-block btn-primary">Add Client</button> </div>
                   </div>
               </form>
           </div>
       </div>
   </div>

  )
}

export default addclients
