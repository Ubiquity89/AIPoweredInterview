import React, { useState, useEffect, useRef, useMemo } from 'react';
import { FiMic, FiMicOff, FiVideo, FiVideoOff, FiSend, FiPause, FiPlay, FiRotateCcw } from 'react-icons/fi';
import { FaRegStopCircle } from 'react-icons/fa';
import { generateQuestions } from '../../../utils/questionGenerator';

const InterviewRoom = ({ config, onComplete, onCancel }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponse, setUserResponse] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const questionStartTimeRef = useRef(Date.now());
  
  // Generate questions based on the interview configuration
  const questions = useMemo(() => {
    console.log('Generating questions with config:', {
      type: config.type,
      difficulty: config.difficulty
    });
    
    // Ensure we have valid values
    const type = config.type || 'technical';
    const difficulty = config.difficulty || 'intermediate';
    
    const generatedQuestions = generateQuestions(type, difficulty, 5);
    console.log('Generated questions:', generatedQuestions);
    return generatedQuestions;
  }, [config.type, config.difficulty]);
  
  const currentQuestion = questions?.[currentQuestionIndex] || {
    id: 1,
    text: "No questions available. Please check your interview configuration.",
    type: "error",
    timeLimit: 300
  };

  // Set up media devices and timer when component mounts
  useEffect(() => {
    // Start timer
    timerRef.current = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    // Request camera and microphone access
    const setupMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: videoEnabled, 
          audio: audioEnabled 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        
        // Setup media recorder
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (e) => {
          if (e.data.size > 0) {
            audioChunksRef.current.push(e.data);
          }
        };
        
        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          // Here you would typically send the blob to your backend for analysis
          console.log('Audio recorded:', audioBlob);
        };
        
        return () => {
          stream.getTracks().forEach(track => track.stop());
        };
      } catch (err) {
        console.error('Error accessing media devices:', err);
      }
    };
    
    setupMedia();
    
    return () => {
      clearInterval(timerRef.current);
    };
  }, [videoEnabled, audioEnabled]);

  const toggleRecording = () => {
    if (isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    } else {
      audioChunksRef.current = [];
      mediaRecorderRef.current.start();
      setIsRecording(true);
    }
  };

  const togglePause = () => {
    if (isPaused) {
      mediaRecorderRef.current.resume();
      questionStartTimeRef.current = Date.now() - (elapsedTime * 1000);
      timerRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    } else {
      mediaRecorderRef.current.pause();
      clearInterval(timerRef.current);
    }
    setIsPaused(!isPaused);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setUserResponse('');
      setShowHint(false);
      questionStartTimeRef.current = Date.now();
    } else {
      handleComplete();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setUserResponse('');
      setShowHint(false);
      questionStartTimeRef.current = Date.now();
    }
  };

  const handleComplete = () => {
    // Stop recording if active
    if (isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
    
    // Stop timer
    clearInterval(timerRef.current);
    
    // Calculate total time spent
    const totalTime = elapsedTime;
    
    // Prepare interview data with minimal required fields
    const interviewData = {
      config: {
        type: config?.type || 'technical',
        difficulty: config?.difficulty || 'intermediate'
      },
      totalTime,
      score: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
      feedback: `Great job on your ${config?.type || 'technical'} interview!`,
      suggestions: [
        "Try to speak more clearly and at a moderate pace.",
        "Provide more specific examples from your experience."
      ],
      questions: [
        {
          id: 'q1',
          text: 'Sample question',
          response: userResponse || 'No response recorded',
          timeSpent: 120
        }
      ],
      analysis: {
        communication: 75,
        problemSolving: 80,
        technicalKnowledge: config?.type === 'technical' ? 78 : null,
        systemDesign: config?.type === 'system-design' ? 82 : null,
        behavioral: config?.type === 'behavioral' ? 85 : null,
        confidence: 75
      }
    };

    console.log('Completing interview with data:', JSON.stringify(interviewData, null, 2));
    
    // Ensure we're not passing undefined
    if (!interviewData) {
      console.error('Error: interviewData is undefined');
      return;
    }
    
    try {
      onComplete(interviewData);
    } catch (error) {
      console.error('Error in onComplete:', error);
    }
  };

  const handleHintClick = () => {
    setShowHint(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              Question {questions.findIndex(q => q.id === currentQuestion.id) + 1} of {questions.length}
            </h3>
            <div className="text-sm font-medium text-gray-500">
              {formatTime(elapsedTime)} / {formatTime(currentQuestion.timeLimit)}
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="prose max-w-none mb-6">
            <p className="text-lg text-gray-800">{currentQuestion.text}</p>
            
            {currentQuestion.code && (
              <div className="mt-4 bg-gray-50 p-4 rounded-md">
                <pre className="text-sm text-gray-800 overflow-x-auto">
                  {`function findLongestSubstring(str) {
  // Your code here
}`}
                </pre>
              </div>
            )}
            
            {showHint && (
              <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400">
                <p className="text-sm text-yellow-700">
                  <strong>Hint:</strong> Consider using a sliding window approach to track characters.
                </p>
              </div>
            )}
          </div>
          
          <div className="mt-6">
            <label htmlFor="response" className="block text-sm font-medium text-gray-700 mb-2">
              Your Response
            </label>
            <div className="mt-1">
              <textarea
                rows={6}
                name="response"
                id="response"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-3"
                placeholder="Type your response here..."
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
              />
            </div>
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={toggleRecording}
                className={`inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md ${
                  isRecording 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {isRecording ? (
                  <FiMicOff className="h-4 w-4 mr-2" />
                ) : (
                  <FiMic className="h-4 w-4 mr-2" />
                )}
                {isRecording ? 'Stop Recording' : 'Record Answer'}
              </button>
              
              <button
                type="button"
                onClick={togglePause}
                disabled={!isRecording}
                className={`inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md ${
                  isPaused 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } ${!isRecording ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isPaused ? (
                  <FiPlay className="h-4 w-4 mr-2" />
                ) : (
                  <FiPause className="h-4 w-4 mr-2" />
                )}
                {isPaused ? 'Resume' : 'Pause'}
              </button>
              
              <button
                type="button"
                onClick={handleHintClick}
                disabled={showHint}
                className={`inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md ${
                  showHint 
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FiRotateCcw className={`h-4 w-4 mr-2 ${showHint ? 'opacity-50' : ''}`} />
                Get Hint
              </button>
            </div>
            
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={onCancel}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              
              <button
                type="button"
                onClick={handleNextQuestion}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {currentQuestion.id === questions[questions.length - 1].id ? 'Finish' : 'Next'}
                <FiSend className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Code Editor</h3>
          </div>
          <div className="p-4 bg-gray-900 text-gray-100 h-64 overflow-auto">
            <pre className="text-sm">
              {`function findLongestSubstring(str) {
  let longest = 0;
  let seen = {};
  let start = 0;
  
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (seen[char]) {
      start = Math.max(start, seen[char]);
    }
    longest = Math.max(longest, i - start + 1);
    seen[char] = i + 1;
  }
  
  return longest;
}`}
            </pre>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Webcam</h3>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setVideoEnabled(!videoEnabled)}
                className={`p-1 rounded-full ${videoEnabled ? 'text-blue-600 hover:text-blue-800' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {videoEnabled ? <FiVideo className="h-5 w-5" /> : <FiVideoOff className="h-5 w-5" />}
              </button>
              <button
                type="button"
                onClick={() => setAudioEnabled(!audioEnabled)}
                className={`p-1 rounded-full ${audioEnabled ? 'text-blue-600 hover:text-blue-800' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {audioEnabled ? <FiMic className="h-5 w-5" /> : <FiMicOff className="h-5 w-5" />}
              </button>
            </div>
          </div>
          <div className="bg-black h-48 flex items-center justify-center">
            {videoEnabled ? (
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="text-white">Camera is off</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewRoom;
