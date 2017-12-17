import { ServeTask } from "../tasks/serve";

export const serveCommand = {
    command: "serve",
    describe: "Serve the app in Electron window",
    handler: (argv) => {
        ServeTask.serve();
    },
};
