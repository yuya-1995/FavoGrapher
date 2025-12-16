export interface PostType {
    id: string;
    image: string | undefined,
    title: string;
    content: string;
    author: string;
    user_id: string;
    delete_flg: string; // 論理削除
    created_at: string;
}