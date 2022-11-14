const cagovBuildSystem = require("@cagov/11ty-build-system");

module.exports = function (eleventyConfig) {
  eleventyConfig.htmlTemplateEngine = "njk";

  eleventyConfig.addPlugin(cagovBuildSystem, {
    processors: {
      sass: {
        watch: ["src/css/**/*"],
        output: "_site_dist/index.css",
        minify: true,
        options: {
          file: "src/css/index.scss",
          includePaths: ["./src/css/sass"],
        },
      },
      esbuild: [
        {
          watch: ["src/js/**/*"],
          options: {
            entryPoints: ["src/js/index.js"],
            bundle: true,
            minify: true,
            outfile: "_site_dist/built.js",
          },
        },
      ],
    },
  });

  eleventyConfig.addPassthroughCopy({ "src/img": "img" });
  eleventyConfig.addPassthroughCopy({ "src/js/leaflet.js": "js/leaflet.js" });
  eleventyConfig.addPassthroughCopy({ "src/css/leaflet.css": "css/leaflet.css" });
  eleventyConfig.addPassthroughCopy({ "src/css/fonts": "fonts" });

  eleventyConfig.addFilter("dateformat", function (dateString) {
    let d = new Date(dateString);
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  });

  return {
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "md",
    templateFormats: ["html", "njk", "11ty.js", "md"],
    dir: {
      input: "pages",
      output: "_site",
    },
  };
};
