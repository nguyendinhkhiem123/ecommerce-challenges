const path = require("path");
const { compilerOptions }  = require("./tsconfig.paths.json");
const { pathsToModuleNameMapper } = require('ts-jest')

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  jest: {
    configure: {
      preset: 'ts-jest',
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/',
      }),
    },
  },
  
};
