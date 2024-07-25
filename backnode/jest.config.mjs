// export default {
//     transform: {},
//     testEnvironment: 'node'
// }
export default {
  transform: {},
  testEnvironment: 'node',
  moduleFileExtensions: ['js'],
  testMatch: ['/test/*.test.js'],
  // testMatch: [
  //   '<rootDir>/test/*.test.js'
  // ],
  globals: {
    jest: {
      useESM: true
    }
  }
};

// export default {
//   transform: {},
//   testEnvironment: 'node',
//   moduleFileExtensions: ['js'],
//   testMatch: [   '<rootDir>/test/*.test.js'],
//   globals: {
//     __TEST__: true
//   },
//   extensionsToTreatAsEsm: ['.js'],
// };

