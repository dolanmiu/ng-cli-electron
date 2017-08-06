import * as shell from "shelljs";

export class AngularCLI {

    public eject(): void {
        shell.exec("cd ./node_modules/ng-cli-electron/dist/working-dir && ng eject");
    }

    public build(): void {
        shell.exec("cd ./node_modules/ng-cli-electron/dist/working-dir && npm run build");
    }
}
