import { logResults, getDirectories } from "clvr"
import { OfflineTest } from "./tests/offlineTest"
import { join } from "path"

const configurations = getDirectories("configurations").map((dirName) =>
  join(__dirname, "configurations", dirName)
)

logResults(OfflineTest, configurations);