const createAsanaClient = require("./index");

const TOKEN = process.env.TOKEN;
if (!TOKEN) {
    console.log("No persontal access token found! Run as:");
    console.log("    TOKEN=xxxxxxxxxx node example.js");
    process.exit(1);
}

const asana = createAsanaClient(TOKEN);

const formatTitle = x => `\x1b[36m========== ${x} ==========\x1b[0m`;
const formatResultList = xs => xs.map(x => `${x.name} \x1b[33m(${x.id})\x1b[0m`).join("\n") + "\n";

let firstWorkspaceId, firstWorkspaceName;

// fetch all workspaces for user
asana.getWorkspaces()
.then(workspaces => {

    console.log(formatTitle("Workspaces"));
    console.log(formatResultList(workspaces));
    firstWorkspaceId = workspaces[0].id;
    firstWorkspaceName = workspaces[0].name;
 })

// fetch members of first workspace
.then(() => asana.getMembers(firstWorkspaceId))
.then(members => {

    console.log(formatTitle(`Members (${firstWorkspaceName})`));
    console.log(formatResultList(members));
})

// fetch projects of first workspace
.then(() => asana.getProjects(firstWorkspaceId))
.then(projects => {

    console.log(formatTitle(`Projects (${firstWorkspaceName})`));
    console.log(formatResultList(projects));
})

// create a new task for the first project
.then(() => asana.addTask({
    workspace: firstWorkspaceId,
    // projects: ["00000000000000"],
    // assignee: "00000000000000",
    name: "Do something",
    notes: "Foo\nBar\nBaz",
}))
.then(task => {
    console.log(formatTitle("New task"));
    console.log(task)
})



// or display the error
.catch(err => console.log(err.stack));
