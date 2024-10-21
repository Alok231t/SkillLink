import React , {useState} from 'react';

const Roadmap = () => {

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

    // State management
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedCourse, setSelectedCourse] = useState(null); // State for selected course details
    const [availableCourses, setAvailableCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(''); // Track selected course Id
    const [roadmap, setRoadmap] = useState(null);
    const [goals, setGoals] = useState(''); // User input for goals
    const [loading, setLoading] = useState(false);

    const fetchCourseDetails = (courseId) => {
        fetch(`http://localhost:5156/api/Course/${courseId}`, {
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
            const apiUrl = 'http://localhost:5156/api/Course/'+ courseId +'/updateroadmap';

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
        
        fetch('http://localhost:5156/api/Chat/generate', {
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [
                        {
                            role: 'system',
                            content: Prompt + selectedCourse.name + "\n" + selectedCourse.description + "\n" + goals,
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

    const fetchCourses = () => {
        fetch('http://localhost:5156/api/Course', {
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
    
    return (
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
    );
};

export default Roadmap;

 