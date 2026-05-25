import AccentFolding, { type AccentMap } from './index.js';

// Constructor variants
const af = new AccentFolding();
const afNull = new AccentFolding(null);
const customMap: AccentMap = { ö: 'oe', '✝': 't' };
const afCustom = new AccentFolding(customMap);

// replace() returns string
const replaced: string = af.replace('café');

// highlightMatch() — two-arg and three-arg forms
const highlighted: string = af.highlightMatch('López', 'lo');
const highlightedTagged: string = af.highlightMatch('López', 'lo', 'mark');

// static method
const entries: Array<[string, string]> = AccentFolding.convertAccentMapToArray(customMap);

// AccentMap type is usable for typing custom maps
const myMap: AccentMap = { ñ: 'n', ü: 'ue' };
const afMy = new AccentFolding(myMap);

// @ts-expect-error — replace requires a string
af.replace(42);

// @ts-expect-error — fragment must be a string
af.highlightMatch('café', 42);

// Silence unused variable warnings
void afNull, afCustom, replaced, highlighted, highlightedTagged, entries, afMy;
