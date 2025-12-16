import { PostType } from "@/app/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function getAllPosts() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/posts`;
  const response = await fetch(url, {
    method: "GET",
  });
  const data = await response.json();
  return data;
}

export async function getPostById(id: string): Promise<PostType> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`;
  const response = await fetch(url, {
    method: "GET",
  });
  const data = await response.json();
  return data;
}

export async function getUsers() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/users`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}