import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome to BVSoftware, your ally in the digital world",
  description: "Immerse yourself in the heart of our software company, where innovation and technical excellence merge to create extraordinary solutions",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="About Page"
        description="Immerse yourself in the heart of our software company, where innovation and technical excellence merge to create extraordinary solutions"
      />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
};

export default AboutPage;
