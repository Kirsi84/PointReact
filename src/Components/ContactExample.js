//Custom validation with a Controlled Component

import React, { useState } from "react";
import axios from "axios";
import Error from '../Views/Error'


function ContactExample() {
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

    const apu = "http://localhost/point-upd-message.php";
    console.log("testpost1: ", apu);
    axios({
      method: "post",
     // url: "https://formspree.io/YOUR_FORM_ID",
      url: "http://localhost/point-upd-message.php",
      data: new FormData(form)
    })
      .then(r => {
      
        if(r.data.success === 1){
          console.log("testpost3:", r.data.success);
          handleServerResponse(true, "Kiitos viestistäsi!", form);
          console.log("testpost4: ", r);
        }
        else {
          // <Error />
        }
      
      })
      .catch(r => {
        console.log("testpost5: ", r);
        handleServerResponse(false, r.response.data.error, form);
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

        <br></br>
        
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

        <div className="text-white text-xl font-bold mb-2">
          {serverState.status && (
            <p className={!serverState.status.ok ? "errorMsg" : ""}>
              {serverState.status.msg}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactExample;