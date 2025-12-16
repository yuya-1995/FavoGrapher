export interface PostType {
    id: string,
    image: string,
    user_id: string,
    title: string,
    content: string,
    author: string,
    delete_flg: string,
    created_at: string
}

export interface UserType {
    id: string,
    image: string,
    title: string,
    content: string,
    author: string,
    user_id: string,
    delete_flg: string,
    created_at: string
}