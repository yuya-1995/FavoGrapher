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
                src={`${process.env.NEXT_PUBLIC_API_URL}${post.image}`}
                alt={post.title}
                fill
                style={{ objectFit: "cover", borderRadius: "12px 12px 0 0" }}
                unoptimized
                priority
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
