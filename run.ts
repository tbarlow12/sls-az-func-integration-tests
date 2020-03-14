import { logResults } from "./src/runTest";
import { DeployTest } from "./tests/deployTest";
import { OfflineTest } from "./tests/offlineTest";

// logResults(DeployTest, ["node10-windows-webpack"]);
logResults(OfflineTest, ["node10-windows-webpack"]);