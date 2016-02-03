"use strict";

const createAPI = require("./createAPI");

const getWorkspaces = require("./getWorkspaces");
const getMembers = require("./getMembers");
const getProjects = require("./getProjects");
const addTask = require("./addTask");

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
