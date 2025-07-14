import React, { useState, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './AIChatbox.css';

// Initialize the AI model
const genAI = new GoogleGenerativeAI('AIzaSyAZGrz0DTRkDA3yWHXA1K_lRXmDw-RDOfU');
const model = genAI.getGenerativeModel({
    model: "gemini-pro",
    generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40
    }
});

// Chat history context to maintain conversation flow
const chat = model.startChat({
    history: [
        {
            role: "user",
            parts: [{
                text: "Bạn là tư vấn viên tuyển sinh của 360BOOK. Hãy trả lời các câu hỏi liên quan đến tuyển sinh đại học tại Việt Nam."
            }]
        },
        {
            role: "model",
            parts: [{
                text: "Tôi hiểu rồi. Tôi sẽ giúp tư vấn về tuyển sinh đại học tại Việt Nam."
            }]
        }
    ]
});

const AIChatbox = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false); 

    const suggestedQuestions = [
        "Tổ hợp môn nào phù hợp với ngành CNTT?",
        "Điểm chuẩn các trường top đầu năm 2023?",
        "Cách tính điểm xét tuyển như thế nào?",
        "Nên chọn trường nào với điểm số của tôi?",
    ];

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // Send message to chat and get response
            const result = await chat.sendMessage([{
                role: "user",
                parts: [{ text: input }]
            }]);
            const response = await result.response;
            const aiMessage = { text: response.text(), sender: 'ai' };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage = {
                text: "Xin lỗi, bạn có thể đặt câu hỏi theo cách khác được không?",
                sender: 'ai'
            };
            setMessages(prev => [...prev, errorMessage]);
        }

        setIsLoading(false);
    };

    const handleSuggestedQuestion = async (question) => {
        setInput(question);
        await sendMessage({ preventDefault: () => { } });
    };

    return (
        <div className={`chatbox-container ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="chatbox-header">
                <h3>Tư vấn tuyển sinh 360BOOK</h3>
                <button className="toggle-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
                    {isCollapsed ? '🔼 Mở rộng' : '🔽 Thu nhỏ'}
                </button>
            </div>

            {!isCollapsed && (
                <>
                    <div className="suggested-questions">
                        <p>Câu hỏi gợi ý:</p>
                        <div className="question-buttons">
                            {suggestedQuestions.map((question, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSuggestedQuestion(question)}
                                    className="suggestion-btn"
                                    disabled={isLoading}
                                >
                                    {question}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="chatbox-messages">
                        {messages.map((message, index) => (
                            <div key={index} className={`message ${message.sender}`}>
                                <div className="message-content">
                                    {message.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="message ai">
                                <div className="message-content">
                                    <div className="typing-indicator">
                                        <span></span><span></span><span></span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <form onSubmit={sendMessage} className="chatbox-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Hãy đặt câu hỏi về tuyển sinh..."
                            disabled={isLoading}
                        />
                        <button type="submit" disabled={isLoading}>
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </form>
                </>
            )}
        </div>
    );
};

export default AIChatbox;