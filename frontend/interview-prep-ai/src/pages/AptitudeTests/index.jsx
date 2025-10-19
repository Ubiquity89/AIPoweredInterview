import React, { useState } from 'react';
import BackButton from '../../components/common/BackButton';

const AptitudeTests = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showExplanation, setShowExplanation] = useState(null);

  const toggleExplanation = (categoryId, questionIndex) => {
    const key = `${categoryId}-${questionIndex}`;
    setShowExplanation(showExplanation === key ? null : key);
  };

  const categories = [
    {
      id: 'quantitative',
      title: 'Quantitative Aptitude',
      description: 'Practice numerical ability and mathematical problems',
      questions: [
        {
          question: "If a train travels 300 km in 5 hours, what is its speed in km/h?",
          options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"],
          answer: 1,
          explanation: "Speed = Distance/Time = 300 km / 5 hours = 60 km/h"
        },
        {
          question: "What is 25% of 200?",
          options: ["25", "50", "75", "100"],
          answer: 1,
          explanation: "25% of 200 = (25/100) × 200 = 50"
        },
        {
          question: "If x + 15 = 30, what is the value of x?",
          options: ["10", "15", "20", "25"],
          answer: 1,
          explanation: "x + 15 = 30 → x = 30 - 15 = 15"
        },
        {
          question: "A shirt costs $40 after a 20% discount. What was its original price?",
          options: ["$45", "$48", "$50", "$52"],
          answer: 2,
          explanation: "Let original price be x. 80% of x = $40 → x = $40/0.8 = $50"
        },
        {
          question: "If 3 workers can complete a task in 12 days, how many days will 4 workers take?",
          options: ["8 days", "9 days", "10 days", "16 days"],
          answer: 1,
          explanation: "Total work = 3 workers × 12 days = 36 worker-days. 4 workers will take 36/4 = 9 days"
        },
        {
          question: "What is the average of first 10 natural numbers?",
          options: ["4.5", "5", "5.5", "6"],
          answer: 2,
          explanation: "Sum of first n natural numbers = n(n+1)/2 = 55. Average = 55/10 = 5.5"
        },
        {
          question: "If a square has a perimeter of 40cm, what is its area?",
          options: ["100 cm²", "120 cm²", "144 cm²", "160 cm²"],
          answer: 0,
          explanation: "Side = Perimeter/4 = 10cm. Area = side² = 100 cm²"
        },
        {
          question: "What is the probability of getting a prime number when rolling a die?",
          options: ["1/2", "1/3", "1/4", "1/6"],
          answer: 0,
          explanation: "Prime numbers on a die: 2, 3, 5 → 3 outcomes. Probability = 3/6 = 1/2"
        },
        {
          question: "If 2x - 5 = 11, what is x?",
          options: ["3", "6", "8", "10"],
          answer: 2,
          explanation: "2x - 5 = 11 → 2x = 16 → x = 8"
        },
        {
          question: "What is the area of a circle with radius 7cm? (π = 22/7)",
          options: ["44 cm²", "88 cm²", "154 cm²", "308 cm²"],
          answer: 2,
          explanation: "Area = πr² = (22/7) × 7 × 7 = 154 cm²"
        },
        {
          question: "If a car travels 240 km in 3 hours, how far will it travel in 5 hours at the same speed?",
          options: ["300 km", "360 km", "400 km", "480 km"],
          answer: 2,
          explanation: "Speed = 240/3 = 80 km/h. Distance in 5 hours = 80 × 5 = 400 km"
        },
        {
          question: "What is the next number in the sequence: 2, 6, 12, 20, 30, ...?",
          options: ["36", "40", "42", "48"],
          answer: 2,
          explanation: "Pattern: +4, +6, +8, +10, so next is 30 + 12 = 42"
        },
        {
          question: "If 15% of x is 45, what is x?",
          options: ["200", "250", "300", "350"],
          answer: 2,
          explanation: "0.15x = 45 → x = 45/0.15 = 300"
        },
        {
          question: "What is the value of 5! (5 factorial)?",
          options: ["60", "100", "120", "150"],
          answer: 2,
          explanation: "5! = 5 × 4 × 3 × 2 × 1 = 120"
        },
        {
          question: "If a rectangle's length is 12cm and width is 8cm, what is its diagonal?",
          options: ["14.4 cm", "15.6 cm", "16.2 cm", "17.2 cm"],
          answer: 0,
          explanation: "Diagonal = √(12² + 8²) = √(144 + 64) = √208 ≈ 14.4 cm"
        },
        {
          question: "What is 3/4 expressed as a percentage?",
          options: ["25%", "50%", "75%", "100%"],
          answer: 2,
          explanation: "3/4 = 0.75 = 75%"
        },
        {
          question: "If 2x + 3y = 12 and x = 3, what is y?",
          options: ["1", "2", "3", "4"],
          answer: 1,
          explanation: "2(3) + 3y = 12 → 6 + 3y = 12 → 3y = 6 → y = 2"
        },
        {
          question: "What is the least common multiple (LCM) of 12 and 18?",
          options: ["24", "36", "48", "72"],
          answer: 1,
          explanation: "Multiples of 12: 12, 24, 36... Multiples of 18: 18, 36... LCM = 36"
        },
        {
          question: "If a number is increased by 25% and the result is 75, what was the original number?",
          options: ["50", "55", "60", "65"],
          answer: 2,
          explanation: "Let x be the number. 1.25x = 75 → x = 75/1.25 = 60"
        },
        {
          question: "What is the value of 2³ × 3²?",
          options: ["12", "18", "36", "72"],
          answer: 3,
          explanation: "2³ = 8, 3² = 9 → 8 × 9 = 72"
        },
        {
          question: "If a right triangle has legs of 6cm and 8cm, what is the length of the hypotenuse?",
          options: ["10 cm", "12 cm", "14 cm", "16 cm"],
          answer: 0,
          explanation: "Using Pythagoras' theorem: √(6² + 8²) = √(36 + 64) = √100 = 10 cm"
        },
        {
          question: "What is 0.125 expressed as a fraction?",
          options: ["1/4", "1/6", "1/8", "1/10"],
          answer: 2,
          explanation: "0.125 = 125/1000 = 1/8"
        },
        {
          question: "If 4x - 7 = 5, what is x?",
          options: ["2", "3", "4", "5"],
          answer: 1,
          explanation: "4x - 7 = 5 → 4x = 12 → x = 3"
        },
        {
          question: "What is the greatest common divisor (GCD) of 36 and 60?",
          options: ["6", "9", "12", "18"],
          answer: 2,
          explanation: "Factors of 36: 1,2,3,4,6,9,12,18,36. Factors of 60: 1,2,3,4,5,6,10,12,15,20,30,60. GCD = 12"
        },
        {
          question: "If a number is tripled and then increased by 5, the result is 26. What is the number?",
          options: ["5", "6", "7", "8"],
          answer: 2,
          explanation: "Let x be the number. 3x + 5 = 26 → 3x = 21 → x = 7"
        },
        {
          question: "What is the value of 0.4 × 0.5?",
          options: ["0.02", "0.2", "0.4", "0.9"],
          answer: 1,
          explanation: "0.4 × 0.5 = 0.20 or 0.2"
        },
        {
          question: "If the ratio of boys to girls in a class is 3:5 and there are 24 students, how many boys are there?",
          options: ["6", "8", "9", "12"],
          answer: 2,
          explanation: "Total parts = 3 + 5 = 8. Number of boys = (3/8) × 24 = 9"
        },
        {
          question: "What is the value of 7² + 3 × 4 - 5?",
          options: ["32", "42", "52", "62"],
          answer: 3,
          explanation: "7² + 3 × 4 - 5 = 49 + 12 - 5 = 56"
        },
        {
          question: "If a number is decreased by 20% and the result is 80, what was the original number?",
          options: ["90", "95", "100", "105"],
          answer: 2,
          explanation: "Let x be the number. 0.8x = 80 → x = 80/0.8 = 100"
        },
        {
          question: "What is the sum of the interior angles of a hexagon?",
          options: ["540°", "720°", "900°", "1080°"],
          answer: 1,
          explanation: "Sum = (n-2) × 180° = (6-2) × 180° = 720°"
        },
        {
          question: "If 2/3 of a number is 24, what is 1/4 of the number?",
          options: ["6", "8", "9", "12"],
          answer: 2,
          explanation: "(2/3)x = 24 → x = 36 → (1/4) × 36 = 9"
        },
        {
          question: "What is the value of log₁₀100?",
          options: ["1", "2", "10", "100"],
          answer: 1,
          explanation: "10² = 100, so log₁₀100 = 2"
        },
        {
          question: "If x² - 9 = 0, what are the possible values of x?",
          options: ["±3", "±4", "±9", "3 only"],
          answer: 0,
          explanation: "x² = 9 → x = ±√9 = ±3"
        },
        {
          question: "What is the value of 1/2 + 1/3 + 1/6?",
          options: ["1", "1.1", "1.2", "1.5"],
          answer: 0,
          explanation: "3/6 + 2/6 + 1/6 = 6/6 = 1"
        },
        {
          question: "If the area of a square is 64 cm², what is the length of its diagonal?",
          options: ["8 cm", "8√2 cm", "16 cm", "16√2 cm"],
          answer: 1,
          explanation: "Side = √64 = 8 cm. Diagonal = side × √2 = 8√2 cm"
        }
      ]
    },
    {
      id: 'logical',
      title: 'Logical Reasoning',
      description: 'Practice logical reasoning and analytical thinking',
      questions: [
        {
          question: "If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are definitely Lazzies?",
          options: ["True", "False", "Uncertain", "None of the above"],
          answer: 0,
          explanation: "This is a classic syllogism. If A is a subset of B, and B is a subset of C, then A must be a subset of C."
        },
        {
          question: "What comes next in the sequence: 2, 4, 8, 16, ...?",
          options: ["20", "24", "32", "64"],
          answer: 2,
          explanation: "Each number is multiplied by 2 to get the next number."
        },
        {
          question: "If some doctors are scientists and all scientists are researchers, then which statement must be true?",
          options: [
            "All doctors are researchers",
            "Some doctors are researchers",
            "No doctors are researchers",
            "All researchers are doctors"
          ],
          answer: 1,
          explanation: "Since some doctors are scientists and all scientists are researchers, it must be true that some doctors are researchers."
        },
        {
          question: "Which word does not belong with the others?",
          options: ["Square", "Circle", "Triangle", "Rectangle"],
          answer: 1,
          explanation: "Circle is the only shape that is not a polygon."
        },
        {
          question: "Complete the analogy: Book is to Reading as Fork is to:",
          options: ["Cutting", "Eating", "Cooking", "Plate"],
          answer: 1,
          explanation: "A book is used for reading as a fork is used for eating."
        },
        {
          question: "If the first two statements are true, is the final statement true?\n1. All roses are flowers.\n2. Some flowers fade quickly.\n3. Therefore, some roses fade quickly.",
          options: ["Yes", "No", "Uncertain"],
          answer: 2,
          explanation: "The conclusion doesn't necessarily follow because we don't know if roses are among the flowers that fade quickly."
        },
        {
          question: "Which number should come next in the series: 1, 1, 2, 3, 5, 8, 13, ...?",
          options: ["18", "19", "20", "21"],
          answer: 3,
          explanation: "This is the Fibonacci sequence where each number is the sum of the two preceding ones."
        },
        {
          question: "If some pens are pencils and all pencils are erasers, which statement must be true?",
          options: [
            "All pens are erasers",
            "Some pens are erasers",
            "No pens are erasers",
            "Some erasers are not pens"
          ],
          answer: 1,
          explanation: "Since some pens are pencils and all pencils are erasers, those pens that are pencils must also be erasers."
        },
        {
          question: "What is the missing number in the sequence: 2, 6, 12, 20, 30, 42, ?",
          options: ["50", "54", "56", "60"],
          answer: 2,
          explanation: "The pattern is: 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, 6×7=42, so the next should be 7×8=56."
        },
        {
          question: "Which is the odd one out?",
          options: ["Cube", "Sphere", "Cylinder", "Cone"],
          answer: 0,
          explanation: "Cube is the only shape with flat faces and no curved surfaces."
        },
        {
          question: "If in a certain code, 'ORANGE' is written as 'PQBMHD', how is 'PAPAYA' written in that code?",
          options: ["QBQBZB", "QBBBZB", "QBBZBZ", "QBQBZZ"],
          answer: 0,
          explanation: "Each letter in 'ORANGE' is shifted +1, -1, +1, -1, +1, -1 respectively in the alphabet."
        },
        {
          question: "If all Zips are Zonks and some Zonks are Zips, which statement is definitely true?",
          options: [
            "All Zonks are Zips",
            "Some Zonks are not Zips",
            "No Zonks are Zips",
            "None of the above"
          ],
          answer: 3,
          explanation: "The given information doesn't confirm any of the first three options."
        },
        {
          question: "What comes next in the pattern: A, C, F, J, O, ...?",
          options: ["T", "U", "V", "W"],
          answer: 1,
          explanation: "The pattern increases by 2, then 3, then 4, etc. A(+2)=C, C(+3)=F, F(+4)=J, J(+5)=O, O(+6)=U."
        },
        {
          question: "If all trees are plants and some plants are green, then:",
          options: [
            "All trees are green",
            "Some trees are green",
            "No trees are green",
            "None of the above"
          ],
          answer: 1,
          explanation: "Since some plants are green and all trees are plants, it's possible that some trees are green."
        },
        {
          question: "Which number should replace the question mark?\n3 5 7\n5 8 4\n4 6 ?",
          options: ["5", "6", "7", "8"],
          answer: 0,
          explanation: "In each row, the middle number is the average of the other two numbers."
        },
        {
          question: "If 'PENCIL' is to 'LIGNEP', then 'PAPER' is to:",
          options: ["REPAP", "REPPA", "REAPP", "REPAP"],
          answer: 0,
          explanation: "The word is reversed: PENCIL → LIGNEP (backwards), so PAPER → REPAP"
        },
        {
          question: "If all Zips are Zonks and no Zonks are Zips, then:",
          options: [
            "All Zips are not Zonks",
            "Some Zips are not Zonks",
            "No Zips are Zonks",
            "None of the above"
          ],
          answer: 2,
          explanation: "If all Zips are Zonks and no Zonks are Zips, then no Zips can be Zonks."
        },
        {
          question: "What is the next number in the sequence: 1, 4, 9, 16, 25, ...?",
          options: ["30", "36", "41", "49"],
          answer: 1,
          explanation: "The sequence represents perfect squares: 1²=1, 2²=4, 3²=9, 4²=16, 5²=25, so next is 6²=36."
        },
        {
          question: "If 'DOG' is to 'GOD', then 'RAT' is to:",
          options: ["TAR", "ART", "RAT", "TRA"],
          answer: 0,
          explanation: "The letters are reversed: DOG → GOD, so RAT → TAR"
        },
        {
          question: "Which is the odd one out?",
          options: ["Sodium", "Chlorine", "Oxygen", "Water"],
          answer: 3,
          explanation: "Water is a compound while the others are elements."
        },
        {
          question: "If 'JANUARY' is written as '1234567', how is 'JUNE' written?",
          options: ["1537", "1547", "1536", "1546"],
          answer: 0,
          explanation: "Using the position of letters in 'JANUARY' (J=1, A=2, N=3, U=4, etc.), JUNE would be J(1)U(4)N(3)E(5) → 1435."
        },
        {
          question: "If all roses are flowers and some flowers fade quickly, which statement must be true?",
          options: [
            "All roses fade quickly",
            "Some roses fade quickly",
            "No roses fade quickly",
            "None of the above"
          ],
          answer: 3,
          explanation: "We don't know if roses are among the flowers that fade quickly."
        },
        {
          question: "What is the next letter in the sequence: A, C, F, J, O, ...?",
          options: ["T", "U", "V", "W"],
          answer: 1,
          explanation: "The pattern increases by 2, then 3, then 4, etc. A(+2)=C, C(+3)=F, F(+4)=J, J(+5)=O, O(+6)=U."
        },
        {
          question: "If all trees are plants and some plants are green, then:",
          options: [
            "All trees are green",
            "Some trees are green",
            "No trees are green",
            "None of the above"
          ],
          answer: 1,
          explanation: "Since some plants are green and all trees are plants, it's possible that some trees are green."
        },
        {
          question: "Which number should replace the question mark?\n3 5 7\n5 8 4\n4 6 ?",
          options: ["5", "6", "7", "8"],
          answer: 0,
          explanation: "In each row, the middle number is the average of the other two numbers."
        },
        {
          question: "If 'PENCIL' is to 'LIGNEP', then 'PAPER' is to:",
          options: ["REPAP", "REPPA", "REAPP", "REPAP"],
          answer: 0,
          explanation: "The word is reversed: PENCIL → LIGNEP (backwards), so PAPER → REPAP"
        },
        {
          question: "Which is the odd one out?",
          options: ["Square", "Cube", "Rectangle", "Rhombus"],
          answer: 1,
          explanation: "Cube is the only 3D shape; all others are 2D."
        },
        {
          question: "If in a certain code, 'COMPUTER' is written as 'FTRLQWKW', how is 'KEYBOARD' written in that code?",
          options: ["NHBEWLUA", "NHBEWLUB", "NHBEWLUC", "NHBEWLUD"],
          answer: 1,
          explanation: "Each letter is shifted +3 in the alphabet."
        },
        {
          question: "If some X are Y and no Y are Z, then:",
          options: [
            "Some X are not Z",
            "All X are Z",
            "Some X are Z",
            "None of the above"
          ],
          answer: 0,
          explanation: "Since no Y are Z, and some X are Y, those X that are Y cannot be Z, so some X are not Z."
        },
        {
          question: "What is the missing number?\n8, 16, 32, 64, ?",
          options: ["96", "112", "128", "144"],
          answer: 2,
          explanation: "Each number is multiplied by 2."
        },
        {
          question: "If 'E' is coded as '5' and 'BAT' is coded as '202', how is 'CAT' coded?",
          options: ["302", "203", "320", "230"],
          answer: 0,
          explanation: "E is the 5th letter. BAT: B(2), A(1), T(20) → 2 0 2. So CAT: C(3), A(1), T(20) → 3 0 2"
        },
        {
          question: "If all A are B and some B are C, then:",
          options: [
            "All A are C",
            "Some A are C",
            "No A are C",
            "None of the above"
          ],
          answer: 3,
          explanation: "The given information doesn't provide any direct relationship between A and C."
        },
        {
          question: "Which shape completes the pattern? [Square] [Circle] [Triangle] [Square] [Circle] [?]",
          options: ["Square", "Circle", "Triangle", "Rectangle"],
          answer: 2,
          explanation: "The pattern is Square, Circle, Triangle repeating."
        }
      ]
    },
    {
      id: 'verbal',
      title: 'Verbal Ability',
      description: 'Test your vocabulary, grammar, and language skills',
      questions: [
        {
          question: "Choose the word most similar in meaning to 'BENEVOLENT':",
          options: ["Generous", "Stingy", "Angry", "Shy"],
          answer: 0,
          explanation: "'Benevolent' means well-meaning and kindly, which is most similar to 'generous'."
        },
        {
          question: "Which word is the antonym of 'EPHEMERAL'?",
          options: ["Temporary", "Permanent", "Fleeting", "Brief"],
          answer: 1,
          explanation: "'Ephemeral' means lasting for a very short time, so the opposite is 'permanent'."
        },
        {
          question: "Choose the correct sentence:",
          options: [
            "She don't like apples.",
            "She doesn't likes apples.",
            "She doesn't like apples.",
            "She don't likes apples."
          ],
          answer: 2,
          explanation: "The correct form is 'doesn't' (does not) with the base form of the verb 'like'."
        },
        {
          question: "Which word is spelled correctly?",
          options: ["Accomodate", "Acommodate", "Acomodate", "Accommodate"],
          answer: 3,
          explanation: "'Accommodate' has double 'c' and double 'm'."
        },
        {
          question: "Choose the correct idiom: 'The new policy was a ___ in the dark.'",
          options: ["shot", "hit", "jump", "leap"],
          answer: 0,
          explanation: "'A shot in the dark' means a wild guess or attempt."
        },
        {
          question: "Select the antonym of 'Benevolent':",
          options: ["Kind", "Generous", "Malevolent", "Friendly"],
          answer: 2,
          explanation: "Benevolent means kind and well-meaning, while malevolent means having or showing a wish to do evil to others."
        },
        {
          question: "Which sentence is in passive voice?",
          options: [
            "The cat chased the mouse.",
            "The mouse was chased by the cat.",
            "The cat is chasing the mouse.",
            "The mouse runs from the cat."
          ],
          answer: 1,
          explanation: "Passive voice has the object receiving the action (the mouse) as the subject of the sentence."
        },
        {
          question: "Choose the correct word: 'She was ___ by the beautiful scenery.'",
          options: ["affected", "effected", "affect", "effect"],
          answer: 0,
          explanation: "'Affected' is the past participle of 'affect' meaning influenced or touched emotionally."
        },
        {
          question: "Which is the correct plural form of 'crisis'?",
          options: ["Crisises", "Crises", "Crisies", "Crisi"],
          answer: 1,
          explanation: "The correct plural of 'crisis' is 'crises'."
        },
        {
          question: "Choose the word that best completes the sentence: 'The ___ of the novel was so complex that I had to read it twice.'",
          options: ["Plot", "Plait", "Plat", "Plut"],
          answer: 0,
          explanation: "'Plot' refers to the main events of a novel, which makes the most sense in this context."
        },
        {
          question: "Which word means 'to make an exact copy'?",
          options: ["Imitate", "Duplicate", "Simulate", "Replicate"],
          answer: 1,
          explanation: "'Duplicate' means to make an exact copy of something."
        },
        {
          question: "Choose the correct preposition: 'She is allergic ___ cats.'",
          options: ["to", "for", "with", "at"],
          answer: 0,
          explanation: "The correct preposition with 'allergic' is 'to'."
        },
        {
          question: "Which word is a synonym for 'Ubiquitous'?",
          options: ["Rare", "Common", "Everywhere", "Nowhere"],
          answer: 2,
          explanation: "'Ubiquitous' means present, appearing, or found everywhere."
        },
        {
          question: "Choose the correct spelling:",
          options: ["Occurrence", "Occurence", "Ocurrence", "Ocurence"],
          answer: 0,
          explanation: "'Occurrence' is the correct spelling with double 'c' and double 'r'."
        },
        {
          question: "Which sentence is grammatically correct?",
          options: [
            "Me and him went to the store.",
            "Him and me went to the store.",
            "He and I went to the store.",
            "I and he went to the store."
          ],
          answer: 2,
          explanation: "'He and I went to the store' uses the correct subject pronouns and order."
        },
        {
          question: "What is the meaning of the word 'Pragmatic'?",
          options: ["Theoretical", "Practical", "Idealistic", "Abstract"],
          answer: 1,
          explanation: "'Pragmatic' means dealing with things sensibly and realistically."
        },
        {
          question: "Choose the correct form: 'I wish I ___ there yesterday.'",
          options: ["was", "were", "had been", "have been"],
          answer: 2,
          explanation: "'Had been' is the correct past perfect form for a wish about the past."
        },
        {
          question: "Which word is an antonym of 'Cacophony'?",
          options: ["Harmony", "Noise", "Discord", "Chaos"],
          answer: 0,
          explanation: "'Cacophony' means a harsh, discordant mixture of sounds, so the opposite is 'harmony'."
        },
        {
          question: "Select the correctly spelled word:",
          options: ["Seperate", "Separate", "Seperete", "Seperat"],
          answer: 1,
          explanation: "'Separate' is the correct spelling."
        },
        {
          question: "Choose the word that best fits: 'Her ___ personality made her the life of every party.'",
          options: ["Gregarious", "Introverted", "Shy", "Reserved"],
          answer: 0,
          explanation: "'Gregarious' means sociable and outgoing, which fits the context."
        },
        {
          question: "Which sentence uses 'their' correctly?",
          options: [
            "Their going to the store.",
            "The book is over their.",
            "Their house is beautiful.",
            "I don't know their going."
          ],
          answer: 2,
          explanation: "'Their' is a possessive pronoun showing ownership, as in 'their house'."
        },
        {
          question: "What is the meaning of 'Ephemeral'?",
          options: ["Lasting a short time", "Lasting forever", "Relating to books", "Very large"],
          answer: 0,
          explanation: "'Ephemeral' means lasting for a very short time."
        },
        {
          question: "Choose the correct word: 'The results were ___ to the entire team.'",
          options: ["Apparent", "Aparent", "Apparant", "Apperent"],
          answer: 0,
          explanation: "'Apparent' is the correct spelling meaning clearly visible or understood."
        },
        {
          question: "Which word is a synonym for 'Meticulous'?",
          options: ["Careless", "Sloppy", "Thorough", "Hasty"],
          answer: 2,
          explanation: "'Meticulous' means showing great attention to detail; very careful and precise."
        },
        {
          question: "Select the correct sentence:",
          options: [
            "The team are playing well.",
            "The team is playing well.",
            "The team were playing well.",
            "The team be playing well."
          ],
          answer: 1,
          explanation: "'Team' is a collective noun that takes a singular verb in American English."
        },
        {
          question: "What is the meaning of 'Alacrity'?",
          options: ["Slowness", "Eagerness", "Sadness", "Anger"],
          answer: 1,
          explanation: "'Alacrity' means brisk and cheerful readiness."
        },
        {
          question: "Choose the correct word: 'The ___ of the situation was not immediately clear.'",
          options: ["Gravity", "Gravyty", "Graviti", "Gravitee"],
          answer: 0,
          explanation: "'Gravity' is the correct spelling, meaning seriousness or importance."
        },
        {
          question: "Which word is an antonym of 'Benevolent'?",
          options: ["Kind", "Generous", "Malevolent", "Friendly"],
          answer: 2,
          explanation: "'Benevolent' means well-meaning and kindly, while 'malevolent' means having or showing a wish to do evil to others."
        },
        {
          question: "Choose the correct word: 'She was ___ by the beautiful scenery.'",
          options: ["affected", "effected", "affect", "effect"],
          answer: 0,
          explanation: "'Affected' is the past participle of 'affect' meaning influenced or touched emotionally."
        },
        {
          question: "Which is the correct plural form of 'crisis'?",
          options: ["Crisises", "Crises", "Crisies", "Crisi"],
          answer: 1,
          explanation: "The correct plural of 'crisis' is 'crises'."
        }
      ]
    },
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
            {category.questions.map((q, index) => {
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
                        className={`p-3 rounded-lg ${i === q.answer ? 'bg-green-50 text-green-800' : 'bg-gray-50'}`}
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
          </div>
        </div>
      </div>
    );
  }

  if (selectedCategory) {
    const category = categories.find(cat => cat.id === selectedCategory);
    if (!category) return null;
    
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <BackButton />
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{category.title}</h2>
            <div className="space-y-6">
              {category.questions.map((q, index) => (
                <div key={index} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                  <div className="flex items-start">
                    <span className="font-medium text-gray-700 mr-2">{index + 1}.</span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{q.question}</p>
                      <div className="mt-3 space-y-2">
                        {q.options.map((option, i) => (
                          <div key={i} className="flex items-center">
                            <span className={`inline-flex items-center justify-center h-5 w-5 rounded-full border ${
                              i === q.answer ? 'bg-green-100 border-green-500' : 'border-gray-300'
                            } mr-2 text-sm`}>
                              {String.fromCharCode(65 + i)}
                            </span>
                            <span className={i === q.answer ? 'text-green-600 font-medium' : 'text-gray-700'}>
                              {option}
                            </span>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => toggleExplanation(category.id, index)}
                        className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        {showExplanation === `${category.id}-${index}` ? 'Hide Explanation' : 'Show Explanation'}
                      </button>
                      {showExplanation === `${category.id}-${index}` && (
                        <div className="mt-2 p-3 bg-blue-50 rounded-md">
                          <p className="text-sm text-blue-700">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton />
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Aptitude Tests</h1>
          <p className="text-gray-600">Practice different types of aptitude questions to improve your skills</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div 
              key={category.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedCategory(category.id)}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{category.title}</h3>
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
    </div>
  );
};

export default AptitudeTests;
