import React,{useState} from 'react'  
import { useHistory } from "react-router-dom";
import RowDetail from './rowDetail'



const DisplayClients=()=> {
    const [selectedRow,setSelectedRow]=useState(null);


    let history = useHistory();

    function handleClick() {
      history.push("/addClients");
    }
    const clients = [

        {Id:201,Name:'Client 1',Country:'America'},
      
        {Id:202,Name:'Client 2',Country:'China'},
      
        {Id:203,Name:'Client 3',Country:'Russia'}
      
      ];

      const handleRowClick=(rowData)=>{
          setSelectedRow(rowData);
// history.push("/rowDetail");
      }

      return (<>
      {selectedRow &&selectedRow!=null ? <RowDetail rowData={selectedRow}/>
    :
    <>
                <button type="button" className="btn btn-outline-primary" onClick={handleClick}>Add Clients</button>
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


export default DisplayClients;
