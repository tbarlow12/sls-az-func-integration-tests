import { ConfigurationResultSet } from "./results";
import { createSpawn } from "./spawn";
import { getCommandName } from "./utils";
import { OutputValidation, validateOutput } from "./validate";
import { InterpolateParameters } from "./parameters";

export interface CommandValidation {
  command: string;
  stdout?: OutputValidation;
  stderr?: OutputValidation;
}

export function runValidationChain(
    directory: string,
    validations: CommandValidation[],
    results: ConfigurationResultSet,
    onFinish: (results: ConfigurationResultSet) => void,
    parameters?: InterpolateParameters) {
  if (validations.length === 0) {
    onFinish(results);
    return;
  }
  const validation = validations[0];
  const command = validation.command;
  const split = command.split(" ");
  // Example: sls (or sls.cmd if on windows)
  const commandName = getCommandName(split[0]);
  // Example: deploy
  const subCommandName = split[1];
  // Example: ["invoke", "-f", "hello", "-d", "'{\"name\":\"Azure\"}'"]
  const args = split.slice(1, split.length);

  const dirName = directory.replace("configurations/", "");

  createSpawn(
    directory,
    commandName,
    args,
    (stdout, stderr) => {
      try {
        validateOutput(validation.stdout, stdout, parameters);
        validateOutput(validation.stderr, stderr, parameters);
        results[command] = {
          passed: true
        }
        // Recursive call for the rest of the chain
        runValidationChain(directory, validations.slice(1, validations.length), results, onFinish);
      } catch(err) {
        results[command] = {
          passed: false,
          message: err.toString()
        }
      }
      console.log(`${dirName} '${command}' finished`);
    },
    (stdout, stderr) => {
      results[command] = {
        passed: false,
        message: `Stdout:\n${stdout}\nStderr:\n${stderr}`
      }
    }
  )
}
