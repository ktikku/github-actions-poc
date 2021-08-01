const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `code-owners` input defined in action metadata file
  const codeOwners = core.getInput('code-owners');
  console.log(`Hello ${codeOwners}!`);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}