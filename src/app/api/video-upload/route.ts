import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { v2 as cloudinary } from 'cloudinary';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();
  // Configuration
    cloudinary.config({ 
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
    });

    interface CloudinaryUploadResult {
        public_id: string;
        bytes: number;
        duration?: number;
        [key: string]: any;
    }


export async function POST(request: NextRequest) {
    const { userId } = auth();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
        !process.env.CLOUDINARY_API_KEY ||
        !process.env.CLOUDINARY_API_SECRET
    ) {
        return NextResponse.json({ error: 'Cloudinary configuration error' }, { status: 500 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;
        //title
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const originalSize = formData.get('originalSize') as string;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const bytes=  await file.arrayBuffer()
        const buffer = Buffer.from(bytes);
        const uploadResult: CloudinaryUploadResult = await new Promise((resolve, reject) => {
           const uploadStrem = cloudinary.uploader.upload_stream(
            {
                resource_type: 'video',
                folder: "video-uploads",
                transformation: [
                    { quality: 'auto', fetch_format: 'mp4' }
                ],
               
                
                }, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result as CloudinaryUploadResult);
                }
            })
            uploadStrem.end(buffer);
        });

        const video = await prisma.video.create({
            data: {
                title: title,
                description: description,
                originalSize: originalSize,
                publicId: uploadResult.public_id,
                comressedSize: String(uploadResult.bytes),
                duration: uploadResult.duration || 0
            },
        });

        return NextResponse.json({ video }, { status: 200});
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ error: 'Error uploading video' }, { status: 500 });
    }
}