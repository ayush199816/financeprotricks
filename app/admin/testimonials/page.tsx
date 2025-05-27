"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';

interface Testimonial {
    id: number;
    name: string;
    profession: string;
    comment: string;
    imgSrc: string;
    display_order: number;
    created_at: string;
}

interface Analytics {
    totalTestimonials: number;
    recentTestimonials: number;
    averageLength: number;
}

export default function AdminTestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [analytics, setAnalytics] = useState<Analytics>({
        totalTestimonials: 0,
        recentTestimonials: 0,
        averageLength: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        profession: '',
        comment: '',
        display_order: 0
    });
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [formLoading, setFormLoading] = useState(false);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const response = await axios.get<Testimonial[]>('/api/testimonials');
            setTestimonials(response.data);
            
            // Calculate analytics
            const total = response.data.length;
            const recent = response.data.filter(t => {
                const created = new Date(t.created_at);
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                return created >= thirtyDaysAgo;
            }).length;
            const avgLength = response.data.reduce((acc, t) => acc + t.comment.length, 0) / total;

            setAnalytics({
                totalTestimonials: total,
                recentTestimonials: recent,
                averageLength: Math.round(avgLength)
            });
        } catch (err) {
            console.error('Error fetching testimonials:', err);
            setError('Failed to load testimonials.');
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setFormLoading(true);
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('profession', formData.profession);
            formDataToSend.append('comment', formData.comment);
            formDataToSend.append('display_order', formData.display_order.toString());
            if (selectedImage) {
                formDataToSend.append('image', selectedImage);
            }

            await axios.post('/api/testimonials', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setShowForm(false);
            setFormData({ name: '', profession: '', comment: '', display_order: 0 });
            setSelectedImage(null);
            setPreviewUrl('');
            setFormLoading(false);
            fetchTestimonials();
        } catch (err) {
            console.error('Error creating testimonial:', err);
            alert('Failed to create testimonial');
            setFormLoading(false);
        }
    };

    const handleDeleteTestimonial = async (id: number) => {
        if (confirm('Are you sure you want to delete this testimonial?')) {
            try {
                // Assuming a DELETE endpoint for testimonials like /api/testimonials/[id]
                await axios.delete(`/api/testimonials/${id}`);
                fetchTestimonials(); // Refresh the list
            } catch (err) {
                console.error('Error deleting testimonial:', err);
                alert('Failed to delete testimonial.');
            }
        }
    };

    if (loading) {
        return <div className="text-center py-20">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-500">{error}</div>;
    }

    return (
        <main className="flex-grow max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 admin-lava-bg">
            {/* Analytics Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-800 p-6 rounded-lg lava-box">
                    <h3 className="text-xl font-semibold mb-2 lava-text-gradient">Total Testimonials</h3>
                    <p className="text-3xl font-bold text-orange-500 lava-text-gradient">{analytics.totalTestimonials}</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg lava-box">
                    <h3 className="text-xl font-semibold mb-2 lava-text-gradient">Recent Testimonials (30 days)</h3>
                    <p className="text-3xl font-bold text-orange-500 lava-text-gradient">{analytics.recentTestimonials}</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg lava-box">
                    <h3 className="text-xl font-semibold mb-2 lava-text-gradient">Average Comment Length</h3>
                    <p className="text-3xl font-bold text-orange-500 lava-text-gradient">{analytics.averageLength} chars</p>
                </div>
            </div>

            {/* Add New Testimonial Button */}
            <div className="mb-8">
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                    Add New Testimonial
                </button>
            </div>

            {/* Testimonials List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-gray-800 rounded-lg p-6 lava-box">
                        <div className="flex items-center gap-4 mb-4">
                            <Image
                                src={testimonial.imgSrc}
                                alt={testimonial.name}
                                width={60}
                                height={60}
                                className="rounded-full"
                            />
                            <div>
                                <h3 className="font-semibold lava-text-gradient">{testimonial.name}</h3>
                                <p className="text-gray-400 text-sm">{testimonial.profession}</p>
                            </div>
                        </div>
                        <p className="text-gray-300 mb-4">{testimonial.comment}</p>
                        <div className="flex justify-between items-center">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon key={i} className="w-5 h-5 text-orange-500" />
                                ))}
                            </div>
                            <span className="text-sm text-gray-400">
                                Order: {testimonial.display_order}
                            </span>
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                onClick={() => handleDeleteTestimonial(testimonial.id)}
                                className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 text-white text-sm"
                            >
                                Delete
                            </button>
                            {/* Edit button will be added here later */}
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Testimonial Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl lava-box">
                        <h2 className="text-2xl font-bold mb-6 lava-text-gradient">Add New Testimonial</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Profession</label>
                                <input
                                    type="text"
                                    value={formData.profession}
                                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                                    className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Comment</label>
                                <textarea
                                    value={formData.comment}
                                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                                    className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white"
                                    rows={4}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Display Order</label>
                                <input
                                    type="number"
                                    value={formData.display_order}
                                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                                    className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Profile Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white"
                                    required
                                />
                                {previewUrl && (
                                    <div className="mt-2">
                                        <Image
                                            src={previewUrl}
                                            alt="Preview"
                                            width={100}
                                            height={100}
                                            className="rounded-full"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
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
                                    {formLoading ? 'Creating...' : 'Create Testimonial'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
} 