# Commit Types - Peakfijn

All commit types used by [Peakfijn](https://peakfijn.nl/) conventions.
It's mostly based on [commitizen's commit types](https://github.com/commitizen/conventional-commit-types) but includes a release type.
This release type is used to calculate the next semantic version number by commits.

## Types

The types, listed below, are allowed and defined with a distinctive meaning. 
The order of the types is intentional; you can use this as a top-to-down-guide.

type              | release | summary
---               | ---     | ---
**feature**       | `minor` | Creating a feature in business logic
**fix**           | `patch` | Fixing an issue in business logic 
**test**          | `patch` | Modifying a test in business logic
**performance**   | `patch` | Improving the performance of business logic
**documentation** | `patch` | Adding new or modifying existing documentation anywhere
**pipeline**      | -       | Changing behavior within the automated environment
**style**         | -       | Updating code without changing the meaning of it
**refactor**      | `patch` | Updating code and changing the meaning of it
**release**       | -       | Modifying all files required to define a new release version
**chore**         | `patch` | Anything that does not belong to a previous type

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
