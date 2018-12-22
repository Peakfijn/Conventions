# Stylelint - Peakfijn

[Stylelint](https://github.com/stylelint/stylelint) configuration for [Peakfijn](https://peakfijn.nl/) conventions.
This configuration uses the [concentric order](https://github.com/chaucerbao/stylelint-config-concentric-order) and [standard](https://github.com/stylelint/stylelint-config-standard) stylelint rules, with minor changes.

## Usage

After installing the configuration, you can use it with the stylelint `--config` flag.

```bash
$ echo 'a { color: #ff4d18; margin: 8px }' | npx stylelint --config stylelint-config-peakfijn
```

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
