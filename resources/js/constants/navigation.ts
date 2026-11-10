import { ROUTES } from "./routes";

export const NAVIGATION = [
    {
        id: "services",
        label: "Services",
        href: ROUTES.SERVICES,
    },
    {
        id: "about",
        label: "About",
        href: ROUTES.ABOUT,
    },
    {
        id: "solutions",
        label: "Business Solutions",
        href: ROUTES.SOLUTIONS,
    },
    {
        id: "contact",
        label: "Contact",
        href: ROUTES.CONTACT,
    },
   
]as const;