function extractExcerpt(post) {
  if(!post.templateContent) return '';
  if(post.templateContent.indexOf('</p>') > 0) {
    let end = post.templateContent.indexOf('</p>');
    return post.templateContent.substr(0, end+4);
  }
  return post.templateContent;
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addShortcode('excerpt', post => extractExcerpt(post));
  
  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
