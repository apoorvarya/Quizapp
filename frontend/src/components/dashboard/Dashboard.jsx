import './dashboard.css'
import Sidebar from './Sidebar';

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Header />
        <TrendingQuizzes />
      </div>
    </div>
  );
}


const Header = () => {
  return (
    <div className="header">
      <div className="stat">
        <h3>12 Quiz</h3>
        <p className='p1'>Created</p>
      </div>
      <div className="stat">
        <h3>110</h3>
        <p className='p2'>questions Created</p>
      </div>
      <div className="stat">
        <h3>1.4K Total</h3>
        <p className='p3'> Impressions</p>
      </div>
    </div>
  );
};

const TrendingQuizzes = () => {
  return (
    <div className="trending-quizzes">
      <h4>Trending Quizzes</h4>
      <div className="quiz-list">
        {Array(12).fill(0).map((_, index) => (
          <div key={index} className="quiz-item">

            <span>Quiz 1 667 <span role="img" aria-label="fire">🔥</span></span>
            <p> <span role="img" aria-label="eye"></span></p>
            <p>Created on: 04 Sep,2023</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;