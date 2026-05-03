const axios = require('axios');


const getLanguageById = (lang)=>{

    const language = {
        "c++":54,
        "java":62,
        "javascript":63
    }


    return language[lang.toLowerCase()];
}


const submitBatch = async (submissions) => {
    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
        params: {
            base64_encoded: 'false'
        },
        headers: {
            'x-rapidapi-key': process.env.JUDGE0_KEY,
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            submissions
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error("Judge0 Batch Submission Error:", error.response?.data || error.message);
        throw error;
    }
}


const waiting = (timer) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timer);
    });
}

// ["db54881d-bcf5-4c7b-a2e3-d33fe7e25de7","ecc52a9b-ea80-4a00-ad50-4ab6cc3bb2a1","1b35ec3b-5776-48ef-b646-d5522bdeb2cc"]

const submitToken = async(resultToken)=>{

const options = {
  method: 'GET',
  url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
  params: {
    tokens: resultToken.join(","),
    base64_encoded: 'false',
    fields: '*'
  },
  headers: {
    'x-rapidapi-key': process.env.JUDGE0_KEY,
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
  }
};

async function fetchData() {
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error("Judge0 API Error:", error.response?.data || error.message);
        throw error; // Throw so caller can catch it
    }
}

while (true) {
    try {
        const result = await fetchData();
        if (!result || !result.submissions) {
            throw new Error("Invalid response from Judge0");
        }

        const IsResultObtained = result.submissions.every((r) => r.status_id > 2);

        if (IsResultObtained)
            return result.submissions;

        await waiting(1000);
    } catch (err) {
        console.error("Polling Error:", err.message);
        // If it's a transient error, wait and retry. If persistent, this will eventually timeout the request.
        await waiting(2000);
    }
}



}


module.exports = {getLanguageById,submitBatch,submitToken};








// 


