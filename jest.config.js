// Or async function
module.exports = async () => {
    return {
      verbose: true,
      coveragePathIgnorePatterns: [
        "../node_modules/",
        "../.git/", 
        "../.vscode/", 
        ],
        setupFilesAfterEnv: ['./jest.setup.js'],
        displayName: {
          name: 'CLIENT',
          color: 'blue',
        },
        testEnvironment: "node",
    };
  };