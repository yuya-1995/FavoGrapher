import React from "react";
import styles from "@/app/styles/page.module.css";
import { getPostById } from "@/app/utils/api";
import { PostType } from "@/app/utils/types";

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
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.content}>{post.content}</p>
        <p className={styles.meta}>{post.author}</p>
        <p className={styles.meta}>{post.createdAt}</p>
    </div>
  );
}