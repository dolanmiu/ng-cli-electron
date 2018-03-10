import * as shell from "shelljs";

export class AngularCLI {

    constructor(private workingDir: string) {

    }

    public eject(ngCliArgs: string[]): void {
        const ejectCommand = [`cd ${this.workingDir} && ng eject --base-href .`];
        const commandWithArgs = ejectCommand.concat(ngCliArgs).join(" ");

        console.log(commandWithArgs);

        shell.exec(commandWithArgs);
    }

    public build(): void {
        const buildCommand = `cd ${this.workingDir} && npm run build`;

        shell.exec(buildCommand);
    }

    public buildMain(): void {
        const buildMainCommand = `cd ${this.workingDir} && webpack --config webpack-main.config.js`;

        shell.exec(buildMainCommand);
    }
}
