// import Sidebar from './Sidebar'
// import './QuizAnalysis.css';
// import { FaTrashAlt, FaPen, FaShareAlt } from 'react-icons/fa';

// const data = [
//   {
//     id: 1,
//     name: "Quiz 1",
//     createdOn: "01 Sep, 2023",
//     impression: "345"
//   },
//   {
//     id: 2,
//     name: "Quiz 2",
//     createdOn: "04 Sep, 2023",
//     impression: "667"
//   },
//   {
//     id: 3,
//     name: "Quiz 3",
//     createdOn: "06 Sep, 2023",
//     impression: "1.6K"
//   },
//   {
//     id: 4,
//     name: "Quiz 4",
//     createdOn: "09 Sep, 2023",
//     impression: "789"
//   },
//   {
//     id: 5,
//     name: "Quiz 5",
//     createdOn: "11 Sep, 2023",
//     impression: "995"
//   },
//   {
//     id: 6,
//     name: "Quiz 6",
//     createdOn: "13 Sep, 2023",
//     impression: "2.5K"
//   },
//   {
//     id: 7,
//     name: "Quiz 7",
//     createdOn: "14 Sep, 2023",
//     impression: "231"
//   },
//   {
//     id: 8,
//     name: "Quiz 8",
//     createdOn: "17 Sep, 2023",
//     impression: "1.3K"
//   }
// ];

// const Analytics = () => {
//   return (
//     <>
//     <div className="parentComponent">
//     <Sidebar />
//     <div className="quiz-analysis-container">
//       <h1>Quiz Analysis</h1>
//       <table className="quiz-table">
//         <thead>
//           <tr>
//             <th>S.No</th>
//             <th>Quiz Name</th>
//             <th>Created on</th>
//             <th>Impression</th>
//             <th>Actions</th>
//             <th>Analysis</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((quiz, index) => (
//             <tr key={quiz.id}>
//               <td>{index + 1}</td>
//               <td>{quiz.name}</td>
//               <td>{quiz.createdOn}</td>
//               <td>{quiz.impression}</td>
//               <td>
//                 <FaPen className="icon1" />
//                 <FaTrashAlt className="icon2" />
//                 <FaShareAlt className="icon3" />
//               </td>
//               <td>
//                 <a href="#">Question Wise Analysis</a>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     </div>
//     </>
//   )
// }

// export default Analytics;

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "./QuizAnalysis.css";
import "./Questionwise"
import { FaTrashAlt, FaPen, FaShareAlt } from "react-icons/fa";

const data = [
  {
    id: 1,
    name: "Quiz 1",
    createdOn: "01 Sep, 2023",
    impression: "345",
  },
  {
    id: 2,
    name: "Quiz 2",
    createdOn: "04 Sep, 2023",
    impression: "667",
  },
  {
    id: 3,
    name: "Quiz 3",
    createdOn: "06 Sep, 2023",
    impression: "1.6K",
  },
  {
    id: 4,
    name: "Quiz 4",
    createdOn: "09 Sep, 2023",
    impression: "789",
  },
  {
    id: 5,
    name: "Quiz 5",
    createdOn: "11 Sep, 2023",
    impression: "995",
  },
  {
    id: 6,
    name: "Quiz 6",
    createdOn: "13 Sep, 2023",
    impression: "2.5K",
  },
  {
    id: 7,
    name: "Quiz 7",
    createdOn: "14 Sep, 2023",
    impression: "231",
  },
  {
    id: 8,
    name: "Quiz 8",
    createdOn: "17 Sep, 2023",
    impression: "1.3K",
  },
];

const Analytics = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const handleDeleteClick = (quizId) => {
    setQuizToDelete(quizId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log("Deleting quiz with id:", quizToDelete);
    setShowDeleteModal(false);
    // Implement the actual delete logic here
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleAnalysisClick = (quiz) => {
    setSelectedQuiz(quiz);
    setShowAnalysisModal(true);
  };

  const closeAnalysisModal = () => {
    setShowAnalysisModal(false);
  };

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
                    <FaTrashAlt
                      className="icon2"
                      onClick={() => handleDeleteClick(quiz.id)}
                    />
                    <FaShareAlt className="icon3" />
                  </td>
                  <td>
                    <a href="#" onClick={() => handleAnalysisClick(quiz)}>
                      Question Wise Analysis
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showDeleteModal && (
        <div className="delete-modal">
          <div className="modal-content">
            <p>Are you confirm you </p>
            <p>want to delete?</p>
            <div className="modal-buttons">
              <button className="confirm-delete-button" onClick={confirmDelete}>
                Confirm Delete
              </button>
              <button className="cancel-button" onClick={cancelDelete}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showAnalysisModal && (
        <QuestionAnalysisModal
          onClose={closeAnalysisModal}
          quizData={selectedQuiz}
        />
      )}
    </>
  );
};



export default Analytics;
