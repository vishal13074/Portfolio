'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  Code,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Menu,
  Palette,
  Smartphone,
  X
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamically import Spline to avoid SSR issues
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
});

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    setMounted(true);
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/cv/MyResume.pdf';
    link.download = 'MyResume.pdf';
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
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
      github: 'https://github.com',
      demo: 'https://demo.com'
    },
    {
      title: 'AI Chat Bot',
      description: 'Real-time chat application with AI integration, featuring modern design and seamless UX.',
      tech: ['React', 'Node.js', 'Socket.io', 'OpenAI'],
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
      github: 'https://github.com',
      demo: 'https://demo.com'
    },
    {
      title: '3D Portfolio Website',
      description: 'Interactive 3D portfolio with Spline integration, showcasing modern web development.',
      tech: ['Next.js', 'Spline', 'Framer Motion', 'Three.js'],
      image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg',
      github: 'https://github.com',
      demo: 'https://demo.com'
    },
    {
      title: 'Fitness Tracker App',
      description: 'Web app for tracking heartbeat, blood, spo2.',
      tech: ['React Native', 'Firebase', 'python'],
      image: 'https://fitnesscfgyms.com/wp-content/uploads/2021/10/fitness-center.jpeg',
      github: 'https://github.com',
      demo: 'https://demo.com'
    },
    {
      title: 'Parking Slot Detection',
      description: 'Robust parking slot detection implemented using YOLOv8 object detection with pretrained datasets.',
      tech: ['Python', 'YOLOv8'],
      image: 'https://content.cogniteq.com/s3fs-public/2023-11/1600x800%203.png',
      github: 'https://github.com',
      demo: 'https://demo.com'
    },
    {
      title: 'Task Recommendation System',
      description: 'Task Recommendation System using Machine Learning (Emotion Detection) and Natural Language Processing.',
      tech: ['React.js','Python'],
      image: 'https://img.freepik.com/premium-vector/meditation-multitasking-businessman-practicing-yoga-man-sitting-lotus-pose-flat-vector-illustration-business-management-concentration-concept-banner-website-design-landing-web-page_179970-6576.jpg',
      github: 'https://github.com',
      demo: 'https://demo.com'
    },
    {
      title: 'Signature Detection',
      description: 'Robust parking slot detection implemented using YOLOv8 object detection with trained datasets.',
      tech: ['Python', 'YOLOv8-OBB'],
      image: 'https://orbograph.com/wp-content/uploads/2021/02/7-Check-Fraud-Signature-Genuine.jpg',
      github: 'https://github.com',
      demo: 'https://demo.com'
    },
    {
      title: 'Travel Planner',
      description: 'Full-stack travel planning application with user authentication, itinerary management, and booking features.',
      tech: ['Next.js', 'MongoDB', 'Tailwind CSS', 'Auth0','API'],
      image: 'https://media.istockphoto.com/id/1497396873/photo/ready-for-starting-my-beach-holiday.jpg?s=612x612&w=0&k=20&c=Rfb7IbYAZR1hNTF6KUDYq8CVu9Yr4wRgK2VLZIZyORY=',
      demo: 'https://demo.com'
    },
  ];

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-gray-800/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              className="text-2xl font-bold bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Portfolio
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-all duration-300 hover:text-red-500 ${
                    activeSection === section ? 'text-red-500' : 'text-white'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/90 backdrop-blur-lg border-t border-gray-800/30"
          >
            <div className="px-4 py-6 space-y-4">
              {['home', 'about', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left capitalize text-lg hover:text-red-500 transition-colors duration-300"
                >
                  {section}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Clean Dark Background */}
        <div className="absolute inset-0 z-0 bg-black"></div>

        {/* Isolated spotlight for robot only */}
        <div className="absolute inset-0 z-5">
          <div className="absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full" 
               style={{
                 background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 75%)',
                 filter: 'blur(60px)'
               }}>
          </div>
        </div>

        {/* Spline Model - Clean without spotlight effects */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="relative w-full h-full ml-auto" style={{ marginLeft: '22%' }}>
            <Spline 
              scene="https://prod.spline.design/7jmE3ZEhAIHbusiF/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Enhanced Text Content */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-screen">
            
            {/* Left Side - Main Content */}
            <motion.div 
              style={{ opacity }}
              className="text-left space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-4"
              >
                <div className="text-red-600 font-semibold text-lg tracking-wider">
                  Hello Everyone I'm
                </div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
                >
                  <span className="block bg-gradient-to-r from-red-600 via-orange-100 to-white-500 bg-clip-text text-transparent">
                    Vishal N
                  </span>
                </motion.h1>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-gray-300 leading-relaxed max-w-lg"
              >
                I'm a Full Stack Developer and Final Year Student at Easwari Engineering College, Department of Information Technology, with a strong foundation in web development and a growing passion for Machine Learning and Computer Vision. 
                I enjoy building scalable, user-centric applications and continuously exploring innovative solutions at the intersection of software and intelligence.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button
                  onClick={() => scrollToSection('projects')}
                  className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 flex items-center justify-center gap-2 relative overflow-hidden"
                >
                  <span className="relative z-10">View My Work</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300 relative z-10" size={20} />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
                
                <button 
                  onClick={handleDownloadCV}
                  className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm px-8 py-4 rounded-lg font-semibold transition-all duration-300 border border-white/20 hover:border-red-500/50 transform hover:scale-105 hover:shadow-2xl hover:shadow-white/10 flex items-center justify-center gap-2"
                >
                  <Download size={20} />
                  Download CV
                </button>
              </motion.div>

              {/* Stats or Skills Preview */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex gap-8 pt-8"
              >
                <div className="text-center">
                  <div className="text-1xl font-bold text-red-500 text-left">
                    I build things for the web  <br />
                    from sleek frontends to powerful backends.
                  </div>
                </div>
              
              </motion.div>
            </motion.div>

            {/* Right Side - Robot Space */}
            <div className="hidden lg:block"></div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 z-16 pointer-events-none">
          <motion.div 
            animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/4 left-1/6 text-red-500/30 text-6xl font-mono"
          >
            &lt;/&gt;
          </motion.div>
          
          <motion.div 
            animate={{ y: [20, -20, 20], rotate: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            className="absolute top-3/4 right-1/6 text-red-500/20 text-4xl"
          >
            ⚡
          </motion.div>
          
          <motion.div 
            animate={{ y: [-15, 15, -15], x: [-10, 10, -10] }}
            transition={{ duration: 5, repeat: Infinity, delay: 2 }}
            className="absolute top-1/2 right-2/4 text-red-500/25 text-5xl"
          >
            🚀
          </motion.div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        >
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm text-gray-400 tracking-wider">SCROLL</span>
            <div className="w-6 h-10 border-2 border-red-500/50 rounded-full flex justify-center relative">
              <motion.div 
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-3 bg-red-500 rounded-full mt-2"
              />
            </div>
          </div>
        </motion.div>
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
              About <span className="text-red-500">Me</span>
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

               <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-white/5">
                <Palette className="text-red-500 mb-4" size={32} />
                <h3 className="text-2xl font-bold mb-3">UI/UX Design</h3>
                <p className="text-gray-300 leading-relaxed">
                  Designing intuitive and beautiful user experiences with attention 
                  to detail, accessibility, and modern design principles.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-white/5">
                <Code className="text-red-500 mb-4" size={32} />
                <h3 className="text-2xl font-bold mb-3">Frontend Development</h3>
                <p className="text-gray-300 leading-relaxed">
                  Specialized in React, Next.js, and modern JavaScript frameworks. 
                  Creating responsive, interactive, and performant user interfaces.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-white/5">
                <Smartphone className="text-red-500 mb-4" size={32} />
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
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
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

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Featured <span className="text-red-500">Projects</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A showcase of my recent work, featuring innovative solutions and 
              cutting-edge technologies
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div 
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="group relative rounded-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <button className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors duration-300">
                    <Github size={20} />
                  </button>
                  <button className="bg-red-600 p-3 rounded-full hover:bg-red-700 transition-colors duration-300">
                    <ExternalLink size={20} />
                  </button>
                </div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-red-500 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech}
                        className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Let's <span className="text-red-500">Connect</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's discuss your next project 
              and create something amazing together.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-white/10"
              >
                <contact.icon className="text-red-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" size={32} />
                <h3 className="text-xl font-bold mb-2">{contact.title}</h3>
                <p className="text-gray-300">{contact.info}</p>
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
    </div>
  );
}