import allData from '../data/all-data.json' with { type: 'json' };

let {
	// eslint-disable-next-line no-unused-vars
	zippay: { payments, users },
} = allData;

export const resolvers = {
	Query: {
		// Placeholder
		labHello() {
			return 'Hello from the labs folder';
		},
		userEmails() {
			let emails = users.map((user) => user.email);
			return emails;
		},
		users() {
			return users;
		},

		/* 		
		payments() {
			return payments;
		},
 		*/
		/*
		users() {
			return users;
		},
		*/
	},
};
