import { CommandModule } from "yargs";
import { ServeTask } from "../tasks/serve";

export const serveCommand: CommandModule = {
    command: "serve",
    describe: "Serve the app in Electron window",
    handler: (argv) => {
        ServeTask.serve();
    },
};
