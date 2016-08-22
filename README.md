# konnektid-asana

Simple module to add tasks to your Asana projects.

## API

This module exposes a single function `createAsanaClient` that you use to initialise the Asana client:

### Default export: createAsanaClient(authToken)

Initialises the Asana client. Takes one argument which is the authentication token for your Asana account.
This account will be used to perform all queries and mutations with.

You can create a personal access token by going to your Asana *profile settings*,
then click *manage developer apps* in the *Apps* tab and create a new auth token from there.

- *string* **required** `authToken`: Your personal access token.

Returns the client that you can use to query Asana with and create new tasks.
All methods you call on the Asana client call a remote API endpoint and will return
a **Promise** that will resolve with the result.

### asana.getWorkspaces()

**Promise**. Retrieves the list of workspaces your account has access to. Response has the following format:

```js
[
    { id: 562346538325354, name: "Personal Projects" },
    { id: 867534434236726, name: "Konnektid"}
]
```

### asana.getMembers(workspace)

**Promise**. Retrieves a list of members of a workspace.

- *number* **required** `workspace`: The workspace ID (as retrieved by `getWorkspaces()`) to retrieve the members for.

Response has the following format:

```js
[
    { id: 37456855425363, name: "Alice" },
    { id: 62345345248270, name: "Bob" }
]
```

### asana.getProjects(workspace)

**Promise**. Retrieves a list of projects inside a workspace.

- *number* **required** `workspace`: The workspace ID (as retrieved by `getWorkspaces()`) to retrieve the projects for.

Response has the following format:

```js
[
    { id: 26374535726124, name: "Backlog" },
    { id: 72346984590542, name: "Bugs" }
]
```

### asana.addTask(opts)

**Promise**. Creates a new task in your Asana account.

- *object* **required** `opts`: The options object containing the following keys:
    - *string* **required** `name`: The name of the task to create
    - *string* `notes`: Description to place in the task
    - *string* `workspace`: The ID of the workspace where the task should be added
    - *Array<string>* `projects`: Array of project IDs where the tasks belongs to
    - *string* `assignee`: The ID of the member that is assigned to the task

Returns an object representing the newly created task (including an `id` field).
However, this module does not support modifying existing tasks yet, so you can not really use this information.
