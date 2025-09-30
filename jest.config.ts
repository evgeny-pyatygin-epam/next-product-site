import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';

const { compilerOptions } = require('./tsconfig.json');

const config: Config = {
  preset: 'ts-jest', // Добавьте preset
  testEnvironment: 'jsdom', // Для React компонентов
  setupFiles: ['<rootDir>/tests/setupJest.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),

  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react', // Или 'react-jsx' для React 17+
        },
      },
    ],
  },

  verbose: true,
  passWithNoTests: true,

  testPathIgnorePatterns: ['/node_modules/', '/e2e/', '\\.spec\\.(ts|tsx)$'],

  testMatch: ['**/__tests__/**/*.(test|spec).(ts|tsx)', '**/*.(test|spec).(ts|tsx)'],
};

export default config;
