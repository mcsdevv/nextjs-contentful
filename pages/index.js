import { useEffect, useState } from 'react';
import Head from 'next/head';

function HomePage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getPosts() {
      const res = await fetch('/api/posts/');
      const newPosts = await res.json();
      setPosts([...newPosts]);
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
          ? posts.map(p => <p>{p.fields.initialPost}</p>)
          : 'nope'}
      </h2>
    </>
  );
}

export default HomePage;
