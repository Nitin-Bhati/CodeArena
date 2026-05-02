const Groq = require("groq-sdk");

const solveDoubt = async (req, res) => {
    try {
        const { messages, title, description, testCases, startCode } = req.body;

        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

        const formattedMessages = messages.map(msg => ({
            role: msg.role === 'model' ? 'assistant' : msg.role,
            content: msg.parts?.[0]?.text || msg.content || ''
        }));

        const systemMessage = {
            role: "system",
            content: `You are an expert DSA tutor helping users solve coding problems.

## CURRENT PROBLEM:
Title: ${title}
Description: ${description}
Examples: ${JSON.stringify(testCases)}
Starter Code: ${JSON.stringify(startCode)}

Only help with this DSA problem. If asked about unrelated topics, redirect back to the problem.`
        };

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [systemMessage, ...formattedMessages],
            max_tokens: 1024,
        });

        res.status(200).json({
            message: completion.choices[0].message.content
        });

    } catch (err) {
        console.error("AI Controller Error:", err);
        res.status(500).json({
            message: "Internal server error: " + err.message
        });
    }
}

module.exports = solveDoubt;