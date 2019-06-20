import { useEffect, useState } from 'react';
import Head from 'next/head';
import Post from '../components/post';

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
  console.log(posts);
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
      <header>
        <div>
          <img src="/icons/next.svg" />
          <img src="/icons/contentful.svg" />
        </div>
        <h1>Next.js + Contentful</h1>
      </header>
      <hr />
      {posts.length > 0
        ? posts.map(p => (
            <Post
              alt={p.fields.alt}
              date={p.fields.date}
              key={p.fields.title}
              image={p.fields.image}
              title={p.fields.title}
              url={p.fields.url}
            />
          ))
        : null}
      <style jsx>{`
        header {
          height: 9.5em;
          margin-top: 3em;
        }
        img {
          margin-right: 8px;
        }
        hr {
          margin 48px 0;
        }
        @media screen and (max-width: 360px) {
          header {
            height: 6em;
          }
          h1 {
            font-size: 28px;
          }
        }
      `}</style>
    </>
  );
}

export default HomePage;
