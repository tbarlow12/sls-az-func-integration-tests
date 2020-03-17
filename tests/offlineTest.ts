import { ResultSet, runTest, CommandValidation } from "clvr";

export async function OfflineTest(configurations: string[]): Promise<ResultSet> {
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
  return await runTest(validations, configurations); 
}