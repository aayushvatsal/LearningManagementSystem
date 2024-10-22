import React, { useState } from 'react';
import { FaUser, FaReply, FaThumbsUp, FaEdit, FaTrash } from 'react-icons/fa';
import styles from '../../../Styles/Discussion.module.css';

const DiscussionComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    if (newQuestion.trim() !== '') {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setQuestions([
          ...questions,
          { id: Date.now(), text: newQuestion, replies: [], likes: 0 }
        ]);
        setNewQuestion('');
        setLoading(false);
      }, 500);
    }
  };

  const handleReply = (questionId, replyText) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { ...q, replies: [...q.replies, { id: Date.now(), text: replyText }] }
        : q
    ));
  };

  const handleLike = (questionId) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { ...q, likes: q.likes + 1 }
        : q
    ));
  };

  const handleEdit = (questionId) => {
    const newText = prompt('Edit your question:');
    if (newText) {
      setQuestions(questions.map(q => 
        q.id === questionId 
          ? { ...q, text: newText }
          : q
      ));
    }
  };

  const handleDelete = (questionId) => {
    setQuestions(questions.filter(q => q.id !== questionId));
  };

  return (
    <div className={styles.discussionContainer}>
      <h2 className={styles.title}>Discussion Forum</h2>
      <form onSubmit={handleQuestionSubmit} className={styles.questionForm}>
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Ask a question..."
          className={styles.questionInput}
        />
        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Posting...' : 'Ask Question'}
        </button>
      </form>
      <div className={styles.questionsList}>
        {questions.length === 0 && <p className={styles.noQuestions}>No questions yet. Be the first to ask!</p>}
        {questions.map(question => (
          <div key={question.id} className={styles.questionItem}>
            <div className={styles.questionHeader}>
              <FaUser className={styles.userIcon} />
              <p className={styles.questionText}>{question.text}</p>
              <div className={styles.questionActions}>
                <button onClick={() => handleEdit(question.id)} className={styles.editButton}>
                  <FaEdit /> Edit
                </button>
                <button onClick={() => handleDelete(question.id)} className={styles.deleteButton}>
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
            <div className={styles.questionActions}>
              <button onClick={() => handleLike(question.id)} className={styles.likeButton}>
                <FaThumbsUp /> {question.likes}
              </button>
              <button onClick={() => {
                const replyText = prompt('Enter your reply:');
                if (replyText) handleReply(question.id, replyText);
              }} className={styles.replyButton}>
                <FaReply /> Reply
              </button>
            </div>
            <div className={styles.repliesList}>
              {question.replies.length === 0 && <p className={styles.noReplies}>No replies yet.</p>}
              {question.replies.map(reply => (
                <div key={reply.id} className={styles.replyItem}>
                  <FaUser className={styles.userIcon} />
                  <p className={styles.replyText}>{reply.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscussionComponent;
