import allData from '../../data/all-data.json' with { type: 'json' };

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

		payments() {
			return payments;
		},
	},

	Payment: {
		// Overrides an existing default resolver
		visibility(parent) {
			if (parent.visibility && typeof parent.visibility === 'string') {
				return parent.visibility.toUpperCase();
			} else {
				return null;
			}
		},

		// ADDS a resolver for a field that doesn't exist in the underlying data
		localeAmount(parent) {
			let formatter = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

			return `${formatter.format(parent.amount)}`;
		},

		senderDetails(parent) {
			let senderId = parent.sender;
			return users.find((user) => user.userId === senderId);
		},
	},
};
