import HeroSection from '../../components/sections/HeroSection';
import WebLayout from '../../layouts/WebLayout';
import ServicesSection from '../../components/sections/ServicesSection';
import AboutSection from '../../components/sections/AboutSection';
import ContactSection from '../../components/sections/ContactSection';
import BusinessSolutionSection from '../../components/sections/BusinessSolutions';

import type { Service } from '../../types/service';

interface HomeProps {
    services: Service[];
}

export default function Home({ services }: HomeProps) {
    return (
        <WebLayout>
            <HeroSection />

            <ServicesSection services={services} />

            <BusinessSolutionSection />

            <AboutSection />

            <ContactSection />
        </WebLayout>
    );
}