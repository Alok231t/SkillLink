// src/pages/Dashboard.jsx
import React, { useState, useEffect , useRef } from 'react';
import './Dashboard.css';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { getConfig } from '@testing-library/react';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {

    const baseurl = process.env.REACT_APP_BASE_URL;
    console.log(baseurl);

    // Sample data for the chart
    const data = null;

    const Prompt = `
    
    Prompt for Course Roadmap Generation:

    You are an AI tasked with creating a detailed roadmap for a course. The roadmap should guide learners from the very beginning to the end of the course, ensuring they acquire a thorough understanding of the subject matter.

    Instructions:
    Divide the roadmap into modules: Break down the course into manageable modules or units. Each module should focus on a specific topic or skill.

    List key topics: For each module, list the key topics that should be covered. Ensure these topics align with the course goals and description.

    Include resources: Suggest resources such as books, articles, videos, or online courses that learners can use to study each topic.

    Provide learning activities: Recommend activities or exercises that reinforce learning for each topic. This could include quizzes, projects, or discussions.

    Outline a timeline: Provide a suggested timeline for completing each module and the entire course. This can help learners pace their study effectively.

    Identify assessments: Specify how learners will be assessed on their understanding of each module (e.g., tests, projects, presentations).

    Summarize the expected outcomes: At the end of the roadmap, summarize what learners can expect to achieve by following this roadmap.

    Output Format:
    The response should be formatted in Markdown with the following structure, ensuring to include appropriate line breaks and indentation for readability:

    
    <title>Course Title: [Course Name]</title>

    <module>Module 1: [Module Name]</module>
    <topics> 
    - [Topic 1]
    - [Topic 2]
    </topics>
    <resources> 
    - Book: [Book Title, Author]
    - Online Course: [Course URL]
    </resources>
    <activities> 
    - [Activity Description]
    </activities>
    <assessment> 
    - [Assessment Method]
    </assessment>
    <timeline>[Duration]</timeline>

    <module>Module 2: [Module Name]</module>
    <topics> 
    - [Topic 1]
    - [Topic 2]
    </topics>
    <resources> 
    - Book: [Book Title, Author]
    - Online Course: [Course URL]
    </resources>
    <activities> 
    - [Activity Description]
    </activities>
    <assessment> 
    - [Assessment Method]
    </assessment>
    <timeline>[Duration]</timeline>

    <!-- Repeat for additional modules -->

    <expected_outcomes>Summary of Expected Outcomes</expected_outcomes>
    - [Outcome 1]
    - [Outcome 2]
    Notes:
    Ensure that the output is clear, well-structured, and visually appealing with appropriate line breaks and indentation.
    Avoid using special characters (e.g., #, $, etc.) in the output.   
    
    Note : The response must adhere the format of this example

    <title>Course Roadmap: Database Management System</title>

    <module>Module 1: Introduction to Database Management Systems</module>
    <topics> 
    - Understanding Databases
    - History and Evolution of DBMS
    </topics>
    <resources> 
    - Book: "Database System Concepts" by Abraham Silberschatz, Henry F. Korth, and S. Sudarshan
    - Online Course: [Introduction to Databases](https://www.coursera.org/learn/databases)
    </resources>
    <activities> 
    - Read the first two chapters of the recommended book
    - Watch the first two videos of the online course
    - Participate in a discussion forum on the evolution of databases
    </activities>
    <assessment> 
    - Quiz on the history and fundamentals of databases
    </assessment>
    <timeline>1 Week</timeline>

    <module>Module 2: Database Models</module>
    <topics> 
    - Hierarchical Model
    - Network Model
    - Relational Model
    </topics>
    <resources> 
    - Book: "Database Systems: The Complete Book" by Hector Garcia-Molina, Jeffrey D. Ullman, and Jennifer Widom
    - Article: [Types of Database Models](https://www.dataversity.net/types-of-databases/)
    </resources>
    <activities> 
    - Compare different database models through a table
    - Create a small hierarchical database using a tool of your choice
    </activities>
    <assessment> 
    - Written assignment comparing database models
    </assessment>
    <timeline>2 Weeks</timeline>

    <module>Module 3: Relational Database Design</module>
    <topics> 
    - Entity-Relationship Model
    - Normalization
    - SQL Basics
    </topics>
    <resources> 
    - Book: "Fundamentals of Database Systems" by Ramez Elmasri and Shamkant B. Navathe
    - Online Course: [Relational Database Design](https://www.udacity.com/course/intro-to-relational-databases--ud197)
    </resources>
    <activities> 
    - Design an ER diagram for a sample database
    - Normalize a sample database to the third normal form (3NF)
    - Practice basic SQL queries on a sample database
    </activities>
    <assessment> 
    - Project: Design and implement a small relational database
    </assessment>
    <timeline>3 Weeks</timeline>

    <module>Module 4: Advanced SQL</module>
    <topics> 
    - Complex Queries
    - Triggers and Stored Procedures
    - Transactions and Concurrency Control
    </topics>
    <resources> 
    - Book: "SQL Performance Explained" by Markus Winand
    - Online Course: [Advanced SQL for Data Scientists](https://www.datacamp.com/courses/advanced-sql-for-data-scientists)
    </resources>
    <activities> 
    - Write complex queries involving multiple tables and nested subqueries
    - Implement triggers and stored procedures in a sample database
    - Simulate transaction scenarios and practice concurrency control
    </activities>
    <assessment> 
    - Quiz on advanced SQL concepts
    </assessment>
    <timeline>2 Weeks</timeline>

    <module>Module 5: Database Security and Backup</module>
    <topics> 
    - Security Issues in Databases
    - Authentication and Authorization
    - Backup and Recovery
    </topics>
    <resources> 
    - Book: "Database Security" by Hassan A. Afyouni
    - Article: [A Guide to Database Security](https://www.oreilly.com/library/view/database-security-a/9781565926422/)
    </resources>
    <activities> 
    - Conduct a security audit of a sample database
    - Implement user roles and permissions in a sample database
    - Create a backup and perform a recovery operation in a sample database
    </activities>
    <assessment> 
    - Project: Security audit report with recommendations
    </assessment>
    <timeline>2 Weeks</timeline>

    <module>Module 6: Distributed Databases and NoSQL</module>
    <topics> 
    - Distributed Database Concepts
    - NoSQL Databases
    - CAP Theorem
    </topics>
    <resources> 
    - Book: "NoSQL Distilled: A Brief Guide to the Emerging World of Polyglot Persistence" by Pramod J. Sadalage and Martin Fowler
    - Online Course: [Foundations of Databases](https://www.edx.org/course/foundations-of-databases)
    </resources>
    <activities> 
    - Set up and explore a NoSQL database such as MongoDB or Cassandra
    - Compare and contrast the use cases for SQL and NoSQL databases
    </activities>
    <assessment> 
    - Quiz on distributed databases and NoSQL concepts
    </assessment>
    <timeline>2 Weeks</timeline>

    <module>Module 7: Big Data and Analytics</module>
    <topics> 
    - Introduction to Big Data
    - Data Warehousing and ETL Processes
    - Data Analytics and Visualization
    </topics>
    <resources> 
    - Book: "Big Data: Principles and best practices of scalable real-time data systems" by Nathan Marz and James Warren
    - Online Course: [Big Data Analysis with Scala and Spark](https://www.coursera.org/learn/scala-spark-big-data)
    </resources>
    <activities> 
    - Set up a data warehouse using tools like Apache Hive or Amazon Redshift
    - Perform ETL operations on large datasets
    - Use data visualization tools like Tableau or Power BI to create meaningful visualizations
    </activities>
    <assessment> 
    - Project: Big data analysis and visualization report
    </assessment>
    <timeline>3 Weeks</timeline>

    <module>Module 8: Capstone Project</module>
    <topics> 
    - Design and Build a Real-World Database Application Scenario
    </topics>
    <resources> 
    - Review all previously used resources and any additional resources specific to the project needs
    </resources>
    <activities> 
    - Identify a real-world problem that requires a database solution
    - Design the database, models, and necessary SQL or NoSQL queries
    - Implement the database and present the solution
    </activities>
    <assessment> 
    - Final Project Presentation and Report
    </assessment>
    <timeline>4 Weeks</timeline>

    <expected_outcomes>Summary of Expected Outcomes</expected_outcomes>
    - Thorough understanding of different types of databases and database models
    - Ability to design a relational database and write complex SQL queries
    - Knowledge of advanced SQL concepts including stored procedures, triggers, and transactions
    - Understanding of database security, backup, and recovery techniques
    - Familiarity with distributed databases, NoSQL databases, and big data technologies
    - Practical experience in designing, implementing, and managing databases through hands-on projects and activities

    
    `;

    const Prompt2 = `
    
    Prompt for 20 MCQ Quiz Generation:

    You are an AI tasked with creating a 20-question multiple-choice quiz for learners based on a course or topic. The quiz should assess their knowledge and understanding of the subject matter, with various question types such as factual recall, conceptual understanding, and application of knowledge.

    Instructions:
    - Generate exactly 20 questions.
    - Ensure a balance of difficulty: include easy, moderate, and challenging questions.
    - Provide four answer options (A, B, C, D) for each question.
    - Do not indicate the correct answer directly within the question.
    - List all correct answers at the end, in the order of the questions.
    - Format the entire quiz using markdown tags for easy parsing.
    - No extra terms aur text only the required text should be printed 

    Output Format:
    - Format each question using the <question>, <option>, and <correct_answers> tags.
    - Use the <question> tag for the question text.
    - Use the <option> tag for each answer option (A, B, C, D).
    - At the end, use the <correct_answers> tag and list all correct answers in the same order as the questions.

    Example Output:

    <question>What is the primary key in a relational database?</question>
    <option>A) A unique identifier for each row</option>
    <option>B) A key that allows duplicate values</option>
    <option>C) A field that allows multiple NULL values</option>
    <option>D) A foreign key in the database</option>

    <question>In SQL, which keyword is used to remove duplicates from the result set?</question>
    <option>A) REMOVE</option>
    <option>B) DISTINCT</option>
    <option>C) DELETE</option>
    <option>D) FILTER</option>

    <question>Which of the following is a NoSQL database?</question>
    <option>A) MySQL</option>
    <option>B) PostgreSQL</option>
    <option>C) MongoDB</option>
    <option>D) SQL Server</option>

    <question>What is the purpose of normalization in database design?</question>
    <option>A) To reduce data redundancy</option>
    <option>B) To increase the complexity of the database</option>
    <option>C) To store more data in less space</option>
    <option>D) To decrease performance of queries</option>

    <question>Which of the following is an example of a DDL (Data Definition Language) command in SQL?</question>
    <option>A) SELECT</option>
    <option>B) INSERT</option>
    <option>C) CREATE</option>
    <option>D) UPDATE</option>

    <!-- Repeat for a total of 20 questions -->

    <correct_answers>
    1. A
    2. B
    3. C
    4. A
    5. C
    <!-- Continue listing the correct answers for all 20 questions -->
    </correct_answers>

    Notes:
    - Ensure the output is clear, well-structured, and uses markdown tags for easy filtering.
    - Avoid using special characters (e.g., #, $, etc.) in the output.

    The Course for which you need to generate the quiz is : 
    `;
    // Chart options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Performance Over Time',
            },
        },
    };

    // State management
    const [currentModule, setCurrentModule] = useState('dashboard');
    const [isCreatingCourse, setIsCreatingCourse] = useState(false);
    const [courseTitle, setCourseTitle] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [courses, setCourses] = useState([]);
    const [isFetchingCourses, setIsFetchingCourses] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null); // State for selected course details

    // Chat state management
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const [availableCourses, setAvailableCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(''); // Track selected course Id
    const [roadmap, setRoadmap] = useState(null);
    const [goals, setGoals] = useState(''); // User input for goals
    const [loading, setLoading] = useState(false);
    const [quiz, setQuiz] = useState([]); // Store quiz questions
    const [quizScores, setQuizScores] = useState([]); // Store quiz scores
    const [quizResults, setQuizResults] = useState(null); // Store results after submission
    const [loadingQuiz, setLoadingQuiz] = useState(false); // Loading state for quiz generation
    const [userAnswers, setUserAnswers] = useState([]); // To store user answers
    const [score, setScore] = useState(null);           // To store the quiz score
    const [submitted, setSubmitted] = useState(false);  // Track if quiz is submitted
    const [correctAnswers, setCorrectAnswers] = useState([]); // Store correct answers
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [scoreMessage, setScoreMessage] = useState('');
    const [showAnswers, setShowAnswers] = useState(false); // State to track if answers should be shown
    const courseDetailsRef = useRef(null);



    const BarChart = ({ data }) => (
        <Bar
            data={{
                labels: data.map((quiz, index) => `Quiz ${index + 1}`),
                datasets: [{
                    label: 'Scores',
                    data: data.map(quiz => quiz.score),
                    backgroundColor: ['#2ecc71', '#3498db', '#9b59b6', '#e74c3c', '#f1c40f'], // Example colors
                    borderColor: '#2c3e50',
                    borderWidth: 2,
                    hoverBackgroundColor: '#2980b9',
                    hoverBorderColor: '#ecf0f1',
                    // Set the bar thickness
                    barThickness: data.length > 2 ? 40 : 70, // Adjust based on the number of scores
                    maxBarThickness: 70, // Maximum bar thickness
                }],
            }}
            options={{
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 1000,
                    easing: 'easeOutBounce',
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += context.raw; // Show the score
                                return label;
                            },
                        },
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        titleColor: '#ecf0f1',
                        bodyColor: '#ecf0f1',
                    },
                    datalabels: {
                        color: '#fff',
                        anchor: 'end',
                        align: 'end',
                        formatter: (value) => value, // Display the score
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 20, // Set max score to 20
                        title: {
                            display: true,
                            text: 'Scores',
                            color: '#333',
                            font: {
                                weight: 'bold',
                            },
                        },
                        ticks: {
                            color: '#333',
                        },
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Quizzes',
                            color: '#333',
                            font: {
                                weight: 'bold',
                            },
                        },
                        ticks: {
                            color: '#333',
                        },
                    },
                },
            }}
        />
    );

    const handleGenerateQuiz = async () => {
          setLoadingQuiz(true);  // Set loading to true when fetching starts
           
          setQuiz([]);
          setSelectedAnswers([]); // Reset selected answers
          setSubmitted(false); // Reset submitted status
          setScore(0); // Reset score
          setScoreMessage(''); // Reset score message

          fetch(`${baseurl}/Chat/generate`, {
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [
                        {
                            role: 'system',
                            content: JSON.stringify(Prompt2 + selectedCourse.title),
                        },
                    ],
                })
            })
            .then(response => response.json())
            .then(data => { 
                parseQuiz(data.response);
               
                setLoadingQuiz(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setErrorMessage('Failed to generate quiz: ');
                setLoadingQuiz(false);
            });
            console.log(JSON.stringify(Prompt2 + selectedCourse.title));
            setShowAnswers(false);
    };
    
    // Function to handle logout
    const handleLogout = () => {
        // Clear user data from local storage
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        // Redirect to login page (or home page)
        window.location.href = '/login'; // Change this to your login route
    };
  
    const parseQuiz = (quizString) => {
        try {
            const questionRegex = /<question>(.*?)<\/question>/g;
            const optionsRegex = /<option>(.*?)<\/option>/g;
            const correctAnswerRegex = /<correct_answers>(.*?)<\/correct_answers>/s;

            const questions = [...quizString.matchAll(questionRegex)].map(match => match[1].trim());
            const optionsArray = [];
            let match;

            while ((match = optionsRegex.exec(quizString)) !== null) {
                optionsArray.push(match[1].trim());
            }

            const correctAnswers = quizString.match(correctAnswerRegex)[1].trim().split('\n').map(answer => answer.split('. ')[1]);

            const parsedQuiz = questions.map((question, index) => ({
                question,
                options: optionsArray.slice(index * 4, (index + 1) * 4),
                correctAnswer: correctAnswers[index]
            }));

            setQuiz(parsedQuiz);
            console.log("Parsed Quiz Data:", quiz);
            setErrorMessage(null);  // Clear any previous error
        } catch (error) {
            setErrorMessage('Failed to parse quiz data. Please ensure the input format is correct.');
        }
    };
    

    const handleOptionSelect = (qIdx, oIdx) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [qIdx]: oIdx
        }));
    };

    const handleModuleClick = (module) => {
        setCurrentModule(module);
        if (module === 'viewCourses') {
            fetchUserCourses(); // Fetch courses only when clicking on "View My Courses"
        } else {
            setIsCreatingCourse(false);
            setErrorMessage('');
            setSelectedCourse(null); // Reset selected course when changing modules
        }
    };

    const handleCourseCreation = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        const userId = localStorage.getItem('userId');
        const courseData = {
            title: courseTitle,
            description: courseDescription,
            userId: userId,
            roadMap: null,
            progress: [],
            userQuizScores: [],
        };
    
        try {
            const response = await fetch(`${baseurl}/Course`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify(courseData),
            });
    
            setIsLoading(false);
    
            if (response.ok) {
                alert('Course created successfully!');
                setCourseTitle('');
                setCourseDescription('');
                setIsCreatingCourse(false);
                setErrorMessage('');
                await fetchUserCourses();  // assuming fetchUserCourses is an async function
                await fetchCourses();      // assuming fetchCourses is an async function
                console.log(courses);
                console.log(availableCourses);
            } else {
                const data = await response.json();
                throw new Error(data.message || 'Error creating course');
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Error:', error);
            setErrorMessage(error.message);
            alert('Failed to create course: ' + error.message);
        }
    };
    

    const saveScore = async (score, courseId) => {
        const payload = {
            // id: 0, // Assuming ID will be generated by the server or is not required
            score: score,
            courseId: courseId
        };
    
        try {
            const response = await fetch(`${baseurl}/UserQuizScore`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            console.log('Score saved successfully:', data);
        } catch (error) {
            console.error('Error saving score:', error);
        }
    };
    
    // const getScores = (CourseId) => {
    //     console.log(CourseId);  // Ensure CourseId is logged correctly
    //     setQuizScores([]);
    //     fetch(`${baseurl}/UserQuizScore/${CourseId}`, {
    //         headers: {
    //             'Authorization': 'Bearer ' + localStorage.getItem('token'),
    //         },
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data);  // Log the data after it's received
    //         setQuizScores(data);  // Set the quiz scores
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //         setErrorMessage('Failed to fetch quiz scores');  // Update error message
    //     });
    // };
    const getScores = async (CourseId) => {
        try {
            console.log(CourseId);  // Ensure CourseId is logged correctly
            setQuizScores([]);  // Clear previous scores
            const response = await fetch(`${baseurl}/UserQuizScore/${CourseId}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch quiz scores');  // Handle non-200 responses
            }
    
            const data = await response.json();
            console.log(data);  // Log the data after it's received
            setQuizScores(data);  // Set the quiz scores
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Failed to fetch quiz scores');  // Update error message
        }
    };
    
    

    const fetchUserCourses = async () => {
        setIsFetchingCourses(true);
        const userId = localStorage.getItem('userId');
    
        try {
            const response = await fetch(`${baseurl}/Course/user/${userId}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            });
    
            setIsFetchingCourses(false);
    
            if (response.ok) {
                const data = await response.json();
                setCourses(data);
                // setAvailableCourses(data) // Uncomment if needed later
            } else {
                throw new Error('Failed to fetch courses');
            }
        } catch (error) {
            setIsFetchingCourses(false);
            console.error('Error:', error);
            setErrorMessage(error.message);
            // alert('Failed to fetch courses: ' + error.message);
        }
    };
    

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if(userId!=null){
        fetchCourses();
        }
    }, []);

    useEffect(() => {
        const CourseId = localStorage.getItem('CourseId');
        if(CourseId!=null){
        fetchCourseDetails();
        }
    },[]);
    
    const fetchCourses = () => {
        
        const userId = localStorage.getItem('userId');
        fetch(`${baseurl}/Course/user/${userId}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        })
            .then(response => response.json())
            .then(data => setAvailableCourses(data))
            .catch(error => {
                console.error('Error:', error);
                setErrorMessage('Failed to fetch courses');
            });
    };
    // Fetch details of a specific course when clicked
    const fetchCourseDetails = (courseId) => {
        fetch(`${baseurl}/Course/${courseId}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch course details');
                }
            })
            .then(data => {
                setSelectedCourse(data); // Set selected course data
                if(courseId!=null){
                    getScores(courseId);
                }
                if (courseDetailsRef.current) {
                    courseDetailsRef.current.scrollIntoView({ behavior: 'smooth' });
                }
                // console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
                setErrorMessage(error.message);
                alert('Failed to fetch course details: ' + error.message);
            });
    };

    const handleGenerateRoadmap = () => {
        console.log(selectedCourse);
        if (selectedCourse.roadMap==null) {
            generateRoadmapWithAI(selectedCourse.id);
        } 
        setRoadmap(selectedCourse.roadMap);
        // setLoading(false);
    };
    
    // Function to update the roadmap for a course in the backend
    const updateRoadMap = async (courseId, roadmap) => {
        try {
            const apiUrl = `${baseurl}/Course/`+ courseId +`/updateroadmap`;

            const response = await fetch(apiUrl, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(roadmap.response), // Send the new roadmap content
            });

            if (!response.ok) {
                throw new Error(`Failed to update RoadMap. Status: ${response.status}`);
            }

            // const updatedCourse = await response.json(); // Assuming the response contains the updated course
            // setSelectedCourse(updatedCourse); // Update the selected course state with the new data
            console.log('RoadMap updated successfully:');

        } catch (error) {
            console.error('Error updating RoadMap:', error);
            setErrorMessage('Failed to update RoadMap: ' + error.message);
        }
    };

    const generateRoadmapWithAI = () => {
        setLoading(true);
        // console.log(Prompt + selectedCourse.description + goals);
        
        fetch(`${baseurl}/Chat/generate`, {
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [
                        {
                            role: 'system',
                            content: Prompt + selectedCourse.title + "\n" + selectedCourse.description + "\n" + goals,
                        },
                    ],
                }),
        })
        .then(response => response.json())
        .then(data => { 
            setRoadmap(data.response);
            // beautify(road);
            updateRoadMap(selectedCourse.id, data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error:', error);
            setErrorMessage('Failed to generate roadmap: ' + error.message);
            setLoading(false);
        });
    };
    
    const handleSubmitQuiz = (e) => {
        e.preventDefault();
        let totalScore = 0;
        console.log(selectedAnswers);
    
        // Mapping from index to corresponding answer letters
        const optionMapping = ['A', 'B', 'C', 'D'];
    
        quiz.forEach((question, qIdx) => {
            console.log(selectedAnswers[qIdx]); // Log selected answer index
            console.log(question.correctAnswer); // Log correct answer
    
            // Get the selected answer based on the index
            const selectedAnswer = selectedAnswers[qIdx] !== null ? optionMapping[selectedAnswers[qIdx]] : null;
    
            // Compare selected answer with the correct answer
            if (selectedAnswer === question.correctAnswer) {
                totalScore++;
            }
        });
    
        setScore(totalScore);
        setSubmitted(true);
        setScoreMessage(`You answered ${totalScore} out of ${quiz.length} questions correctly.`);
        saveScore(totalScore, selectedCourseId);
    };
    
    const [performanceData, setPerformanceData] = useState(null);

    const messagesEndRef = useRef(null);
    // Handle sending messages to the chatbot
    const scrollToBottom = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    };
    const handleSendMessage = async () => {
        
        if (!userInput.trim()) return;
    
        // Append user message to chat history
        setChatHistory((prev) => [...prev, { role: 'user', content: userInput }]);
    
        try {
            const response = await fetch(`${baseurl}/Chat/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [
                        {
                            role: 'user',
                            content: userInput,
                        },
                    ],
                }),
            });
    
            const data = await response.json();
            // console.log('API Response:', data); // Log the response for debugging
    
            // Access the response field
            const botReply = data.response; // Access the response string
    
            if (botReply) {
                // Append AI response to chat history
                setChatHistory((prev) => [
                    ...prev,
                    { role: 'bot', content: botReply },
                ]);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setErrorMessage('Error communicating with the chatbot.');
        } finally {
            // Clear the input field
            setUserInput('');
        }
    };
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [chatHistory]);

    useEffect(() => {
        // Example of when you might want to scroll
        // if (courseDetailsRef.current) {
            scrollToBottom(); // Scroll to bottom when course details are rendered
        // }
    }, [courseDetailsRef]);

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                {/* <h2 className="sidebar-header">Modules</h2> */}
                <ul className="sidebar-menu">
                    <li className="sidebar-item" onClick={() => handleModuleClick('dashboard')}>Dashboard</li>
                    <li className="sidebar-item" onClick={() => handleModuleClick('courses')}>Create Course</li>
                    <li className="sidebar-item" onClick={() => handleModuleClick('viewCourses')}>View My Courses</li>
                    <li className="sidebar-item" onClick={() => handleModuleClick('Roadmap')}>RoadMap Creator</li>
                    <li className="sidebar-item" onClick={() => handleModuleClick('SkillSage')}>SkillSage</li>
                    <li className="sidebar-item" onClick={() => handleModuleClick('Quizzify')}>Quizzify</li>
                    
                </ul>
                {/* Logout Button */}
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
                </div>
                    <div className="content">
                        {currentModule === 'dashboard' && (
                            <div style={{
                                padding: '20px',
                                backgroundColor: '#e7f2f8', // Soft blue background
                                borderRadius: '10px',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                                maxWidth: '800px',
                                margin: '0 auto'
                            }}>
                                <h1 style={{
                                    fontSize: '2.5em',
                                    color: '#2c3e50', // Darker text for contrast
                                    textAlign: 'center',
                                    marginBottom: '20px'
                                }}>Welcome to SkillLink!</h1>
                                
                                <p style={{
                                    fontSize: '1.2em',
                                    color: '#34495e', // Slightly lighter dark color
                                    textAlign: 'center',
                                    marginBottom: '30px'
                                }}>
                                    SkillLink empowers you to create and manage your own courses in any field of your choice.
                                    With SkillLink, you have the flexibility to design a comprehensive learning experience tailored to your needs.
                                </p>

                                <div style={{
                                    backgroundColor: '#ffffff', // White background for clarity
                                    borderRadius: '8px',
                                    padding: '20px',
                                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                                    marginBottom: '30px'
                                }}>
                                    <h2 style={{
                                        fontSize: '1.8em',
                                        color: '#2980b9', // Blue color for headers
                                        marginBottom: '15px'
                                    }}>How to Use SkillLink</h2>
                                    <ul style={{
                                        listStyleType: 'none',
                                        padding: '0'
                                    }}>
                                        <li style={{ marginBottom: '10px' }}>
                                            <strong>Create Your Course:</strong> Easily create courses on any topic or field. Define the course structure and content that best suits your audience.
                                        </li>
                                        <li style={{ marginBottom: '10px' }}>
                                            <strong>Design a Roadmap:</strong> Generate a detailed roadmap that guides learners through the course, ensuring a structured and effective learning journey.
                                        </li>
                                        <li style={{ marginBottom: '10px' }}>
                                            <strong>Interactive Quizzes:</strong> Create quizzes that assess learners' understanding and retention of the material. Make learning engaging and interactive!
                                        </li>
                                        <li style={{ marginBottom: '10px' }}>
                                            <strong>Q&A Sessions:</strong> Utilize the Q&A feature to facilitate communication between you and your learners, allowing them to ask questions and receive tailored answers.
                                        </li>
                                    </ul>
                                </div>

                                <div style={{
                                    backgroundColor: '#ffffff', // White background for clarity
                                    borderRadius: '8px',
                                    padding: '20px',
                                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                                }}>
                                    <h2 style={{
                                        fontSize: '1.8em',
                                        color: '#2980b9', // Blue color for headers
                                        marginBottom: '15px'
                                    }}>Your Learning Journey</h2>
                                    <p style={{
                                        fontSize: '1em',
                                        color: '#7f8c8d' // Grey text for softer tone
                                    }}>
                                        Track your course progress, quiz performance, and engagement with the content. SkillLink provides you with insights to enhance your learning experience.
                                    </p>
                                </div>
                            </div>
                        )}
                        {currentModule === 'courses' && (
                            <div className="course-creation">
                                <h1>Create a New Course</h1>
                                <button className="toggle-create-course-btn" onClick={() => setIsCreatingCourse(!isCreatingCourse)}>
                                    {isCreatingCourse ? 'Cancel' : 'Create New Course'}
                                </button>
                                {isCreatingCourse && (
                                    <form onSubmit={handleCourseCreation} className="course-form">
                                        <label htmlFor="course-title">Course Title:</label>
                                        <input
                                            type="text"
                                            id="course-title"
                                            value={courseTitle}
                                            onChange={(e) => setCourseTitle(e.target.value)}
                                            required
                                            disabled={isLoading}
                                            className="input-field"
                                        />

                                        <label htmlFor="course-description">Description:</label>
                                        <textarea
                                            id="course-description"
                                            value={courseDescription}
                                            onChange={(e) => setCourseDescription(e.target.value)}
                                            required
                                            disabled={isLoading}
                                            className="input-field"
                                        />

                                        <button type="submit" disabled={isLoading} className="submit-button">
                                            {isLoading ? 'Creating...' : 'Create Course'}
                                        </button>
                                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                                    </form>
                                )}
                            </div>
                        )}
                        {currentModule === 'viewCourses' && (
                            <div style={{
                                padding: '20px',
                                backgroundColor: '#f9f9f9',
                                borderRadius: '8px',
                                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                            }}>
                                <h1 style={{
                                    fontSize: '2em',
                                    color: '#333',
                                    marginBottom: '20px'
                                }}>
                                    Your Courses
                                </h1>
                                {isFetchingCourses ? (
                                    <p>Loading courses...</p>
                                ) : (
                                    <ul style={{
                                        listStyleType: 'none',
                                        padding: '0',
                                        margin: '0'
                                    }} className="course-list">
                                        {courses.length === 0 ? (
                                            <li>No courses found.</li>
                                        ) : (
                                            courses.map((course) => (
                                                <li key={course.id} onClick={() => fetchCourseDetails(course.id)} style={{
                                                    padding: '15px',
                                                    margin: '10px 0',
                                                    backgroundColor: '#fff',
                                                    border: '1px solid #ddd',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                    transition: 'background-color 0.3s ease'
                                                }} className="course-item"
                                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                                                    {course.title}
                                                </li>
                                            ))
                                        )}
                                    </ul>
                                )}
                                {selectedCourse && (
                                    <div ref={courseDetailsRef} style={{
                                        marginTop: '20px',
                                        padding: '15px',
                                        backgroundColor: '#fff',
                                        border: '1px solid #ddd',
                                        borderRadius: '5px',
                                        boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)'
                                    }} className="course-details">
                                        <h2 style={{
                                            fontSize: '1.5em',
                                            color: '#555',
                                            marginBottom: '10px'
                                        }}>
                                            {selectedCourse.title}
                                        </h2>
                                        <p style={{
                                            fontSize: '1em',
                                            color: '#666'
                                        }}>
                                            {selectedCourse.description}
                                        </p>

                                        <div style={{ padding: '20px' }}>
                                            <h2>Quiz Scores</h2>
                                            {isFetchingCourses ? (
                                                <p>Loading quiz scores...</p>
                                            ) : quizScores.length > 0 ? (
                                                <div style={{ height: '400px' }}> {/* Adjust height as needed */}
                                                    <BarChart data={quizScores} />
                                                </div>
                                            ) : (
                                                <p>No quiz scores available.</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        {currentModule === 'Roadmap' && (
                          
                        <div>
                        <h1>Generate Course Roadmap</h1>
            
                        {/* Display course options */}
                        <div>
                            <h3>Select a Course:</h3>
                            <select 
                                value={selectedCourseId}  // This ensures the selected course is displayed
                                onChange={(e) => {
                                    setSelectedCourseId(e.target.value);  // Update the selectedCourseId
                                    fetchCourseDetails(e.target.value);  // Fetch the course details
                                }} 
                                style={{ padding: '10px', fontSize: '16px' }}
                            >
                                <option value="">--Select a Course--</option>  {/* Default option */}
                                {availableCourses.map(course => (
                                    <option key={course.id} value={course.id}>
                                        {course.title}  {/* Display course name */}
                                    </option>
                                ))}
                            </select>
                        </div>

            
                        {/* Display selected course details */}
                        {selectedCourse && (
                            <div style={{ marginTop: '20px' }}>
                                <h2>{selectedCourse.name}</h2>
                                <p><strong>Description:</strong> {selectedCourse.description}</p>
            
                                {/* Input for user to add goals */}
                                <div>
                                    <label htmlFor="course-goals"><strong>Goals:</strong></label>
                                    <textarea
                                        id="course-goals"
                                        value={goals}
                                        onChange={(e) => setGoals(e.target.value)}
                                        placeholder="Enter course goals here..."
                                        rows="4"
                                        style={{
                                            width: '100%',
                                            padding: '10px',
                                            fontSize: '16px',
                                            marginTop: '10px',
                                            borderRadius: '5px',
                                            border: '1px solid #ddd',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
            
                                {/* Button to generate roadmap */}
                                <button onClick={handleGenerateRoadmap} disabled={loading} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
                                    {loading ? 'Generating...' : 'Generate Roadmap'}
                                </button>
                               
                            </div>
                        )}
             
                        {/* Display roadmap if available */}
                        {roadmap && (
                            <div style={{ marginTop: '20px', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
                                <h3 style={{ textAlign: 'center', color: '#007bff' }}>Course Roadmap:</h3>
                                
                                {/* Check if roadmap is a string */}
                                {typeof roadmap === 'string' ? (
                                    <div style={{ whiteSpace: 'pre-line' }}>
                                        {roadmap
                                            .replace(/<title>/g, '')  // Convert title to a markdown-like header
                                            .replace(/<\/title>/g, '')  // Remove closing title tag
                                            .replace(/<module>/g, '\n')  // Convert module to a subheader
                                            .replace(/<topics>/g, 'Topics:\n ')  // Start list for topics
                                            .replace(/<\/topics>/g, '')  // Remove closing tag
                                            .replace(/<resources>/g, 'Resources:\n ')  // Start list for resources
                                            .replace(/<\/resources>/g, '')  // Remove closing tag
                                            .replace(/<activities>/g, 'Activities:\n ')  // Start list for activities
                                            .replace(/<\/activities>/g, '')  // Remove closing tag
                                            .replace(/<assessment>/g, 'Assessment:\n ')  // Start list for assessment
                                            .replace(/<\/assessment>/g, '')  // Remove closing tag
                                            .replace(/<timeline>/g, 'Timeline: ')  // Convert timeline to a header
                                            .replace(/<\/timeline>/g, '')  // Remove closing tag
                                            .replace(/<\/module>/g, '\n')  // Add space between modules
                                            .replace(/<expected_outcomes>/g, 'Expected Outcomes\n- ') // Convert expected outcomes to a header
                                            .replace(/<\/expected_outcomes>/g, '') // Remove closing tag
                                            .replace(/\n\s-\s+/g, '\n ') // Normalize bullet points
                                            .trim()  // Remove leading/trailing whitespace
                                        }
                                    </div>
                                ) : (
                                    // If it's an object, render key-value pairs
                                    <div>
                                        {Object.keys(roadmap).map((key) => (
                                            <div key={key}>
                                                <strong>{key}: </strong>{roadmap[key].toString()}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                        {/* Display error message if exists */}
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    </div>
                        )}
                        {currentModule === 'SkillSage' && (
                        <div className="chat-container" style={{
                            width: '100%',
                            maxWidth: '600px',
                            margin: '0 auto',
                            padding: '20px',
                            borderRadius: '10px',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                            backgroundColor: '#f9f9f9'
                        }}>
                            <h1 style={{
                                textAlign: 'center',
                                marginBottom: '20px',
                                color: '#333',
                                fontSize: '24px'
                            }}>Chat with Your AI Assistant</h1>

                            <div className="chat-box" style={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '400px',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                backgroundColor: '#fff',
                                boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)'
                            }}>
                                <div className="chat-messages" style={{
                                    flexGrow: 1,
                                    padding: '10px',
                                    overflowY: 'auto', // Allow vertical scrolling
                                    borderBottom: '1px solid #ddd',
                                    scrollbarWidth: 'none', // Hide scrollbar for Firefox
                                    msOverflowStyle: 'none', // Hide scrollbar for IE and Edge
                                }}>
                                    {chatHistory.map((message, index) => (
                                        <div key={index} className={`chat-message ${message.role}`} style={{
                                            display: 'flex',
                                            justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                                            marginBottom: '10px'
                                        }}>
                                            {message.role === 'user' ? (
                                                <div className="user-message" style={{
                                                    backgroundColor: '#d1e7ff',
                                                    color: '#333',
                                                    padding: '10px',
                                                    borderRadius: '10px',
                                                    maxWidth: '70%'
                                                }}>
                                                    {message.content}
                                                </div>
                                            ) : (
                                                <div className="ai-message" style={{
                                                    backgroundColor: '#e1e1e1',
                                                    color: '#333',
                                                    padding: '10px',
                                                    borderRadius: '10px',
                                                    maxWidth: '70%'
                                                }}>
                                                    {message.content}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>

                                <input
                                    type="text"
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Type your message here..."
                                    className="chat-input"
                                    style={{
                                        padding: '10px',
                                        border: 'none',
                                        borderTop: '1px solid #ddd',
                                        borderRadius: '0 0 8px 8px',
                                        outline: 'none',
                                        fontSize: '16px'
                                    }}
                                />
                            </div>

                            <button 
                                onClick={handleSendMessage} 
                                className="send-button" 
                                style={{
                                    marginTop: '10px',
                                    width: '100%',
                                    padding: '12px',
                                    backgroundColor: '#007bff',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                    outline: 'none',
                                    transition: 'background-color 0.3s ease'
                                }}
                            > 
                            Send</button>
                        </div>
                        )}
                        {currentModule === 'Quizzify' && (
                            
                            <div style={{ padding: '20px', background: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
                                <h1 style={{ textAlign: 'center', color: '#333' }}>Generate Course Quiz</h1>

                                {/* Display course options */}
                                <div style={{ marginBottom: '20px' }}>
                                    <h3>Select a Course:</h3>
                                    <select 
                                        value={selectedCourseId}  // This ensures the selected course is displayed
                                        onChange={(e) => {
                                            setSelectedCourseId(e.target.value);  // Update the selectedCourseId
                                            fetchCourseDetails(e.target.value);  // Fetch the course details
                                        }} 
                                        style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
                                    >
                                        <option value="">--Select a Course--</option>  {/* Default option */}
                                        {availableCourses.map(course => (
                                            <option key={course.id} value={course.id}>
                                                {course.title}  {/* Display course name */}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Display selected course details */}
                                {selectedCourse && (
                                    <div style={{ marginTop: '20px' }}>
                                        <h2 style={{ color: '#007bff' }}>{selectedCourse.name}</h2>
                                        {/* Button to generate quiz */}
                                        <button onClick={handleGenerateQuiz} disabled={loadingQuiz} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
                                            {loadingQuiz ? 'Generating...' : 'Generate Quiz'}
                                        </button>
                                    </div>
                                )}

                                {/* Display quiz if available */}
                                {quiz && (
                                    <div style={{ marginTop: '20px', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
                                        {/* Render the quiz questions */}
                                        {Array.isArray(quiz) && quiz.length > 0 ? (
                                            <form onSubmit={handleSubmitQuiz}>
                                                {quiz.map((question, qIdx) => (
                                                    <div key={qIdx} style={{ marginBottom: '20px' }}>
                                                        <h3 style={{ color: '#333' }}>{`Q${qIdx + 1}: ${question.question}`}</h3>
                                                        {question.options.map((option, oIdx) => (
                                                            <div key={oIdx} style={{ display: 'flex', alignItems: 'center' }}>
                                                                <input
                                                                    type="radio"
                                                                    id={`q${qIdx}o${oIdx}`}
                                                                    name={`question${qIdx}`}
                                                                    value={oIdx}
                                                                    onChange={() => handleOptionSelect(qIdx, oIdx)}
                                                                    checked={selectedAnswers[qIdx] === oIdx}
                                                                    style={{ marginRight: '5px' }}  // Adjust the margin to control spacing
                                                                />
                                                                <label htmlFor={`q${qIdx}o${oIdx}`} style={{ margin: 0 }}>{option}</label> {/* Remove margin for label */}
                                                            </div>
                                                        ))}
                                                    </div>
                                                ))}
                                                <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '4px', backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer', display: submitted ? 'none' : 'inline-block' }}>
                                                    Submit Quiz
                                                </button>
                                            </form>
                                        ) : null}
                                    </div>
                                )}

                                {/* Display score after submission */}
                                {submitted && (
                                    <div style={{ marginTop: '20px', padding: '20px', background: '#f0f8ff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
                                        <h2>Your Score: {score}/{quiz.length}</h2>
                                        <p>{scoreMessage}</p>
                                    </div>
                                )}

                                {submitted && (
                                    <div style={{ marginTop: '20px', padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
                                        <button onClick={() => setShowAnswers(!showAnswers)} style={{ padding: '10px 20px', fontSize: '16px', marginTop: '10px' }}>
                                            {showAnswers ? 'Hide Answers' : 'View Answers'}
                                        </button>

                                        {/* Display correct answers if showAnswers is true */}
                                        {showAnswers && (
                                            <div style={{ marginTop: '20px' }}>
                                                <h3>Correct Answers:</h3>
                                                <ul>
                                                    {quiz.map((question, qIdx) => (
                                                        <li key={qIdx}>
                                                            <strong>{`Q${qIdx + 1}: ${question.question}`}</strong><br />
                                                            <span>{`Correct Answer: ${question.correctAnswer}`}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Display error message if exists */}
                                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                            </div>
                        )}
                    </div>
                </div>
    );
}

export default Dashboard;
