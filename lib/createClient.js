"use strict";

const createAPI = require("./createAPI");

const getWorkspaces = require("./calls/getWorkspaces");
const getMembers = require("./calls/getMembers");
const getProjects = require("./calls/getProjects");
const addTask = require("./calls/addTask");

const createClient = authToken => {

    const api = createAPI(authToken);

    return {
        getWorkspaces: getWorkspaces(api),
        getMembers: getMembers(api),
        getProjects: getProjects(api),
        addTask: addTask(api)
    };
};

module.exports = createClient;
