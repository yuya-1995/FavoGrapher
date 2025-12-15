import { PostType } from "@/app/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function getAllPosts() {
  const url = `http://localhost:5000/posts`;
  const response = await fetch(url, {
    method: "GET",
  });
  const data = await response.json();
  return data;
}

export async function getPostById(id: string): Promise<PostType> {
  const url = `http://localhost:5000/posts/${id}`;
  const response = await fetch(url, {
    method: "GET",
  });
  const data = await response.json();
  return data;
}

export async function getUsers() {
  const url = `http://localhost:5000/users`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}