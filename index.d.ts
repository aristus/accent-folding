export type AccentMap = Record<string, string>;

export default class AccentFolding {
  constructor(newMap?: AccentMap | null);
  replace(text: string): string;
  highlightMatch(str: string, fragment: string, wrapTag?: string): string;
  static convertAccentMapToArray(accentMap: AccentMap): Array<[string, string]>;
}
