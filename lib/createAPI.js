"use strict";

const sendRequest = require("./sendRequest");

const createAPI = authToken => {

    const headers = { Authorization: "Bearer " + authToken };
    const baseUrl = "https://app.asana.com/api/1.0/";

    return (method, endpoint, payload) => {

        const url = baseUrl + endpoint;
        const data = payload && JSON.stringify({ data: payload });

        return sendRequest({ method, url, headers, data })
        .then(res => JSON.parse(res.data).data);
    }
};

module.exports = createAPI;
