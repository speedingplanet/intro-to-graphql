import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { mergeTypeDefs } from '@graphql-tools/merge';

const mainTypeDefs = readFileSync(resolve('./schema.graphql'), { encoding: 'utf-8' });
const labTypeDefs = readFileSync(resolve('./labs/lab-schema.graphql'), {
	encoding: 'utf-8',
});

export const typeDefs = mergeTypeDefs([mainTypeDefs, labTypeDefs]);

// export const typeDefs = mainTypeDefs + labTypeDefs;
