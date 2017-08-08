import * as fs from "fs-extra";
import * as path from "path";
import * as rimraf from "rimraf";

export class SetUp {

    constructor(private workingDir: string) {

    }

    public setup(): void {
        this.copyProject();

        fs.symlinkSync("../../../Git-Proton/node_modules", `${this.workingDir}/node_modules`, "dir");

        this.packageClenser();
    }

    public addElectronToWebpack(): void {
        const webpackPath = `${this.workingDir}/webpack.config.js`;

        try {
            const regex = /module.exports = {/ig;
            let webpackConfig = fs.readFileSync(webpackPath, "utf8");

            webpackConfig = webpackConfig.replace(regex, `module.exports = { "target": "electron-renderer",`);
            fs.writeFileSync(webpackPath, webpackConfig);
        } catch (err) {
            console.error(err);
        }
    }

    public addElectronBaseHref(): void {
        const htmlPath = `${this.workingDir}/dist/index.html`;

        try {
            const regex = /<base href=".">/ig;
            let indexHtml = fs.readFileSync(htmlPath, "utf8");

            indexHtml = indexHtml.replace(regex, `<base href=".\/">`);
            fs.writeFileSync(htmlPath, indexHtml);
        } catch (err) {
            console.error(err);
        }
    }

    public addMainFileToDist(): void {
        fs.copySync(path.resolve(__dirname, "../src/assets/main.js"), `${this.workingDir}/dist/main.js`);
    }

    public exportDist(): void {
        this.copyFolder(`${this.workingDir}/dist`, "./dist");
    }

    public clearWorkingDirectory(): void {
        rimraf.sync(this.workingDir);
    }

    private copyProject(): void {
        this.copyFolder("./", this.workingDir);
    }

    private copyFolder(src: string, dest: string): void {
        try {
            fs.copySync(src, dest, {
                filter: (filePath) => {
                    const isInNodeModule = filePath.indexOf("node_modules") > -1;
                    const isInGit = filePath.indexOf(".git") > -1;
                    return !isInNodeModule;
                },
            });
        } catch (err) {
            console.error(err);
        }
    }

    private packageClenser(): void {
        const packagePath = `${this.workingDir}/package.json`;

        try {
            const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
            packageJson.scripts = {};
            fs.writeFileSync(packagePath, JSON.stringify(packageJson));
        } catch (err) {
            console.error(err);
        }
    }
}
