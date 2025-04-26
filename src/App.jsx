import React, { useContext } from "react";
import "./App.css";
import va from "/assets/ai.png";

import { CiMicrophoneOn } from "react-icons/ci";
import { dataContext } from "./context/Usercontext.jsx";  // Capital 'U'

// teenavirtualassistant.netlify.app
function App() {
  let { recognition, speaking, setspeaking ,prompt} = useContext(dataContext);

  return (
    <div className="main">
      {/* <img src="/assets/ai.png" alt="AI Assistant" /> */}

      <img src={va} alt="" id="Doreme" />
      <span>I'm Sumago, your Ai virtual Assistant</span>

      {!speaking ? (
        <button
          onClick={() => {
            setspeaking(true);
            recognition.start();

            // 3 sec tak "Listening..." show rahega
            setTimeout(() => {
              setspeaking(false);
            }, 1000);
          }}
        >
          Click here <CiMicrophoneOn />
        </button>
      ) : (
        <div className="response">
        <img src="/assets/sprak.jpeg" alt="speaking" className="speaking-animation" />
        <p>{prompt ? prompt.split(" ").slice(0, 20).join(" ") + (prompt.split(" ").length > 20 ? "..." : "") : "Listening..."}</p>
    </div>
    


      )}
    </div>
  );
}

export default App;
