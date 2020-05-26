//Custom validation with a Controlled Component

import React, { useState } from "react";
import axios from "axios";

function Message() {
  const [serverState, setServerState] = useState({
    submitting: false,
    status: null
  });

  const handleServerResponse = (ok, msg, form) => {    
    setServerState({
      submitting: false,
      status: { ok, msg }
      
    });
    if (ok) {     
      form.reset();
    }  
    else {
      console.log("Virhe: ");
      //ei toimi: return <Redirect to='/error'  />
     
    }
  };


  const handleOnSubmit = e => {
    e.preventDefault();
    const form = e.target;
    setServerState({ submitting: true });

    
    axios({
      method: "post",
      url: "http://localhost/point-upd-message.php",
      data: new FormData(form)
    })
      .then(r => {
      
        if(r.data.success === 1){        
          handleServerResponse(true, "Kiitos viestistäsi!", form);         
        }
        else {
          // <Error />
          console.log("Virhe: ", r);
        }
      
      })
      .catch(r => {
        console.log("testpost6: ", r);
        
          const errormsg = "Virhe tietojen käsittelyssä. Tietoja ei ole tallennettu."
          handleServerResponse(false, errormsg, form);        
        
      });
   };
  
  return (
    <div className="max-w-screen-md mx-auto w-3/4">
      <h1 className="text-xl text-white">Ota yhteyttä:</h1>
          <br></br>
      <form onSubmit={handleOnSubmit}>

      <div>
        <label className="block text-white text-xl font-bold mb-2" htmlFor="email">Sähköposti:</label>
        <input className="shadow appearance-none w-full py-2 px-3
          text-gray-900 leading-tight focus:outline-none focus:shadow-outline
          border-teal-700 p-4 border-2"
          id="email" type="email" name="email" required />
        </div>

        {/* <br></br> */}
        
        <div>
          <label className="block text-white text-xl font-bold mb-2" htmlFor="message">Viesti:</label>
          <textarea        
           className="h-64 shadow appearance-none w-full py-2 px-3
           text-gray-900 leading-tight focus:outline-none focus:shadow-outline
           border-teal-700 p-4 border-2 "
           id="message" name="message">
          </textarea>
        </div>

        <br></br>

        <div>         

          <button type="submit" disabled={serverState.submitting}
             className="w-full bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 border border-teal-700 rounde">
          
            Lähetä
          </button>
        </div>

        <br></br>

        <div className="w-full bg-green-900 text-white text-center font-bold  border rounde">
        
          {serverState.status && (
            <p className={!serverState.status.ok ? "errorMsg" : ""}>
                   
                {serverState.status.msg}             
             
                {/* return <Redirect to='/error'  /> */}
            </p>           
          )}
        </div>
      </form>
    </div>
  );
};

export default Message;