export type StringInfo = {
    lowerCase: string;
    upperCase: string;
    characters: string[];
    length: number;
    extraInfo: Object | undefined;
};

type LoggerServiceCallBack = (arg: string) => void;

export function calculateComplexity(stringInfo: StringInfo) {
    return Object.keys(stringInfo.extraInfo!).length * stringInfo.length;
}

export function toUpperCaseWithCallback(arg: string, callBack: Function) {
    if (!arg) {
        callBack("Invalid argument!");
        return;
    }

    callBack(`called function with ${arg}`);
    return arg.toUpperCase();
}
