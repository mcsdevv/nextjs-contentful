import { useEffect, useState } from 'react';
import Head from 'next/head';

const client = require('contentful').createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN
});

function HomePage() {
  async function fetchContentTypes() {
    const types = await client.getContentTypes();
    if (types.items) return types.items;
    console.log('Error getting Content Types.');
  }
  async function fetchEntriesForContentType(contentType) {
    const entries = await client.getEntries({
      content_type: contentType.sys.id
    });
    if (entries.items) return entries.items;
    console.log(`Error getting Entries for ${contentType.name}.`);
  }
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getPosts() {
      const contentTypes = await fetchContentTypes();
      const allPosts = await fetchEntriesForContentType(contentTypes[0]);
      setPosts([...allPosts]);
    }
    getPosts();
  }, []);
  return (
    <>
      <Head>
        <title>Next.js + Contentful</title>
        <link
          rel="stylesheet"
          href="https://css.zeit.sh/v1.css"
          type="text/css"
        />
      </Head>
      <h1>Next.js + Contentful</h1>
      <h2>
        Have we got any posts?{' '}
        {posts.length > 0
          ? posts.map(p => {
              return (
                <div>
                  <h2>{p.fields.content}</h2>
                  <p>{p.fields.time}</p>
                </div>
              );
            })
          : 'No posts!'}
      </h2>
    </>
  );
}

export default HomePage;
