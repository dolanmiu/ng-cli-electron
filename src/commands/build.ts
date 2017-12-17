import { processArgs } from "../handlers/build";
import { BuildTask } from "../tasks/build";

export const buildCommand = {
    command: "build",
    describe: "Build the app",
    handler: (argv) => {
        if (argv.main === true) {
            BuildTask.buildMain();
            return;
        }
        const ngCliArgs = processArgs(argv);
        BuildTask.build(ngCliArgs);
    },
};
