const path = require("path");
const glob = require('glob');

const docs = path.resolve(__dirname);
const root = docs.replace("/docs", "");

const customWebpack = require("./webpack");

module.exports = {
  title: "FINPAL - documentation",
  sections: [
    {
      name: "Components",
      description: "Documentation components",
      components: function () {
        return glob
          .sync(path.resolve(root, "components/**/*.tsx"))
          .filter(function (module) {
            return /\/[A-Z]\w*\.tsx$/.test(module);
          });
      },
    },
    {
      name: "Pages",
      description: "Page documentation",
      components: function () {
        return glob
          .sync(path.resolve(root, "pages/**/*.tsx"))
          .filter(function (module) {
            return /\/[\_a-zA-Z]\w*\.tsx$/.test(module);
          });
      },
    },
  ],
  pagePerSection: true,
  resolver: require("react-docgen").resolver.findAllComponentDefinitions,
  propsParser: require("react-docgen-typescript").withDefaultConfig({
    propFilter: { skipPropsWithoutDoc: false },
  }).parse,
  configureServer(app) {
    app.get("/static/*", (req, res) => {
      const file = req.originalUrl.split("?")[0];
      res.status(200).sendFile(`${root}${file}`);
    });
  },
  ...customWebpack,
};
