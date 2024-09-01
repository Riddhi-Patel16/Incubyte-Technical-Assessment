import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // Use the standard ts-jest preset for TypeScript
  testEnvironment: 'node', // Use the Node.js environment for tests
  transform: {
    '^.+\\.ts$': 'ts-jest', // Transform TypeScript files using ts-jest
  },
  verbose: true, // Enable verbose mode
  moduleFileExtensions: ['ts', 'js'], // Ensure .ts is included for module resolution
};

export default config;
