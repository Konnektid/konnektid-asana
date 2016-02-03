"use strict";

const getWorkspaces = api => () => api("GET", "workspaces");

module.exports = getWorkspaces;
