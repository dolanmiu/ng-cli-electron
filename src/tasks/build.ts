import { AngularCLI } from "../angular/angular-cli";
import { Backuper } from "../backuper";
import { SetUp } from "../setup";

const PACKAGE_NAME = "ng-cli-electron";
const WORKING_DIR = `./`;

export class BuildTask {
    public static build(ngCliArgs: string[] = []): void {
        const backuper = new Backuper();

        console.log("Do NOT cancel this task");
        console.log("Backing up files...");
        backuper.backup("package", `${WORKING_DIR}/package.json`);
        backuper.backup("angular-cli", `${WORKING_DIR}/.angular-cli.json`);

        try {

            console.log("Cleanse package.json");
            this.setup.packageClenser();

            console.log("Ejecting...");
            this.angularCli.eject(ngCliArgs);

            console.log("Add webpack to electron...");
            this.setup.addElectronToWebpack();

            console.log("Clearing out old dist folder...");
            this.setup.clearDist();

            console.log("Building...");
            this.angularCli.build();

            this.buildMain();

            console.log("Copying package.json...");
            this.setup.copyPackageJson();

            console.log("Adding main to package.json...");
            this.setup.packageDistAddMain();
        } finally {
            console.log("Delete webpack config");
            this.setup.delete("webpack.config.js");

            console.log("Restoring files...");
            backuper.restore("package");
            backuper.restore("angular-cli");
        }
    }

    public static buildMain(): void {
        console.log("Adding election main file...");

        try {
            if (this.setup.mainExists()) {
                console.log("Custom 'main' exists, building it...");
                this.setup.addMainWebpackToDist();
                this.angularCli.buildMain();
            } else {
                console.log("No 'main' found. Using default...");
                this.setup.addMainFileToDist();
            }
        } finally {
            console.log("Delete main webpack config");
            this.setup.delete("webpack-main.config.js");
        }
    }

    private static setup = new SetUp(WORKING_DIR);
    private static angularCli = new AngularCLI(WORKING_DIR);
}
