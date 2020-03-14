import { runValidationChain, CommandValidation } from "../src/validationRunner"
import { getDirectories } from "../src/utils"

const configurationsPath = "../configurations";
const configurations = getDirectories(configurationsPath);

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

configurations.forEach(configuration => {
  runValidationChain(`${configurationsPath}/${configuration}`, validations, {}, (testResults) => {
    results[configuration] = testResults;
    testsCompleted += 1;
    if (testsCompleted === configurations.length) {
      console.log(JSON.stringify(results, null, 2));
    }
  });
});
