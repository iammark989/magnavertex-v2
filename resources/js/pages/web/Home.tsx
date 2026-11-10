import HeroSection from '../../components/sections/HeroSection';
import WebLayout from '../../layouts/WebLayout';
import ServicesSection from '../../components/sections/ServicesSection';
import AboutSection from '../../components/sections/AboutSection';
import ContactSection from '../../components/sections/ContactSection';
import BusinessSolutionSection from '../../components/sections/BusinessSolutions';

import type { Service } from '../../types/service';
import type { BusinessSolution } from '../../types/businessSolution';

interface HomeProps {
    services: Service[];
    businessSolutions: BusinessSolution[];
}

export default function Home({
    services,
    businessSolutions,
}: HomeProps) {
    return (
        <WebLayout>
            <HeroSection />

            <ServicesSection services={services} />

            <BusinessSolutionSection solutions={businessSolutions} />

            <AboutSection />

            <ContactSection />
        </WebLayout>
    );
}