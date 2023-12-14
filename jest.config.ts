import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    roots: ['<rootDir>/src'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    testMatch: ['**/__tests__/**/*.spec.(ts|js)'],
    testEnvironment: 'node',
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
    setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
};

export default config;
