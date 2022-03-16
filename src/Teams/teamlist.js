import React from 'react'
import { useHistory } from "react-router-dom";



function DisplayTeams() {
    let history = useHistory();

    function handleClick() {
        history.push("/addteams");
    }
    const teams = [

        { Id: 1, TeamLead: 'Ali', Client: 'Andy', Project: 12345 },

        { Id: 2, TeamLead: 'Amir', Client: 'Nancy', Project: 23456, },

        { Id: 3, TeamLead: 'Suleman', Client: 'Nathme', Project: 34567 }

    ];


    return (<>
        <button type="button" className="btn btn-outline-primary" onClick={handleClick}>Add Teams</button>
        <br/>

        <br /> 



           
                    <table className="table table-bordered table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Team ID</th>
                                <th scope="col">TeamLead Name</th>
                                <th scope="col">Client Name</th>
                                <th scope="col">Project</th>
                            </tr>
                        </thead>
                        <tbody>
                       { teams && teams.map((teams) => {
                return (

                            <tr>
                                <th scope="row">{teams.Id}</th>
                                <td>{teams.TeamLead}</td>
                                <td>{teams.Client}</td>
                                <td>{teams.Project}</td>
                            </tr>
                            )
            })
        }
                        </tbody>
                    </table>
                    {/* // <div className="card col-md-12">


                    //     <div className="card-body">
                    //         <p className="card-text">Team ID : <b>{teams.Id}</b></p>

                    //         <p className="card-text">TeamLead Name : <b>{teams.TeamLead}</b></p>


                    //         <p className="card-text">Client Name : <b>{teams.Client}</b></p>

                    //         <p className="card-text">Project : <b>{teams.Project}</b></p>

                    //     </div>
                    // </div> */}
        
    </>
    )
}


export default DisplayTeams;
