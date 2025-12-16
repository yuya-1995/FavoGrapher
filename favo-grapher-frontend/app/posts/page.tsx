import styles from "@/app/styles/page.module.css";
import { getAllPosts } from "@/app/api/posts/route";
import type { PostType } from "@/app/types/types";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {

  const posts: PostType[] = await getAllPosts();

  return (
    <div className={styles.container}>
      <ul className={styles.postList}>
        {posts.map((post) => (
          <Link href={`/posts/${post.id}`} key={post.id}>
            <li className={styles.post}>
              <Image
                src={`https://picsum.photos/800/800?random=${post.id}`}
                alt=""
                fill
                sizes="(max-width: 768px) 33vw, 300px"
                className={styles.image}
              />
              <h2 className={styles.title}>{post.title}</h2>
              <p className={styles.author}>By {post.author}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
