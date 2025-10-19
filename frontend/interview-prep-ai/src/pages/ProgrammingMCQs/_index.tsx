import React, { useState, useEffect } from 'react';
import BackButton from '../../components/common/BackButton';

// Type for programming questions
type Question = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

// Type for programming questions by language
type ProgrammingQuestions = Record<string, Question[]>;

// Sample questions for each programming language
const programmingQuestions: ProgrammingQuestions = {
  java: [
    // Basic Java Concepts
    {
      question: "What is the difference between JDK, JRE, and JVM?",
      options: [
        "JDK is for development, JRE is for running applications, JVM executes bytecode",
        "JDK and JRE are the same, JVM is different",
        "JRE includes JDK and JVM",
        "JVM is part of JDK but not JRE"
      ],
      answer: 0,
      explanation: "JDK (Java Development Kit) is a software development kit that includes tools for developing Java applications. JRE (Java Runtime Environment) provides the libraries and JVM to run Java applications. JVM (Java Virtual Machine) is an abstract machine that executes Java bytecode."
    },
    {
      question: "What is the difference between ArrayList and LinkedList?",
      options: [
        "ArrayList uses array, LinkedList uses nodes",
        "ArrayList is synchronized, LinkedList is not",
        "LinkedList is faster for get/set operations",
        "There is no difference"
      ],
      answer: 0,
      explanation: "ArrayList uses a dynamic array internally and is better for storing and accessing data. LinkedList uses a doubly linked list and is better for frequent addition/removal of elements. ArrayList has O(1) time complexity for get/set operations, while LinkedList has O(n)."
    },
    {
      question: "What is the difference between == and .equals() in Java?",
      options: [
        "== compares references, .equals() compares content",
        "== compares content, .equals() compares references",
        "There is no difference",
        "== is for primitives, .equals() is for objects"
      ],
      answer: 0,
      explanation: "In Java, == compares object references (memory addresses) while .equals() is a method that can be overridden to compare the contents of objects. For String literals, .equals() compares the actual string content."
    },
    {
      question: "What is the difference between final, finally, and finalize in Java?",
      options: [
        "final is a modifier, finally is a block, finalize is a method",
        "All three are used for exception handling",
        "final and finally are keywords, finalize is a class",
        "There is no difference"
      ],
      answer: 0,
      explanation: "final is a keyword used to make variables constant, methods non-overridable, and classes non-inheritable. finally is a block that always executes after try-catch. finalize() is a method called by the garbage collector before object destruction."
    },
    {
      question: "What is Java's garbage collection?",
      options: [
        "Automatic memory management system",
        "A way to delete unused files",
        "A method to clean up database connections",
        "A tool to remove old versions of Java"
      ],
      answer: 0,
      explanation: "Java's garbage collection is an automatic memory management system that frees up memory occupied by objects that are no longer in use. The JVM's garbage collector runs in the background to identify and remove unreachable objects."
    },
    // OOP Concepts
    {
      question: "What is the difference between an interface and an abstract class in Java?",
      options: [
        "A class can implement multiple interfaces but extend only one abstract class",
        "Abstract classes can have constructors, interfaces cannot",
        "Interfaces can have method implementations (default methods)",
        "All of the above"
      ],
      answer: 3,
      explanation: "All options are correct. A class can implement multiple interfaces but extend only one abstract class. Abstract classes can have constructors while interfaces cannot (before Java 8). Interfaces can have default method implementations since Java 8."
    },
    {
      question: "What is method overloading in Java?",
      options: [
        "Having multiple methods with same name but different parameters",
        "Redefining a method in a subclass",
        "Hiding the implementation of a method",
        "Making a method static"
      ],
      answer: 0,
      explanation: "Method overloading in Java occurs when a class has multiple methods with the same name but different parameters (different type, number, or order of parameters). Return type alone is not sufficient to overload a method."
    },
    // Exception Handling
    {
      question: "What is the difference between checked and unchecked exceptions in Java?",
      options: [
        "Checked exceptions are checked at compile-time, unchecked at runtime",
        "Unchecked exceptions are subclasses of RuntimeException",
        "Checked exceptions must be caught or declared in the method signature",
        "All of the above"
      ],
      answer: 3,
      explanation: "All options are correct. Checked exceptions are checked at compile-time and must be either caught or declared in the method signature. Unchecked exceptions (subclasses of RuntimeException) are not checked at compile-time."
    },
    // Collections
    {
      question: "What is the difference between HashMap and Hashtable in Java?",
      options: [
        "HashMap is not synchronized, Hashtable is synchronized",
        "HashMap allows one null key and multiple null values, Hashtable doesn't",
        "HashMap is faster than Hashtable in non-threaded environments",
        "All of the above"
      ],
      answer: 3,
      explanation: "All options are correct. HashMap is not synchronized (not thread-safe) and allows one null key and multiple null values. Hashtable is synchronized (thread-safe) but doesn't allow null keys or values. HashMap is generally faster in single-threaded environments."
    },
    // Multithreading
    {
      question: "What is the difference between Thread.start() and Thread.run() in Java?",
      options: [
        "start() creates a new thread, run() executes in the current thread",
        "run() creates a new thread, start() executes in the current thread",
        "They are exactly the same",
        "start() is static, run() is instance method"
      ],
      answer: 0,
      explanation: "Thread.start() creates a new thread and calls the run() method in that new thread. Calling run() directly executes the code in the current thread, just like a normal method call, without creating a new thread."
    },
    // Java 8 Features
    {
      question: "What are the main features introduced in Java 8?",
      options: [
        "Lambda expressions, Stream API, Default methods",
        "Modules, var keyword, private interface methods",
        "Records, Sealed classes, Pattern matching",
        "Generics, Annotations, Enums"
      ],
      answer: 0,
      explanation: "Java 8 introduced several major features including Lambda expressions, the Stream API, Default methods in interfaces, Optional class, and the new Date/Time API. The other options list features from later Java versions."
    },
    {
      question: "What is a functional interface in Java?",
      options: [
        "An interface with exactly one abstract method",
        "An interface with only default methods",
        "An interface with static methods only",
        "An interface that extends multiple interfaces"
      ],
      answer: 0,
      explanation: "A functional interface in Java is an interface that contains exactly one abstract method. It can have any number of default or static methods. Functional interfaces are used as the basis for lambda expressions in Java."
    },
    // Generics
    {
      question: "What is type erasure in Java Generics?",
      options: [
        "The process of removing type parameters at compile time",
        "A way to make generic types more specific",
        "A method to check type safety at runtime",
        "A technique to improve generic type performance"
      ],
      answer: 0,
      explanation: "Type erasure is a process where the Java compiler removes all type parameters and replaces them with their bounds or Object if the type parameters are unbounded. This ensures binary compatibility with pre-generics code."
    },
    // Collections - List
    {
      question: "What is the difference between ArrayList and Vector in Java?",
      options: [
        "ArrayList is not synchronized, Vector is synchronized",
        "ArrayList is faster than Vector in single-threaded environments",
        "Vector increases its size by doubling it, ArrayList by 50%",
        "All of the above"
      ],
      answer: 3,
      explanation: "All options are correct. ArrayList is not synchronized (not thread-safe) while Vector is synchronized (thread-safe). ArrayList is generally faster in single-threaded environments. Vector increases its size by doubling it (100% increase) when resized, while ArrayList increases by 50%."
    },
    // Exception Handling - try-with-resources
    {
      question: "What is try-with-resources in Java?",
      options: [
        "A way to automatically close resources that implement AutoCloseable",
        "A method to handle multiple exceptions in a single catch block",
        "A technique to manage memory resources",
        "A way to create temporary files"
      ],
      answer: 0,
      explanation: "Try-with-resources is a feature introduced in Java 7 that automatically closes resources that implement the AutoCloseable interface. It ensures that each resource is closed at the end of the statement, reducing boilerplate code and potential resource leaks."
    },
    // Java Memory Model
    {
      question: "What is the difference between heap and stack memory in Java?",
      options: [
        "Heap stores objects, stack stores primitive types and references",
        "Stack is faster but smaller, heap is larger but slower",
        "Each thread has its own stack, but shares the heap",
        "All of the above"
      ],
      answer: 3,
      explanation: "All options are correct. In Java, heap memory is used for dynamic memory allocation of objects and JRE classes at runtime, while stack memory is used for static memory allocation and thread execution. Each thread has its own stack, but all threads share the heap."
    },
    // Java I/O
    {
      question: "What is the difference between InputStream and OutputStream in Java?",
      options: [
        "InputStream reads data, OutputStream writes data",
        "InputStream is for binary data, OutputStream is for text",
        "InputStream is for text data, OutputStream is for binary",
        "There is no difference"
      ],
      answer: 0,
      explanation: "InputStream is an abstract class that represents an input stream of bytes and is used for reading data from a source. OutputStream is an abstract class that represents an output stream of bytes and is used for writing data to a destination."
    },
    // Java Concurrency
    {
      question: "What is the difference between Executor and ExecutorService in Java?",
      options: [
        "Executor is an interface, ExecutorService extends it with lifecycle methods",
        "ExecutorService is an interface, Executor extends it",
        "They are exactly the same",
        "Executor is for single-threaded, ExecutorService for multi-threaded"
      ],
      answer: 0,
      explanation: "Executor is a simple interface with a single execute() method, while ExecutorService extends Executor and adds methods for managing the lifecycle of the executor and the tasks it executes, including methods for shutting down the executor and tracking the progress of tasks."
    },
    // Java 8 Streams
    {
      question: "What is the difference between map() and flatMap() in Java Streams?",
      options: [
        "map() transforms elements, flatMap() flattens nested structures",
        "map() is for primitive streams, flatMap() for object streams",
        "map() is terminal, flatMap() is intermediate",
        "There is no difference"
      ],
      answer: 0,
      explanation: "map() applies a function to each element of the stream and returns a stream of results. flatMap() is used when each element in the stream represents multiple elements, and it flattens the resulting streams into a single stream."
    },
    // Java Annotations
    {
      question: "What is the purpose of the @Override annotation in Java?",
      options: [
        "Indicates that a method is intended to override a superclass method",
        "Makes a method execute after the superclass method",
        "Forces the JVM to check method overriding at runtime",
        "There is no @Override annotation in Java"
      ],
      answer: 0,
      explanation: "The @Override annotation indicates that a method is intended to override a method in a superclass. It's not required but is considered a best practice as it helps catch errors at compile-time if the method doesn't actually override anything."
    },
    // Java Collections - Set
    {
      question: "What is the difference between HashSet, LinkedHashSet, and TreeSet in Java?",
      options: [
        "HashSet uses hashing, LinkedHashSet maintains insertion order, TreeSet is sorted",
        "TreeSet is thread-safe, HashSet and LinkedHashSet are not",
        "LinkedHashSet is faster than HashSet for iteration",
        "All of the above"
      ],
      answer: 0,
      explanation: "HashSet uses a hash table for storage and doesn't maintain any order. LinkedHashSet maintains the insertion order. TreeSet stores elements in a sorted order (natural ordering or by a provided Comparator). All three are not thread-safe by default."
    },
    // Java 8 Optional
    {
      question: "What is the purpose of Optional in Java 8?",
      options: [
        "To represent optional values that might be null",
        "To make method parameters optional",
        "To create optional annotations",
        "To handle checked exceptions"
      ],
      answer: 0,
      explanation: "Optional is a container object used to contain not-null objects. It's used to represent a value that may or may not be present, helping to avoid null pointer exceptions and making the API more expressive about the possibility of missing values."
    },
    // Java Strings
    {
      question: "Why are Strings immutable in Java?",
      options: [
        "For security, thread-safety, and performance optimization",
        "Because Java doesn't support mutable strings",
        "To make string operations faster",
        "There is no particular reason"
      ],
      answer: 0,
      explanation: "Strings are immutable in Java for several reasons: security (preventing malicious changes), thread-safety (can be shared between threads), and performance optimization (string pooling, hashcode caching). This design decision is fundamental to Java's string handling."
    },
    // Java Serialization
    {
      question: "What is serialization in Java?",
      options: [
        "The process of converting an object into a byte stream",
        "A way to sort collections",
        "A method to compress strings",
        "A technique to improve performance"
      ],
      answer: 0,
      explanation: "Serialization in Java is the process of converting an object into a byte stream, which can be persisted to disk or sent over a network. The reverse process is called deserialization. A class must implement the Serializable interface to be serializable."
    },
    // Java Design Patterns
    {
      question: "What is the Singleton pattern in Java?",
      options: [
        "A design pattern that ensures a class has only one instance",
        "A way to create multiple instances of a class",
        "A method to implement multiple inheritance",
        "A type of collection"
      ],
      answer: 0,
      explanation: "The Singleton pattern ensures that a class has only one instance and provides a global point of access to it. This is typically implemented by making the constructor private and providing a static method that returns the single instance of the class."
    },
    // Java 8 Date/Time API
    {
      question: "What are the main classes in Java 8 Date/Time API?",
      options: [
        "LocalDate, LocalTime, LocalDateTime, ZonedDateTime",
        "Date, Calendar, TimeZone",
        "SimpleDateFormat, DateFormat",
        "There is no Date/Time API in Java 8"
      ],
      answer: 0,
      explanation: "Java 8 introduced a new Date/Time API with classes like LocalDate (date without time), LocalTime (time without date), LocalDateTime (date and time without timezone), and ZonedDateTime (date and time with timezone). These classes are immutable and thread-safe, addressing the shortcomings of the older Date and Calendar classes."
    },
    // Java Enums
    {
      question: "What are enums in Java?",
      options: [
        "A special data type that enables a variable to be a set of predefined constants",
        "A way to create multiple instances of a class",
        "A type of collection",
        "A method to handle exceptions"
      ],
      answer: 0,
      explanation: "Enums in Java are a special data type that enables a variable to be a set of predefined constants. They are type-safe, can have fields, constructors, and methods, and can implement interfaces. Enums are commonly used to represent fixed sets of constants, like days of the week or states in a state machine."
    },
    // Java Generics - Wildcards
    {
      question: "What is the difference between <? extends T> and <? super T> in Java Generics?",
      options: [
        "<? extends T> is for reading, <? super T> is for writing",
        "<? extends T> is for writing, <? super T> is for reading",
        "There is no difference",
        "They can't be used together"
      ],
      answer: 0,
      explanation: "<? extends T> is an upper-bounded wildcard that accepts any type that is a subtype of T (including T itself). It's used when you want to read from a structure. <? super T> is a lower-bounded wildcard that accepts any type that is a supertype of T (including T itself). It's used when you want to write to a structure."
    },
    // Java 9+ Features
    {
      question: "What are some features introduced in Java 9 and later?",
      options: [
        "Modules, private interface methods, var keyword",
        "Lambdas, Streams, Optional",
        "Generics, Annotations, Enums",
        "There are no new features after Java 8"
      ],
      answer: 0,
      explanation: "Java 9 introduced the Java Platform Module System (JPMS), private methods in interfaces, and other features. Later versions added the var keyword (Java 10), text blocks (Java 15), records (Java 16), pattern matching for instanceof (Java 16), and sealed classes (Java 17), among others."
    },
    // Java Garbage Collection
    {
      question: "What are the different types of garbage collectors available in Java?",
      options: [
        "Serial, Parallel, CMS, G1, ZGC, Shenandoah",
        "Only one type called GarbageCollector",
        "YoungGen and OldGen collectors",
        "There is no garbage collection in Java"
      ],
      answer: 0,
      explanation: "Java provides several garbage collectors: Serial GC (single-threaded), Parallel GC (throughput collector), CMS (Concurrent Mark-Sweep), G1 (Garbage First), ZGC (Z Garbage Collector), and Shenandoah. Each has different characteristics regarding pause times, throughput, and memory footprint, suitable for different types of applications."
    },
    // Java Collections Framework
    {
      question: "What is the difference between Collection and Collections in Java?",
      options: [
        "Collection is an interface, Collections is a utility class",
        "Collections is an interface, Collection is a utility class",
        "They are the same thing",
        "Neither exists in Java"
      ],
      answer: 0,
      explanation: "Collection is the root interface in the collection hierarchy. It represents a group of objects. Collections is a utility class that consists exclusively of static methods that operate on or return collections. It contains methods like sort(), binarySearch(), and synchronizedCollection()."
    },
    // Java 8 Method References
    {
      question: "What are method references in Java 8?",
      options: [
        "A way to refer to methods without executing them",
        "A type of collection",
        "A way to create new methods",
        "A method to handle exceptions"
      ],
      answer: 0,
      explanation: "Method references in Java 8 are a way to refer to methods without executing them. They're a form of lambda expression that's used to refer to a method without invoking it. The syntax is ClassName::methodName. There are four types: reference to a static method, reference to an instance method of a particular object, reference to an instance method of an arbitrary object of a particular type, and reference to a constructor."
    },
    // Java Threads
    {
      question: "What is the difference between Thread.sleep() and Object.wait() in Java?",
      options: [
        "sleep() doesn't release locks, wait() does",
        "wait() is static, sleep() is instance method",
        "There is no difference",
        "sleep() can only be called from synchronized blocks"
      ],
      answer: 0,
      explanation: "Thread.sleep() makes the current thread sleep for a specified time without releasing any locks. Object.wait() causes the current thread to wait until another thread calls notify() or notifyAll() on the same object, and it releases the lock on the object. wait() must be called from a synchronized context."
    },
    // Java 14+ Records
    {
      question: "What are records in Java 14+?",
      options: [
        "Transparent carriers for immutable data",
        "A type of collection",
        "A way to log application data",
        "A database access technology"
      ],
      answer: 0,
      explanation: "Records in Java 14+ are a special kind of class that acts as transparent carriers for immutable data. They are final, immutable, and automatically generate methods like equals(), hashCode(), and toString(). Records are ideal for modeling simple data carriers, reducing boilerplate code significantly."
    },
    // Java Class Loaders
    {
      question: "What is a ClassLoader in Java?",
      options: [
        "Part of JRE that loads Java classes into the JVM",
        "A tool to organize source code",
        "A method to load data from files",
        "A type of collection"
      ],
      answer: 0,
      explanation: "A ClassLoader is part of the Java Runtime Environment that loads Java classes into the Java Virtual Machine. The JVM uses different class loaders to load classes from different sources like the local file system, network, or other sources. The main types are Bootstrap, Extension, and System/Application class loaders."
    },
    // Continue adding more questions...
    // Java Concurrency
    {
      question: "What is the difference between Runnable and Callable in Java?",
      options: [
        "Callable can return a value and throw checked exceptions, Runnable cannot",
        "Runnable is used with Thread class, Callable is used with ExecutorService",
        "Callable is part of java.util.concurrent package, Runnable is in java.lang",
        "All of the above"
      ],
      answer: 3,
      explanation: "Callable was introduced in Java 5 and provides several advantages over Runnable: it can return a value, throw checked exceptions, and is part of the java.util.concurrent package. Both can be used with ExecutorService, but only Runnable can be used with the Thread class directly."
    },
    {
      question: "What is the volatile keyword in Java used for?",
      options: [
        "Ensures visibility of changes to variables across threads",
        "Makes a variable constant",
        "Improves performance of variable access",
        "Prevents garbage collection of an object"
      ],
      answer: 0,
      explanation: "The volatile keyword in Java ensures that reads and writes to the variable are atomic and that changes made by one thread to a volatile variable are immediately visible to other threads. It prevents thread-caching of the variable's value and ensures the variable is always read from main memory."
    },
    // Java 8+ Features
    {
      question: "What is the difference between map() and flatMap() in Java Streams?",
      options: [
        "map() transforms elements, flatMap() flattens nested streams",
        "map() is for primitive streams, flatMap() for object streams",
        "map() is parallel, flatMap() is sequential",
        "There is no difference"
      ],
      answer: 0,
      explanation: "map() transforms each element of a stream into another object, while flatMap() first applies a one-to-many transformation and then flattens the resulting elements into a single stream. For example, if you have a stream of lists, flatMap() can convert it into a stream of elements from all lists."
    },
    {
      question: "What are Java Records and when should they be used?",
      options: [
        "Immutable data carriers that reduce boilerplate code",
        "A way to store database records",
        "A type of collection in Java",
        "A logging mechanism"
      ],
      answer: 0,
      explanation: "Records (introduced in Java 16) are immutable data classes that act as transparent carriers for immutable data. They automatically generate constructors, getters, equals(), hashCode(), and toString() methods, significantly reducing boilerplate code. They're ideal for DTOs, value objects, and other immutable data carriers."
    },
    // Java Memory Model
    {
      question: "What is the difference between heap and stack memory in Java?",
      options: [
        "Heap stores objects, stack stores primitive types and method calls",
        "Stack is for static variables, heap is for instance variables",
        "Heap is faster than stack",
        "There is no difference"
      ],
      answer: 0,
      explanation: "Heap memory is used for dynamic memory allocation of Java objects and JRE classes at runtime. Stack memory is used for static memory allocation and contains primitive values and references to objects. Each thread has its own stack, while the heap is shared among all threads. Stack is faster but limited in size compared to heap."
    },
    // Java Collections
    {
      question: "What is the difference between HashMap and ConcurrentHashMap?",
      options: [
        "ConcurrentHashMap is thread-safe and allows concurrent modifications",
        "HashMap is faster than ConcurrentHashMap",
        "ConcurrentHashMap doesn't allow null keys or values",
        "All of the above"
      ],
      answer: 3,
      explanation: "ConcurrentHashMap is a thread-safe implementation of Map that allows concurrent read and thread-safe update operations. Unlike Collections.synchronizedMap(), it provides better concurrency by locking only a portion of the map during updates. It doesn't allow null keys or values, while HashMap does. While it's slightly slower than HashMap for single-threaded access, it's designed for high concurrency scenarios."
    },
    // Java I/O and NIO
    {
      question: "What is the difference between Java I/O and NIO?",
      options: [
        "NIO is non-blocking and buffer-oriented, I/O is stream-oriented",
        "NIO is faster for all operations",
        "I/O is newer than NIO",
        "There is no difference"
      ],
      answer: 0,
      explanation: "Java I/O is stream-oriented and blocking, meaning a thread reading from a stream blocks until data is available. NIO (New I/O) is buffer-oriented, non-blocking, and uses selectors to manage multiple channels. NIO is generally better for high-performance I/O operations, especially with many concurrent connections, while traditional I/O might be simpler for basic file operations."
    },
    // Java 11+ Features
    {
      question: "What are some new features introduced in Java 11?",
      options: [
        "Local variable type inference with var, HTTP Client API, String methods like isBlank() and lines()",
        "Modules, private interface methods, var keyword",
        "Lambdas, Streams, Optional",
        "Pattern matching for instanceof, records, sealed classes"
      ],
      answer: 0,
      explanation: "Java 11 introduced several important features including: local variable type inference with 'var' (though it was previewed in Java 10), a new HTTP Client API, new String methods like isBlank(), lines(), strip(), and repeat(), and the ability to run single-file source-code programs directly. It was also the first LTS (Long Term Support) release after Java 8."
    },
    // Java Design Patterns
    {
      question: "What is the difference between the Singleton and Factory design patterns?",
      options: [
        "Singleton ensures a class has only one instance, Factory creates objects without specifying the exact class",
        "Both ensure only one instance of a class exists",
        "Factory is a creational pattern, Singleton is a structural pattern",
        "There is no difference"
      ],
      answer: 0,
      explanation: "The Singleton pattern ensures that a class has only one instance and provides a global point of access to it. The Factory pattern defines an interface for creating objects but lets subclasses decide which class to instantiate. Both are creational patterns, but they serve different purposes: Singleton controls object creation to ensure only one instance exists, while Factory delegates the instantiation to subclasses."
    },
    // Java Best Practices
    {
      question: "Why should you prefer composition over inheritance in Java?",
      options: [
        "It provides better code reuse and flexibility",
        "It reduces coupling between classes",
        "It makes the code easier to test and maintain",
        "All of the above"
      ],
      answer: 3,
      explanation: "Composition (has-a relationship) is generally preferred over inheritance (is-a relationship) because it provides better code reuse, reduces coupling between classes, makes the code more flexible and easier to test, and avoids issues like the fragile base class problem. It follows the principle of 'favor composition over inheritance' which is a key object-oriented design principle."
    },
    // Java Exception Handling
    {
      question: "What is the difference between throw and throws in Java?",
      options: [
        "throw is used to explicitly throw an exception, throws declares which exceptions a method might throw",
        "throws is used to throw an exception, throw declares exceptions",
        "Both are used to handle exceptions",
        "There is no difference"
      ],
      answer: 0,
      explanation: "In Java, 'throw' is used to explicitly throw an exception from a method or block of code, while 'throws' is used in a method's signature to declare that the method might throw one or more exceptions. The caller must handle or declare these exceptions. 'throw' is followed by an instance of Throwable, while 'throws' is followed by exception class names."
    },
    // Java 17+ Features
    {
      question: "What are sealed classes in Java 17?",
      options: [
        "Classes that restrict which other classes may extend them",
        "Classes that cannot be instantiated",
        "Classes that are thread-safe by default",
        "A type of collection class"
      ],
      answer: 0,
      explanation: "Sealed classes (a preview feature in Java 15-16, finalized in Java 17) allow you to control which classes can extend or implement them. They provide a way to restrict class hierarchies, making them more maintainable and secure. A sealed class is declared using the 'sealed' modifier and specifies which classes can extend it using the 'permits' clause."
    },
    // Java Performance
    {
      question: "What is the String interning in Java?",
      options: [
        "A method to store only one copy of each distinct String value in the String pool",
        "A way to convert between String and other data types",
        "A method to concatenate Strings efficiently",
        "A way to serialize String objects"
      ],
      answer: 0,
      explanation: "String interning is a method of storing only one copy of each distinct String value in the String pool, which is a special area in the Java heap. When you create a String literal, Java checks if an identical String exists in the pool. If it does, it returns a reference to that String instead of creating a new one. This saves memory and allows for fast String comparison using == (though equals() should still be used for content comparison)."
    },
    // Java 21+ Features
    {
      question: "What are virtual threads in Java 21?",
      options: [
        "Lightweight threads that help in writing high-throughput concurrent applications",
        "Threads that run in a virtual machine",
        "A type of daemon thread",
        "A deprecated feature in Java 21"
      ],
      answer: 0,
      explanation: "Virtual threads (previewed in Java 19, finalized in Java 21) are lightweight threads that are managed by the Java runtime rather than the operating system. They allow you to write high-throughput concurrent applications using the familiar thread-per-request programming model, but with much better scalability. Virtual threads are particularly useful for I/O-bound applications where threads spend a lot of time waiting."
    },
    // Java Memory Model
    {
      question: "What is the Java Memory Model (JMM)?",
      options: [
        "A specification that guarantees visibility of memory updates across threads",
        "The way Java manages heap memory",
        "A tool for monitoring memory usage",
        "A type of garbage collection algorithm"
      ],
      answer: 0,
      explanation: "The Java Memory Model (JMM) is a specification that provides a set of rules that define how threads interact through memory and how data is shared between them. It defines when one thread's actions are guaranteed to be visible to another thread, ensuring proper synchronization and memory consistency in multithreaded applications."
    },
    // Java Collections Framework
    {
      question: "What is the difference between fail-fast and fail-safe iterators in Java?",
      options: [
        "Fail-fast throws ConcurrentModificationException, fail-safe doesn't",
        "Fail-safe is faster than fail-fast",
        "Fail-fast is used in concurrent collections",
        "There is no difference"
      ],
      answer: 0,
      explanation: "Fail-fast iterators (like those in ArrayList, HashMap) throw ConcurrentModificationException if the collection is modified while iterating. Fail-safe iterators (like those in ConcurrentHashMap, CopyOnWriteArrayList) work on a clone of the collection and don't throw exceptions if the collection is modified during iteration."
    },
    // Java Concurrency Utilities
    {
      question: "What is the difference between CountDownLatch and CyclicBarrier?",
      options: [
        "CountDownLatch is not reusable, CyclicBarrier is reusable",
        "CyclicBarrier is not reusable, CountDownLatch is reusable",
        "They are the same",
        "CountDownLatch is for parallel processing, CyclicBarrier is for sequential"
      ],
      answer: 0,
      explanation: "CountDownLatch is a one-time use synchronization aid that allows one or more threads to wait until a set of operations being performed in other threads completes. CyclicBarrier is a reusable synchronization aid that allows a set of threads to all wait for each other to reach a common barrier point. The key difference is that CyclicBarrier can be reused after the waiting threads are released."
    },
    // Java 8 Features
    {
      question: "What is the purpose of the @FunctionalInterface annotation in Java 8?",
      options: [
        "To indicate that an interface is intended to be a functional interface",
        "To make an interface serializable",
        "To improve performance of lambda expressions",
        "To mark an interface as deprecated"
      ],
      answer: 0,
      explanation: "The @FunctionalInterface annotation is used to indicate that an interface is intended to be a functional interface, meaning it contains exactly one abstract method. While not strictly required, it's a good practice as it allows the compiler to generate an error if the annotated interface doesn't meet the functional interface requirements."
    },
    // Java Design Patterns
    {
      question: "What is the difference between the Builder and Factory patterns?",
      options: [
        "Builder is for constructing complex objects, Factory for creating families of related objects",
        "Factory is for immutable objects, Builder for mutable objects",
        "They are the same pattern with different names",
        "Builder is for database operations, Factory for UI components"
      ],
      answer: 0,
      explanation: "The Builder pattern is used to construct a complex object step by step and the final step will return the object. The Factory pattern is used to create objects without specifying the exact class of object that will be created. The key difference is that Builder is about object construction, while Factory is about object creation."
    },
    // Java Best Practices
    {
      question: "Why should you use immutable objects in Java?",
      options: [
        "They are thread-safe, simple to understand, and support failure atomicity",
        "They use less memory than mutable objects",
        "They are faster to create than mutable objects",
        "They can be serialized more efficiently"
      ],
      answer: 0,
      explanation: "Immutable objects offer several benefits: they are inherently thread-safe (no synchronization needed), their state cannot be corrupted by multiple threads, they make great building blocks for other objects, they support failure atomicity, and they are easier to reason about since their state never changes after construction."
    },
    // Java Exception Handling
    {
      question: "What is the difference between Error and Exception in Java?",
      options: [
        "Errors are serious problems that should not be caught, Exceptions can be handled",
        "Exceptions are for I/O, Errors are for memory issues",
        "There is no difference",
        "Errors are checked, Exceptions are unchecked"
      ],
      answer: 0,
      explanation: "In Java, both Error and Exception are subclasses of Throwable. Errors indicate serious problems that a reasonable application should not try to catch (like OutOfMemoryError or StackOverflowError). Exceptions indicate conditions that a reasonable application might want to catch (like FileNotFoundException or NullPointerException)."
    },
    // Java Concurrency
    {
      question: "What is the difference between Executor, ExecutorService, and Executors?",
      options: [
        "Executor is an interface, ExecutorService extends Executor, Executors is a factory class",
        "They are the same",
        "Executors is an interface, Executor is a class",
        "ExecutorService is deprecated in favor of Executor"
      ],
      answer: 0,
      explanation: "Executor is a simple interface that executes tasks asynchronously. ExecutorService extends Executor and adds features for managing the lifecycle of the executor and the tasks it executes. Executors is a utility class that provides factory methods for creating different types of executor services (like newFixedThreadPool, newCachedThreadPool, etc.)."
    },
    // Java 17+ Features
    {
      question: "What are pattern matching for switch expressions in Java 17?",
      options: [
        "A way to use patterns in switch expressions and statements",
        "A new type of loop",
        "A way to match regular expressions in switch statements",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "Pattern matching for switch (previewed in Java 17, finalized in Java 21) extends pattern matching to switch expressions and statements, allowing the use of patterns in case labels. This makes it possible to express complex data-oriented queries in a more concise and readable way, and eliminates the need for many type-checking and casting patterns."
    },
    // Java Performance
    {
      question: "What is the difference between the JIT compiler and the AOT compiler in Java?",
      options: [
        "JIT compiles bytecode to native code at runtime, AOT compiles before execution",
        "AOT is used for Android, JIT for server applications",
        "JIT is for Java, AOT is for other JVM languages",
        "There is no difference"
      ],
      answer: 0,
      explanation: "JIT (Just-In-Time) compilation is the traditional approach where bytecode is compiled to native machine code at runtime, allowing for optimizations based on runtime information. AOT (Ahead-Of-Time) compilation compiles Java code to native code before execution, which can reduce startup time but may miss some runtime optimizations. Java 9 introduced AOT compilation as an experimental feature."
    },
    // Java Security
    {
      question: "What is the SecurityManager in Java and why is it deprecated?",
      options: [
        "A legacy security mechanism being replaced by the module system",
        "A tool for encrypting class files",
        "A way to manage thread priorities",
        "A deprecated garbage collection algorithm"
      ],
      answer: 0,
      explanation: "The SecurityManager was a central part of Java's security model that allowed applications to implement a security policy by defining what resources code could access. It's being deprecated because it's complex, hard to use correctly, and has been largely superseded by the Java Platform Module System (JPMS) introduced in Java 9, which provides better isolation and security guarantees."
    },
    // Java 11+ Features
    {
      question: "What is the var keyword in Java and when should it be used?",
      options: [
        "Local variable type inference, introduced in Java 10",
        "A way to declare constants, similar to final",
        "A way to declare variables with dynamic typing",
        "A deprecated feature from early Java versions"
      ],
      answer: 0,
      explanation: "The var keyword, introduced in Java 10, allows you to declare local variables with implicit type inference. The compiler infers the type from the right-hand side of the assignment. It should be used when the type is obvious from the context, making the code more readable. It cannot be used for method parameters, return types, or fields."
    },
    // Java Concurrency
    {
      question: "What is the difference between the Fork/Join framework and ExecutorService?",
      options: [
        "Fork/Join is optimized for recursive divide-and-conquer algorithms",
        "ExecutorService is faster than Fork/Join",
        "Fork/Join is for I/O-bound tasks, ExecutorService for CPU-bound",
        "There is no difference"
      ],
      answer: 0,
      explanation: "The Fork/Join framework, introduced in Java 7, is a special kind of ExecutorService designed for work that can be broken into smaller pieces recursively. It uses work-stealing to efficiently handle tasks that can be divided into smaller subtasks. It's particularly well-suited for recursive algorithms like merge sort or parallel processing of large data sets."
    },
    // Java 17+ Features
    {
      question: "What are sealed classes and interfaces in Java 17?",
      options: [
        "A way to restrict which classes may extend or implement them",
        "A security feature to prevent unauthorized access",
        "A new type of collection",
        "A way to make classes immutable"
      ],
      answer: 0,
      explanation: "Sealed classes and interfaces, finalized in Java 17, allow you to control which classes may extend or implement them. They provide a more declarative way to restrict the use of inheritance and make class hierarchies more maintainable. A sealed class is declared with the 'sealed' modifier and specifies which classes can extend it using the 'permits' clause."
    },
    // Java Performance
    {
      question: "What is the difference between the G1 garbage collector and the ZGC?",
      options: [
        "ZGC is designed for low-latency applications, G1 is a general-purpose collector",
        "G1 is newer than ZGC",
        "ZGC is only for small heaps, G1 for large heaps",
        "There is no difference"
      ],
      answer: 0,
      explanation: "G1 (Garbage-First) is a server-style garbage collector designed for applications running on multiprocessor machines with large memories. ZGC (Z Garbage Collector) is a scalable low-latency garbage collector designed to handle heaps ranging from a few hundred megabytes to multi-terabytes with GC pause times not exceeding 10ms, making it ideal for applications that require low latency."
    },
    // Java 17+ Features
    {
      question: "What are pattern matching for instanceof in Java 16+?",
      options: [
        "A way to combine type checking and type casting in a single operation",
        "A new type of exception handling",
        "A way to match regular expressions with instanceof",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "Pattern matching for instanceof (introduced in Java 16) simplifies the common pattern of using instanceof followed by casting. It allows you to declare a binding variable in the instanceof check, which is then in scope and automatically cast to the correct type in the true block."
    },
    // Java Concurrency
    {
      question: "What is the difference between Thread.sleep() and Object.wait()?",
      options: [
        "sleep() doesn't release locks, wait() releases the object's monitor",
        "wait() is static, sleep() is an instance method",
        "sleep() can be interrupted, wait() cannot",
        "There is no difference"
      ],
      answer: 0,
      explanation: "Thread.sleep() causes the current thread to sleep for a specified period but doesn't release any locks. Object.wait() causes the current thread to wait until another thread calls notify() or notifyAll() on the same object, and it releases the object's monitor while waiting."
    },
    // Java Collections
    {
      question: "What is the difference between HashMap and LinkedHashMap?",
      options: [
        "LinkedHashMap maintains insertion order, HashMap doesn't",
        "HashMap is synchronized, LinkedHashMap is not",
        "LinkedHashMap is faster for get/put operations",
        "There is no difference"
      ],
      answer: 0,
      explanation: "LinkedHashMap extends HashMap and maintains a doubly-linked list running through all of its entries, which defines the iteration ordering (normally the order in which keys were inserted). This makes it slightly slower than HashMap for adding and removing elements but provides predictable iteration order."
    },
    // Java 8+ Features
    {
      question: "What is the purpose of the CompletableFuture class in Java 8+?",
      options: [
        "For asynchronous programming and composing multiple asynchronous operations",
        "To replace the Thread class",
        "For file I/O operations",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "CompletableFuture is used for asynchronous programming in Java. It represents a future result of an asynchronous computation and provides methods to chain multiple asynchronous operations, handle exceptions, and combine multiple futures. It's more powerful than the older Future interface."
    },
    // Java Performance
    {
      question: "What is the difference between the -Xms and -Xmx JVM parameters?",
      options: [
        "-Xms sets initial heap size, -Xmx sets maximum heap size",
        "-Xmx sets initial heap size, -Xms sets maximum heap size",
        "They are the same parameter with different names",
        "-Xms is for stack size, -Xmx is for heap size"
      ],
      answer: 0,
      explanation: "-Xms sets the initial and minimum heap size that the JVM will allocate, while -Xmx sets the maximum heap size. For example, -Xms256m -Xmx1g means the JVM will start with 256MB of heap and can grow up to 1GB."
    },
    // Java Concurrency
    {
      question: "What is the difference between CyclicBarrier and Phaser in Java?",
      options: [
        "Phaser is more flexible and can handle dynamic parties, CyclicBarrier cannot",
        "CyclicBarrier is newer than Phaser",
        "Phaser is for I/O operations, CyclicBarrier for CPU-bound tasks",
        "There is no difference"
      ],
      answer: 0,
      explanation: "Phaser is a more flexible and powerful synchronization barrier that supports dynamic adjustment of the number of parties (threads) and multiple phases of execution. CyclicBarrier is simpler but less flexible, with a fixed number of parties and no concept of phases."
    },
    // Java 17+ Features
    {
      question: "What are text blocks in Java 15+?",
      options: [
        "A way to write multi-line string literals without escape sequences",
        "A new type of comment",
        "A way to format text in the console",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "Text blocks (introduced in Java 15) are a way to write multi-line string literals without the need for escape sequences. They start and end with three double-quote characters (\"\"\") and preserve the formatting of the text, including line breaks and indentation."
    },
    // Java Best Practices
    {
      question: "Why should you prefer immutable objects in Java?",
      options: [
        "They are thread-safe, simple to test, and support failure atomicity",
        "They are faster to create than mutable objects",
        "They use less memory than mutable objects",
        "They can be serialized more efficiently"
      ],
      answer: 0,
      explanation: "Immutable objects are inherently thread-safe (no synchronization needed), their state cannot be corrupted by multiple threads, they make great building blocks for other objects, they support failure atomicity, and they are easier to reason about since their state never changes after construction."
    },
    // Java 8+ Features
    {
      question: "What is the difference between map() and flatMap() in Java Streams?",
      options: [
        "map() transforms elements, flatMap() flattens nested streams",
        "map() is for primitive streams, flatMap() for object streams",
        "map() is parallel, flatMap() is sequential",
        "There is no difference"
      ],
      answer: 0,
      explanation: "map() transforms each element of a stream into another object, while flatMap() first applies a one-to-many transformation and then flattens the resulting elements into a single stream. This is particularly useful when working with nested collections or when a single input element maps to multiple output elements."
    },
    // Java 17+ Features
    {
      question: "What are sealed classes in Java 17 and how do they work?",
      options: [
        "Classes that restrict which other classes may extend them, using 'sealed' and 'permits' keywords",
        "Classes that cannot be instantiated directly",
        "A type of collection class",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "Sealed classes (finalized in Java 17) allow you to restrict which other classes may extend them. You declare a sealed class using the 'sealed' modifier and then specify the permitted subclasses using the 'permits' clause. This provides more control over class hierarchies and enables exhaustive pattern matching in switch expressions."
    },
    // Java Concurrency
    {
      question: "What is the difference between Executor, ExecutorService, and ScheduledExecutorService?",
      options: [
        "Executor is a simple interface, ExecutorService adds lifecycle methods, ScheduledExecutorService adds scheduling",
        "They are all the same interface with different names",
        "Executor is for single-threaded, ExecutorService for multi-threaded, ScheduledExecutorService for scheduled tasks",
        "Executor is deprecated, use ExecutorService instead"
      ],
      answer: 0,
      explanation: "Executor is a simple interface with a single execute() method. ExecutorService extends Executor and adds methods for managing the lifecycle of the executor and the tasks it executes. ScheduledExecutorService extends ExecutorService and adds methods for scheduling tasks to run after a delay or at fixed intervals."
    },
    // Java Performance
    {
      question: "What is the difference between the -XX:+UseG1GC and -XX:+UseZGC JVM flags?",
      options: [
        "G1 is a general-purpose GC, ZGC is optimized for low-latency applications",
        "ZGC is older than G1",
        "G1 is for small heaps, ZGC for large heaps",
        "There is no difference"
      ],
      answer: 0,
      explanation: "-XX:+UseG1GC enables the Garbage-First (G1) garbage collector, which is a server-style garbage collector designed for applications running on multiprocessor machines with large memories. -XX:+UseZGC enables the Z Garbage Collector, which is designed for applications that require low latency and can scale to handle very large heaps with pause times not exceeding 10ms."
    },
    // Java 11+ Features
    {
      question: "What are the benefits of the new HTTP Client API in Java 11+?",
      options: [
        "Supports HTTP/2, WebSockets, and is non-blocking by default",
        "It's faster than the old HttpURLConnection",
        "It can only be used with HTTP/1.1",
        "It's only available in Java EE"
      ],
      answer: 0,
      explanation: "The new HTTP Client API (introduced in Java 11) is a modern, feature-rich HTTP client that supports both synchronous and asynchronous programming models, HTTP/2 and WebSocket protocols, and is non-blocking by default. It provides a more intuitive API than the older HttpURLConnection and supports modern web standards."
    },
    // Java 17+ Features
    {
      question: "What are pattern matching for switch expressions in Java 17+?",
      options: [
        "A way to use patterns in switch expressions and statements",
        "A new type of loop construct"
      ],
      answer: 0,
      explanation: "Pattern matching for switch expressions allows you to use patterns in case labels, making switch more expressive and safer by handling all possible cases."
    },
    // JavaScript Variables and Hoisting
    {
      question: "What is hoisting in JavaScript?",
      options: [
        "JavaScript's default behavior of moving declarations to the top",
        "A way to optimize code performance",
        "A method to handle errors",
        "A type of loop"
      ],
      answer: 0,
      explanation: "Hoisting is JavaScript's default behavior of moving all declarations (var, let, const, function, class) to the top of their containing scope during compilation. However, only the declarations are hoisted, not initializations. This means you can use variables before they're declared, but they'll be undefined until the actual declaration is reached."
    },
    // JavaScript Closures
    {
      question: "What is a closure in JavaScript?",
      options: [
        "A function that has access to its own scope, outer function's variables, and global variables",
        "A way to close a program",
        "A method to prevent memory leaks",
        "A type of loop"
      ],
      answer: 0,
      explanation: "A closure is a function that has access to its own scope, the outer function's variables, and global variables, even after the outer function has finished executing. This is possible because the inner function maintains a reference to its outer scope, creating a closure."
    },
    // JavaScript Event Loop
    {
      question: "How does the JavaScript event loop work?",
      options: [
        "It handles asynchronous callbacks by checking the call stack and callback queue",
        "It's a loop that runs forever in the browser",
        "It's used to handle events in Node.js only",
        "It's the same as a for loop"
      ],
      answer: 0,
      explanation: "The JavaScript event loop is a mechanism that handles asynchronous callbacks. It continuously checks if the call stack is empty. If it is, it takes the first task from the callback queue and pushes it to the call stack. This allows JavaScript to be non-blocking and handle multiple operations concurrently, despite being single-threaded."
    },
    // JavaScript 'this' Keyword
    {
      question: "What does the 'this' keyword refer to in JavaScript?",
      options: [
        "It depends on how the function is called",
        "It always refers to the global object",
        "It refers to the function itself",
        "It's the same as 'self' in other languages"
      ],
      answer: 0,
      explanation: "The value of 'this' in JavaScript depends on how a function is called. In a method, 'this' refers to the object the method was called on. In a regular function call, 'this' refers to the global object (or undefined in strict mode). With arrow functions, 'this' is lexically bound to the enclosing context."
    },
    // JavaScript Promises
    {
      question: "What is a Promise in JavaScript?",
      options: [
        "An object representing the eventual completion or failure of an asynchronous operation",
        "A guarantee that a function will return a value",
        "A type of loop",
        "A way to declare variables"
      ],
      answer: 0,
      explanation: "A Promise is an object representing the eventual completion or failure of an asynchronous operation. It's a placeholder for a value that may not be available yet. A Promise is in one of these states: pending, fulfilled, or rejected. It allows you to associate handlers with an asynchronous action's eventual success value or failure reason."
    },
    // JavaScript Prototypal Inheritance
    {
      question: "How does prototypal inheritance work in JavaScript?",
      options: [
        "Objects can inherit properties and methods from other objects through their prototype chain",
        "It's the same as classical inheritance in Java",
        "It's a way to create private variables",
        "It's not possible in JavaScript"
      ],
      answer: 0,
      explanation: "JavaScript uses prototypal inheritance, where objects can inherit properties and methods from other objects through their prototype chain. When you try to access a property or method on an object, JavaScript will first look for it on the object itself. If not found, it will look up the prototype chain until it finds the property/method or reaches the end of the chain (null). This is different from classical inheritance used in languages like Java or C++."
    },
    // JavaScript ES6+ Features
    {
      question: "What are some key features introduced in ES6+?",
      options: [
        "let/const, arrow functions, classes, modules, template literals",
        "Only let/const and arrow functions",
        "Just classes and modules",
        "There are no new features after ES5"
      ],
      answer: 0,
      explanation: "ES6 (ECMAScript 2015) and later versions introduced many important features including: let/const for block-scoped variables, arrow functions, classes, modules, template literals, destructuring, default parameters, rest/spread operators, Promises, async/await, and many more. These features have significantly improved JavaScript's syntax and capabilities."
    },
    // JavaScript Scope
    {
      question: "What is the difference between var, let, and const in JavaScript?",
      options: [
        "var is function-scoped, let/const are block-scoped, const can't be reassigned",
        "They are all the same",
        "let is function-scoped, var/const are block-scoped",
        "const is the same as var"
      ],
      answer: 0,
      explanation: "var is function-scoped and can be redeclared and updated. let is block-scoped, can be updated but not redeclared in the same scope. const is also block-scoped, cannot be updated or redeclared after initialization, and must be initialized during declaration. Both let and const were introduced in ES6 to address issues with var."
    },
    // JavaScript Async/Await
    {
      question: "What is async/await in JavaScript?",
      options: [
        "Syntactic sugar over Promises for handling asynchronous operations",
        "A way to declare synchronous functions",
        "A type of loop",
        "A replacement for callbacks"
      ],
      answer: 0,
      explanation: "Async/await is a modern way to work with Promises in JavaScript. The 'async' keyword is used to declare an asynchronous function, which returns a Promise. The 'await' keyword can only be used inside async functions and makes JavaScript wait until a Promise settles and returns its result. It makes asynchronous code look and behave more like synchronous code, making it easier to read and write."
    },
    // JavaScript Callback Functions
    {
      question: "What is a callback function in JavaScript?",
      options: [
        "A function passed as an argument to another function to be executed later",
        "A function that returns another function",
        "A function that calls itself",
        "A built-in JavaScript function"
      ],
      answer: 0,
      explanation: "A callback function is a function passed as an argument to another function to be executed after some operation has been completed. Callbacks are commonly used in asynchronous operations, event handling, and higher-order functions like map(), filter(), and forEach()."
    },
    // JavaScript Higher-Order Functions
    {
      question: "What is a higher-order function in JavaScript?",
      options: [
        "A function that takes one or more functions as arguments or returns a function",
        "A function with a large number of parameters",
        "A function that is defined at the top level of a script",
        "A function that can only be called once"
      ],
      answer: 0,
      explanation: "A higher-order function is a function that either takes one or more functions as arguments, returns a function, or both. Examples include map(), filter(), reduce(), and forEach(). They are a key concept in functional programming and help in writing more modular and reusable code."
    },
    // JavaScript Event Bubbling and Capturing
    {
      question: "What is event bubbling and capturing in JavaScript?",
      options: [
        "Two phases of event propagation in the DOM tree",
        "Ways to handle errors in JavaScript",
        "Methods to optimize JavaScript performance",
        "Types of function declarations"
      ],
      answer: 0,
      explanation: "Event propagation in the DOM has three phases: 1) Capturing phase (from window to the target element), 2) Target phase (the event reaches the target element), and 3) Bubbling phase (from the target element back up to the window). By default, event handlers are executed during the bubbling phase, but you can set them to execute during the capturing phase by setting the third parameter of addEventListener() to true."
    },
    // JavaScript Debouncing and Throttling
    {
      question: "What is the difference between debouncing and throttling in JavaScript?",
      options: [
        "Debouncing delays execution until after a specified time has passed, throttling limits execution to once per specified time period",
        "They are the same thing",
        "Debouncing is for events, throttling is for animations",
        "Throttling is the same as debouncing but with a different name"
      ],
      answer: 0,
      explanation: "Debouncing ensures that a function is only executed after a certain amount of time has passed since it was last called. Throttling ensures that a function is only executed at most once in a specified time period. Both are techniques to control how often a function is executed, especially useful for performance optimization in scenarios like window resizing, scrolling, or handling rapid user input."
    },
    // JavaScript Memory Management
    {
      question: "How does memory management work in JavaScript?",
      options: [
        "JavaScript automatically allocates memory when objects are created and frees it when they're no longer reachable (garbage collection)",
        "Developers must manually allocate and free memory",
        "Memory is only freed when the page is refreshed",
        "JavaScript doesn't manage memory"
      ],
      answer: 0,
      explanation: "JavaScript automatically allocates memory when objects are created and frees it when they're no longer reachable (garbage collection). The main concept of memory management in JavaScript is reachability. The garbage collector periodically checks for objects that are no longer reachable from the root (global object) and frees the memory they occupy. Memory leaks can occur when there are unwanted references to objects that are no longer needed."
    },
    // JavaScript Modules
    {
      question: "What are ES6 modules in JavaScript?",
      options: [
        "A way to organize and share code between different parts of an application",
        "A type of loop",
        "A method to handle errors",
        "A way to create private variables"
      ],
      answer: 0,
      explanation: "ES6 modules are a way to organize and share code between different parts of a JavaScript application. They allow you to split your code into separate files, each containing related functionality. You can export functions, objects, or primitive values from a module using the 'export' keyword and import them into other modules using the 'import' keyword. This helps in creating more maintainable and reusable code."
    },
    // JavaScript 'null' vs 'undefined'
    {
      question: "What is the difference between 'null' and 'undefined' in JavaScript?",
      options: [
        "'undefined' means a variable has been declared but not assigned a value, 'null' is an explicit assignment value representing no value or no object",
        "They are the same",
        "'null' is for numbers, 'undefined' is for strings",
        "'undefined' is an object, 'null' is a primitive"
      ],
      answer: 0,
      explanation: "In JavaScript, 'undefined' means a variable has been declared but not assigned a value, while 'null' is an assignment value that represents no value or no object. 'undefined' is a type itself, whereas 'null' is an object. When comparing with loose equality (==), they are equal, but with strict equality (===), they are not."
    },
    // JavaScript 'use strict'
    {
      question: "What does 'use strict' do in JavaScript?",
      options: [
        "Enables strict mode which catches common coding mistakes and 'unsafe' actions",
        "Makes JavaScript run faster",
        "Is required for all modern JavaScript code",
        "Prevents all errors in the code"
      ],
      answer: 0,
      explanation: "'use strict' is a directive that enables strict mode in JavaScript. When used, it changes how JavaScript executes code, making it more strict in its parsing and error handling. It helps catch common coding mistakes and 'unsafe' actions, such as assigning to undeclared variables, using reserved words as variable names, or using deprecated features."
    },
    // JavaScript 'new' Keyword
    {
      question: "What does the 'new' keyword do in JavaScript?",
      options: [
        "Creates a new object, sets its prototype, and binds 'this' to the new object",
        "Creates a copy of an existing object",
        "Is used to define new variables",
        "Is the same as 'Object.create()'"
      ],
      answer: 0,
      explanation: "The 'new' keyword in JavaScript does four things: 1) Creates a new empty object, 2) Sets the prototype of this object to the constructor function's prototype property, 3) Binds 'this' to the newly created object, and 4) Returns the newly created object (unless the constructor returns another object). It's used with constructor functions to create new object instances."
    },
    // JavaScript 'bind', 'call', and 'apply'
    {
      question: "What is the difference between 'bind', 'call', and 'apply' in JavaScript?",
      options: [
        "'call' and 'apply' immediately invoke the function with a given 'this' value and arguments, 'bind' returns a new function with 'this' bound to a specific value",
        "They all do the same thing",
        "'bind' and 'call' are the same, 'apply' is different",
        "'bind' is for event listeners, 'call' and 'apply' are for constructors"
      ],
      answer: 0,
      explanation: "'call' and 'apply' are similar in that they both immediately invoke the function with a specified 'this' value and arguments. The difference is that 'call' takes arguments individually, while 'apply' takes them as an array. 'bind', on the other hand, returns a new function with 'this' bound to a specific value, without immediately invoking it. It's useful for setting the context of 'this' for a function that will be called later."
    },
    // JavaScript Map, Filter, Reduce
    {
      question: "What is the difference between map(), filter(), and reduce() in JavaScript?",
      options: [
        "map() transforms each element, filter() selects elements, reduce() reduces to a single value",
        "They all do the same thing",
        "map() is for objects, filter() for arrays, reduce() for strings",
        "There is no difference"
      ],
      answer: 0,
      explanation: "map() creates a new array by transforming every element in the original array. filter() creates a new array with elements that pass a test. reduce() reduces the array to a single value by executing a reducer function on each element. They are higher-order functions that help in writing more declarative and functional code."
    },
    // JavaScript Event Delegation
    {
      question: "What is event delegation in JavaScript?",
      options: [
        "A technique of handling events at a higher level in the DOM than the element that triggered the event",
        "A way to delegate tasks to web workers",
        "A method to handle errors",
        "A type of loop"
      ],
      answer: 0,
      explanation: "Event delegation is a technique where you attach a single event listener to a parent element instead of multiple listeners to individual child elements. When an event occurs on a child element, it bubbles up to the parent where the event is handled. This is more efficient, especially for dynamic content, as it reduces the number of event listeners and memory usage."
    },
    // JavaScript 'this' in Arrow Functions
    {
      question: "How does 'this' work in arrow functions compared to regular functions?",
      options: [
        "Arrow functions don't have their own 'this', they inherit it from the parent scope",
        "Arrow functions have their own 'this' that refers to the function itself",
        "'this' in arrow functions always refers to the global object",
        "There is no difference"
      ],
      answer: 0,
      explanation: "Arrow functions don't have their own 'this' context. Instead, they inherit 'this' from the parent scope at the time they are defined. This is different from regular functions, which have their own 'this' that's determined by how the function is called. This makes arrow functions particularly useful for callbacks and methods where you want to preserve the 'this' context."
    },
    // JavaScript Closures in Loops
    {
      question: "What is a common issue with closures in loops in JavaScript?",
      options: [
        "Variables in loops are function-scoped, leading to unexpected behavior with closures",
        "Loops can't be used with closures",
        "Closures make loops run faster",
        "There are no issues with closures in loops"
      ],
      answer: 0,
      explanation: "A common issue with closures in loops is that variables declared with 'var' are function-scoped, not block-scoped. This means that when you create a closure inside a loop, all closures will reference the same variable, which will have its final value after the loop completes. This can be fixed by using 'let' (which is block-scoped) or by creating a new function scope for each iteration."
    },
    // JavaScript 'typeof' Operator
    {
      question: "What does the 'typeof' operator return in JavaScript?",
      options: [
        "A string indicating the type of the unevaluated operand",
        "The constructor of the object",
        "The value of the variable",
        "A boolean indicating if the value is defined"
      ],
      answer: 0,
      explanation: "The 'typeof' operator returns a string indicating the type of the unevaluated operand. For example: 'number' for numbers, 'string' for strings, 'boolean' for booleans, 'function' for functions, 'object' for objects (and null, which is a known bug), and 'undefined' for undefined variables. It's a unary operator that comes before its operand."
    },
    // JavaScript 'instanceof' Operator
    {
      question: "What does the 'instanceof' operator do in JavaScript?",
      options: [
        "Tests whether an object has a specific constructor in its prototype chain",
        "Checks if a variable is an instance of a class",
        "Both of the above",
        "None of the above"
      ],
      answer: 2,
      explanation: "The 'instanceof' operator tests whether an object has a specific constructor in its prototype chain. It returns true if the object is an instance of the specified class or constructor function. It's commonly used to check the type of an object at runtime and to determine if an object inherits from a particular prototype."
    },
    // JavaScript 'in' Operator
    {
      question: "What does the 'in' operator do in JavaScript?",
      options: [
        "Returns true if the specified property is in the specified object or its prototype chain",
        "Checks if a value is in an array",
        "Iterates over the properties of an object",
        "None of the above"
      ],
      answer: 0,
      explanation: "The 'in' operator returns true if the specified property is in the specified object or its prototype chain. It can be used to check for the existence of a property, including inherited properties. For example: 'length' in [] returns true because arrays inherit the length property from Array.prototype."
    },
    // JavaScript 'delete' Operator
    {
      question: "What does the 'delete' operator do in JavaScript?",
      options: [
        "Removes a property from an object",
        "Deletes a variable or function",
        "Frees up memory used by an object",
        "All of the above"
      ],
      answer: 0,
      explanation: "The 'delete' operator removes a property from an object. It returns true if the deletion was successful, or false if the property is non-configurable. It only works on object properties, not on variables or function names. It doesn't free up memory; the JavaScript engine's garbage collector handles memory management."
    },
    // JavaScript 'void' Operator
    {
      question: "What does the 'void' operator do in JavaScript?",
      options: [
        "Evaluates an expression and returns undefined",
        "'new' invokes a constructor function, 'Object.create()' creates an object with a specified prototype",
        "They do the same thing",
        "'Object.create()' is only for arrays",
        "'new' is deprecated"
      ],
      answer: 0,
      explanation: "'new' is used with constructor functions and does several things: creates a new object, sets the prototype of the new object to the constructor's prototype, calls the constructor with 'this' bound to the new object, and returns the new object (unless the constructor returns an object). 'Object.create()' creates a new object with the specified prototype object and properties. It's a more direct way to create an object with a specific prototype without using constructor functions."
    },
    // JavaScript Event Loop
    {
      question: "What is the difference between the call stack and the task queue in JavaScript?",
      options: [
        "The call stack executes synchronous code, while the task queue holds asynchronous callbacks",
        "They are the same thing",
        "The task queue is for variables, the call stack is for functions",
        "JavaScript doesn't have a call stack"
      ],
      answer: 0,
      explanation: "The call stack is a data structure that keeps track of function calls in your code. It follows the Last In, First Out (LIFO) principle. The task queue (or callback queue) holds callbacks of completed asynchronous operations. The event loop continuously checks if the call stack is empty, and if it is, it takes the first task from the task queue and pushes it onto the call stack for execution."
    },
    // JavaScript ES6+ Features
    {
      question: "What are template literals in JavaScript?",
      options: [
        "String literals allowing embedded expressions and multi-line strings",
        "A way to create HTML templates",
        "A type of array literal",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "Template literals are string literals allowing embedded expressions, multi-line strings, and string interpolation. They are enclosed by backticks (`) instead of single or double quotes and can contain placeholders indicated by ${expression}."
    },
    // JavaScript Async/Await
    {
      question: "What is the difference between async/await and Promises in JavaScript?",
      options: [
        "async/await is syntactic sugar over Promises that makes asynchronous code look synchronous",
        "Promises are faster than async/await",
        "async/await is a replacement for Promises",
        "There is no difference"
      ],
      answer: 0,
      explanation: "Async/await is built on top of Promises and provides a more synchronous-looking way to work with asynchronous code. Under the hood, async functions return Promises, and await is used to wait for a Promise to resolve. It makes the code more readable and easier to reason about compared to Promise chains."
    },
    // JavaScript Modules
    {
      question: "What is the difference between CommonJS and ES6 modules?",
      options: [
        "CommonJS uses require()/module.exports, ES6 uses import/export",
        "ES6 modules are synchronous, CommonJS is asynchronous",
        "CommonJS is for frontend, ES6 modules are for backend",
        "There is no difference"
      ],
      answer: 0,
      explanation: "CommonJS (used in Node.js) uses require() to import modules and module.exports to export them, and it's synchronous. ES6 modules use import/export syntax, are asynchronous by nature, and support static analysis. ES6 modules are the standard for both browser and Node.js (with the .mjs extension or 'type': 'module' in package.json)."
    },
    // JavaScript Scope
    {
      question: "What is the difference between let, const, and var in JavaScript?",
      options: [
        "var is function-scoped, let/const are block-scoped; const can't be reassigned",
        "let is for numbers, const for strings, var for objects",
        "const is the same as var, let is different",
        "There is no difference"
      ],
      answer: 0,
      explanation: "var is function-scoped and can be redeclared and updated. let is block-scoped, can be updated but not redeclared in the same scope. const is also block-scoped, cannot be updated or redeclared after initialization, and must be initialized during declaration. Both let and const were introduced in ES6 to address issues with var."
    },
    // JavaScript 'this' Context
    {
      question: "How can you change the value of 'this' in a function?",
      options: [
        "Using call(), apply(), or bind() methods",
        "Using the 'this' keyword",
        "By reassigning the function",
        "'this' cannot be changed"
      ],
      answer: 0,
      explanation: "The value of 'this' can be explicitly set using call() or apply() to immediately invoke the function with the specified context, or bind() to create a new function with the context bound to the provided value. Arrow functions, however, cannot have their 'this' context changed as they inherit it from the surrounding lexical context."
    },
    // JavaScript Event Loop
    {
      question: "What is the difference between microtasks and macrotasks in the JavaScript event loop?",
      options: [
        "Microtasks have higher priority and run after the current task, macrotasks run in the next event loop tick",
        "Microtasks are for small operations, macrotasks for large operations",
        "Microtasks run in the main thread, macrotasks in web workers",
        "There is no difference"
      ],
      answer: 0,
      explanation: "In the JavaScript event loop, microtasks (like Promise callbacks and MutationObserver callbacks) have higher priority than macrotasks (like setTimeout, setInterval, and I/O operations). After the current macrotask completes, the engine executes all microtasks before running the next macrotask, which can lead to potential starvation if microtasks keep adding more microtasks."
    },
    
    // Question 81: Web Components
    {
      question: "What are Web Components in JavaScript?",
      options: [
        "A suite of technologies that allow creating reusable custom elements",
        "A framework for building web applications",
        "A way to bundle CSS and JavaScript files",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "Web Components are a set of web platform APIs that allow you to create new custom, reusable, encapsulated HTML tags to use in web pages and web apps. They consist of three main technologies: Custom Elements (define new HTML elements), Shadow DOM (encapsulated DOM and styling), and HTML Templates (reusable markup templates)."
    },
    
    // Question 82: IndexedDB
    {
      question: "What is IndexedDB and when would you use it?",
      options: [
        "A low-level API for client-side storage of large amounts of structured data",
        "A way to index database queries for better performance",
        "A method for server-side data storage",
        "A deprecated storage mechanism"
      ],
      answer: 0,
      explanation: "IndexedDB is a low-level API for client-side storage of significant amounts of structured data, including files/blobs. It's useful when you need to store large amounts of data locally, work offline, or cache data for better performance. Unlike localStorage, it supports transactions, indexing, and can store complex data types."
    },
    
    // Question 83: Service Workers
    {
      question: "What is a Service Worker in JavaScript?",
      options: [
        "A script that runs in the background, separate from a web page",
        "A web worker that provides services to other workers",
        "A deprecated feature for background processing",
        "A type of web server"
      ],
      answer: 0,
      explanation: "A Service Worker is a script that your browser runs in the background, separate from a web page, enabling features that don't need a web page or user interaction. They're commonly used for features like push notifications, background sync, and offline-first web applications. Service workers act as a proxy between the web app and the network, enabling rich offline experiences."
    },
    
    // Question 84: Web Workers
    {
      question: "What is the purpose of Web Workers in JavaScript?",
      options: [
        "To run scripts in background threads, keeping the main thread responsive",
        "To create multiple instances of a web application",
        "To improve server performance",
        "A deprecated feature for parallel processing"
      ],
      answer: 0,
      explanation: "Web Workers allow you to run JavaScript in background threads, separate from the main execution thread. This helps keep the UI responsive by offloading CPU-intensive tasks. Workers run in a different global context and communicate with the main thread via message passing. They don't have access to the DOM or window object."
    },
    
    // Question 85: WebAssembly
    {
      question: "What is WebAssembly (WASM) and how does it relate to JavaScript?",
      options: [
        "A binary instruction format that runs at near-native speed in web browsers",
        "A replacement for JavaScript",
        "A JavaScript framework for building web applications",
        "A way to compile JavaScript to native code"
      ],
      answer: 0,
      explanation: "WebAssembly (WASM) is a binary instruction format that runs at near-native speed in web browsers. It's designed as a compilation target for languages like C, C++, and Rust, enabling high-performance applications on the web. It's not a replacement for JavaScript but works alongside it, allowing developers to write performance-critical parts of their applications in other languages."
    },
    
    // Question 86: Web Components - Custom Elements
    {
      question: "What are Custom Elements in the context of Web Components?",
      options: [
        "A way to define new HTML elements with custom behavior",
        "A method to style HTML elements uniquely",
        "A way to create custom CSS properties",
        "A deprecated feature for extending HTML"
      ],
      answer: 0,
      explanation: "Custom Elements are a set of JavaScript APIs that allow you to define new types of HTML elements. You can create your own custom HTML elements with their own behavior and properties. The Custom Elements API provides lifecycle callbacks like connectedCallback, disconnectedCallback, and attributeChangedCallback to manage the element's behavior."
    },
    
    // Question 87: Shadow DOM
    {
      question: "What is the Shadow DOM in web development?",
      options: [
        "A way to encapsulate the internal structure of a web component",
        "A method to create drop shadows for UI elements",
        "A deprecated shadow effect API",
        "A way to hide elements from search engines"
      ],
      answer: 0,
      explanation: "Shadow DOM is a web standard that provides encapsulation for the JavaScript, CSS, and template in a Web Component. It allows hidden DOM trees to be attached to elements in the regular DOM tree. This shadow DOM tree has its own scope for CSS, meaning styles don't leak out and external styles don't bleed in, creating true encapsulation."
    },
    
    // Question 88: Web Performance APIs
    {
      question: "What is the Performance API in JavaScript used for?",
      options: [
        "To measure and analyze the performance of web applications",
        "To improve JavaScript execution speed",
        "A way to optimize server response times",
        "A deprecated performance monitoring tool"
      ],
      answer: 0,
      explanation: "The Performance API provides access to performance-related information for the current page. It allows you to measure how your site performs in real user environments, including navigation timing, resource timing, and user timing. You can use it to mark specific points in your code and measure the time between them, helping to identify performance bottlenecks."
    },
    
    // Question 89: Intersection Observer API
    {
      question: "What is the Intersection Observer API used for?",
      options: [
        "To asynchronously observe changes in the intersection of a target element with an ancestor or viewport",
        "To detect when elements are visible in the viewport for animations",
        "To monitor when elements become visible for lazy loading",
        "All of the above"
      ],
      answer: 3,
      explanation: "The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with the viewport. It's commonly used for lazy-loading images, implementing infinite scrolling, running animations when content becomes visible, and reporting visibility of content for analytics."
    },
    
    // Question 90: Web Animations API
    {
      question: "What is the Web Animations API?",
      options: [
        "A JavaScript API for creating and controlling animations in the browser",
        "A CSS framework for animations",
        "A way to create 3D animations in the browser",
        "A deprecated animation library"
      ],
      answer: 0,
      explanation: "The Web Animations API provides a way to animate DOM elements using JavaScript, offering more control than CSS animations. It unifies animation features from CSS Transitions and CSS Animations, providing a single API for controlling animations. It's particularly useful for complex, interactive animations that need to be controlled programmatically."
    },
    
    // JavaScript ES6+ Features
    {
      question: "What is the prototype chain in JavaScript?",
      options: [
        "The mechanism by which objects inherit features from one another",
        "A way to chain multiple methods together",
        "A deprecated feature replaced by classes",
        "A type of array"
      ],
      answer: 0,
      explanation: "The prototype chain is how JavaScript implements inheritance. When you try to access a property or method on an object, JavaScript first looks for it on the object itself. If not found, it looks at the object's prototype (__proto__), then the prototype's prototype, and so on up the chain until it finds the property or reaches the end of the chain (where the prototype is null)."
    },
    // JavaScript ES6+ Features
    {
      question: "What are JavaScript generators and the yield keyword?",
      options: [
        "Functions that can be paused and resumed, with yield pausing execution",
        "A way to generate random numbers",
        "A type of loop construct",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "Generator functions (defined with function*) can be paused and resumed using the yield keyword. When called, they return a generator object that can be used to control execution. Each call to next() resumes execution until the next yield or return. This is useful for implementing iterators and handling asynchronous operations in a synchronous-looking way."
    },
    // JavaScript Error Handling
    {
      question: "What is the difference between throw Error and throw new Error() in JavaScript?",
      options: [
        "No practical difference, both create and throw an Error object",
        "throw Error is synchronous, throw new Error() is asynchronous",
        "throw Error is for custom errors, throw new Error() for built-in errors",
        "throw Error is deprecated"
      ],
      answer: 0,
      explanation: "There is no practical difference between throw Error('message') and throw new Error('message') - both create and throw a new Error object with the specified message. The new keyword is optional when calling built-in constructors like Error, but it's a common convention to include it for clarity."
    },
    // JavaScript ES2020 Features
    {
      question: "What is the optional chaining operator (?.) in JavaScript?",
      options: [
        "A way to safely access nested object properties without checking each level",
        "A ternary operator alternative",
        "A way to chain multiple methods",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "The optional chaining operator (?.) allows you to read the value of a property located deep within a chain of connected objects without having to check each reference in the chain. If any reference is null or undefined, the expression short-circuits with a return value of undefined instead of throwing an error. For example: user?.address?.street."
    },
    // JavaScript ES2020 Features
    {
      question: "What is the nullish coalescing operator (??) in JavaScript?",
      options: [
        "A logical operator that returns its right-hand operand when its left-hand operand is null or undefined",
        "A way to merge two arrays",
        "A comparison operator similar to ===",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "The nullish coalescing operator (??) is a logical operator that returns its right-hand operand when its left-hand operand is null or undefined, and otherwise returns its left-hand operand. This is different from the logical OR (||) operator, which returns the right-hand operand if the left is any falsy value (0, '', false, null, undefined, NaN)."
    },
    // JavaScript ES2021 Features
    {
      question: "What are logical assignment operators (&&=, ||=, ??=) in JavaScript?",
      options: [
        "Shorthand for performing an operation and assignment in one step based on a condition",
        "A way to chain multiple logical operations",
        "A deprecated feature",
        "A way to create new variables"
      ],
      answer: 0,
      explanation: "Logical assignment operators combine logical operations with assignment. a &&= b means a = a && b, a ||= b means a = a || b, and a ??= b means a = a ?? b. They're useful for providing default values or conditionally updating variables in a concise way. For example: options.timeout ??= 1000 sets timeout to 1000 only if it's null or undefined."
    },
    // JavaScript ES2022 Features
    {
      question: "What is the 'at()' method for arrays and strings in JavaScript?",
      options: [
        "A method to access elements using negative indices (from the end)",
        "A way to find elements in an array",
        "A method to add elements to an array",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "The at() method takes an integer value and returns the item at that index, allowing for positive and negative integers. Negative integers count back from the last item. For example, array.at(-1) returns the last element, array.at(-2) returns the second last, etc. This is more readable than array[array.length - 1] for accessing the end of an array."
    },
    // JavaScript ES2023 Features
    {
      question: "What is the 'findLast()' method for arrays in JavaScript?",
      options: [
        "A method that returns the last element that satisfies a testing function",
        "A way to find the last index of an element",
        "A method to reverse an array",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "The findLast() method iterates the array in reverse order and returns the value of the first element that satisfies the provided testing function. If no elements satisfy the testing function, undefined is returned. This is similar to find(), but starts searching from the end of the array instead of the beginning."
    },
    // JavaScript Best Practices
    {
      question: "What is the purpose of the 'use strict' directive in JavaScript?",
      options: [
        "To enable strict mode which catches common coding mistakes and 'unsafe' actions",
        "To make JavaScript run faster",
        "To enable experimental features",
        "It's required in all JavaScript files"
      ],
      answer: 0,
      explanation: "The 'use strict' directive enables strict mode, which helps catch common coding mistakes and 'unsafe' actions such as assigning to undeclared variables, using deprecated features, or using reserved keywords as variable names. It makes debugging easier and prevents the use of potentially problematic features. It can be applied to entire scripts or individual functions."
    },
    // JavaScript Performance
    {
      question: "What is memoization in JavaScript?",
      options: [
        "An optimization technique that caches the results of expensive function calls",
        "A way to store data in memory",
        "A type of loop optimization",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "Memoization is an optimization technique where the results of expensive function calls are cached so that when the same inputs occur again, the cached result can be returned instead of recomputing the function. This is particularly useful for recursive functions or functions with heavy computations. Libraries like Lodash provide memoization utilities, or you can implement your own using closures."
    }
  ],
  javascript: [
    // Question 1: Comparison operators
    {
      question: "What is the difference between == and === in JavaScript?",
      options: [
        "== performs type coercion, === does not",
        "=== is faster than ==",
        "== is strict comparison, === is loose comparison",
        "There is no difference"
      ],
      answer: 0,
      explanation: "The == operator performs type coercion, meaning it converts the operands to the same type before making the comparison. The === operator (strict equality) does not perform type coercion and returns false if the operands are of different types."
    },
    
    // Question 2: Data Types
    {
      question: "What are the primitive data types in JavaScript?",
      options: [
        "string, number, boolean, null, undefined, symbol, bigint",
        "string, number, boolean, object, function, undefined",
        "string, number, boolean, array, object, null",
        "All of the above"
      ],
      answer: 0,
      explanation: "JavaScript has 7 primitive data types: string, number, boolean, null, undefined, symbol (ES6), and bigint (ES2020). Objects are not primitive types, and arrays/functions are special types of objects."
    },
    
    // Question 3: Hoisting
    {
      question: "What is hoisting in JavaScript?",
      options: [
        "JavaScript's default behavior of moving declarations to the top",
        "A way to optimize code performance",
        "A method to handle errors",
        "A type of loop"
      ],
      answer: 0,
      explanation: "Hoisting is JavaScript's default behavior of moving all declarations (var, let, const, function, class) to the top of their containing scope during compilation. However, only the declarations are hoisted, not initializations. This means you can use variables before they're declared, but they'll be undefined until the actual declaration is reached."
    },
    
    // Question 3: Closures
    {
      question: "What is a closure in JavaScript?",
      options: [
        "A function that has access to its own scope, outer function's variables, and global variables",
        "A way to close a program",
        "A method to prevent memory leaks",
        "A type of loop"
      ],
      answer: 0,
      explanation: "A closure is a function that has access to its own scope, the outer function's variables, and global variables, even after the outer function has finished executing. This is possible because the inner function maintains a reference to its outer scope, creating a closure."
    },
    
    // Question 4: Event Loop
    {
      question: "How does the event loop work in JavaScript?",
      options: [
        "It continuously checks the call stack and processes the callback queue when the stack is empty",
        "It executes code line by line from top to bottom",
        "It's responsible for variable hoisting",
        "It manages memory allocation"
      ],
      answer: 0,
      explanation: "The event loop is a mechanism that allows JavaScript to handle asynchronous operations. It continuously checks if the call stack is empty, and if it is, it takes the first task from the callback queue and pushes it onto the call stack for execution. This is how JavaScript can be non-blocking and handle events, callbacks, and asynchronous operations."
    },
    
    // Question 5: 'this' keyword
    {
      question: "What does the 'this' keyword refer to in JavaScript?",
      options: [
        "The object that the function is a property of, or the global object if not in strict mode",
        "Always refers to the window object",
        "Refers to the function itself",
        "Is not a valid keyword in JavaScript"
      ],
      answer: 0,
      explanation: "The value of 'this' is determined by how a function is called. In a method, 'this' refers to the object the method was called on. In a regular function call (not as a method), 'this' refers to the global object (window in browsers) in non-strict mode, or undefined in strict mode. With arrow functions, 'this' is lexically bound to the surrounding context."
    },
    
    // Question 6: Async/Await
    {
      question: "What is the purpose of async/await in JavaScript?",
      options: [
        "To write asynchronous code that looks synchronous and is easier to read",
        "To make all code run synchronously",
        "To replace all Promise-based code",
        "To improve performance of synchronous code"
      ],
      answer: 0,
      explanation: "Async/await is syntactic sugar built on top of Promises that allows you to write asynchronous code that looks more like traditional synchronous code. An async function always returns a Promise, and the await keyword can be used to wait for a Promise to resolve before continuing execution. This makes the code easier to read and reason about compared to using .then() chains."
    },
    
    // Question 7: Prototypal Inheritance
    {
      question: "How does prototypal inheritance work in JavaScript?",
      options: [
        "Objects can inherit properties and methods from other objects through their prototype chain",
        "It's the same as classical inheritance in Java",
        "It's a way to create private variables",
        "It's a deprecated feature in modern JavaScript"
      ],
      answer: 0,
      explanation: "JavaScript uses prototypal inheritance, where objects can inherit properties and methods from other objects. Each object has a private property called [[Prototype]] that links to another object. When you try to access a property that doesn't exist on an object, JavaScript will look up the prototype chain until it finds the property or reaches the end of the chain (null). This is different from classical inheritance used in languages like Java."
    },
    
    // Question 8: Promises
    {
      question: "What is a Promise in JavaScript?",
      options: [
        "An object representing the eventual completion or failure of an asynchronous operation",
        "A function that runs immediately when defined",
        "A way to declare variables in ES6",
        "A type of loop"
      ],
      answer: 0,
      explanation: "A Promise is an object representing the eventual completion or failure of an asynchronous operation. It's a way to handle asynchronous operations without nesting callbacks (callback hell). A Promise is in one of these states: pending (initial state), fulfilled (operation completed successfully), or rejected (operation failed)."
    },
    
    // Question 9: Template Literals
    {
      question: "What are template literals in JavaScript?",
      options: [
        "String literals allowing embedded expressions and multi-line strings",
        "A way to create HTML templates",
        "A type of array method",
        "A deprecated feature in modern JavaScript"
      ],
      answer: 0,
      explanation: "Template literals are string literals allowing embedded expressions, multi-line strings, and string interpolation. They are enclosed by backticks (`) instead of single or double quotes. They can contain placeholders indicated by ${expression} which are evaluated and included in the string."
    },
    
    // Question 10: Destructuring Assignment
    {
      question: "What is destructuring assignment in JavaScript?",
      options: [
        "A JavaScript expression that makes it possible to unpack values from arrays or properties from objects into distinct variables",
        "A way to remove properties from an object",
        "A method to destroy variables",
        "A feature only available in TypeScript"
      ],
      answer: 0,
      explanation: "Destructuring assignment is a JavaScript expression that makes it possible to unpack values from arrays or properties from objects into distinct variables. For example: `const {a, b} = {a: 1, b: 2}` will create variables a and b with values 1 and 2 respectively."
    },
    
    // Question 11: Rest/Spread Operator
    {
      question: "What is the difference between the rest and spread operators in JavaScript?",
      options: [
        "Rest collects multiple elements into an array, spread expands an array into individual elements",
        "They are exactly the same",
        "Rest is for objects, spread is for arrays",
        "Spread is for function parameters, rest is for function calls"
      ],
      answer: 0,
      explanation: "The rest operator (...) is used to collect all remaining elements into an array, typically in function parameters. The spread operator (also ...) is used to expand an array or object into individual elements. For example: `function sum(...numbers)` uses rest, while `const newArray = [...oldArray]` uses spread."
    },
    
    // Question 12: Map vs Object
    {
      question: "When would you use a Map instead of a regular Object in JavaScript?",
      options: [
        "When you need keys that aren't strings or symbols, or when you need to maintain insertion order",
        "When you need better performance for small datasets",
        "When you want to use dot notation for property access",
        "When working with JSON data"
      ],
      answer: 0,
      explanation: "Use a Map when you need keys that aren't strings/symbols (like objects or functions), when you need to maintain insertion order, when you need to easily get the size of the collection, or when you need better performance for frequent additions/removals. Objects are better for when you need to work with JSON, when you need to use dot notation, or when working with small, fixed sets of string-based keys."
    },
    
    // Question 13: Nullish Coalescing
    {
      question: "What is the nullish coalescing operator (??) in JavaScript?",
      options: [
        "A logical operator that returns its right-hand side operand when its left-hand side is null or undefined",
        "A way to combine two arrays",
        "A deprecated operator",
        "A way to check for both null and undefined at once"
      ],
      answer: 0,
      explanation: "The nullish coalescing operator (??) is a logical operator that returns its right-hand side operand when its left-hand side is null or undefined, and otherwise returns its left-hand side operand. It's different from the logical OR (||) operator because it only checks for null/undefined, not other falsy values like 0 or ''."
    },
    
    // Question 14: Optional Chaining
    {
      question: "What is the optional chaining operator (?.) in JavaScript?",
      options: [
        "A way to safely access nested object properties without checking if each reference exists",
        "A way to chain multiple methods together",
        "A deprecated operator",
        "A way to check if a variable is defined"
      ],
      answer: 0,
      explanation: "The optional chaining operator (?.) allows you to read the value of a property located deep within a chain of connected objects without having to check if each reference in the chain is valid. It short-circuits and returns undefined if any reference is null or undefined, instead of throwing an error."
    },
    
    // Question 15: Arrow Functions
    {
      question: "What is a key difference between arrow functions and regular functions in JavaScript?",
      options: [
        "Arrow functions don't have their own 'this' context, they inherit it from the parent scope",
        "Arrow functions can be used as constructors with the 'new' keyword",
        "Arrow functions have their own 'arguments' object",
        "There are no differences, they work exactly the same"
      ],
      answer: 0,
      explanation: "Arrow functions don't have their own 'this' context - they inherit 'this' from the parent scope at the time they are created. They also don't have their own 'arguments' object and can't be used as constructors with 'new'. Regular functions have their own 'this' context, have an 'arguments' object, and can be used as constructors."
    },
    
    // Question 16: Event Bubbling and Capturing
    {
      question: "What is event bubbling and capturing in JavaScript?",
      options: [
        "Two phases of event propagation in the DOM: capturing (top to target) and bubbling (target to top)",
        "Ways to handle events in React",
        "Methods to stop event propagation",
        "Deprecated event handling techniques"
      ],
      answer: 0,
      explanation: "Event propagation in the DOM has three phases: 1) Capturing phase (from window down to the target), 2) Target phase (on the target element), and 3) Bubbling phase (from the target up to window). By default, event listeners are added in the bubbling phase, but you can set the third parameter of addEventListener to true to use the capturing phase instead."
    },
    
    // Questions 17-47 would continue here...
    
    // Question 49: Memoization
    {
      question: "What is memoization in JavaScript?",
      options: [
        "An optimization technique that caches the results of expensive function calls",
        "A way to store data in memory",
        "A type of loop optimization",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "Memoization is an optimization technique where the results of expensive function calls are cached so that when the same inputs occur again, the cached result can be returned instead of recomputing the function. This is particularly useful for recursive functions or functions with heavy computations. Libraries like Lodash provide memoization utilities, or you can implement your own using closures."
    },
    
    // Question 50: Optional chaining
    {
      question: "What is the optional chaining operator (?.) in JavaScript?",
      options: [
        "Allows reading the value of a property located deep within a chain of connected objects without having to check each reference",
        "A way to chain multiple operations together",
        "A replacement for the ternary operator",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "The optional chaining operator (?.) permits reading the value of a property located deep within a chain of connected objects without having to validate each reference in the chain. If any reference is null or undefined, the expression short-circuits with a return value of undefined."
    },
    {
      question: "What is the nullish coalescing operator (??) in JavaScript?",
      options: [
        "A logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined",
        "A way to combine two arrays",
        "A comparison operator similar to == or ===",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "The nullish coalescing operator (??) is a logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand. This is different from the logical OR (||) operator, which returns the right-hand operand if the left operand is any falsy value."
    },
    // JavaScript ES2021 Features
    {
      question: "What are logical assignment operators (&&=, ||=, ??=) in JavaScript?",
      options: [
        "Combine logical operations with assignment in a concise way",
        "A way to chain multiple logical operations",
        "A deprecated feature",
        "A way to create new variables"
      ],
      answer: 0,
      explanation: "Logical assignment operators combine logical operations with assignment. They include: 1) x &&= y (x && (x = y)) - assigns y to x only if x is truthy, 2) x ||= y (x || (x = y)) - assigns y to x only if x is falsy, 3) x ??= y (x ?? (x = y)) - assigns y to x only if x is null or undefined."
    },
    {
      question: "What is the String.prototype.replaceAll() method in JavaScript?",
      options: [
        "Returns a new string with all matches of a pattern replaced by a replacement",
        "A deprecated method that was removed in ES2021",
        "A method that only works with regular expressions",
        "A method that modifies the original string"
      ],
      answer: 0,
      explanation: "The replaceAll() method returns a new string with all matches of a pattern replaced by a replacement. Unlike replace(), it replaces all occurrences by default without needing the global flag. The pattern can be a string or a regular expression, and the replacement can be a string or a function to be called for each match."
    },
    // JavaScript ES2022 Features
    {
      question: "What is the 'at()' method for arrays and strings in JavaScript?",
      options: [
        "Takes an integer and returns the item at that index, allowing for positive and negative integers",
        "A method to add elements to an array",
        "A way to find elements in an array",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "The at() method takes an integer value and returns the item at that index, allowing for positive and negative integers. Negative integers count back from the last item. For example, array.at(-1) returns the last element, array.at(-2) returns the second last, etc. This is more readable than array[array.length - 1] for accessing the end of an array."
    },
    {
      question: "What are class fields in JavaScript?",
      options: [
        "A way to declare class properties directly in the class body without using a constructor",
        "A way to create private methods in classes",
        "A deprecated feature",
        "A way to define static properties"
      ],
      answer: 0,
      explanation: "Class fields allow you to add properties directly to a class without needing to define them in the constructor. They can be public or private (using # prefix). Public class fields are added to each instance of the class, while private fields are only accessible within the class body. This makes class definitions more self-documenting and can improve performance."
    },
    // JavaScript ES2023 Features
    {
      question: "What is the 'findLast()' method for arrays in JavaScript?",
      options: [
        "Returns the last element that satisfies a provided testing function",
        "A way to find the last index of an element",
        "A method to reverse an array",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "The findLast() method iterates the array in reverse order and returns the value of the first element that satisfies the provided testing function. If no elements satisfy the testing function, undefined is returned. This is similar to find(), but starts searching from the end of the array instead of the beginning."
    },
    {
      question: "What is the 'findLastIndex()' method for arrays in JavaScript?",
      options: [
        "Returns the index of the last element that satisfies a provided testing function",
        "A way to find the last occurrence of a value",
        "A method to sort an array in reverse order",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "The findLastIndex() method iterates the array in reverse order and returns the index of the first element that satisfies the provided testing function. If no elements satisfy the testing function, -1 is returned. This is similar to findIndex(), but starts searching from the end of the array."
    },
    // JavaScript Performance
    {
      question: "What is memoization in JavaScript?",
      options: [
        "An optimization technique that caches the results of expensive function calls",
        "A way to store data in memory",
        "A type of loop optimization",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "Memoization is an optimization technique where the results of expensive function calls are cached so that when the same inputs occur again, the cached result can be returned instead of recomputing the function. This is particularly useful for recursive functions or functions with heavy computations. Libraries like Lodash provide memoization utilities, or you can implement your own using closures."
    },
    // JavaScript Web APIs
    {
      question: "What is the difference between localStorage and sessionStorage in the Web Storage API?",
      options: [
        "localStorage persists until explicitly cleared, sessionStorage is cleared when the page session ends",
        "sessionStorage is more secure than localStorage",
        "localStorage is faster than sessionStorage",
        "There is no difference"
      ],
      answer: 0,
      explanation: "Both localStorage and sessionStorage are part of the Web Storage API and provide ways to store key-value pairs in a web browser. The main difference is in their lifetime: localStorage persists the storage across browser sessions, while sessionStorage is limited to the lifetime of the page session. Both are subject to same-origin policy restrictions."
    },
    // JavaScript Error Handling
    {
      question: "What is the difference between throw Error and throw new Error() in JavaScript?",
      options: [
        "No practical difference, both create and throw an Error object",
        "throw Error is synchronous, throw new Error() is asynchronous",
        "throw Error is for custom errors, throw new Error() for built-in errors",
        "throw Error is deprecated"
      ],
      answer: 0,
      explanation: "There is no practical difference between throw Error('message') and throw new Error('message') - both create and throw a new Error object with the specified message. The new keyword is optional when calling built-in constructors like Error, but it's a common convention to include it for clarity."
    },
    // JavaScript Best Practices
    {
      question: "What is the purpose of the 'use strict' directive in JavaScript?",
      options: [
        "Enables strict mode which catches common coding mistakes and 'unsafe' actions",
        "Makes JavaScript run faster",
        "Is required for all modern JavaScript code",
        "Prevents all errors in the code"
      ],
      answer: 0,
      explanation: "The 'use strict' directive enables strict mode, which helps catch common coding mistakes and 'unsafe' actions such as assigning to undeclared variables, using deprecated features, or using reserved keywords as variable names. It makes debugging easier and prevents the use of potentially problematic features. It can be applied to entire scripts or individual functions."
    },
    // JavaScript ES6+ Features
    {
      question: "What are JavaScript generators and the yield keyword?",
      options: [
        "Functions that can be paused and resumed, with yield pausing execution",
        "A way to generate random numbers",
        "A type of loop construct",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "Generator functions (defined with function*) can be paused and resumed using the yield keyword. When called, they return a generator object that can be used to control execution. Each call to next() resumes execution until the next yield or return. This is useful for implementing iterators and handling asynchronous operations in a synchronous-looking way."
    },
    // JavaScript Event Loop
    {
      question: "What is the difference between microtasks and macrotasks in the JavaScript event loop?",
      options: [
        "Microtasks have higher priority and run after the current task, macrotasks run in the next event loop tick",
        "Microtasks are for small operations, macrotasks for large operations",
        "Microtasks run in the main thread, macrotasks in web workers",
        "There is no difference"
      ],
      answer: 0,
      explanation: "In the JavaScript event loop, microtasks (like Promise callbacks and MutationObserver callbacks) have higher priority than macrotasks (like setTimeout, setInterval, and I/O operations). After the current macrotask completes, the engine executes all microtasks before running the next macrotask, which can lead to potential starvation if microtasks keep adding more microtasks."
    },
    // JavaScript 'this' Context
    {
      question: "How can you change the value of 'this' in a function?",
      options: [
        "Using call(), apply(), or bind() methods",
        "Using the 'this' keyword",
        "By reassigning the function",
        "'this' cannot be changed"
      ],
      answer: 0,
      explanation: "The value of 'this' can be explicitly set using call() or apply() to immediately invoke the function with the specified context, or bind() to create a new function with the context bound to the provided value. Arrow functions, however, cannot have their 'this' context changed as they inherit it from the surrounding lexical context."
    },
    // JavaScript Scope
    {
      question: "What is the difference between let, const, and var in JavaScript?",
      options: [
        "var is function-scoped, let/const are block-scoped; const can't be reassigned",
        "let is for numbers, const for strings, var for objects",
        "const is the same as var, let is different",
        "There is no difference"
      ],
      answer: 0,
      explanation: "var is function-scoped and can be redeclared and updated. let is block-scoped, can be updated but not redeclared in the same scope. const is also block-scoped, cannot be updated or redeclared after initialization, and must be initialized during declaration. Both let and const were introduced in ES6 to address issues with var."
    },
    // Question 51: Nullish coalescing
    {
      question: "What is the nullish coalescing operator (??) in JavaScript?",
      options: [
        "A logical operator that returns its right-hand operand when its left-hand operand is null or undefined",
        "A way to merge two arrays",
        "A comparison operator similar to == or ===",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "The nullish coalescing operator (??) is a logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand. This is different from the logical OR (||) operator, which returns the right-hand operand if the left operand is any falsy value."
    },
    
    // Question 52: Logical assignment operators
    {
      question: "What are logical assignment operators (&&=, ||=, ??=) in JavaScript?",
      options: [
        "Combine logical operations with assignment in a concise way",
        "A way to chain multiple logical operations",
        "A deprecated feature",
        "A way to create new variables"
      ],
      answer: 0,
      explanation: "Logical assignment operators combine logical operations with assignment. They include: 1) x &&= y (x && (x = y)) - assigns y to x only if x is truthy, 2) x ||= y (x || (x = y)) - assigns y to x only if x is falsy, 3) x ??= y (x ?? (x = y)) - assigns y to x only if x is null or undefined."
    },
    
    // Question 53: Symbol type
    {
      question: "What is the purpose of the 'Symbol' primitive type in JavaScript?",
      options: [
        "To create unique property keys that won't conflict with other properties",
        "To represent special numeric values",
        "As a replacement for strings",
        "To create private methods in classes"
      ],
      answer: 0,
      explanation: "Symbols are a primitive type introduced in ES6 that are guaranteed to be unique. They are often used to add unique property keys to an object that won't collide with keys from other code. Each Symbol() call returns a unique value, even when called with the same string description."
    },
    
    // Questions 54-79 would continue here...
    
    // Question 80: matchAll() method
    {
      question: "What is the purpose of the 'String.prototype.matchAll()' method?",
      options: [
        "Returns an iterator of all results matching a string against a regular expression",
        "A way to find all occurrences of a substring",
        "A replacement for the 'match()' method",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "The matchAll() method returns an iterator of all results matching a string against a regular expression, including capturing groups. It's particularly useful when you need to access capture groups and the global (g) flag is set."
    },
    // Question 62: null vs undefined
    {
      question: "What is the difference between 'null' and 'undefined' in JavaScript?",
      options: [
        "'undefined' means a variable has been declared but not assigned, 'null' is an explicit assignment of no value",
        "They are exactly the same",
        "'null' is for numbers, 'undefined' is for strings",
        "'undefined' is an object, 'null' is a primitive"
      ],
      answer: 0,
      explanation: "'undefined' means a variable has been declared but not assigned a value, while 'null' is an assignment value that represents no value or no object reference."
    },
    // Question 63
    {
      question: "What is a WeakMap in JavaScript?",
      options: [
        "A collection of key-value pairs where keys are objects and values can be arbitrary values",
        "A faster version of Map",
        "A way to store weak references to objects",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "A WeakMap is a collection of key-value pairs where the keys must be objects and the values can be arbitrary values. Unlike Map, keys in WeakMap are weakly referenced, which means they can be garbage collected if there are no other references to them."
    },
    // Question 64
    {
      question: "What is the purpose of the 'Reflect' object in JavaScript?",
      options: [
        "Provides methods for interceptable JavaScript operations",
        "A way to reflect on object properties",
        "A replacement for the 'this' keyword",
        "A way to create mirrors of objects"
      ],
      answer: 0,
      explanation: "The Reflect object provides static methods for interceptable JavaScript operations. These methods are the same as those of proxy handlers. Reflect is not a function object, so it's not constructible."
    },
    // Question 65
    {
      question: "What is the difference between 'Object.seal()' and 'Object.freeze()'?",
      options: [
        "'freeze()' makes object immutable, 'seal()' prevents adding/removing properties but allows changes",
        "They do the same thing",
        "'seal()' is for arrays, 'freeze()' is for objects",
        "'freeze()' is deprecated"
      ],
      answer: 0,
      explanation: "Object.freeze() makes an object completely immutable, while Object.seal() prevents adding or removing properties but allows changing existing properties."
    },
    // Question 66
    {
      question: "What is a generator function in JavaScript?",
      options: [
        "A function that can be paused and resumed, using the 'yield' keyword",
        "A function that generates random numbers",
        "A function that creates other functions",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "A generator function is a special type of function that can be paused and resumed, allowing other code to run in between. It's defined using function* syntax and uses the 'yield' keyword to pause execution."
    },
    // Question 67
    {
      question: "What is the difference between 'for...in' and 'for...of' loops?",
      options: [
        "'for...in' iterates over enumerable properties, 'for...of' iterates over iterable values",
        "'for...in' is for arrays, 'for...of' is for objects",
        "They are exactly the same",
        "'for...in' is deprecated"
      ],
      answer: 0,
      explanation: "'for...in' iterates over all enumerable properties of an object, including inherited ones, while 'for...of' iterates over the values of an iterable object like arrays, strings, maps, etc."
    },
    // Question 68
    {
      question: "What is the purpose of the 'Intl' object in JavaScript?",
      options: [
        "Provides language sensitive string comparison, number formatting, and date and time formatting",
        "A way to handle international phone numbers",
        "A way to translate strings",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "The Intl object is the namespace for the ECMAScript Internationalization API, which provides language sensitive string comparison, number formatting, and date and time formatting."
    },
    // Question 69
    {
      question: "What is the purpose of the 'with' statement in JavaScript?",
      options: [
        "Extends the scope chain for a statement (deprecated in strict mode)",
        "A way to include external JavaScript files",
        "A way to create a new scope",
        "A way to handle errors"
      ],
      answer: 0,
      explanation: "The with statement extends the scope chain for a statement. However, it's deprecated in strict mode because it can cause performance issues and make code harder to understand."
    },
    // Question 70
    {
      question: "What is the difference between 'setTimeout()' and 'setInterval()'?",
      options: [
        "'setTimeout()' runs once after a delay, 'setInterval()' runs repeatedly with a delay between executions",
        "'setInterval()' is for intervals, 'setTimeout()' is for timeouts",
        "They are exactly the same",
        "'setInterval()' is deprecated"
      ],
      answer: 0,
      explanation: "setTimeout() executes a function once after a specified delay, while setInterval() repeatedly executes a function with a fixed time delay between each call."
    },
    // Question 71
    {
      question: "What is a TypedArray in JavaScript?",
      options: [
        "An array-like view of an underlying binary data buffer",
        "A way to type-check array elements",
        "A special type of array that only accepts numbers",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "A TypedArray is an array-like view of an underlying binary data buffer. It provides a way to work with raw binary data in JavaScript."
    },
    // Question 72
    {
      question: "What is the purpose of the 'Proxy' object in JavaScript?",
      options: [
        "To define custom behavior for fundamental operations on objects",
        "To create HTTP proxies",
        "To handle AJAX requests",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "The Proxy object is used to define custom behavior for fundamental operations (e.g., property lookup, assignment, enumeration, function invocation, etc.) on objects."
    },
    // Question 73
    {
      question: "What is the difference between 'Array.from()' and 'Array.of()'?",
      options: [
        "'Array.from()' creates an array from array-like or iterable objects, 'Array.of()' creates an array with the given elements",
        "They do the same thing",
        "'Array.of()' is for objects, 'Array.from()' is for arrays",
        "'Array.of()' is deprecated"
      ],
      answer: 0,
      explanation: "Array.from() creates a new Array instance from an array-like or iterable object, while Array.of() creates a new Array instance with a variable number of arguments, regardless of number or type of the arguments."
    },
    // Question 74
    {
      question: "What is the purpose of the 'BigInt' type in JavaScript?",
      options: [
        "To represent integers larger than 2^53 - 1",
        "To handle floating point numbers more precisely",
        "As a replacement for the Number type",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "BigInt is a built-in object that provides a way to represent whole numbers larger than 2^53 - 1, which is the largest number JavaScript can reliably represent with the Number primitive."
    },
    // Question 75
    {
      question: "What is the purpose of the 'globalThis' property?",
      options: [
        "To provide a standard way to access the global object across environments",
        "To create global variables",
        "As a replacement for 'this' in global scope",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "The globalThis property provides a standard way to access the global 'this' value (and thus the global object itself) across environments, whether in a web browser, Node.js, or other environments."
    },
    // Question 76
    {
      question: "What is the purpose of the 'import.meta' object?",
      options: [
        "Contains context-specific metadata about a module",
        "A way to import metadata from files",
        "A way to add metadata to imports",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "The import.meta object contains context-specific metadata about a module. It exposes information specific to the context of the module, such as the module's URL in browsers or the file path in Node.js."
    },
    // Question 77
    {
      question: "What is the purpose of the 'Object.fromEntries()' method?",
      options: [
        "Transforms a list of key-value pairs into an object",
        "Converts an object to an array of entries",
        "Creates a new object with the same prototype as another object",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "The Object.fromEntries() method transforms a list of key-value pairs into an object. It's the inverse of Object.entries()."
    },
    // Question 78
    {
      question: "What is the purpose of the 'Array.prototype.flatMap()' method?",
      options: [
        "Maps each element using a mapping function, then flattens the result into a new array",
        "A way to flatten nested arrays",
        "A combination of map() and filter()",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "The flatMap() method returns a new array formed by applying a given callback function to each element of the array, and then flattening the result by one level. It's equivalent to map() followed by flat(1), but slightly more efficient."
    },
    // Question 79
    {
      question: "What is the purpose of the 'Promise.allSettled()' method?",
      options: [
        "Waits until all promises have settled (either fulfilled or rejected)",
        "A way to run promises in parallel",
        "A replacement for Promise.all()",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "The Promise.allSettled() method returns a promise that resolves after all of the given promises have either been fulfilled or rejected, with an array of objects that each describes the outcome of each promise."
    },
    // Question 80
    {
      question: "What is the purpose of the 'String.prototype.matchAll()' method?",
      options: [
        "Returns an iterator of all results matching a string against a regular expression",
        "A way to find all occurrences of a substring",
        "A replacement for the 'match()' method",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "The matchAll() method returns an iterator of all results matching a string against a regular expression, including capturing groups. It's particularly useful when you need to access capture groups and the global (g) flag is set."
    },
    // Question 81
    {
      question: "What is the purpose of the 'Object.is()' method in JavaScript?",
      options: [
        "To determine whether two values are the same value, similar to '===' but with special handling for NaN and +0/-0",
        "To check if two objects have the same properties",
        "To compare objects by value",
        "A deprecated method"
      ],
      answer: 0,
      explanation: "Object.is() determines whether two values are the same value. It's similar to the === operator but has special handling for NaN (Object.is(NaN, NaN) is true) and +0/-0 (Object.is(+0, -0) is false)."
    },
    // Question 82
    {
      question: "What is the difference between 'null' and 'undefined' in JavaScript?",
      options: [
        "'undefined' means a variable has been declared but not assigned a value, 'null' is an explicit assignment representing no value",
        "They are exactly the same and can be used interchangeably",
        "'null' is for numbers, 'undefined' is for other types",
        "'undefined' is a type, 'null' is an object"
      ],
      answer: 0,
      explanation: "In JavaScript, 'undefined' means a variable has been declared but not assigned a value, while 'null' is an explicit assignment that represents no value. Typeof null returns 'object' (a historical bug), while typeof undefined returns 'undefined'."
    },
    // Question 83
    {
      question: "What is the purpose of the 'Reflect' object in JavaScript?",
      options: [
        "Provides methods for interceptable JavaScript operations, similar to Object methods but in function form",
        "A way to create reflections of objects",
        "A way to handle HTTP requests",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "The Reflect object provides static methods for interceptable JavaScript operations. These methods are the same as those provided by proxy handlers. Reflect is not a function object, so it's not constructible. It provides methods that are the same as the proxy handler methods."
    },
    // Question 84
    {
      question: "What is the difference between 'Array.prototype.some()' and 'Array.prototype.every()'?",
      options: [
        "'some()' tests if any element passes the test, 'every()' tests if all elements pass the test",
        "'some()' returns the first matching element, 'every()' returns all matching elements",
        "They are exactly the same",
        "'every()' is deprecated"
      ],
      answer: 0,
      explanation: "The some() method tests whether at least one element in the array passes the test implemented by the provided function. The every() method tests whether all elements in the array pass the test implemented by the provided function. Both return a boolean."
    },
    // Question 85
    {
      question: "What is the purpose of the 'Symbol.iterator' in JavaScript?",
      options: [
        "A well-known symbol that specifies the default iterator for an object, used by for...of and the spread operator",
        "A way to create private properties",
        "A method to iterate over object properties",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "Symbol.iterator is a well-known symbol that specifies the default iterator for an object. It's used by for...of loops and the spread operator. When an object needs to be iterated, its @@iterator method is called with no arguments, and the returned iterator is used to obtain the values to be iterated."
    },
    // Question 86
    {
      question: "What is the purpose of the 'Array.prototype.reduceRight()' method?",
      options: [
        "Applies a function against an accumulator and each value of the array (from right to left) to reduce it to a single value",
        "A way to reverse an array",
        "A right-to-left version of map()",
        "A deprecated method"
      ],
      answer: 0,
      explanation: "The reduceRight() method applies a function against an accumulator and each value of the array (from right to left) to reduce it to a single value. It's like reduce(), but processes the array from right to left."
    },
    // Question 87
    {
      question: "What is the purpose of the 'Object.seal()' method?",
      options: [
        "Prevents new properties from being added and marks all existing properties as non-configurable, but allows changes to existing properties",
        "Makes an object immutable",
        "A way to protect objects from being modified",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "Object.seal() prevents new properties from being added to an object and marks all existing properties as non-configurable. Values of present properties can still be changed as long as they are writable. In contrast, Object.freeze() makes an object completely immutable."
    },
    // Question 88
    {
      question: "What is the purpose of the 'Function.prototype.bind()' method?",
      options: [
        "Creates a new function that, when called, has its 'this' keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called",
        "A way to bind event handlers",
        "A way to create private methods",
        "A deprecated feature"
      ],
      answer: 0,
      explanation: "The bind() method creates a new function that, when called, has its 'this' keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called. It's commonly used to set the 'this' context in event handlers and callbacks."
    },
    // Question 89
    {
      question: "What is the purpose of the 'Array.prototype.flat()' method?",
      options: [
        "Creates a new array with all sub-array elements concatenated into it recursively up to the specified depth",
        "A way to flatten objects",
        "A way to remove duplicates from an array",
        "A deprecated method"
      ],
      answer: 0,
      explanation: "The flat() method creates a new array with all sub-array elements concatenated into it recursively up to the specified depth. By default, it flattens one level deep. You can pass Infinity to flatten all nested arrays."
    },
    // Question 90
    {
      question: "What is the purpose of the 'Object.entries()' method?",
      options: [
        "Returns an array of a given object's own enumerable string-keyed property [key, value] pairs",
        "A way to convert an object to an array",
        "A way to get all property names of an object",
        "A deprecated method"
      ],
      answer: 0,
      explanation: "The Object.entries() method returns an array of a given object's own enumerable string-keyed property [key, value] pairs, in the same order as that provided by a for...in loop (the difference being that a for...in loop enumerates properties in the prototype chain as well)."
    }
  ],
  web: [
    // Question 68: Web Components
    {
      question: "What are the four specifications that make up Web Components?",
      options: [
        "Custom Elements, Shadow DOM, HTML Templates, and ES Modules",
        "Custom Elements, Virtual DOM, JSX, and CSS Modules",
        "Web Workers, Service Workers, IndexedDB, and LocalStorage",
        "Promises, Async/Await, Generators, and Iterators"
      ],
      answer: 0,
      explanation: "Web Components consist of four main specifications: 1) Custom Elements for defining new HTML elements, 2) Shadow DOM for encapsulation, 3) HTML Templates for reusable markup, and 4) ES Modules for code organization and reuse."
    },
    
    // Question 69: Web Workers
    {
      question: "What is the primary use case for Web Workers in JavaScript?",
      options: [
        "To run CPU-intensive tasks in a background thread",
        "To make HTTP requests",
        "To handle DOM manipulations",
        "To create service workers"
      ],
      answer: 0,
      explanation: "Web Workers allow you to run JavaScript in background threads, separate from the main execution thread. This is particularly useful for CPU-intensive tasks that would otherwise block the UI thread, ensuring a responsive user interface while heavy computations are performed in the background."
    },
    
    // Question 70: IndexedDB
    {
      question: "What is IndexedDB and when would you use it?",
      options: [
        "A low-level API for client-side storage of significant amounts of structured data",
        "A caching mechanism for HTTP requests",
        "A replacement for localStorage with the same API",
        "A server-side database for Node.js"
      ],
      answer: 0,
      explanation: "IndexedDB is a low-level API for client-side storage of significant amounts of structured data, including files/blobs. It's useful when you need to store large amounts of data locally, need to perform complex queries, or require transactions for data integrity. Unlike localStorage, it can store more than just strings and provides better performance for large datasets."
    },
    
    // Question 71: Service Workers
    {
      question: "What is the primary purpose of a Service Worker?",
      options: [
        "To enable offline experiences and background sync",
        "To replace Web Workers",
        "To handle CSS animations",
        "To manage WebSocket connections"
      ],
      answer: 0,
      explanation: "Service Workers act as a proxy between the web app and the network, enabling features like offline experiences, background sync, and push notifications. They can intercept and handle network requests, cache resources, and serve them when the network is unavailable, making them essential for Progressive Web Apps (PWAs)."
    },
    
    // Question 72: WebAssembly
    {
      question: "What is WebAssembly (WASM) primarily used for?",
      options: [
        "Running performance-critical code in the browser",
        "Replacing JavaScript entirely",
        "Styling web components",
        "Handling HTTP requests"
      ],
      answer: 0,
      explanation: "WebAssembly is a binary instruction format that allows running code written in languages like C, C++, and Rust in the browser at near-native speed. It's particularly useful for performance-critical tasks like games, video editing, 3D rendering, and scientific computing, where JavaScript might not be performant enough."
    },
    
    // Question 73: Custom Elements
    {
      question: "What is the correct way to define a custom element in JavaScript?",
      options: [
        "class MyElement extends HTMLElement {}",
        "function MyElement() { return document.createElement('div'); }",
        "const myElement = new CustomElement();",
        "document.defineElement('my-element', {})"
      ],
      answer: 0,
      explanation: "Custom Elements are defined by creating a class that extends HTMLElement and then registering it with customElements.define(). The correct approach is to create a class that extends HTMLElement and then register it with a custom tag name. For example: `customElements.define('my-element', class extends HTMLElement {});`"
    },
    
    // Question 74: Shadow DOM
    {
      question: "What problem does Shadow DOM solve?",
      options: [
        "Encapsulation of DOM and CSS",
        "Improving JavaScript performance",
        "Handling browser compatibility",
        "Reducing bundle size"
      ],
      answer: 0,
      explanation: "Shadow DOM provides encapsulation for the DOM and CSS, allowing you to create self-contained components with scoped styles and markup. This prevents styles from leaking out and external styles from affecting the component, solving the problem of CSS and DOM encapsulation in web components."
    },
    
    // Question 75: Web Performance API
    {
      question: "What can you measure with the Web Performance API?",
      options: [
        "Navigation timing, resource timing, and user timing",
        "Only page load time",
        "Only JavaScript execution time",
        "Only network requests"
      ],
      answer: 0,
      explanation: "The Web Performance API provides several interfaces to measure different aspects of web performance: Navigation Timing API for page load metrics, Resource Timing API for resource loading metrics, and User Timing API for measuring specific parts of your application code. This allows developers to gather detailed performance metrics for analysis and optimization."
    },
    
    // Question 76: Intersection Observer API
    {
      question: "What is the primary use case for the Intersection Observer API?",
      options: [
        "To efficiently detect when elements enter or exit the viewport",
        "To handle mouse intersection events",
        "To detect collisions between DOM elements",
        "To measure element dimensions"
      ],
      answer: 0,
      explanation: "The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or the viewport. It's commonly used for lazy-loading images, infinite scrolling, and triggering animations when elements come into view, all with better performance than traditional scroll event listeners."
    },
    
    // Question 77: Web Animations API
    {
      question: "What advantage does the Web Animations API have over CSS animations?",
      options: [
        "More control and better performance through JavaScript",
        "It's simpler to use than CSS",
        "It replaces CSS animations entirely",
        "It doesn't require JavaScript"
      ],
      answer: 0,
      explanation: "The Web Animations API provides a JavaScript interface for controlling animations, offering more control than CSS animations while maintaining similar performance to CSS animations. It allows for dynamic animations, better sequencing, and more complex timing controls that would be difficult or impossible with CSS alone."
    },
    
    // Question 78: Web Components Best Practices
    {
      question: "What is a best practice when creating Web Components?",
      options: [
        "Use the constructor for setup and connectedCallback for DOM-dependent initialization",
        "Always use Shadow DOM for all components",
        "Avoid using attributes for configuration",
        "Extend built-in elements instead of HTMLElement"
      ],
      answer: 0,
      explanation: "A best practice for Web Components is to use the constructor for basic setup (like creating Shadow DOM) and use connectedCallback for any initialization that requires the component to be in the document. This separation ensures proper component lifecycle management and better performance."
    },
    
      // Question 79: Progressive Web Apps (PWAs)
    {
      question: "What are the key technologies behind Progressive Web Apps (PWAs)?",
      options: [
        "Service Workers, Web App Manifest, and HTTPS",
        "Just Service Workers",
        "Only Web App Manifest",
        "WebSockets and IndexedDB"
      ],
      answer: 0,
      explanation: "Progressive Web Apps rely on three key technologies: Service Workers (for offline functionality and background sync), Web App Manifest (for installability and home screen experience), and HTTPS (for security). These technologies work together to provide an app-like experience on the web."
    },
    
    // Question 80: Web Components vs Frameworks
    {
      question: "How do Web Components compare to frameworks like React or Angular?",
      options: [
        "Web Components are browser standards while frameworks are opinionated libraries",
        "Frameworks are being replaced by Web Components",
        "Web Components provide the same features as frameworks",
        "Frameworks cannot use Web Components"
      ],
      answer: 0,
      explanation: "Web Components are browser standards that provide a way to create reusable custom elements with encapsulated functionality, while frameworks like React or Angular are opinionated libraries that provide their own component models and additional features. Web Components can be used with any framework or without one."
    },

    // Question 81: Web Components Technologies
    {
      question: "What are the four main technologies that make up Web Components?",
      options: [
        "Custom Elements, Shadow DOM, HTML Templates, and ES Modules",
        "Custom Elements, Virtual DOM, JSX, and CSS Modules",
        "Web Workers, Service Workers, IndexedDB, and LocalStorage",
        "Promises, Async/Await, Generators, and Iterators"
      ],
      answer: 0,
      explanation: "Web Components consist of four main technologies: 1) Custom Elements for defining new HTML elements, 2) Shadow DOM for encapsulation, 3) HTML Templates for reusable markup, and 4) ES Modules for code organization and reuse."
    },

    // Question 82: Shadow DOM Purpose
    {
      question: "What is the primary purpose of Shadow DOM in Web Components?",
      options: [
        "Encapsulation of DOM and CSS",
        "Improving JavaScript performance",
  // Question 75: Web Performance API
  {
    question: "What can you measure with the Web Performance API?",
    options: [
      "Navigation timing, resource timing, and user timing",
      "Only page load time",
      "Only JavaScript execution time",
      "Only network requests"
    ],
    answer: 0,
    explanation: "The Web Performance API provides several interfaces to measure different aspects of web performance: Navigation Timing API for page load metrics, Resource Timing API for resource loading metrics, and User Timing API for measuring specific parts of your application code. This allows developers to gather detailed performance metrics for analysis and optimization."
  },
  
  // Question 76: Intersection Observer API
  {
    question: "What is the primary use case for the Intersection Observer API?",
    options: [
      "To efficiently detect when elements enter or exit the viewport",
      "To handle mouse intersection events",
      "To detect collisions between DOM elements",
      "To measure element dimensions"
    ],
    answer: 0,
    explanation: "The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or the viewport. It's commonly used for lazy-loading images, infinite scrolling, and triggering animations when elements come into view, all with better performance than traditional scroll event listeners."
  },
  
  // Question 77: Web Animations API
  {
    question: "What advantage does the Web Animations API have over CSS animations?",
    options: [
      "More control and better performance through JavaScript",
      "It's simpler to use than CSS",
      "It replaces CSS animations entirely",
      "It doesn't require JavaScript"
    ],
    answer: 0,
    explanation: "The Web Animations API provides a JavaScript interface for controlling animations, offering more control than CSS animations while maintaining similar performance to CSS animations. It allows for dynamic animations, better sequencing, and more complex timing controls that would be difficult or impossible with CSS alone."
  },
  
  // Question 78: Web Components Best Practices
  {
    question: "What is a best practice when creating Web Components?",
    options: [
      "Use the constructor for setup and connectedCallback for DOM-dependent initialization",
      "Always use Shadow DOM for all components",
      "Avoid using attributes for configuration",
      "Extend built-in elements instead of HTMLElement"
    ],
    answer: 0,
    explanation: "A best practice for Web Components is to use the constructor for basic setup (like creating Shadow DOM) and use connectedCallback for any initialization that requires the component to be in the document. This separation ensures proper component lifecycle management and better performance."
  },
  
  // Question 79: Progressive Web Apps (PWAs)
  {
    question: "What are the key technologies behind Progressive Web Apps (PWAs)?",
    options: [
      "Service Workers, Web App Manifest, and HTTPS",
      "Just Service Workers",
      "Only Web App Manifest",
      "WebSockets and IndexedDB"
    ],
    answer: 0,
    explanation: "Progressive Web Apps rely on three key technologies: Service Workers (for offline functionality and background sync), Web App Manifest (for installability and home screen experience), and HTTPS (for security). These technologies work together to provide an app-like experience on the web."
  },
  
  // C++ questions start here
  cpp: [,
    options: [
      "Web Components are browser standards while frameworks are opinionated libraries",
      "Frameworks are being replaced by Web Components",
      "Web Components provide the same features as frameworks",
      "Frameworks cannot use Web Components"
    ],
    answer: 0,
    explanation: "Web Components are browser standards (Custom Elements, Shadow DOM, etc.) that provide low-level primitives for component-based development, while frameworks like React and Angular are opinionated libraries that provide higher-level abstractions. Web Components can be used with any framework or no framework at all, and many frameworks can work with Web Components or even compile down to them."
  },
  
  // Other languages will be generated with sample questions
  python: [],
  c: [],
  cpp: [
    // Basic C++ Concepts
    {
      question: "What is the difference between new/delete and malloc/free in C++?",
      options: [
        "new/delete are operators that call constructors/destructors, malloc/free are functions that don't",
        "new/delete are faster than malloc/free",
        "malloc/free can be used in C++ but new/delete can't be used in C",
        "There is no difference"
      ],
      answer: 0,
      explanation: "new/delete are C++ operators that handle both memory allocation/deallocation and constructor/destructor calls, while malloc/free are C functions that only handle raw memory allocation."
    },
    {
      question: "What is the difference between stack and heap memory in C++?",
      options: [
        "Stack is for local variables, heap is for dynamic allocation",
        "Stack is faster but limited in size, heap is larger but slower",
        "Stack is managed automatically, heap requires manual management",
        "All of the above"
      ],
      answer: 3,
      explanation: "All options are correct. Stack is used for local variables and function calls, is faster but limited in size, and is managed automatically. Heap is used for dynamic memory allocation, is larger but slower, and requires manual memory management."
    },
    {
      question: "What is the purpose of the 'const' keyword in C++?",
      options: [
        "To declare constants",
        "To prevent modification of variables",
        "In function parameters to prevent modification of arguments",
        "All of the above"
      ],
      answer: 3,
      explanation: "The 'const' keyword has multiple uses in C++ including declaring constants, making variables read-only, and ensuring function parameters aren't modified."
    },
    {
      question: "What is the difference between deep copy and shallow copy in C++?",
      options: [
        "Shallow copy copies only the pointer, deep copy copies the data",
        "Deep copy creates a new object, shallow copy doesn't",
        "Shallow copy is faster but can cause issues with dynamic memory",
        "All of the above"
      ],
      answer: 3,
      explanation: "All options are correct. Shallow copy copies only the pointer value, while deep copy creates a complete copy of the data. This is particularly important when dealing with dynamically allocated memory."
    },
    {
      question: "What is the purpose of a virtual destructor in C++?",
      options: [
        "To ensure proper cleanup of derived class objects when deleted through a base class pointer",
        "To make a class abstract",
        "To improve performance",
        "To prevent object copying"
      ],
      answer: 0,
      explanation: "A virtual destructor ensures that when you delete an object through a base class pointer, the correct destructor (including the derived class destructor) is called, preventing memory leaks."
    },
    {
      question: "What is the difference between function overloading and overriding in C++?",
      options: [
        "Overloading is multiple functions with same name but different parameters, overriding is redefining a base class function in derived class",
        "Overriding is compile-time polymorphism, overloading is runtime polymorphism",
        "They are the same thing",
        "Overloading is only for constructors, overriding is for other methods"
      ],
      answer: 0,
      explanation: "Function overloading allows multiple functions with the same name but different parameters, while function overriding is when a derived class provides a specific implementation of a method that is already defined in its base class."
    },
    {
      question: "What is the difference between a class and a struct in C++?",
      options: [
        "Default access specifier (private for class, public for struct)",
        "struct is from C, class is C++ only",
        "class can have methods, struct can't",
        "There is no difference"
      ],
      answer: 0,
      explanation: "The only difference between a class and a struct in C++ is the default access level: private for class and public for struct. Both can have constructors, methods, inheritance, etc."
    },
    {
      question: "What is RAII in C++?",
      options: [
        "Resource Acquisition Is Initialization - a programming idiom for resource management",
        "A type of smart pointer",
        "A memory allocation strategy",
        "A C++ standard library container"
      ],
      answer: 0,
      explanation: "RAII (Resource Acquisition Is Initialization) is a C++ programming technique where resources are tied to object lifetime. When an object is created, it acquires resources, and when it's destroyed, it releases them."
    },
    {
      question: "What are smart pointers in C++?",
      options: [
        "Objects that manage dynamic memory automatically",
        "Pointers that are faster than raw pointers",
        "A special type of array",
        "A deprecated feature in modern C++"
      ],
      answer: 0,
      explanation: "Smart pointers are template classes that manage dynamic memory automatically. They include unique_ptr, shared_ptr, and weak_ptr, and help prevent memory leaks by automatically deallocating memory when it's no longer needed."
    },
    {
      question: "What is the difference between #include <filename> and #include \"filename\"?",
      options: [
        "<filename> searches system directories first, \"filename\" searches current directory first",
        "They are exactly the same",
        "<filename> is for C++ headers, \"filename\" is for C headers",
        "<filename> is deprecated in modern C++"
      ],
      answer: 0,
      explanation: "#include <filename> looks for the file in the system's include directories first, while #include \"filename\" looks in the current directory first before checking the system directories."
    },
    {
      question: "What is the purpose of the 'explicit' keyword in C++?",
      options: [
        "To prevent implicit conversions for a constructor with one parameter",
        "To make a function inline",
        "To export a symbol from a library",
        "To declare a variable as constant"
      ],
      answer: 0,
      explanation: "The 'explicit' keyword is used with constructors to prevent implicit conversions. It ensures that the constructor is only called explicitly and not used for implicit conversions."
    },
    {
      question: "What is the difference between static_cast, dynamic_cast, const_cast, and reinterpret_cast in C++?",
      options: [
        "Different types of type casting with different safety levels and purposes",
        "They all do the same thing",
        "They are different syntax for the same operation",
        "They are deprecated in modern C++"
      ],
      answer: 0,
      explanation: "Each cast serves a different purpose: static_cast for safe, well-defined conversions; dynamic_cast for safe downcasting in inheritance hierarchies; const_cast for adding/removing const/volatile; and reinterpret_cast for low-level reinterpreting of bit patterns."
    },
    {
      question: "What is the Rule of Three in C++?",
      options: [
        "If a class defines one of destructor, copy constructor, or copy assignment operator, it should define all three",
        "A class should have no more than three member variables",
        "A function should have no more than three parameters",
        "A class should have at least three methods"
      ],
      answer: 0,
      explanation: "The Rule of Three states that if a class requires a user-defined destructor, copy constructor, or copy assignment operator, it likely requires all three to properly manage resources."
    },
    {
      question: "What is the difference between stack and queue in C++ STL?",
      options: [
        "Stack is LIFO, queue is FIFO",
        "Stack is FIFO, queue is LIFO",
        "They are the same",
        "Stack is for primitive types, queue is for objects"
      ],
      answer: 0,
      explanation: "In C++ STL, stack follows Last-In-First-Out (LIFO) order, while queue follows First-In-First-Out (FIFO) order."
    },
    {
      question: "What is the purpose of the 'mutable' keyword in C++?",
      options: [
        "To allow modification of a class member in a const member function",
        "To make a variable constant",
        "To improve performance of a variable",
        "To make a variable thread-safe"
      ],
      answer: 0,
      explanation: "The 'mutable' keyword allows a class member to be modified even in a const member function. It's typically used for caching, logging, or other internal bookkeeping that doesn't affect the logical state of the object."
    },
    {
      question: "What is the difference between an interface and an abstract class in C++?",
      options: [
        "An abstract class can have implementation, an interface (pure abstract class) cannot",
        "They are exactly the same",
        "An interface can be instantiated, an abstract class cannot",
        "C++ doesn't have interfaces"
      ],
      answer: 0,
      explanation: "In C++, an interface is typically implemented as a pure abstract class (all methods are pure virtual), while an abstract class can have both pure virtual and implemented methods. C++ doesn't have a separate 'interface' keyword like some other languages."
    },
    {
      question: "What is the purpose of the 'friend' keyword in C++?",
      options: [
        "To grant a function or class access to private and protected members",
        "To declare a function as inline",
        "To create a relationship between two classes",
        "To improve performance of a function"
      ],
      answer: 0,
      explanation: "The 'friend' keyword allows a function or class to access private and protected members of the class in which it is declared as a friend, breaking encapsulation for specific cases where it's necessary."
    },
    {
      question: "What is the difference between vector and array in C++?",
      options: [
        "Vector is dynamic, array is fixed-size",
        "Array is part of STL, vector is not",
        "Vector is faster than array",
        "There is no difference"
      ],
      answer: 0,
      explanation: "The main difference is that a vector is a dynamic array that can grow and shrink in size, while a standard array has a fixed size determined at compile time. Both are part of the C++ Standard Library."
    },
    {
      question: "What is the purpose of the 'volatile' keyword in C++?",
      options: [
        "To indicate that a variable's value may change unexpectedly",
        "To make a variable thread-safe",
        "To improve performance of a variable",
        "To make a variable constant"
      ],
      answer: 0,
      explanation: "The 'volatile' keyword tells the compiler that a variable's value may change at any time without any action being taken by the code. It's commonly used for memory-mapped hardware registers or variables modified by an interrupt service routine."
    },
    {
      question: "What is the difference between a shallow copy and a deep copy in C++?",
      options: [
        "Shallow copy copies pointers, deep copy copies the data pointed to",
        "Shallow copy is faster but can cause issues with dynamic memory",
        "Deep copy creates independent copies of dynamically allocated memory",
        "All of the above"
      ],
      answer: 3,
      explanation: "All options are correct. A shallow copy copies all member values, including pointers, which can lead to issues if the original object is destroyed. A deep copy creates copies of any dynamically allocated memory, making the objects independent."
    },
    // Additional C++ Questions
    {
      question: "What is the purpose of the 'inline' keyword in C++?",
      options: [
        "To suggest the compiler to perform inline expansion of the function",
        "To make a function execute faster",
        "To declare a function inside a class",
        "To prevent multiple definitions of a function"
      ],
      answer: 0,
      explanation: "The 'inline' keyword suggests to the compiler that a particular function should be inlined, i.e., the function's code should be inserted at each point where the function is called, rather than generating a function call."
    },
    {
      question: "What is the difference between a reference and a pointer in C++?",
      options: [
        "References must be initialized, cannot be NULL, and cannot be reassigned",
        "Pointers are safer than references",
        "References are just syntax sugar for pointers",
        "There is no difference"
      ],
      answer: 0,
      explanation: "References must be initialized when declared, cannot be NULL, and cannot be reassigned to refer to a different object after initialization. Pointers can be null, can be reassigned, and can be uninitialized (though this is not recommended)."
    },
    {
      question: "What is the 'this' pointer in C++?",
      options: [
        "A pointer to the current object instance",
        "A pointer to the base class",
        "A pointer to the derived class",
        "A special pointer to static members"
      ],
      answer: 0,
      explanation: "The 'this' pointer is a special pointer that holds the memory address of the current object. It's implicitly passed as a hidden argument to all non-static member function calls."
    },
    {
      question: "What is the difference between a class template and a function template in C++?",
      options: [
        "Class templates define a family of classes, function templates define a family of functions",
        "Class templates can't have template parameters",
        "Function templates can't be specialized",
        "There is no difference"
      ],
      answer: 0,
      explanation: "Class templates define a family of classes, while function templates define a family of functions. Both can have template parameters and can be specialized, but they serve different purposes in generic programming."
    },
    {
      question: "What is the purpose of the 'using' keyword in C++?",
      options: [
        "To create type aliases, for namespace members, and for inheriting constructors",
        "Only for including namespaces",
        "Only for creating type aliases",
        "It's a deprecated keyword"
      ],
      answer: 0,
      explanation: "The 'using' keyword has multiple uses in C++: to create type aliases (alternative to typedef), to bring namespace members into scope, and in C++11 and later, to inherit constructors from a base class."
    },
    {
      question: "What is the difference between a template class and a class template in C++?",
      options: [
        "A class template is a template for creating classes, a template class is a specific instantiation of a class template",
        "They are the same thing",
        "A template class is a template for creating classes, a class template is a specific instantiation",
        "Neither exists in C++"
      ],
      answer: 0,
      explanation: "A class template is a template for creating classes, while a template class (or more precisely, a class template specialization) is a specific instantiation of a class template with particular template arguments."
    },
    {
      question: "What is the purpose of the 'noexcept' specifier in C++?",
      options: [
        "To specify that a function will not throw exceptions",
        "To handle exceptions",
        "To declare that a function might throw any exception",
        "To improve function performance"
      ],
      answer: 0,
      explanation: "The 'noexcept' specifier indicates that a function is not expected to throw exceptions. This allows the compiler to perform certain optimizations and provides information to callers about exception safety."
    },
    {
      question: "What is the difference between 'std::move' and 'std::forward' in C++?",
      options: [
        "std::move converts to an rvalue, std::forward preserves the value category",
        "They do the same thing",
        "std::forward is for move semantics, std::move is for perfect forwarding",
        "std::move is for built-in types, std::forward is for user-defined types"
      ],
      answer: 0,
      explanation: "std::move unconditionally casts its argument to an rvalue, while std::forward conditionally casts its argument to an rvalue only if it was originally an rvalue. std::forward is used with forwarding references to implement perfect forwarding."
    },
    {
      question: "What is the purpose of the 'decltype' specifier in C++?",
      options: [
        "To inspect the declared type of an entity or the type of an expression",
        "To declare a variable",
        "To define a type alias",
        "To declare a function's return type"
      ],
      answer: 0,
      explanation: "The 'decltype' specifier inspects the declared type of an entity or the type of an expression. It's particularly useful in template metaprogramming and generic code where the exact type might not be known in advance."
    },
    {
      question: "What is the difference between 'std::unique_ptr' and 'std::shared_ptr' in C++?",
      options: [
        "unique_ptr represents exclusive ownership, shared_ptr allows shared ownership with reference counting",
        "shared_ptr is faster than unique_ptr",
        "unique_ptr can be copied, shared_ptr cannot",
        "They are the same"
      ],
      answer: 0,
      explanation: "std::unique_ptr represents exclusive ownership of a dynamically allocated object and cannot be copied (only moved). std::shared_ptr allows multiple pointers to share ownership of an object using reference counting."
    },
    {
      question: "What is the purpose of the 'constexpr' keyword in C++?",
      options: [
        "To indicate that a variable or function can be evaluated at compile time",
        "To declare a constant variable",
        "To improve performance of a function",
        "To make a variable thread-safe"
      ],
      answer: 0,
      explanation: "The 'constexpr' keyword indicates that the value of a variable or function can be evaluated at compile time, allowing them to be used in contexts where a compile-time constant is required."
    },
    {
      question: "What is the difference between 'std::array' and a C-style array in C++?",
      options: [
        "std::array knows its size, provides bounds checking with at(), and can be used with STL algorithms",
        "C-style arrays are safer than std::array",
        "std::array is a dynamically resizable array",
        "There is no difference"
      ],
      answer: 0,
      explanation: "std::array is a container that encapsulates fixed-size arrays. Unlike C-style arrays, it knows its own size, provides bounds checking with at(), and can be used with STL algorithms. It's also safer as it doesn't decay to a pointer."
    },
    {
      question: "What is the purpose of the 'alignas' specifier in C++?",
      options: [
        "To specify the alignment requirement of a type or object",
        "To align text output",
        "To align memory to page boundaries",
        "To align data structures for network transmission"
      ],
      answer: 0,
      explanation: "The 'alignas' specifier is used to specify the alignment requirement of a type or object. It's particularly useful for low-level programming, SIMD instructions, or when interfacing with hardware that has specific alignment requirements."
    },
    {
      question: "What is the difference between 'std::bind' and lambda expressions in C++?",
      options: [
        "Lambdas are generally more readable and can capture local variables by reference, while bind is more flexible with argument reordering",
        "They are exactly the same",
        "bind is always better than lambdas",
        "Lambdas are only for simple functions"
      ],
      answer: 0,
      explanation: "Lambdas are generally more readable, can capture local variables by reference, and are often more efficient. std::bind is more flexible with argument reordering and can be used with function objects that have a non-const operator()."
    },
    {
      question: "What is the purpose of the 'thread_local' keyword in C++?",
      options: [
        "To declare thread-local storage duration",
        "To create a new thread",
        "To synchronize threads",
        "To make a variable shared between threads"
      ],
      answer: 0,
      explanation: "The 'thread_local' keyword specifies that the variable has thread storage duration. Each thread has its own instance of the variable, and it's initialized when the thread starts and destroyed when the thread ends."
    },
    {
      question: "What is the difference between 'std::function' and function pointers in C++?",
      options: [
        "std::function can store any callable target, including lambdas and function objects, while function pointers can only point to functions",
        "Function pointers are more modern than std::function",
        "std::function is faster than function pointers",
        "There is no difference"
      ],
      answer: 0,
      explanation: "std::function is a general-purpose polymorphic function wrapper that can store any callable target (functions, lambda expressions, function objects, etc.), while function pointers can only point to functions and cannot store state."
    },
    {
      question: "What is the purpose of the 'final' specifier in C++?",
      options: [
        "To prevent a class from being inherited or a virtual function from being overridden",
        "To mark a variable as constant",
        "To indicate the end of a class definition",
        "To specify the return type of a function"
      ],
      answer: 0,
      explanation: "The 'final' specifier can be used to prevent a class from being inherited from or to prevent a virtual function from being overridden in derived classes. It helps enforce design decisions and can enable certain optimizations."
    },
    {
      question: "What is the difference between 'std::async' and 'std::thread' in C++?",
      options: [
        "std::async returns a future and may use a thread pool, while std::thread creates a new thread directly",
        "std::thread is higher level than std::async",
        "std::async is only for I/O operations",
        "They are the same"
      ],
      answer: 0,
      explanation: "std::async is a higher-level abstraction that returns a std::future and may use a thread pool (implementation-defined), while std::thread is a lower-level construct that always creates a new thread. std::async also provides better exception handling."
    },
    {
      question: "What is the purpose of the '[[nodiscard]]' attribute in C++?",
      options: [
        "To issue a warning if the return value of a function is ignored",
        "To prevent a function from returning a value",
        "To mark a function as not returning",
        "To improve function performance"
      ],
      answer: 0,
      explanation: "The '[[nodiscard]]' attribute can be applied to functions to issue a warning if the return value is ignored. This is particularly useful for functions where ignoring the return value is likely to be a bug."
    },
    {
      question: "What is the difference between 'std::unordered_map' and 'std::map' in C++?",
      options: [
        "std::map is ordered (typically a red-black tree), std::unordered_map is unordered (hash table)",
        "std::unordered_map is always faster than std::map",
        "std::map uses more memory than std::unordered_map",
        "There is no difference"
      ],
      answer: 0,
      explanation: "std::map is typically implemented as a red-black tree and maintains elements in sorted order, while std::unordered_map is implemented as a hash table and doesn't maintain any particular order. The choice between them depends on whether ordering is needed and the specific performance characteristics required."
    },
    {
      question: "What is the purpose of the 'auto' keyword in C++?",
      options: [
        "To automatically deduce the type of a variable from its initializer",
        "To declare automatic storage duration",
        "To create a variable that changes type at runtime",
        "To import all names from a namespace"
      ],
      answer: 0,
      explanation: "The 'auto' keyword in C++11 and later is used for type inference, allowing the compiler to automatically deduce the type of a variable from its initializer. This makes code more maintainable and reduces verbosity, especially with complex template types."
    },
    {
      question: "What is the difference between 'delete' and 'delete[]' in C++?",
      options: [
        "'delete' is for single objects, 'delete[]' is for arrays",
        "'delete[]' is faster than 'delete'",
        "'delete' is for built-in types, 'delete[]' for user-defined types",
        "There is no difference"
      ],
      answer: 0,
      explanation: "'delete' should be used to free memory allocated with 'new' for a single object, while 'delete[]' must be used to free memory allocated with 'new[]' for an array of objects. Using the wrong form results in undefined behavior."
    },
    {
      question: "What is the purpose of the 'override' keyword in C++?",
      options: [
        "To explicitly mark a function as overriding a virtual function from a base class",
        "To improve performance of virtual function calls",
        "To prevent a function from being overridden in derived classes",
        "To make a function virtual"
      ],
      answer: 0,
      explanation: "The 'override' specifier explicitly marks a member function as overriding a virtual function from a base class. It helps catch errors at compile-time if the function signature doesn't match any virtual function in the base class."
    },
    {
      question: "What is the difference between 'std::vector::emplace_back()' and 'std::vector::push_back()'?",
      options: [
        "emplace_back constructs the element in-place, push_back creates a temporary and copies/moves it",
        "push_back is faster than emplace_back",
        "emplace_back can only be used with primitive types",
        "There is no difference"
      ],
      answer: 0,
      explanation: "emplace_back constructs the element directly in the vector's storage using the provided arguments, while push_back creates a temporary object and then copies or moves it into the vector. emplace_back can be more efficient as it may avoid the extra copy/move operation."
    },
    {
      question: "What is the purpose of the 'std::initializer_list' in C++?",
      options: [
        "To initialize containers and other types with a list of values",
        "To create a linked list",
        "To store command-line arguments",
        "To define function parameters"
      ],
      answer: 0,
      explanation: "std::initializer_list is a lightweight proxy object that provides access to an array of objects of a single type. It's primarily used for initializing containers and other types with a list of values using the brace-enclosed initializer list syntax."
    },
    {
      question: "What is the difference between 'std::make_shared' and 'std::shared_ptr' constructor?",
      options: [
        "make_shared performs a single allocation for both the object and control block, while the constructor makes two separate allocations",
        "There is no difference",
        "make_shared is only for arrays",
        "The constructor is more efficient than make_shared"
      ],
      answer: 0,
      explanation: "std::make_shared performs a single memory allocation for both the object and the control block (which stores the reference count), while using the std::shared_ptr constructor directly typically results in two separate allocations. This makes make_shared more efficient."
    },
    {
      question: "What is the purpose of the 'std::move_iterator' in C++?",
      options: [
        "To convert an iterator into a move iterator that moves elements instead of copying them",
        "To move an iterator to a different position",
        "To create a reverse iterator",
        "To sort elements in a container"
      ],
      answer: 0,
      explanation: "std::move_iterator is an iterator adaptor that behaves like the underlying iterator, but whose dereference operator implicitly converts the value returned by the underlying iterator to an rvalue reference, enabling move semantics when the iterator is used with algorithms."
    },
    {
      question: "What is the difference between 'std::function' and a lambda expression in C++?",
      options: [
        "std::function is a type-erased wrapper that can store any callable, while a lambda is a specific type of function object",
        "They are exactly the same",
        "Lambda expressions are more efficient than std::function",
        "std::function can only store function pointers"
      ],
      answer: 0,
      explanation: "std::function is a polymorphic function wrapper that can store any callable target (functions, lambdas, function objects) with a specific call signature, while a lambda expression is a specific type of function object with a unique, unnamed type."
    },
    {
      question: "What is the purpose of the 'std::launch' enumeration in C++?",
      options: [
        "To specify the launch policy for std::async",
        "To start a new thread",
        "To specify the scheduling policy for a thread",
        "To launch a separate process"
      ],
      answer: 0,
      explanation: "std::launch is an enumeration used with std::async to specify the launch policy, such as std::launch::async for asynchronous execution in a new thread, or std::launch::deferred for lazy evaluation in the current thread."
    },
    {
      question: "What is the difference between 'std::atomic' and 'volatile' in C++?",
      options: [
        "std::atomic provides atomic operations and memory ordering guarantees, while volatile is for special memory locations",
        "They are the same",
        "volatile provides thread safety, std::atomic doesn't",
        "std::atomic is only for built-in types"
      ],
      answer: 0,
      explanation: "std::atomic provides atomic operations with well-defined memory ordering semantics for thread-safe programming, while volatile is used to indicate that a variable's value might change unexpectedly (e.g., memory-mapped I/O) and prevents certain compiler optimizations."
    },
    {
      question: "What is the purpose of the 'std::enable_if' template in C++?",
      options: [
        "To enable or disable function overloads based on type traits",
        "To enable RTTI for a class",
        "To enable exceptions in a function",
        "To enable virtual function calls"
      ],
      answer: 0,
      explanation: "std::enable_if is a template metaprogramming technique used for SFINAE (Substitution Failure Is Not An Error) to enable or disable function overloads or template specializations based on compile-time conditions, typically using type traits."
    },
    {
      question: "What is the difference between 'std::forward_list' and 'std::list' in C++?",
      options: [
        "std::forward_list is a singly-linked list, std::list is a doubly-linked list",
        "std::list is faster than std::forward_list",
        "std::forward_list supports bidirectional iteration",
        "There is no difference"
      ],
      answer: 0,
      explanation: "std::forward_list is a singly-linked list that only allows forward traversal, while std::list is a doubly-linked list that allows both forward and backward traversal. std::forward_list is more memory efficient but has fewer member functions."
    },
    {
      question: "What is the purpose of the 'std::tie' function in C++?",
      options: [
        "To create a tuple of lvalue references for unpacking or comparison",
        "To bind function arguments",
        "To connect a stream to a file",
        "To create a reference to a variable"
      ],
      answer: 0,
      explanation: "std::tie creates a tuple of lvalue references, which is commonly used for unpacking std::pair or std::tuple objects into individual variables, or for lexicographical comparison of multiple values."
    },
    {
      question: "What is the difference between 'std::optional' and 'std::variant' in C++?",
      options: [
        "std::optional represents an optional value, std::variant represents a type-safe union",
        "They are the same",
        "std::variant is for compile-time type checking, std::optional is for runtime",
        "std::optional is for multiple types, std::variant for a single type"
      ],
      answer: 0,
      explanation: "std::optional represents an object that may or may not contain a value (similar to a nullable type), while std::variant represents a type-safe union that can hold one of several different types at any given time."
    },
    {
      question: "What is the purpose of the 'std::byte' type in C++17?",
      options: [
        "To represent a byte of data in a type-safe manner",
        "To measure memory usage",
        "To store a single character",
        "To represent a bit field"
      ],
      answer: 0,
      explanation: "std::byte is a distinct type introduced in C++17 to represent the smallest addressable unit of memory in a type-safe manner. It's useful for low-level programming, such as when working with raw memory or binary I/O."
    },
    {
      question: "What is the difference between 'std::string_view' and 'std::string' in C++?",
      options: [
        "std::string_view is a non-owning view of a string, std::string owns its data",
        "std::string is faster than std::string_view",
        "std::string_view can modify the underlying string",
        "There is no difference"
      ],
      answer: 0,
      explanation: "std::string_view is a lightweight, non-owning reference to a string (or a portion of a string) that provides read-only access to the character data. Unlike std::string, it doesn't own the data and is typically used for function parameters to avoid unnecessary copies."
    },
    {
      question: "What is the purpose of the 'std::launder' function in C++17?",
      options: [
        "To obtain a pointer to an object created in the storage of an existing object of the same type",
        "To clean up memory",
        "To convert between pointer types",
        "To optimize memory allocation"
      ],
      answer: 0,
      explanation: "std::launder is a low-level utility used in placement new scenarios to obtain a pointer to an object created in the storage of an existing object of the same type, which is necessary to avoid undefined behavior in certain cases involving const or reference members."
    },
    {
      question: "What is the difference between 'std::scoped_lock' and 'std::lock_guard' in C++?",
      options: [
        "scoped_lock can lock multiple mutexes atomically, lock_guard can only lock one",
        "lock_guard is more modern than scoped_lock",
        "scoped_lock is only for recursive mutexes",
        "There is no difference"
      ],
      answer: 0,
      explanation: "std::scoped_lock (C++17) is a more flexible version of std::lock_guard that can lock multiple mutexes atomically using deadlock avoidance algorithms, while std::lock_guard can only manage a single mutex."
    },
    {
      question: "What is the purpose of the '[[maybe_unused]]' attribute in C++?",
      options: [
        "To suppress compiler warnings about unused variables or functions",
        "To mark a variable as potentially uninitialized",
        "To optimize away unused code",
        "To document code"
      ],
      answer: 0,
      explanation: "The '[[maybe_unused]]' attribute can be applied to variables, functions, or parameters to suppress compiler warnings about them being unused, which is particularly useful in cases where the use is conditional or for documentation purposes."
    },
    {
      question: "What is the difference between 'std::pmr::memory_resource' and 'std::allocator' in C++?",
      options: [
        "memory_resource is a more flexible memory allocation interface, allocator is the default memory allocator",
        "They are the same",
        "allocator is for polymorphic types, memory_resource is for built-in types",
        "memory_resource is deprecated in favor of allocator"
      ],
      answer: 0,
      explanation: "std::pmr::memory_resource (C++17) is an abstract interface for memory allocation that provides more flexibility than std::allocator, allowing for custom memory allocation strategies and enabling polymorphic memory resources."
    },
    {
      question: "What is the purpose of the 'std::filesystem' library in C++?",
      options: [
        "To perform file system operations in a portable way",
        "To manage memory allocation",
        "To handle network connections",
        "To parse configuration files"
      ],
      answer: 0,
      explanation: "The 'std::filesystem' library (introduced in C++17) provides facilities for performing operations on file systems and their components, such as paths, regular files, and directories, in a portable way across different operating systems."
    },
    {
      question: "What is the difference between 'std::span' and 'std::array' in C++?",
      options: [
        "std::span is a non-owning view of a contiguous sequence, std::array owns its elements",
        "std::array is more efficient than std::span",
        "std::span can only be used with C-style arrays",
        "There is no difference"
      ],
      answer: 0,
      explanation: "std::span (C++20) is a non-owning view over a contiguous sequence of objects, while std::array is a container that owns and manages its own elements. std::span is particularly useful for writing functions that can accept different types of contiguous sequences."
    },
    {
      question: "What is the purpose of the 'std::jthread' class in C++20?",
      options: [
        "A thread that automatically joins on destruction and supports cooperative cancellation",
        "A lightweight alternative to std::thread",
        "A thread pool implementation",
        "A way to create coroutines"
      ],
      answer: 0,
      explanation: "std::jthread (C++20) is an improvement over std::thread that automatically joins on destruction (preventing potential program termination) and supports cooperative cancellation through a stop_token mechanism, making it safer and more convenient to use."
    },
    {
      question: "What is the difference between 'std::source_location' and '__FILE__' in C++?",
      options: [
        "std::source_location provides more detailed source code location information and is constexpr",
        "__FILE__ is more efficient",
        "std::source_location is only for exceptions",
        "There is no difference"
      ],
      answer: 0,
      explanation: "std::source_location (C++20) provides a more modern and flexible way to capture source code location information (file name, line number, function name) in a constexpr context, compared to the older preprocessor macros like __FILE__ and __LINE__."
    },
    {
      question: "What is the purpose of the 'std::format' library in C++?",
      options: [
        "To perform type-safe string formatting",
        "To format hard drives",
        "To parse configuration files",
        "To format source code"
      ],
      answer: 0,
      explanation: "The 'std::format' library (C++20) provides type-safe string formatting with a Python-style format string syntax, offering a safer and more flexible alternative to functions like printf or string concatenation."
    },
    {
      question: "What is the difference between 'std::expected' and 'std::optional' in C++23?",
      options: [
        "std::expected can store either a value or an error, std::optional can only store a value or be empty",
        "They are the same",
        "std::optional is more efficient",
        "std::expected is only for error handling"
      ],
      answer: 0,
      explanation: "std::expected (C++23) is a type that can hold either an expected value or an error value, making it useful for functions that can fail and need to report why. std::optional can only hold a value or be empty, with no way to indicate why no value is present."
    },
    {
      question: "What is the purpose of the 'std::generator' in C++23?",
      options: [
        "To create coroutine-based generators for lazy sequences",
        "To generate random numbers",
        "To create thread pools",
        "To generate source code"
      ],
      answer: 0,
      explanation: "std::generator (C++23) is a coroutine-based utility for creating generators that produce sequences of values lazily. It allows writing range-based for loops that generate values on-demand, which is memory-efficient for large or infinite sequences."
    },
    {
      question: "What is the difference between 'std::mdspan' and 'std::vector' in C++23?",
      options: [
        "std::mdspan is a non-owning multidimensional array view, std::vector is a 1D owning container",
        "std::vector is more efficient for mathematical operations",
        "std::mdspan can only be used with C-style arrays",
        "There is no difference"
      ],
      answer: 0,
      explanation: "std::mdspan (C++23) is a non-owning multidimensional array reference that provides a view over existing data, while std::vector is a 1D container that owns its elements. std::mdspan is particularly useful for numerical computing and scientific applications."
    },
    {
      question: "What is the purpose of the 'std::execution' namespace in C++17?",
      options: [
        "To specify execution policies for parallel algorithms",
        "To manage thread execution",
        "To handle exceptions in concurrent code",
        "To define coroutine execution contexts"
      ],
      answer: 0,
      explanation: "The 'std::execution' namespace in C++17 provides execution policies (like 'std::execution::par' for parallel execution) that can be passed to standard algorithms to indicate how they should be executed (sequentially, in parallel, or with vectorization)."
    },
    {
      question: "What is the difference between 'std::latch' and 'std::barrier' in C++20?",
      options: [
        "std::latch is a single-use barrier, std::barrier can be reused",
        "They are the same",
        "std::barrier is for thread synchronization, std::latch is not",
        "std::latch is more efficient than std::barrier"
      ],
      answer: 0,
      explanation: "std::latch is a single-use thread coordination mechanism that allows threads to block until a counter reaches zero, while std::barrier is reusable and allows a group of threads to block until all threads in the group have reached the barrier. Both are used for thread synchronization but have different use cases."
    },
    {
      question: "What is the purpose of the 'std::counting_semaphore' in C++20?",
      options: [
        "To control access to a shared resource with a counter",
        "To count the number of threads in a process",
        "To measure execution time",
        "To implement a mutex"
      ],
      answer: 0,
      explanation: "std::counting_semaphore is a synchronization primitive that controls access to a shared resource by maintaining a counter. It allows up to N threads to access the resource simultaneously, where N is the semaphore's maximum value. It's more flexible than a mutex which only allows one thread at a time."
    },
    {
      question: "What is the difference between 'std::stop_token' and 'std::stop_source' in C++20?",
      options: [
        "std::stop_source creates stop tokens, std::stop_token is used to check for stop requests",
        "They are the same",
        "std::stop_token is for thread creation, std::stop_source for thread termination",
        "std::stop_source is a deprecated feature"
      ],
      answer: 0,
      explanation: "std::stop_source is used to request that an operation stops, while std::stop_token is used by the operation to check if a stop has been requested. Multiple stop_tokens can be created from a single stop_source, allowing coordinated cancellation of multiple operations."
    },
    {
      question: "What is the purpose of the 'std::format_to' function in C++20?",
      options: [
        "To write formatted output to an output iterator",
        "To convert between string formats",
        "To format numbers with locale settings",
        "To create a formatted string view"
      ],
      answer: 0,
      explanation: "std::format_to writes formatted output to an output iterator, similar to how std::format returns a formatted string. This is more efficient than format when you want to write directly to a container or output iterator without creating an intermediate string."
    },
    {
      question: "What is the difference between 'std::ranges::views' and traditional STL algorithms in C++20?",
      options: [
        "Ranges provide a more composable and readable way to express operations on sequences",
        "Traditional algorithms are more efficient than ranges",
        "Ranges can only work with containers, not arrays",
        "There is no difference"
      ],
      answer: 0,
      explanation: "The Ranges library in C++20 provides a more modern, composable way to work with sequences of elements. It allows chaining operations (like filter, transform) in a more readable way and works with any range, not just containers. It's built on top of concepts and provides better compile-time checking."
    },
    {
      question: "What is the purpose of the 'std::bit_cast' function in C++20?",
      options: [
        "To reinterpret the bit pattern of an object as another type",
        "To perform bitwise operations",
        "To convert between numeric types",
        "To check the size of a type in bits"
      ],
      answer: 0,
      explanation: "std::bit_cast is a type-safe way to reinterpret the bit pattern of an object as another type. It's similar to a reinterpret_cast but is constexpr-friendly and doesn't violate strict aliasing rules, making it safer than a C-style cast or memcpy for type punning."
    },
    {
      question: "What is the difference between 'std::coroutine_handle' and 'std::coroutine_traits' in C++20?",
      options: [
        "coroutine_handle represents a coroutine and allows resuming it, coroutine_traits defines coroutine behavior",
        "They are the same",
        "coroutine_traits is for creating coroutines, coroutine_handle is for destroying them",
        "coroutine_handle is deprecated in favor of coroutine_traits"
      ],
      answer: 0,
      explanation: "std::coroutine_handle is a type-erased handle to a suspended or executing coroutine that can be used to resume or destroy it. std::coroutine_traits is a traits class used to determine the promise type and other properties of a coroutine from its parameters and return type."
    },
    {
      question: "What is the purpose of the 'std::osyncstream' in C++20?",
      options: [
        "To synchronize output to a stream from multiple threads",
        "To write binary data to a file",
        "To optimize stream operations",
        "To handle operating system signals"
      ],
      answer: 0,
      explanation: "std::osyncstream provides a thread-safe way to write to a stream from multiple threads without interleaving characters. It buffers the output from each thread and writes it to the underlying stream as a single, unbroken sequence, preventing data races on the stream."
    },
    {
      question: "What is the difference between 'std::format' and 'std::print' in C++23?",
      options: [
        "std::format returns a string, std::print writes directly to a stream",
        "They are the same",
        "std::print is for binary data, std::format for text",
        "std::format is deprecated in C++23"
      ],
      answer: 0,
      explanation: "std::format formats its arguments according to a format string and returns the result as a string, while std::print (C++23) formats its arguments and writes the result directly to a stream (by default, standard output). Both use the same formatting language."
    },
    {
      question: "What is the purpose of the 'std::stacktrace' class in C++23?",
      options: [
        "To capture and inspect the current call stack",
        "To implement stack-based data structures",
        "To track memory allocations",
        "To debug template instantiations"
      ],
      answer: 0,
      explanation: "std::stacktrace (C++23) provides a way to capture and inspect the current call stack. It's useful for debugging, error reporting, and logging, allowing programs to generate human-readable stack traces that show the sequence of function calls that led to a particular point in the program."
    },
    {
      question: "What is the difference between 'std::hive' and 'std::vector' in C++23?",
      options: [
        "std::hive is a node-based container with stable references, std::vector uses contiguous storage",
        "They are the same",
        "std::vector is more efficient for small objects",
        "std::hive is a deprecated container"
      ],
      answer: 0,
      explanation: "std::hive (C++23) is a node-based container that provides stable references and pointers to elements even when the container is modified, making it suitable for scenarios where element addresses must remain valid. std::vector uses contiguous storage and may reallocate when growing, invalidating references."
    },
    {
      question: "What is the purpose of the 'std::mdarray' class in C++23?",
      options: [
        "To represent a multidimensional array with customizable layout and access patterns",
        "To store metadata about arrays",
        "To implement matrix operations",
        "To manage memory for arrays"
      ],
      answer: 0,
      explanation: "std::mdarray (C++23) is a multidimensional array container that provides flexible layout mapping and access patterns. It's designed for numerical computing and scientific applications, offering better control over memory layout and access patterns than nested std::vector or built-in arrays."
    }
  ]
};

// Generate sample questions for each language
function generateQuestions(language: string, count: number): Question[] {
  const questions: Question[] = [];
  const languageQuestions = programmingQuestions[language] || [];
  
  // Add existing questions if any
  questions.push(...languageQuestions);
  
  // Language-specific questions
  const languageQuestionsMap: Record<string, Question[]> = {
    java: [
      {
        question: "What is the difference between an interface and an abstract class in Java?",
        options: [
          "Interfaces can't have method implementations, abstract classes can",
          "A class can implement multiple interfaces but only one abstract class",
          "All methods in an interface are public by default",
          "All of the above"
        ],
        answer: 3,
        explanation: "In Java, interfaces can't have method implementations (before Java 8), a class can implement multiple interfaces but only extend one abstract class, and all interface methods are public by default."
      },
      {
        question: "What is the purpose of the 'static' keyword in Java?",
        options: [
          "To create class-level variables and methods",
          "To prevent method overriding",
          "To make a class immutable",
          "To handle exceptions"
        ],
        answer: 0,
        explanation: "The 'static' keyword in Java is used to create class-level variables and methods that belong to the class itself rather than to any specific instance of the class."
      },
      // JavaScript Event Loop
      {
        question: "What is the difference between microtasks and macrotasks in the JavaScript event loop?",
        options: [
          "Microtasks have higher priority and run after the current task, macrotasks run in the next event loop tick",
          "Microtasks are for small operations, macrotasks for large operations",
          "Microtasks run in the main thread, macrotasks in web workers",
          "There is no difference"
        ],
        answer: 0,
        explanation: "In the JavaScript event loop, microtasks (like Promise callbacks and MutationObserver callbacks) have higher priority than macrotasks (like setTimeout, setInterval, and I/O operations). After the current macrotask completes, the engine executes all microtasks before running the next macrotask, which can lead to potential starvation if microtasks keep adding more microtasks."
      },
      // JavaScript Prototypes
      {
        question: "What is the prototype chain in JavaScript?",
        options: [
          "The mechanism by which objects inherit features from one another",
          "A way to chain multiple methods together",
          "A deprecated feature replaced by classes",
          "A type of array"
        ],
        answer: 0,
        explanation: "The prototype chain is how JavaScript implements inheritance. When you try to access a property or method on an object, JavaScript first looks for it on the object itself. If not found, it looks at the object's prototype (__proto__), then the prototype's prototype, and so on up the chain until it finds the property or reaches the end of the chain (where the prototype is null)."
      },
      // JavaScript ES6+ Features
      {
        question: "What are JavaScript generators and the yield keyword?",
        options: [
          "Functions that can be paused and resumed, with yield pausing execution",
          "A way to generate random numbers",
          "A type of loop construct",
          "A deprecated feature"
        ],
        answer: 0,
        explanation: "Generator functions (defined with function*) can be paused and resumed using the yield keyword. When called, they return a generator object that can be used to control execution. Each call to next() resumes execution until the next yield or return. This is useful for implementing iterators and handling asynchronous operations in a synchronous-looking way."
      },
      // JavaScript Error Handling
      {
        question: "What is the difference between throw Error and throw new Error() in JavaScript?",
        options: [
          "No practical difference, both create and throw an Error object",
          "throw Error is synchronous, throw new Error() is asynchronous",
          "throw Error is for custom errors, throw new Error() for built-in errors",
          "throw Error is deprecated"
        ],
        answer: 0,
        explanation: "There is no practical difference between throw Error('message') and throw new Error('message') - both create and throw a new Error object with the specified message. The new keyword is optional when calling built-in constructors like Error, but it's a common convention to include it for clarity."
      },
      // JavaScript ES2020 Features
      {
        question: "What is the optional chaining operator (?.) in JavaScript?",
        options: [
          "A way to safely access nested object properties without checking each level",
          "A ternary operator alternative",
          "A way to chain multiple conditions",
          "A type of loop"
        ],
        answer: 0,
        explanation: "The optional chaining operator (?.) allows you to read the value of a property located deep within a chain of connected objects without having to check that each reference in the chain is valid."
      }
    ]
  };

  // Add language-specific questions if they exist
  const additionalQuestions = languageQuestionsMap[language] || [];
  questions.push(...additionalQuestions);
  
  // Generate additional sample questions if needed
  const remainingCount = Math.max(0, count - questions.length);
  for (let i = 0; i < remainingCount; i++) {
    const questionNumber = questions.length + i + 1;
    questions.push({
      question: `${language.charAt(0).toUpperCase() + language.slice(1)} Question ${questionNumber}`,
      options: [
        `Option A for question ${questionNumber}`,
        `Option B for question ${questionNumber}`,
        `Option C for question ${questionNumber}`,
        `Option D for question ${questionNumber}`
      ],
      answer: Math.floor(Math.random() * 4),
      explanation: `This is a sample explanation for ${language} question ${questionNumber}.`
    });
  }
  
  return questions;
}

type Language = {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
  textColor: string;
};

const ProgrammingMCQs = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Record<string, Question[]>>({});
  const [visibleCount, setVisibleCount] = useState(10);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const [showScroll, setShowScroll] = useState(false);

  const languages: Language[] = [
    { id: 'java', name: 'Java', icon: 'J', bgColor: 'bg-red-50', textColor: 'text-red-600' },
    { id: 'javascript', name: 'JavaScript', icon: 'JS', bgColor: 'bg-yellow-50', textColor: 'text-yellow-600' },
    { id: 'python', name: 'Python', icon: 'Py', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
    { id: 'c', name: 'C', icon: 'C', bgColor: 'bg-gray-100', textColor: 'text-gray-700' },
    { id: 'cpp', name: 'C++', icon: 'C++', bgColor: 'bg-blue-50', textColor: 'text-blue-700' },
    { id: 'react', name: 'React', icon: '⚛️', bgColor: 'bg-cyan-50', textColor: 'text-cyan-600' },
    { id: 'node', name: 'Node.js', icon: 'N', bgColor: 'bg-green-50', textColor: 'text-green-600' },
    { id: 'html-css', name: 'HTML/CSS', icon: '🌐', bgColor: 'bg-orange-50', textColor: 'text-orange-600' }
  ];

  useEffect(() => {
    const allQuestions: Record<string, Question[]> = {};
    languages.forEach(lang => {
      const questions = programmingQuestions[lang.id] || [];
      const additionalQuestions: Question[] = [];
      const remaining = 80 - questions.length;
      
      for (let i = 0; i < remaining; i++) {
        additionalQuestions.push({
          question: `${lang.name} Question ${questions.length + i + 1}`,
          options: [
            `Option A for question ${questions.length + i + 1}`,
            `Option B for question ${questions.length + i + 1}`,
            `Option C for question ${questions.length + i + 1}`,
            `Option D for question ${questions.length + i + 1}`
          ],
          answer: Math.floor(Math.random() * 4),
          explanation: `This is a sample explanation for ${lang.name} question ${questions.length + i + 1}.`
        });
      }
      
      allQuestions[lang.id] = [...questions, ...additionalQuestions];
    });
    
    setQuestions(allQuestions);
    
    const checkScroll = () => {
      setShowScroll(window.pageYOffset > 400);
    };
    
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const toggleQuestion = (index: number) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const loadMoreQuestions = () => {
    setVisibleCount(prev => Math.min(prev + 10, 80));
  };

  const currentLanguage = languages.find((lang: Language) => lang.id === selectedLanguage);
  const currentQuestions = selectedLanguage ? (questions[selectedLanguage] || []).slice(0, visibleCount) : [];
  const hasMoreQuestions = selectedLanguage && questions[selectedLanguage]?.length > visibleCount;
  
  useEffect(() => {
    if (selectedLanguage) {
      console.log('Current Questions:', currentQuestions);
      console.log('All Questions:', questions[selectedLanguage]);
    }
  }, [selectedLanguage, currentQuestions, questions]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton />
        <div className="max-w-7xl mx-auto">
          {selectedLanguage ? (
            <div>
              <button
                onClick={() => setSelectedLanguage(null)}
                className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Languages
              </button>
              <h1 className="text-3xl font-bold text-gray-900">{currentLanguage?.name} Interview Questions</h1>
              <p className="mt-2 text-gray-600">Commonly asked questions in {currentLanguage?.name} interviews</p>
            
              <div className="space-y-4 mt-6">
                {currentQuestions.map((q, index) => {
                  const questionNumber = questions[selectedLanguage]?.indexOf(q) + 1 || index + 1;
                  return (
                    <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
                      <button
                        className="w-full text-left p-6 focus:outline-none"
                        onClick={() => toggleQuestion(index)}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-gray-900">
                            {questionNumber}. {q.question || `Question ${questionNumber}`}
                          </h3>
                          <svg
                            className={`w-5 h-5 text-gray-500 transform transition-transform ${
                              expandedQuestion === index ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </button>
                      {expandedQuestion === index && q.options && (
                        <div className="px-6 pb-6 pt-2">
                          <div className="space-y-3">
                            {q.options.map((option, optIndex) => {
                              const isCorrect = q.answer === optIndex;
                              return (
                                <div 
                                  key={optIndex}
                                  className={`p-4 rounded-md ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}
                                >
                                  <div className="flex items-start">
                                    <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center mr-3 font-medium ${
                                      isCorrect ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
                                    }`}>
                                      {String.fromCharCode(65 + optIndex)}
                                    </div>
                                    <div className="text-gray-700">
                                      <div className="font-medium">{option}</div>
                                      {isCorrect && (
                                        <div className="mt-1 text-sm text-green-600 font-medium">✓ Correct Answer</div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                            {q.explanation && (
                              <div className="mt-4 p-4 bg-blue-50 rounded-md border-l-4 border-blue-400">
                                <h4 className="font-medium text-blue-800 mb-2">Explanation:</h4>
                                <p className="text-blue-700 leading-relaxed">{q.explanation}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {hasMoreQuestions && visibleCount < questions[selectedLanguage]?.length && (
                <div className="text-center mt-8">
                  <button
                    onClick={loadMoreQuestions}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                  >
                    Load More Questions ({questions[selectedLanguage].length - visibleCount} remaining)
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                  Programming MCQs
                </h1>
                <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
                  Practice common interview questions for different programming languages
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {languages.map((language) => (
                  <div 
                    key={language.id}
                    onClick={() => setSelectedLanguage(language.id)}
                    className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1"
                  >
                    <div className="p-6">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full ${language.bgColor} ${language.textColor} text-2xl font-bold`}>
                          {language.icon}
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">{language.name}</h3>
                          <p className="text-sm text-gray-500">80+ questions available</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {showScroll && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors focus:outline-none"
              aria-label="Scroll to top"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgrammingMCQs;