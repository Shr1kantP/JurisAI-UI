import React, { useState } from 'react';
import { FiHome, FiUsers, FiCreditCard, FiInfo, FiGlobe, FiMapPin, FiServer, FiCheckCircle, FiDatabase } from 'react-icons/fi';
import { AiOutlineSearch, AiOutlinePlus } from 'react-icons/ai';
import { BsPersonFill, BsPieChart } from 'react-icons/bs';
import { BiArrowToRight } from 'react-icons/bi';

const LawGPTDashboard = () => {
  const [activeTab, setActiveTab] = useState('Shared Board');

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="mr-2">
              <img src="/api/placeholder/40/40" alt="Law GPT Logo" className="w-10 h-10" />
            </div>
            <h1 className="text-xl font-semibold">Law GPT</h1>
          </div>
        </div>

        <nav className="p-2">
          <ul>
            <li className="mb-1">
              <button className="flex items-center w-full p-3 rounded-md hover:bg-gray-100 text-gray-700">
                <FiHome className="mr-3" /> Dashboard
              </button>
            </li>
            <li className="mb-1">
              <button className="flex items-center w-full p-3 rounded-md hover:bg-gray-100 text-gray-700">
                <FiUsers className="mr-3" /> Users
              </button>
            </li>
            <li className="mb-1">
              <button className="flex items-center w-full p-3 rounded-md hover:bg-gray-100 text-gray-700">
                <FiCreditCard className="mr-3" /> Billing
              </button>
            </li>
          </ul>
        </nav>
        
        <div className="border-t border-gray-200 mt-4 pt-4">
          <div className="px-4">
            <div className="flex space-x-2 mb-2">
              <button 
                className={`px-2 py-1 text-xs rounded ${activeTab === 'References' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('References')}
              >
                References
              </button>
              <button 
                className={`px-2 py-1 text-xs rounded ${activeTab === 'Notepad' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('Notepad')}
              >
                Notepad
              </button>
              <button 
                className={`px-2 py-1 text-xs rounded ${activeTab === 'Personal Board' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('Personal Board')}
              >
                Personal Board
              </button>
              <button 
                className={`px-2 py-1 text-xs rounded ${activeTab === 'Shared Board' ? 'bg-gray-200 font-medium' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('Shared Board')}
              >
                Shared Board
              </button>
            </div>
            
            <div className="relative mt-2">
              <input
                type="text"
                placeholder="Search notes"
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md text-sm"
              />
              <AiOutlineSearch className="absolute left-3 top-2.5 text-gray-400" />
              <button className="absolute right-2 top-2 text-gray-400">
                <AiOutlinePlus />
              </button>
            </div>
            
            {/* Notes Section */}
            <div className="mt-4 space-y-2">
              <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                <h4 className="font-medium text-sm">Title</h4>
                <p className="text-xs text-gray-600 mt-1">
                  For Torello: The court has chosen not to impose joint legal custody, 
                  took judge's stand and in certain circumstances one parent may...
                </p>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>06/10/2024</span>
                  <button>⋮</button>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-3 rounded-md border border-yellow-100">
                <h4 className="font-medium text-sm">Significance and History</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Coram Deo is from Psalm 116, which means living in the presence of God, the omniscient, seeing as the...
                </p>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>08/16/2024</span>
                  <button>⋮</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-3 gap-6 p-6">
          {/* Workspace Info */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">Workspace info</h2>
              <button className="text-gray-500">
                <FiInfo />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gray-100 rounded-full mr-2 flex items-center justify-center text-green-500">
                    <FiCheckCircle />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Name</p>
                    <p>lawgptmt</p>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gray-100 rounded-full mr-2 flex items-center justify-center text-green-500">
                    <FiGlobe />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Domain</p>
                    <p>lawgptmt-test.lawgpt.com</p>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gray-100 rounded-full mr-2 flex items-center justify-center text-green-500">
                    <FiMapPin />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Region</p>
                    <p>East US</p>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gray-100 rounded-full mr-2 flex items-center justify-center text-green-500">
                    <FiServer />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">SKU</p>
                    <p>standard</p>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gray-100 rounded-full mr-2 flex items-center justify-center text-green-500">
                    <FiDatabase />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Storage</p>
                    <p>1 GB</p>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gray-100 rounded-full mr-2 flex items-center justify-center text-green-500">
                    <FiCheckCircle />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Status</p>
                    <p>Provisioned</p>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium">
                Go to workspace
              </button>
            </div>
          </div>
          
          {/* Users Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="font-semibold text-lg mb-6">Users</h2>
            
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <BsPersonFill className="w-6 h-6 text-gray-500" />
              </div>
            </div>
            
            <div className="text-center mb-8">
              <h1 className="text-6xl font-bold">3</h1>
              <p className="text-sm text-gray-500 mt-2">Total number of users in the workspace</p>
            </div>
            
            <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg font-medium">
              See all users in app
            </button>
          </div>
          
          {/* Cases and Storage */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="font-semibold text-lg mb-3">Cases Storage</h2>
              
              <div className="flex justify-center mb-4">
                <div className="w-28 h-28">
                  <BsPieChart className="w-full h-full" style={{ color: '#4CAF50' }} />
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>friends transcripts</span>
                  <span>97.376GB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>friends case</span>
                  <span>78.689GB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>friends case</span>
                  <span>52.225GB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Purdue Pharma - test</span>
                  <span>45.036GB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>other</span>
                  <span>39.376GB</span>
                </div>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="font-medium mb-2">Used storage</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold">60 GB</span>
                  <span className="text-lg font-bold">-59 GB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Used</span>
                  <span>Free</span>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <div className="mt-2 flex justify-end">
                  <span className="text-green-600 font-bold">6000.00%</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="font-semibold text-lg mb-6">Cases</h2>
              
              <div className="flex justify-center mb-6">
                <div className="relative w-24 h-24">
                  <div className="w-full h-full rounded-full border-8 border-blue-500 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold">5</div>
                      <div className="text-xs">Cases</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-500">Active</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-500">Archived</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Feedback Modal */}
      <div className="absolute top-20 right-4 bg-white shadow-lg rounded-lg w-72 p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Feedback</h3>
          <button className="text-gray-400">×</button>
        </div>
        
        <p className="text-sm mb-4">Thank you for taking the time to give us feedback.</p>
        
        <div className="mb-4">
          <p className="text-sm mb-2">Are you satisfied with your experience?</p>
          <div className="flex space-x-2">
            <button className="border border-gray-300 rounded-full p-1 px-3">
              👍
            </button>
            <button className="border border-gray-300 rounded-full p-1 px-3">
              👎
            </button>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">Type your feedback here (2500 characters max)</p>
          <textarea className="w-full border border-gray-300 rounded-md p-2 text-sm" rows="3"></textarea>
        </div>
        
        <div className="mb-4">
          <label className="flex items-center text-xs">
            <input type="checkbox" className="mr-2" />
            It is OK to contact me about my questions and comments.
          </label>
        </div>
        
        <button className="bg-gray-500 text-white rounded-md px-4 py-1 text-sm float-right">
          Submit
        </button>
      </div>
    </div>
  );
};

export default LawGPTDashboard;