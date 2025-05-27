"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

interface Article {
    id: number;
    title: string;
    content: string;
    image_url?: string;
    author?: string;
    published_date: string;
    views?: number;
}

export default function ArticlePage({ params }: { params: { id: string } }) {
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get<Article>(`/api/articles/${params.id}`);
                setArticle(response.data);
            } catch (err) {
                console.error('Error fetching article:', err);
                setError('Failed to load article.');
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-xl">Loading article...</div>
            </div>
        );
    }

    if (error || !article) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-xl text-red-500">{error || 'Article not found'}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white py-20">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{
                    background: 'linear-gradient(to right, #FF8C00, #FF4500, #FFD700)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 15px rgba(255, 140, 0, 0.3)'
                }}>
                    {article.title}
                </h1>

                <div className="flex items-center gap-4 mb-8 text-gray-400">
                    {article.author && (
                        <div className="flex items-center gap-2">
                            <span className="text-orange-500">By</span>
                            <span>{article.author}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <span className="text-orange-500">Published</span>
                        <span>{new Date(article.published_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-orange-500">Views</span>
                        <span>{article.views || 0}</span>
                    </div>
                </div>

                {article.image_url && (
                    <div className="mb-8 rounded-xl overflow-hidden">
                        <Image
                            src={article.image_url?.startsWith('http') ? article.image_url :
                                article.image_url?.startsWith('/') ? article.image_url :
                                    '/images/articles/default-article-image.png'}
                            alt={article.title}
                            width={800}
                            height={400}
                            className="w-full h-auto object-cover"
                            unoptimized={true}
                        />
                    </div>
                )}

                <div className="prose prose-invert max-w-none">
                    <div className="text-lg leading-relaxed whitespace-pre-wrap">
                        {article.content}
                    </div>
                </div>
            </div>
        </div>
    );
} 