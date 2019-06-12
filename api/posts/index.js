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

async function fetchContentTypes() {
  const types = await client.getContentTypes();
  if (types.items) return types.items;
  console.log('Error getting Content Types.');
}

async function fetchEntriesForContentType(contentType) {
  const entries = await client.getEntries({ content_type: contentType.sys.id });
  if (entries.items) return entries.items;
  console.log(`Error getting Entries for ${contentType.name}`);
  console.error(error);
}
