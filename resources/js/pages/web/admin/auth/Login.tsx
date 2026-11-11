import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';

import Button from '../../../../components/ui/Button';
import Logo from '../../../../components/ui/Logo';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        login: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post('/admin/login', {
            onFinish: () => {
                setData('password', '');
            },
        });
    };

    return (
        <>
            <Head title="Admin Login" />

            <main className="flex min-h-screen bg-slate-50">
                {/* Branding Panel */}
                <section className="relative hidden overflow-hidden bg-gradient-to-br from-[#071B35] via-[#0F4C81] to-[#087CA7] lg:flex lg:w-1/2 lg:items-center lg:justify-center">
                    <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-cyan-300/10 blur-3xl" />
                    <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-sky-300/10 blur-3xl" />

                    <div className="relative z-10 max-w-lg px-12 text-white">
                        <Logo>
                            <span className="text-white">
                                MAGNA VERTEX
                            </span>
                        </Logo>

                        <p className="mt-3 text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">
                            Technologies
                        </p>

                        <h1 className="mt-12 text-4xl font-bold leading-tight xl:text-5xl">
                            Manage your digital business with confidence.
                        </h1>

                        <p className="mt-6 text-lg leading-8 text-slate-200">
                            Access your administration workspace to manage
                            website content, business solutions, and customer
                            inquiries.
                        </p>

                        <div className="mt-12 flex items-center gap-3 text-sm text-sky-200">
                            <ShieldCheck size={20} />
                            Secure Administration Portal
                        </div>
                    </div>
                </section>

                {/* Login Form */}
                <section className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
                    <div className="w-full max-w-md">
                        <div className="mb-10 lg:hidden">
                            <Logo>MAGNA VERTEX</Logo>
                            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.25em] text-sky-600">
                                Technologies
                            </p>
                        </div>

                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wider text-sky-600">
                                Admin Portal
                            </p>

                            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                                Welcome back
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                Sign in using your registered email address
                                or username.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-9 space-y-6">
                            <div>
                                <label
                                    htmlFor="login"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Email or Username
                                </label>

                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                                    <input
                                        id="login"
                                        type="text"
                                        value={data.login}
                                        onChange={(e) => setData('login', e.target.value)}
                                        autoComplete="username"
                                        autoFocus
                                        placeholder="Enter email or username"
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                                    />
                                </div>

                                {errors.login && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.login}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Password
                                </label>

                                <div className="relative">
                                    <LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        autoComplete="current-password"
                                        placeholder="Enter your password"
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-12 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? (
                                            <EyeOff size={19} />
                                        ) : (
                                            <Eye size={19} />
                                        )}
                                    </button>
                                </div>

                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <label className="flex cursor-pointer items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                                />

                                <span className="text-sm text-slate-600">
                                    Remember me
                                </span>
                            </label>

                            <Button
                                type="submit"
                                size="lg"
                                className="w-full"
                                disabled={processing}
                            >
                                {processing ? 'Signing in...' : 'Sign In'}
                            </Button>
                        </form>

                        <p className="mt-10 text-center text-xs text-slate-400">
                            © {new Date().getFullYear()} Magna Vertex Technologies.
                            All rights reserved.
                        </p>
                    </div>
                </section>
            </main>
        </>
    );
}