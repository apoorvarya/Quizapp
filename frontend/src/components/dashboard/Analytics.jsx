import Sidebar from './Sidebar'
import './QuizAnalysis.css';
import { FaTrashAlt, FaPen, FaShareAlt } from 'react-icons/fa';

const data = [
  {
    id: 1,
    name: "Quiz 1",
    createdOn: "01 Sep, 2023",
    impression: "345"
  },
  {
    id: 2,
    name: "Quiz 2",
    createdOn: "04 Sep, 2023",
    impression: "667"
  },
  {
    id: 3,
    name: "Quiz 3",
    createdOn: "06 Sep, 2023",
    impression: "1.6K"
  },
  {
    id: 4,
    name: "Quiz 4",
    createdOn: "09 Sep, 2023",
    impression: "789"
  },
  {
    id: 5,
    name: "Quiz 5",
    createdOn: "11 Sep, 2023",
    impression: "995"
  },
  {
    id: 6,
    name: "Quiz 6",
    createdOn: "13 Sep, 2023",
    impression: "2.5K"
  },
  {
    id: 7,
    name: "Quiz 7",
    createdOn: "14 Sep, 2023",
    impression: "231"
  },
  {
    id: 8,
    name: "Quiz 8",
    createdOn: "17 Sep, 2023",
    impression: "1.3K"
  }
];

const Analytics = () => {
  return (
    <>
    <div className="parentComponent">
    <Sidebar />
    <div className="quiz-analysis-container">
      <h1>Quiz Analysis</h1>
      <table className="quiz-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Quiz Name</th>
            <th>Created on</th>
            <th>Impression</th>
            <th>Actions</th>
            <th>Analysis</th>
          </tr>
        </thead>
        <tbody>
          {data.map((quiz, index) => (
            <tr key={quiz.id}>
              <td>{index + 1}</td>
              <td>{quiz.name}</td>
              <td>{quiz.createdOn}</td>
              <td>{quiz.impression}</td>
              <td>
                <FaPen className="icon1" />
                <FaTrashAlt className="icon2" />
                <FaShareAlt className="icon3" />
              </td>
              <td>
                <a href="#">Question Wise Analysis</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </>
  )
}

export default Analytics