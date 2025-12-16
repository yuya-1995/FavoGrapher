export interface PostType {
    id: string,
    user_id: string,
    title: string,
    content: string,
    author: string,
    delete_flg: string,
    created_at: string
}

export interface UserType {
    id: string,
    title: string,
    content: string,
    author: string,
    user_id: string,
    delete_flg: string,
    created_at: string
}