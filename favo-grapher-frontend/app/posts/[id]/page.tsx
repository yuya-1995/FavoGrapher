import React from "react";
import styles from "@/app/styles/page.module.css";
import { getPostById } from "@/app/api/posts/route";
import { PostType } from "@/app/types/types";
import Image from "next/image";

type Props = {
  params: {
    id: string;
  };
};

export default async function PostPage({ params }: Props) {
  const resolvedParams = await params; // 仕様変更
  const post: PostType = await getPostById(resolvedParams.id);
  return (
    <div className={styles.container} id={post.id}>
        {/* 画像 */}
        {post.image && (
          <div className={styles.detailImageWrapper}>
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}${post.image}`} // 画像URL
              alt={post.title}
              width={800}       // 元画像サイズに合わせて固定
              height={800}      // 元画像サイズに合わせて固定
              style={{
                width: "100%",  // 親要素幅に合わせる
                height: "auto", // 縦横比を維持
                borderRadius: "12px",
              }}
              priority
              unoptimized
            />
          </div>
        )}
        <h1 className={styles.detailTitle}>{post.title}</h1>
        <p className={styles.content}>{post.content}</p>
        <p className={styles.meta}>{post.author}</p>
        <p className={styles.meta}>{post.created_at}</p>
    </div>
  );
}