#!/usr/bin/env node

const { Command } = require("commander");
const fs = require("fs-extra");
const path = require("path");

const program = new Command();

let fileExtension = ".ts"; // Default .ts

//#region PAGE
function createPage(pagePath) {
  /* const jsTemplatePath = path.join(__dirname, "templates", "pages", "TemplatePage.jsx"); //prettier-ignore
  const tsTemplatePath = path.join(__dirname, "templates", "pages", "TemplatePage.tsx"); //prettier-ignore */
  let pageTemplateDir;
  if (fileExtension === ".ts") {
    pageTemplateDir = path.join(__dirname, "templates", "pages", "ts", "TemplatePage"); //prettier-ignore
  } else if (fileExtension === ".js") {
    pageTemplateDir = path.join(__dirname, "templates", "components", "js", "TemplatePage"); //prettier-ignore
  } else {
    console.log("Faulty flag. Try with js or ts");
  }

  let targetPath;

  if (pagePath.startsWith("pages/")) {
    targetPath = pagePath;
  } else {
    targetPath = path.join("pages", pagePath);
  }

  const pagesDir = path.join(process.cwd(), "src", targetPath);
  const pageName = path.basename(pagePath);

  if (fs.existsSync(pagesDir)) {
    console.error(`Error: ${targetPath} already exists.`);
    process.exit(1);
  }

  fs.ensureDirSync(pagesDir);

  // Create index.tsx or index.jsx
  const pageFilePath = path.join(pagesDir, `index${fileExtension}x`);
  const templateContent = fs.readFileSync(`${pageTemplateDir}/index${fileExtension}x`, "utf-8"); //prettier-ignore
  const pageContent = templateContent.replace(/TemplatePage/g, pageName);
  fs.writeFileSync(pageFilePath, pageContent);

  // Create styles.ts or styles.js
  const stylesFilePath = path.join(pagesDir, `styles${fileExtension}`);
  const stylseTemplateContent = fs.readFileSync(`${pageTemplateDir}/styles${fileExtension}`, "utf-8"); //prettier-ignore
  fs.writeFileSync(stylesFilePath, stylseTemplateContent);

  console.log(
    `The page ${pageName} was created in the directory src/${targetPath}/.`
  );

  updateIndexFile(targetPath);
}

function updateIndexFile(pagePath) {
  const indexFilePath = path.join(process.cwd(), "src", "pages", `index${fileExtension}`); //prettier-ignore
  const pageName = path.basename(pagePath);
  const importPath = `./${pagePath
    .replace("pages/", "")
    .split(path.sep)
    .join("/")}`;

  let indexFileContent = "";

  if (fs.existsSync(indexFilePath)) {
    indexFileContent = fs.readFileSync(indexFilePath, "utf-8");
  } else {
    indexFileContent = `// Automatically generated index file\n\n`;
  }

  const newImport = `import ${pageName} from '${importPath}';\n`;
  const newExport = `${pageName},\n`;

  if (!indexFileContent.includes(newImport)) {
    indexFileContent = `${newImport}${indexFileContent}`;
  }

  const exportStatement = "export {";
  if (!indexFileContent.includes(exportStatement)) {
    indexFileContent += `\n${exportStatement}\n${newExport}};\n`;
  } else {
    const exportIndex =
      indexFileContent.indexOf(exportStatement) + exportStatement.length;
    indexFileContent = `${indexFileContent.slice(
      0,
      exportIndex
    )}\n${newExport}${indexFileContent.slice(exportIndex)}`;
  }

  fs.writeFileSync(indexFilePath, indexFileContent);
}
//#endregion

//#region COMPONENT
function createComponent(componentPath) {
  let componentTemplateDir;
  if (fileExtension === ".ts") {
    componentTemplateDir = path.join(__dirname, "templates", "components", "ts", "TemplateComponent"); //prettier-ignore
  } else if (fileExtension === ".js") {
    componentTemplateDir = path.join(__dirname, "templates", "components", "js", "TemplateComponent"); //prettier-ignore
  } else {
    console.log("Faulty flag. Try with js or ts");
  }
  let targetPath;

  if (componentPath.startsWith("components/")) {
    targetPath = componentPath;
  } else {
    targetPath = path.join("components", componentPath);
  }

  const componentsDir = path.join(process.cwd(), "src", targetPath);
  const componentName = path.basename(componentPath);

  if (fs.existsSync(componentsDir)) {
    console.error(`Error: ${targetPath} already exists.`);
    process.exit(1);
  }

  fs.ensureDirSync(componentsDir);

  // Create index.tsx
  const indexFilePath = path.join(componentsDir, `index${fileExtension}x`);
  const indexTemplateContent = fs.readFileSync(
    path.join(componentTemplateDir, `index${fileExtension}x`),
    "utf-8"
  );
  const indexContent = indexTemplateContent.replace(
    /TemplateComponent/g,
    componentName
  );
  fs.writeFileSync(indexFilePath, indexContent);

  // Create styles.ts
  const stylesFilePath = path.join(componentsDir, `styles${fileExtension}`);
  const stylesTemplateContent = fs.readFileSync(
    path.join(componentTemplateDir, "styles.ts"),
    "utf-8"
  );
  fs.writeFileSync(stylesFilePath, stylesTemplateContent);

  if (fileExtension === ".ts") {
    // Create __stories__/TemplateComponent.stories.tsx
    const storiesDir = path.join(componentsDir, "__stories__");
    fs.ensureDirSync(storiesDir);

    const storiesFilePath = path.join(storiesDir, `${componentName}.stories${fileExtension}x`); //prettier-ignore
    const storiesTemplatePath = path.join(componentTemplateDir, "__stories__", "TemplateComponent.stories.tsx"); //prettier-ignore
    const storiesTemplateContent = fs.readFileSync(
      storiesTemplatePath,
      "utf-8"
    );
    const storiesContent = storiesTemplateContent.replace(/TemplateComponent/g, componentName); //prettier-ignore
    fs.writeFileSync(storiesFilePath, storiesContent);

    // Create type.d.ts
    const typeFilePath = path.join(componentsDir, `type.d${fileExtension}`);
    const typeTemplateContent = fs.readFileSync(
      path.join(componentTemplateDir, "type.d.ts"),
      "utf-8"
    );
    const typeContent = typeTemplateContent.replace(
      /TemplateComponent/g,
      componentName
    );
    fs.writeFileSync(typeFilePath, typeContent);
  }

  console.log(
    `The ${componentName} component was created in the src/${targetPath}/ directory.`
  );

  updateComponentIndexFile(targetPath);
}

function updateComponentIndexFile(componentPath) {
  const indexFilePath = path.join(process.cwd(), "src", "components", `index${fileExtension}`); //prettier-ignore
  const componentName = path.basename(componentPath);
  const importPath = `./${componentPath
    .replace("components/", "")
    .split(path.sep)
    .join("/")}`;

  let indexFileContent = "";

  if (fs.existsSync(indexFilePath)) {
    indexFileContent = fs.readFileSync(indexFilePath, "utf-8");
  } else {
    indexFileContent = `// Automatically generated index file\n\n`;
  }

  const newImport = `import ${componentName} from '${importPath}';\n`;
  const newExport = `    ${componentName},\n`;

  if (!indexFileContent.includes(newImport)) {
    indexFileContent = `${newImport}${indexFileContent}`;
  }

  const exportStatement = "export {";
  if (!indexFileContent.includes(exportStatement)) {
    indexFileContent += `\n${exportStatement}\n${newExport}};\n`;
  } else {
    const exportIndex =
      indexFileContent.indexOf(exportStatement) + exportStatement.length;
    indexFileContent = `${indexFileContent.slice(
      0,
      exportIndex
    )}\n${newExport}${indexFileContent.slice(exportIndex)}`;
  }

  fs.writeFileSync(indexFilePath, indexFileContent);
}

//#endregion

function commandToFunction(command, pagePath) {
  switch (command) {
    case "page":
      return createPage(pagePath);
    case "component":
      return createComponent(pagePath);
  }
}

program
  .name("CLI for ReactNative Boilerplate")
  .description("CLI to some ReactNative string utilities")
  .version("1.0.0");

program
  .command("create <pagePath>")
  .description("Yeni bir sayfa oluştur")
  .option("-page --page", "Create page file")
  .option("-component, --component", "Create component file")
  .option("-j, --js", "Create container files as .js")
  .option("-t, --ts", "Create container files as .ts")
  .action((pagePath, options) => {
    if (options?.component || options?.page) {
      fileExtension = options.js ? ".js" : options.ts ? ".ts" : fileExtension;
      const commandString = options?.component
        ? "component"
        : options.page
        ? "page"
        : "";
      commandToFunction(commandString, pagePath);
    } else {
      console.log(
        "Please specify whether you want to create a component or a page."
      );
    }
  });

program.parse(process.argv);
