"use client"
import { useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import OfferList from "./OfferList";
import PricingBox from "./PricingBox";
import Link from "next/link";

const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  return (
    <section id="pricing" className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Luxury Experience within your Reach: Discover Our Exceptional Offer"
          paragraph="In a world full of challenges, we have made it simpler to access the best. More than a simple transaction, we seek to create a unique and enriching experience for you. Imagine enjoying excellence without your wallet suffering. With us, quality is accessible and surprisingly affordable."
          center
          width="665px"
        />

        <div className="w-full">
          <div className="mb-8 flex justify-center md:mb-12 lg:mb-16">
            <span
              onClick={() => setIsMonthly(true)}
              className={`${
                isMonthly
                  ? "pointer-events-none text-primary"
                  : "text-dark dark:text-white"
              } mr-4 cursor-pointer text-base font-semibold`}
            >
              Monthly
            </span>
            <div
              onClick={() => setIsMonthly(!isMonthly)}
              className="flex cursor-pointer items-center"
            >
              <div className="relative">
                <div className="h-5 w-14 rounded-full bg-[#1D2144] shadow-inner"></div>
                <div
                  className={`${
                    isMonthly ? "" : "translate-x-full"
                  } shadow-switch-1 absolute left-0 top-[-4px] flex h-7 w-7 items-center justify-center rounded-full bg-primary transition`}
                >
                  <span className="active h-4 w-4 rounded-full bg-white"></span>
                </div>
              </div>
            </div>
            <span
              onClick={() => setIsMonthly(false)}
              className={`${
                isMonthly
                  ? "text-dark dark:text-white"
                  : "pointer-events-none text-primary"
              } ml-4 cursor-pointer text-base font-semibold`}
            >
              Yearly
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {/* Basic Plan */}
          <PricingBox
            packageName="Immediate Presence"
            price={isMonthly ? "400" : "400"}
            duration={isMonthly ? "mo" : "yr"}
            subtitle="Get a professional online presence immediately with a custom static website."
          >
            <OfferList text="Custom static web design" status="active" />
            <OfferList text="Reflection of company identity and values in design" status="active" />
            <OfferList text="Customer satisfaction guarantee or full refund" status="active" />
            <OfferList text="Free 30-minute consultation session for digital marketing strategies" status="active" />
            <OfferList text="Urgent Offer: Buy today and receive a free design update valued at $XXX! Limited availability." status="active" />
          </PricingBox>

          {/* Standard Plan */}
          <PricingBox
            packageName="Strategic Expansion"
            price={isMonthly ? "700" : "700"}
            duration={isMonthly ? "mo" : "yr"}
            subtitle="Expand your online presence with a dynamic and functional website designed to attract and retain your customers."
          >
            <OfferList text="Dynamic and functional web design" status="active" />
            <OfferList text="Integration of social media to enhance interaction" status="active" />
            <OfferList text="Customer satisfaction guarantee or full refund, plus standard technical support for 3 months after delivery" status="active" />
            <OfferList text="Free 60-minute consultation session for personalized digital marketing strategies and conversion optimization" status="active" />
            <OfferList text="Urgent Offer: Buy today and secure your spot for exclusive benefits! Limited availability." status="active" />
          </PricingBox>

          {/* Premium Plan */}
          <PricingBox
            packageName="Total Transformation"
            price={isMonthly ? "1000" : "1000"}
            duration={isMonthly ? "mo" : "yr"}
            subtitle="Experience a complete digital transformation with a highly interactive and customized website that drives your business growth."
          >
            <OfferList text="Highly interactive and customized web design" status="active" />
            <OfferList text="Integration of advanced features to enhance user experience" status="active" />
            <OfferList text="Customer satisfaction guarantee or full refund, plus premium technical support for 6 months after delivery" status="active" />
            <OfferList text="Free 90-minute consultation session with experts in web design and digital marketing to develop a personalized strategy" status="active" />
            <OfferList text="Urgent Offer: Transform your business today with our premium package! Limited availability." status="active" />
            <OfferList text="Advanced chatbot as an additional bonus" status="active" />
          </PricingBox>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-[-1]">
        <svg
          width="239"
          height="601"
          viewBox="0 0 239 601"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            x="-184.451"
            y="600.973"
            width="196"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -184.451 600.973)"
            fill="url(#paint0_linear_93:235)"
          />
          <rect
            opacity="0.3"
            x="-188.201"
            y="385.272"
            width="59.7544"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -188.201 385.272)"
            fill="url(#paint1_linear_93:235)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_93:235"
              x1="-90.1184"
              y1="420.414"
              x2="-90.1184"
              y2="1131.65"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_93:235"
              x1="-159.441"
              y1="204.714"
              x2="-159.441"
              y2="915.952"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Pricing;
