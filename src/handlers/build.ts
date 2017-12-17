import * as _ from "lodash";

import { IAngularCliArguments } from "../angular/angular-cli-arguments";
import { ANGULAR_CLI_FLAGS } from "../angular/angular-cli-flags";

export function processArgs(argv: {}): string[] {
    const obj: IAngularCliArguments = _.pick(argv, ANGULAR_CLI_FLAGS);
    const cleanseUnusedFlags = _.omitBy(obj, (o) => o === undefined);

    const arr = _.values(_.mapValues(cleanseUnusedFlags, (value, key) => {
        return `${key}=${value}`;
    }));

    const cleanedArray = _.without(arr, undefined);

    const dashedArray = _.map(cleanedArray, (o) => `--${o}`);

    return dashedArray;
}
