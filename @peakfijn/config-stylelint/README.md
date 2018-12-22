# Stylelint - Peakfijn

A sharable [Stylelint](https://github.com/stylelint/stylelint) configuration with Peakfijn conventions.

## Installation

Install the dependency with npm.

```bash
$ npm install --save-dev @peakfijn/config-stylelint
```

## Configuration

Update the `package.json` to include an [stylelint](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/configuration.md#loading-the-configuration-object) property.

```json
{
	"stylelint": {
		"extends": "peakfijn"
	}
}
```

## Usage

After installing and configuring the package, you can use it by running this command.

```bash
$ npx stylelint 'src/**/*.js'
```

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
