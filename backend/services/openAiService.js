import axios from "axios";


const openai_api_key= process.env.OPENAI_API_KEY;
const openai_url= process.env.OPENAI_API_URL;

export const getAiSuggestions = async (prompt) => {
    try {

        const response = await axios.post(
            openai_url,
            {
                model: "text-davinci-003",
                prompt: prompt,
                max_tokens: 100,
            },
            {
                headers: {
                    Authorization: `Bearer ${openai_api_key}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error("Error getting AI suggestions", error.response?.data || error.message);
        throw new Error("Failed to get AI suggestions");
    }
}