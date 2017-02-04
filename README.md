# for-pickup-app

The for-pickup web-app

## Scripts

### npm install

### npm start

### npm run stage

### npm run test-server

### npm deploy



## Git model

We use the following branch conventions to ensure the stability of the codebase.

### `develop`

This is a long-living branch off of master where active development work gets merged in via feature/, refactor/, or chore/ branches. Do not commit to this branch directly.

### `master`

This is a long-living branch that only contains production-ready code. Stable work should be merged into this branch from develop when that it is release-ready. Urgent work may be merged in via hotfix/ branches. To prepare a release: bump the version number using `npm version major/minor/patch`.

### `feature/`

Create a temporary `feature/your-feature-name` branch off of `develop` whenever you want to submit work through the normal release cycle. Your branch lives for as long as it takes for the feature to be complete enough to merge into `develop`, at which point you should rebase `develop` one final time, merge into `develop`, then delete your branch. You can then follow the normal release process for `master`.

### `hotfix/`

Create a temporary `hotfix/your-urgent-matter` branch when an urgent fix needs to be released without merging the code in `develop`. Merge this branch back into `master` when ready, follow the normal release process, then back-merge the hotfix into `develop`.

### `chore/`

General maintenance to architecture, dependencies, or files like the README.md should happen on a temporary `chore/your-tedious-task` branch off of `develop` or `master`. Use the appropriate process for merging a `feature/` or `hotfix/` if you branched off of `develop` or `master` respectively.

### `refactor/`
Refactoring or rewriting production code should happen on a temporary `refactor/your-refactoring-focus` branch off of develop. Use the appropriate process for merging a `feature` when you're ready, and follow the normal release process. Update the version as a patch.
