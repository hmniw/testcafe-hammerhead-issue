/* eslint-disable no-console */
import dotenv from 'dotenv';
import { join } from 'path';
import * as Browsers from './Browsers';
import Browserstack from 'browserstack-local';
import glob from 'glob-promise';
import createTestCafe from 'testcafe';

dotenv.config();

const supportedBrowsers: { [key: string]: string[] } = Browsers;

const [, , testTypeArg, testFilesArg] = process.argv;

const getTestFiles = (testFiles: string) => {
	if (testFiles === undefined) {
		console.log(join(__dirname, '../*.testcafe.*'));
		return join(__dirname, '../*.testcafe.*');
	}
	return join(__dirname, testFiles);
};

const createTestCafeInstance = async (browser: string): Promise<number> => {
	const files = await glob(getTestFiles(testFilesArg));
	const tc = await createTestCafe();
	const runner = await tc.createRunner();
	const failures = await runner
		.src(files)
		.browsers(browser)
		.run({ skipJsErrors: !!process.env.SKIP_JS_ERRORS });

	console.log(`Tests failed for ${JSON.stringify(browser)}: ${failures}`);

	await tc.close();
	return failures;
};

const getBrowserDevices = (testType: string): string[] => {
	if (testType.startsWith('browserstack:')) {
		return [testType];
	}

	const browserDevices = supportedBrowsers[testType];
	if (!browserDevices) {
		throw new Error(`testType: ${testType} does not match Browsers.ts`);
	}

	return browserDevices;
};

const getBrowserStack = (): Promise<any> =>
	new Promise((resolve) => {
		const bs = new Browserstack.Local();
		bs.start(
			{
				'key': process.env.BROWSERSTACK_ACCESS_KEY,
				'local-identifier': process.env.BROWSERSTACK_LOCAL_IDENTIFIER,
				'parallel-runs': process.env.BROWSERSTACK_PARALLEL_RUNS,
				'force': true,
			},
			() => {
				resolve(bs);
				console.log(`Started BrowserStackLocal, isRunning: ${bs.isRunning()}`);
			}
		);
	});

const stopBrowserStackLocal = (bs: any): Promise<void> =>
	new Promise((resolve) =>
		bs.stop(() => {
			resolve(bs);
			console.log('Stopped BrowserStackLocal');
		})
	);

(async () => {
	// const browserstack = await getBrowserStack();
	// process.on('SIGINT', () => {
	// 	console.log('Killing BrowserStackLocal');
	// 	process.kill(browserstack.pid); // browserstack.stop() doesn't run quick enough here
	// });

	const browserDevices = getBrowserDevices(testTypeArg.toLowerCase());
	console.log(
		`Running tests for ${testTypeArg} with browsers ${JSON.stringify(
			browserDevices
		)}`
	);

	const actions = browserDevices.map(createTestCafeInstance);
	const results = await Promise.all(actions);

	let numberOfFailures = 0;
	results.forEach((result) => (numberOfFailures += result));

	// await stopBrowserStackLocal(browserstack);

	if (numberOfFailures > 0) {
		throw new Error('Some tests failed');
	}
	process.exit(numberOfFailures > 0 ? 1 : 0);
})();

