import fs from 'fs-extra';
import allData from '../data/all-data.json' with { type: 'json' };

function getRandomInt(min, max) {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

let {
	zippay: { users, payments },
} = allData;

for (let user of users) {
	let { city, province, country, postalCode } = user;
	user.location = {
		city,
		province,
		country,
		postalCode,
	};
	delete user.city;
	delete user.province;
	delete user.country;
	delete user.postalCode;
}

allData.zippay.users = users;

for (let payment of payments) {
	let choice = getRandomInt(1, 10);
	if (choice === 10) {
		payment.settled = false;
	} else {
		payment.settled = true;
	}
}

allData.zippay.payments = payments;

fs.writeJSON('./data/all-data-improved.json', allData, { spaces: 2, encoding: 'utf8' });
