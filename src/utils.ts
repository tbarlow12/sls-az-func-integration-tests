import { readdirSync } from "fs";

export function getCommandName(command) {
  const executables = new Set(["sls", "npm"])
  if (executables.has(command) && process.platform === "win32") {
    return command + ".cmd";
  }
  return command;
}

export function getDirectories(source = ".") {
  return readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
}