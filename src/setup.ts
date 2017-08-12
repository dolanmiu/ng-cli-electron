import * as fs from "fs-extra";
import * as path from "path";
import * as rimraf from "rimraf";

export class SetUp {

    constructor(private workingDir: string) {
    }

    public addElectronToWebpack(): void {
        const webpackPath = `${this.workingDir}/webpack.config.js`;
        const regex = /module.exports = {/ig;

        let webpackConfig = fs.readFileSync(webpackPath, "utf8");

        webpackConfig = webpackConfig.replace(regex, `module.exports = { "target": "electron-renderer",`);
        fs.writeFileSync(webpackPath, webpackConfig);
    }

    public addMainFileToDist(): void {
        fs.copySync(path.resolve(__dirname, "../src/assets/main.js"), `${this.workingDir}/dist/main.js`);
    }

    public copyPackageJson(): void {
        fs.copySync(`${this.workingDir}/package.json`, `${this.workingDir}/dist/package.json`);
    }

    public clearDist(): void {
        rimraf.sync(`${this.workingDir}/dist`);
    }

    public delete(file: string): void {
        rimraf.sync(`${this.workingDir}/${file}`);
    }

    public packageClenser(): void {
        const packagePath = `${this.workingDir}/package.json`;

        const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
        packageJson.scripts = {};
        fs.writeFileSync(packagePath, JSON.stringify(packageJson));
    }

    public checkIfMainExists(): boolean {
        if (fs.existsSync(`${this.workingDir}/main/index.ts`)) {
            return true;
        } else {
            return false;
        }
    }

    public addMainWebpackToDist(): void {
        fs.copySync(path.resolve(__dirname, "../src/assets/webpack-main.config.js"), `${this.workingDir}/webpack-main.config.js`);
    }
}
