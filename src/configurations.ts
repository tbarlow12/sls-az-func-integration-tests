export interface Configurations {
  "node10-linux": any,
  "node10-linux-external": any,
  "node10-windows": any,
  "node12-linux": any,
  "node12-linux-external": any,
  "node12-windows": any,
  "python36": any,
  "python37": any,
  "python38": any
}

export function getConfigurationsObject(): Configurations {
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
