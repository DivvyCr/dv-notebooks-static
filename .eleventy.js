const navigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function (eleventyConfig) {
    eleventyConfig.ignores.add("README.md");

    eleventyConfig.addPlugin(navigationPlugin);

    eleventyConfig.addCollection("tags", (collections) => {
        const allTags = collections.getAll()
            .reduce((tags, item) => tags.concat(...item.data.tags), [])
            .sort();
        return Array.from(new Set(allTags)); // Remove duplicates.
    });

    // Note: setTemplateFormats must NOT overlap any files in addPassthoughCopy
    eleventyConfig.setTemplateFormats("njk,md");
    eleventyConfig.addPassthroughCopy("src/_resources/*.css");
    eleventyConfig.addPassthroughCopy("src/_resources/*.js");

    return {
        dir: {
            input: "src",
            output: "out",
        },
        passthroughCopyFile: true,
    };
};
