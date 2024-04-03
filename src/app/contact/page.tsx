import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome to BVSoftware, your ally in the digital world",
  description: "This is the contact page of BVSoftware. You can contact us through this page.",
  // other metadata
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact Page"
        description="This is the contact page of BVSoftware. You can contact us through this page."
      />

      <Contact />
    </>
  );
};

export default ContactPage;
