# Commitizen - Peakfijn

A sharable [Commitizen](https://github.com/commitizen/cz-cli) configuration with Peakfijn conventions.

## Installation

Install the dependency with npm.

```bash
$ npm install --save-dev @peakfijn/config-commitizen
```

## Configuration

Update the `package.json` to include a [commitizen config](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly) property.

```json
{
	"config": {
		"commitizen": {
			"path": "@peakfijn/config-commitizen"
		}
	}
}
```

## Usage

After installing and configuring the package, you can use it by running this command.

```bash
$ npx git-cz
```
