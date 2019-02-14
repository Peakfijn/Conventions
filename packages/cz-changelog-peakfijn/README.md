# Commitizen cz-cli - Peakfijn

A [Commitizen cz-cli](https://github.com/commitizen/cz-cli) adapter for [Commitlint](https://www.npmjs.com/package/commitlint) configurations.
This also includes some bias for [Peakfijn](https://peakfijn.nl/) commit types. 

## Questions

This adapter asks for questions mostly based on Commitlint rules `type-enum`, `scope-empty` and `scope-enum`.
It will automatically load the configuration, enable or disable specific questions and validate the final built commit.
When it the resulting commit doesn't meet required Commitlint configuration, it will display all violating errors and warnings.

### 1. What is the most appropriate change type? (in priority)

This question fills the `<type>`-part of the commit, within the `<header`>.
It requires rule `type-enum` to be enabled and filled with enums.
When an enum is matched from `commit-types-peakfijn`, the summary of the type will be appended.

### 2. What is the scope of this change?

This question fills the `<scope>`-part of the commit.
It requires rule `scope-empty` to be disabled or not-enforcing empty.
When the scope may be empty, a `--- none ---` option is added to the list.
Also if `scope-enum` is enabled, all defined enums are added to the list.

### 3. Write a short description of the change: (imperative tense, no punctuation)

This question fills the `<subject>`-part of the commit.
_There are no conditions or restrictions to this question._

### 4. Provide a longer description of the change: (press enter to skip)

This question fills the `<body>`-part of the commit.
_There are no conditions or restrictions to this question._

### 5. Provide any (external) references, separated by a space: (press enter to skip)

This question fills the `<footer>`-part of the commit.
_There are no conditions or restrictions to this question._

## Usage

After installing the configuration, you need to update the `package.json` to include a [commitizen config](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly) property.

```json
{
    "config": {
        "commitizen": {
            "path": "cz-chagelog-peakfijn"
        }
    }
}
```

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
