export const mobile = [
	'browserstack:iPhone SE 2020',
	'browserstack:Samsung Galaxy S21 Plus',
	'browserstack:Samsung Galaxy S20',
	'browserstack:iPhone XS Max',
	'browserstack:iPhone 11',
];

export const highpriority = [
	'browserstack:chrome:Windows 10',
	'browserstack:iPhone 8',
	'browserstack:Samsung Galaxy S7',
	'browserstack:iPad Air 2019',
	'browserstack:iPad Mini 2019',
];

export const mediumpriority = [
	'browserstack:edge:Windows 10',
	'browserstack:safari:OS X Big Sur',
	'browserstack:firefox:Windows 10',
	'browserstack:ie@11.0:Windows 10',
	'browserstack:iPhone X',
	'browserstack:iPhone 8 Plus',
	'browserstack:Samsung Galaxy S8',
	'browserstack:iPhone 6',
];

export const lowpriority = [
	'browserstack:iPad Pro 11 2018',
	'browserstack:iPad Pro 12.9 2020',
	'browserstack:Samsung Galaxy Tab 4 10.1',
];

export const all = [...highpriority, ...mediumpriority, ...lowpriority];

export const highandmediumpriority = [...highpriority, ...mediumpriority];
