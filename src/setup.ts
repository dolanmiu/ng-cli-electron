import * as fs from "fs-extra";
import * as path from "path";

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
            const regex = /module.exports = ({)/ig;
            const webpackConfig = fs.readFileSync(webpackPath, "utf8");

            webpackConfig.replace(regex, `{ "target": electron-renderer",`);
            fs.writeFileSync(webpackPath, webpackConfig);
        } catch (err) {
            console.error(err);
        }
    }

    public addElectronBaseHref(): void {
        const htmlPath = `${this.workingDir}/dist/index.html`;

        try {
            const regex = /<base href=".\/">/ig;
            const webpackConfig = fs.readFileSync(htmlPath, "utf8");

            webpackConfig.replace(regex, `<base href=".">`);
            fs.writeFileSync(htmlPath, webpackConfig);
        } catch (err) {
            console.error(err);
        }
    }

    public addMainFileToDist(): void {
        fs.copySync(path.resolve(__dirname, "./assets/main.js"), `${this.workingDir}/dist/main.js`);
    }

    public exportDist(): void {
        this.copyFolder(`${this.workingDir}/dist`, "./dist");
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
