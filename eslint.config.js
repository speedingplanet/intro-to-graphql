import globals from 'globals';
import js from '@eslint/js';

export default [
	js.configs.recommended,
	{
		name: '@speedingplanet/eslint-config',
		files: ['**/*.{cjs,mjs,js}?(x)'],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		rules: {
			'no-unused-private-class-members': 'warn',
			'no-unused-vars': 'warn',
		},
	},
];