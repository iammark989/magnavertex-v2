import emsImage from "../assets/projects/featured_image/ems.png";
import ecommerceImage from "../assets/projects/featured_image/ecommerce.png";
import recruitmentImage from "../assets/projects/featured_image/recruitment.png";

export const PROJECTS = [
    {
        id: "ecommerce",
        title: "E-Commerce & Inventory Management",
        description:
            "A centralized solution for managing products, inventory, purchasing, suppliers, orders, and other core business operations.",
        technologies: [
            "Laravel",
            "React",
            "TypeScript",
            "MySQL",
        ],
        featured_image: ecommerceImage,
        featured: true,
    },

    {
        id: "recruitment",
        title: "Recruitment & Applicant Management",
        description:
            "A digital solution for publishing opportunities, collecting applications, organizing candidates, and supporting recruitment workflows.",
        technologies: [
            "Laravel",
            "React",
            "TypeScript",
            "MySQL",
        ],
        featured_image: recruitmentImage,
        featured: false,
    },

    {
        id: "employee-management",
        title: "Employee Management System",
        description:
            "A centralized system for organizing employee information and supporting internal workforce management processes.",
        technologies: [
            "Laravel",
            "React",
            "TypeScript",
            "MySQL",
        ],
        featured_image: emsImage,
        featured: false,
    },
] as const;