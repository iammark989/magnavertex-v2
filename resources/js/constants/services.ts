import {
    Globe,
    Building2,
    FileText,
    Cloud,
} from "lucide-react";

export const SERVICES = [
    {
        id: "web-development",
        title: "Web Application Development",
        description:
            "Custom web applications built to streamline operations, improve customer experiences, and support business growth.",
        icon: Globe,
    },
    {
        id: "business-systems",
        title: "Business Systems",
        description:
            "Tailored digital systems that help businesses manage processes, information, and day-to-day operations more efficiently.",
        icon: Building2,
    },
    {
        id: "cms",
        title: "CMS & Content Platforms",
        description:
            "Flexible content management solutions that make it easier to manage, organize, and publish business content online.",
        icon: FileText,
    },
    {
        id: "cloud",
        title: "Cloud & Digital Solutions",
        description:
            "Scalable digital solutions designed to help businesses modernize their infrastructure and expand their online presence.",
        icon: Cloud,
    },
] as const;