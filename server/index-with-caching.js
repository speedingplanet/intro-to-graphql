import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginCacheControl } from '@apollo/server/plugin/cacheControl';
import responseCachePlugin from '@apollo/server-plugin-response-cache';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from './resolvers.js';
import { typeDefs } from './typeDefs.js';

const server = new ApolloServer({
	typeDefs,
	resolvers,
	plugins: [
		ApolloServerPluginCacheControl({
			// Cache everything for 1 second by default.
			defaultMaxAge: 1,
			// Don't send the `cache-control` response header.
			calculateHttpHeaders: false,
		}),
		// Includes a response cache, rather than just relying on HTTP headers
		responseCachePlugin(),
	],
});

/*
 * Passing an ApolloServer instance to the `startStandaloneServer` function:
 *  1. creates an Express app
 *  2. installs your ApolloServer instance as middleware
 *  3. prepares your app to handle incoming requests
 */
const { url } = await startStandaloneServer(server, {
	listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
