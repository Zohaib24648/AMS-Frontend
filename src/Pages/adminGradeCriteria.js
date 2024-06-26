import React, { useEffect, useState } from 'react';
import axios from 'axios';

const defaultGrades = [
  { grade: 'A', minPercentage: '', maxPercentage: '' },
  { grade: 'A-', minPercentage: '', maxPercentage: '' },
  { grade: 'B+', minPercentage: '', maxPercentage: '' },
  { grade: 'B', minPercentage: '', maxPercentage: '' },
  { grade: 'B-', minPercentage: '', maxPercentage: '' },
  { grade: 'C+', minPercentage: '', maxPercentage: '' },
  { grade: 'C', minPercentage: '', maxPercentage: '' },
  { grade: 'C-', minPercentage: '', maxPercentage: '' },
  { grade: 'F', minPercentage: '', maxPercentage: '' },
];

const GradeCriteria = () => {
  const [criteria, setCriteria] = useState(defaultGrades);
  const [message, setMessage] = useState('');

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2N2M4OTE4ODlmNjhlZDdhMWU0OTY1YyIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzE5NDM3Njk3LCJleHAiOjE3MjAzMDE2OTd9.AnTY_MvVOJpsGWywpB7cp_hgSkJkNklggMHZPIRjulA';

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`
    };

    axios.get('http://localhost:3001/api/grades/grade-criteria', { headers })
      .then(response => {
        const fetchedCriteria = response.data;
        const updatedCriteria = defaultGrades.map(grade => 
          fetchedCriteria.find(item => item.grade === grade.grade) || grade
        );
        setCriteria(updatedCriteria);
      })
      .catch(error => {
        console.error('Error fetching grade criteria:', error);
      });
  }, []);

  const handleSave = (grade) => {
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const { minPercentage, maxPercentage } = criteria.find(item => item.grade === grade);

    // Validate that the percentage ranges do not overlap
    for (let i = 0; i < criteria.length; i++) {
      if (criteria[i].grade !== grade) {
        if ((minPercentage > criteria[i].minPercentage && minPercentage < criteria[i].maxPercentage) ||
            (maxPercentage > criteria[i].minPercentage && maxPercentage < criteria[i].maxPercentage)) {
          setMessage(`Error: Percentage range for grade ${grade} overlaps with grade ${criteria[i].grade}`);
          return;
        }
      }
    }

    axios.post('http://localhost:3001/api/grades/grade-criteria', { grade, minPercentage, maxPercentage }, { headers })
      .then(response => {
        setMessage('Grade criteria updated successfully');
      })
      .catch(error => {
        console.error('Error updating grade criteria:', error);
        setMessage('Error updating grade criteria');
      });
  };

  const handleChange = (grade, field, value) => {
    setCriteria(criteria.map(item => item.grade === grade ? { ...item, [field]: value } : item));
  };

  return (
    <div>
      <h1>Grade Criteria</h1>
      {message && <p>{message}</p>}
      <table>
        <thead>
          <tr>
            <th>Grade</th>
            <th>Min Percentage</th>
            <th>Max Percentage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {criteria.map(({ grade, minPercentage, maxPercentage }) => (
            <tr key={grade}>
              <td>{grade}</td>
              <td>
                <input
                  type="number"
                  value={minPercentage}
                  onChange={(e) => handleChange(grade, 'minPercentage', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={maxPercentage}
                  onChange={(e) => handleChange(grade, 'maxPercentage', e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => handleSave(grade)}>Save</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradeCriteria;
