import * as shell from "shelljs";

import { BuildTask } from "./build";

export class ServeTask {

    public static serve(): void {
        BuildTask.build();
        shell.exec(`electron dist`);
    }
}
