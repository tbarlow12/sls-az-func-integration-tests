import { InterpolateParameters } from "./parameters";

export interface OutputValidation {
  shouldBeExactly?: string;
  shouldContain?: string[];
  shouldContainInterpolated?: string[];
}

export function validateOutput(expected: OutputValidation, output: string, parameters: InterpolateParameters) {
  if (!expected) {
    return;
  }
  const { shouldBeExactly, shouldContain, shouldContainInterpolated } = expected;
  if (shouldBeExactly && shouldContain) {
    throw new Error("Can't specify both `shouldBeExactly` and `shouldContain`");
  }
  if (shouldBeExactly) {
    if (output !== shouldBeExactly) {
      throw new Error(`Expected: ${shouldBeExactly}\nReceived: ${output}`);
    }
  }
  if (shouldContain) {
    for (const item of shouldContain) {
      if (!output.includes(item)) {
        throw new Error(`Output did not contain '${item}'`);
      }
    }
  }
  if (shouldContainInterpolated) {
    for (const interpolated of interpolateStrings(shouldContainInterpolated, parameters)) {
      if (!output.includes(interpolated)) {
        throw new Error(`Output did not contain '${interpolated}'`);
      }
    }
  }
}

const variableRegex = /\${([a-zA-Z]+)}/g

function interpolateStrings(original: string[], parameters: InterpolateParameters): string[] {
  return original.map((s) => {
    const variables = s.match(variableRegex);
    for (const m of variables) {
      const key = m.replace("$", "").replace("{", "").replace("}", "");
      s = s.replace(m, parameters[key]);
    }
    return s;
  });
}

