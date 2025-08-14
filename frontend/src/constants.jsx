
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export const BRAND_NAME = "Brands Vector Logos";
export const BASE_URL = "http://localhost:5000/alphabet";
export const ABOUT_TITLE = "About Brands Vector Logos";

export const ABOUT_DESC = `
Welcome to our Brands Vector Logos — a simple yet powerful tool that lets you 
personalize logos with just a few clicks. Whether you’re a designer, a brand 
owner, or someone who loves experimenting with visuals, our platform is built 
to give you complete creative freedom.
`;

export const FEATURES = [
  {
    icon: "🎨",
    title: "Live Color Editing",
    desc: "Instantly change fill and stroke colors of any part of the SVG using our color picker — no design software needed.",
  },
  {
    icon: "⚡",
    title: "Easy & Fast",
    desc: "Upload your own SVG or choose from our library, edit it in seconds, and download in multiple formats.",
  },
  {
    icon: "📂",
    title: "Logo Customization",
    desc: "Access a wide range of SVG brand logos and fully customize them — edit any shape, color, or detail while keeping perfect vector quality.",
  },
];

export const WHY_CHOOSE_US = [
  "100% Free to use",
  "No signup required",
  "Works on desktop & mobile",
  "Designed for both beginners and pros",
];

export const CTA_TITLE = "Ready to Create Your Perfect Logo?";
export const CTA_DESC = "Start customizing logos today and make your brand stand out.";
export const CTA_BTN = "Start Editing";



export const nav = [
  
  {
    name: "Alphabetical",
    link: "alphabetical-section", 
    type: "scroll",
  },
  {
    name: "Contact",
    link: "/contact",
    type: "route",
  },
  {
    name: "About",
    link: "/about",
    type: "route",
  },
];

export const navMobile = [
  
  {
    name: "Alphabetical",
    link: "alphabetical-section", 
    type: "scroll",
  },
  {
    name: "Contact",
    link: "/contact",
    type: "route",
  },
  {
    name: "About",
    link: "/about",
    type: "route",
  },
  {
    name: "Privacy Policy",
    link: "/privacy-policy",
    type: "route",
  },
  {
    name: "Terms of Service",
    link: "/terms-and-conditions",
    type: "route",
  },
];


export const FOOTER_LINKS = [
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "Privacy Policy", path: "/privacy-policy" },
  { label: "Terms of Service", path: "/terms-and-conditions" },
];

export const SOCIAL_LINKS = [
  { icon: FaFacebookF, url: "#" },
  { icon: FaTwitter, url: "#" },
  { icon: FaInstagram, url: "#" },
  { icon: FaLinkedinIn, url: "#" },
];


export const TERMS_CONTENT = [
  {
    title: "1. Use of Service",
    text: "You may use our Email API to send transactional or marketing emails, provided you comply with all applicable laws and regulations. You must not use the service for spamming or sending malicious content.",
  },
  {
    title: "2. Account Responsibility",
    text: "You are responsible for maintaining the security of your API key and account. You agree to notify us immediately if you suspect unauthorized use of your account.",
  },
  {
    title: "3. API Limits",
    text: "Usage limits may apply based on your subscription plan. Exceeding those limits may result in throttling or temporary suspension of service.",
  },
  {
    title: "4. Termination",
    text: "We reserve the right to suspend or terminate your access to the Email API at any time, especially if we detect misuse or violation of these terms.",
  },
  {
    title: "5. Changes to Terms",
    text: "We may update these Terms and Conditions at any time. Continued use of the service after changes implies acceptance of the new terms.",
  },
];

export const PRIVACY_CONTENT = [
  {
    title: "1. Information We Collect",
    text: "We may collect your name, email address, IP address, and usage logs for security and analytics. Email content sent via the API may also be stored temporarily for delivery and debugging.",
  },
  {
    title: "2. How We Use Information",
    text: "Information is used to provide the service, improve our infrastructure, and prevent abuse. We do not sell or share your data with third parties unless required by law.",
  },
  {
    title: "3. Data Security",
    text: "We implement industry-standard security practices including encryption, firewalls, and access controls to protect your data.",
  },
  {
    title: "4. Data Retention",
    text: "We retain usage logs and sent email data for a limited period to ensure proper service delivery and debugging, after which it is permanently deleted.",
  },
  {
    title: "5. Your Rights",
    text: "You may request access to or deletion of your personal data at any time by contacting us.",
  },
  {
    title: "6. Changes to Policy",
    text: "We may update this Privacy Policy periodically. Any changes will be posted on this page.",
  },
];