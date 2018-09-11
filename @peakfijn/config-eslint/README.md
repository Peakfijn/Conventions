# ESLint - Peakfijn

A sharable [ESLint](https://github.com/eslint/eslint) configuration with Peakfijn conventions.

> This configuration serves as a base for all project-specific ESLint configs, like [`@peakfijn/config-eslint-expo`](https://github.com/Peakfijn/Conventions/tree/develop/%40peakfijn/config-eslint-expo).

## Installation

Install the dependency with npm.

```bash
$ npm install --save-dev @peakfijn/config-eslint
```

## Configuration

Update the `package.json` to include an [eslintConfig](https://eslint.org/docs/user-guide/configuring) property.

```json
{
	"eslintConfig": {
		"extends": "peakfijn"
	}
}
```

## Usage

After installing and configuring the package, you can use it by running this command.

```bash
$ npx eslint 'src/**/*.js'
```
