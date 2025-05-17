import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { generateContent } from "../lib/gemini";
import { MessageSquare, Send, Sparkles, Brain } from "lucide-react";

const SAMPLE_QUESTIONS = [
  "What are the early signs of Alzheimer's disease?",
  "How accurate is brain scan analysis for Alzheimer's detection?",
  "What lifestyle changes can help prevent Alzheimer's?",
  "What's the difference between mild and moderate dementia?",
  "When should I consult a doctor about memory problems?",
  "How can I support a family member with Alzheimer's?",
];

function ChatbotPage() {
  const [messages, setMessages] = useState(
    [] as Array<{ role: "user" | "assistant"; content: string; id: string }>
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSampleQuestion = (question: string) => {
    setInput(question);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    // Add user message with unique ID
    const userMessageId = `user-${Date.now()}`;
    setMessages((prev) => [...prev, { role: "user", content: input, id: userMessageId }]);
    setLoading(true);
    setShowTypingIndicator(true);
    
    try {
      const request = {
        subject: "Neurology",
        topic: input.trim(),
        ageGroup: "N/A",
        language: "English",
        additionalInfo: "Answer as a neuro specialist.",
        generateVideo: false,
      };

      // Simulate network delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const result = await generateContent(request);

      const lines: string[] = [];
      if (result.introduction) lines.push(`**Introduction:** ${result.introduction}`);
      if (result.keyPoints && result.keyPoints.length > 0)
        lines.push(`**Key Points:** ${result.keyPoints.join(", ")}`);
      if (result.activities && result.activities.length > 0)
        lines.push(`**Activities:** ${result.activities.join(", ")}`);
      if (result.resources && result.resources.length > 0)
        lines.push(`**Resources:** ${result.resources.join(", ")}`);
      if (result.videoScript) lines.push(`**Video Script:** ${result.videoScript}`);
      if (result.codeSnippet && result.codeSnippet !== "N/A")
        lines.push(`**Code Snippet:** ${result.codeSnippet}`);
      if (result.videoUrl && result.videoUrl !== "N/A")
        lines.push(`**Video URL:** ${result.videoUrl}`);

      const assistantReply = lines.join("\n\n").trim();

      // Simulate typing delay
      setShowTypingIndicator(false);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Add assistant message with unique ID
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantReply, id: `assistant-${Date.now()}` },
      ]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setShowTypingIndicator(false);
      
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, there was an error. Please try again.",
          id: `error-${Date.now()}`
        },
      ]);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      {/* Header section with fixed blur issue */}
      <div className="relative mb-6">
        {/* Background element with blur */}
        <div className="absolute inset-0 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50"></div>
        
        {/* Content container with hover effect */}
        <div className="relative p-6 rounded-xl shadow-lg transform hover:scale-[1.02] transition-all duration-300 z-10">
          <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-blue-400 animate-pulse" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 will-change-transform">
              AI Assistant
            </span>
          </h1>
          <p className="text-gray-400">
            Ask questions about Alzheimer's disease, early detection, or get help interpreting results.
          </p>
        </div>
      </div>

      {/* Chat container with a similar fix for the blur issue */}
      <div className="relative h-[500px] rounded-xl overflow-hidden">
        {/* Background with blur */}
        <div className="absolute inset-0 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50"></div>
        
        {/* Content container */}
        <div className="relative h-full flex flex-col shadow-xl z-10">
          <div 
            ref={chatContainerRef} 
            className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth"
          >
            {messages.length === 0 && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center gap-2 text-gray-400">
                  <Brain className="w-5 h-5 text-blue-400 animate-pulse" />
                  <p>Try asking one of these questions:</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {SAMPLE_QUESTIONS.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSampleQuestion(question)}
                      className="text-left p-3 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-all duration-300 text-gray-300 hover:text-white active:bg-blue-500 active:text-white hover:shadow-md hover:shadow-blue-900/20 transform hover:scale-[1.02] animate-fade-in-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-slide-in`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 shadow-md ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                      : "bg-gradient-to-r from-gray-700 to-gray-800 text-gray-200"
                  } transform transition-all duration-300 hover:shadow-lg ${
                    message.role === "user" ? "hover:shadow-blue-500/20" : "hover:shadow-gray-600/20"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <div className="prose prose-invert prose-sm max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    message.content
                  )}
                </div>
              </div>
            ))}

            {showTypingIndicator && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-gray-200 rounded-lg p-4 shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-90" />
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-90" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-90" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700 bg-gray-800/70">
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 shadow-inner placeholder-gray-400"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg hover:shadow-blue-500/20 transform hover:scale-105"
              >
                <Send className={`w-5 h-5 ${loading ? 'animate-pulse' : ''}`} />
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Add a subtle brain pattern in the background */}
      <div className="fixed inset-0 -z-10 bg-gray-900 opacity-50 pointer-events-none">
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJ3aGl0ZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMzYgMzRjMC0yLjItMS44LTQtNC00cy00IDEuOC00IDQgMS44IDQgNCA0IDQtMS44IDQtNHoiLz48L2c+PC9zdmc+')] animate-pulse-slow" />
      </div>
    </div>
  );
}

export default ChatbotPage;