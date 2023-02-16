type Options = {
  variableName?: string;
  callback?: (result: any) => void;
};

declare function dynamicLoadScript(
  src: HTMLScriptElement["src"],
  opts: Options,
  backupSrc?: HTMLScriptElement["src"]
): Promise;

declare global {
  interface Window {
    [key: Options["variableName"]]: any;
  }
}

export default dynamicLoadScript;
