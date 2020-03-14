import { Configurations } from "./configurations";

export interface InterpolateParameters {
  [variableName: string]: string;
}

export interface DefaultParameters extends InterpolateParameters {
  configName: string;
  commandName: string;
}

export interface ConfigurationParameters extends Configurations {
  [config: string]: DefaultParameters
}

export function getDefaultConfigurationParameters(): ConfigurationParameters {
  return {
    "node10-linux": {
      configName: "node10-linux",
      commandName: "offline",
    },
    "node10-linux-external": {
      configName: "node10-linux-external",
      commandName: "offline",
    },
    "node10-windows": {
      configName: "node10-windows",
      commandName: "offline",
    },
    "node10-windows-webpack": {
      configName: "node10-windows-webpack",
      commandName: "offline",
    },
    "node12-linux": {
      configName: "node12-linux",
      commandName: "offline",
    },
    "node12-linux-external": {
      configName: "node12-linux-external",
      commandName: "offline",
    },
    "node12-windows": {
      configName: "node12-windows",
      commandName: "offline",
    },
    "node12-windows-webpack": {
      configName: "node10-windows-webpack",
      commandName: "offline",
    },
    "python36": {
      configName: "python36",
      commandName: "offline",
    },
    "python37": {
      configName: "python37",
      commandName: "offline",
    },
    "python38": {
      configName: "python38",
      commandName: "offline",
    }
  }
}