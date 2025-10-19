import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/common/BackButton';

const ProgrammingMCQs = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(false);

  const navigate = useNavigate();

  // Sample questions - in a real app, these would come from an API
  const questions = {
    python: [
      {
        question: "What is the output of 'print(2 ** 3 ** 2)' in Python?",
        options: ["64", "512", "Error", "None of the above"],
        correct: 1,
        explanation: "The ** operator has right-to-left associativity, so 3**2 is evaluated first (9), then 2**9 = 512."
      },
      {
        question: "Which of these is NOT a valid Python data type?",
        options: ["list", "tuple", "array", "All are valid"],
        correct: 2,
        explanation: "While Python has an 'array' module, 'array' is not a built-in data type like list or tuple."
      },
      {
        question: "What does the 'yield' keyword do in Python?",
        options: [
          "Pauses function execution and returns a value",
          "Terminates the function immediately",
          "Imports a module",
          "Creates a new class"
        ],
        correct: 0,
        explanation: "The 'yield' keyword is used to create generator functions that can pause execution and return a value, then continue from where it left off."
      },
      {
        question: "What is the output of '[x for x in range(10) if x % 2 == 0]'?",
        options: [
          "[0, 2, 4, 6, 8]",
          "[1, 3, 5, 7, 9]",
          "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
          "[2, 4, 6, 8, 10]"
        ],
        correct: 0,
        explanation: "This list comprehension generates even numbers from 0 to 8 (inclusive)."
      },
      {
        question: "What is the difference between 'is' and '==' in Python?",
        options: [
          "'is' checks for identity, '==' checks for equality",
          "'is' checks for equality, '==' checks for identity",
          "They are completely interchangeable",
          "'is' is used for numbers, '==' for strings"
        ],
        correct: 0,
        explanation: "'is' checks if two variables point to the same object in memory, while '==' checks if the objects referred to by the variables are equal in value."
      },
      {
        question: "What is the purpose of __init__ in Python classes?",
        options: [
          "It initializes the class and is called when an object is created",
          "It's a special method that's called when the class is defined",
          "It's used to destroy class objects",
          "It's a static method that can be called without instantiation"
        ],
        correct: 0,
        explanation: "The __init__ method is called when an instance of the class is created and is used to initialize the object's attributes."
      },
      {
        question: "What is the difference between a list and a tuple in Python?",
        options: [
          "Lists are mutable, tuples are immutable",
          "Tuples can contain different data types, lists cannot",
          "Lists use square brackets, tuples use parentheses",
          "There is no difference"
        ],
        correct: 0,
        explanation: "The main difference is that lists are mutable (can be modified after creation) while tuples are immutable (cannot be modified after creation)."
      },
      {
        question: "What is a decorator in Python?",
        options: [
          "A function that takes another function and extends its behavior",
          "A way to add comments to code",
          "A special type of loop",
          "A method to format strings"
        ],
        correct: 0,
        explanation: "A decorator is a design pattern in Python that allows you to add new functionality to an existing object without modifying its structure."
      },
      {
        question: "What is the Global Interpreter Lock (GIL) in Python?",
        options: [
          "A mutex that allows only one thread to execute in the interpreter at once",
          "A tool for memory management",
          "A way to prevent infinite loops",
          "A security feature to prevent code injection"
        ],
        correct: 0,
        explanation: "The GIL is a mutex that allows only one thread to execute in the interpreter at once, which can impact the performance of multi-threaded Python programs."
      },
      {
        question: "What is the purpose of the 'with' statement in Python?",
        options: [
          "To simplify exception handling and resource management",
          "To create a loop",
          "To define a function",
          "To import modules"
        ],
        correct: 0,
        explanation: "The 'with' statement is used to wrap the execution of a block with methods defined by a context manager, ensuring that resources are properly managed."
      }
    ],
    javascript: [
      {
        question: "What will '2 + '2' - 2' return in JavaScript?",
        options: ["'22'", "20", "2", "NaN"],
        correct: 1,
        explanation: "'2' + '2' is '22', then '22' - 2 is 20 because - forces type coercion to number."
      },
      {
        question: "What is the output of 'console.log(typeof null)' in JavaScript?",
        options: ["'object'", "'null'", "'undefined'", "'string'"],
        correct: 0,
        explanation: "This is a well-known quirk in JavaScript - typeof null returns 'object' for legacy reasons."
      },
      {
        question: "What is the difference between 'let', 'const', and 'var' in JavaScript?",
        options: [
          "'let' and 'const' are block-scoped, 'var' is function-scoped",
          "'const' can be reassigned, 'let' and 'var' cannot",
          "'var' is block-scoped, 'let' and 'const' are function-scoped",
          "There is no difference, they are all the same"
        ],
        correct: 0,
        explanation: "'let' and 'const' are block-scoped, while 'var' is function-scoped. 'const' cannot be reassigned after declaration."
      },
      {
        question: "What is a closure in JavaScript?",
        options: [
          "A function that has access to its own scope, the outer function's variables, and global variables",
          "A way to close a web page",
          "A method to hide variables",
          "A type of loop"
        ],
        correct: 0,
        explanation: "A closure is a function that has access to its own scope, the outer function's variables, and global variables, even after the outer function has finished executing."
      },
      {
        question: "What is the output of 'console.log(0.1 + 0.2 === 0.3)'?",
        options: [
          "true",
          "false",
          "undefined",
          "NaN"
        ],
        correct: 1,
        explanation: "Due to floating-point precision issues in JavaScript, 0.1 + 0.2 equals approximately 0.30000000000000004, not exactly 0.3."
      },
      {
        question: "What is the purpose of the 'this' keyword in JavaScript?",
        options: [
          "It refers to the object that the function is a method of",
          "It refers to the global window object",
          "It's a reference to the function itself",
          "It's used to create new objects"
        ],
        correct: 0,
        explanation: "The value of 'this' depends on how a function is called. In a method, 'this' refers to the object the method was called on."
      },
      {
        question: "What are promises in JavaScript?",
        options: [
          "Objects representing the eventual completion or failure of an asynchronous operation",
          "A way to declare variables",
          "A type of loop",
          "A method for string manipulation"
        ],
        correct: 0,
        explanation: "Promises are used to handle asynchronous operations in JavaScript, representing a value which may be available now, later, or never."
      },
      {
        question: "What is event delegation in JavaScript?",
        options: [
          "A technique of attaching event listeners to a parent element instead of multiple children",
          "A way to create custom events",
          "A method to prevent event bubbling",
          "A type of function"
        ],
        correct: 0,
        explanation: "Event delegation allows you to avoid adding event listeners to specific nodes by adding them to a parent element and using event bubbling to handle events on child elements."
      },
      {
        question: "What is the difference between 'null' and 'undefined' in JavaScript?",
        options: [
          "'undefined' means a variable has been declared but not assigned a value, 'null' is an explicit assignment",
          "'null' means a variable has been declared but not assigned a value, 'undefined' is an explicit assignment",
          "They are exactly the same",
          "'undefined' is for numbers, 'null' is for objects"
        ],
        correct: 0,
        explanation: "'undefined' means a variable has been declared but not assigned a value, while 'null' is an explicit assignment that represents no value or no object."
      },
      {
        question: "What is the purpose of 'use strict' in JavaScript?",
        options: [
          "It enforces stricter parsing and error handling in your code",
          "It makes the code run faster",
          "It's used to define strict equality",
          "It's required for using modern JavaScript features"
        ],
        correct: 0,
        explanation: "'use strict' helps catch common coding mistakes and prevents the use of potentially problematic features in JavaScript."
      }
    ],
    java: [
      {
        question: "Which of these is not a primitive type in Java?",
        options: ["int", "String", "boolean", "double"],
        correct: 1,
        explanation: "String is a class in Java, not a primitive type. The primitive types are: byte, short, int, long, float, double, boolean, and char."
      },
      {
        question: "What is method overloading in Java?",
        options: [
          "Having multiple methods with same name but different parameters",
          "Replacing a method in a child class",
          "Making a method run faster",
          "A way to handle exceptions"
        ],
        correct: 0,
        explanation: "Method overloading allows a class to have multiple methods with the same name but different parameters (different type, number, or both)."
      },
      {
        question: "What is the difference between '==' and '.equals()' in Java?",
        options: [
          "'==' compares references, '.equals()' compares values",
          "'==' compares values, '.equals()' compares references",
          "They are exactly the same",
          "'==' is for numbers, '.equals()' is for strings"
        ],
        correct: 0,
        explanation: "'==' checks if two object references point to the same memory location, while '.equals()' is a method that can be overridden to compare the values of objects."
      },
      {
        question: "What is the purpose of the 'static' keyword in Java?",
        options: [
          "It makes a variable or method belong to the class rather than instances",
          "It prevents a class from being instantiated",
          "It makes a variable constant",
          "It's used to import packages"
        ],
        correct: 0,
        explanation: "The 'static' keyword in Java means that the variable or method belongs to the class itself, rather than to instances of the class."
      },
      {
        question: "What is an interface in Java?",
        options: [
          "A reference type that can contain only constants, method signatures, default methods, static methods, and nested types",
          "A way to create multiple inheritance",
          "A type of class that can't be instantiated",
          "A way to handle exceptions"
        ],
        correct: 0,
        explanation: "An interface in Java is a reference type that can contain only constants, method signatures, default methods, static methods, and nested types. It cannot contain method implementations (except for default and static methods)."
      },
      {
        question: "What is the difference between an abstract class and an interface in Java?",
        options: [
          "A class can implement multiple interfaces but extend only one class (abstract or not)",
          "An interface can have method implementations, an abstract class cannot",
          "An abstract class cannot have fields, an interface can",
          "There is no difference"
        ],
        correct: 0,
        explanation: "The main difference is that a class can implement multiple interfaces but can extend only one class (abstract or not). Also, abstract classes can have method implementations and fields with various access modifiers, while interfaces (prior to Java 8) could only have public static final fields and public abstract methods."
      },
      {
        question: "What is the difference between 'ArrayList' and 'LinkedList' in Java?",
        options: [
          "'ArrayList' is implemented as a resizable array, 'LinkedList' is implemented as a doubly-linked list",
          "'LinkedList' is faster for random access, 'ArrayList' is faster for insertions/deletions",
          "'ArrayList' can only store objects, 'LinkedList' can store primitives",
          "There is no difference"
        ],
        correct: 0,
        explanation: "'ArrayList' is implemented as a resizable array, providing fast random access but slower insertions/deletions. 'LinkedList' is implemented as a doubly-linked list, providing faster insertions/deletions but slower random access."
      },
      {
        question: "What is the purpose of the 'final' keyword in Java?",
        options: [
          "It can be used with variables, methods, and classes to restrict their usage",
          "It's used to indicate the last element in an array",
          "It's used to handle exceptions",
          "It makes a method run faster"
        ],
        correct: 0,
        explanation: "'final' can be used with variables (makes them constants), methods (prevents overriding), and classes (prevents inheritance)."
      },
      {
        question: "What is the difference between 'String', 'StringBuilder', and 'StringBuffer' in Java?",
        options: [
          "'String' is immutable, 'StringBuilder' is mutable and not thread-safe, 'StringBuffer' is mutable and thread-safe",
          "'String' is mutable, 'StringBuilder' is thread-safe, 'StringBuffer' is not thread-safe",
          "They are all exactly the same",
          "'String' is for single characters, 'StringBuilder' and 'StringBuffer' are for multiple characters"
        ],
        correct: 0,
        explanation: "'String' is immutable (cannot be changed after creation). 'StringBuilder' is mutable and not thread-safe (faster). 'StringBuffer' is mutable and thread-safe (slower due to synchronization)."
      },
      {
        question: "What is the Java Virtual Machine (JVM)?",
        options: [
          "A virtual machine that enables a computer to run Java programs",
          "A tool for compiling Java code",
          "A type of Java class",
          "A method for memory management"
        ],
        correct: 0,
        explanation: "The JVM is a virtual machine that enables a computer to run Java programs by converting Java bytecode into machine language and executing it."
      }
    ],
    cpp: [
      {
        question: "What is the difference between 'new' and 'malloc()' in C++?",
        options: [
          "new calls the constructor, malloc() doesn't",
          "malloc() is faster than new",
          "There is no difference",
          "new is used in C, malloc() in C++"
        ],
        correct: 0,
        explanation: "The key difference is that 'new' calls the constructor of the object, while 'malloc()' only allocates memory without initializing the object."
      },
      {
        question: "What is the difference between 'delete' and 'delete[]' in C++?",
        options: [
          "'delete' is for single objects, 'delete[]' is for arrays",
          "'delete[]' is for single objects, 'delete' is for arrays",
          "They are exactly the same",
          "'delete' is for C, 'delete[]' is for C++"
        ],
        correct: 0,
        explanation: "'delete' is used to free memory allocated for a single object, while 'delete[]' is used to free memory allocated for an array of objects."
      },
      {
        question: "What is a virtual function in C++?",
        options: [
          "A member function that can be overridden in derived classes",
          "A function that doesn't exist",
          "A function that can't be overridden",
          "A function that is automatically inlined"
        ],
        correct: 0,
        explanation: "A virtual function is a member function that is declared within a base class and is redefined (overridden) by a derived class to enable runtime polymorphism."
      },
      {
        question: "What is the difference between 'public', 'private', and 'protected' in C++?",
        options: [
          "They control the access level of class members",
          "They determine if a class can be inherited",
          "They specify the memory allocation",
          "They are used for exception handling"
        ],
        correct: 0,
        explanation: "These are access specifiers that control the access level of class members: 'public' members are accessible from anywhere, 'private' members are only accessible within the class, and 'protected' members are accessible within the class and its derived classes."
      },
      {
        question: "What is the difference between 'shallow copy' and 'deep copy' in C++?",
        options: [
          "Shallow copy copies only the object's data members, deep copy also copies any dynamically allocated memory",
          "Shallow copy is faster than deep copy",
          "Deep copy is the default copy constructor in C++",
          "There is no difference"
        ],
        correct: 0,
        explanation: "A shallow copy copies all the member field values, but if the object contains pointers to dynamically allocated memory, both the original and the copy will point to the same memory. A deep copy allocates new memory for the copy and copies the pointed-to data as well."
      },
      {
        question: "What is the purpose of the 'const' keyword in C++?",
        options: [
          "It specifies that a variable's value cannot be changed after initialization",
          "It makes a variable constant and unchangeable",
          "It's used to define constant values that can't be modified",
          "All of the above"
        ],
        correct: 3,
        explanation: "The 'const' keyword in C++ is used to specify that a variable's value cannot be changed after initialization, making it a read-only variable. It can also be used with member functions to indicate they don't modify the object's state."
      },
      {
        question: "What is the difference between 'struct' and 'class' in C++?",
        options: [
          "By default, members of a struct are public, while members of a class are private",
          "A struct cannot have member functions, a class can",
          "A struct cannot be inherited, a class can",
          "There is no difference"
        ],
        correct: 0,
        explanation: "The only difference between a struct and a class in C++ is the default access level: members of a struct are public by default, while members of a class are private by default."
      },
      {
        question: "What is a smart pointer in C++?",
        options: [
          "A class that wraps a raw pointer to manage the lifetime of the object it points to",
          "A pointer that automatically points to the correct memory location",
          "A pointer that can point to multiple objects",
          "A type of array"
        ],
        correct: 0,
        explanation: "Smart pointers are template classes that provide automatic memory management by ensuring proper deletion of dynamically allocated objects when they are no longer needed."
      },
      {
        question: "What is the difference between 'stack' and 'heap' memory in C++?",
        options: [
          "Stack memory is managed automatically, heap memory is managed manually",
          "Heap memory is faster than stack memory",
          "Stack memory is for objects, heap memory is for primitive types",
          "There is no difference"
        ],
        correct: 0,
        explanation: "Stack memory is managed automatically (allocated when a function is called and deallocated when it returns), while heap memory is managed manually using 'new'/'delete' or 'malloc()'/'free()'."
      },
      {
        question: "What is the purpose of the 'virtual' keyword in C++?",
        options: [
          "It enables dynamic dispatch for member functions",
          "It makes a function run faster",
          "It's used to declare variables",
          "It's required for all class methods"
        ],
        correct: 0,
        explanation: "The 'virtual' keyword enables dynamic dispatch, allowing the correct function to be called based on the actual type of the object at runtime, rather than the type of the pointer or reference."
      }
    ]
  };

  const currentQuestions = questions[selectedLanguage] || [];

  const handleAnswer = (selectedIndex) => {
    if (answered) return;
    
    setSelectedOption(selectedIndex);
    setAnswered(true);
    
    if (selectedIndex === currentQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setAnswered(false);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
    setAnswered(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <BackButton />
        
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Programming MCQs
        </h1>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Programming Language:
          </label>
          <select
            value={selectedLanguage}
            onChange={(e) => {
              setSelectedLanguage(e.target.value);
              resetQuiz();
            }}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
        </div>

        {showScore ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
            <p className="text-lg mb-4">
              Your score: {score} out of {currentQuestions.length}
            </p>
            <button
              onClick={resetQuiz}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Restart Quiz
            </button>
          </div>
        ) : currentQuestions.length > 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <span className="text-gray-600">
                Question {currentQuestion + 1}/{currentQuestions.length}
              </span>
              <h2 className="text-xl font-semibold mt-2">
                {currentQuestions[currentQuestion].question}
              </h2>
            </div>

            <div className="space-y-3 mb-6">
              {currentQuestions[currentQuestion].options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`p-4 border rounded-md cursor-pointer transition-colors ${
                    selectedOption === index
                      ? 'bg-indigo-50 border-indigo-500'
                      : 'hover:bg-gray-50'
                  } ${
                    answered && index === currentQuestions[currentQuestion].correct
                      ? 'bg-green-50 border-green-500'
                      : ''
                  } ${
                    answered && 
                    selectedOption === index && 
                    selectedOption !== currentQuestions[currentQuestion].correct
                      ? 'bg-red-50 border-red-500'
                      : ''
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>

            {answered && (
              <div className="mb-6 p-4 bg-blue-50 rounded-md">
                <h3 className="font-semibold mb-2">Explanation:</h3>
                <p>{currentQuestions[currentQuestion].explanation}</p>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={handleNext}
                disabled={!answered}
                className={`px-4 py-2 rounded-md ${
                  answered
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {currentQuestion === currentQuestions.length - 1
                  ? 'Finish'
                  : 'Next Question'}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">No questions available for this language yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgrammingMCQs;