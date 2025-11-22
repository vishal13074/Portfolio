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
  Palette,
  Smartphone
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Navigation } from '../components/Navigation';

// Dynamically import Spline to avoid SSR issues
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
});

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section 
        id="home" 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(14, 165, 233, 0.15) 0%, transparent 50%)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black"></div>

        {/* Spline Model - Clean without spotlight effects */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="relative w-full h-full ml-auto" style={{ marginLeft: '22%' }}>
            <Spline 
              scene="https://draft.spline.design/Myvn9n-8rErKmU8d/scene.splinecode"
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
                <div className="text-cyan-400 font-semibold text-lg tracking-wider">
                  Hello Everyone I'm
                </div>
                
                <motion.h1 
                  className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white-800 to-cyan-400 animate-gradient">
                   Vishal{' '} N
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
                  className="group bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 flex items-center justify-center gap-2 relative overflow-hidden"
                >
                  <span className="relative z-10">View My Work</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300 relative z-10" size={20} />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
                
                <button 
                  onClick={handleDownloadCV}
                  className="group bg-black/30 backdrop-blur-sm hover:bg-black/40 px-8 py-4 rounded-lg font-semibold transition-all duration-300 border border-cyan-400/30 hover:border-cyan-400 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/20 flex items-center justify-center gap-2 relative overflow-hidden glow-border-button"
                >
                  <Download size={20} className="relative z-10" />
                  <span className="relative z-10">Download CV</span>
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
                  <div className="text-1xl font-bold text-cyan-500 text-left">
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
            className="absolute top-1/4 left-2/8 text-cyan-500/30 text-6xl font-mono"
          >
            &lt;/&gt;
          </motion.div>
          
          <motion.div 
            animate={{ y: [20, -20, 20], rotate: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            className="absolute top-3/4 right-1/6 text-blue-300/40 text-4xl"
          >
            ⚡
          </motion.div>
          
          <motion.div 
            animate={{ y: [-15, 15, -15], x: [-10, 10, -10] }}
            transition={{ duration: 5, repeat: Infinity, delay: 2 }}
            className="absolute top-1/2 right-2/4 text-cyan-500/40 text-5xl"
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

               <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10">
                <Palette className="text-cyan-500 mb-4" size={32} />
                <h3 className="text-2xl font-bold mb-3">UI/UX Design</h3>
                <p className="text-gray-300 leading-relaxed">
                  Designing intuitive and beautiful user experiences with attention 
                  to detail, accessibility, and modern design principles.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10">
                <Code className="text-blue-500 mb-4" size={32} />
                <h3 className="text-2xl font-bold mb-3">Frontend Development</h3>
                <p className="text-gray-300 leading-relaxed">
                  Specialized in React, Next.js, and modern JavaScript frameworks. 
                  Creating responsive, interactive, and performant user interfaces.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/10">
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
              Featured <span className="text-cyan-500">Projects</span>
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
                className="group relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20"
              >
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4 z-10">
                  <button className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors duration-300">
                    <Github size={20} />
                  </button>
                  <button className="bg-cyan-600 p-3 rounded-full hover:bg-cyan-700 transition-colors duration-300">
                    <ExternalLink size={20} />
                  </button>
                </div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-500 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech}
                        className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-xs font-semibold"
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
              Let's <span className="text-cyan-500">Connect</span>
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
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
              >
                <contact.icon className="text-cyan-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" size={32} />
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

      {/* Custom CSS for glowing button border */}
      <style jsx>{`
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
          border-radius: 8px;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: xor;
          animation: glow-border-rotate 3s linear infinite;
          opacity: 0.7;
        }

        .glow-border-button:hover::before {
          opacity: 1;
          animation-duration: 2s;
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
      `}</style>
    </div>
  );
}