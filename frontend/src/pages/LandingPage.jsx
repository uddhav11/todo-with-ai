import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [email, setEmail] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate= useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted email:", email);
    alert(
      `Thanks for your interest! We'll notify you at ${email} when we launch.`
    );
    setEmail("");
  };

  const features = [
    {
      icon: "🤖",
      title: "AI-Powered Automation",
      description:
        "Our AI learns your workflow to automate task prioritization and scheduling.",
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Instant task processing with our optimized AI algorithms.",
    },
    {
      icon: "🔮",
      title: "Predictive Planning",
      description: "Anticipates your needs before you even realize them.",
    },
    {
      icon: "🔄",
      title: "Seamless Sync",
      description: "Real-time synchronization across all your devices.",
    },
  ];

  const testimonials = [
    {
      quote: "This AI task manager doubled my productivity in just one week!",
      author: "Sarah K., Product Manager",
    },
    {
      quote: "Finally a tool that actually understands how I work.",
      author: "James L., Software Engineer",
    },
    {
      quote: "The predictive scheduling feature is like magic.",
      author: "Maria G., Marketing Director",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 overflow-x-hidden">
      <p className="text-center">
        Note: this is just a practice project, so not all promished feature is
        available.
      </p>

      {/* Glowing background elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-900 opacity-20 blur-3xl"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 rounded-full bg-indigo-900 opacity-20 blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="relative container mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              NeuroTask
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            <a
              href="#features"
              className="text-gray-300 hover:text-purple-400 transition"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-300 hover:text-purple-400 transition"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="text-gray-300 hover:text-purple-400 transition"
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="text-gray-300 hover:text-purple-400 transition"
            >
              Pricing
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-purple-400 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          <button className="hidden md:block relative overflow-hidden group bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 lg:px-6 lg:py-2 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition" onClick={() => navigate('/register')}>
            <span className="relative z-10">Sign Up</span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            <a
              href="#features"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-purple-400 hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-purple-400 hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-purple-400 hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-purple-400 hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <button className="w-full mt-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium">
              Get Early Access
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 sm:px-6 py-12 md:py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              AI-Powered
            </span>{" "}
            Task Management
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto">
            Let artificial intelligence organize your life while you focus on
            what really matters.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 sm:mb-16">
            <button className="relative group bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/30" onClick={() => navigate('/login')}>
              <span className="relative z-10">Log In</span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
            </button>
            {/* <button className="border-2 border-purple-500 text-purple-400 px-6 py-3 sm:px-8 sm:py-4 rounded-lg hover:bg-purple-900/30 transition font-semibold text-lg hover:shadow-lg hover:shadow-purple-900/20">
              Watch Demo
            </button> */}
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto rounded-xl sm:rounded-2xl overflow-hidden border border-gray-800 shadow-lg sm:shadow-2xl shadow-purple-900/20">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-indigo-900/30"></div>
          <img
            // src="https://placehold.co/1000x600/1a1a2e/8b5cf6?text=NeuroTask+AI+Dashboard"
            src='landing.png'
            alt="AI Task Manager Dashboard"
            className="w-full h-auto relative z-0"
          />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="relative container mx-auto px-4 sm:px-6 py-12 md:py-20"
      >
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Supercharge
            </span>{" "}
            Your Productivity
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Harness the power of AI to transform how you work
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative bg-gray-800 p-6 sm:p-8 rounded-xl hover:shadow-lg hover:shadow-purple-900/20 transition-all duration-300 border border-gray-700 hover:border-purple-500/30 group"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="relative py-12 md:py-20 bg-gradient-to-b from-gray-900 to-gray-900/50"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How{" "}
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                NeuroTask
              </span>{" "}
              Works
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
              Our AI adapts to your unique workflow in just three simple steps
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-8 md:left-1/2 h-full w-0.5 bg-gradient-to-b from-purple-500 to-indigo-500"></div>

              {/* Step 1 */}
              <div className="relative mb-12 md:mb-16 md:flex items-center">
                <div className="md:w-1/2 md:pr-16 md:text-right mb-6 md:mb-0">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white text-lg sm:text-xl font-bold shadow-lg">
                    1
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-16">
                  <div className="bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-700 shadow-lg">
                    <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                      Connect Your Tools
                    </h3>
                    <p className="text-gray-400">
                      Link your calendar, email, and project management tools.
                      Our AI analyzes your current workflow and identifies
                      optimization opportunities.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative mb-12 md:mb-16 md:flex items-center">
                <div className="md:w-1/2 md:pr-16 md:text-right mb-6 md:mb-0 order-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white text-lg sm:text-xl font-bold shadow-lg">
                    2
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-16 order-1">
                  <div className="bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-700 shadow-lg">
                    <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                      AI Learns Your Patterns
                    </h3>
                    <p className="text-gray-400">
                      The system observes how you work, your productive hours,
                      task completion times, and preferences to build a
                      personalized model.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative md:flex items-center">
                <div className="md:w-1/2 md:pr-16 md:text-right mb-6 md:mb-0">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white text-lg sm:text-xl font-bold shadow-lg">
                    3
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-16">
                  <div className="bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-700 shadow-lg">
                    <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                      Get Intelligent Recommendations
                    </h3>
                    <p className="text-gray-400">
                      Receive daily optimized task lists, ideal scheduling
                      suggestions, and productivity insights tailored just for
                      you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="relative py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              What{" "}
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Users Say
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
              Don't just take our word for it
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-900/20"
              >
                <div className="text-purple-400 text-3xl sm:text-4xl mb-4">
                  "
                </div>
                <p className="text-gray-300 text-base sm:text-lg italic mb-6">
                  {testimonial.quote}
                </p>
                <p className="text-purple-400 font-medium">
                  — {testimonial.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-12 md:py-20 bg-gradient-to-br from-gray-900 to-purple-900/30">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Productivity?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8">
              Join our exclusive early access program and be among the first to
              experience the future of task management.
            </p>
            <form
              onSubmit={handleSubmit}
              className="max-w-md mx-auto flex flex-col sm:flex-row gap-4"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-grow px-4 sm:px-6 py-3 sm:py-4 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none text-white placeholder-gray-500"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all hover:shadow-lg hover:shadow-purple-900/30"
              >
                Get Early Access
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gray-900 border-t border-gray-800 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                NeuroTask
              </span>
            </div>
            <div className="flex space-x-6 mb-6 md:mb-0">
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a
                href="https://github.com/uddhav11?tab=repositories"
                className="text-gray-400 hover:text-purple-400 transition"
                target="_blank" rel="noopener noreferrer"
              >
                <span className="sr-only">GitHub</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/uddhav-adhikari-20a0262a8/"
                className="text-gray-400 hover:text-purple-400 transition"
                target="_blank" rel="noopener noreferrer"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
            <div className="text-gray-500 text-sm">
              © {new Date().getFullYear()} NeuroTask AI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
