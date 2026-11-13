import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import {
    ArrowLeft,
    Building2,
    CalendarDays,
    Mail,
    MessageSquare,
    User,
} from 'lucide-react';
import AdminLayout from '../../../layouts/AdminLayout';

interface ContactInquiry {
    id: number;
    name: string;
    email: string;
    company: string | null;
    project_type: string;
    subject: string;
    message: string;
    status: 'new' | 'in_progress' | 'responded' | 'closed';
    read_at: string | null;
    created_at: string;
    admin_notes: string | null;
}

interface ShowProps {
    inquiry: ContactInquiry;
}

export default function Show({ inquiry }: ShowProps) {
    const statusStyles = {
        new: 'bg-sky-50 text-sky-700',
        in_progress: 'bg-amber-50 text-amber-700',
        responded: 'bg-green-50 text-green-700',
        closed: 'bg-slate-100 text-slate-600',
    };

    const statusLabels = {
        new: 'New',
        in_progress: 'In Progress',
        responded: 'Responded',
        closed: 'Closed',
    };

    const projectTypeLabels: Record<string, string> = {
        'web-application': 'Web Application',
        'business-system': 'Business System',
        'cms-website': 'CMS / Website',
        ecommerce: 'E-Commerce',
        other: 'Other',
    };

    const formatDate = (value: string) =>
        new Date(value).toLocaleString('en-PH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        });

    const emailSubject = `Re: ${inquiry.subject}`;

    const [successMessage, setSuccessMessage] = useState('');

    const {
        data,
        setData,
        put,
        processing,
        errors,
    } = useForm({
        status: inquiry.status,
        admin_notes: inquiry.admin_notes ?? '',
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setSuccessMessage('');

        put(`/admin/contact-inquiries/${inquiry.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setSuccessMessage('Inquiry updated successfully.');
            },
        });
    };

    return (
        <AdminLayout>
            <Head title={`Inquiry: ${inquiry.subject}`} />

            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <Link
                            href="/admin/contact-inquiries"
                            className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-sky-600"
                        >
                            <ArrowLeft size={16} />
                            Back to Inquiries
                        </Link>

                        <h1 className="text-2xl font-bold text-slate-900">
                            Inquiry Details
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Review the message submitted through your website.
                        </p>
                    </div>

                    <a
                        href={`mailto:${inquiry.email}?subject=${encodeURIComponent(emailSubject)}`}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-sky-700"
                    >
                        <Mail size={17} />
                        Reply by Email
                    </a>
                </div>

                {/* Inquiry Subject */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Subject
                            </p>

                            <h2 className="mt-2 text-xl font-semibold text-slate-900">
                                {inquiry.subject}
                            </h2>

                            <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                                <CalendarDays size={15} />
                                Submitted {formatDate(inquiry.created_at)}
                            </p>
                        </div>

                        <span
                            className={`inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-medium ${statusStyles[inquiry.status]}`}
                        >
                            {statusLabels[inquiry.status]}
                        </span>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="mb-4 flex items-center gap-2">
                            <User size={18} className="text-sky-600" />
                            <h3 className="font-semibold text-slate-900">
                                Contact Information
                            </h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-slate-400">Name</p>
                                <p className="mt-1 text-sm font-medium text-slate-800">
                                    {inquiry.name}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-slate-400">Email Address</p>
                                <a
                                    href={`mailto:${inquiry.email}`}
                                    className="mt-1 block text-sm font-medium text-sky-600 hover:underline"
                                >
                                    {inquiry.email}
                                </a>
                            </div>

                            <div>
                                <p className="text-xs text-slate-400">Company</p>
                                <p className="mt-1 text-sm font-medium text-slate-800">
                                    {inquiry.company || 'Not provided'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="mb-4 flex items-center gap-2">
                            <Building2 size={18} className="text-sky-600" />
                            <h3 className="font-semibold text-slate-900">
                                Project Information
                            </h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-slate-400">Project Type</p>
                                <p className="mt-1 text-sm font-medium text-slate-800">
                                    {projectTypeLabels[inquiry.project_type] ??
                                        inquiry.project_type}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-slate-400">Inquiry Status</p>
                                <p className="mt-1 text-sm font-medium text-slate-800">
                                    {statusLabels[inquiry.status]}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-slate-400">Inquiry ID</p>
                                <p className="mt-1 text-sm font-medium text-slate-800">
                                    #{inquiry.id}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Message */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="mb-4 flex items-center gap-2">
                        <MessageSquare size={18} className="text-sky-600" />
                        <h3 className="font-semibold text-slate-900">
                            Message
                        </h3>
                    </div>

                    <div className="whitespace-pre-wrap rounded-lg bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                        {inquiry.message}
                    </div>
                    
                </div>

                {/* Saved Internal Notes */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="mb-4 flex items-center gap-2">
                        <MessageSquare size={18} className="text-amber-600" />
                        <h3 className="font-semibold text-slate-900">
                            Saved Internal Notes
                        </h3>
                    </div>

                    {inquiry.admin_notes ? (
                        <div className="whitespace-pre-wrap rounded-lg border border-amber-100 bg-amber-50/50 p-4 text-sm leading-7 text-slate-700">
                            {inquiry.admin_notes}
                        </div>
                    ) : (
                        <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-400">
                            No internal notes have been added yet.
                        </p>
                    )}
                </div> 

                 {/* Manage Inquiry */}
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <div className="mb-5">
                            <h3 className="font-semibold text-slate-900">
                                Manage Inquiry
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                Update the inquiry status and add private internal notes.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Status */}
                            <div>
                                <label
                                    htmlFor="status"
                                    className="mb-2 block text-sm font-medium text-slate-700"
                                >
                                    Inquiry Status
                                </label>

                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(event) =>
                                        setData(
                                            'status',
                                            event.target.value as ContactInquiry['status'],
                                        )
                                    }
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 sm:max-w-md"
                                >
                                    <option value="new">New</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="responded">Responded</option>
                                    <option value="closed">Closed</option>
                                </select>

                                {errors.status && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.status}
                                    </p>
                                )}
                            </div>

                            {/* Internal Notes */}
                            <div>
                                <label
                                    htmlFor="admin_notes"
                                    className="mb-2 block text-sm font-medium text-slate-700"
                                >
                                    Internal Notes
                                </label>

                                <textarea
                                    id="admin_notes"
                                    rows={5}
                                    maxLength={5000}
                                    value={data.admin_notes}
                                    onChange={(event) =>
                                        setData('admin_notes', event.target.value)
                                    }
                                    placeholder="Add internal notes about this inquiry..."
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                                />

                                <div className="mt-1 flex justify-between">
                                    {errors.admin_notes ? (
                                        <p className="text-xs text-red-600">
                                            {errors.admin_notes}
                                        </p>
                                    ) : (
                                        <p className="text-xs text-slate-400">
                                            These notes are only visible to administrators.
                                        </p>
                                    )}

                                    <p className="text-xs text-slate-400">
                                        {data.admin_notes.length}/5000
                                    </p>
                                </div>
                            </div>

                            {/* Success Message */}
                            {successMessage && (
                                <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                                    {successMessage}
                                </div>
                            )}

                            {/* Submit */}
                            <div className="flex justify-end border-t border-slate-100 pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>  
                
            </div>
        </AdminLayout>
    );
}