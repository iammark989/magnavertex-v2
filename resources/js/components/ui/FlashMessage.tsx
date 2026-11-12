import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import {
    CheckCircle2,
    AlertCircle,
    X,
} from 'lucide-react';

interface FlashProps {
    success?: string | null;
    error?: string | null;
}

interface Notification {
    type: 'success' | 'error';
    message: string;
}

export default function FlashMessage() {
    const { flash } = usePage<{ flash: FlashProps }>().props;

    const [notification, setNotification] =
        useState<Notification | null>(null);

    useEffect(() => {
        if (flash.success) {
            setNotification({
                type: 'success',
                message: flash.success,
            });
        } else if (flash.error) {
            setNotification({
                type: 'error',
                message: flash.error,
            });
        } else {
            setNotification(null);
        }
    }, [flash.success, flash.error]);

    useEffect(() => {
        if (!notification) return;

        const timer = window.setTimeout(() => {
            setNotification(null);
        }, 5000);

        return () => window.clearTimeout(timer);
    }, [notification]);

    if (!notification) return null;

    const isSuccess = notification.type === 'success';

    return (
        <div
            className="fixed right-5 top-5 z-[100] w-[calc(100%-2.5rem)] max-w-md"
            role={isSuccess ? 'status' : 'alert'}
        >
            <div
                className={`flex items-start gap-3 rounded-xl border bg-white p-4 shadow-lg ${
                    isSuccess
                        ? 'border-green-200'
                        : 'border-red-200'
                }`}
            >
                <div
                    className={`mt-0.5 shrink-0 ${
                        isSuccess ? 'text-green-600' : 'text-red-600'
                    }`}
                >
                    {isSuccess ? (
                        <CheckCircle2 size={21} />
                    ) : (
                        <AlertCircle size={21} />
                    )}
                </div>

                <div className="min-w-0 flex-1">
                    <p
                        className={`text-sm font-semibold ${
                            isSuccess ? 'text-green-800' : 'text-red-800'
                        }`}
                    >
                        {isSuccess ? 'Success' : 'Error'}
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                        {notification.message}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setNotification(null)}
                    className="shrink-0 rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                    aria-label="Dismiss notification"
                >
                    <X size={17} />
                </button>
            </div>
        </div>
    );
}