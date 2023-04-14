export enum ScreenTypes {
  NORMAL,
  POCKET,
};

export function classifyScreen(width: number) {
  return width > 700 ? ScreenTypes.NORMAL : ScreenTypes.POCKET;
}