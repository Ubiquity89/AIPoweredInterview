import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import SpinnerLoader from '../../components/Loader/SpinnerLoader';
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from '../../utils/apiPaths';
import { LuUpload, LuFileText, LuX } from 'react-icons/lu';
import { toast } from 'react-hot-toast';


const CreateSessionForm = () => {
    const [formData, setFormData] = useState({
        role: "",
        experience: "",
        topicsToFocus: "",
        description: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState(null);
    const [resumeFile, setResumeFile] = useState(null);
    const [resumeAnalysis, setResumeAnalysis] = useState(null);
    const [showAnalysis, setShowAnalysis] = useState(false);
    const fileInputRef = useRef(null);

    const navigate = useNavigate();

    const handleChange = (key, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,

        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Check file type
        const validTypes = ['application/pdf', 'application/vnd.oasis.opendocument.text', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!validTypes.includes(file.type)) {
            toast.error('Please upload a valid PDF or Word document');
            return;
        }

        // Check file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('File size should be less than 5MB');
            return;
        }

        setResumeFile(file);
        analyzeResume(file);
    };

    const removeFile = (e) => {
        e.stopPropagation();
        setResumeFile(null);
        setResumeAnalysis(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const analyzeResume = async (file) => {
        const formData = new FormData();
        formData.append('resume', file);
        
        // Log the FormData contents for debugging
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        setIsAnalyzing(true);
        try {
            console.log('Sending request to:', API_PATHS.RESUME.ANALYZE);
            
            // Create a new axios instance without the default Content-Type
            const uploadAxios = axios.create({
                baseURL: BASE_URL,
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            // Remove Content-Type to let the browser set it with the correct boundary
            const response = await uploadAxios.post(API_PATHS.RESUME.ANALYZE, formData);
            
            console.log('Response received:', response.data);
            setResumeAnalysis(response.data);
            setShowAnalysis(true);
            toast.success('Resume analyzed successfully');
        } catch (error) {
            console.error('Error analyzing resume:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                headers: error.response?.headers,
                config: {
                    url: error.config?.url,
                    method: error.config?.method,
                    headers: error.config?.headers,
                    data: error.config?.data
                }
            });
            
            const errorMessage = error.response?.data?.message || 
                               error.response?.data?.error || 
                               'Failed to analyze resume. Please try again.';
            toast.error(errorMessage);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleCreateSession = async (e) => {
        e.preventDefault();

        const { role, experience, topicsToFocus } = formData;

        if (!role || !experience || !topicsToFocus) {
            setError("Please fill all the required fields.");
            return;
        }

        setError("");
        setIsLoading(true);

        try {
            // Call AI API to generate questions
            const aiResponse = await axiosInstance.post(
                API_PATHS.AI.GENERATE_QUESTIONS,
                {
                    role,
                    experience,
                    topicsToFocus,
                    numberOfQuestions: 10,
                    resumeAnalysis: resumeAnalysis || null
                }
            );

            // Should be array like [{question, answer}, ...]
            const generatedQuestions = aiResponse.data;

            const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
                ...formData,
                questions: generatedQuestions,
                resumeAnalysis: resumeAnalysis ? {
                    score: resumeAnalysis.score,
                    skills: resumeAnalysis.skills,
                    experience: resumeAnalysis.experience
                } : null
            });

            if (response.data?.session?._id) {
                navigate(`/interview-prep/${response.data?.session?._id}`);
            }
        } catch (error) {
            console.error('Error creating session:', error);
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };
  return (
    <div className='w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-semibold text-black'>
        Start a New Interview Journey
      </h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-3'>
        Fill out a few quick details and unlock your personalized set of
        interview questions!
      </p>

      <form onSubmit={handleCreateSession} className='flex flex-col gap-3'>
        <div className='space-y-3'>
          <label className='block text-sm font-medium text-gray-700'>
            Upload Resume (Optional)
          </label>
          <div 
            className='border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-indigo-500 transition-colors'
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleFileChange}
              accept='.pdf,.doc,.docx,.odt'
              className='hidden'
            />
            {!resumeFile ? (
              <div className='space-y-2'>
                <LuUpload className='w-8 h-8 mx-auto text-gray-400' />
                <p className='text-sm text-gray-600'>
                  Drag and drop your resume here, or click to browse
                </p>
                <p className='text-xs text-gray-500'>
                  Supports PDF, DOC, DOCX, ODT (Max 5MB)
                </p>
              </div>
            ) : (
              <div className='flex items-center justify-between bg-gray-50 p-3 rounded-md'>
                <div className='flex items-center space-x-2'>
                  <LuFileText className='w-5 h-5 text-indigo-600' />
                  <span className='text-sm font-medium text-gray-700 truncate max-w-xs'>
                    {resumeFile.name}
                  </span>
                </div>
                <button
                  type='button'
                  onClick={removeFile}
                  className='text-gray-400 hover:text-red-500 p-1'
                >
                  <LuX className='w-4 h-4' />
                </button>
              </div>
            )}
          </div>
          {isAnalyzing && (
            <div className='text-sm text-indigo-600 flex items-center'>
              <SpinnerLoader size={4} className='mr-2' />
              Analyzing your resume...
            </div>
          )}
          {resumeAnalysis && (
            <button
              type='button'
              onClick={() => setShowAnalysis(true)}
              className='text-sm text-indigo-600 hover:text-indigo-800 font-medium text-left'
            >
              View Resume Analysis
            </button>
          )}
        </div>

        <Input
          value={formData.role}
          onChange={({ target }) => handleChange('role', target.value)}
          label='Target Role *'
          placeholder='(e.g., Frontend Developer, UI/UX Designer, etc.)'
          type='text'
        />

        <Input
          value={formData.experience}
          onChange={({ target }) => handleChange('experience', target.value)}
          label='Years of Experience *'
          placeholder='(e.g., 1 year, 3 years, 5+ years)'
          type='number'
          min='0'
          step='0.5'
        />

        <Input
          value={formData.topicsToFocus}
          onChange={({ target }) => handleChange('topicsToFocus', target.value)}
          label='Topics to Focus On *'
          placeholder='(Comma-separated, e.g., React, Node.js, MongoDB)'
          type='text'
        />

        <Input
          value={formData.description}
          onChange={({ target }) => handleChange('description', target.value)}
          label='Description'
          placeholder='(Any specific goals or notes for this session)'
          type='text'
        />

        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

        <button
          type='submit'
          className='btn-primary w-full mt-2 flex items-center justify-center'
          disabled={isLoading || isAnalyzing}
        >
          {isLoading ? (
            <>
              <SpinnerLoader />
              <span className='ml-2'>Creating Session...</span>
            </>
          ) : (
            'Create Session'
          )}
        </button>
      </form>

      {/* Resume Analysis Modal */}
      {showAnalysis && resumeAnalysis && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
            <div className='p-6'>
              <div className='flex justify-between items-center mb-6'>
                <h3 className='text-xl font-bold text-gray-900'>Resume Analysis</h3>
                <button
                  onClick={() => setShowAnalysis(false)}
                  className='text-gray-400 hover:text-gray-600'
                >
                  <LuX className='w-6 h-6' />
                </button>
              </div>

              <div className='space-y-6'>
                {/* ATS Score */}
                <div className='bg-indigo-50 p-4 rounded-lg'>
                  <div className='flex items-center justify-between mb-2'>
                    <h4 className='font-medium text-gray-900'>ATS Score</h4>
                    <div className='text-2xl font-bold text-indigo-700'>
                      {resumeAnalysis.score}%
                    </div>
                  </div>
                  <div className='w-full bg-gray-200 rounded-full h-2.5'>
                    <div
                      className={`h-2.5 rounded-full ${
                        resumeAnalysis.score >= 70
                          ? 'bg-green-500'
                          : resumeAnalysis.score >= 40
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${resumeAnalysis.score}%` }}
                    ></div>
                  </div>
                </div>

                {/* Skills */}
                {resumeAnalysis.skills?.length > 0 && (
                  <div>
                    <h4 className='font-medium text-gray-900 mb-2'>Skills</h4>
                    <div className='flex flex-wrap gap-2'>
                      {resumeAnalysis.skills.map((skill, index) => (
                        <span
                          key={index}
                          className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800'
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Experience */}
                {resumeAnalysis.experience && (
                  <div>
                    <h4 className='font-medium text-gray-900 mb-2'>Experience</h4>
                    <div className='bg-white border border-gray-200 rounded-lg p-4 space-y-2'>
                      {resumeAnalysis.experience.map((exp, index) => (
                        <div key={index} className='border-l-2 border-indigo-200 pl-4 py-1'>
                          <div className='font-medium text-gray-900'>{exp.role}</div>
                          <div className='text-sm text-gray-600'>{exp.company}</div>
                          <div className='text-xs text-gray-500'>
                            {exp.duration} • {exp.location}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Strengths */}
                {resumeAnalysis.strengths?.length > 0 && (
                  <div>
                    <h4 className='font-medium text-gray-900 mb-2'>Strengths</h4>
                    <ul className='space-y-2'>
                      {resumeAnalysis.strengths.map((strength, index) => (
                        <li key={index} className='flex items-start'>
                          <svg
                            className='h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M5 13l4 4L19 7'
                            />
                          </svg>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Improvements */}
                {resumeAnalysis.improvements?.length > 0 && (
                  <div>
                    <h4 className='font-medium text-gray-900 mb-2'>
                      Suggested Improvements
                    </h4>
                    <ul className='space-y-2'>
                      {resumeAnalysis.improvements.map((improvement, index) => (
                        <li key={index} className='flex items-start'>
                          <svg
                            className='h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                            />
                          </svg>
                          <span>{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className='mt-6 flex justify-end space-x-3'>
                <button
                  type='button'
                  onClick={() => setShowAnalysis(false)}
                  className='px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50'
                >
                  Close
                </button>
                <button
                  type='button'
                  onClick={() => setShowAnalysis(false)}
                  className='px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Use This Analysis
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

};

export default CreateSessionForm
