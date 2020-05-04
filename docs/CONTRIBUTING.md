# Contributing

Thank you for taking the time to contribute to this project! :tada:

## Commits

We loosely follow the Google commit guidelines found in several projects like [angular](https://github.com/angular/angular).

Please use this template for commit messages:

`action(feature): message`

Where action is one of the following:

- **feat**: adding a new feature
- **fix**: fixing a bug
- **build**: modifying local or ci building
- **style**: changing code style via new linting rules.
- **chore**: updating packages, refactoring existing code. This serves as an escape hatch when your changes do not fit into the other actions.

The feature should point to some aspect of the codebase. The message should be a concise, descriptive and use imperative present tense.

### Sample commit messages

`feat(drives): add support for drives`

`fix(lists): convert title case to camel in content type`

`build(cypress): upload e2e videos to review system`

## Pull Requests

All code contributions are added via Pull Request. If you are working on an issue, please create a branch in your fork with a sensible name. You can create a PR immediately and mark it as [Draft](https://github.blog/2019-02-14-introducing-draft-pull-requests/). Once your changes are complete, you should mark your PR as ready for review.

We operate with a `master <- feature` branch pattern.

## Testing

This project has 2 testing layers: unit and e2e. We use [jest](https://jestjs.io/) for unit testing and [cypress](https://www.cypress.io/) for e2e testing. If you want to help us fix bugs or add new features, please make sure you include unit (and if necessary, e2e) testing with your code contributions.

## Useful Docs

- [Microsoft Graph](https://docs.microsoft.com/en-us/graph/)
- [msgraph-sdk-javascript](https://github.com/microsoftgraph/msgraph-sdk-javascript/tree/dev/docs)
- [Gatsby](https://www.gatsbyjs.org/docs/)
