import React from 'react'  
import { useHistory } from "react-router-dom";



function DisplayClients() {
    let history = useHistory();

    function handleClick() {
      history.push("/addClients");
    }
    const clients = [

        {Id:201,Name:'Client 1',Country:'America'},
      
        {Id:202,Name:'Client 2',Country:'China'},
      
        {Id:203,Name:'Client 3',Country:'Russia'}
      
      ];


      return (<>
                <button type="button" class="btn btn-outline-primary" onClick={handleClick}>Add Clients</button>
            
                {
                        
                        
                        
                        clients && clients.map((clients)=>{
                        return(

                            
                            <div className="card col-md-12">
                           
                                
                                <div className="card-body">
                                    <p className="card-text">Client ID : <b>{clients.Id}</b></p>
                        
                                    <p className="card-text">Client Name : <b>{clients.Name}</b></p>
                                    
                                    
                                    <p className="card-text">Client Country : <b>{clients.Country}</b></p>
                                    
                                    
                                    
                                </div>
                            </div>
                            )
                        })
                }
             </>
            )      
        }


export default DisplayClients;
