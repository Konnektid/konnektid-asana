"use strict";

const getProjects = api => workspace => api("GET", "workspaces/" + workspace + "/projects");

module.exports = getProjects;
