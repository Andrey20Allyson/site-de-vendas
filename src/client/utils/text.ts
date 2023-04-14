export namespace Emogis {
  export const CONSTRUCTION_SIGN = '\uD83D\uDEA7';
}

export const replaceRegex = /%s/g

export function formatText(baseText: string, ...args: string[]) {
  let i = 0;

  return baseText.replace(replaceRegex, () => args[i++]);
}