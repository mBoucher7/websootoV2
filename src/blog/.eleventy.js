export default function(eleventyConfig) {
    eleventyConfig.addShortcode('excerpt', extractExcerpt);

    // This function extracts (returns) the first paragraph from the content
    function extractExcerpt(post) {
        console.log("extrapolate");
        // If no content, return nothing
        if (!post.templateContent) return '';
        // if is some paragraph of content, return it as excerpt
        if (post.templateContext.indexOf('<p>') > 0) {
            let end = post.templateContent.indexOf('</p>');
            return post.templateContent.substring(0, end + 4);
        }
        return post.templateContent;
    };


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
            let cats = p.data.categories;
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


    return {
        dir: {
            input: 'src/blog',
        },
    }
};
