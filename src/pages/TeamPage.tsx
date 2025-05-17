import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ChevronLeft, ChevronRight } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  social: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: "Vedant Kohad",
    role: "Lead AI Researcher",
    image: "public/Vedant.jpg",
    bio: "Specializing in deep learning and medical image analysis with over 10 years of experience in AI applications for healthcare.",
    social: {
      github: "https://github.com/kohadved",
      linkedin: "https://www.linkedin.com/in/vedant-kohad/",
      email: "mailto:kohadvd@rknec.edu"
    }
  },
  {
    name: "Ayush Lochan",
    role: "UI Designer and Backend Developer",
    image: "public/Ayush.jpg",
    bio: "Passionate about web development and machine learning, focusing on using AI to create innovative, impactful applications that solve real-world problems. Always exploring new technologies to drive progress.",
    social: {
      github: "https://github.com/AyushLochan",
      linkedin: "https://www.linkedin.com/in/ayush-lochan-9b63a4276/",
      email: "mailto:ayushlochan4u@gmail.com"
    }
  },
  {
    name: "Yogeshwar Tiwari",
    role: "Learner in Web Development & Machine Learning",
    image: "public/Yogeshwar.jpg",
    bio: "Passionate about web development and machine learning, actively exploring AI-driven solutions with a focus on creating impactful and innovative applications.",
    social: {
      github: "https://github.com/Yashtiwari45",
      linkedin: "https://www.linkedin.com/in/yogeshwar-tiwari-a62645265/",
      email: "mailto:yasht3439@gmail.com"
    }
  }, {
    name: "Aditya Chaple",
    role: "Database Manager",
    image: "public/Aditya.jpg",
    bio: "Experienced Database Manager skilled in optimizing and managing data systems to ensure efficiency and security. Passionate about leveraging data to drive informed decision-making and business growth.",
    social: {
      github: "https://github.com/aditya-chaple",
      linkedin: "https://www.linkedin.com/in/aditya-rajesh-chaple/",
      email: "mailto:chaplear@rknec.edu"
    }
  }
];
const TeamPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const maxIndex = teamMembers.length;

  // Add proper clones for infinite carousel effect
  const clonedTeamMembers = [...teamMembers, ...teamMembers, ...teamMembers.slice(0, 3)];

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          return nextIndex >= maxIndex ? 0 : nextIndex;
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isPaused, maxIndex]);

  const handlePrevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? maxIndex - 1 : prevIndex - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex === maxIndex - 1 ? 0 : prevIndex + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Calculate visible members (3 at a time)
  const visibleWidth = 100 / 3; // 33.33% per card
  const carouselPosition = -(currentIndex * visibleWidth);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16">
      <div className="max-w-6xl mx-auto px-4 space-y-16">
        {/* Header with animated gradient text */}
        <div className="text-center space-y-6 animate-fade-in">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse-slow">
            Our Team
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Meet our dedicated team of experts working to advance early detection of Alzheimer's disease
            through artificial intelligence.
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded mx-auto"></div>
        </div>

        {/* Carousel Container */}
        <div
          className="relative overflow-hidden group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          ref={carouselRef}
        >
          {/* Navigation arrows */}
          <button
            onClick={handlePrevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Track */}
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(${carouselPosition}%)` }}
          >
            {clonedTeamMembers.map((member, index) => (
              <div
                key={index}
                className="w-1/3 flex-shrink-0 p-4"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden flex flex-col h-full shadow-lg hover:shadow-blue-500/20 transition-all duration-300 border border-gray-700/50 hover:border-blue-500/30 hover:-translate-y-2">
                  {/* Image container with overlay */}
                  <div className="relative overflow-hidden group">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                  </div>

                  {/* Content with subtle animations */}
                  <div className="p-6 space-y-4 flex flex-col flex-grow relative z-10">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">{member.name}</h3>
                      <p className="text-blue-400 font-medium">{member.role}</p>
                    </div>

                    <div className="h-0.5 w-12 bg-blue-500/50 rounded"></div>

                    <p className="text-gray-300 text-sm flex-grow leading-relaxed">{member.bio}</p>

                    {/* Social icons with hover effects */}
                    <div className="flex gap-4 mt-auto pt-3">
                      {member.social.github && (
                        <a
                          href={member.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"
                          aria-label="GitHub Profile"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-400 hover:scale-110 transition-all duration-300"
                          aria-label="LinkedIn Profile"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                      {member.social.email && (
                        <a
                          href={member.social.email}
                          className="text-gray-400 hover:text-purple-400 hover:scale-110 transition-all duration-300"
                          aria-label="Email Contact"
                        >
                          <Mail className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-8">
            {teamMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 mx-1.5 rounded-full transition-all duration-300 ${currentIndex === index
                    ? 'bg-blue-500 w-6'
                    : 'bg-gray-500 hover:bg-gray-300'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Add global styles */}

    </div>
  );
};

export default TeamPage;