import * as shell from "shelljs";

export class AngularCLI {

    constructor(private workingDir: string) {
    }

    public eject(ngCliArgs: string[]): void {
        const ejectCommand = [`cd ${this.workingDir} && ng eject --base-href .`];
        const fullCommand = ejectCommand.concat(ngCliArgs).join(" ");

        console.log(fullCommand);

        shell.exec(fullCommand);
    }

    public build(): void {
        shell.exec(`cd ${this.workingDir} && npm run build`);
    }

    public buildMain(): void {
        shell.exec(`cd ${this.workingDir} && webpack --config webpack-main.config.js`);
    }
}
