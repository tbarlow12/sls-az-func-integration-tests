import { ResultSet } from "../src/results";
import { runTest } from "../src/runTest";
import { CommandValidation } from "../src/validationRunner";

export async function DeployTest(configurations: string[]): Promise<ResultSet> {
  const validations: CommandValidation[] = [
    {
      command: "npm link serverless-azure-functions"
    },
    {
      command: "sls deploy",
      stdout: {
        shouldContain: [
          "Logging into Azure",
          "Deployed serverless functions:",
        ],
        shouldContainInterpolated: [
          "Creating resource group: sls-weur-dev-${configName}-rg",
          "Resource Group: sls-weur-dev-${configName}-rg",
          "Deploying zip file to function app: sls-weur-dev-${configName}",
          "-> hello: [GET] sls-weur-dev-${configName}.azurewebsites.net/api/hello"
        ]
      }
    },
    {
      command: "sls invoke -f hello -d '{\"name\":\"Azure\"}'",
    },
    {
      command: "sls remove --force"
    }
  ]
  return await runTest(validations, configurations);
}
