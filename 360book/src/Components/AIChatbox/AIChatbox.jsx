import React, { useState, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import logo from '../../assets/BGSEARCH.png';
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
    const [isMinimized, setIsMinimized] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
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

    const toggleMinimize = () => {
        setIsMinimized(!isMinimized);
        if (isExpanded) setIsExpanded(false);
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
        if (isMinimized) setIsMinimized(false);
    };

    const clearChat = () => {
        setMessages([]);
    };

    if (isMinimized) {
        return (
            <div className="chatbox-minimized">
                <div className="chatbox-minimized-header">
                    <div className="chatbox-minimized-title">
                        <span className="ai-avatar">🤖</span>
                        <span>Tư vấn tuyển sinh</span>
                    </div>
                    <div className="chatbox-minimized-controls">
                        <button
                            className="control-btn expand-btn"
                            onClick={toggleMinimize}
                            title="Mở rộng"
                        >
                            ⬆️
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`chatbox-container ${isExpanded ? 'expanded' : ''}`}>
            <div className="chatbox-header">
                <div className="chatbox-header-left">
                    <span className="ai-avatar">🤖</span>
                    <div className="chatbox-title">
                        <h3>Tư vấn tuyển sinh 360BOOK</h3>
                        <span className="status-indicator">
                            <span className="online-dot"></span>
                            Đang hoạt động
                        </span>
                    </div>
                </div>
                <div className="chatbox-controls">
                    <button
                        className="control-btn clear-btn"
                        onClick={clearChat}
                        title="Xóa chat"
                    >
                        🗑️
                    </button>
                    <button
                        className="control-btn expand-btn"
                        onClick={toggleExpand}
                        title={isExpanded ? "Thu nhỏ" : "Mở rộng"}
                    >
                        {isExpanded ? '⤓' : '⤢'}
                    </button>
                    <button
                        className="control-btn minimize-btn"
                        onClick={toggleMinimize}
                        title="Thu nhỏ"
                    >
                        ⬇️
                    </button>
                </div>
            </div>

            <div className="chatbox-messages">
                {messages.length === 0 ? (
                    <div className="chatbox-welcome">
                        <div className="welcome-icon">
                            <img src={logo} alt="360BOOK Logo" />
                        </div>
                        <h4>Chào mừng bạn đến với 360BOOK!</h4>
                        <p>Tôi là trợ lý AI, sẵn sàng tư vấn về tuyển sinh đại học</p>
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
                    </div>
                ) : (
                    messages.map((message, index) => (
                        <div key={index} className={`message ${message.sender}`}>
                            <div className="message-avatar">
                                {message.sender === 'user' ? '👤' : '🤖'}
                            </div>
                            <div className="message-content">
                                {message.text}
                            </div>
                        </div>
                    ))
                )}
                {isLoading && (
                    <div className="message ai">
                        <div className="message-avatar">🤖</div>
                        <div className="message-content">
                            <div className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={sendMessage} className="chatbox-input">
                <div className="input-wrapper">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Hãy đặt câu hỏi về tuyển sinh..."
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading || !input.trim()}>
                        <span className="send-icon">📤</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AIChatbox;