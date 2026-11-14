import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../../layouts/AdminLayout';
import { ArrowLeft, ImagePlus, Save, X, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface BusinessSolution {
    id: number;
    title: string;
    slug: string;
    category: string;
    short_description: string;
    business_challenge: string;
    solution_description: string;
    ideal_for: string;
    technologies: string[] | null;
    demo_url: string | null;
    featured_image: string | null;
    sort_order: number;
    is_featured: boolean;
    is_active: boolean;
    capabilities: Capability[];
    images: BusinessSolutionImage[];
}

interface Capability {
    id: number | null;
    title: string;
    description: string;
    sort_order: number;
}

interface EditProps {
    solution: BusinessSolution;
}

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
    capabilities: Capability[];
}

interface BusinessSolutionImage {
    id: number;
    image: string;
    caption: string | null;
    sort_order: number;
}

interface PendingGalleryImage {
    file: File;
    preview: string;
    caption: string;
}

export default function Edit({ solution }: EditProps) {
    const { data, setData, post, transform, processing, errors } =
        useForm<BusinessSolutionForm>({
            title: solution.title,
            slug: solution.slug,
            category: solution.category,
            short_description: solution.short_description,
            business_challenge: solution.business_challenge,
            solution_description: solution.solution_description,
            ideal_for: solution.ideal_for,
            technologies: solution.technologies ?? [],
            demo_url: solution.demo_url ?? '',
            featured_image: null,
            sort_order: solution.sort_order,
            is_featured: solution.is_featured,
            is_active: solution.is_active,
            capabilities: (solution.capabilities ?? []).map((capability) => ({
                id: capability.id,
                title: capability.title,
                description: capability.description ?? '',
                sort_order: capability.sort_order,
            })),
        });

    const [technologyInput, setTechnologyInput] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [slugManuallyEdited, setSlugManuallyEdited] = useState(true);
    const [pendingGalleryImages, setPendingGalleryImages] = useState<
        PendingGalleryImage[]
    >([]);

    const [galleryImageEdits, setGalleryImageEdits] = useState<
        Record<number, { caption?: string; sort_order?: number }>
    >({});

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

    const handleCapabilityAdd = () => {
        setData('capabilities', [
            ...data.capabilities,
            {
                id: null,
                title: '',
                description: '',
                sort_order: data.capabilities.length + 1,
            },
        ]);
    };

    const handleCapabilityChange = (
        index: number,
        field: keyof Capability,
        value: string | number | null
    ) => {
        const updatedCapabilities = [...data.capabilities];

        updatedCapabilities[index] = {
            ...updatedCapabilities[index],
            [field]: value,
        };

        setData('capabilities', updatedCapabilities);
    };

    const handleCapabilityRemove = (index: number) => {
        const updatedCapabilities = data.capabilities
            .filter((_, capabilityIndex) => capabilityIndex !== index)
            .map((capability, capabilityIndex) => ({
                ...capability,
                sort_order: capabilityIndex + 1,
            }));

        setData('capabilities', updatedCapabilities);
    };

    const handleGalleryImagesChange = (files: FileList | null) => {
        if (!files) return;

        const newImages = Array.from(files).map((file) => ({
            file,
            preview: URL.createObjectURL(file),
            caption: '',
        }));

        setPendingGalleryImages((previous) => [
            ...previous,
            ...newImages,
        ]);
    };

    const handlePendingGalleryCaptionChange = (
        index: number,
        caption: string
    ) => {
        setPendingGalleryImages((previous) =>
            previous.map((image, imageIndex) =>
                imageIndex === index
                    ? { ...image, caption }
                    : image
            )
        );
    };

    const handlePendingGalleryRemove = (index: number) => {
        setPendingGalleryImages((previous) => {
            const imageToRemove = previous[index];

            if (imageToRemove) {
                URL.revokeObjectURL(imageToRemove.preview);
            }

            return previous.filter(
                (_, imageIndex) => imageIndex !== index
            );
        });
    };

    const handleGalleryUpload = () => {
        if (pendingGalleryImages.length === 0) return;

        router.post(
            `/admin/business-solutions/${solution.id}/images`,
            {
                images: pendingGalleryImages.map((image) => image.file),
                captions: pendingGalleryImages.map((image) => image.caption),
            },
            {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    pendingGalleryImages.forEach((image) => {
                        URL.revokeObjectURL(image.preview);
                    });

                    setPendingGalleryImages([]);
                },
            }
        );
    };

    const handleGalleryImageUpdate = (
        image: BusinessSolutionImage
    ) => {
        router.put(
            `/admin/business-solutions/${solution.id}/images/${image.id}`,
            {
                caption: image.caption ?? '',
                sort_order: image.sort_order,
            },
            {
                preserveScroll: true,
            }
        );
    };

    const handleGalleryImageDelete = (image: BusinessSolutionImage) => {
        if (!window.confirm('Are you sure you want to delete this gallery image?')) {
            return;
        }

        router.delete(
            `/admin/business-solutions/${solution.id}/images/${image.id}`,
            {
                preserveScroll: true,
            }
        );
    };

    const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    transform((data) => ({
        ...data,
        _method: 'put',
    }));

    post(`/admin/business-solutions/${solution.id}`, {
        forceFormData: true,
    });
};

    return (
        <AdminLayout>
            <Head title={`Edit ${solution.title}`} />

            <div className="space-y-6">
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
                        Edit Business Solution
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Update the information for {solution.title}.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <h2 className="text-lg font-semibold text-slate-800">
                            Basic Information
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Update the solution title and general information.
                        </p>

                        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    maxLength={255}
                                    value={data.title}
                                    onChange={(e) => handleTitleChange(e.target.value)}
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
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
                                    maxLength={255}
                                    value={data.slug}
                                    onChange={(e) => {
                                        setSlugManuallyEdited(true);
                                        setData('slug', generateSlug(e.target.value));
                                    }}
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
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
                                    maxLength={255}
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
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
                                />
                                {errors.ideal_for && (
                                    <p className="mt-1 text-sm text-red-600">{errors.ideal_for}</p>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Key Capabilities */}
                    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-800">
                                    Key Capabilities
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Manage the features and capabilities displayed on the public solution page.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={handleCapabilityAdd}
                                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-sky-700"
                            >
                                <Plus size={16} />
                                Add Capability
                            </button>
                        </div>

                        <div className="mt-5 space-y-4">
                            {data.capabilities.length === 0 ? (
                                <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center">
                                    <p className="text-sm font-medium text-slate-600">
                                        No capabilities added yet.
                                    </p>
                                    <p className="mt-1 text-xs text-slate-400">
                                        Click Add Capability to add your first capability.
                                    </p>
                                </div>
                            ) : (
                                data.capabilities.map((capability, index) => (
                                    <div
                                        key={capability.id ?? `new-${index}`}
                                        className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5"
                                    >
                                        <div className="mb-4 flex items-center justify-between">
                                            <h3 className="text-sm font-semibold text-slate-700">
                                                Capability {index + 1}
                                            </h3>

                                            <button
                                                type="button"
                                                onClick={() => handleCapabilityRemove(index)}
                                                className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-700"
                                            >
                                                <Trash2 size={15} />
                                                Remove
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                                            <div className="md:col-span-3">
                                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                                    Capability Title <span className="text-red-500">*</span>
                                                </label>

                                                <input
                                                    type="text"
                                                    maxLength={255}
                                                    value={capability.title}
                                                    onChange={(e) =>
                                                        handleCapabilityChange(index, 'title', e.target.value)
                                                    }
                                                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                                                    placeholder="e.g. Inventory Management"
                                                />

                                                {errors[`capabilities.${index}.title`] && (
                                                    <p className="mt-1 text-sm text-red-600">
                                                        {errors[`capabilities.${index}.title`]}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                                    Display Order
                                                </label>

                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={capability.sort_order}
                                                    onChange={(e) =>
                                                        handleCapabilityChange(
                                                            index,
                                                            'sort_order',
                                                            Number(e.target.value)
                                                        )
                                                    }
                                                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                                                />

                                                {errors[`capabilities.${index}.sort_order`] && (
                                                    <p className="mt-1 text-sm text-red-600">
                                                        {errors[`capabilities.${index}.sort_order`]}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="md:col-span-4">
                                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                                    Description
                                                </label>

                                                <textarea
                                                    rows={3}
                                                    value={capability.description}
                                                    onChange={(e) =>
                                                        handleCapabilityChange(
                                                            index,
                                                            'description',
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                                                    placeholder="Describe what this capability does..."
                                                />

                                                {errors[`capabilities.${index}.description`] && (
                                                    <p className="mt-1 text-sm text-red-600">
                                                        {errors[`capabilities.${index}.description`]}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {errors.capabilities && (
                            <p className="mt-3 text-sm text-red-600">
                                {errors.capabilities}
                            </p>
                        )}
                    </section>


                    {/* Gallery Images */}
                    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <h2 className="text-lg font-semibold text-slate-800">
                            Project Gallery
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Upload and manage screenshots or images displayed on the public solution page.
                        </p>

                        {/* Existing Gallery Images */}
                        <div className="mt-5">
                            <h3 className="mb-3 text-sm font-semibold text-slate-700">
                                Existing Images ({solution.images?.length ?? 0})
                            </h3>

                            {!solution.images || solution.images.length === 0 ? (
                                <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center">
                                    <ImagePlus size={28} className="mx-auto text-slate-400" />
                                    <p className="mt-2 text-sm text-slate-500">
                                        No gallery images uploaded yet.
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {solution.images.map((image) => (
                                        <div
                                            key={image.id}
                                            className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                                        >
                                            <img
                                                src={image.image}
                                                alt={image.caption || solution.title}
                                                className="h-44 w-full object-cover"
                                            />

                                            <div className="space-y-3 p-4">
                                                <div>
                                                    <label className="mb-1 block text-xs font-medium text-slate-600">
                                                        Caption
                                                    </label>
                                                    <input
                                                        type="text"
                                                        maxLength={255}
                                                        value={
                                                            galleryImageEdits[image.id]?.caption ??
                                                            image.caption ??
                                                            ''
                                                        }
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            // Existing image data is updated in the next step.
                                                            setGalleryImageEdits((previous) => ({
                                                                ...previous,
                                                                [image.id]: {
                                                                    ...previous[image.id],
                                                                    caption: value,
                                                                },
                                                            }));
                                                        }}
                                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                                                        placeholder="Optional image caption"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="mb-1 block text-xs font-medium text-slate-600">
                                                        Display Order
                                                    </label>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        value={
                                                            galleryImageEdits[image.id]?.sort_order ??
                                                            image.sort_order
                                                        }
                                                        onChange={(e) => {
                                                            const value = Number(e.target.value);
                                                            setGalleryImageEdits((previous) => ({
                                                                ...previous,
                                                                [image.id]: {
                                                                    ...previous[image.id],
                                                                    sort_order: value,
                                                                },
                                                            }));
                                                        }}
                                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                                                    />
                                                </div>

                                                <div className="flex items-center justify-between gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const edits = galleryImageEdits[image.id];

                                                            handleGalleryImageUpdate({
                                                                ...image,
                                                                caption: edits?.caption ?? image.caption,
                                                                sort_order: edits?.sort_order ?? image.sort_order,
                                                            });
                                                        }}
                                                        className="cursor-pointer rounded-lg bg-sky-600 px-3 py-2 text-xs font-medium text-white hover:bg-sky-700"
                                                    >
                                                        Save Changes
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleGalleryImageDelete(image)}
                                                        className="cursor-pointer inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:text-red-700"
                                                    >
                                                        <Trash2 size={14} />
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Upload New Gallery Images */}
                        <div className="mt-8 border-t border-slate-200 pt-6">
                            <h3 className="text-sm font-semibold text-slate-700">
                                Upload New Images
                            </h3>

                            <p className="mt-1 text-xs text-slate-500">
                                You can select multiple images. JPG, PNG, or WEBP, up to 5MB each.
                            </p>

                            <label className="mt-4 flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 text-center hover:border-sky-400">
                                <ImagePlus size={30} className="text-slate-400" />
                                <span className="mt-2 text-sm font-medium text-slate-600">
                                    Click to select gallery images
                                </span>
                                <span className="mt-1 text-xs text-slate-400">
                                    Multiple images supported
                                </span>

                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                    onChange={(e) => {
                                        handleGalleryImagesChange(e.target.files);
                                        e.target.value = '';
                                    }}
                                />
                            </label>

                            {pendingGalleryImages.length > 0 && (
                                <div className="mt-5 space-y-4">
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                        {pendingGalleryImages.map((image, index) => (
                                            <div
                                                key={`${image.file.name}-${index}`}
                                                className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                                            >
                                                <img
                                                    src={image.preview}
                                                    alt={image.file.name}
                                                    className="h-40 w-full object-cover"
                                                />

                                                <div className="space-y-3 p-3">
                                                    <p className="truncate text-xs font-medium text-slate-600">
                                                        {image.file.name}
                                                    </p>

                                                    <input
                                                        type="text"
                                                        maxLength={255}
                                                        value={image.caption}
                                                        onChange={(e) =>
                                                            handlePendingGalleryCaptionChange(
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Optional caption"
                                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                                                    />

                                                    <button
                                                        type="button"
                                                        onClick={() => handlePendingGalleryRemove(index)}
                                                        className="cursor-pointer inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:text-red-700"
                                                    >
                                                        <X size={14} />
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleGalleryUpload}
                                        className="cursor-pointer inline-flex items-center gap-2 rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-700"
                                    >
                                        <ImagePlus size={16} />
                                        Upload {pendingGalleryImages.length} Image(s)
                                    </button>
                                </div>
                            )}
                        </div>
                    </section>



                    {/* Technologies */}
                    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <h2 className="text-lg font-semibold text-slate-800">
                            Technologies <span className='text-red-500'>*</span>
                        </h2>

                        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                            <input
                                type="text"
                                maxLength={255}
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

                                {solution.featured_image && (
                                    <div className="mb-3">
                                        <p className="mb-2 text-xs font-medium text-slate-500">
                                            Current image
                                        </p>
                                        <img
                                            src={solution.featured_image}
                                            alt={solution.title}
                                            className="h-44 w-full rounded-lg object-cover"
                                        />
                                    </div>
                                )}

                                <label className="flex min-h-36 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 text-center hover:border-sky-400">
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="New featured image preview"
                                            className="h-44 w-full object-cover"
                                        />
                                    ) : (
                                        <>
                                            <ImagePlus size={30} className="text-slate-400" />
                                            <span className="mt-2 text-sm font-medium text-slate-600">
                                                Click to upload replacement image
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
                                        className="mt-2 text-sm font-medium text-slate-600 hover:text-red-600"
                                    >
                                        Cancel replacement
                                    </button>
                                )}

                                <p className="mt-2 text-xs text-slate-500">
                                    The current image will remain unchanged unless you upload a replacement.
                                </p>

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
                            {processing ? 'Updating...' : 'Update Business Solution'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}