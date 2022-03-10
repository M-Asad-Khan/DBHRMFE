import React from 'react'  
import { useHistory } from "react-router-dom";



function DisplayTeams() {
    let history = useHistory();

    function handleClick() {
      history.push("/addteams");
    }
    const teams = [

        {Id:1,TeamLead:'Ali',Client:'Lahore',Project:12345},
      
        {Id:2,TeamLead:'Amir',Client:'Lahore',Project:23456,},
      
        {Id:3,TeamLead:'Suleman',Client:'Lahore',Project:34567}
      
      ];


      return (<>
                <button type="button" class="btn btn-outline-primary" onClick={handleClick}>Add Teams</button>
            
                {
                        
                        
                        
                        teams && teams.map((teams)=>{
                        return(

                            
                            <div className="card col-md-12">
                           
                                
                                <div className="card-body">
                                    <p className="card-text">Team ID : <b>{teams.Id}</b></p>
                        
                                    <p className="card-text">TeamLead Name : <b>{teams.TeamLead}</b></p>
                                    
                                    
                                    <p className="card-text">Client Name : <b>{teams.Client}</b></p>
                                    
                                    <p className="card-text">Project : <b>{teams.Project}</b></p>
                                    
                                </div>
                            </div>
                            )
                        })
                }
             </>
            )      
        }


export default DisplayTeams;
