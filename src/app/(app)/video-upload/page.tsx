"use client"
import React, {useState} from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';

function VideoUpload() {
    const [file, setFile] = useState<File | null>(null);
    //title description isUploding
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const router = useRouter();

    //max file size of 60 mb
    const maxFileSize = 60 * 1024 * 1024;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) {
            toast.error('Please select a file');
            return;
        }
        if (file.size > maxFileSize) {
            toast.error('File size too large');
            return;
        }
        if (!title || !description) {
            toast.error('Please enter a title and description');
            return;
        }
        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('description', description);
        formData.append("originalSize", file.size.toString());
        try {
            const response = await axios.post('/api/video-upload', formData, );
            if (response.status === 200) {
                toast.success('Video uploaded successfully');
                router.push('/');
            } else {
                toast.error('Error uploading video');
            }
        } catch (error) {
            toast.error('Error uploading video');
        } finally {
            setIsUploading(false);
        }
    }
    




  return (
    <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Upload Video</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
              title='title'
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                title='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea textarea-bordered w-full"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Video File</span>
              </label>
              <input
              title='upload video'
                type="file"
                accept="video/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="file-input file-input-bordered w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Upload Video"}
            </button>
          </form>
        </div>
  )
}

export default VideoUpload