# accent-folding [![npm version](https://img.shields.io/npm/v/accent-folding)](https://www.npmjs.com/package/accent-folding) [![npm downloads](https://img.shields.io/npm/dw/accent-folding)](https://www.npmjs.com/package/accent-folding) ![GitHub package.json version](https://img.shields.io/github/package-json/v/ZRktty/accent-folding) [![Coverage Status](https://coveralls.io/repos/github/ZRktty/accent-folding/badge.svg?branch=main)](https://coveralls.io/github/ZRktty/accent-folding?branch=main)

**[Live demo →](https://zrktty.github.io/accent-folding/)**

Searching "cafe" should find "café". Highlighting "lo" in "López" should show `<b>Ló</b>pez` — not stripped text.

`accent-folding` is the only library that solves both: accent-insensitive matching that returns the **original accented string** with HTML markup around matches. Zero dependencies. 2.7 kB gzipped.

## Installation

Install with npm:

```shell
npm install accent-folding
```

or with pnpm:

```shell
pnpm install accent-folding
```

or with bun:

```shell
bun add accent-folding
```

or with yarn:

```shell
yarn add accent-folding
```

## TypeScript

Full type declarations are included. No `@types/` package needed.

```ts
import AccentFolding, { type AccentMap } from 'accent-folding';

const af = new AccentFolding();

const replaced: string = af.replace('café');
const highlighted: string = af.highlightMatch('López', 'lo');
const highlightedMark: string = af.highlightMatch('López', 'lo', 'mark');

// Custom accent map with typed argument
const customMap: AccentMap = { ö: 'oe', ü: 'ue' };
const afCustom = new AccentFolding(customMap);
```

## Public Methods

### `highlightMatch`

Matches a search fragment against a string, ignoring accents, and wraps each match in an HTML tag — returning the original accented characters intact.

- Accent-insensitive matching
- Returns original accented text with HTML markup around matches
- Customizable highlight tag (default: `<b>`, use `strong`, `mark`, `span`, etc.)
- Handles various Unicode characters, including fullwidth ASCII

```js
import AccentFolding from 'accent-folding';

const af = new AccentFolding();

af.highlightMatch('Fulanilo López', 'lo'); // --> "Fulani<b>lo</b> <b>Ló</b>pez"
```

Use the third argument to specify the wrapping HTML tag:

```js
af.highlightMatch('Fulanilo López', 'lo', 'strong'); // --> "Fulani<strong>lo</strong> <strong>Ló</strong>pez"
af.highlightMatch('Fulanilo López', 'lo', 'mark'); // --> "Fulani<mark>lo</mark> <mark>Ló</mark>pez"
```

### `replace`

Replaces accented characters in a string with their unaccented equivalents.

- Handles various Unicode characters, including fullwidth ASCII
- Preserves original string formatting in the output

```js
import AccentFolding from 'accent-folding';

const af = new AccentFolding();

af.replace('Fulanilo López'); // --> "Fulanilo Lopez"
```

## Extending and Overriding the Accent Map

The `AccentFolding` class allows you to extend or override the default accent map by providing a custom map to the constructor.

### Extending the Accent Map

To extend the accent map with new mappings, pass an object with the new mappings to the constructor. For example:

```js
import AccentFolding from 'accent-folding';

const customAccentMap = { ö: 'oe', '✝': 't' };
const accentFolder = new AccentFolding(customAccentMap);

console.log(accentFolder.replace('Föhn')); // Outputs: Foehn
console.log(accentFolder.replace('✝illa')); // Outputs: tilla
```

## Real-World Examples

### Plain JS (browser)

```js
import AccentFolding from 'accent-folding';

const af = new AccentFolding();
const names = ['López', 'Müller', 'Björk', 'Ñoño', 'García', 'Renée'];

const input = document.querySelector('#search');
const list = document.querySelector('#results');

input.addEventListener('input', () => {
	const query = input.value.trim();
	const matches = query
		? names.filter((name) =>
				af.replace(name).toLowerCase().includes(af.replace(query).toLowerCase())
			)
		: names;

	list.innerHTML = matches
		.map((name) => `<li>${query ? af.highlightMatch(name, query) : name}</li>`)
		.join('');
});
```

### React

```jsx
import { useState } from 'react';
import AccentFolding from 'accent-folding';

const af = new AccentFolding();
const names = ['López', 'Müller', 'Björk', 'Ñoño', 'García', 'Renée'];

export default function AccentSearch() {
	const [query, setQuery] = useState('');

	const matches = query
		? names.filter((name) =>
				af.replace(name).toLowerCase().includes(af.replace(query).toLowerCase())
			)
		: names;

	return (
		<div>
			<input
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="Search..."
			/>
			<ul>
				{matches.map((name) => (
					<li
						key={name}
						dangerouslySetInnerHTML={{
							__html: query ? af.highlightMatch(name, query) : name,
						}}
					/>
				))}
			</ul>
		</div>
	);
}
```

`dangerouslySetInnerHTML` is safe here because `names` is app-controlled data. Never use it with strings from untrusted external input.

## Requirements

Node.js ≥22

<details>
<summary>Legacy usage (v1 CommonJS API)</summary>

Install with npm:

```shell
npm install accent-folding@1
```

Example:

```js
const accentFoldedHighlight = require('accent-folding');

accentFoldedHighlight('Fulanilo López', 'lo'); // --> "Fulani<b>lo</b> <b>Ló</b>pez"
accentFoldedHighlight('Fulanilo López', 'lo', 'strong'); // --> "Fulani<strong>lo</strong> <strong>Ló</strong>pez"
```

</details>

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Credits

The initial idea came from the article [Accent Folding for Auto-Complete](https://alistapart.com/article/accent-folding-for-auto-complete/) by John Nunemaker on A List Apart. This library has since grown beyond that original concept, but the credit belongs there.
