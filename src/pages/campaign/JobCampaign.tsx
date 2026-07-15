import Seo from "../../components/ui/Seo";
// import { trackFormSubmission } from "../../lib/analytics";
import { useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { Button } from "../../components/ui/button";
import { FileUpload } from "../../components/ui/FileUpload";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { useToast } from "../../hooks/use-toast";
import { ArrowRight, CheckCircle } from "lucide-react";
import { ScrollAnimation } from "../../components/ui/ScrollAnimation";
import greatPlaceToWorkCertificate1 from "../../assets/About/great-place-to-work-2024.webp";
import greatPlaceToWorkCertificate2 from "../../assets/About/great-place-to-work-2025.webp";
import { CompanyLifeShowcase } from "../../components/home/CompanyLifeShowcase";

// const API_BASE_URL =
//   "https://oxch4uog7g.execute-api.ap-southeast-2.amazonaws.com/prod";

// const contactInfo = [
//   {
//     icon: Mail,
//     title: "Email",
//     value: "hello@advicelab.com.au",
//   },
//   {
//     icon: Phone,
//     title: "Phone",
//     value: "+61 2 8074 0884",
//   },
//   {
//     icon: MapPin,
//     title: "Address",
//     value: "368 Sussex St, Sydney, NSW 2000, Australia",
//   },
//   // {
//   //   icon: MapPin,
//   //   title: "Address",
//   //   value: "75 Keththarama Mawatha, Colombo 14,Sri Lanka",
//   // },
//   // {
//   //   icon: MapPin,
//   //   title: "Address",
//   //   value:
//   //     "Level 29, World Plaza, 5thAvenue, BGC Fort Bonifacio 1634 Taguig City",
//   // },
//   {
//     icon: Clock,
//     title: "Business Hours",
//     value: "Mon-Fri 9am-5pm AEST",
//   },
// ];

const JobCampaign = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    motivation: "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [loading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  // const [isVideoPlaying, setIsVideoPlaying] = useState(false);


  // Validation state
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    motivation?: string;
    cvFile?: string;
  }>({});

  const [touched, setTouched] = useState<{
    firstName?: boolean;
    lastName?: boolean;
    email?: boolean;
    phone?: boolean;
    motivation?: boolean;
  }>({});
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "firstName":
        if (!value.trim()) {
          return "First name is required";
        }
        break;
      case "lastName":
        if (!value.trim()) {
          return "Last name is required";
        }
        break;
      case "email":
        if (!value.trim()) {
          return "Email address is required";
        }
        if (!emailRegex.test(value)) {
          return "Please enter a valid email address";
        }
        break;
      case "phone":
        if (value.trim() && !/^\d+$/.test(value)) {
          return "Phone number must contain numbers only";
        }
        break;
      case "motivation":
        if (!value.trim()) {
          return "Please share your motivation";
        }
        break;
    }
    return undefined;
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (touched[name as keyof typeof touched]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    const firstNameError = validateField("firstName", formData.firstName);
    if (firstNameError) newErrors.firstName = firstNameError;

    const lastNameError = validateField("lastName", formData.lastName);
    if (lastNameError) newErrors.lastName = lastNameError;

    const emailError = validateField("email", formData.email);
    if (emailError) newErrors.email = emailError;

    const motivationError = validateField("motivation", formData.motivation);
    if (motivationError) newErrors.motivation = motivationError;

    const phoneError = validateField("phone", formData.phone);
    if (phoneError) newErrors.phone = phoneError;

    if (!cvFile) {
      newErrors.cvFile = "Please upload your CV";
    }

    setErrors(newErrors);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      motivation: true,
      phone: true,
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      // compute first invalid field synchronously
      const checks: Array<{ key: string; valid: boolean }> = [];
      checks.push({ key: "firstName", valid: !!validateField("firstName", formData.firstName) });
      checks.push({ key: "lastName", valid: !!validateField("lastName", formData.lastName) });
      checks.push({ key: "email", valid: !!validateField("email", formData.email) });
      checks.push({ key: "motivation", valid: !!validateField("motivation", formData.motivation) });
      checks.push({ key: "phone", valid: !!validateField("phone", formData.phone) });
      const firstInvalid = checks.find((c) => c.valid);
      if (firstInvalid) {
        const el = document.querySelector(`[name="${firstInvalid.key}"]`) as HTMLElement | null;
        if (el && typeof el.focus === "function") el.focus();
      }
      toast({
        title: "Please fix errors",
        description: "Complete required fields marked with *",
        variant: "destructive",
      });
      return;
    }

    // For now, mark submitted locally — integrate with API as needed
    setSubmitted(true);
    toast({
      title: "Application submitted",
      description: "Thank you — we've received your application.",
    });
  };

  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     if (!validateForm()) {
  //       return;
  //     }

  //     setLoading(true);

  //     const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  //     const submissionDate = new Date().toLocaleString("en-AU", {
  //       timeZone: userTimeZone,
  //       day: "numeric",
  //       month: "long",
  //       year: "numeric",
  //       hour: "2-digit",
  //       minute: "2-digit",
  //       hour12: true,
  //     });

  //     const emailBody = `
  // ADVICELAB - NEW APPLICATION SUBMISSION
  // =========================================

  // Submission Date: ${submissionDate}

  // Applicant Details:
  // ------------------
  // First name: ${formData.firstName}
  // Last name: ${formData.lastName}
  // Email: ${formData.email}
  // Phone: ${formData.phone || "Not provided"}

  // Motivation:
  // -----------
  // ${formData.motivation}

  // CV File: ${cvFile?.name || "No file uploaded"}

  // ---
  // This application was submitted through the AdviceLab application form.
  //     `;

  //     try {
  //       const response = await fetch(`${API_BASE_URL}/send-email`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           // "x-api-key": "n4wSKrdsls7LO2vpHj78Qa9sR28ozfxS4qcCK9fL",
  //         },
  //         //  sender: "marketing@advicelab.com.au",
  //         //   recipient: "hello@advicelab.com.au",

  //         body: JSON.stringify({
  //           sender: "noreply@advicelab.com.au",
  //           recipient: "hello@advicelab.com.au",
  //           subject: `New Contact Form Submission: ${formData.name}`,
  //           body: emailBody,
  //           is_html: false,
  //           attachments: [],
  //         }),
  //       });

  //       if (!response.ok) {
  //         throw new Error("Failed to send message");
  //       }

  //       setSubmitted(true);
  //       // Track form submission in GA4
  //       try {
  //         trackFormSubmission("contact_form", {
  //           name: formData.name,
  //           email: formData.email,
  //           company: formData.company,
  //         });
  //       } catch (err) {
  //         // swallow analytics errors
  //       }
  //       setTimeout(() => {
  //         window.scrollTo({ top: 0, behavior: "smooth" });
  //       }, 100);
  //     } catch (error) {
  //       console.error("Error sending message:", error);
  //       toast({
  //         title: "Error",
  //         description: "Failed to send message. Please try again later.",
  //         variant: "destructive",
  //       });
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const contactSchema = {
    "@type": "ContactPage",
    name: "Contact Us - Advice Lab",
    url: "https://advicelab.com.au/contact-us",
    description: "Contact page for Advice Lab",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: "+61280740884",
      email: "hello@advicelab.com.au",
      url: "https://advicelab.com.au/contact-us",
    },
  };

  return (
    <Layout>
      <Seo
        title="Super 11 Application"
        description="Apply for the Super 11 training program at Advice Lab. Share your details, motivation and CV to join the next intake."
        keywords="Super 11 application, CV submission, training program, Advice Lab, financial services career"
        pathname="/super-11-application"
        schemaData={contactSchema}
      />
      {/* Hero */}
      <section className="py-24 gradient-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="sr-only">Submit Your Application</h1>
          <ScrollAnimation animation="fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6">
              Submit Your Application
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto text-center">
              Ready to become a Super 11? Share your details and CV with us.
            </p>
          </ScrollAnimation>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <ScrollAnimation animation="fade-left" delay={200}>
              <div className="relative">
                <div className="aspect-video rounded-3xl overflow-hidden hover-lift shadow-2xl group">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/61HQJv39w-c?si=-WC_HsK218UWvveD"
                    title="Advice Lab - Life at Work"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>

                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-right">
              <div>
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold uppercase tracking-wider text-sm rounded-full mb-4">
                  Future Finance Leaders
                </span>
                <h2 className="font-display font-bold mt-2 mb-6 text-foreground text-2xl md:text-3xl">
                  Not everyone gets a seat at the table.
                </h2>
                <ul className="text-muted-foreground mb-8 space-y-3 list-disc list-inside pl-5 marker:text-primary marker:text-base">
                  <li>We're selecting 11 ambitious interns with the curiosity to learn and the determination to grow.</li>
                  <li>Gain confidence and make a difference from day one in Australia’s financial services industry.</li>
                  <li>Build real-world experience that sets you apart.</li>
                  <li>Think you've got what it takes? Your future starts here. Apply today.</li>
                </ul>
                <Button
                  size="sm"
                  asChild
                  className="h-12 px-12 text-md w-full sm:w-auto sm:min-w-[190px] transition-transform hover:scale-105"
                >
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 justify-center sm:justify-start w-full"
                  >
                    Enter the Draft
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Super 11 Training & Application */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8 space-y-16">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <ScrollAnimation animation="fade-left">
              <div className="rounded-[1rem] border border-border bg-secondary/60 p-10 shadow-xl">
                <h3 className="text-2xl font-display font-bold text-foreground mb-6">
                  Selection requirements
                </h3>
                <ul className="text-foreground text-muted-foreground mb-8 list-disc list-inside pl-2 marker:text-primary marker:text-base space-y-3">
                  <li>
                    Completed or pursuing a bachelors degree in finance, business management, banking, insurance or international business.
                  </li>
                  <li>
                    Professional qualifications related to CIMA or ACCA (preferred).
                  </li>
                  <li>
                    Strong written and verbal communication skills in English.
                  </li>
                  <li>
                    Team-oriented mindset with a willingness to learn.
                  </li>
                </ul>

                <div className="mt-10 space-y-6 text-md text-muted-foreground leading-8">
                  <p>This isn’t just another internship.</p>
                  <p>It’s your chance to learn from industry professionals, work with Australian financial advisers, build real-world skills, and be part of a supportive team that invests in your growth from day one.</p>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-right">
              <div>
                <h2 className="text-2xl font-display font-bold mb-6">
                  Submit your application
                </h2>
                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                  {submitted ? (
                    <div className="min-h-[400px] flex flex-col items-center justify-center py-12 text-center">
                      <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                      <h3 className="text-3xl font-bold mb-2">Application received!</h3>
                      <p className="text-muted-foreground max-w-md">
                        Thank you for applying to the Super 11 program. We'll review your CV and reach out soon.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            First name <span className="text-red-500">*</span>
                          </label>
                          <Input
                            placeholder="First name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`transition-all duration-300 focus:scale-[1.02] ${errors.firstName && touched.firstName
                              ? "border-red-500 focus-visible:ring-red-500"
                              : ""
                              }`}
                          />
                          {errors.firstName && touched.firstName && (
                            <p className="text-sm text-red-500 mt-1">
                              {errors.firstName}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Last name <span className="text-red-500">*</span>
                          </label>
                          <Input
                            placeholder="Last name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`transition-all duration-300 focus:scale-[1.02] ${errors.lastName && touched.lastName
                              ? "border-red-500 focus-visible:ring-red-500"
                              : ""
                              }`}
                          />
                          {errors.lastName && touched.lastName && (
                            <p className="text-sm text-red-500 mt-1">
                              {errors.lastName}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Email address <span className="text-red-500">*</span>
                          </label>
                          <Input
                            type="email"
                            placeholder="Email address"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`transition-all duration-300 focus:scale-[1.02] ${errors.email && touched.email
                              ? "border-red-500 focus-visible:ring-red-500"
                              : ""
                              }`}
                          />
                          {errors.email && touched.email && (
                            <p className="text-sm text-red-500 mt-1">
                              {errors.email}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Phone number
                          </label>
                          <Input
                            type="tel"
                            name="phone"
                            placeholder="Phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`transition-all duration-300 focus:scale-[1.02] ${errors.phone && touched.phone
                              ? "border-red-500 focus-visible:ring-red-500"
                              : ""
                              }`}
                          />
                          {errors.phone && touched.phone && (
                            <p className="text-sm text-red-500 mt-1">
                              {errors.phone}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Your motivation to become a super 11 <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                          placeholder="Tell us why you'd be a great fit..."
                          name="motivation"
                          rows={6}
                          value={formData.motivation}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`transition-all duration-300 focus:scale-[1.01] ${errors.motivation && touched.motivation
                            ? "border-red-500 focus-visible:ring-red-500"
                            : ""
                            }`}
                        />
                        {errors.motivation && touched.motivation && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.motivation}
                          </p>
                        )}
                      </div>
                      <div>
                        <FileUpload
                          value={cvFile}
                          onChange={setCvFile}
                          label="Upload your CV"
                          error={errors.cvFile}
                        />
                      </div>
                      <Button
                        size="sm"
                        asChild
                        className="h-12 px-12 text-md w-full sm:w-auto sm:min-w-[190px] transition-transform hover:scale-105"
                      >
                        <a
                          href="#"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 justify-center sm:justify-start w-full"
                        >
                          {loading ? "Submitting..." : "Submit Application"}
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </Button>
                    </>
                  )}
                </form>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Great Place to Work Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            {/* Left Side - Two Certificates */}
            <ScrollAnimation
              animation="fade-right"
              className="order-2 lg:order-1"
            >
              {/* className="-ml-6" */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {/* Certificate 1 */}
                <div>
                  <div className="rounded-2xl overflow-hidden">
                    <img
                      src={greatPlaceToWorkCertificate1}
                      alt="Great Place to Work Certificate 2024"
                      className="w-full max-w-[220px] h-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Certificate 2 */}
                <div>
                  <div className="rounded-2xl overflow-hidden">
                    <img
                      src={greatPlaceToWorkCertificate2}
                      alt="Great Place to Work Certificate 2025"
                      className="w-full max-w-[220px] h-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Right Side - Content */}
            <ScrollAnimation
              animation="fade-left"
              className="order-1 lg:order-2"
              delay={200}
            >
              <div>
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold uppercase tracking-wider text-sm rounded-full mb-6">
                  Certified Excellence
                </span>

                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">
                  A Workplace That Believes in You
                </h2>

                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  You're stepping into a workplace that believes in your
                  potential, celebrates your strengths, and grows with you.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Curious to learn more about who we are? Check out our{" "}
                  <span className="text-foreground/80"> Instagram </span>
                  and <span className="text-foreground/80"> LinkedIn </span> to
                  get a peek into our culture and community.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button
                    size="sm"
                    asChild
                    className="h-12 px-12 text-sm w-full sm:w-auto sm:min-w-[190px] transition-transform hover:scale-105"
                  >
                    <a
                      href="https://www.instagram.com/advice.lab/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3"
                    >
                      {/* <Instagram className="w-5 h-5 group-hover:text-primary transition-colors" /> */}
                      <span>Follow on Instagram</span>
                    </a>
                  </Button>

                  <Button
                    size="sm"
                    asChild
                    className="h-12 px-12 text-sm w-full sm:w-auto sm:min-w-[190px] transition-transform hover:scale-105"
                  >
                    <a
                      href="https://www.linkedin.com/company/advice-intel/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3"
                    >
                      {/* <Linkedin className="w-5 h-5 group-hover:text-primary transition-colors" /> */}
                      <span>Connect on LinkedIn</span>
                    </a>
                  </Button>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <CompanyLifeShowcase />

    </Layout>
  );
};

export default JobCampaign;
