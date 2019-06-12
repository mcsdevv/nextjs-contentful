const contentful = require('contentful');

const client = contentful.createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN
});

module.exports = async (req, res) => {
  const contentTypes = await fetchContentTypes();
  const posts = await fetchEntriesForContentType(contentTypes[0]);

  res.end(JSON.stringify([...posts]));
};

// Load all Content Types in your space from Contentful
function fetchContentTypes() {
  return client
    .getContentTypes()
    .then(response => response.items)
    .catch(error => {
      console.log('Error occurred while fetching Content Types');
      console.error(error);
    });
}

// Load all entries for a given Content Type from Contentful
function fetchEntriesForContentType(contentType) {
  return client
    .getEntries({
      content_type: contentType.sys.id
    })
    .then(response => response.items)
    .catch(error => {
      console.log(
        chalk.red(
          `\nError occurred while fetching Entries for ${chalk.cyan(
            contentType.name
          )}:`
        )
      );
      console.error(error);
    });
}
