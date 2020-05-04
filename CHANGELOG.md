# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.2] - 2020-05-04

### Added
- End to end testing support via cypress.
- `pages/index.js` for e2e testing. The page loads and renders list items.

### Changed
- `createClient(...)` now **requires** an options argument.
- The sourceNodes hook now uses await/async instead a callback pattern.
- The webpack `package.json` copy transform now uses [Buffer.from](https://nodejs.org/api/buffer.html#buffer_class_method_buffer_from_array) instead of the ctor.
- Unit testing now mocks dependencies to behave more like unit testing.

### Removed
- Site data loading support. All vital information available from the site resource is already known to the plugin config.

## [0.0.1] - 2020-04-23

### Added

- List data loading support
- Site data loading support
- [README.md](README.md) with getting started guidelines.
- Lockup logo (Gatsby+SharePoint)
- Code style files (.eslintrc, .prettierrc)
- Webpack based build supporting cutting edge Javascript

[unreleased]: https://github.com/iteam-consulting/gatsby-source-sharepoint-online/compare/0.0.2...HEAD
[0.0.2]: https://github.com/iteam-consulting/gatsby-source-sharepoint-online/compare/0.0.1...0.0.2
[0.0.1]: https://github.com/iteam-consulting/gatsby-source-sharepoint-online/releases/tag/v0.0.1
