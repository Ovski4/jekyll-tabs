/** @type {import('jest').Config} */
const config = {
    preset: 'ts-jest',
    verbose: true,
    testEnvironment: 'jsdom',
    collectCoverage: true,
};

module.exports = config;
