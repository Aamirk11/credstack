import {
  Navbar,
  Hero,
  StatsBar,
  HowItWorks,
  Features,
  Pricing,
  Testimonials,
  WaitlistForm,
  Footer,
} from "@/components/landing";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <StatsBar />
      <HowItWorks />
      <Features />
      <Pricing />
      <Testimonials />
      <WaitlistForm />
      <Footer />
    </main>
  );
}
