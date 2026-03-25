const { format } = require("date-fns");

/**
 * Blog Functions
 */

function extractExcerpt(post) {
  let content = post.content || '';

  content = content.replace(/<[^>]+>/g, ''); // Remove HTML tags

  if (content.length > 160) {
    return content.substring(0, 160) + '...'; // Truncate to 160 characters and add ellipsis
  }
  return content;
}

// eleventyConfig.addFilter("excerpt", function(post) {
//   if (!post.templateContent) return '';

//   let text = post.templateContent.replace(/<[^>]+>/g, ''); // Remove HTML tags

//   if (text.length > 160) {
//     return text.substring(0, 160) + '...'; // Truncate to 160 characters and add ellipsis
//   }
//   return text;
// });


module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addFilter("excerpt", extractExcerpt);
  // This function returns a collection of unique categories from all posts
  console.log("precollection");
  eleventyConfig.addCollection("categories", function(collectionAPI) {
    console.log("collectionStart");
    // Create a Set to store unique categories
    let categories = new Set();
    // Get all posts and filter them by tag 'post'
    let posts = collectionAPI.getFilteredByTag('post');
    // Iterate through each post and extract categories
    posts.forEach(p => {
      let cats = p.data.categories || [];
      //Add each category to the Set
      cats.forEach(c => categories.add(c));
    });
    // Convert Set to Array and return it
    console.log("Generated categories: ", Array.from(categories));
    return Array.from(categories);
  });
  console.log("postcollection");



  // This function filters posts by a specific category/tag
  eleventyConfig.addFilter("filterByCategory", function(posts, cat) {
    // make case insensitive
    if (!posts || !cat) return [];
    cat = cat.toLowerCase();   //specific category searching for
    let result = posts.filter(p => {
      let cats = (p.data.categories || []).map(s => s.toLowerCase());
      //return all posts that match the given category
      return cats.includes(cat);
    });
    return result;
  });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return format(dateObj, "MMM dd, yyyy"); // e.g., Apr 03, 2025
  });




  // Final function? (upload stuff ig)
  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
