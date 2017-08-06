import * as fs from "fs-extra";

const PACKAGE_NAME = "ng-cli-electron";

export class SetUp {

    public setup(): void {
        console.log("Copying files to working directory");
        try {
            fs.copySync("./", "./node_modules/ng-cli-electron/dist/working-dir", {
                filter: (path) => {
                    console.log(path);
                    const isInNodeModule = path.indexOf("node_modules") > -1;
                    const isInGit = path.indexOf(".git") > -1;
                    return !isInNodeModule;
                },
            });
        } catch (err) {
            console.error(err);
        }

        fs.symlinkSync("../../../Git-Proton/node_modules", "./node_modules/ng-cli-electron/dist/working-dir/node_modules", "dir");

        this.packageClenser("./node_modules/ng-cli-electron/dist/working-dir/package.json");
    }

    public addElectronToWebpack(): void {
        const path = "./node_modules/ng-cli-electron/dist/working-dir/webpack.config.js";
        try {
            const regex = /module.exports = ({(?:.|[\r\n])*})/ig;
            const webpackConfig = fs.readFileSync(path, "utf8");
            const moduleExportsMatches = regex.exec(webpackConfig);

            if (moduleExportsMatches === null) {
                throw new Error("Invalid webpack file");
            }
            console.log(moduleExportsMatches.length);
            console.log(moduleExportsMatches[1]);
            const moduleExports = JSON.parse(moduleExportsMatches[1]);
            moduleExports.target = "electron-renderer";

            webpackConfig.replace(regex, JSON.stringify(moduleExports));
            fs.writeFileSync(path, JSON.stringify(webpackConfig));
        } catch (err) {
            console.error(err);
        }
    }

    private packageClenser(path: string): void {
        try {
            const packageJson = JSON.parse(fs.readFileSync(path, "utf8"));
            packageJson.scripts = {};
            fs.writeFileSync(path, JSON.stringify(packageJson));
        } catch (err) {
            console.error(err);
        }
    }
}
