import { Configurations } from "./configurations";

export interface InterpolateParameters {
  [variableName: string]: string;
}

export interface DefaultParameters extends InterpolateParameters {
  configName: string;
}

export interface ConfigurationParameters extends Configurations {
  [config: string]: DefaultParameters
}

export function getDefaultConfigurationParameters(): ConfigurationParameters {
  return {
    "node10-linux": {
      configName: "node10-linux",
    },
    "node10-linux-external": {
      configName: "node10-linux-external",
    },
    "node10-windows": {
      configName: "node10-windows",
    },
    "node12-linux": {
      configName: "node12-linux",
    },
    "node12-linux-external": {
      configName: "node12-linux-external",
    },
    "node12-windows": {
      configName: "node12-windows",
    },
    "python36": {
      configName: "python36",
    },
    "python37": {
      configName: "python37",
    },
    "python38": {
      configName: "python38",
    }
  }
}