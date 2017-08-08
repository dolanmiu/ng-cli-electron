import * as fs from "fs";

interface IFile {
    content: string;
    path: string;
}

export class Backuper {
    private map: Map<string, IFile>;

    constructor() {
        this.map = new Map<string, IFile>();
    }

    public backup(name: string, filePath: string): void {
        const file = fs.readFileSync(filePath, "utf8");

        this.map.set(name, {
            content: file,
            path: filePath,
        });
    }

    public restore(name: string): void {
        const file = this.map.get(name);

        if (file === undefined) {
            throw new Error(`${file} is undefined`);
        }

        fs.writeFileSync(file.path, file.content);
    }
}
