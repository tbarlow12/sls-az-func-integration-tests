import { Configurations } from "./configurations";

export interface ResultSet {
  [configuration: string]: ConfigurationResultSet
}

export interface ConfigurationResultSet {
  [ testName: string ]: {
    passed: boolean;
    message?: string;
  }
}

export function getEmptyResultSet(): ResultSet {
  return {
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
}