import * as fs from "fs-extra";

const PACKAGE_NAME = "ng-cli-electron";
const WORKING_DIR = `./node_modules/${PACKAGE_NAME}/dist/working-dir`;

export class SetUp {

    public setup(): void {
        this.copyProject();

        fs.symlinkSync("../../../Git-Proton/node_modules", `${WORKING_DIR}/node_modules`, "dir");

        this.packageClenser();
    }

    public addElectronToWebpack(): void {
        const path = `${WORKING_DIR}/webpack.config.js`;

        try {
            const regex = /module.exports = ({)/ig;
            const webpackConfig = fs.readFileSync(path, "utf8");

            webpackConfig.replace(regex, `{ "target": electron-renderer",`);
            fs.writeFileSync(path, webpackConfig);
        } catch (err) {
            console.error(err);
        }
    }

    private copyProject(): void {
        try {
            fs.copySync("./", WORKING_DIR, {
                filter: (path) => {
                    const isInNodeModule = path.indexOf("node_modules") > -1;
                    const isInGit = path.indexOf(".git") > -1;
                    return !isInNodeModule;
                },
            });
        } catch (err) {
            console.error(err);
        }
    }

    private packageClenser(): void {
        const path = `${WORKING_DIR}/package.json`;

        try {
            const packageJson = JSON.parse(fs.readFileSync(path, "utf8"));
            packageJson.scripts = {};
            fs.writeFileSync(path, JSON.stringify(packageJson));
        } catch (err) {
            console.error(err);
        }
    }
}
