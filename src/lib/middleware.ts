import { NextResponse } from "next/server";
import { AnyZodObject, ZodError, z } from "zod";

export async function validatePayload<T extends AnyZodObject>(schema: T, req: Request) {
    try {
        const payload = await req.json()
        const parsed = schema.parse(payload);
        // parse complete, continue request
        // return NextResponse.next();
        return parsed as z.infer<T>;
    } catch (error) {
        if(error instanceof ZodError) {
            // return response with zod validation things
            return NextResponse.json({
                code: error.errors[0].code,
                path: error.errors[0].path,
                message: error.errors[0].message
            }, { status: 400 })
        }
        if(error instanceof Error) {
            console.error('❌ Parse error:', error.message);
        }
        // generic error
        return NextResponse.json({ message: "Unable to parse payload." }, { status: 500 });
    }
}