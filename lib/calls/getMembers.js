"use strict";

const getMembers = api => workspace => api("GET", "workspaces/" + workspace + "/users");

module.exports = getMembers;
