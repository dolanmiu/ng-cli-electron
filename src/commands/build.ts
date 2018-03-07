import { CommandModule } from "yargs";

import { processArgs } from "../handlers/build";
import { BuildTask } from "../tasks/build";

export const buildCommand: CommandModule = {
    command: "build",
    describe: "Build the app",
    handler: (argv) => {
        if (argv.main) {
            BuildTask.buildElectronMain();
            return;
        }

        if (argv.renderer) {
            BuildTask.buildRenderer();
            return;
        }

        const ngCliArgs = processArgs(argv);
        BuildTask.buildRenderer(ngCliArgs);
        BuildTask.buildElectronMain();
    },
};
