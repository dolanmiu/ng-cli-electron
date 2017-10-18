import * as shell from "shelljs";

export class AngularCLI {

    constructor(private workingDir: string) {
    }

    public eject(ngCliArgs: string[]): void {
        shell.exec(`cd ${this.workingDir} && ng eject --base-href .`);
    }

    public build(): void {
        shell.exec(`cd ${this.workingDir} && npm run build`);
    }

    public buildMain(): void {
        shell.exec(`cd ${this.workingDir} && webpack --config webpack-main.config.js`);
    }
}
