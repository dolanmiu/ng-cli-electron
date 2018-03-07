import { AngularCLI } from "../angular/angular-cli";
import { Backuper } from "../backuper";
import { SetUp } from "../setup";

const PACKAGE_NAME = "ng-cli-electron";
const WORKING_DIR = `./`;

export class BuildTask {
    public static buildRenderer(ngCliArgs: string[] = []): void {
        const backuper = new Backuper();

        console.log("Do NOT cancel this task");
        console.log("Backing up files...");
        backuper.backup("package", `${WORKING_DIR}/package.json`);
        backuper.backup("angular-cli", `${WORKING_DIR}/.angular-cli.json`);

        try {
            this.clearDistFolder();
            this.removeScriptFromPackageJson();

            this.ejectAngular(ngCliArgs);
            this.addElectronToWebpack();

            this.buildAngularProject();

            this.addPackageJsonToDist();
        } finally {
            this.deleteTemporaryFiles();
            this.restoreFiles(backuper);
        }
    }

    private static clearDistFolder(): void {
        console.log("Clearing out old dist folder...");
        this.setup.clearDist();
    }

    private static removeScriptFromPackageJson(): void {
        console.log("Cleanse package.json");
        this.setup.removeScriptsFromPackage();
    }

    private static ejectAngular(ngCliArgs: string[]): void {
        console.log("Ejecting...");
        this.angularCli.eject(ngCliArgs);
    }

    private static addElectronToWebpack(): void {
        console.log("Add electron to webpack...");
        this.setup.addElectronToWebpack();
    }

    private static buildAngularProject(): void {
        console.log("Building...");
        this.angularCli.build();
    }

    private static addPackageJsonToDist(): void {
        console.log("Copying package.json...");
        this.setup.copyPackageJson();

        console.log("Adding main to package.json...");
        this.setup.packageDistAddMain();
    }

    private static deleteTemporaryFiles(): void {
        console.log("Delete webpack config");
        this.setup.delete("webpack.config.js");
    }

    private static restoreFiles(backuper: Backuper): void {
        console.log("Restoring files...");
        backuper.restore("package");
        backuper.restore("angular-cli");
    }

    public static buildElectronMain(): void {
        console.log("Adding electron main file...");

        try {
            this.resolveMainFile();
        } finally {
            console.log("Delete main webpack config");
            this.setup.delete("webpack-main.config.js");
        }
    }

    private static resolveMainFile(): void {
        if (this.setup.mainExists()) {
            console.log("Custom 'main' exists, building it...");
            this.setup.addMainWebpackToDist();
            this.angularCli.buildMain();
        } else {
            console.log("No 'main' found. Using default...");
            this.setup.addMainFileToDist();
        }
    }

    private static setup = new SetUp(WORKING_DIR);
    private static angularCli = new AngularCLI(WORKING_DIR);
}
