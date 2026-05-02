import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 pt-32 pb-20">
        <div className="max-w-2xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-8 flex justify-center"
          >
            <div className="relative">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border border-primary/40"
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                  transition={{
                    duration: 2,
                    delay: i * 0.6,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              ))}
              <div className="relative bg-primary/10 p-6 rounded-full border border-primary/20">
                <CheckCircle2 className="w-16 h-16 text-primary" />
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-6"
          >
            Application <span className="text-primary">Received.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-muted-foreground font-body mb-10 max-w-lg mx-auto leading-relaxed"
          >
            Your pilot request is in our system. Our team will review your agency's volume and reach out within 24 hours to coordinate your first video.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-foreground font-heading font-semibold hover:bg-white/10 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <a
              href="https://calendly.com/anushkarthik666/consultation"
              target="_blank"
              rel="noreferrer"
              className="magnetic-btn inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-heading font-semibold tracking-wide hover:opacity-90 transition-all"
            >
              Book a Strategy Call
            </a>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYou;
