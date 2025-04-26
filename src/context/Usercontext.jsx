import React, { createContext, useState } from "react";
import run from "../gemini";

export const dataContext = createContext();

function Usercontext({ children }) {

let[speaking,setspeaking]=useState(false)
let[prompt,setPrompt]=useState("listening...")

function takecommand(command) {
    console.log("Command received:", command);  // ✅ Debugging line
    if (command.includes("open") && command.includes("youtube")) {
        window.open("https://www.youtube.com/", "_blank");
        speak("opening youtube...");
        setPrompt("opening youtube...");
        setTimeout(() => {
            setspeaking(false);
        }, 1000);
    } 
    else if (command.includes("open") && command.includes("google")) {
        window.open("https://www.google.com/", "_blank");
        speak("opening google...");
        setPrompt("opening google...");
        setTimeout(() => {
            setspeaking(false);
        }, 1000);
    } 
    else if (command.includes("open") && command.includes("instagram")) {
        window.open("https://www.instagram.com/", "_blank");
        speak("opening instagram...");
        setPrompt("opening instagram...");
        setTimeout(() => {
            setspeaking(false);
        }, 1000);
    } 
    else if (command.includes("open") && command.includes("whatsapp")) {
        window.open("https://www.whatsapp.com/", "_blank");
        speak("opening whatsapp...");
        setPrompt("opening whatsapp...");
        setTimeout(() => {
            setspeaking(false);
        }, 1000);
    } 
    else if (command.includes("what is the time") || command.includes("what time is it") || command.includes("tell me the time")) {
        const currentTime = new Date().toLocaleTimeString('en-GB', { hour12: true });  // 24-hour format
        speak(`The current time is ${currentTime}`);
        setPrompt(`The current time is ${currentTime}`);
        setTimeout(() => {
            setspeaking(false);
        }, 1000);
    }
    else if (command.includes("what is the date") || command.includes("tell me the date") || command.includes("what's the date")) {
        const currentDate = new Date().toLocaleDateString();
        speak(`Today's date is ${currentDate}`);
        setPrompt(`Today's date is ${currentDate}`);
        setTimeout(() => {
            setspeaking(false);
        }, 1000);
    }
    else {
        aiResponse(command);
    }
}

    // function speak(text) {
    //     let text_speak = new SpeechSynthesisUtterance(text);
    //     text_speak.volume = 1;
    //     text_speak.rate = 1;
    //     text_speak.pitch = 1;
    //     text_speak.lang = "hi-IN,en-US";
    //     window.speechSynthesis.cancel(); // पहले चल रही स्पीच को रोकें
    //     window.speechSynthesis.speak(text_speak);
    // }
    function speak(text) {
        let text_speak = new SpeechSynthesisUtterance(text);
        text_speak.volume = 1;
        text_speak.rate = 1;
        text_speak.pitch = 1;
        text_speak.lang = "hi-IN,en-US";
    
        setspeaking(true);  // ✅ Jab tak speech chal rahi hai, speaking true hoga
        setPrompt(text);    // ✅ Text dikhana shuru karenge
    
        text_speak.onend = () => {
            setspeaking(false);  // ✅ Speech complete hone ke baad false hoga
        };
    
        window.speechSynthesis.cancel(); // पहले चल रही स्पीच को रोकें
        window.speechSynthesis.speak(text_speak);
    }
    
    let recognition = null;
 

    async function aiResponse(prompt) {
        try {
            let text = await run(prompt);
    
            console.log("AI Response before replace:", text); // Debugging ke liye
    
            // 🔥 Sirf "What is your name?" ka exact jawab set karein
            if (/what is your name\?/i.test(prompt)) {
                text = "My name is Sumago.";
            }
    
            // 🔥 Google ka naam replace kare bina extra words replace kiye
            let newText = text.replace(/google/gi, "Teena Devray Daughter Of Deepak And Nirmala Devray");
    
            // 🔥 Response ko 20 words tak limit karein
            newText = newText.split(" ").slice(0, 20).join(" ") + (newText.split(" ").length > 20 ? "..." : "");
    
            setPrompt(newText);
            speak(newText);
        } catch (error) {
            console.error("❌ AI Error:", error);
            speak("Sorry, I couldn't process your request.");
        }
    }
    

    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
        let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-IN";

       


        recognition.onresult = (event) => {
            let transcript = event.results[0][0].transcript;
            setPrompt(transcript);
            takecommand(transcript.toLowerCase()); // ✅ Corrected typo
        };
        

        recognition.onerror = (event) => {
            console.error("Speech Recognition Error:", event.error);
        };
    } else {
        console.warn("Speech Recognition is not supported in this browser.");
    }

    let value = { speak, recognition,speaking,setspeaking,prompt,setPrompt };

    return (
        <dataContext.Provider value={value}>
            {children}
        </dataContext.Provider>
    );
}

export default Usercontext;
