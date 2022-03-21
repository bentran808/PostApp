module.exports = {
  roots: ['<rootDir>/src'],
  verbose: true,
  preset: 'react-native',
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.ts?$': 'babel-jest',
    '^.+\\.tsx?$': 'babel-jest',
    '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy'
  },
  transformIgnorePatterns: ['node_modules/(?!@react-native|react-native)'],
  collectCoverage: true,
  coverageReporters: ['json', 'html']
};