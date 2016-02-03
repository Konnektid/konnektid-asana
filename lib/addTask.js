"use strict";

const getProjects = api => opts => api("POST", "tasks", opts);

module.exports = getProjects;
