# frame-node-metadata-example

This is a simple Node.js example that demonstrates how to set and retrieve custom `metadata` when generating a _Secure Anonymous Token_ (SAT).

This script is referenced in Frame's Secure Anonymous Token documentation, found here: https://docs.frame.nutanix.com/frame-apis/auth/auth-with-sat.html

Note: This example uses [Axios](https://github.com/axios/axios) for fetching endpoints.

## Prerequisites

- Frame account with API credentials
- Secure Anonymous Token Provider
- Node.js

## Getting started

1. Install axios with `npm i axios`
2. Edit index.js to supply your [Frame API credentials](https://docs.frame.nutanix.com/frame-apis/auth/auth-with-sat.html) and Secure Anonymous Token provider endpoint URL. Save your changes.
3. Run the script with `node index.js`. You should see a token and the specified metadata logged to the console.

## Questions?

If you have any questions, comments, or run into any problems, please reach out by creating a new case/ticket in the My Nutanix portal.
