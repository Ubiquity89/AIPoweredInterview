import React, { useState, useEffect } from 'react';
import BackButton from '../../components/common/BackButton';

const CSFundamentals = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showExplanation, setShowExplanation] = useState(null);
  const [visibleQuestions, setVisibleQuestions] = useState({});
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScroll(window.pageYOffset > 400);
    };

    // Check on initial load
    checkScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', checkScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const toggleExplanation = (categoryId, questionIndex) => {
    const key = `${categoryId}-${questionIndex}`;
    setShowExplanation(showExplanation === key ? null : key);
  };

  const loadMoreQuestions = (categoryId) => {
    setVisibleQuestions(prev => ({
      ...prev,
      [categoryId]: (prev[categoryId] || 20) + 20
    }));
  };

  const categories = [
    {
      id: 'dsa',
      title: 'Data Structures & Algorithms',
      description: 'Practice DSA concepts including arrays, trees, graphs, and algorithms',
      questions: [
        {
          question: "What is the time complexity of binary search?",
          options: ["O(log n)", "O(n)", "O(n log n)", "O(1)"],
          answer: 0,
          explanation: "Binary search has a time complexity of O(log n) as it divides the search interval in half each time."
        },
        {
          question: "Which data structure uses LIFO (Last In First Out) principle?",
          options: ["Stack", "Queue", "Linked List", "Tree"],
          answer: 0,
          explanation: "Stack follows LIFO where the last element added is the first one to be removed."
        },
        {
          question: "What is the time complexity of accessing an element in an array by index?",
          options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
          answer: 0,
          explanation: "Arrays provide O(1) time complexity for access operations as they use index-based addressing."
        },
        {
          question: "Which sorting algorithm has the best average time complexity?",
          options: ["Merge Sort", "Bubble Sort", "Quick Sort", "Insertion Sort"],
          answer: 2,
          explanation: "Quick Sort has an average time complexity of O(n log n), which is the best among comparison-based sorting algorithms."
        },
        {
          question: "What is the time complexity of inserting an element at the beginning of a linked list?",
          options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
          answer: 0,
          explanation: "Inserting at the beginning of a linked list is O(1) as it only requires updating the head pointer."
        },
        {
          question: "Which data structure is used for implementing recursion?",
          options: ["Stack", "Queue", "Tree", "Graph"],
          answer: 0,
          explanation: "The system stack is used for function calls in recursion, storing local variables and return addresses."
        },
        {
          question: "What is the time complexity of BFS (Breadth-First Search) on a graph with V vertices and E edges?",
          options: ["O(V + E)", "O(V * E)", "O(V²)", "O(E log V)"],
          answer: 0,
          explanation: "BFS visits each vertex and edge exactly once, resulting in O(V + E) time complexity."
        },
        {
          question: "Which data structure is best for implementing a priority queue?",
          options: ["Heap", "Array", "Linked List", "Stack"],
          answer: 0,
          explanation: "Binary Heap provides O(log n) time complexity for insert and extract-min operations, making it ideal for priority queues."
        },
        {
          question: "What is the time complexity of Dijkstra's algorithm using a binary heap?",
          options: ["O((V + E) log V)", "O(V²)", "O(V log V + E)", "O(V + E)"],
          answer: 0,
          explanation: "Using a binary heap, each operation takes O(log V) time, and we perform V extract-min and E decrease-key operations."
        },
        {
          question: "Which of the following is not a stable sorting algorithm?",
          options: ["Quick Sort", "Merge Sort", "Bubble Sort", "Insertion Sort"],
          answer: 0,
          explanation: "Quick Sort is not stable as it may change the relative order of equal elements during partitioning."
        },
        {
          question: "What is the space complexity of the recursive implementation of Fibonacci series?",
          options: ["O(n)", "O(1)", "O(2ⁿ)", "O(log n)"],
          answer: 0,
          explanation: "The space complexity is O(n) due to the maximum depth of the recursion stack."
        },
        {
          question: "Which data structure is used for implementing a LRU Cache?",
          options: ["Hash Map + Doubly Linked List", "Array", "Binary Search Tree", "Stack"],
          answer: 0,
          explanation: "A combination of Hash Map (for O(1) access) and Doubly Linked List (for maintaining order) is used for LRU Cache."
        },
        {
          question: "What is the time complexity of finding the maximum element in a binary search tree?",
          options: ["O(h)", "O(1)", "O(n)", "O(log n)"],
          answer: 0,
          explanation: "In the worst case, we might need to traverse from root to the deepest leaf node, where h is the height of the tree."
        },
        {
          question: "Which of the following is not a divide and conquer algorithm?",
          options: ["Bubble Sort", "Merge Sort", "Quick Sort", "Binary Search"],
          answer: 0,
          explanation: "Bubble Sort is a simple comparison-based sorting algorithm and doesn't follow the divide and conquer paradigm."
        },
        {
          question: "What is the time complexity of the KMP string matching algorithm?",
          options: ["O(n + m)", "O(n * m)", "O(n log m)", "O(n²)"],
          answer: 0,
          explanation: "The Knuth-Morris-Pratt algorithm has a time complexity of O(n + m) where n is the length of the text and m is the length of the pattern."
        },
        {
          question: "Which data structure is used for implementing a dictionary?",
          options: ["Hash Table", "Array", "Stack", "Queue"],
          answer: 0,
          explanation: "Hash Tables provide O(1) average case time complexity for search, insert, and delete operations, making them ideal for dictionary implementations."
        },
        {
          question: "What is the time complexity of the Floyd-Warshall algorithm?",
          options: ["O(V³)", "O(V²)", "O(V log V)", "O(V⁴)"],
          answer: 0,
          explanation: "The Floyd-Warshall algorithm finds shortest paths between all pairs of vertices in a weighted graph using three nested loops, resulting in O(V³) time complexity."
        },
        {
          question: "Which of the following is an example of a greedy algorithm?",
          options: ["Dijkstra's Algorithm", "Merge Sort", "Quick Sort", "Binary Search"],
          answer: 0,
          explanation: "Dijkstra's algorithm is greedy as it always picks the vertex with the minimum distance from the source."
        },
        {
          question: "What is the time complexity of the Sieve of Eratosthenes for finding prime numbers up to n?",
          options: ["O(n log log n)", "O(n)", "O(n²)", "O(log n)"],
          answer: 0,
          explanation: "The Sieve of Eratosthenes has a time complexity of O(n log log n) for finding all prime numbers up to n."
        },
        {
          question: "Which data structure is used for implementing a call stack?",
          options: ["Stack", "Queue", "Heap", "Tree"],
          answer: 0,
          explanation: "A stack is used to implement the call stack, which keeps track of function calls and their local variables."
        },
        {
          question: "What is the time complexity of the Bellman-Ford algorithm?",
          options: ["O(VE)", "O(V + E)", "O(V log V)", "O(E log V)"],
          answer: 0,
          explanation: "The Bellman-Ford algorithm has a time complexity of O(VE) where V is the number of vertices and E is the number of edges."
        },
        {
          question: "Which of the following is not a comparison-based sorting algorithm?",
          options: ["Counting Sort", "Merge Sort", "Quick Sort", "Heap Sort"],
          answer: 0,
          explanation: "Counting Sort is not a comparison-based sorting algorithm; it works by counting the number of objects having distinct key values."
        },
        {
          question: "What is the time complexity of finding the median in a sorted array?",
          options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
          answer: 0,
          explanation: "In a sorted array, the median can be found in constant time by accessing the middle element(s)."
        },
        {
          question: "Which data structure is used for implementing a breadth-first search?",
          options: ["Queue", "Stack", "Heap", "Hash Table"],
          answer: 0,
          explanation: "BFS uses a queue to keep track of the next vertex to visit, ensuring that vertices are explored level by level."
        },
        {
          question: "What is the time complexity of the Rabin-Karp string matching algorithm in the average case?",
          options: ["O(n + m)", "O(n * m)", "O(n log m)", "O(n²)"],
          answer: 0,
          explanation: "The Rabin-Karp algorithm has an average-case time complexity of O(n + m) where n is the length of the text and m is the length of the pattern."
        },
        {
          question: "Which of the following is an example of a dynamic programming problem?",
          options: ["0/1 Knapsack", "Merge Sort", "Binary Search", "Quick Sort"],
          answer: 0,
          explanation: "The 0/1 Knapsack problem is a classic dynamic programming problem where we make decisions at each step based on previous computations."
        },
        {
          question: "What is the time complexity of the Kruskal's algorithm using Union-Find with path compression?",
          options: ["O(E log V)", "O(V²)", "O(E log E)", "O(V log E)"],
          answer: 0,
          explanation: "Kruskal's algorithm with Union-Find and path compression has a time complexity of O(E log V) where E is the number of edges and V is the number of vertices."
        },
        {
          question: "Which data structure is used for implementing a depth-first search?",
          options: ["Stack", "Queue", "Heap", "Hash Table"],
          answer: 0,
          explanation: "DFS uses a stack (either explicitly or implicitly through recursion) to keep track of the next vertex to visit."
        },
        {
          question: "What is the time complexity of the Floyd's cycle detection algorithm?",
          options: ["O(n)", "O(n²)", "O(log n)", "O(n log n)"],
          answer: 0,
          explanation: "Floyd's cycle detection algorithm (Tortoise and Hare) has a linear time complexity of O(n) where n is the number of nodes in the linked list."
        },
        {
          question: "Which of the following is not a hashing technique?",
          options: ["Bubble Sort", "Linear Probing", "Chaining", "Double Hashing"],
          answer: 0,
          explanation: "Bubble Sort is a comparison-based sorting algorithm and not a hashing technique."
        },
        {
          question: "What is the time complexity of the topological sort using DFS?",
          options: ["O(V + E)", "O(V * E)", "O(V²)", "O(E log V)"],
          answer: 0,
          explanation: "Topological sort using DFS has a time complexity of O(V + E) where V is the number of vertices and E is the number of edges in the graph."
        },
        {
          question: "What is the time complexity of the Prim's algorithm using a binary heap?",
          options: ["O(E log V)", "O(V²)", "O(E + V log V)", "O(V log E)"],
          answer: 0,
          explanation: "Prim's algorithm using a binary heap has a time complexity of O(E log V) where E is the number of edges and V is the number of vertices."
        },
        {
          question: "Which of the following is not a property of a binary search tree (BST)?",
          options: ["All leaves are at the same level", "Left subtree contains only nodes with keys less than the node's key", "Right subtree contains only nodes with keys greater than the node's key", "Each node has at most two children"],
          answer: 0,
          explanation: "In a BST, leaves are not required to be at the same level. The other options are fundamental properties of BSTs."
        },
        {
          question: "What is the maximum number of nodes in a binary tree of height h?",
          options: ["2^(h+1) - 1", "2^h - 1", "2^h", "h^2"],
          answer: 1,
          explanation: "A binary tree of height h can have at most 2^h - 1 nodes. This occurs when the tree is a perfect binary tree."
        },
        {
          question: "Which of the following operations is not O(1) in a hash table with a good hash function?",
          options: ["Finding the minimum element", "Insertion", "Deletion", "Search"],
          answer: 0,
          explanation: "Finding the minimum element in a hash table is O(n) as it requires checking all elements. Other operations are O(1) on average with a good hash function."
        },
        {
          question: "What is the time complexity of the selection sort algorithm?",
          options: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"],
          answer: 0,
          explanation: "Selection sort has a time complexity of O(n²) in all cases (best, average, worst) as it always makes the same number of comparisons."
        },
        {
          question: "Which data structure is used for implementing a browser's back and forward buttons?",
          options: ["Two stacks", "Queue", "Tree", "Graph"],
          answer: 0,
          explanation: "Browsers typically use two stacks to implement back and forward navigation, one for the back history and one for the forward history."
        },
        {
          question: "What is the time complexity of the Floyd's cycle detection algorithm?",
          options: ["O(n)", "O(n²)", "O(log n)", "O(n log n)"],
          answer: 0,
          explanation: "Floyd's cycle detection algorithm (Tortoise and Hare) has a linear time complexity of O(n) where n is the number of nodes in the linked list."
        },
        {
          question: "Which of the following is not a self-balancing binary search tree?",
          options: ["Binary Search Tree", "AVL Tree", "Red-Black Tree", "Splay Tree"],
          answer: 0,
          explanation: "A regular Binary Search Tree is not self-balancing. The other options (AVL, Red-Black, Splay) are all self-balancing BST variants."
        },
        {
          question: "What is the time complexity of the merge operation in a binary heap?",
          options: ["O(log n)", "O(1)", "O(n)", "O(n log n)"],
          answer: 2,
          explanation: "The merge operation in a binary heap has a time complexity of O(n) as it requires combining all elements from both heaps."
        },
        {
          question: "Which of the following is not a collision resolution technique in hashing?",
          options: ["Bubble Sort", "Chaining", "Open Addressing", "Double Hashing"],
          answer: 0,
          explanation: "Bubble Sort is a sorting algorithm, not a collision resolution technique. The other options are valid collision resolution methods."
        },
        {
          question: "What is the time complexity of the heapify operation?",
          options: ["O(log n)", "O(n)", "O(1)", "O(n log n)"],
          answer: 1,
          explanation: "The heapify operation has a time complexity of O(n) where n is the number of elements in the heap."
        },
        {
          question: "Which of the following is not a stable sorting algorithm?",
          options: ["Heap Sort", "Merge Sort", "Bubble Sort", "Insertion Sort"],
          answer: 0,
          explanation: "Heap Sort is not a stable sorting algorithm as it may change the relative order of equal elements during the heapify process."
        },
        {
          question: "What is the time complexity of the pre-order traversal of a binary tree?",
          options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
          answer: 0,
          explanation: "The time complexity of any tree traversal (pre-order, in-order, post-order) is O(n) where n is the number of nodes, as each node is visited exactly once."
        },
        {
          question: "Which of the following is not a hashing function?",
          options: ["Bubble Hash", "Division Method", "Multiplication Method", "Universal Hashing"],
          answer: 0,
          explanation: "Bubble Hash is not a valid hashing function. The other options are well-known hashing techniques."
        },
        {
          question: "What is the time complexity of the BFS algorithm on a tree?",
          options: ["O(V + E)", "O(V * E)", "O(V²)", "O(E log V)"],
          answer: 0,
          explanation: "BFS on a tree has a time complexity of O(V + E) where V is the number of vertices and E is the number of edges."
        },
        {
          question: "Which of the following is not a type of binary tree?",
          options: ["Circular Binary Tree", "Complete Binary Tree", "Perfect Binary Tree", "Balanced Binary Tree"],
          answer: 0,
          explanation: "There is no standard 'Circular Binary Tree' type. The other options are valid types of binary trees."
        },
        {
          question: "What is the time complexity of the insertion operation in a hash table with chaining?",
          options: ["O(1) average, O(n) worst case", "O(log n)", "O(n)", "O(n log n)"],
          answer: 0,
          explanation: "In a hash table with chaining, insertion is O(1) on average, but can degrade to O(n) in the worst case if many elements hash to the same bucket."
        },
        {
          question: "Which of the following is not a property of a B-tree?",
          options: ["All leaves are at different levels", "All leaves are at the same level", "A node can have more than two children", "Data is stored in sorted order"],
          answer: 0,
          explanation: "In a B-tree, all leaves must be at the same level, which is one of its key properties."
        },
        {
          question: "What is the time complexity of the deletion operation in a binary search tree?",
          options: ["O(h)", "O(1)", "O(n)", "O(log n)"],
          answer: 0,
          explanation: "The time complexity of deletion in a BST is O(h) where h is the height of the tree. In the worst case, it can be O(n) for a skewed tree."
        },
        {
          question: "Which of the following is not a graph traversal algorithm?",
          options: ["Bubble Sort", "Depth-First Search", "Breadth-First Search", "Dijkstra's Algorithm"],
          answer: 0,
          explanation: "Bubble Sort is a sorting algorithm, not a graph traversal algorithm. The other options are all methods for traversing or searching graphs."
        },
        {
          question: "What is the time complexity of the counting sort algorithm?",
          options: ["O(n + k)", "O(n log n)", "O(n²)", "O(k)"],
          answer: 0,
          explanation: "Counting sort has a time complexity of O(n + k) where n is the number of elements and k is the range of input."
        },
        {
          question: "Which of the following is not a type of linked list?",
          options: ["Binary Linked List", "Singly Linked List", "Doubly Linked List", "Circular Linked List"],
          answer: 0,
          explanation: "There is no standard 'Binary Linked List' type. The other options are valid types of linked lists."
        },
        {
          question: "What is the time complexity of the radix sort algorithm?",
          options: ["O(d*(n + k))", "O(n log n)", "O(n²)", "O(nk)"],
          answer: 0,
          explanation: "Radix sort has a time complexity of O(d*(n + k)) where n is the number of elements, k is the range of input, and d is the number of digits in the maximum number."
        },
        {
          question: "Which of the following is not a type of hashing?",
          options: ["Linear Hashing", "Quadratic Hashing", "Cubic Hashing", "Double Hashing"],
          answer: 2,
          explanation: "There is no standard 'Cubic Hashing' technique. The other options are valid hashing techniques."
        },
        {
          question: "What is the time complexity of the bubble sort algorithm in the best case?",
          options: ["O(n)", "O(n²)", "O(n log n)", "O(1)"],
          answer: 0,
          explanation: "In the best case (when the array is already sorted), bubble sort has a time complexity of O(n) with an optimized implementation that can detect if the array is already sorted."
        },
        {
          question: "Which of the following is not a type of tree traversal?",
          options: ["Level-order", "In-order", "Pre-order", "Side-order"],
          answer: 3,
          explanation: "There is no standard 'Side-order' traversal. The other options are valid tree traversal methods."
        },
        {
          question: "What is the time complexity of the insertion operation in a red-black tree?",
          options: ["O(log n)", "O(1)", "O(n)", "O(n log n)"],
          answer: 0,
          explanation: "Insertion in a red-black tree has a time complexity of O(log n) as the tree remains approximately balanced after each insertion."
        },
        {
          question: "Which of the following is not a type of graph?",
          options: ["Binary Graph", "Directed Graph", "Undirected Graph", "Weighted Graph"],
          answer: 0,
          explanation: "There is no standard 'Binary Graph' type. The other options are valid types of graphs."
        },
        {
          question: "What is the time complexity of the binary search algorithm?",
          options: ["O(log n)", "O(n)", "O(1)", "O(n log n)"],
          answer: 0,
          explanation: "Binary search has a time complexity of O(log n) as it divides the search interval in half each time."
        },
        {
          question: "Which of the following is not a type of queue?",
          options: ["Stack Queue", "Priority Queue", "Circular Queue", "Double-ended Queue"],
          answer: 0,
          explanation: "There is no standard 'Stack Queue' type. The other options are valid types of queues."
        },
        {
          question: "What is the time complexity of the selection sort algorithm in the best case?",
          options: ["O(n²)", "O(n)", "O(n log n)", "O(1)"],
          answer: 0,
          explanation: "Selection sort has a time complexity of O(n²) in all cases (best, average, worst) as it always makes the same number of comparisons."
        },
        {
          question: "Which of the following is not a type of algorithm design paradigm?",
          options: ["Linear Programming", "Divide and Conquer", "Greedy Algorithm", "Dynamic Programming"],
          answer: 0,
          explanation: "Linear Programming is an optimization method, not a general algorithm design paradigm like the other options."
        },
        {
          question: "What is the time complexity of the quicksort algorithm in the worst case?",
          options: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"],
          answer: 0,
          explanation: "Quicksort has a worst-case time complexity of O(n²) when the pivot selection is poor, though this is rare with good pivot selection strategies."
        },
        {
          question: "Which of the following is not a type of sorting algorithm?",
          options: ["Bubble Sort", "Merge Sort", "Quick Sort", "Tree Sort"],
          answer: 3,
          explanation: "All options are valid sorting algorithms. However, Tree Sort is less commonly mentioned compared to the others."
        },
        {
          question: "What is the time complexity of the heap sort algorithm?",
          options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
          answer: 0,
          explanation: "Heap sort has a time complexity of O(n log n) in all cases (best, average, worst)."
        },
        {
          question: "Which of the following is not a type of data structure?",
          options: ["Array", "Linked List", "Graph", "Algorithm"],
          answer: 3,
          explanation: "An algorithm is a procedure or formula for solving a problem, not a data structure."
        },
        {
          question: "What is the time complexity of the insertion sort algorithm in the best case?",
          options: ["O(n)", "O(n²)", "O(log n)", "O(n log n)"],
          answer: 0,
          explanation: "In the best case (when the array is already sorted), insertion sort has a time complexity of O(n)."
        },
        {
          question: "Which of the following is not a type of search algorithm?",
          options: ["Bubble Search", "Binary Search", "Linear Search", "Interpolation Search"],
          answer: 0,
          explanation: "There is no standard 'Bubble Search' algorithm. The other options are valid search algorithms."
        },
        {
          question: "What is the time complexity of finding an element in a hash table with a good hash function?",
          options: ["O(1) average, O(n) worst case", "O(log n)", "O(n)", "O(n log n)"],
          answer: 0,
          explanation: "In a hash table with a good hash function, search has an average time complexity of O(1), but can degrade to O(n) in the worst case."
        },
        {
          question: "Which of the following is not a type of tree?",
          options: ["Binary Tree", "AVL Tree", "Red-Black Tree", "Hash Tree"],
          answer: 3,
          explanation: "There is no standard 'Hash Tree' data structure. The other options are all types of trees."
        },
        {
          question: "What is the time complexity of the merge sort algorithm?",
          options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
          answer: 0,
          explanation: "Merge sort has a time complexity of O(n log n) in all cases (best, average, worst)."
        }
      ]
    },
    {
      id: 'dbms',
      title: 'Database Management System (DBMS)',
      description: 'Practice DBMS concepts including SQL, normalization, and transactions',
      questions: [
        {
          question: "What is the primary key in a database?",
          options: [
            "A field that uniquely identifies a record in a table",
            "A field that can be null", 
            "A field that stores binary data",
            "A field that references another table"
          ],
          answer: 0,
          explanation: "A primary key is a field that uniquely identifies each record in a table. It cannot contain null values and must contain unique values."
        },
        {
          question: "What is the purpose of a foreign key?",
          options: [
            "To ensure data integrity between related tables",
            "To sort records in a table",
            "To encrypt sensitive data",
            "To create backup copies of data"
          ],
          answer: 0,
          explanation: "A foreign key is used to create a relationship between two tables and ensures referential integrity between the data in both tables."
        },
        {
          question: "What is normalization in DBMS?",
          options: [
            "The process of organizing data to minimize redundancy",
            "The process of making database queries run faster",
            "The process of backing up database files",
            "The process of encrypting sensitive data"
          ],
          answer: 0,
          explanation: "Normalization is the process of organizing data in a database to reduce redundancy and improve data integrity by dividing large tables into smaller, related tables."
        },
        {
          question: "What is an index in a database?",
          options: [
            "A data structure that improves the speed of data retrieval",
            "A backup of the database",
            "A type of database constraint",
            "A log of all database transactions"
          ],
          answer: 0,
          explanation: "An index is a data structure that improves the speed of data retrieval operations on a database table at the cost of additional writes and storage space."
        },
        {
          question: "What is ACID in database transactions?",
          options: [
            "Atomicity, Consistency, Isolation, Durability",
            "Access Control in Databases",
            "Automated Consistency and Integrity Database",
            "Advanced Compression and Indexing in Databases"
          ],
          answer: 0,
          explanation: "ACID stands for Atomicity (transactions are all-or-nothing), Consistency (database remains in a consistent state), Isolation (concurrent transactions don't interfere), and Durability (committed transactions persist)."
        },
        {
          question: "What is a stored procedure?",
          options: [
            "A prepared SQL code that you can save and reuse",
            "A backup of database procedures",
            "A type of database index",
            "A method for encrypting data"
          ],
          answer: 0,
          explanation: "A stored procedure is a prepared SQL code that you can save and reuse, allowing you to perform complex operations with a single call."
        },
        {
          question: "What is a view in SQL?",
          options: [
            "A virtual table based on the result set of an SQL statement",
            "A way to visualize database schema",
            "A method for database backup",
            "A type of database constraint"
          ],
          answer: 0,
          explanation: "A view is a virtual table whose contents are defined by a query. It can be used to simplify complex queries, provide security, or present data in a different way."
        },
        {
          question: "What is the difference between DELETE and TRUNCATE?",
          options: [
            "DELETE removes specific rows, TRUNCATE removes all rows",
            "TRUNCATE is faster but cannot be rolled back",
            "DELETE can be used with WHERE clause, TRUNCATE cannot",
            "All of the above"
          ],
          answer: 3,
          explanation: "DELETE removes specific rows (can be used with WHERE), can be rolled back, and is slower. TRUNCATE removes all rows, cannot use WHERE, cannot be rolled back, and is faster."
        },
        {
          question: "What is a deadlock in databases?",
          options: [
            "When two or more transactions are waiting for each other to release locks",
            "When a database crashes",
            "When a query runs indefinitely",
            "When the database runs out of storage"
          ],
          answer: 0,
          explanation: "A deadlock occurs when two or more transactions are waiting for one another to release locks, creating a cycle where none can proceed."
        },
        {
          question: "What is the difference between INNER JOIN and LEFT JOIN?",
          options: [
            "INNER JOIN returns only matching rows, LEFT JOIN returns all rows from left table",
            "LEFT JOIN is faster than INNER JOIN",
            "INNER JOIN can only join two tables",
            "There is no difference"
          ],
          answer: 0,
          explanation: "INNER JOIN returns only the rows where there is a match in both tables, while LEFT JOIN returns all rows from the left table and matching rows from the right table (with NULLs where there's no match)."
        },
        {
          question: "What is a transaction in a database?",
          options: [
            "A single logical unit of work that accesses and updates data",
            "A type of database backup",
            "A method for optimizing queries",
            "A database user account"
          ],
          answer: 0,
          explanation: "A transaction is a sequence of operations performed as a single logical unit of work that must be completed entirely or not at all."
        },
        {
          question: "What is the difference between a clustered and non-clustered index?",
          options: [
            "Clustered index sorts and stores data rows, non-clustered doesn't",
            "Non-clustered is faster than clustered",
            "Clustered index can only be created on primary keys",
            "There is no difference"
          ],
          answer: 0,
          explanation: "A clustered index determines the physical order of data in a table, while a non-clustered index is a separate structure that points to the data."
        },
        {
          question: "What is a composite key?",
          options: [
            "A combination of two or more columns used as a primary key",
            "A key that is used for encryption",
            "A key that is composed of only numbers",
            "A backup of the primary key"
          ],
          answer: 0,
          explanation: "A composite key is a combination of two or more columns in a table that can be used to uniquely identify each row in the table."
        },
        {
          question: "What is denormalization?",
          options: [
            "The process of adding redundant data to improve read performance",
            "The opposite of database normalization",
            "A technique to remove duplicate data",
            "A method for database backup"
          ],
          answer: 0,
          explanation: "Denormalization is the process of adding redundant data to one or more tables to improve read performance at the cost of write performance and data redundancy."
        },
        {
          question: "What is a database trigger?",
          options: [
            "A stored procedure that automatically executes when a specific event occurs",
            "A type of database index",
            "A security feature for user authentication",
            "A method for database backup"
          ],
          answer: 0,
          explanation: "A trigger is a stored procedure that automatically executes in response to certain events on a particular table or view in a database."
        },
        {
          question: "What is a self join?",
          options: [
            "A join of a table to itself",
            "A join that returns all rows from both tables",
            "A type of inner join",
            "A join that creates a Cartesian product"
          ],
          answer: 0,
          explanation: "A self join is a regular join where a table is joined with itself, typically to compare rows within the same table."
        },
        {
          question: "What is the difference between CHAR and VARCHAR data types?",
          options: [
            "CHAR is fixed-length, VARCHAR is variable-length",
            "VARCHAR is faster than CHAR",
            "CHAR can store more characters",
            "There is no difference"
          ],
          answer: 0,
          explanation: "CHAR is a fixed-length data type that always uses the same amount of storage space, while VARCHAR is a variable-length data type that only uses the space needed to store the actual data."
        },
        {
          question: "What is a database constraint?",
          options: [
            "A rule that enforces data integrity in a database",
            "A limitation on database performance",
            "A type of database index",
            "A method for database backup"
          ],
          answer: 0,
          explanation: "A constraint is a rule that enforces data integrity in a database, such as NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, and CHECK constraints."
        },
        {
          question: "What is the difference between a database and a data warehouse?",
          options: [
            "A database is for transaction processing, a data warehouse is for analysis",
            "A data warehouse is a type of database",
            "A database is larger than a data warehouse",
            "There is no difference"
          ],
          answer: 0,
          explanation: "A database is optimized for transaction processing (OLTP), while a data warehouse is optimized for analysis and reporting (OLAP) and typically contains historical data from multiple sources."
        },
        {
          question: "What is a database transaction log?",
          options: [
            "A record of all database transactions for recovery purposes",
            "A type of database index",
            "A backup of the database",
            "A log of all user logins"
          ],
          answer: 0,
          explanation: "A transaction log is a file that records all database modifications, used for recovery and rollback operations."
        },
        {
          question: "What is the difference between UNION and UNION ALL?",
          options: [
            "UNION removes duplicates, UNION ALL does not",
            "UNION ALL is faster than UNION",
            "UNION can only combine two queries",
            "There is no difference"
          ],
          answer: 0,
          explanation: "UNION combines the results of two or more SELECT statements and removes duplicate rows, while UNION ALL combines the results but does not remove duplicates."
        },
        {
          question: "What is a database cursor?",
          options: [
            "A database object used to process individual rows returned by a query",
            "A visual indicator in a database GUI",
            "A type of database index",
            "A method for database backup"
          ],
          answer: 0,
          explanation: "A cursor is a database object used to retrieve, manipulate, and navigate through a result set one row at a time."
        },
        {
          question: "What is the difference between a database and a schema?",
          options: [
            "A database is a collection of schemas, a schema is a collection of database objects",
            "A schema is a type of database",
            "A database is a logical container, a schema is a physical container",
            "There is no difference"
          ],
          answer: 0,
          explanation: "A database is a collection of schemas, and a schema is a collection of database objects (tables, views, procedures, etc.) that form a namespace."
        },
        {
          question: "What is a database index?",
          options: [
            "A data structure that improves the speed of data retrieval",
            "A list of all tables in a database",
            "A type of database backup",
            "A method for encrypting data"
          ],
          answer: 0,
          explanation: "A database index is a data structure that improves the speed of data retrieval operations on a database table at the cost of additional writes and storage space."
        },
        {
          question: "What is a database view used for?",
          options: [
            "To simplify complex queries, provide security, or present data differently",
            "To create a backup of a table",
            "To improve query performance",
            "To store temporary data"
          ],
          answer: 0,
          explanation: "A view is typically used to simplify complex queries, restrict access to specific data, or present data in a different way without changing the underlying tables."
        },
        {
          question: "What is the difference between a primary key and a unique key?",
          options: [
            "A table can have only one primary key but multiple unique keys",
            "A primary key cannot contain NULL values, a unique key can have one NULL",
            "Both a and b",
            "There is no difference"
          ],
          answer: 2,
          explanation: "A table can have only one primary key but multiple unique keys. Also, a primary key cannot contain NULL values, while a unique key can have one NULL value."
        },
        {
          question: "What is a database transaction?",
          options: [
            "A sequence of operations performed as a single logical unit of work",
            "A type of database backup",
            "A method for optimizing queries",
            "A database user account"
          ],
          answer: 0,
          explanation: "A database transaction is a sequence of operations performed as a single logical unit of work that must be completed entirely or not at all."
        },
        {
          question: "What is the difference between a database and a data warehouse?",
          options: [
            "A database is for transaction processing, a data warehouse is for analysis",
            "A data warehouse is a type of database",
            "A database is larger than a data warehouse",
            "There is no difference"
          ],
          answer: 0,
          explanation: "A database is optimized for transaction processing (OLTP), while a data warehouse is optimized for analysis and reporting (OLAP) and typically contains historical data from multiple sources."
        },
        {
          question: "What is a database trigger used for?",
          options: [
            "To automatically execute a set of SQL statements when a specific event occurs",
            "To create a backup of a table",
            "To improve query performance",
            "To store temporary data"
          ],
          answer: 0,
          explanation: "A database trigger is a stored program that automatically executes in response to specific events on a particular table or view in a database."
        },
        {
          question: "What is the difference between a database and a data mart?",
          options: [
            "A data mart is a subset of a data warehouse focused on a specific business line",
            "A data mart is a type of database",
            "A database is larger than a data mart",
            "There is no difference"
          ],
          answer: 0,
          explanation: "A data mart is a subset of a data warehouse that is focused on a specific business line or team, while a database is a general-purpose data storage system."
        }
      ]
    },
    {
      id: 'os',
      title: 'Operating Systems',
      description: 'Practice OS concepts including processes, memory management, and file systems',
      questions: [
        {
          question: "What is virtual memory?",
          options: [
            "Memory that is not physically present in the system",
            "A memory management technique that provides an illusion of a larger main memory",
            "The fastest memory in the computer",
            "Memory used only by the operating system"
          ],
          answer: 1,
          explanation: "Virtual memory is a memory management technique that creates an illusion to users of a very large (main) memory by using the hard disk as secondary storage."
        },
        {
          question: "What is a process in an operating system?",
          options: [
            "A program in execution",
            "A type of computer virus",
            "A hardware component",
            "A user interface element"
          ],
          answer: 0,
          explanation: "A process is an instance of a computer program that is being executed. It contains the program code and its current activity."
        },
        {
          question: "What is the difference between a process and a thread?",
          options: [
            "Processes are independent, threads share the same memory space",
            "Threads are heavier than processes",
            "Processes are faster to create than threads",
            "There is no difference"
          ],
          answer: 0,
          explanation: "Processes are independent execution units with their own memory space, while threads are lightweight processes that share the same memory space within a process."
        },
        {
          question: "What is a deadlock?",
          options: [
            "When two or more processes are waiting for each other to release resources",
            "When a process terminates unexpectedly",
            "When the system runs out of memory",
            "When the CPU is idle"
          ],
          answer: 0,
          explanation: "A deadlock is a situation where a set of processes are blocked because each process is holding a resource and waiting for another resource acquired by some other process."
        },
        {
          question: "What is the purpose of an interrupt?",
          options: [
            "To handle asynchronous events",
            "To increase CPU speed",
            "To allocate memory",
            "To manage files"
          ],
          answer: 0,
          explanation: "An interrupt is a signal to the processor indicating an event that needs immediate attention, allowing the CPU to respond to events as they occur."
        },
        {
          question: "What is paging in memory management?",
          options: [
            "A memory management scheme that eliminates the need for contiguous allocation",
            "A technique to compress memory",
            "A type of cache memory",
            "A method for file storage"
          ],
          answer: 0,
          explanation: "Paging is a memory management scheme that eliminates the need for contiguous allocation of physical memory, allowing a program's memory to be noncontiguous."
        },
        {
          question: "What is a semaphore?",
          options: [
            "A variable used to control access to a common resource",
            "A type of process scheduler",
            "A memory management technique",
            "A file system structure"
          ],
          answer: 0,
          explanation: "A semaphore is a variable or abstract data type used to control access to a common resource by multiple processes in a concurrent system."
        },
        {
          question: "What is the difference between preemptive and non-preemptive scheduling?",
          options: [
            "Preemptive allows a process to be interrupted, non-preemptive doesn't",
            "Non-preemptive is faster than preemptive",
            "Preemptive scheduling is only used in batch systems",
            "There is no difference"
          ],
          answer: 0,
          explanation: "In preemptive scheduling, the CPU can be taken away from a process, while in non-preemptive scheduling, a process keeps the CPU until it terminates or switches to the waiting state."
        },
        {
          question: "What is thrashing in OS?",
          options: [
            "When the system spends more time handling page faults than executing processes",
            "When the CPU is idle",
            "When there are too many processes in memory",
            "When the disk is full"
          ],
          answer: 0,
          explanation: "Thrashing occurs when the system spends more time handling page faults than executing processes, severely degrading system performance."
        },
        {
          question: "What is the purpose of the file system?",
          options: [
            "To organize and store data on storage devices",
            "To manage CPU scheduling",
            "To handle network connections",
            "To allocate memory to processes"
          ],
          answer: 0,
          explanation: "A file system is responsible for organizing and storing data on storage devices, providing methods to store, retrieve and update data."
        },
        {
          question: "What is a race condition?",
          options: [
            "When the system's behavior depends on the sequence of process execution",
            "A type of memory leak",
            "A hardware failure",
            "A type of deadlock"
          ],
          answer: 0,
          explanation: "A race condition occurs when the system's behavior depends on the sequence or timing of uncontrollable events, often leading to unexpected results."
        },
        {
          question: "What is the purpose of the bootloader?",
          options: [
            "To load the operating system into memory",
            "To optimize disk performance",
            "To manage network connections",
            "To allocate CPU resources"
          ],
          answer: 0,
          explanation: "The bootloader is a program that loads the operating system into memory when a computer is turned on."
        },
        {
          question: "What is a system call?",
          options: [
            "A programmatic way for a program to request a service from the OS",
            "A function call within a program",
            "A type of interrupt",
            "A hardware instruction"
          ],
          answer: 0,
          explanation: "A system call is a way for programs to interact with the operating system, requesting services like file operations, process control, and device management."
        },
        {
          question: "What is the difference between monolithic and microkernel architectures?",
          options: [
            "Monolithic kernels have all OS components in kernel space, microkernels have minimal components in kernel space",
            "Microkernels are faster than monolithic kernels",
            "Monolithic kernels are more secure than microkernels",
            "There is no difference"
          ],
          answer: 0,
          explanation: "In a monolithic kernel, all OS services run in kernel space, while in a microkernel, only essential services run in kernel space, with other services running in user space."
        },
        {
          question: "What is a zombie process?",
          options: [
            "A process that has completed execution but still has an entry in the process table",
            "A process that is running in the background",
            "A process that is waiting for user input",
            "A process that has crashed"
          ],
          answer: 0,
          explanation: "A zombie process is a process that has completed execution but still has an entry in the process table to report to its parent process."
        },
        {
          question: "What is context switching?",
          options: [
            "The process of storing the state of a process so that it can be restored and execution resumed",
            "Switching between different user interfaces",
            "Changing the CPU's clock speed",
            "Switching between different programming languages"
          ],
          answer: 0,
          explanation: "Context switching is the process of storing the state of a process or thread so that it can be restored and execution can be resumed from the same point later."
        },
        {
          question: "What is the purpose of the page table?",
          options: [
            "To store the mapping between virtual and physical addresses",
            "To store file metadata",
            "To manage CPU scheduling",
            "To handle interrupts"
          ],
          answer: 0,
          explanation: "A page table is a data structure used by a virtual memory system to store the mapping between virtual addresses and physical addresses."
        },
        {
          question: "What is the difference between logical and physical addresses?",
          options: [
            "Logical addresses are generated by the CPU, physical addresses refer to actual RAM locations",
            "Physical addresses are larger than logical addresses",
            "Logical addresses are used only in virtual memory systems",
            "There is no difference"
          ],
          answer: 0,
          explanation: "Logical (virtual) addresses are generated by the CPU during program execution, while physical addresses refer to actual locations in RAM."
        },
        {
          question: "What is a real-time operating system?",
          options: [
            "An OS designed to process data as it comes in, typically with strict time constraints",
            "An OS that runs on mobile devices",
            "An OS that doesn't use virtual memory",
            "An OS that only runs one application at a time"
          ],
          answer: 0,
          explanation: "A real-time operating system (RTOS) is designed to process data as it comes in, typically with strict time constraints and high reliability requirements."
        },
        {
          question: "What is the purpose of the shell in an operating system?",
          options: [
            "To provide an interface for users to interact with the OS",
            "To manage memory allocation",
            "To handle hardware interrupts",
            "To optimize CPU scheduling"
          ],
          answer: 0,
          explanation: "The shell is a user interface for accessing an operating system's services, allowing users to execute commands and interact with the system."
        },
        {
          question: "What is a distributed operating system?",
          options: [
            "An OS that manages a group of networked computers and makes them appear as a single computer",
            "An OS that runs on multiple CPUs",
            "An OS that uses cloud storage",
            "An OS that supports multiple users"
          ],
          answer: 0,
          explanation: "A distributed operating system manages a group of networked computers and makes them appear as a single computer, providing transparency and resource sharing."
        },
        {
          question: "What is the purpose of the process control block (PCB)?",
          options: [
            "To store information about a process",
            "To control the CPU clock speed",
            "To manage file permissions",
            "To handle network connections"
          ],
          answer: 0,
          explanation: "A Process Control Block (PCB) is a data structure that contains information about a process, including its state, program counter, CPU registers, and memory management information."
        },
        {
          question: "What is the difference between internal and external fragmentation?",
          options: [
            "Internal is wasted space within allocated memory blocks, external is unused memory between blocks",
            "External is worse than internal fragmentation",
            "Internal occurs in virtual memory, external in physical memory",
            "There is no difference"
          ],
          answer: 0,
          explanation: "Internal fragmentation occurs when memory is allocated in fixed-sized blocks and a process doesn't use the entire block. External fragmentation occurs when free memory is divided into small blocks that are not contiguous."
        },
        {
          question: "What is demand paging?",
          options: [
            "A memory management scheme where pages are loaded only when needed",
            "A type of page replacement algorithm",
            "A method for disk scheduling",
            "A technique for process synchronization"
          ],
          answer: 0,
          explanation: "Demand paging is a memory management scheme where pages are loaded into memory only when they are needed, rather than loading the entire program at once."
        },
        {
          question: "What is the purpose of the CPU scheduler?",
          options: [
            "To select which process should be executed next",
            "To manage memory allocation",
            "To handle I/O operations",
            "To manage file systems"
          ],
          answer: 0,
          explanation: "The CPU scheduler selects which process should be executed next and allocates CPU time to processes."
        },
        {
          question: "What is the difference between a trap and an interrupt?",
          options: [
            "A trap is a software-generated interrupt, an interrupt is hardware-generated",
            "A trap is synchronous, an interrupt is asynchronous",
            "Both a and b",
            "There is no difference"
          ],
          answer: 2,
          explanation: "A trap is a software-generated interrupt that is synchronous (caused by an instruction), while an interrupt is typically hardware-generated and asynchronous (can occur at any time)."
        },
        {
          question: "What is the purpose of the working set model?",
          options: [
            "To determine the number of pages a process needs in memory to avoid thrashing",
            "To manage CPU scheduling",
            "To handle file I/O operations",
            "To allocate memory to processes"
          ],
          answer: 0,
          explanation: "The working set model is used to determine the number of pages a process needs in memory to avoid thrashing, based on the principle of locality."
        },
        {
          question: "What is the difference between a process and a program?",
          options: [
            "A program is passive, a process is an active instance of a program in execution",
            "A process is stored on disk, a program is in memory",
            "A program uses more resources than a process",
            "There is no difference"
          ],
          answer: 0,
          explanation: "A program is a passive entity stored on disk, while a process is an active instance of a program in execution, with its own memory space and system resources."
        },
        {
          question: "What is the purpose of the TLB (Translation Lookaside Buffer)?",
          options: [
            "To speed up virtual address translation",
            "To manage disk I/O",
            "To schedule processes",
            "To handle interrupts"
          ],
          answer: 0,
          explanation: "The Translation Lookaside Buffer (TLB) is a memory cache that stores recent translations of virtual memory to physical memory to speed up virtual address translation."
        },
        {
          question: "What is the difference between user mode and kernel mode?",
          options: [
            "Kernel mode has unrestricted access to hardware, user mode has restricted access",
            "User mode is faster than kernel mode",
            "Kernel mode is used only by system administrators",
            "There is no difference"
          ],
          answer: 0,
          explanation: "In kernel mode, the CPU can execute any instruction and access any memory location, while in user mode, the CPU is restricted to non-privileged instructions and memory."
        },
        {
          question: "What is the purpose of the file descriptor table?",
          options: [
            "To keep track of open files and I/O resources for each process",
            "To store file permissions",
            "To manage disk space allocation",
            "To handle network connections"
          ],
          answer: 0,
          explanation: "The file descriptor table is a per-process table that the kernel uses to keep track of open files and I/O resources for that process."
        }
      ]
    },
    {
      id: 'cn',
      title: 'Computer Networks',
      description: 'Practice networking concepts including OSI model, TCP/IP, and protocols',
      questions: [
        {
          question: "What is the purpose of the OSI model?",
          options: [
            "To standardize network communication",
            "To increase internet speed",
            "To replace TCP/IP",
            "To create proprietary networking protocols"
          ],
          answer: 0,
          explanation: "The OSI (Open Systems Interconnection) model provides a standardized framework for network communication between different devices and systems."
        },
        {
          question: "What is the difference between TCP and UDP?",
          options: [
            "TCP is connection-oriented and reliable, UDP is connectionless and unreliable",
            "UDP is faster than TCP",
            "TCP is used for video streaming, UDP is used for file transfers",
            "There is no difference"
          ],
          answer: 0,
          explanation: "TCP (Transmission Control Protocol) is connection-oriented, ensures reliable delivery, and provides error checking. UDP (User Datagram Protocol) is connectionless, has no error recovery, and is faster but less reliable."
        },
        {
          question: "What is an IP address?",
          options: [
            "A unique identifier for a device on a network",
            "A type of computer virus",
            "A programming language",
            "A type of network cable"
          ],
          answer: 0,
          explanation: "An IP (Internet Protocol) address is a unique numerical label assigned to each device connected to a computer network that uses the Internet Protocol for communication."
        },
        {
          question: "What is a subnet mask?",
          options: [
            "A number that separates the network and host portions of an IP address",
            "A security feature that hides IP addresses",
            "A type of network switch",
            "A method for compressing data"
          ],
          answer: 0,
          explanation: "A subnet mask is a 32-bit number that divides an IP address into network and host addresses, identifying which part of an IP address is the network portion and which part is the host portion."
        },
        {
          question: "What is the purpose of DNS?",
          options: [
            "To translate domain names to IP addresses",
            "To provide security for network connections",
            "To connect computers in a local area network",
            "To compress data for faster transmission"
          ],
          answer: 0,
          explanation: "DNS (Domain Name System) translates human-readable domain names (like www.example.com) into numerical IP addresses that computers use to identify each other on the network."
        },
        {
          question: "What is the difference between HTTP and HTTPS?",
          options: [
            "HTTPS is the secure version of HTTP, using SSL/TLS encryption",
            "HTTP is faster than HTTPS",
            "HTTPS is used only for file transfers",
            "There is no difference"
          ],
          answer: 0,
          explanation: "HTTPS (Hypertext Transfer Protocol Secure) is the secure version of HTTP that uses SSL/TLS encryption to protect data in transit between a web server and a browser."
        },
        {
          question: "What is a router?",
          options: [
            "A networking device that forwards data packets between computer networks",
            "A device that connects multiple computers in a local network",
            "A type of network cable",
            "A security device that blocks unauthorized access"
          ],
          answer: 0,
          explanation: "A router is a networking device that forwards data packets between computer networks, typically connecting multiple networks together, such as a home network to the internet."
        },
        {
          question: "What is a firewall?",
          options: [
            "A security system that monitors and controls incoming and outgoing network traffic",
            "A type of computer virus",
            "A hardware component that boosts network speed",
            "A method for compressing data"
          ],
          answer: 0,
          explanation: "A firewall is a network security device that monitors and filters incoming and outgoing network traffic based on an organization's previously established security policies."
        },
        {
          question: "What is the difference between a switch and a hub?",
          options: [
            "A switch is more intelligent and sends data only to the intended recipient, while a hub broadcasts to all devices",
            "A hub is faster than a switch",
            "A switch is used only in wireless networks",
            "There is no difference"
          ],
          answer: 0,
          explanation: "A switch is an intelligent device that learns which devices are connected to which ports and forwards traffic only to the intended recipient, while a hub is a simple device that broadcasts all incoming traffic to all ports."
        },
        {
          question: "What is NAT (Network Address Translation)?",
          options: [
            "A method of remapping one IP address space into another",
            "A type of network cable",
            "A security protocol",
            "A method for compressing data"
          ],
          answer: 0,
          explanation: "NAT (Network Address Translation) is a method of remapping one IP address space into another by modifying network address information in the IP header of packets while they are in transit across a traffic routing device."
        },
        {
          question: "What is a MAC address?",
          options: [
            "A unique identifier assigned to network interfaces for communications on the physical network segment",
            "An Apple computer's serial number",
            "A type of network protocol",
            "A security certificate"
          ],
          answer: 0,
          explanation: "A MAC (Media Access Control) address is a unique identifier assigned to a network interface controller (NIC) for use as a network address in communications within a network segment."
        },
        {
          question: "What is the difference between IPv4 and IPv6?",
          options: [
            "IPv6 has a much larger address space than IPv4",
            "IPv4 is newer than IPv6",
            "IPv6 is less secure than IPv4",
            "There is no difference"
          ],
          answer: 0,
          explanation: "IPv6 was developed to deal with the problem of IPv4 address exhaustion. It uses 128-bit addresses compared to IPv4's 32-bit addresses, providing a vastly larger address space."
        },
        {
          question: "What is a VPN?",
          options: [
            "A secure, encrypted connection over a public network",
            "A type of computer virus",
            "A network switch",
            "A programming language"
          ],
          answer: 0,
          explanation: "A VPN (Virtual Private Network) extends a private network across a public network, enabling users to send and receive data across shared or public networks as if their computing devices were directly connected to the private network."
        },
        {
          question: "What is the purpose of ARP?",
          options: [
            "To map IP addresses to MAC addresses",
            "To route packets between networks",
            "To encrypt network traffic",
            "To compress data"
          ],
          answer: 0,
          explanation: "ARP (Address Resolution Protocol) is used to map an IP address to a physical (MAC) address on a local network."
        },
        {
          question: "What is a proxy server?",
          options: [
            "An intermediary server that forwards requests from clients to other servers",
            "A type of network cable",
            "A security protocol",
            "A method for compressing data"
          ],
          answer: 0,
          explanation: "A proxy server acts as an intermediary between a client and a server, forwarding requests from clients to other servers and returning the server's response back to the client."
        },
        {
          question: "What is the difference between a LAN and a WAN?",
          options: [
            "A LAN covers a small geographic area, while a WAN covers a large geographic area",
            "A WAN is faster than a LAN",
            "A LAN is used only in businesses",
            "There is no difference"
          ],
          answer: 0,
          explanation: "A LAN (Local Area Network) is a network that connects computers and devices in a limited geographical area, while a WAN (Wide Area Network) covers a broad area, often connecting multiple LANs across large distances."
        },
        {
          question: "What is a packet in networking?",
          options: [
            "A small segment of data sent over a network",
            "A type of network cable",
            "A security protocol",
            "A network device"
          ],
          answer: 0,
          explanation: "A packet is a small segment of a larger message that is sent over a network. Each packet contains both data and addressing information needed to route it to its destination."
        },
        {
          question: "What is the purpose of ICMP?",
          options: [
            "To send error messages and operational information about network conditions",
            "To encrypt network traffic",
            "To compress data",
            "To assign IP addresses"
          ],
          answer: 0,
          explanation: "ICMP (Internet Control Message Protocol) is used by network devices to send error messages and operational information indicating success or failure when communicating with another IP address."
        },
        {
          question: "What is a three-way handshake in TCP?",
          options: [
            "A method for establishing a TCP connection",
            "A security protocol",
            "A type of network topology",
            "A method for compressing data"
          ],
          answer: 0,
          explanation: "The three-way handshake is a method used in a TCP/IP network to create a connection between a local host/client and server. It involves three steps: SYN, SYN-ACK, and ACK."
        },
        {
          question: "What is a DDoS attack?",
          options: [
            "An attempt to make a machine or network resource unavailable by overwhelming it with traffic",
            "A type of computer virus",
            "A security protocol",
            "A method for compressing data"
          ],
          answer: 0,
          explanation: "A DDoS (Distributed Denial of Service) attack is a malicious attempt to disrupt normal traffic of a targeted server, service, or network by overwhelming the target or its surrounding infrastructure with a flood of Internet traffic."
        },
        {
          question: "What is the purpose of a default gateway?",
          options: [
            "To provide a way out of a local network to other networks",
            "To provide wireless access",
            "To encrypt network traffic",
            "To assign IP addresses"
          ],
          answer: 0,
          explanation: "A default gateway is a node in a computer network that serves as the forwarding host (router) to other networks when no other route specification matches the destination IP address of a packet."
        },
        {
          question: "What is the difference between a static IP and a dynamic IP?",
          options: [
            "A static IP doesn't change, while a dynamic IP can change",
            "A dynamic IP is more secure than a static IP",
            "A static IP is assigned by DHCP",
            "There is no difference"
          ],
          answer: 0,
          explanation: "A static IP address is a fixed address that is manually assigned to a device and remains constant, while a dynamic IP address is automatically assigned by a DHCP server and can change over time."
        },
        {
          question: "What is the purpose of the TTL field in an IP packet?",
          options: [
            "To limit the lifespan of data in a network",
            "To encrypt the packet",
            "To compress the packet",
            "To identify the packet type"
          ],
          answer: 0,
          explanation: "TTL (Time To Live) is a value in an IP packet that tells a network router whether or not the packet has been in the network too long and should be discarded."
        },
        {
          question: "What is a network topology?",
          options: [
            "The arrangement of different elements in a computer network",
            "A type of network cable",
            "A security protocol",
            "A method for compressing data"
          ],
          answer: 0,
          explanation: "Network topology refers to the arrangement of different elements (links, nodes, etc.) in a computer network, such as bus, star, ring, mesh, etc."
        },
        {
          question: "What is the purpose of the port number in networking?",
          options: [
            "To identify specific processes or services on a device",
            "To identify the device on the network",
            "To encrypt network traffic",
            "To compress data"
          ],
          answer: 0,
          explanation: "A port number is a 16-bit unsigned integer that identifies a specific process or service on a device, allowing multiple services to run on the same device."
        },
        {
          question: "What is a subnet?",
          options: [
            "A logical subdivision of an IP network",
            "A type of network cable",
            "A security protocol",
            "A method for compressing data"
          ],
          answer: 0,
          explanation: "A subnet is a logical subdivision of an IP network, created by borrowing bits from the host portion of an IP address to create a smaller network."
        },
        {
          question: "What is the difference between a public and private IP address?",
          options: [
            "Public IPs are routable on the internet, private IPs are used within private networks",
            "Private IPs are more secure than public IPs",
            "Public IPs are assigned by ISPs, private IPs are assigned by IANA",
            "There is no difference"
          ],
          answer: 0,
          explanation: "Public IP addresses are globally unique and routable on the internet, while private IP addresses are used within private networks and are not directly accessible from the internet."
        },
        {
          question: "What is the purpose of the DHCP protocol?",
          options: [
            "To automatically assign IP addresses to devices on a network",
            "To provide security for network connections",
            "To compress data for faster transmission",
            "To route packets between networks"
          ],
          answer: 0,
          explanation: "DHCP (Dynamic Host Configuration Protocol) is a network management protocol used to automatically assign IP addresses and other network configuration parameters to devices on a network."
        },
        {
          question: "What is a network switch used for?",
          options: [
            "To connect devices within a local area network (LAN)",
            "To connect to the internet",
            "To provide wireless access",
            "To encrypt network traffic"
          ],
          answer: 0,
          explanation: "A network switch is a networking device that connects devices together on a computer network by using packet switching to receive, process, and forward data to the destination device."
        },
        {
          question: "What is the purpose of the traceroute command?",
          options: [
            "To display the route and measure transit delays of packets across an IP network",
            "To test network connectivity",
            "To assign IP addresses",
            "To encrypt network traffic"
          ],
          answer: 0,
          explanation: "Traceroute is a network diagnostic tool used to track in real-time the pathway taken by a packet on an IP network from source to destination, reporting the IP addresses of all the routers it passes through en route."
        }
      ]
    },
    {
      id: 'oops',
      title: 'Object-Oriented Programming',
      description: 'Practice OOP concepts including inheritance, polymorphism, and encapsulation',
      questions: [
        {
          question: "What is encapsulation in OOP?",
          options: [
            "The bundling of data with the methods that operate on that data",
            "The ability to create multiple methods with the same name",
            "The process of one class inheriting from another",
            "A way to create multiple instances of a class"
          ],
          answer: 0,
          explanation: "Encapsulation is an OOP concept that binds together the data and functions that manipulate the data, keeping them safe from outside interference and misuse."
        },
        {
          question: "What is inheritance in OOP?",
          options: [
            "A mechanism where a new class inherits properties and behaviors from an existing class",
            "The ability to hide implementation details",
            "A way to create multiple methods with the same name",
            "A method for memory management"
          ],
          answer: 0,
          explanation: "Inheritance allows a class to inherit properties and behaviors (methods and fields) from another class, promoting code reusability and establishing a relationship between classes."
        },
        {
          question: "What is polymorphism in OOP?",
          options: [
            "The ability of an object to take many forms",
            "The process of hiding implementation details",
            "A way to create private methods",
            "A method for memory allocation"
          ],
          answer: 0,
          explanation: "Polymorphism allows objects of different classes to be treated as objects of a common superclass, typically through method overriding and interfaces."
        },
        {
          question: "What is the difference between method overloading and method overriding?",
          options: [
            "Overloading is same method name with different parameters, overriding is redefining a method in a subclass",
            "Overriding is same method name with different parameters, overloading is redefining a method in a subclass",
            "They are the same concept",
            "Overloading is related to variables, overriding is related to methods"
          ],
          answer: 0,
          explanation: "Method overloading involves multiple methods in the same class with the same name but different parameters, while method overriding involves a subclass providing a specific implementation of a method that is already defined in its superclass."
        },
        {
          question: "What is an abstract class?",
          options: [
            "A class that cannot be instantiated and may contain abstract methods",
            "A class with no methods",
            "A class that can only be instantiated once",
            "A class that contains only static methods"
          ],
          answer: 0,
          explanation: "An abstract class is a class that cannot be instantiated and is typically used as a base class. It may contain abstract methods (methods without implementation) that must be implemented by its subclasses."
        },
        {
          question: "What is an interface in OOP?",
          options: [
            "A reference type that contains only abstract methods and constants",
            "A class that cannot be instantiated",
            "A way to create multiple inheritance",
            "A type of constructor"
          ],
          answer: 0,
          explanation: "An interface is a reference type that can contain only constants, method signatures, default methods, static methods, and nested types. It cannot contain implementation (except for default and static methods)."
        },
        {
          question: "What is the difference between an abstract class and an interface?",
          options: [
            "A class can implement multiple interfaces but extend only one class (abstract or not)",
            "An interface can have constructors, an abstract class cannot",
            "An abstract class can implement multiple interfaces, an interface cannot",
            "There is no difference"
          ],
          answer: 0,
          explanation: "Key differences include: A class can implement multiple interfaces but extend only one class; abstract classes can have both abstract and concrete methods, while interfaces could only have abstract methods (before Java 8); interfaces cannot have constructors; abstract classes can have instance variables, while interfaces can only have constants."
        },
        {
          question: "What is a constructor in OOP?",
          options: [
            "A special method that is called when an object is instantiated",
            "A method that destroys an object",
            "A type of class variable",
            "A way to implement multiple inheritance"
          ],
          answer: 0,
          explanation: "A constructor is a special type of method that is automatically called when an object of a class is created. It typically initializes the object's properties and performs any setup required."
        },
        {
          question: "What is the 'this' keyword used for in OOP?",
          options: [
            "To refer to the current object instance",
            "To create a new instance of a class",
            "To call a static method",
            "To implement inheritance"
          ],
          answer: 0,
          explanation: "The 'this' keyword refers to the current object instance. It can be used to access instance variables, call other constructors, or pass the current object as a parameter."
        },
        {
          question: "What is method overriding?",
          options: [
            "When a subclass provides a specific implementation of a method that is already defined in its superclass",
            "When multiple methods have the same name but different parameters",
            "When a method is declared as final",
            "When a method is declared as static"
          ],
          answer: 0,
          explanation: "Method overriding occurs when a subclass provides a specific implementation of a method that is already defined in its superclass, allowing the subclass to provide its own version of the method."
        },
        {
          question: "What is the 'super' keyword used for?",
          options: [
            "To refer to the superclass methods and constructors",
            "To create a superclass",
            "To call a static method",
            "To implement multiple inheritance"
          ],
          answer: 0,
          explanation: "The 'super' keyword is used to refer to the superclass methods and constructors. It can be used to call the superclass constructor, access superclass methods, or access superclass fields."
        },
        {
          question: "What is a static method?",
          options: [
            "A method that belongs to the class rather than any object",
            "A method that cannot be overridden",
            "A method that is automatically called when an object is created",
            "A method that is private to the class"
          ],
          answer: 0,
          explanation: "A static method belongs to the class rather than any object of the class. It can be called without creating an instance of the class and can only access static members of the class."
        },
        {
          question: "What is the difference between '==' and '.equals()' in Java?",
          options: [
            "'==' compares object references, '.equals()' compares object content",
            "'.equals()' compares object references, '==' compares object content",
            "They are identical in functionality",
            "'==' is used for numbers, '.equals()' is used for strings"
          ],
          answer: 0,
          explanation: "In Java, '==' compares object references (memory addresses), while '.equals()' is a method that can be overridden to compare the contents or values of objects. For objects, '==' checks if two references point to the same object in memory."
        },
        {
          question: "What is a final class?",
          options: [
            "A class that cannot be extended",
            "A class that cannot be instantiated",
            "A class with only final methods",
            "A class that implements an interface"
          ],
          answer: 0,
          explanation: "A final class is a class that cannot be extended (cannot have subclasses). This is often done for security reasons or to ensure that the class's behavior cannot be changed through inheritance."
        },
        {
          question: "What is a final method?",
          options: [
            "A method that cannot be overridden by subclasses",
            "A method that cannot be called directly",
            "A method that returns a constant value",
            "A method that is automatically called at program end"
          ],
          answer: 0,
          explanation: "A final method is a method that cannot be overridden by subclasses. This is used to prevent subclasses from changing the behavior of a method that is critical to the class's functionality."
        },
        {
          question: "What is the difference between composition and inheritance?",
          options: [
            "Composition implies a 'has-a' relationship, inheritance implies an 'is-a' relationship",
            "Inheritance is used for code reuse, composition is not",
            "Composition is a type of inheritance",
            "There is no difference"
          ],
          answer: 0,
          explanation: "Composition implies a 'has-a' relationship where a class contains an instance of another class, while inheritance implies an 'is-a' relationship where a class is a specialized version of another class. Composition is generally preferred over inheritance when there isn't a clear 'is-a' relationship, as it provides more flexibility and reduces coupling."
        },
        {
          question: "What is a singleton class?",
          options: [
            "A class that allows only one instance of itself to be created",
            "A class with only one method",
            "A class that cannot be extended",
            "A class with only static methods"
          ],
          answer: 0,
          explanation: "A singleton class is a class that allows only one instance of itself to be created and provides a global point of access to that instance. This is typically implemented by making the constructor private and providing a static method to access the single instance."
        },
        {
          question: "What is method chaining?",
          options: [
            "A technique where multiple method calls are made on the same object in sequence",
            "A way to chain exceptions together",
            "A type of inheritance",
            "A way to create multiple threads"
          ],
          answer: 0,
          explanation: "Method chaining is a technique where multiple method calls are made on the same object in sequence, with each call returning the object itself (or another object) to allow the calls to be chained together in a single statement."
        },
        {
          question: "What is a package in Java?",
          options: [
            "A way to organize related classes and interfaces",
            "A way to create multiple instances of a class",
            "A type of loop",
            "A way to handle exceptions"
          ],
          answer: 0,
          explanation: "A package in Java is a way to organize related classes and interfaces into namespaces, which helps in organizing code and preventing naming conflicts. Packages can contain other packages, creating a hierarchical structure."
        },
        {
          question: "What is the difference between an instance variable and a class variable?",
          options: [
            "Instance variables belong to objects, class variables belong to the class",
            "Class variables are created with each object, instance variables are shared",
            "There is no difference",
            "Instance variables are static, class variables are not"
          ],
          answer: 0,
          explanation: "Instance variables (non-static fields) are unique to each instance of a class, while class variables (static fields) are shared among all instances of the class. There is only one copy of a class variable, regardless of how many instances of the class exist."
        },
        {
          question: "What is a static block in Java?",
          options: [
            "A block of code that runs when the class is loaded",
            "A block of code that runs when an object is created",
            "A way to define constants",
            "A type of loop"
          ],
          answer: 0,
          explanation: "A static block in Java is a block of code that runs when the class is first loaded into memory, before any objects of the class are created and before any static methods are called. It's used to initialize static variables."
        },
        {
          question: "What is the 'instanceof' operator used for?",
          options: [
            "To test if an object is an instance of a specific class or interface",
            "To create a new instance of a class",
            "To compare two objects",
            "To check if a variable is null"
          ],
          answer: 0,
          explanation: "The 'instanceof' operator is used to test if an object is an instance of a specific class, a subclass, or a class that implements a specific interface. It returns true if the object is an instance of the specified type, and false otherwise."
        },
        {
          question: "What is a default method in a Java interface?",
          options: [
            "A method with an implementation in an interface",
            "A method that is automatically called when an interface is implemented",
            "A method that must be overridden by implementing classes",
            "A static method in an interface"
          ],
          answer: 0,
          explanation: "A default method in a Java interface is a method that has an implementation in the interface itself (using the 'default' keyword). Default methods were introduced in Java 8 to allow adding new methods to interfaces without breaking existing implementations."
        },
        {
          question: "What is a marker interface?",
          options: [
            "An interface with no methods or fields",
            "An interface that marks a class as serializable",
            "An interface that contains only one method",
            "An interface that cannot be implemented"
          ],
          answer: 0,
          explanation: "A marker interface is an interface with no methods or fields. It's used to mark or tag classes so that they can be treated in a special way by the JVM or other code. Examples include Serializable, Cloneable, and Remote interfaces."
        },
        {
          question: "What is the difference between an abstract class and a concrete class?",
          options: [
            "An abstract class cannot be instantiated, a concrete class can",
            "A concrete class cannot be extended, an abstract class can",
            "An abstract class can have constructors, a concrete class cannot",
            "There is no difference"
          ],
          answer: 0,
          explanation: "An abstract class cannot be instantiated directly and is meant to be subclassed, while a concrete class can be instantiated. Abstract classes can contain abstract methods (methods without implementation), while concrete classes cannot."
        },
        {
          question: "What is a factory method?",
          options: [
            "A method that creates and returns objects without specifying the exact class of object that will be created",
            "A method that is automatically called when an object is created",
            "A static method that returns a class instance",
            "A method that creates multiple threads"
          ],
          answer: 0,
          explanation: "A factory method is a creational design pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created. It lets a class defer instantiation to subclasses."
        },
        {
          question: "What is method hiding in Java?",
          options: [
            "When a subclass defines a static method with the same signature as a static method in the superclass",
            "When a method is declared as private",
            "When a method is overridden in a subclass",
            "When a method is not accessible from outside the class"
          ],
          answer: 0,
          explanation: "Method hiding occurs when a subclass defines a static method with the same signature as a static method in the superclass. The method in the subclass hides the one in the superclass, and the version that gets called depends on the reference type, not the actual object type."
        },
        {
          question: "What is a copy constructor?",
          options: [
            "A constructor that creates an object by copying variables from another object of the same class",
            "A constructor that creates a deep copy of an object",
            "A constructor that takes no parameters",
            "A constructor that creates multiple copies of an object"
          ],
          answer: 0,
          explanation: "A copy constructor is a special constructor that takes an object of the same class as a parameter and creates a new object by copying the values of the fields from the passed object. It's used to create a copy of an existing object."
        },
        {
          question: "What is the difference between shallow copy and deep copy?",
          options: [
            "Shallow copy duplicates as little as possible, deep copy duplicates everything",
            "Deep copy is faster than shallow copy",
            "Shallow copy creates new objects for all fields, deep copy does not",
            "There is no difference"
          ],
          answer: 0,
          explanation: "A shallow copy creates a new object and then copies the non-static fields of the current object to the new object. If the field is a reference to an object, it copies the reference, not the actual object. A deep copy creates a new object and then recursively copies all objects referenced by the original object, creating new objects for all referenced objects."
        },
        {
          question: "What is the 'finalize()' method in Java?",
          options: [
            "A method called by the garbage collector before an object is garbage collected",
            "A method that is called when an object is created",
            "A method that must be called explicitly to free resources",
            "A method that prevents an object from being garbage collected"
          ],
          answer: 0,
          explanation: "The 'finalize()' method is called by the garbage collector on an object when garbage collection determines that there are no more references to the object. It can be overridden to perform cleanup operations before the object is garbage collected, but its use is generally discouraged in favor of try-with-resources and other resource management techniques."
        }
      ]
    }
  ];

  if (selectedCategory) {
    const category = categories.find(cat => cat.id === selectedCategory);
    
    return (
      <div className="max-w-4xl mx-auto p-6">
        <button 
          onClick={() => setSelectedCategory(null)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <span className="mr-2">←</span> Back to Categories
        </button>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{category.title} Questions</h2>
          
          <div className="space-y-8">
            {category.questions.slice(0, visibleQuestions[selectedCategory] || 20).map((q, index) => {
              const isExpanded = showExplanation === `${selectedCategory}-${index}`;
              
              return (
                <div 
                  key={index} 
                  className="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
                >
                  <h3 className="text-lg font-medium text-gray-800 mb-3">
                    {index + 1}. {q.question}
                  </h3>
                  <div className="space-y-2 mb-3">
                    {q.options.map((option, i) => (
                      <div 
                        key={i} 
                        className={`p-3 rounded-lg ${
                          i === q.answer ? 'bg-green-50 text-green-800' : 'bg-gray-50'
                        }`}
                      >
                        {String.fromCharCode(65 + i)}. {option}
                        {i === q.answer && (
                          <span className="ml-2 text-sm text-green-600">(Correct Answer)</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => toggleExplanation(selectedCategory, index)}
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    {isExpanded ? 'Hide Explanation' : 'Show Explanation'}
                    <span className="ml-1">{isExpanded ? '▲' : '▼'}</span>
                  </button>
                  {isExpanded && (
                    <div className="mt-3 p-4 bg-blue-50 rounded-lg text-sm text-gray-700">
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
            
            {category.questions.length > (visibleQuestions[selectedCategory] || 20) && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => loadMoreQuestions(selectedCategory)}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md"
                >
                  Load 20 More Questions ({category.questions.length - (visibleQuestions[selectedCategory] || 20)} remaining)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <BackButton />
        </div>
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">CS Fundamentals</h1>
          <p className="text-gray-600">Master core computer science concepts for your interviews</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {categories.map((category) => (
            <div 
              key={category.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedCategory(category.id)}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{category.description}</p>
              <div className="text-sm text-gray-500">
                <span className="flex items-center">
                  <span className="mr-1.5">❓</span> {category.questions.length} Questions
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-all duration-300 z-50 text-2xl font-bold ${
          showScroll ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        title="Back to top"
      >
        ↑
      </button>
    </div>
  );
};

export default CSFundamentals;
