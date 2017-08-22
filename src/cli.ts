#! /usr/bin/env node
import * as shell from "shelljs";

import { BuildTask } from "./tasks/build";
import { ServeTask } from "./tasks/serve";

const command = process.argv[2];
process.argv.splice(0, 3);

const flags = process.argv.map((flag) => {
    return flag.replace("--", "");
});

if (command === undefined) {
    console.log("nge build - Builds your app and places it into the output path (dist/ by default).");
    process.exit();
}

switch (command) {
    case "build":
        if (flags[0] === "main") {
            BuildTask.buildMain();
            break;
        }
        BuildTask.build();
        break;
    case "serve":
        ServeTask.serve();
        break;
    default:
        console.log(`Command: ${command} is not valid`);
}
