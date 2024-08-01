const axios = require('axios');
const {API_BASE_URL,AUTH_TOKEN} = require('./constants')

//General API call function to be used by prototypes and other game logic
const gameAPI = {
    callAPI: async function (endpoint, method, data = null, params = null) {
        const options = {
            method: method,
            url: `${API_BASE_URL}${endpoint}`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: AUTH_TOKEN
            },
            data: data,
            params: params
        };

        try {
            const response = await axios.request(options);
            //If the response is not 200, return the code
            if (response.status !== 200) {
                console.error(`${endpoint} - API call failed with status ${response.status}:`, response.statusText);
                return response.status;
            }
            //If paginated, process the pages
            if (response.data && response.data.pages && response.data.page) {
                let allData = response.data.data;
                let currentPage = response.data.page;
                const totalPages = response.data.pages;

                while (currentPage < totalPages) {
                    currentPage++;
                    const paginatedParams = { ...params, page: currentPage };
                    const paginatedResponse = await axios.request({ ...options, params: paginatedParams });
                    if (paginatedResponse.status !== 200) {
                        console.error(`${endpoint} - API call failed on page ${currentPage} with status ${paginatedResponse.status}:`, paginatedResponse.statusText);
                        return paginatedResponse.status;
                    }

                    allData = allData.concat(paginatedResponse.data.data);
                }

                return { ...response.data, data: allData };
            }

            return response.data;
        }
        catch (error) {
            if (error.response) {
                console.error(`${endpoint} - API call failed with status ${error.response.status}:`, error.response.data.message || error.message);
                return error.response.status;
            } else if (error.request) {
                console.error(`${endpoint} - No response received:`, error.message);
            } else {
                console.error(`${endpoint} - API call setup failed:`, error.message);
            }
            //-1 for network errors
            return -1;
        }
    }
}

module.exports = gameAPI;