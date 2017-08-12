import { AngularCLI } from "../angular-cli";
import { Backuper } from "../backuper";
import { SetUp } from "../setup";

export class BuildTask {

    public static build(): void {
        const PACKAGE_NAME = "ng-cli-electron";
        const WORKING_DIR = `./`;

        const setup = new SetUp(WORKING_DIR);
        const angularCli = new AngularCLI(WORKING_DIR);
        const backuper = new Backuper();
        const command = process.argv[2];

        console.log("Do NOT cancel this task");
        console.log("Backing up files...");
        backuper.backup("package", `${WORKING_DIR}/package.json`);
        backuper.backup("angular-cli", `${WORKING_DIR}/.angular-cli.json`);

        try {

            console.log("Cleanse package.json");
            setup.packageClenser();

            console.log("Ejecting...");
            angularCli.eject();

            console.log("Add webpack to electron...");
            setup.addElectronToWebpack();

            console.log("Clearing out old dist folder...");
            setup.clearDist();

            console.log("Building...");
            angularCli.build();

            console.log("Adding election main file...");
            if (setup.checkIfMainExists()) {
                setup.addMainWebpackToDist();
                angularCli.buildMain();
            } else {
                setup.addMainFileToDist();
            }

            console.log("Copying package.json");
            setup.copyPackageJson();
        } finally {
            console.log("Delete webpack config");
            setup.delete("webpack.config.js");
            setup.delete("webpack-main.config.js");

            console.log("Restoring files...");
            backuper.restore("package");
            backuper.restore("angular-cli");
        }
    }
}
