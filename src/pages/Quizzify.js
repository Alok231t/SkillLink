import React, { useState } from 'react';

const Quizzify = ({ availableCourses, fetchCourseDetails }) => {
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleGenerateQuiz = () => {
        setLoading(true);
        // Logic to generate the quiz
        // Set loading to false once done
        setLoading(false);
    };

    return (
        <div>
            <h1>Generate Course Quiz</h1>
            <div>
                <h3>Select a Course:</h3>
                <select 
                    value={selectedCourseId}  
                    onChange={(e) => {
                        setSelectedCourseId(e.target.value);  
                        fetchCourseDetails(e.target.value);  
                    }} 
                    style={{ padding: '10px', fontSize: '16px' }}
                >
                    <option value="">--Select a Course--</option>
                    {availableCourses.map(course => (
                        <option key={course.id} value={course.id}>
                            {course.title}
                        </option>
                    ))}
                </select>
            </div>
            {selectedCourse && (
                <div style={{ marginTop: '20px' }}>
                    <h2>{selectedCourse.name}</h2>
                    <p><strong>Description:</strong> {selectedCourse.description}</p>
                    <button onClick={handleGenerateQuiz} disabled={loading} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
                        {loading ? 'Generating...' : 'Generate Quiz'}
                    </button>
                </div>
            )}

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default Quizzify;
