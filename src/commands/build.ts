import { CommandModule } from "yargs";

import { processArgs } from "../handlers/build";
import { BuildTask } from "../tasks/build";

export const buildCommand: CommandModule = {
    command: "build",
    describe: "Build the app",
    handler: (argv) => {
        if (argv.main === true) {
            BuildTask.buildElectronMain();
            return;
        }
        const ngCliArgs = processArgs(argv);
        BuildTask.build(ngCliArgs);
    },
};
