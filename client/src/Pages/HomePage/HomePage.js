import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Assuming you have a separate CSS file for styling
import Header from '../../Compontents/Header/Header';
import Footer from '../../Compontents/Footer/Footer';
const Home = () => {
  return (
    <div>
<Header/>
   
    <div className="home-container">
      {/* Header Section */}
     

      {/* Main Content Section */}
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero">
          <h1>Welcome to the Task Manager App!</h1>
          <p>Stay organized, manage your tasks efficiently, and boost productivity with ease.</p>
          <Link to="/tasks" className="cta-button">Create a Task</Link>
        </section>

        {/* Features Section */}
        <section className="features">
          <h2>Key Features</h2>
          <ul>
            <li><strong>Task Creation & Management:</strong> Add new tasks, set deadlines, and prioritize.</li>
            <li><strong>Progress Tracking:</strong> View tasks by status (Backlog, Pending, In Progress, Completed).</li>
            <li><strong>User Collaboration:</strong> Share tasks with team members.</li>
            <li><strong>Task Analytics:</strong> View detailed analytics on completed tasks, deadlines, etc.</li>
          </ul>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works">
          <h2>How It Works</h2>
          <ol>
            <li>Create tasks by entering the title, priority, and due date.</li>
            <li>Assign tasks to team members and set deadlines.</li>
            <li>Track your progress by viewing tasks in different stages of completion.</li>
          </ol>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials">
          <h2>What Our Users Say</h2>
          <div className="testimonial">
            <p>"I’ve never been more organized. The app helps me track my tasks and deadlines with ease!"</p>
            <span>- User A</span>
          </div>
          <div className="testimonial">
            <p>"Collaborating with my team has never been so easy. Highly recommended!"</p>
            <span>- User B</span>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <h2>Join Thousands of Users Who Have Transformed Task Management</h2>
          <Link to="/signup" className="cta-button">Get Started Now</Link>
        </section>
      </main>

      
     
    </div>
    {/* Footer Section */}
  <Footer/>
    </div>
  );
}

export default Home;
