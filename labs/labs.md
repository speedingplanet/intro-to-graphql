# Labs

## Object resolvers

Create a type definition for a `zippay user`.

Add a key to the `Query` type in `lab-schema.graphql` to return all users.

Add a corresponding resolver to `lab-resolvers.js` to serve an array of users.

Try your added code in the sandbox to make sure it works.

Then do the same (add to the type definitions, add a query, add a resolver) for payments.

## Custom resolvers

### Part 1

Implement a custom resolver on Payment for recipient details. You can probably use most of the code from `senderDetails`.

### Part 2

Implement a custom resolver on User to list all the payments associated with this User.

That is, a User should display as

```json
{
	"userId": "john",
	payments: [
		{
			"id": 1,
			"sender": "john",
			"amount": 100,
			...
		},
		{
			"id": 22,
			"recipient": "john",
			amount: 25,
			...
		}
	]
}
```

You'll need to update lab-schema.graphql with the new field on the User resolver. And then you'll need to implement the resolver in lab-resolvers.js

## Filtering

Let's filter on the payments collection, specifically on the `amount` property

Filter properties

greaterThan
greaterThanOrEqualTo
lessThan
lessThanOrEqualTo
equalTo

equalTo overrides everything else
greaterThan or lessThan standalone
Or in combination, e.g. greaterThan: 10, lessThan: 20

We need an input type to express the possible values for filtering.

We need a `filterPaymentsByAmount` query, that takes the input type as an argument.

We need to implement a resolver for `filterPaymentsByAmount`.
