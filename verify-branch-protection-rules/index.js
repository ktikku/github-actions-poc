const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    // This should be a token with access to your repository scoped in as a secret.
    // The YML workflow will need to set myToken with the GitHub Secret Token
    // myToken: ${{ secrets.GITHUB_TOKEN }}
    // https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret
    const myToken = core.getInput('my-token');
    const octokit = github.getOctokit(myToken);
    const result = await octokit.graphql(`
    {
      repository(owner: "ktikku", name: "github-actions-poc") {
        branchProtectionRules(first: 100) {
          nodes {
            pattern
            requiredApprovingReviewCount
          }
        }
      }
    }    
  `);
    console.log(result.repository.branchProtectionRules);
    console.log(result.repository.branchProtectionRules.nodes);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();