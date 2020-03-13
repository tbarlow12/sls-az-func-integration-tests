const { spawn } = require("child_process")
const { readdirSync } = require("fs");

// const tests = getDirectories();

const commands = [
  ["npm link serverless-azure-functions", []],
  ["sls offline build", []],
  ["ls hello", []],
  ["sls offline cleanup", []],
  // "sls deploy",
  // "sls invoke -f hello -d '{\"name\":\"Azure\"}'",
  // "sls remove"
]

const tests = [ "node10-linux" ];

for (const test of tests) {
  runCommands(test, commands);
}

function runCommands(testName, commands) {
  if (commands.length === 0) {
    return;
  }
  const command = commands[0];
  const split = command.split(" ");
  // sls
  const commandName = getCommandName(split[0]);
  // deploy
  const subCommandName = split[1];
  
  // ["deploy"]
  const args = split.slice(1, split.length);

  const spawned = createSpawn(
    testName,
    commandName,
    args,
    (stdout, stderr) => {
      // TODO Evaluate and store results for pass
      console.log(`'${testName}' - ${commandName} passed`)
      runCommands(testName, commands.slice(1, commands.length));
    },
    (stdout, stderr) => {
      // TODO Evaluate and store results for failure
      console.log(`'${testName}' - ${commandName} failed`)
    }
  )
}

function slsTest(testName, args, onSuccess) {
  console.log(`Running ${args.join(" ")} test for ${testName}`);
  const command = createSpawn(
    testName,
    sls,
    args,
    (stdout, stderr) => {
      // TODO evaluate output for command
      onSuccess();
    },
    (stdout, stderr) => {
      // TODO record error for deploy failure
    }
  )
}

function createSpawn(cwd, command, args, onPass, onFail) {
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

function getDirectories(source = ".") {
  return readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
}
