import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import Head from 'next/head';
import Post from '../components/Post';
import { sortByDate } from '../utils';

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Dev Blog</title>
      </Head>
      <div className='posts'>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  );
}
export async function getStaticProps() {
  //get files from the post dir
  const files = fs.readdirSync(path.join('posts'));
  // get slug and frontmatter from posts
  const posts = files.map((fileName) => {
    // create a slug
    const slug = fileName.replace('.md', '');
    //get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', fileName),
      'utf-8'
    );
    const { data: frontmatter } = matter(markdownWithMeta);
    return { slug, frontmatter };
  });
  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  };
}
