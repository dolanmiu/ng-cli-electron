import * as path from "path";
import * as zlib from "zlib";

export class Helper {

    public static root(...args: string[]): string {
        const root = path.resolve(__dirname, "../../Git-Proton");
        args = Array.prototype.slice.call(arguments, 0);
        const newPath = path.join.apply(path, [root].concat(args));
        return newPath;
    }

    public static hasProcessFlag(flag: string): boolean {
        return process.argv.join("").indexOf(flag) > -1;
    }

    public static gzipMaxLevel(buffer: Buffer, callback: (error: Error, result: Buffer) => void): void {
        zlib["gzip"](buffer, { level: 9 }, callback);
    }

    public static rootNode(...args: string[]): string {
        args = Array.prototype.slice.call(arguments, 0);
        return Helper.root.apply(path, ["node_modules"].concat(args));
    }

    public static prependExt(extensions: string[], ...args: string[]): string[] {
        args = args || [];
        if (!Array.isArray(args)) {
            args = [args];
        }

        return extensions.reduce((memo, val) => {
            return memo.concat(val, args.map((prefix) => {
                return prefix + val;
            }));
        }, [""]);
    }
}
