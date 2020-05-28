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
          const msg = "Virhe tietojen käsittelyssä, tietoja ei ole tallennettu";
          handleServerResponse(false, msg, form);
        }
      
      })
      .catch(r => {
        console.log("testpost5: ", r);
        const msg = "Virhe tietojen käsittelyssä. Kokeile hetken kuluttua uudelleen!"; 
        handleServerResponse(false, msg, form);
      });
  };
  
  return (
   
    
    <div className="pt-20">
     
       <div className="bg-green-900 border-2 border-white
          w-1/2 content-center max-w-screen-md mx-auto w-3/4">
      
      <form className="m-6" onSubmit={handleOnSubmit}>
          <h1 className="text-2xl text-white">Ota yhteyttä:</h1>

          <br></br>

          <div>
            <label className="block text-white text-xl font-bold mb-2" htmlFor="email">Sähköposti:</label>
            <input className="shadow appearance-none w-full py-2 px-3
              text-gray-900 leading-tight focus:outline-none focus:shadow-outline
              border-teal-700 p-4 border-2"
              id="email" type="email" name="email" required />
          </div>
                
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
              // className="bg-blue-500 text-white p-2 flex justify-center  w-1/2" >
              className="w-full bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 border border-teal-700 rounde">
            
              Lähetä
            </button>
          </div>

          <br></br>

          <div className="text-white text-xl font-bold">
            {serverState.status && (
              <p className={!serverState.status.ok ? "errorMsg" : ""}>
                {serverState.status.msg}
              </p>
            )}
          </div>
      
       </form>
      </div>
    </div>
  );
};

export default Message;