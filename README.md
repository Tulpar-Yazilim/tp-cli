# tp-boilerplate CLI

**tp-boilerplate CLI** is a command-line tool designed to help developers quickly scaffold pages and components in their React Native projects. This tool provides an easy way to create new pages and components with predefined templates, saving time and ensuring consistency across the project.

## Features

- **Create Pages:** Automatically generate a new page in your project using a predefined template.
- **Create Components:** Easily create a new component with associated styles, types, and story files.
- **Customizable File Extensions:** Choose between JavaScript (`.js`) or TypeScript (`.ts`) when generating files.

## Installation

First, clone the repository and navigate to the directory:

```bash
npm i -g react-native-tp-cli
```

## Usage

### Creating a New Page

To create a new page, run the following command:

```bash
tp-boilerplate create <path or name> [action] [options]
```

Action:<br />
-page, --page: To create a page.<br />
-component, --component: To create a component.

Options:<br />
-j, --js: Generate files with .js extension.<br />
-t, --ts: Generate files with .ts extension (default).

Example Page:

```bash
tp-boilerplate create HomePage --page
```

or

```bash
tp-boilerplate create ListPage/AddPage --page
```

To create a new component, run the following command:

Example Component:

```bash
tp-boilerplate create Button --component
```

or

```bash
tp-boilerplate create Button/Text --component
```

This section provides clear instructions on how to use the CLI for creating pages and components, including the available options.

Help Command
To display help information about the available commands and options, use:

```bash
tp-boilerplate --help
```

### Templates

This CLI tool uses predefined templates located in the template/ directory of the project. These templates include:

Pages: Basic page template.

Components: Component template with associated styles, types, and stories.
Customization
If you wish to customize the templates used by this CLI tool, you can modify the files in the template/ directory.

Contributing
Contributions are welcome! If you have suggestions for improving this CLI tool, feel free to open an issue or submit a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for details.
