"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image'; // Assuming articles might have images

interface Article {
    id: number;
    title: string;
    content: string;
    image_url?: string;
    author?: string;
    published_date: string; // Adjust type if necessary
}

interface ArticleAnalytics {
    totalArticles: number;
}

export default function AdminArticlesPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [analytics, setAnalytics] = useState<ArticleAnalytics>({ totalArticles: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        author: '',
    });
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [formLoading, setFormLoading] = useState(false);
    const [formMessage, setFormMessage] = useState<string | null>(null);
    const [editingArticleId, setEditingArticleId] = useState<number | null>(null);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            setLoading(true);
            const response = await axios.get<Article[]>('/api/admin/components/articles');
            setArticles(response.data);
            setAnalytics({ totalArticles: response.data.length });
        } catch (err) {
            console.error('Error fetching articles:', err);
            setError('Failed to load articles.');
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormLoading(true);
        setFormMessage(null);

        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('content', formData.content);
        formDataToSend.append('author', formData.author);
        if (selectedImage) {
            formDataToSend.append('image', selectedImage);
        }

        const url = editingArticleId ? `/api/admin/components/articles` : '/api/admin/components/articles';
        const method = editingArticleId ? axios.put : axios.post;

        if (editingArticleId) {
            formDataToSend.append('id', editingArticleId.toString());
        }

        try {
            await method(url, formDataToSend, {
                 headers: {
                     'Content-Type': 'multipart/form-data',
                 },
            });
            setFormMessage(`Article ${editingArticleId ? 'updated' : 'created'} successfully!`);
            setFormData({ title: '', content: '', author: '' });
            setSelectedImage(null);
            setPreviewUrl('');
            setEditingArticleId(null); // Clear editing state
            fetchArticles(); // Refresh the list
            setShowForm(false); // Close the modal
        } catch (err) {
            console.error(`Error ${editingArticleId ? 'updating' : 'creating'} article:`, err);
            setFormMessage(`Failed to ${editingArticleId ? 'update' : 'create'} article.`);
        } finally {
            setFormLoading(false);
        }
    };

    const handleDeleteArticle = async (id: number) => {
        if (confirm('Are you sure you want to delete this article?')) {
            try {
                await axios.delete('/api/admin/components/articles', { data: { id } });
                fetchArticles(); // Refresh the list
            } catch (err) {
                console.error('Error deleting article:', err);
                alert('Failed to delete article.');
            }
        }
    };

    const handleEditArticle = (article: Article) => {
        setEditingArticleId(article.id);
        setFormData({ title: article.title, content: article.content, author: article.author || '' });
        // For images, you might want to display the current image or offer to upload a new one
        // setPreviewUrl(article.image_url || ''); // If you want to show current image
        setSelectedImage(null); // Clear selected new image
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingArticleId(null); // Clear editing state when closing form
        setFormData({ title: '', content: '', author: '' });
        setSelectedImage(null);
        setPreviewUrl('');
        setFormMessage(null); // Clear form message on close
    };

    if (loading) {
        return <div className="text-center py-20 text-white">Loading articles...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-500">{error}</div>;
    }

    return (
        <main className="flex-grow max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 admin-lava-bg">
            {/* Analytics Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-800 p-6 rounded-lg lava-box">
                    <h3 className="text-xl font-semibold mb-2 text-white lava-text-gradient">Total Articles</h3>
                    <p className="text-3xl font-bold text-orange-500 lava-text-gradient">{analytics.totalArticles}</p>
                </div>
                {/* Add more analytics here if needed */}
            </div>

            {/* Add New Article Button */}
            <div className="mb-8">
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                    Add New Article
                </button>
            </div>

            {/* Articles List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                    <div key={article.id} className="bg-gray-800 rounded-lg p-6 lava-box">
                         {article.image_url && (
                             <Image
                                 src={article.image_url}
                                 alt={article.title}
                                 width={300}
                                 height={200}
                                 objectFit="cover"
                                 className="rounded-md mb-4"
                             />
                         )}
                        <h3 className="font-semibold text-white mb-2 lava-text-gradient">{article.title}</h3>
                        <p className="text-gray-300 text-sm mb-4">{article.content.substring(0, 150)}...</p>
                        <div className="flex justify-between items-center text-gray-400 text-sm">
                            <span>Author: {article.author || 'N/A'}</span>
                            <span>Published: {new Date(article.published_date).toLocaleDateString()}</span>
                        </div>
                         <div className="mt-4 flex justify-end gap-2">
                             <button
                                 onClick={() => handleEditArticle(article)}
                                 className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 text-white text-sm"
                             >
                                 Edit
                             </button>
                             <button
                                 onClick={() => handleDeleteArticle(article.id)}
                                 className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 text-white text-sm"
                             >
                                 Delete
                             </button>
                         </div>
                    </div>
                ))}
            </div>

            {/* Add/Edit Article Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl lava-box">
                        <h2 className="text-2xl font-bold text-white mb-6 lava-text-gradient">{editingArticleId ? 'Edit Article' : 'Create New Article'}</h2>
                        {formMessage && <div className={`mb-4 text-center ${formMessage.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>{formMessage}</div>}
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white border border-gray-600 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">Content</label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white border border-gray-600 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                                    rows={6}
                                    required
                                />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-white mb-2">Image (Optional)</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white border border-gray-600 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                                />
                                {previewUrl && (
                                    <div className="mt-2">
                                        <Image
                                            src={previewUrl}
                                            alt="Preview"
                                            width={100}
                                            height={100}
                                            className="rounded-md object-cover"
                                        />
                                    </div>
                                )}
                                {/* Optionally display current image if editing */}
                                {!selectedImage && editingArticleId && articles.find(a => a.id === editingArticleId)?.image_url && (
                                     <div className="mt-2">
                                         <Image
                                             src={articles.find(a => a.id === editingArticleId)!.image_url!}
                                             alt="Current Image"
                                             width={100}
                                             height={100}
                                             className="rounded-md object-cover"
                                         />
                                     </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">Author (Optional)</label>
                                <input
                                    type="text"
                                    value={formData.author}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                    className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white border border-gray-600 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                                />
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    type="button"
                                    onClick={handleCloseForm}
                                    className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 text-white"
                                    disabled={formLoading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-orange-500 rounded-lg hover:bg-orange-600 text-white"
                                    disabled={formLoading}
                                >
                                    {formLoading ? (editingArticleId ? 'Updating...' : 'Creating...') : (editingArticleId ? 'Save Changes' : 'Create Article')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
} 