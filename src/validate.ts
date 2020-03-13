import { ResultSet } from "./validationRunner";

export interface OutputValidation {
  shouldBeExactly?: string;
  shouldContain?: string[];
}

export function validateOutput(expected: OutputValidation, output: string) {
  if (!expected) {
    return;
  }
  const { shouldBeExactly, shouldContain } = expected;
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
}