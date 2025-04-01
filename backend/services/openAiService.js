// import axios from "axios";


const openai_api_key= process.env.OPENAI_API_KEY;
const openai_url= process.env.OPENAI_API_URL;

// export const getAiSuggestions = async (prompt) => {
//     try {

//         const response = await axios.post(
//             openai_url,
//             {
//                 model: "text-davinci-003",
//                 prompt: prompt,
//                 max_tokens: 100,
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${openai_api_key}`,
//                     "Content-Type": "application/json",
//                 },
//             }
//         );
//         return response.data.choices[0].text.trim();
//     } catch (error) {
//         console.error("Error getting AI suggestions", error.response?.data || error.message);
//         throw new Error("Failed to get AI suggestions");
//     }
// }



// import { GoogleGenAI } from "@google/genai";
import { GoogleGenerativeAI }  from "@google/generative-ai";

const genAI = new GoogleGenerativeAI( process.env.OUR_GOOGLE_GEMINI_API_KEY );

export const autoCategorize = async (title, description) => {
    try {
        const model= genAI.getGenerativeModel({model : "gemini-1.5-flash"})
        const prompt= `Categorize: "${title}" (${description || ''}). Respond with Only: work, personal, health, other`
        const result= await model.generateContent(prompt)

        const response= await result.response;
        return response.text().trim().toLowerCase();
    } catch (error) {
        console.log('error in authCategorize: ', error)
        return "other";
    }
 
};

export const generateDescription = async (title) => {
    try {
        const model= genAI.getGenerativeModel({model : "gemini-1.5-flash"})
        const prompt= `Generate a concise 1-sentence description of the task: ${title}`

        const result= await model.generateContent(prompt)
        const response= await result.response;
        return response.text().trim();
    } catch (error) {
        console.error('generate description error: ', error)
        return "";
    }
  
};

export const generateAiSuggestion = async (tasks) => {

    try {
        const model= genAI.getGenerativeModel({model : "gemini-1.5-flash"})
        const prompt= `Analyze these tasks and provide productivity suggestions: ${JSON.stringify(tasks.map(t => ({
            title: t.title,
            deadline: t.deadline,
            priority: t.priority,
        })) )}
        the current Date is ${new Date().toISOString()}
            Provide markdown formatted output with:
            1. Priority-based ordering
            2. Deadline risk assessment
            3. Recommended focus periods
        `
        const result= await model.generateContent(prompt)
        const response= await result.response;
        return response.text();
    } catch (error) {
        console.log("error in generate ai suggestion: ", error)
        return 'Ai suggestion is currently unavailable'
    }
};


export const generateAiSuggestionForParticularTask= async ({title, description, deadline, priority}) => {
    try {
        // console.log('this is generateAiSuggestin for particular task is', title, description)
        const model= genAI.getGenerativeModel({model: 'gemini-1.5-flash'})
        const prompt=`Analyze the given task details and provide productiviry suggestions in short: ${JSON.stringify({
            title: title,
            deadline: deadline,
            priority: priority,
            description: description
        })}
        the current Date ${new Date().toISOString()}. analyze based on the current date`
        
        const result= await model.generateContent(prompt)
        const response= await result.response;
        // console.log('this is generateAiSuggestionForParticularTask response', response.text())
        return response.text()
    } catch (error) {
        console.log('error in generate ai suggestion for pa rticular task: ', error)
        return 'generateAiSuggestionForParticularTask is currently unavailable'
    }
}
