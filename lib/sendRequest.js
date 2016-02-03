"use strict";

//dependencies
const Url = require("url");
const http = require("http");
const https = require("https");

/**
 * Creates and sends a GET request
 *
 * @param {string}              params.url              URL to send the request to
 * @param {string=}             params.method           Method to use - defaults to GET
 * @param {object=}             params.headers          Optional headers to send with the request
 * @param {string=}             params.data             Optional data to send with the request
 * @param {boolean=}            params.response         Set to false to ignore the response data
 * @param {boolean=}            params.cert             Set to false to ignore invalid SSL/TLS certificates
 *
 * @returns {Promise.<object>}                          Result of the request as {statusCode, headers, data}
 */
module.exports = function getRequest(params, cb) {

    return new Promise((resolve, reject) => {

        if (!params || !params.url || typeof params.url !== "string")
            return reject(new Error("Request URL missing"));

        const url = Url.parse(params.url);
        const proto = url.protocol === "https:" ? https : http;

        const req = proto.request({
            method  : params.method || "GET",
            headers : params.headers,
            port    : url.port,
            host    : url.hostname,
            path    : url.pathname,
            rejectUnauthorized : params.cert !== false
        }, res => {

            res.setEncoding("utf8");

            let data;
            res.on("end", () => {

                const result = {
                    statusCode : res.statusCode,
                    headers    : res.headers,
                    data       : data
                };

                cb instanceof Function ? cb(null, result) : resolve(result);
            });

            if (params.response !== false) {
                data = "";
                res.on("data", chunk => data += chunk);
            }
            else {
                res.resume();
            }
        });

        req.on("error", err => {

            cb instanceof Function ? cb(err) : reject(err);
        });

        // send the data
        req.end(params.data);
    });
};
