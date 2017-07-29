import * as path from "path";

export class Helper {

    public static root(...args: string[]): string {
        const root = path.resolve(__dirname, "../../Git-Proton");
        args = Array.prototype.slice.call(arguments, 0);
        const newPath = path.join.apply(path, [root].concat(args));
        console.log(newPath);
        return newPath;
    }
}
