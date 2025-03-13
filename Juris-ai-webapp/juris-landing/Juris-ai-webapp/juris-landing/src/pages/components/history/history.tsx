import React, { useState } from 'react';
import { Clock, Calendar, ChevronRight, Filter, Scale, FileText, Briefcase, ArrowLeft, ArrowRight, 
         Menu, X, Send, User, MessageSquare, History, Settings, LogOut, Zap, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const LegalAssistantHistoryPage = () => {
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const itemsPerPage = 8; // Show 8 cards per page (2 rows of 4)
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Sample data for demonstration - legal assistant specific sessions
  const sessions = [
    {
      id: 1,
      title: "Contract Review - Smith & Associates",
      timestamp: "2025-03-05T14:30:00",
      duration: "45 minutes",
      category: "contract",
      tags: ["Contract", "Review"]
    },
    {
      id: 2,
      title: "Legal Research - Employment Law",
      timestamp: "2025-03-04T10:15:00",
      duration: "1 hour 20 minutes",
      category: "research",
      tags: ["Research", "Employment"]
    },
    {
      id: 3,
      title: "Case Summary - Johnson v. State",
      timestamp: "2025-03-03T16:00:00",
      duration: "30 minutes",
      category: "case",
      tags: ["Case", "Summary"]
    },
    {
      id: 4,
      title: "Client Consultation Notes",
      timestamp: "2025-03-02T13:45:00",
      duration: "2 hours",
      category: "consultation",
      tags: ["Client", "Consultation"]
    },
    {
      id: 5,
      title: "Document Drafting - Will & Testament",
      timestamp: "2025-03-01T09:30:00",
      duration: "1 hour",
      category: "document",
      tags: ["Drafting", "Will"]
    },
    {
      id: 6,
      title: "Legal Memo - Regulatory Compliance",
      timestamp: "2025-02-28T11:00:00",
      duration: "1 hour 30 minutes",
      category: "memo",
      tags: ["Memo", "Compliance"]
    },
    {
      id: 7,
      title: "Trademark Search - TechCorp",
      timestamp: "2025-02-27T09:15:00",
      duration: "50 minutes",
      category: "research",
      tags: ["Trademark", "Search"]
    },
    {
      id: 8,
      title: "Contract Amendment - Baker LLC",
      timestamp: "2025-02-26T13:30:00",
      duration: "35 minutes",
      category: "contract",
      tags: ["Amendment", "Contract"]
    },
    {
      id: 9,
      title: "Patent Review - TechInvent",
      timestamp: "2025-02-25T11:30:00",
      duration: "1 hour 15 minutes",
      category: "research",
      tags: ["Patent", "Review"]
    },
    {
      id: 10,
      title: "Corporate Bylaw Update",
      timestamp: "2025-02-24T10:00:00",
      duration: "50 minutes",
      category: "document",
      tags: ["Corporate", "Bylaws"]
    },
    {
      id: 11,
      title: "Merger Analysis - BigCorp",
      timestamp: "2025-02-23T15:30:00",
      duration: "2 hours 30 minutes",
      category: "case",
      tags: ["Merger", "Analysis"]
    },
    {
      id: 12,
      title: "Estate Planning Review",
      timestamp: "2025-02-22T14:15:00",
      duration: "1 hour 10 minutes",
      category: "consultation",
      tags: ["Estate", "Planning"]
    },
    {
      id: 13,
      title: "Immigration Case Notes",
      timestamp: "2025-02-21T09:45:00",
      duration: "45 minutes",
      category: "case",
      tags: ["Immigration", "Notes"]
    },
    {
      id: 14,
      title: "Litigation Strategy - Wilson Case",
      timestamp: "2025-02-20T13:00:00",
      duration: "1 hour 45 minutes",
      category: "case",
      tags: ["Litigation", "Strategy"]
    },
    {
      id: 15,
      title: "Real Estate Contract - 123 Main St",
      timestamp: "2025-02-19T11:30:00",
      duration: "55 minutes",
      category: "contract",
      tags: ["Real Estate", "Contract"]
    },
    {
      id: 16,
      title: "Intellectual Property Memo",
      timestamp: "2025-02-18T10:15:00",
      duration: "40 minutes",
      category: "memo",
      tags: ["IP", "Memo"]
    }
  ];

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Format time for display
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  // Get icon based on category
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'contract':
        return <FileText className="h-6 w-6 text-gray-100" />;
      case 'research':
        return <Briefcase className="h-6 w-6 text-gray-100" />;
      case 'case':
        return <Scale className="h-6 w-6 text-gray-100" />;
      case 'consultation':
        return <Calendar className="h-6 w-6 text-gray-100" />;
      case 'document':
        return <FileText className="h-6 w-6 text-gray-100" />;
      case 'memo':
        return <FileText className="h-6 w-6 text-gray-100" />;
      default:
        return <FileText className="h-6 w-6 text-gray-100" />;
    }
  };

  // Filter sessions
  const filteredSessions = filter === 'all' 
    ? sessions 
    : sessions.filter(session => session.category === filter);

  // Sort sessions by date (newest first)
  const sortedSessions = [...filteredSessions].sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  );

  // Calculate total pages
  const totalPages = Math.ceil(sortedSessions.length / itemsPerPage);
  
  // Get current page items
  const currentItems = sortedSessions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle pagination
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Get category color
  const getCategoryColor = (category) => {
    switch(category) {
        case 'contract':
            return 'bg-gray-700';
          case 'research':
            return 'bg-lime-700';
          case 'case':
            return 'bg-purple-700';
          case 'consultation':
            return 'bg-orange-700';
          case 'document':
            return 'bg-red-700'; // Changed from aqua to crimson red
          case 'memo':
            return 'bg-indigo-700';
          default:
            return 'bg-gray-800';
          
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: sidebarOpen ? '256px' : '0px' }}
        transition={{ type: "tween", duration: 0.3 }}
        className="h-full bg-gray-900 text-white overflow-hidden shadow-2xl"
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold flex items-center"
            >
              <Zap className="mr-2 text-yellow-400" />
              JurisAI
            </motion.h1>
            <button onClick={toggleSidebar} className="text-white hover:text-yellow-400 transition">
              <X size={24} />
            </button>
          </div>
          
          <nav className="space-y-6 flex-grow">
            {['Main', 'Resources', 'User'].map((section, sectionIndex) => (
              <motion.div 
                key={section}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + sectionIndex * 0.1 }}
              >
                <h2 className="text-sm uppercase tracking-wider text-gray-400 mb-2">{section}</h2>
                <ul className="space-y-2">
                  {section === 'Main' && (
                    <>
                      <li>
                        <a href="" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-800 hover:text-yellow-400 transition">
                          <Home size={20} />
                          <span>Home</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-800 hover:text-yellow-400 transition">
                          <MessageSquare size={20} />
                          <span>New Chat</span>
                        </a>
                      </li>
                    </>
                  )}
                  {section === 'Resources' && (
                    <>
                      <li>
                        <a href="#" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-800 hover:text-yellow-400 transition">
                          <FileText size={20} />
                          <span>Legal Templates</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center gap-3 px-2 py-2 rounded bg-gray-800 text-yellow-400 transition">
                          <History size={20} />
                          <span>History</span>
                        </a>
                      </li>
                    </>
                  )}
                  {section === 'User' && (
                    <>
                      <li>
                        <a href="#" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-800 hover:text-yellow-400 transition">
                          <User size={20} />
                          <span>Account</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-800 hover:text-yellow-400 transition">
                          <Settings size={20} />
                          <span>Settings</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-800 hover:text-yellow-400 transition">
                          <LogOut size={20} />
                          <span>Logout</span>
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </motion.div>
            ))}
          </nav>
        </div>
      </motion.div>
      
      {/* Main Content */}
      <motion.div 
        className="flex flex-col w-full"
        animate={{ 
          marginLeft: sidebarOpen ? '0' : '0'
        }}
        transition={{ type: "tween", duration: 0.3 }}
      >
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={toggleSidebar} className="mr-4 hover:text-blue-600 transition">
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-gray-800 flex items-center">
              <Zap className="mr-2 text-yellow-500" />
              JurisAI
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="text-blue-600" size={20} />
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="flex-1 overflow-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Legal Assistant History</h1>
              
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-700" />
                <select 
                  className="bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-700 text-sm"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Activities</option>
                  <option value="contract">Contracts</option>
                  <option value="research">Research</option>
                  <option value="case">Cases</option>
                  <option value="consultation">Consultations</option>
                  <option value="document">Documents</option>
                  <option value="memo">Memos</option>
                </select>
              </div>
            </div>
            
            {/* Grid layout - 4x4 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentItems.map(session => (
                <div 
                  key={session.id} 
                  className="bg-white rounded-lg shadow border border-gray-200 hover:shadow-lg transition-shadow duration-300 flex flex-col h-64"
                >
                  <div className={`${getCategoryColor(session.category)} p-3 rounded-t-lg flex items-center justify-between`}>
                    {getCategoryIcon(session.category)}
                    <h3 className="text-md font-semibold text-white truncate ml-2 flex-1">
                      {session.title}
                    </h3>
                  </div>
                  
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex items-center text-gray-600 mb-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">{formatDate(session.timestamp)}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-2">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-sm">{formatTime(session.timestamp)}</span>
                    </div>
                    
                    <div className="bg-gray-200 px-3 py-1 rounded text-gray-700 text-sm mb-3 inline-block">
                      {session.duration}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-auto">
                      {session.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <button 
                      className="flex items-center justify-center w-full py-2 mt-4 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-shadow duration-300"
                    >
                      <span className="mr-1">View Details</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-6">
                <button 
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`flex items-center p-2 rounded-lg ${
                    currentPage === 1 ? 'text-gray-400 bg-gray-200' : 'text-white bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  <ArrowLeft className="h-5 w-5 mr-1" />
                  <span>Previous</span>
                </button>
                
                <div className="text-gray-700">
                  Page {currentPage} of {totalPages}
                </div>
                
                <button 
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`flex items-center p-2 rounded-lg ${
                    currentPage === totalPages ? 'text-gray-400 bg-gray-200' : 'text-white bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  <span>Next</span>
                  <ArrowRight className="h-5 w-5 ml-1" />
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LegalAssistantHistoryPage;