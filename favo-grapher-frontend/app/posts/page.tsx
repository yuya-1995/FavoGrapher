import styles from "@/app/styles/page.module.css";
import { getAllPosts } from "@/app/utils/api";
import type { PostType } from "@/app/utils/types";
import Link from "next/link";

export default async function Home() {

  const posts: PostType[] = await getAllPosts();

  return (
    <div className={styles.container}>
      <h1>FavoGrapher</h1>
      <ul className={styles.postList}>
        {posts.map((post: PostType) => (
          <Link href={`/posts/${post.id}`} key={post.id}>
            <li className={styles.post} key={post.id}>
              <h2 className={styles.title}>{post.title}</h2>
            <p className={styles.author}>By {post.author}</p>
          </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
