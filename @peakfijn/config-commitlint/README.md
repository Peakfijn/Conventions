# Commitlint - Peakfijn

A sharable [Commitlint](https://github.com/marionebl/commitlint) configuration with Peakfijn conventions.

## Installation

Install the dependency with npm.

```bash
$ npm install --save-dev @peakfijn/config-commitlint
```

## Configuration

Update the `package.json` to include a [commitlint](https://github.com/marionebl/commitlint/issues/272#issuecomment-366037861) property.

```json
{
	"commitlint": {
		"extends": [
			"peakfijn"
		]
	}
}
```

## Usage

After installing and configuring the package, you can use it by running this command.

```bash
$ npx commitlint --to HEAD
```

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
