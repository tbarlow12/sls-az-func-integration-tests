import { ConfigurationParameters, getDefaultConfigurationParameters } from "./parameters";
import { ResultSet } from "./results";
import { CommandValidation, runValidationChain } from "./validationRunner";
import { getDirectories } from "./utils";

export function runTest(
      validations: CommandValidation[],
      configurations: string[],
      parameters?: ConfigurationParameters): Promise<ResultSet> {
    let testsCompleted = 0;
    
    const configurationsPath = "configurations";

    parameters = parameters || getDefaultConfigurationParameters();

    const results: ResultSet = {};

    return new Promise<ResultSet>((resolve, reject) => {
      configurations.forEach(configuration => {
        runValidationChain(`${configurationsPath}/${configuration}`, validations, {}, (testResults) => {
          results[configuration] = testResults;
          testsCompleted += 1;
          if (testsCompleted === configurations.length) {
            resolve(results);
          }
        }, parameters[configuration]);
      });
    });

    
}

export function logResults(test: (configurations: string[]) => Promise<ResultSet>, configurations?: string[]) {
  configurations = configurations || getDirectories("configurations");
  test(configurations)
    .then((results) => console.log(JSON.stringify(results, null, 2)))
    .catch((reason) => console.log(reason));
}