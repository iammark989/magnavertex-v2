import { Mail, MapPin } from "lucide-react";
import { useState } from "react";

import Container from "../ui/Container";


export default function ContactSection() {

const services = [
        'Web Applications',
        'Business Systems',
        'CMS & Websites',
        'E-Commerce Solutions',
];

const [ formData, setFormData ] = useState({
    name: "",
    email: "",
    company: "",
    project_type: "",
    subject: "",
    message: "",
})

const [ isSubmitting, setIsSubmitting ] = useState(false);
const [ errors, setErrors ] = useState<Record<string, string[]>>({});
const [successMessage, setSuccessMessage] = useState("");
const [generalError, setGeneralError] = useState("");


const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));
};


const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage("");
    setGeneralError("");

    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/contact`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(formData),
            }
        );

        const data = await response.json();

        if (response.status === 422) {
            setErrors(data.errors || {});
            return;
        }

        if (!response.ok) {
            setGeneralError(
                "Something went wrong. Please try again later."
            );
            return;
        }

        setSuccessMessage(
            "Your message has been sent successfully. We'll get back to you soon."
        );

        setFormData({
            name: "",
            email: "",
            company: "",
            project_type: "",
            subject: "",
            message: "",
        });
    } catch (error) {
       // console.error(error);

        setGeneralError(
            "Unable to send your message. Please check your connection and try again."
        );
    } finally {
        setIsSubmitting(false);
    }
};

    return (
        <section
            id="contact"
            className="
                relative
                overflow-hidden
                bg-slate-950
                py-24
                sm:py-28
            "
        >
            <Container>

                <div className="
                    mx-auto
                    grid
                    max-w-6xl
                    grid-cols-1
                    gap-12
                    lg:grid-cols-2
                    lg:gap-20
                ">

                    {/* Contact Information */}
                    <div>
                        <span className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-[0.25em]
                            text-cyan-400
                        ">
                            Let's Work Together
                        </span>

                        <h2 className="
                            mt-4
                            text-3xl
                            font-bold
                            tracking-tight
                            text-white
                            sm:text-4xl
                            lg:text-5xl
                        ">
                            Have a project in mind?
                        </h2>

                        <p className="
                            mt-5
                            max-w-xl
                            text-base
                            leading-7
                            text-slate-300
                            sm:text-lg
                        ">
                            Tell us what you're trying to build,
                            improve, or solve.
                        </p>

                        

                        <p className="
                            mt-5
                            max-w-xl
                            text-base
                            leading-7
                            text-slate-300
                            sm:text-lg
                        ">
                            Whether you need a new web application,
                            a business system, an e-commerce solution,
                            or help improving an existing platform,
                            let's talk about what you need.
                        </p>

                       

                        <div className="mt-10 border-y border-white/10 py-6">
                            <p
                                className="
                                    text-xs
                                    font-semibold
                                    uppercase
                                    tracking-[0.2em]
                                    text-cyan-400
                                "
                            >
                                How We Can Help
                            </p>

                            <ul className="mt-4 space-y-3">
                                {services.map((service) => (
                                    <li
                                        key={service}
                                        className="
                                            flex
                                            items-center
                                            gap-3
                                            text-sm
                                            text-slate-300
                                        "
                                    >
                                        <span
                                            className="
                                                h-1.5
                                                w-1.5
                                                shrink-0
                                                rounded-full
                                                bg-cyan-400
                                            "
                                        />

                                        {service}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Details */}
                        <div className="mt-10 space-y-5">

                            <div className="flex items-start gap-4">
                                <div className="
                                    flex
                                    h-10
                                    w-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    border
                                    border-cyan-400/20
                                    bg-cyan-400/10
                                    text-cyan-400
                                ">
                                    <Mail className="h-5 w-5" />
                                </div>

                                <div>
                                    <p className="
                                        text-sm
                                        font-semibold
                                        text-white
                                    ">
                                        Email
                                    </p>

                                    <a
                                href="mailto:info@magnavertex.com"
                                className="
                                    text-sm
                                    text-slate-400
                                    transition
                                    hover:text-cyan-300
                                "
                            >
                                        info@magnavertex.com
                                    </a>
                                </div>
                            </div>


                            <div className="flex items-start gap-4">
                                <div className="
                                    flex
                                    h-10
                                    w-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    border
                                    border-cyan-400/20
                                    bg-cyan-400/10
                                    text-cyan-400
                                ">
                                    <MapPin className="h-5 w-5" />
                                </div>

                                <div>
                                    <p className="
                                        text-sm
                                        font-semibold
                                        text-white
                                    ">
                                        Location
                                    </p>

                                    <p className="
                                        mt-1
                                        text-sm
                                        text-slate-400
                                    ">
                                        Pampanga,Philippines
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>


                    {/* Contact Form */}
                    <div className="
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/[0.04]
                        p-6
                        shadow-2xl
                        backdrop-blur-sm
                        sm:p-8
                    ">

                        {successMessage && (
                        <div
                            className="
                                mb-5
                                rounded-lg
                                border
                                border-emerald-400/20
                                bg-emerald-400/10
                                px-4
                                py-3
                                text-sm
                                text-emerald-300
                            "
                        >
                            {successMessage}
                        </div>
                    )}

                    {generalError && (
                        <div
                            className="
                                mb-5
                                rounded-lg
                                border
                                border-red-400/20
                                bg-red-400/10
                                px-4
                                py-3
                                text-sm
                                text-red-300
                            "
                        >
                            {generalError}
                        </div>
                    )}

                        <form onSubmit={handleSubmit} className="space-y-5">

                            <div>
                                <label
                                    htmlFor="name"
                                    className="
                                        text-sm
                                        font-medium
                                        text-slate-200
                                    "
                                >
                                    Name <span className="text-red-500">*</span>
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="
                                        mt-2
                                        w-full
                                        rounded-lg
                                        border
                                        border-white/10
                                        bg-white/5
                                        px-4
                                        py-3
                                        text-sm
                                        text-white
                                        outline-none
                                        transition
                                        placeholder:text-slate-500
                                        focus:border-cyan-400/50
                                        focus:ring-2
                                        focus:ring-cyan-400/10
                                    "
                                    placeholder="Your name"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-400">
                                        {errors.name[0]}
                                    </p>
                                )}
                            </div>


                            <div>
                                <label
                                    htmlFor="email"
                                    className="
                                        text-sm
                                        font-medium
                                        text-slate-200
                                    "
                                >
                                    Email <span className="text-red-500">*</span>
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="
                                        mt-2
                                        w-full
                                        rounded-lg
                                        border
                                        border-white/10
                                        bg-white/5
                                        px-4
                                        py-3
                                        text-sm
                                        text-white
                                        outline-none
                                        transition
                                        placeholder:text-slate-500
                                        focus:border-cyan-400/50
                                        focus:ring-2
                                        focus:ring-cyan-400/10
                                    "
                                    placeholder="email@email.com"
                                    required
                                />
                                 {errors.email && (
                                    <p className="mt-1 text-sm text-red-400">
                                        {errors.email[0]}
                                    </p>
                                )}
                            </div>

                            <div>
                            <label
                                htmlFor="company"
                                className="
                                    text-sm
                                    font-medium
                                    text-slate-200
                                "
                            >
                                Company / Organization
                                <span className="ml-1 text-slate-500">
                                    (Optional)
                                </span>
                            </label>

                            <input
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                type="text"
                                className="
                                    mt-2
                                    w-full
                                    rounded-lg
                                    border
                                    border-white/10
                                    bg-white/5
                                    px-4
                                    py-3
                                    text-sm
                                    text-white
                                    outline-none
                                    transition
                                    placeholder:text-slate-500
                                    focus:border-cyan-400/50
                                    focus:ring-2
                                    focus:ring-cyan-400/10
                                "
                                placeholder="Company name"
                            />
                            {errors.company && (
                                <p className="mt-1 text-sm text-red-400">
                                    {errors.company[0]}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="projectType"
                                className="
                                    text-sm
                                    font-medium
                                    text-slate-200
                                "
                            >
                                Project Type <span className="text-red-500">*</span>
                            </label>

                            <select
                                id="project_type"
                                name="project_type"
                                value={formData.project_type}
                                onChange={handleChange}
                                className="
                                    mt-2
                                    w-full
                                    rounded-lg
                                    border
                                    border-white/10
                                    bg-slate-900
                                    px-4
                                    py-3
                                    text-sm
                                    text-white
                                    outline-none
                                    transition
                                    focus:border-cyan-400/50
                                    focus:ring-2
                                    focus:ring-cyan-400/10
                                "
                                required
                            >
                                <option
                                    value=""
                                    disabled
                                    className="text-slate-500"
                                >
                                    Select a project type
                                </option>

                                <option value="web-application">
                                    Web Application
                                </option>

                                <option value="business-system">
                                    Business System
                                </option>

                                <option value="cms-website">
                                    CMS / Website
                                </option>

                                <option value="ecommerce">
                                    E-Commerce
                                </option>

                                <option value="other">
                                    Other
                                </option>
                            </select>

                            {errors.project_type && (
                                <p className="mt-1 text-sm text-red-400">
                                    {errors.project_type[0]}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="subject"
                                className="
                                    text-sm
                                    font-medium
                                    text-slate-200
                                "
                            >
                                Subject <span className="text-red-500">*</span>
                            </label>

                            <input
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                type="text"
                                className="
                                    mt-2
                                    w-full
                                    rounded-lg
                                    border
                                    border-white/10
                                    bg-white/5
                                    px-4
                                    py-3
                                    text-sm
                                    text-white
                                    outline-none
                                    transition
                                    placeholder:text-slate-500
                                    focus:border-cyan-400/50
                                    focus:ring-2
                                    focus:ring-cyan-400/10
                                "
                                placeholder="What can we help you with?"
                                required
                            />
                            {errors.subject && (
                                <p className="mt-1 text-sm text-red-400">
                                    {errors.subject[0]}
                                </p>
                            )}
                        </div>


                            <div>
                                <label
                                    htmlFor="message"
                                    className="
                                        text-sm
                                        font-medium
                                        text-slate-200
                                    "
                                >
                                    Message <span className="text-red-500">*</span>
                                </label>

                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    className="
                                        mt-2
                                        w-full
                                        resize-none
                                        rounded-lg
                                        border
                                        border-white/10
                                        bg-white/5
                                        px-4
                                        py-3
                                        text-sm
                                        text-white
                                        outline-none
                                        transition
                                        placeholder:text-slate-500
                                        focus:border-cyan-400/50
                                        focus:ring-2
                                        focus:ring-cyan-400/10
                                    "
                                    placeholder="Tell us about your project, goals, or the problem you're trying to solve..."
                                    required
                                />
                                {errors.message && (
                                    <p className="mt-1 text-sm text-red-400">
                                        {errors.message[0]}
                                    </p>
                                )}
                            </div>


                            <button
                                type="submit"
                                className="
                                    w-full
                                    rounded-lg
                                    bg-cyan-500
                                    px-5
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-slate-950
                                    transition
                                    hover:bg-cyan-400
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-cyan-400/50
                                    focus:ring-offset-2
                                    focus:ring-offset-slate-950
                                    cursor-pointer
                                "
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Sending..." : "Send Inquiry"}
                            </button>

                        </form>

                    </div>

                </div>

            </Container>
        </section>
    );
}