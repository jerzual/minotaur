import typescriptEslint from '@typescript-eslint/eslint-plugin';
import react from 'eslint-plugin-react';
import jest from 'eslint-plugin-jest';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';

export default [
	{
		files: ['*.ts', '*.tsx'],
		plugins: {
			'@typescript-eslint': typescriptEslint,
			react,
			jest,
		},
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				...globals.jest,
			},
			parser: tsParser,
			ecmaVersion: 5,
			sourceType: 'module',
			parserOptions: {
				project: 'tsconfig.json',

				ecmaFeatures: {
					modules: true,
					jsx: true,
				},
			},
		},
		settings: {
			react: {
				pragma: 'h',
			},
		},
	},
];

