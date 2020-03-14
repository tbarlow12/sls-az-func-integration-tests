import { runValidationChain, CommandValidation } from "../src/validationRunner"
import { getDirectories } from "../src/utils"
import { InterpolateParameters } from "../src/validate";
import { ResultSet, getEmptyResultSet } from "../src/results";
import { Configurations } from "../src/configurations";

const configurationsPath = "configurations";
const configurations = getDirectories(configurationsPath);

const validations: CommandValidation[] = [
  {
    command: "npm link serverless-azure-functions"
  },
  {
    command: "sls deploy",
  },
  {
    command: "sls invoke -f hello -d '{\"name\":\"Azure\"}'",
    stdout: {
      shouldContainInterpolated: [
        "${myFunctionName}"
      ]
    }
  },
  {
    command: "sls remove --force"
  }
]

interface DeployTestParams extends InterpolateParameters {
  myFunctionName: string;
}

interface ConfigurationDeployTestParams extends Configurations {
  [config: string]: DeployTestParams
}

const parameters: ConfigurationDeployTestParams = {
  "node10-linux": {},
  "node10-linux-external": {},
  "node10-windows": {},
  "node12-linux": {},
  "node12-linux-external": {},
  "node12-windows": {},
  "python36": {},
  "python37": {},
  "python38": {}
}

const results: ResultSet = getEmptyResultSet();

let testsCompleted = 0;

export function DeployTest(configurations: string[], onFinish) {
  configurations.forEach(configuration => {
    runValidationChain(`${configurationsPath}/${configuration}`, validations, {}, (testResults) => {
      results[configuration] = testResults;
      testsCompleted += 1;
      if (testsCompleted === configurations.length) {
        console.log(JSON.stringify(results, null, 2));
      }
    }, parameters[configuration]);
  });
}
