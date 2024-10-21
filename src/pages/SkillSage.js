import React , {useState ,useEffect, useRef} from 'react';

const SkillSage = () => {
    const [chatHistory, setChatHistory] = useState([]);
    const [userInput, setUserInput] = useState('');
    const messagesEndRef = useRef(null);

    
    const handleSendMessage = async () => {
        
        if (!userInput.trim()) return;
    
        // Append user message to chat history
        setChatHistory((prev) => [...prev, { role: 'user', content: userInput }]);
    
        try {
            const response = await fetch('http://localhost:5156/api/Chat/generate', {
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
            // setErrorMessage('Error communicating with the chatbot.');
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
    return (
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
    );
};

export default SkillSage;
