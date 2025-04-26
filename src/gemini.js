import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyD5h9w2rp2fHsx_VSNOiX-ToNS2zypm8uQ"; // 🔴 यहाँ अपनी नई API Key डालें

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function run(prompt) {
    try {
        const chatSession = model.startChat();
        const result = await chatSession.sendMessage(prompt);
        return result.response.text();
    } catch (error) {
        console.error("❌ Gemini API Error:", error);
        return "sorry,i can't help you";
    }
}
