# Open Source - Peakfijn Releases

A sharable [Semantic Releases](https://github.com/semantic-release/semantic-release) configuration for basic open source projects.

## Installation

Install the dependency with npm.

```bash
$ npm install --save-dev @peakfijn/config-release-os
```

## Configuration

Update the `package.json` to include a [release](https://github.com/semantic-release/semantic-release/blob/caribou/docs/usage/configuration.md#configuration) property.

```json
{
	"release": {
		"extends": "@peakfijn/config-release-os"
	}
}
```

And make sure `package.json` also contains the basic repository (**git url**) information.

```json
{
	"name": "<project>",
	"version": "0.0.0",
	"repository": {
		"type": "git",
		"url": "https://github.com:peakfijn/<project>.git"
	}
}
```

## Usage

After installing and configuring the package, you can use it by running this command.

```bash
$ npx semantic-release
```

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
