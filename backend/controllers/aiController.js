import { getAiSuggestions } from "../services/openAiService.js";

export const getTaskSuggestions = async (req, res) => {
    try {
        const {prompt} = req.body;
        const suggestions = await getAiSuggestions(prompt);
        res.status(200).json({suggestions})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}