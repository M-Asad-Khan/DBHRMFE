import React,{useState} from 'react'  
import { useHistory } from "react-router-dom";
import Addclients from './Addclients/AddClients';
function Clients() {
    const [clients, setClients] = useState([
        {Id:201,Name:'Client 1',Country:'America'},
      
        {Id:202,Name:'Client 2',Country:'China'},
      
        {Id:203,Name:'Client 3',Country:'Russia'}
      
      ]);
      const [state, setState] = useState({
      });
      const [isAddClient, setIsAddClient] = useState(false);
      let history = useHistory();
      
      function handleAddClient(){
        setState({
            cid: "",
            name: "",
            email: "",
            mob: "",
            country: "",
            project: "",
            tech: ""
          })    
          setIsAddClient(true);
        }
        console.log(state)
      return (<>
     {isAddClient ?
            <Addclients
                setState={setState}
                state={state}
                isAddClient={isAddClient}
                setIsAddClient={setIsAddClient}
                setClients={setClients} />
            :
            <>
                <button type="button" className="btn btn-outline-primary" onClick={handleAddClient}>Add Clients</button>
                <br /><br /> 
                <table className="table table-bordered table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Client ID</th>
                                <th scope="col">Client Name</th>
                                <th scope="col">Client Country</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                       {  clients && clients.map((clients)=>{
                return (
                            <tr className="clickable text-center"  onClick={()=>{handleRowClick(clients)}}>
                                <th scope="row">{clients.Id}</th>
                                <td>{clients.Name}</td>
                                <td>{clients.Country}</td>
                                
                            </tr>
                            )
            })
        }
                        </tbody>
                    </table>
    </>  
    }
      
             </>
            )      
        }
export default Clients;