import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
//   Linkedin,
//   Youtube,
//   Instagram,
} from "lucide-react";

import logo from "../../assets/advicelab-logo.webp";
import Youtube from "../../assets/SocialMediaIcon/youtube.png";
import Linkedin from "../../assets/SocialMediaIcon/linkedin.png";
import Instagram from "../../assets/SocialMediaIcon/instagram.png";
import TikTokIcon from "../../assets/SocialMediaIcon/tiktok.png";

import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { useState } from "react";
import { ContactPopup } from "../ui/ContactPopup";
// import BookWalkthrough from "../services/BookWalkthrough";

const footerLinks = {
  company: [
    { name: "About Us", href: "https://advicelab.com.au/about-us" },
    { name: "Careers", href: "https://advicelab.com.au/careers" },
    { name: "Contact Us", href: "https://advicelab.com.au/contact-us" },
    { name: "Giving Back", href: "https://advicelab.com.au/giving-back" },
  ],
  services: [
    { name: "Paraplanning ", href: "https://advicelab.com.au/services/paraplanning" },
    { name: "Client Support Officers ", href: "https://advicelab.com.au/services/clientsupport" },
    { name: "SMSF & Accounting ", href: "https://advicelab.com.au/services/smsf-accounting" },
    { name: "Mortgage Support  ", href: "https://advicelab.com.au/services/mortgage-support" },
  ],
  resources: [
    // { name: "Adviser’s Guide for Outsourcing ", href: "https://advicelab.com.au/resources" },
    // { name: "Pricing Calculator ", href: "https://advicelab.com.au/resources#case-studies" },
    // { name: "Accountant’s Offshoring Playbook ", href: "https://advicelab.com.au/resources#pricing" },
    // { name: "Virtual CSO Task Library ", href: "https://advicelab.com.au/resources#guide" },
    // { name: "SMSF Trustee Education Kit  ", href: "https://advicelab.com.au/resources#pricing" },
    { name: "Blog  ", href: "https://advicelab.com.au/resources/blogs" },
  ],

  legal: [
    {
      name: "Information Security Statement",
      href: "https://advicelab.com.au/information-security-statement",
    },
    { name: "Privacy Policy", href: "https://advicelab.com.au/pdf/AL_Privacy-policy.pdf" },
    { name: "Cookies Policy", href: "https://advicelab.com.au/cookies-policy" },
  ],
};

export function Footer() {
  // const hideCta =
  //   pathname.startsWith("/careers") ||
  //   pathname.startsWith("/contact-us") ||
  //   pathname.startsWith("/cookies-policy") ||
  //   pathname.startsWith("/services/pricing-calculator") ||
  //   pathname.startsWith("/services/paraplanning-pricing") ||
  //   pathname.startsWith("/giving-back");

//   const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation();
  const { ref: mainRef, isVisible: mainVisible } = useScrollAnimation();
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

  return (
    <footer className="bg-white text-foreground">
      {/* CTA Section */}
      {/* {!hideCta && (
        <div id="book-walkthrough">
          <BookWalkthrough />
          onClick={() => {
              const element = document.getElementById("book-walkthrough");
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
        </div>
      )} */}

      {/* Main Footer */}
      <div className="py-16">
        <div
          ref={mainRef}
          className={`container mx-auto px-4 lg:px-8 transition-all duration-700 ${
            mainVisible ? "scroll-fade-up" : "opacity-0 translate-y-8"
          }`}
        >
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 stagger-children ${
              mainVisible ? "animate" : ""
            }`}
          >
            {/* Brand */}
            <div className="lg:col-span-2">
              <img src={logo} alt="Advice Lab" className="h-10 w-auto mb-6" />
              <p className="text-foreground mb-6 max-w-sm">
                Expert offshore support for Australian financial advisors. Scale
                your practice with our dedicated team.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-5 h-5" />
                  <a
                    href="mailto:hello@advicelab.com.au"
                    className="hover:text-foreground"
                  >
                    hello@advicelab.com.au
                  </a>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="w-5 h-5" />
                  <a href="tel:+61280740884" className="hover:text-foreground">
                    +61 2 8074 0884
                  </a>
                </div>

                <div className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span>
                    <span>Australia:</span> No.368, Sussex St, Sydney, NSW 2000
                  </span>
                </div>

                <div className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span>
                    <span>Sri Lanka:</span> No.75, Keththarama Mawatha, Colombo
                    14
                  </span>
                </div>

                <div className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span>
                    <span>Philippines:</span> Level 9, Arthaland Century Pacific
                    Tower, 4th & 5th Avenue corner 30th Street, Bonifacio Global
                    City, Taguig, Metro Manila
                  </span>
                </div>
              </div>
            </div>

            {/* Company Links */}
            <div>
              {/* <h4 className="font-display font-semibold mb-4 text-foreground">
                Company
              </h4> */}
              <p className="font-display font-semibold mb-4">Company</p>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links */}
            <div>
              <p className="font-display font-semibold mb-4">Services</p>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <p className="font-display font-semibold mb-4">Resources</p>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal & Privacy Links */}
            <div>
              <p className="font-display font-semibold mb-4">
                Security & Compliance
              </p>

              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    {link.href.endsWith(".pdf") ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Advice Lab. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/advice-intel/"
                aria-label="Visit Advice Lab on LinkedIn"
                className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Linkedin} alt="LinkedIn" className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@Advice_Lab"
                aria-label="Visit Advice Lab on YouTube"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
              >
                <img src={Youtube} alt="YouTube" className="w-6 h-6" />
              </a>

              <a
                href="https://www.instagram.com/advice.lab/"
                aria-label="Visit Advice Lab on Instagram"
                className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Instagram} alt="Instagram" className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@advicelab"
                aria-label="Visit Advice Lab on TikTok"
                className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={TikTokIcon} alt="TikTok" className="w-5 h-5" />
              </a>
            </div>
          </div>
          {/* Privacy Policy Notice */}
          {/* <div className="mt-6 text-center text-xs text-muted-foreground/50 max-w-4xl mx-auto">
            To view our{" "}
            <a
              href="/pdf/AL_Privacy-policy.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:underline"
            >
              Privacy Policy
            </a>{" "}
            or{" "}
            <Link
              to="/cookies-policy"
              className="text-foreground hover:underline"
            >
              Cookies Policy
            </Link>
            , please click here. If you wish to make an enquiry regarding any
            privacy concerns, please contact us at{" "}
            <a
              href="mailto:hello@advicelab.com.au"
              className="text-foreground hover:underline"
            >
              hello@advicelab.com.au
            </a>
          </div> */}
        </div>
      </div>
      <ContactPopup
        open={isContactPopupOpen}
        onOpenChange={setIsContactPopupOpen}
        title="Support Designed for You"
        description="We know that your practice back-office needs are unique.
                        So we want to help you to give the support your practice
                        deserves, just let us know and we'll take you on a quick
                        walkthrough."
      />
    </footer>
  );
}
