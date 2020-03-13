import { runValidationChain, CommandValidation } from "./src/validationRunner"
import { getDirectories } from "./src/utils"

const tests = getDirectories("configurations");

// const tests = [ "node10-linux" ]

const validations: CommandValidation[] = [
  {
    command: "npm link serverless-azure-functions"
  },
  {
    command: "sls offline build",
    stdout: {
      shouldContain: [
        "Building offline service",
        "Finished building offline service"
      ]
    }
  },
  {
    command: "sls offline cleanup",
    stdout: {
      shouldContain: [
        "Cleaning up offline files",
        "Finished cleaning up offline files"
      ]
    }
  }
]

const results = {}

let testsCompleted = 0;

tests.forEach(test => {
  runValidationChain(`configurations/${test}`, validations, {}, (testResults) => {
    results[test] = testResults;
    testsCompleted += 1;
    if (testsCompleted === tests.length) {
      console.log(JSON.stringify(results, null, 2));
    }
  });
});
