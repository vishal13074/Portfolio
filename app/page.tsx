'use client';

  import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Code,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Palette,
  Smartphone
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Navigation } from '../components/Navigation';
import { SplashScreen } from '../components/SplashScreen';

  // Optimized Spline import with better caching
  const Spline = dynamic(() => import('@splinetool/react-spline'), {
    ssr: false,
    loading: () => null // No loading state since preloading is done
  });

  export default function Portfolio() {
    const [activeSection, setActiveSection] = useState('home');
    const [mounted, setMounted] = useState(false);
    const [showSplash, setShowSplash] = useState(true);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [currentProject, setCurrentProject] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [userInteracted, setUserInteracted] = useState(false);
    const [projectsInView, setProjectsInView] = useState(true);
    const [splineReady, setSplineReady] = useState(false);
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    useEffect(() => {
      setMounted(true);
      
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        });
      };
      
      const handleScroll = () => {
        const sections = ['home', 'about', 'projects', 'contact'];
        const currentPosition = window.scrollY + 100;

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (currentPosition >= offsetTop && currentPosition < offsetTop + offsetHeight) {
              setActiveSection(section);
              break;
            }
          }
        }
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    const scrollToSection = (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const handleDownloadCV = () => {
      const link = document.createElement('a');
      link.href = '/cv/Vishal Resume.pdf';
      link.download = 'Vishal Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const skills = [
      { name: 'React/Next.js' },
      { name: 'Node.js' },
      { name: 'Python' },
      { name: 'UI/UX Design' },
      { name: 'HTML/CSS'},
      { name: 'PostgreSQL' },
      { name: 'Machine Learning' },
      { name: 'Git' }
    ];

    const leftSkills = skills.slice(0, 5);
    const rightSkills = skills.slice(5, 9);

    const projects = [
      {
        title: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution with modern UI/UX, payment integration, and admin dashboard.',
        tech: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind'],
        image: '/ecommerce.jpg',
        github: 'https://github.com',
        demo: 'https://demo.com'
      },
      {
        title: 'Ride IT',
        description: 'Cycle Rental booking mobile application, featuring modern design and seamless UX.',
        tech: ['Flutter', 'Node.js', 'Firebase'],
        image: '/cool-bicycle-studio.jpg',
        github: 'https://github.com',
        demo: 'https://demo.com'
      },
      {
        title: '3D Portfolio Website',
        description: 'Interactive 3D portfolio with Spline integration, showcasing modern web development.',
        tech: ['Next.js', 'Spline', 'Tailwind CSS'],
        image: '/portfolio.jpg',
        github: 'https://github.com',
        demo: 'https://demo.com'
      },
      {
        title: 'Fitness Tracker App',
        description: 'Web app for tracking heartbeat, blood, spo2.',
        tech: ['React', 'Firebase', 'python'],
        image: '/fitness.avif',
        github: 'https://github.com',
        demo: 'https://demo.com'
      },
      {
        title: 'Parking Slot Detection',
        description: 'Robust parking slot detection implemented using YOLOv8 object detection with pretrained datasets.',
        tech: ['Python', 'YOLOv8'],
        image: '/parking.avif',
        github: 'https://github.com',
        demo: 'https://demo.com'
      },
      
      {
        title: 'Signature Detection',
        description: 'Robust parking slot detection implemented using YOLOv8 object detection with trained datasets.',
        tech: ['Python', 'YOLOv8-OBB'],
        image: '/signature.png',
        github: 'https://github.com',
        demo: 'https://demo.com'
      },
      {
        title: 'Travel Planner',
        description: 'Full-stack travel planning application with user authentication, itinerary management, and booking features.',
        tech: ['Next.js', 'MongoDB', 'Tailwind CSS', 'Auth0','API'],
        image: '/travel.jpg',
        demo: 'https://demo.com'
      },
    ];

    const nextProject = () => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setUserInteracted(true); // User manually navigated
      setCurrentProject((prev) => (prev + 1) % projects.length);
      setTimeout(() => setIsTransitioning(false), 100);
    };

    const prevProject = () => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setUserInteracted(true); // User manually navigated
      setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
      setTimeout(() => setIsTransitioning(false), 100);
    };

    const goToProject = (index: number) => {
      if (isTransitioning || index === currentProject) return;
      setIsTransitioning(true);
      setUserInteracted(true); // User manually navigated
      setCurrentProject(index);
      setTimeout(() => setIsTransitioning(false), 100);
    };

    // Handle keyboard navigation
    useEffect(() => {
      const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prevProject();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          nextProject();
        }
      };

      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isTransitioning]);

    // Resume auto-movement after user interaction
    useEffect(() => {
      if (!userInteracted) return;

      const resumeTimer = setTimeout(() => {
        setUserInteracted(false);
      }, 5000); // Resume auto-movement after 5 seconds

      return () => clearTimeout(resumeTimer);
    }, [userInteracted, currentProject]);

    // Intersection Observer to detect if projects section is visible
    useEffect(() => {
      const projectsSection = document.getElementById('projects');
      if (!projectsSection) return;

      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          setProjectsInView(entry.isIntersecting && entry.intersectionRatio > 0.3);
        },
        {
          threshold: [0, 0.3, 0.7, 1],
          rootMargin: '-10% 0px -10% 0px'
        }
      );

      observer.observe(projectsSection);
      return () => observer.disconnect();
    }, [mounted]);

    // Ultra smooth auto-advance with better pause conditions
    useEffect(() => {
      // Pause if: user is hovering, user interacted recently, or projects section not visible
      if (isPaused || userInteracted || !projectsInView) return;
      
      const autoAdvance = setInterval(() => {
        setCurrentProject((prev) => (prev + 1) % projects.length);
      }, 1500);

      return () => clearInterval(autoAdvance);
    }, [isPaused, userInteracted, projectsInView]);

    const handleSplashComplete = () => {
      setShowSplash(false);
    };

    // Don't render until mounted to avoid hydration issues
    if (!mounted) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }

    // Show splash screen
    if (showSplash) {
      return <SplashScreen onComplete={handleSplashComplete} />;
    }

    return (
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        {/* Preload links in head */}
        <head>
          <link rel="preload" href="/ecommerce.jpg" as="image" />
          <link rel="preload" href="/cool-bicycle-studio.jpg" as="image" />
          <link rel="preload" href="/portfolio.jpg" as="image" />
          <link rel="preload" href="/fitness.avif" as="image" />
          <link rel="preload" href="https://draft.spline.design/Myvn9n-8rErKmU8d/scene.splinecode" as="fetch" crossOrigin="anonymous" />
        </head>

        {/* Navigation */}
        <Navigation />

        {/* Hero Section */}
        <section 
          id="home" 
          className="relative min-h-screen flex items-center justify-center overflow-hidden px-4"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(14, 165, 233, 0.15) 0%, transparent 50%)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black"></div>

          {/* Instant-loading Spline Model */}
          <div className="absolute inset-0 z-10 pointer-events-none hidden lg:block">
            <div className="relative w-full h-full ml-auto" style={{ marginLeft: '22%' }}>
              <Spline 
                scene="https://draft.spline.design/Myvn9n-8rErKmU8d/scene.splinecode"
                className="w-full h-full"
                onLoad={() => setSplineReady(true)}
                style={{ opacity: splineReady ? 1 : 0.7 }}
              />
            </div>
          </div>

          {/* Enhanced Text Content */}
          <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 items-center min-h-screen py-20 lg:py-0">
              
              {/* Main Content - Full width on mobile, left side on desktop */}
              <motion.div 
                style={{ opacity }}
                className="text-center lg:text-left space-y-6 sm:space-y-8 max-w-2xl mx-auto lg:mx-0"
              >
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-3 sm:space-y-4"
                >
                  <div className="text-cyan-400 font-semibold text-base sm:text-lg tracking-wider">
                    Hello Everyone I'm
                  </div>
                  
                  <motion.h1 
                    className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white-800 to-cyan-400 animate-gradient">
                    Vishal
                    </span>
                  </motion.h1>
                </motion.div>
                
                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed"
                >
                  I'm a Full Stack Developer and Final Year Student at Easwari Engineering College, Department of Information Technology, with a strong foundation in web development and a growing passion for Machine Learning and Computer Vision.
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
                >
                  <button
                    onClick={() => scrollToSection('projects')}
                    className="group bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 flex items-center justify-center gap-2 relative overflow-hidden text-sm sm:text-base"
                  >
                    <span className="relative z-10">View My Work</span>
                    <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300 relative z-10" size={18} />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>
                  
                  <button 
                    onClick={handleDownloadCV}
                    className="group bg-black/30 backdrop-blur-sm hover:bg-black/40 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 border border-cyan-400/30 hover:border-cyan-400 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/20 flex items-center justify-center gap-2 relative overflow-hidden glow-border-button text-sm sm:text-base"
                  >
                    <Download size={18} className="relative z-10" />
                    <span className="relative z-10">Download CV</span>
                  </button>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="pt-4 sm:pt-8"
                >
                  <div className="text-base sm:text-lg lg:text-xl font-bold text-cyan-500">
                    I build things for the web<br />
                    from sleek frontends to powerful backends.
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Floating Elements - Adjust for mobile */}
          <div className="absolute inset-0 z-16 pointer-events-none">
            <motion.div 
              animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-1/4 left-[5%] sm:left-[12%] text-cyan-500/30 text-4xl sm:text-6xl font-mono"
            >
              &lt;/&gt;
            </motion.div>
            
            <motion.div 
              animate={{ y: [20, -20, 20], rotate: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute top-3/4 left-[8%] sm:left-1/6 text-blue-300/40 text-3xl sm:text-4xl"
            >
              ⚡
            </motion.div>
            
            <motion.div 
              animate={{ y: [-15, 15, -15], x: [-10, 10, -10] }}
              transition={{ duration: 5, repeat: Infinity, delay: 2 }}
              className="absolute top-1/2 right-[10%] sm:right-2/4 text-cyan-500/40 text-4xl sm:text-5xl"
            >
              🚀
            </motion.div>
          </div>

          {/* Background Animated Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                About <span className="text-cyan-500">Me</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                I'm a passionate Full Stack Developer with a strong foundation in building scalable, responsive web applications. I specialize in modern frontend and backend technologies, with growing expertise in Machine Learning and Computer Vision. 
                I love crafting intelligent, user-focused digital experiences that solve real-world problems.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >

                <div className="about-card bg-white/5 backdrop-blur-sm border border-cyan-400/30 hover:border-cyan-400 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10 relative overflow-hidden glow-border-button">
                  <Palette className="text-cyan-500 mb-4" size={32} />
                  <h3 className="text-2xl font-bold mb-3">UI/UX Design</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Designing intuitive and beautiful user experiences with attention 
                    to detail, accessibility, and modern design principles.
                  </p>
                </div>

                <div className="about-card bg-white/5 backdrop-blur-sm border border-cyan-400/30 hover:border-cyan-400 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 relative overflow-hidden glow-border-button">
                  <Code className="text-blue-500 mb-4" size={32} />
                  <h3 className="text-2xl font-bold mb-3">Frontend Development</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Specialized in React, Next.js, and modern JavaScript frameworks. 
                    Creating responsive, interactive, and performant user interfaces.
                  </p>
                </div>

                <div className="about-card bg-white/5 backdrop-blur-sm border border-cyan-400/30 hover:border-cyan-400 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/10 relative overflow-hidden glow-border-button">
                  <Smartphone className="text-cyan-400 mb-4" size={32} />
                  <h3 className="text-2xl font-bold mb-3">Backend Development</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Specialized in Node.js, Express, and RESTful API design.
  Building robust, scalable, and secure server-side applications.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="about-card bg-white/5 backdrop-blur-sm border border-cyan-400/30 hover:border-cyan-400 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 relative overflow-hidden glow-border-button">
                  <h3 className="text-2xl font-bold mb-4">Skills & Expertise</h3>
                  <div className="grid grid-cols-2 gap-x-10 gap-y-5">
                    <div className="space-y-3">
                      {leftSkills.map((skill, index) => (
                        <div key={skill.name} className="text-gray-300">
                          <span className="font-medium">{skill.name}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3">
                      {rightSkills.map((skill, index) => (
                        <div key={skill.name} className="text-gray-300">
                          <span className="font-medium">{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section - Responsive Carousel */}
        <section id="projects" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Featured <span className="text-cyan-500">Projects</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                A showcase of my recent work, featuring innovative solutions and 
                cutting-edge technologies
              </p>
            </motion.div>

            {/* 3D Card Carousel - Responsive */}
            <div 
              className="relative h-[500px] sm:h-[600px] flex items-center justify-center perspective-1000"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              tabIndex={0}
            >
              <div className="relative w-full max-w-6xl">
                {projects.map((project, index) => {
                  let offset = index - currentProject;
                  
                  if (offset > projects.length / 2) {
                    offset = offset - projects.length;
                  } else if (offset < -projects.length / 2) {
                    offset = offset + projects.length;
                  }
                  
                  const absOffset = Math.abs(offset);
                  const isActive = index === currentProject;
                  const isVisible = absOffset <= 3;
                  
                  return (
                    <motion.div
                      key={index}
                      className="absolute top-1/2 left-1/2 cursor-pointer"
                      style={{
                        transformStyle: 'preserve-3d',
                        zIndex: isActive ? 25 : Math.max(1, 20 - absOffset),
                      }}
                      animate={{
                        x: `${offset * (typeof window !== 'undefined' && window.innerWidth < 640 ? 150 : 280) - (typeof window !== 'undefined' && window.innerWidth < 640 ? 100 : 200)}px`,
                        y: '-50%',
                        rotateY: offset * -12,
                        rotateX: absOffset * 1.5,
                        scale: isActive ? 1 : Math.max(0.7, 1 - absOffset * 0.1),
                        opacity: isVisible ? (absOffset > 2 ? 0.2 : 1) : 0,
                      }}
                      transition={{
                        type: "tween",
                        duration: 0.8,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      onClick={() => goToProject(index)}
                    >
                      <div 
                        className="w-[280px] sm:w-[350px] lg:w-[400px] h-[380px] sm:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-cyan-500/20 shadow-2xl relative group"
                        style={{
                          transform: `rotateY(${offset * 2}deg)`,
                          transition: 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
                        }}
                      >
                        {/* Project Image with Correction */}
                        <div className="absolute inset-0">
                          <ImageWithFallback
                            src={project.image}
                            alt={project.title}
                            className="project-image"
                            style={{ 
                              filter: isActive ? 'none' : 'brightness(0.7) saturate(0.8)',
                              transition: 'filter 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)'
                            }}
                          />
                          <div 
                            className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20"
                            style={{ 
                              opacity: isActive ? 0.7 : 0.9,
                              transition: 'opacity 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)'
                            }}
                          />
                        </div>

                        {/* Project Title */}
                        <div className="absolute bottom-6 left-6 right-6 z-20">
                          <h3 
                            className="text-2xl font-bold text-white mb-2"
                            style={{
                              transition: 'transform 0.3s ease',
                              transform: isActive ? 'translateY(0)' : 'translateY(5px)'
                            }}
                          >
                            {project.title}
                          </h3>
                          
                          {/* Ultra smooth details transition */}
                          <div
                            style={{
                              opacity: isActive ? 1 : 0,
                              transform: `translateY(${isActive ? 0 : 10}px)`,
                              transition: 'opacity 0.6s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
                              height: isActive ? 'auto' : 0,
                              overflow: 'hidden',
                            }}
                          >
                            {isActive && (
                              <div>
                                <p 
                                  className="text-gray-300 text-sm mb-4 line-clamp-3"
                                  style={{
                                    transition: 'opacity 0.4s ease 0.2s',
                                    opacity: isActive ? 1 : 0
                                  }}
                                >
                                  {project.description}
                                </p>
                                
                                {/* Tech Stack */}
                                <div 
                                  className="flex flex-wrap gap-2 mb-4"
                                  style={{
                                    transition: 'opacity 0.4s ease 0.3s',
                                    opacity: isActive ? 1 : 0
                                  }}
                                >
                                  {project.tech.slice(0, 3).map((tech, i) => (
                                    <span 
                                      key={tech}
                                      className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded text-xs backdrop-blur-sm"
                                      style={{
                                        transition: `opacity 0.3s ease ${0.4 + i * 0.1}s, transform 0.3s ease ${0.4 + i * 0.1}s`,
                                        opacity: isActive ? 1 : 0,
                                        transform: `translateY(${isActive ? 0 : 5}px)`
                                      }}
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>

                                {/* Action Buttons */}
                                <div 
                                  className="flex space-x-3"
                                  style={{
                                    transition: 'opacity 0.4s ease 0.5s, transform 0.4s ease 0.5s',
                                    opacity: isActive ? 1 : 0,
                                    transform: `translateY(${isActive ? 0 : 10}px)`
                                  }}
                                >
                                  <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200 flex items-center gap-2">
                                    <ExternalLink size={16} />
                                    View
                                  </button>
                                  <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200 flex items-center gap-2 backdrop-blur-sm">
                                    <Github size={16} />
                                    Code
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Glow effect for active card */}
                        <div
                          className="absolute inset-0 rounded-2xl border-2 border-cyan-500/40 shadow-lg shadow-cyan-500/50 pointer-events-none"
                          style={{
                            opacity: isActive ? 10 : 0,
                            transform: `scale(${isActive ? 1 : 0.98})`,
                            transition: 'opacity 0.6s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)'
                          }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Controls - Responsive */}
            <div className="flex justify-center items-center space-x-4 sm:space-x-5 mt-6 sm:mt-8">
              <button
                onClick={prevProject}
                className="bg-black/50 hover:bg-black/70 text-cyan-400 p-3 sm:p-4 rounded-full transition-all duration-300 backdrop-blur-sm border border-cyan-500/30 hover:scale-110 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/25"
                title="Previous project"
              >
                <ChevronLeft size={24} className="sm:w-7 sm:h-7" />
              </button>
              
              <button
                onClick={nextProject}
                className="bg-black/50 hover:bg-black/70 text-cyan-400 p-3 sm:p-4 rounded-full transition-all duration-300 backdrop-blur-sm border border-cyan-500/30 hover:scale-110 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/25"
                title="Next project"
              >
                <ChevronRight size={24} className="sm:w-7 sm:h-7" />
              </button>
            </div>
          </div>
        </section>

        {/* Contact Section - Responsive Grid */}
        <section id="contact" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Let's <span className="text-cyan-500">Connect</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Ready to bring your ideas to life? Let's discuss your next project 
                and create something amazing together.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
              {[
                { icon: Mail, title: 'Email', info: 'vishal13074@gmail.com', href: 'mailto:vishal13074@gmail.com' },
                { icon: Github, title: 'GitHub', info: 'github.com/vishal13074', href: 'https://github.com/vishal13074' },
                { icon: Linkedin, title: 'LinkedIn', info: 'linkedin.com/in/vishal-n', href: 'https://www.linkedin.com/in/vishal-n-001559257/' }
              ].map((contact, index) => (
                <motion.a
                  key={contact.title}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group bg-white/5 backdrop-blur-sm border border-cyan-400/30 hover:border-cyan-400 rounded-2xl p-6 sm:p-8 text-center hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 relative overflow-hidden glow-border-button"
                >
                  <contact.icon className="text-cyan-500 mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300" size={28} />
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{contact.title}</h3>
                  <p className="text-gray-300 text-sm sm:text-base break-all">{contact.info}</p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/10">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-gray-400">
              © 2025 Creative Developer. Crafted with passion and code.
            </p>
          </div>
        </footer>

        {/* Custom CSS for glowing button border and custom cursor */}
        <style jsx global>{`
          html, body {
            cursor: url('/mouse (2).png') 0 0, auto !important;
          }
          
          *, *::before, *::after {
            cursor: inherit !important;
          }
          
          button, a, [role="button"], input[type="button"], input[type="submit"] {
            cursor: url('/mouse (2).png') 0 0, pointer !important;
          }

          input[type="text"], input[type="email"], textarea {
            cursor: url('/mouse (2).png') 0 0, text !important;
          }

          .glow-border-button {
            position: relative;
          }

          .glow-border-button::before {
            content: '';
            position: absolute;
            inset: 0;
            padding: 2px;
            background: linear-gradient(45deg, transparent, cyan, transparent, cyan, transparent);
            background-size: 200% 200%;
            border-radius: inherit;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: xor;
            -webkit-mask-composite: xor;
            opacity: 0;
            z-index: -1;
            transition: opacity 0.3s ease;
            will-change: opacity, background-position;
          }

          .glow-border-button:hover::before {
            opacity: 1;
            animation: glow-border-rotate 2s linear infinite;
          }

          /* Pause animations when not needed */
          .glow-border-button:not(:hover)::before {
            animation-play-state: paused;
          }

          @keyframes glow-border-rotate {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          /* Reduce animation load */
          @media (prefers-reduced-motion: reduce) {
            .glow-border-button::before {
              animation: none !important;
              background: linear-gradient(45deg, transparent, cyan, transparent) !important;
            }
          }

          .perspective-1000 {
            perspective: 1000px;
          }

          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .project-image {
            border-radius: 0;
          }

          .project-image:hover {
            transform: scale(1.02) !important;
          }

          /* Specific corrections for different image sources */
          img[src*="pexels.com"] {
            object-position: center top;
          }

          img[src*="freepik.com"] {
            object-position: center center;
          }

          img[src*="fitnesscfgyms.com"] {
            object-position: center 30%;
          }

          img[src*="cogniteq.com"] {
            object-position: center center;
          }

          img[src*="orbograph.com"] {
            object-position: center top;
          }

          img[src="/travel.avif"] {
            object-position: center center;
            object-fit: cover;
          }

          /* Fallback for any broken images */
          img[src*="placeholder"] {
            object-position: center center;
            filter: grayscale(100%) brightness(0.8);
          }
        `}</style>
      </div>
    );
  }