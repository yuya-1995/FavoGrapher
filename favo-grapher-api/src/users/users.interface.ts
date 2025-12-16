export interface UserType {
      id: string; // Google 固有ID
      user_id: string;
      name: string;
      introduction: string;
      email?: string;
      image?: string;
      delete_flg: string; // 論理削除
      created_at: string; 
}