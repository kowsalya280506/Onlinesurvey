
import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [answers, setAnswers] = useState({
    name: "",
    department: "",
    programmingLanguage: "",
    studyHours: "",
    teachingSatisfaction: ""
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    setAnswers({
      ...answers,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/submit",
        answers
      );

      setMessage(response.data.message);
      setAnswers({
        name: "",
        department: "",
        programmingLanguage: "",
        studyHours: "",
        teachingSatisfaction: ""
      });
    } catch (error) {
      setMessage("Submission failed. Check the backend.");
    }
  }

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Online Survey Application</h1>

      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <label className="form-label">1. What is your name?</label>
        <input
          className="form-control mb-3"
          name="name"
          value={answers.name}
          onChange={handleChange}
          required
        />

        <label className="form-label">2. What is your department?</label>
        <input
          className="form-control mb-3"
          name="department"
          value={answers.department}
          onChange={handleChange}
          required
        />

        <label className="form-label">
          3. Which programming language do you like the most?
        </label>
        <select
          className="form-select mb-3"
          name="programmingLanguage"
          value={answers.programmingLanguage}
          onChange={handleChange}
          required
        >
          <option value="">Select a language</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
          <option value="C">C</option>
          <option value="JavaScript">JavaScript</option>
        </select>

        <label className="form-label">
          4. How many hours do you study daily?
        </label>
        <select
          className="form-select mb-3"
          name="studyHours"
          value={answers.studyHours}
          onChange={handleChange}
          required
        >
          <option value="">Select hours</option>
          <option value="Less than 1 hour">Less than 1 hour</option>
          <option value="1-2 hours">1-2 hours</option>
          <option value="3-4 hours">3-4 hours</option>
          <option value="More than 4 hours">More than 4 hours</option>
        </select>

        <label className="form-label">
          5. Are you satisfied with your college teaching methods?
        </label>
        <select
          className="form-select mb-4"
          name="teachingSatisfaction"
          value={answers.teachingSatisfaction}
          onChange={handleChange}
          required
        >
          <option value="">Select an answer</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Partially">Partially</option>
        </select>

        <button type="submit" className="btn btn-primary">
          Submit Survey
        </button>
      </form>
    </div>
  );
}

export default App;
