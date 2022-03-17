import React from 'react'  
import { useHistory } from "react-router-dom";



function rowDetail() {
    let history = useHistory();

    function handleClick() {
      history.push("/addClients");
    }


      return (<>
               <h1>asd</h1>
             </>
            )      
        }


export default rowDetail;
