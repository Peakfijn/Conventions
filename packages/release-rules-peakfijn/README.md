# Release Rules - Peakfijn

The [Peakfijn](https://peakfijn.nl/) commit types parsed and exported as [(semantic) release rules](https://github.com/semantic-release/commit-analyzer#release-rules).

## Usage

You can include this package by configuring the release section of the package file.

```json
{
	"release": {
		"analyzeCommits": {
			"preset": "peakfijn",
			"releaseRules": "release-rules-peakfijn"
		}
	}
}
```

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
