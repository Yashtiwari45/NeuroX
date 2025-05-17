import { Brain, ArrowRight, Activity, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 animate-pulse"></div>
        
        <div className="relative container mx-auto px-4 text-center space-y-8">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 rounded-full text-blue-400 mb-4 animate-fade-in-down">
            <Brain className="w-4 h-4 mr-2 animate-pulse" />
            AI-Powered Alzheimer's Detection
          </div>
          
          <h1 className="text-6xl font-bold leading-tight animate-fade-in-up">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-x">
              Early Detection
            </span>
            <br />for Better Lives
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed animate-fade-in opacity-0 transition-opacity duration-1000 delay-300">
            Empowering healthcare professionals with advanced AI technology for early 
            and accurate Alzheimer's disease diagnosis.
          </p>
          
          <div className="flex items-center justify-center gap-4 pt-4 animate-fade-in opacity-0 transition-opacity duration-1000 delay-500">
            <Link
              to="/predict"
              className="group inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 transform hover:scale-105"
            >
              Start Analysis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <Link
              to="/learn-more"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white px-6 py-4 transition-colors duration-300"
            >
              Learn More
              <ChevronRight className="w-4 h-4 animate-bounce-x" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 hover:bg-gray-900/70 transition-all duration-500 hover:shadow-xl hover:shadow-blue-900/20 transform hover:scale-105 animate-fade-in-up opacity-0 transition-opacity duration-1000">
              <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-colors duration-300">
                <Brain className="w-7 h-7 text-blue-400 group-hover:animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold mb-4 transition-colors duration-300 group-hover:text-blue-400">Advanced AI Analysis</h3>
              <p className="text-gray-400 leading-relaxed">
                Leveraging state-of-the-art machine learning models trained on comprehensive medical datasets 
                for precise diagnostics.
              </p>
            </div>
            
            <div className="group bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 hover:bg-gray-900/70 transition-all duration-500 hover:shadow-xl hover:shadow-purple-900/20 transform hover:scale-105 animate-fade-in-up opacity-0 transition-opacity duration-1000 delay-100">
              <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition-colors duration-300">
                <Clock className="w-7 h-7 text-purple-400 group-hover:animate-spin-slow" />
              </div>
              <h3 className="text-2xl font-bold mb-4 transition-colors duration-300 group-hover:text-purple-400">Early Detection</h3>
              <p className="text-gray-400 leading-relaxed">
                Identify potential signs of Alzheimer's disease in its earliest stages for better treatment outcomes.
              </p>
            </div>
            
            <div className="group bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 hover:bg-gray-900/70 transition-all duration-500 hover:shadow-xl hover:shadow-pink-900/20 transform hover:scale-105 animate-fade-in-up opacity-0 transition-opacity duration-1000 delay-200">
              <div className="w-14 h-14 bg-pink-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-pink-500/30 transition-colors duration-300">
                <Activity className="w-7 h-7 text-pink-400 group-hover:animate-bounce" />
              </div>
              <h3 className="text-2xl font-bold mb-4 transition-colors duration-300 group-hover:text-pink-400">High Accuracy</h3>
              <p className="text-gray-400 leading-relaxed">
                Achieve precise predictions through continuous model improvements and validation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-3xl p-12 space-y-8 hover:shadow-lg transition-shadow duration-500 transform hover:scale-[1.02] hover:shadow-blue-500/10 animate-slide-up opacity-0 transition-all duration-1000">
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 animate-gradient-x">
              Understanding Alzheimer's Disease
            </h2>
            
            <div className="space-y-8 text-gray-300">
              <p className="text-lg leading-relaxed animate-fade-in opacity-0 transition-opacity duration-1000 delay-100">
                Alzheimer's disease (AD) is a progressive neurodegenerative condition that affects millions 
                worldwide. While memory decline is its hallmark symptom, the disease impacts multiple cognitive 
                functions including thinking, reasoning, and decision-making abilities.
              </p>
              
              <div className="relative pl-8 border-l-4 border-blue-500 animate-slide-right opacity-0 transition-all duration-1000 delay-200">
                <h3 className="text-2xl font-bold text-white mb-4">Why Early Detection Matters</h3>
                <p className="text-gray-400 leading-relaxed">
                  Early detection is crucial as it provides the best opportunity for effective treatment and 
                  improved quality of life. Identifying Alzheimer's at its onset enables timely interventions 
                  that can slow progression and allow better future planning for patients and their families.
                </p>
              </div>

              <div className="bg-blue-500/10 rounded-2xl p-8 mt-8 hover:bg-blue-500/20 transition-colors duration-500 animate-slide-up opacity-0 transition-all duration-1000 delay-300">
                <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-gray-300 leading-relaxed">
                  We're dedicated to developing cutting-edge machine learning models for early Alzheimer's 
                  prediction. Our goal is to create reliable tools that help identify at-risk individuals, 
                  enabling proactive care and supporting intervention development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with gradient animation and pulse effects */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in-up opacity-0 transition-opacity duration-1000">
            <h2 className="text-4xl font-bold">Ready to Make a Difference?</h2>
            <p className="text-xl text-gray-300">
              Join us in the fight against Alzheimer's disease through early detection and intervention
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/predict"
                className="w-full sm:w-auto group bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-8 py-4 rounded-xl font-semibold transition-all duration-500 transform hover:scale-105 text-center hover:shadow-lg hover:shadow-purple-500/20 animate-pulse-slow"
              >
                Start Analysis Now
              </Link>
              <Link
                to="/team"
                className="w-full sm:w-auto group bg-gray-800 hover:bg-gray-700 px-8 py-4 rounded-xl font-semibold transition-all duration-300 text-center hover:shadow-md"
              >
                Meet Our Team
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50 animate-pulse-slow"></div>
      </section>
    </div>
  );
}

export default HomePage;