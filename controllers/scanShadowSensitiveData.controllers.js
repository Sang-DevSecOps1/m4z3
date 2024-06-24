const axios = require('axios');
const readline = require('readline');

// Predefined keywords
const predefinedKeywords = [
    'password',
    'secret',
    'api_key',
    'access_token',
    'private_key',
    'credential'
];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function fetchAPIData(apiUrl, apiKey) {
    return axios.get(apiUrl, {
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    })
    .then(response => response.data)
    .catch(error => {
        console.error(`Error fetching API data: ${error}`);
        return null;
    });
}

function scanForSensitiveData(data, keywords) {
    const foundKeywords = [];
    const search = (obj) => {
        for (const key in obj) {
            if (typeof obj[key] === 'object') {
                search(obj[key]);
            } else {
                for (const keyword of keywords) {
                    if (key.toLowerCase().includes(keyword.toLowerCase())) {
                        foundKeywords.push({ key, value: obj[key] });
                    }
                }
            }
        }
    };
    search(data);
    return foundKeywords;
}

rl.question('Enter your API URL: ', apiUrl => {
    rl.question('Enter your API key: ', apiKey => {
        rl.question('Enter additional keywords (comma-separated): ', userKeywords => {
            const keywords = predefinedKeywords.concat(
                userKeywords.split(',').map(keyword => keyword.trim())
            );

            fetchAPIData(apiUrl, apiKey)
                .then(data => {
                    if (!data) {
                        console.log('Failed to retrieve data from the API.');
                        rl.close();
                        return;
                    }

                    const sensitiveData = scanForSensitiveData(data, keywords);
                    
                    if (sensitiveData.length > 0) {
                        console.log('Shadow sensitive data found:');
                        sensitiveData.forEach(({ key, value }) => {
                            console.log(`- ${key}: ${value}`);
                        });
                    } else {
                        console.log('No shadow sensitive data found.');
                    }
                    
                    rl.close();
                });
        });
    });
});
