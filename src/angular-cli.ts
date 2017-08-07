import * as shell from "shelljs";

export class AngularCLI {

    constructor(private workingDir: string) {
    }

    public eject(): void {
        shell.exec(`cd ${this.workingDir} && ng eject`);
    }

    public build(): void {
        shell.exec(`cd ${this.workingDir} && npm run build`);
    }
}
