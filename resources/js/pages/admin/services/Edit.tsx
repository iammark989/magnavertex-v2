import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../layouts/AdminLayout';
import {
    ArrowLeft,
    BriefcaseBusiness,
    Save,
} from 'lucide-react';

interface Service {
    id: number;
    title: string;
    slug: string;
    short_description: string;
    description: string | null;
    icon: string | null;
    sort_order: number;
    is_featured: boolean;
    is_active: boolean;
}

interface EditProps {
    service: Service;
}

interface ServiceForm {
    title: string;
    slug: string;
    short_description: string;
    description: string;
    icon: string;
    sort_order: number;
    is_featured: boolean;
    is_active: boolean;
}

export default function Edit({ service }: EditProps) {
    const { data, setData, put, processing, errors } = useForm<ServiceForm>({
        title: service.title,
        slug: service.slug,
        short_description: service.short_description,
        description: service.description ?? '',
        icon: service.icon ?? '',
        sort_order: service.sort_order,
        is_featured: service.is_featured,
        is_active: service.is_active,
    });

    const generateSlug = (value: string) => {
        return value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/services/${service.id}`);
    };

    const inputClass = (hasError?: boolean) =>
        `w-full rounded-lg border px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:ring-2 ${
            hasError
                ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                : 'border-slate-200 focus:border-sky-400 focus:ring-sky-100'
        }`;

    const labelClass = 'mb-1.5 block text-sm font-medium text-slate-700';

    return (
        <AdminLayout>
            <Head title="Edit Service" />

            <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                            <Link
                                href="/admin/services"
                                className="hover:text-sky-600"
                            >
                                Services
                            </Link>
                            <span>/</span>
                            <span className="text-slate-700">Edit</span>
                        </div>

                        <h1 className="text-2xl font-bold text-slate-800">
                            Edit Service
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Update the details of {service.title}.
                        </p>
                    </div>

                    <Link
                        href="/admin/services"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                    >
                        <ArrowLeft size={16} />
                        Back to Services
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
                            <div className="rounded-lg bg-sky-50 p-2 text-sky-600">
                                <BriefcaseBusiness size={20} />
                            </div>
                            <div>
                                <h2 className="font-semibold text-slate-800">
                                    Service Information
                                </h2>
                                <p className="text-xs text-slate-500">
                                    Basic details displayed on your website.
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-5 p-5 md:grid-cols-2">
                            <div>
                                <label className={labelClass}>
                                    Service Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className={inputClass(!!errors.title)}
                                    placeholder="e.g. Web Application Development"
                                />
                                {errors.title && (
                                    <p className="mt-1 text-xs text-red-600">{errors.title}</p>
                                )}
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Slug <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.slug}
                                    onChange={(e) =>
                                        setData('slug', generateSlug(e.target.value))
                                    }
                                    className={inputClass(!!errors.slug)}
                                    placeholder="web-application-development"
                                />
                                {errors.slug && (
                                    <p className="mt-1 text-xs text-red-600">{errors.slug}</p>
                                )}
                                <p className="mt-1 text-xs text-slate-400">
                                    Used in the public service page URL.
                                </p>
                            </div>

                            <div className="md:col-span-2">
                                <label className={labelClass}>
                                    Short Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    rows={3}
                                    value={data.short_description}
                                    onChange={(e) =>
                                        setData('short_description', e.target.value)
                                    }
                                    className={inputClass(!!errors.short_description)}
                                    placeholder="A brief summary of this service..."
                                />
                                {errors.short_description && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.short_description}
                                    </p>
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <label className={labelClass}>Full Description</label>
                                <textarea
                                    rows={6}
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    className={inputClass(!!errors.description)}
                                    placeholder="Provide more details about this service..."
                                />
                                {errors.description && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className={labelClass}>Icon Name</label>
                                <input
                                    type="text"
                                    value={data.icon}
                                    onChange={(e) => setData('icon', e.target.value)}
                                    className={inputClass(!!errors.icon)}
                                    placeholder="e.g. Code, Monitor, Database"
                                />
                                {errors.icon && (
                                    <p className="mt-1 text-xs text-red-600">{errors.icon}</p>
                                )}
                                <p className="mt-1 text-xs text-slate-400">
                                    Use a supported Lucide icon name.
                                </p>
                            </div>

                            <div>
                                <label className={labelClass}>Display Order</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={data.sort_order}
                                    onChange={(e) =>
                                        setData('sort_order', Number(e.target.value))
                                    }
                                    className={inputClass(!!errors.sort_order)}
                                />
                                {errors.sort_order && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.sort_order}
                                    </p>
                                )}
                                <p className="mt-1 text-xs text-slate-400">
                                    Lower numbers appear first.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h2 className="font-semibold text-slate-800">
                            Publishing Settings
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Control how this service appears on your website.
                        </p>

                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 p-4 transition hover:bg-slate-50">
                                <input
                                    type="checkbox"
                                    checked={data.is_featured}
                                    onChange={(e) =>
                                        setData('is_featured', e.target.checked)
                                    }
                                    className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                                />
                                <span>
                                    <span className="block text-sm font-medium text-slate-700">
                                        Featured Service
                                    </span>
                                    <span className="mt-1 block text-xs text-slate-500">
                                        Mark this service as featured.
                                    </span>
                                </span>
                            </label>

                            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 p-4 transition hover:bg-slate-50">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) =>
                                        setData('is_active', e.target.checked)
                                    }
                                    className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                                />
                                <span>
                                    <span className="block text-sm font-medium text-slate-700">
                                        Active
                                    </span>
                                    <span className="mt-1 block text-xs text-slate-500">
                                        Active services are visible on the public website.
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <Link
                            href="/admin/services"
                            className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <Save size={16} />
                            {processing ? 'Updating...' : 'Update Service'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}