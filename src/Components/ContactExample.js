//Custom validation with a Controlled Component

import React, { useState } from "react";
import axios from "axios";

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
    console.log("testpost: ", apu);
    axios({
      method: "post",
     // url: "https://formspree.io/YOUR_FORM_ID",
      url: "http://localhost/point-upd-message.php",
      data: new FormData(form)
    })
      .then(r => {
        handleServerResponse(true, "Kiitos viestistäsi!", form);
      })
      .catch(r => {
        handleServerResponse(false, r.response.data.error, form);
      });
  };
  return (
    <div>
      <h1 class="text-xl">Ota yhteyttä:</h1>
          <br></br>
      <form onSubmit={handleOnSubmit}>

      <div class= "w-1/2">
        <label class="block text-gray-800 text-xl font-bold mb-2" htmlFor="email">Sähköposti:</label>
        <input class="shadow appearance-none w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline
          border-teal-700 p-4 border-2"
          id="email" type="email" name="email" required />
        </div>
        <br></br>
        <br></br>

        <div class= "w-1/2">
          <label class="block text-gray-800 text-xl font-bold mb-2" htmlFor="message">Viesti:</label>
          <textarea        
            class="w-full shadow-inner p-4 border-2
            border-teal-700 w-1/2  h-40" 
            id="message" name="message">
          </textarea>
        </div>

        <div>
          <br></br>

          <button type="submit" disabled={serverState.submitting}
            className="bg-blue-500 text-white p-2 flex justify-center 
            w-1/2" >
            Lähetä
          </button>

        </div>
        <br></br>
        {serverState.status && (
          <p className={!serverState.status.ok ? "errorMsg" : ""}>
            {serverState.status.msg}
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactExample;