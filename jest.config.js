module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testRegex: '(test/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    testPathIgnorePatterns: [ 'node_modules', 'dist' ],
    collectCoverageFrom: [ 'src/**/*.ts' ],
    collectCoverage: true
};
