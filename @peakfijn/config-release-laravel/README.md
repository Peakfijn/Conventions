# Laravel - Peakfijn Releases

A sharable Semantic Releases configuration for Laravel projects.
All required dependencies are contained in this one, so you only have to list this.

## Install

Install the dependency with npm.

```bash
$ npm install --save-dev @peakfijn/config-release-laravel
```

## Usage

Update the `package.json` to include a [release](https://github.com/semantic-release/semantic-release/blob/caribou/docs/usage/configuration.md#configuration) property.

```json
{
	"release": {
		"extends": "@peakfijn/config-release-laravel"
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
		"url": "git@bitbucket.org:peakfijn/<project>.git"
	}
}
```
