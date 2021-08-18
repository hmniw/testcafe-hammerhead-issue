Firstly, you'll need to duplicate the .sample-env file, rename the copy to .env, and update the Browserstack values in there.

Next you'll want to run `npm install`

Then you'll need to run the Browserstack Local binary from within the root of the folder:

`./BrowserStackLocal --key {YOUR_BROWSERSTACK_KEY} --local-identifier TestCafe --daemon start --parallel-runs 1`

Finally, you can then run `npm run test:ci:browserstack:mobile` which should send things off to Browserstack.



