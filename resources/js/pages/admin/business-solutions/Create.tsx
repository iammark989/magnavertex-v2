import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../layouts/AdminLayout';
import { ArrowLeft, ImagePlus, Save, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface BusinessSolutionForm {
    title: string;
    slug: string;
    category: string;
    short_description: string;
    business_challenge: string;
    solution_description: string;
    ideal_for: string;
    technologies: string[];
    demo_url: string;
    featured_image: File | null;
    sort_order: number;
    is_featured: boolean;
    is_active: boolean;
}

export default function Create() {
    const { data, setData, post, processing, errors } =
        useForm<BusinessSolutionForm>({
            title: '',
            slug: '',
            category: '',
            short_description: '',
            business_challenge: '',
            solution_description: '',
            ideal_for: '',
            technologies: [],
            demo_url: '',
            featured_image: null,
            sort_order: 0,
            is_featured: false,
            is_active: true,
        });

    const [technologyInput, setTechnologyInput] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

    useEffect(() => {
        return () => {
            if (imagePreview) URL.revokeObjectURL(imagePreview);
        };
    }, [imagePreview]);

    const generateSlug = (value: string) =>
        value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');

    const handleTitleChange = (value: string) => {
        setData((previous) => ({
            ...previous,
            title: value,
            slug: slugManuallyEdited
                ? previous.slug
                : generateSlug(value),
        }));
    };

    const handleTechnologyAdd = () => {
        const technology = technologyInput.trim();

        if (
            technology &&
            !data.technologies.some(
                (item) => item.toLowerCase() === technology.toLowerCase()
            )
        ) {
            setData('technologies', [...data.technologies, technology]);
            setTechnologyInput('');
        }
    };

    const handleTechnologyRemove = (technology: string) => {
        setData(
            'technologies',
            data.technologies.filter((item) => item !== technology)
        );
    };

    const handleImageChange = (file: File | null) => {
        if (imagePreview) URL.revokeObjectURL(imagePreview);

        setData('featured_image', file);
        setImagePreview(file ? URL.createObjectURL(file) : null);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        post('/admin/business-solutions', {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Create Business Solution" />

            <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="mb-2">
                            <Link
                                href="/admin/business-solutions"
                                className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-sky-600"
                            >
                                <ArrowLeft size={16} />
                                Business Solutions
                            </Link>
                        </div>

                        <h1 className="text-2xl font-bold text-slate-800">
                            Create Business Solution
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Add a new business solution to your portfolio.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <h2 className="text-lg font-semibold text-slate-800">
                            Basic Information
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Enter the solution title and general information.
                        </p>

                        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => handleTitleChange(e.target.value)}
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                                    placeholder="e.g. Retail Management System"
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Slug <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.slug}
                                    onChange={(e) => {
                                        setSlugManuallyEdited(true);
                                        setData('slug', generateSlug(e.target.value));
                                    }}
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                                    placeholder="retail-management-system"
                                />
                                {errors.slug && (
                                    <p className="mt-1 text-sm text-red-600">{errors.slug}</p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                                    placeholder="e.g. Enterprise Resource Planning"
                                />
                                {errors.category && (
                                    <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Sort Order
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={data.sort_order}
                                    onChange={(e) =>
                                        setData('sort_order', Number(e.target.value))
                                    }
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                                />
                                {errors.sort_order && (
                                    <p className="mt-1 text-sm text-red-600">{errors.sort_order}</p>
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Short Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    rows={3}
                                    value={data.short_description}
                                    onChange={(e) =>
                                        setData('short_description', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                                    placeholder="A brief overview of this business solution..."
                                />
                                {errors.short_description && (
                                    <p className="mt-1 text-sm text-red-600">{errors.short_description}</p>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Solution Details */}
                    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <h2 className="text-lg font-semibold text-slate-800">
                            Solution Details
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Explain the customer's challenge and how the solution addresses it.
                        </p>

                        <div className="mt-5 space-y-5">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Business Challenge <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    rows={4}
                                    value={data.business_challenge}
                                    onChange={(e) =>
                                        setData('business_challenge', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                                    placeholder="Describe the business problems or challenges..."
                                />
                                {errors.business_challenge && (
                                    <p className="mt-1 text-sm text-red-600">{errors.business_challenge}</p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Solution Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    rows={5}
                                    value={data.solution_description}
                                    onChange={(e) =>
                                        setData('solution_description', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                                    placeholder="Explain the proposed system and its benefits..."
                                />
                                {errors.solution_description && (
                                    <p className="mt-1 text-sm text-red-600">{errors.solution_description}</p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Ideal For <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    rows={3}
                                    value={data.ideal_for}
                                    onChange={(e) => setData('ideal_for', e.target.value)}
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                                    placeholder="Describe the businesses or industries this solution is ideal for..."
                                />
                                {errors.ideal_for && (
                                    <p className="mt-1 text-sm text-red-600">{errors.ideal_for}</p>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Technologies */}
                    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <h2 className="text-lg font-semibold text-slate-800">
                            Technologies
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Add the technologies and tools used to build this solution.
                        </p>

                        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                            <input
                                type="text"
                                value={technologyInput}
                                onChange={(e) => setTechnologyInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleTechnologyAdd();
                                    }
                                }}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                                placeholder="e.g. Laravel, React, MySQL"
                            />
                            <button
                                type="button"
                                onClick={handleTechnologyAdd}
                                className="cursor-pointer rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-700"
                            >
                                Add
                            </button>
                        </div>

                        {data.technologies.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                {data.technologies.map((technology) => (
                                    <span
                                        key={technology}
                                        className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1.5 text-sm font-medium text-sky-700"
                                    >
                                        {technology}
                                        <button
                                            type="button"
                                            onClick={() => handleTechnologyRemove(technology)}
                                            className="text-sky-600 hover:text-red-600"
                                            aria-label={`Remove ${technology}`}
                                        >
                                            <X size={14} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}

                        {errors.technologies && (
                            <p className="mt-2 text-sm text-red-600">{errors.technologies}</p>
                        )}
                    </section>

                    {/* Featured Image and Demo */}
                    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <h2 className="text-lg font-semibold text-slate-800">
                            Media and Demo
                        </h2>

                        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Featured Image
                                </label>

                                <label className="flex min-h-44 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 text-center hover:border-sky-400">
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Featured image preview"
                                            className="h-44 w-full object-cover"
                                        />
                                    ) : (
                                        <>
                                            <ImagePlus size={30} className="text-slate-400" />
                                            <span className="mt-2 text-sm font-medium text-slate-600">
                                                Click to upload image
                                            </span>
                                            <span className="mt-1 text-xs text-slate-400">
                                                JPG, PNG, WEBP up to 5MB
                                            </span>
                                        </>
                                    )}

                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) =>
                                            handleImageChange(e.target.files?.[0] ?? null)
                                        }
                                    />
                                </label>

                                {imagePreview && (
                                    <button
                                        type="button"
                                        onClick={() => handleImageChange(null)}
                                        className="mt-2 text-sm font-medium text-red-600 hover:text-red-700"
                                    >
                                        Remove image
                                    </button>
                                )}

                                {errors.featured_image && (
                                    <p className="mt-1 text-sm text-red-600">{errors.featured_image}</p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Demo URL
                                </label>
                                <input
                                    type="url"
                                    value={data.demo_url}
                                    onChange={(e) => setData('demo_url', e.target.value)}
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                                    placeholder="https://example.com"
                                />
                                {errors.demo_url && (
                                    <p className="mt-1 text-sm text-red-600">{errors.demo_url}</p>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Publishing Settings */}
                    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <h2 className="text-lg font-semibold text-slate-800">
                            Publishing Settings
                        </h2>

                        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:gap-8">
                            <label className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={data.is_featured}
                                    onChange={(e) =>
                                        setData('is_featured', e.target.checked)
                                    }
                                    className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                                />
                                <span className="text-sm font-medium text-slate-700">
                                    Featured Solution
                                </span>
                            </label>

                            <label className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) =>
                                        setData('is_active', e.target.checked)
                                    }
                                    className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                                />
                                <span className="text-sm font-medium text-slate-700">
                                    Active (visible on website)
                                </span>
                            </label>
                        </div>
                    </section>

                    {/* Actions */}
                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <Link
                            href="/admin/business-solutions"
                            className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <Save size={16} />
                            {processing ? 'Saving...' : 'Save Business Solution'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}