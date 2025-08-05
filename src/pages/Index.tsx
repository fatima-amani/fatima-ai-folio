import { useState, useEffect } from 'react';
import portfolioData from '../data/portfolio.json';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Education from '../components/Education';
import Certifications from '../components/Certifications';
import Achievements from '../components/Achievements';
import Leadership from '../components/Leadership';
import Hobbies from '../components/Hobbies';
import FunFact from '../components/FunFact';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Index = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation isDark={isDark} toggleTheme={toggleTheme} />
      <main>
        <Hero data={portfolioData} />
        <FunFact data={portfolioData} />
        <About data={portfolioData} />
        <Skills data={portfolioData} />
        <Experience data={portfolioData} />
        <Projects data={portfolioData} />
        <Education data={portfolioData} />
        <Certifications data={portfolioData} />
        <Achievements data={portfolioData} />
        <Leadership data={portfolioData} />
        <Hobbies data={portfolioData} />
        <Contact data={portfolioData} />
      </main>
      <Footer data={portfolioData} />
    </div>
  );
};

export default Index;