import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { TechnologiesSection } from "../components/TechnologiesSection";
import { EducationSection } from "../components/EducationSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <TechnologiesSection />
      <EducationSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
