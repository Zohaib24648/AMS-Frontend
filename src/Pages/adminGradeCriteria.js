import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, Box } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
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
          toast.error('Error fetching grade criteria');
        });
    }
  }, [token]);

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
          toast.error(`Error: Percentage range for grade ${grade} overlaps with grade ${criteria[i].grade}`);
          return;
        }
      }
    }

    axios.post('http://localhost:3001/api/grades/grade-criteria', { grade, minPercentage, maxPercentage }, { headers })
      .then(response => {
        toast.success('Grade criteria updated successfully');
      })
      .catch(error => {
        console.error('Error updating grade criteria:', error);
        toast.error('Error updating grade criteria');
      });
  };

  const handleChange = (grade, field, value) => {
    setCriteria(criteria.map(item => item.grade === grade ? { ...item, [field]: value } : item));
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 2 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>Grade Criteria</Typography>
      <Paper elevation={2} sx={{ padding: 2 }}>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Grade</TableCell>
                <TableCell>Min %</TableCell>
                <TableCell>Max %</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {criteria.map(({ grade, minPercentage, maxPercentage }) => (
                <TableRow key={grade}>
                  <TableCell>{grade}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={minPercentage}
                      onChange={(e) => handleChange(grade, 'minPercentage', e.target.value)}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={maxPercentage}
                      onChange={(e) => handleChange(grade, 'maxPercentage', e.target.value)}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" size="small" onClick={() => handleSave(grade)}>Save</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default GradeCriteria;
