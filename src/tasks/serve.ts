import * as shell from "shelljs";

import { BuildTask } from "./build";

export class ServeTask {
    public static serve(): void {
        BuildTask.buildRenderer();
        BuildTask.buildElectronMain();
        shell.exec(`electron dist`);
    }
}
