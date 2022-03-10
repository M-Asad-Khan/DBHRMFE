import React from 'react'
import './addclients.css'

const addclients = () => {
  return (

   <form class="contact-form row">
      <div class="form-field col-lg-6">
         <input id="name" class="input-text js-input" type="text" required/>
         <label class="label" for="name">Name</label>
      </div>
      <div class="form-field col-lg-6 ">
         <input id="email" class="input-text js-input" type="email" required/>
         <label class="label" for="email">E-mail</label>
      </div>
      <div class="form-field col-lg-6 ">
         <input id="country" class="input-text js-input" type="text" required/>
         <label class="label" for="country">Country</label>
      </div>
       <div class="form-field col-lg-6 ">
         <input id="phone" class="input-text js-input" type="text" required/>
         <label class="label" for="phone">Contact Number</label>
      </div>
      <div class="form-field col-lg-6">
         <input id="project" class="input-text js-input" type="text" required/>
         <label class="label" for="project">Project</label>
      </div>
      <div class="form-field col-lg-6">
         <input id="technology" class="input-text js-input" type="text" required/>
         <label class="label" for="technology">Technology</label>
      </div>
      <div class="form-field col-lg-12">
         <input class="submit-btn" type="submit" value="Add Clients"/>
      </div>
   </form>

  )
}

export default addclients
