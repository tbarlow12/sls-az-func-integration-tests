import { spawn } from "child_process"

export interface Validation {
  command: string;
  expectedStdout: string[];
}

export function runCommands(directory: string, validations: Validation[]) {
  if (validations.length === 0) {
    return;
  }
  const validation = validations[0];
  const split = validation.command.split(" ");

  const commandName = getCommandName(split[0]);
  const subCommandName = split[1];

  const args = split.slice(1, split.length);

  const spawned = createSpawn(
    directory,
    commandName,
    args,
    (stdout, stderr) => {
      // TODO Evaluate and store results for pass
      console.log(`'${directory}' - ${commandName} passed`)
      runCommands(directory, validations.slice(1, validations.length));
    },
    (stdout, stderr) => {
      // TODO Evaluate and store results for failure
      console.log(`'${directory}' - ${commandName} failed`)
    }
  )
}

function createSpawn(
  cwd: string,
  command: string,
  args: string[],
  onPass: (stdout: string, stderr: string) => void,
  onFail: (stdout: string, stderr: string) => void) {

  console.log(`Spawning command "${command} ${args.join(" ")}" in directory ${cwd}`)
  const childProcess = spawn(command, args, {
    env: process.env,
    cwd,
  });

  let stdout = "";
  let stderr = "";

  childProcess.stderr.on("data", (data) => {
    stderr += data.toString();
  });

  childProcess.stdout.on("data", (data) => {
    stdout += data.toString();
  });

  childProcess.on("error", (err) => {
    stderr += `Failed to start subprocess:\n${err.message} ${err.stack}`;
  });

  childProcess.on("close", (code) => {
    if (code === 0) {
      // console.log(`${testName} passed.\nstderr:\n${stderr}stdout:\n${stdout}`);
      console.log(`Command finished ${command} ${args.join(" ")} in directory ${cwd}`);
      console.log(stdout);
      onPass(stdout, stderr);
    } else {
      // console.error(`${testName} failed.\nstderr:\n${stderr}stdout:\n${stdout}`);
      console.log(stdout, stderr);
      onFail(stdout, stderr);
    }
  });
  return childProcess
}

function getCommandName(command) {
  const executables = new Set(["sls", "npm"])
  if (executables.has(command) && process.platform === "win32") {
    return command + ".cmd";
  }
  return command;
}