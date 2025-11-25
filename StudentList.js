import React from 'react';

function StudentList({ students, onAdd }) {
  const sendCredentials = (student) => {
    alert(
      'Sending login credentials to ' + student.profile.email + ' or phone ' + student.profile.phone + ':\n' +
      'Username: ' + student.username + '\n' +
      'Password: ' + student.password
    );
  };

  return (
    <div>
      <h2>Student List</h2>
      <button onClick={onAdd}>Add Student</button>
      {students.length === 0 ? (
        <p>No students available.</p>
      ) : (
        <table border="1" cellPadding="5" cellSpacing="0">
          <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Send Username</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.username}>
                <td>{student.username}</td>
                <td>{student.profile.name}</td>
                <td>{student.profile.email}</td>
                <td>{student.profile.phone}</td>
                <td>
                  <button onClick={() => sendCredentials(student)}>Send Username</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentList;
