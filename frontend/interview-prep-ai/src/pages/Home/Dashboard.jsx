import React, { useEffect, useState } from 'react';
import { LuPlus, LuTrash2, LuClock, LuAward, LuZap, LuCircle } from 'react-icons/lu';
import { CARD_BG } from '../../utils/data';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/common/BackButton';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import moment from 'moment';
import Modal from '../../components/Modal';
import CreateSessionForm from './CreateSessionForm';
import DeleteAlertContent from '../../components/DeleteAlertContent';


const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);

  const [openDeleteAlert , setOpenDeleteAlert] = useState({
    ope: false,
    data: null,
  });

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response.data);
    } catch (error) {
      console.error("Error fetching session data:", error);
    }

  };

  const deleteSession = async(sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));

      toast.success("Session Deleted Successfully");
      setOpenDeleteAlert({
        open: false,
        data: null,
      });
      fetchAllSessions();
    } catch (error) {
      console.error("Error deleting session data:", error);
    }
  };

  useEffect(() => {
    fetchAllSessions();
  },[]);

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <BackButton showText={false} />
          </div>
          <div className="mb-10">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Interview Sessions</h1>
            <p className="text-gray-500 mt-1">Manage your interview preparation sessions</p>
          </div>

          {sessions?.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sessions.map((data, index) => (
                <div 
                  key={data?._id}
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group relative"
                  onClick={() => navigate(`/interview-prep/${data?._id}`)}
                >
                  {/* Status indicator bar */}
                  <div className="h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                  
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                          {data?.role || "New Session"}
                        </h3>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <LuCircle className="w-2.5 h-2.5 text-emerald-500 mr-1.5" />
                          <span>In Progress</span>
                        </div>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDeleteAlert({ open: true, data });
                        }}
                        className="text-gray-300 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors duration-200 ml-2"
                        aria-label="Delete session"
                        title="Delete session"
                      >
                        <LuTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="space-y-3 text-sm text-gray-600 border-t border-gray-100 pt-3">
                      <div className="flex items-center">
                        <LuZap className="w-4 h-4 text-amber-500 mr-2 flex-shrink-0" />
                        <span className="font-medium text-gray-700">Experience:</span>
                        <span className="ml-1">{data?.experience || "Not specified"}</span>
                      </div>
                      <div className="flex items-center">
                        <LuAward className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" />
                        <span className="font-medium text-gray-700">Questions:</span>
                        <span className="ml-1">{data?.questions?.length || 0}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <LuClock className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                        <span className="text-gray-500">
                          {data?.updatedAt ? `Updated ${moment(data.updatedAt).fromNow()}` : "New session"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                ))}
              </div>
              <button 
                onClick={() => setOpenCreateModal(true)}
                className="fixed bottom-8 right-8 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-4 rounded-xl flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 group overflow-hidden space-x-2"
                aria-label="New Session"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10 text-sm font-medium">New Session</span>
                <svg className="w-4 h-4 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </button>
            </>
          ) : (
            <div className="relative min-h-[60vh] flex items-center justify-center">
              <div className="text-center max-w-md mx-auto p-10 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">No sessions yet</h3>
                <p className="text-gray-500 mb-8 text-lg">Create your first interview session to get started</p>
                <button 
                  onClick={() => setOpenCreateModal(true)}
                  className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-3.5 rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <span className="relative z-10">New Session</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
      isOpen={openCreateModal}
      onClose={() => {
        setOpenCreateModal(false);
      }}
      hideHeader
      >
        <div>
          <CreateSessionForm />
        </div>
      </Modal>

      <Modal
        isOpen={openDeleteAlert?.open}
        onClose={() => {
          setOpenDeleteAlert({open: false, data: null});
        }}
        title="Delete Alert"
      >
        <div className='w-[30vw]'>
          <DeleteAlertContent
            content="Are you sure you want to delete this session detail?"
            onDelete={() => deleteSession(openDeleteAlert.data)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
