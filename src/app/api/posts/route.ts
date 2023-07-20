import { posts } from "@/db";
import { validatePayload } from "@/lib/middleware";
import { createUpdatePostSchema } from "@/schema";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    // return all posts
    return NextResponse.json(posts, { status: 200 });
}

export async function POST(request: Request) {
    // validate payload
    const body = await validatePayload(createUpdatePostSchema, request);
    if(body instanceof NextResponse) {
        return body;
    }

    // create a post
    const post = { id: posts.length + 1 , ...body, }
    posts.push(post)
    return NextResponse.json({ ...post }, { status: 201 })
}