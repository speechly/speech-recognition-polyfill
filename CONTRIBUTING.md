# Contribution guide

## Bugs and improvements

Please submit an issue if you have found a bug or would like to propose an improvement. When submitting a bug, please provide the environment and steps to reproduce it. If you are proposing an improvement, please provide some reasoning behind it, ideally with a few use-cases.

Please do make use of the issue templates. If you think that a template is lacking for your case, feel free to suggeest a new one.

## Pull requests

We are happy to accept your PRs! When submitting, however, please make sure that you do the following:

- Ensure that your code is properly linted and tested. Don't forget to add tests and update existing ones, as necessary.
- Make sure to update the API report and documentation. This will be automatically generated via a pre-commit hook.

## Initial setup

Installing dependencies and setting up pre-commit hook:

```
npm i
```

Setting your Speechly app ID for use in the test harness:

```
APP_ID=<your_speechly_app_id> npm run set-app-id
```

## Development

We recommend you use the test app in `test-harness` to develop `speech-recognition-polyfill`. This is a simple React app with a hold-to-talk button and uses `react-speech-recognition` to display the transcript. This will hot reload whenever it or the contents of `src` change.

After the initial setup above, this can be run with:

```
npm run dev
```

And then opened at `http://localhost:3000/`.

## Linting

The linter can be run with:

```
npm run lint
```

## Testing

For a one-off test run:

```
npm test
```

To run the tests with watch, run:

```
npm run test:watch
```

## Generating API report and documentation

This is done automatically before you make a commit - please include these changes in your commits to keep them up-to-date. You can update these manually with:

```
npm run api-extractor
npm run docs
```
