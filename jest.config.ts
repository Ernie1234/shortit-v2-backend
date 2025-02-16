/* This code snippet is configuring Jest for a TypeScript project. Here's a breakdown of what each key
in the object is doing: */
export default {
  globalSetup: './src/test/jest-setup/jest-setup.ts',
  globalTeardown: './src/test/jest-setup/jest-teardown.ts',
  coveragePathIgnorePatterns: ['.config.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  // Set a longer timeout for tests running in CI environments to accommodate potentially slower performance.
  // Use a shorter timeout for local development to catch issues more quickly.
  testTimeout: process.env.CI ? 120_000 : 12_000,
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  transformIgnorePatterns: ['/node_modules/'],
  testPathIgnorePatterns: ['/e2e/', '/node_modules/', '/dist/'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  }
};
