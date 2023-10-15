module.exports = {
	preset: 'ts-jest',
	setupFilesAfterEnv: ['./src/setupJest.ts'],
	testURL: 'http://localhost:8080',
	moduleFileExtensions: ['js', 'ts', 'tsx'],
	moduleDirectories: ['node_modules'],
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/src/__mocks__/fileMock.js',
		'\\.(css|scss)$': '<rootDir>/src/__mocks__/styleMock.js',
	},
	collectCoverageFrom: ['src/**/*.{ts,tsx}'],
};
