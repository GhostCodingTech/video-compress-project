import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){

    const { searchParams } = new URL(req.url); 
    const libraryId = process.env.LIBRARY_ID;
    const uniqueId = searchParams.get('uniqueId');

    if(!libraryId || !uniqueId){
        return NextResponse.json({ error: 'Missing libraryId or uniqueId' }, { status: 400 });
    }

    try {
        const response = await axios.post(`https://video.bunnycdn.com/library/${libraryId}/collections`,
            {
                name: uniqueId
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    AccessKey: process.env.BUNNY_API_KEY!,
                },
            }
        );

        const collectionId = response.data.guid;
        return NextResponse.json({ collectionId}, { status: 200 });
    } catch (error) {
        console.error('Error creating collection:', error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}