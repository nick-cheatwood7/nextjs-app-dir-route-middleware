import { posts } from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string }}) {
    // parse the post id from the URL
    const postId = parseInt(params.id);

    // lookup post by id
    const postById = posts.find((post) => post.id === postId);
    if(!postById) {
        return NextResponse.json({ message: "Post not found."}, { status: 404 });
    }

    // send back post
    return NextResponse.json({ ...postById }, { status: 200 });
}