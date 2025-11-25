import React, { useState, useEffect } from 'react';

function Attendance({ students, onSaveAttendance }) {
  const [attendanceMap, setAttendanceMap] = useState({});

  useEffect(() => {
    // Initialize attendance map with false (absent) for all students if not present
    const initialMap = {};
    students.forEach((student) => {
      initialMap[student.username] = false;
    });
    setAttendanceMap(initialMap);
  }, [students]);

  const handleCheckboxChange = (username) => {
    setAttendanceMap((prev) => ({
      ...prev,
      [username]: !prev[username],
    }));
  };

  const handleSave = () => {
    // Call onSaveAttendance with attendance map
    onSaveAttendance(attendanceMap);
  };

  return (
    <div>
      <h2>Attendance</h2>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table border="1" cellPadding="5" cellSpacing="0">
          <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Present</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.username}>
                <td>{student.username}</td>
                <td>{student.profile.name}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={!!attendanceMap[student.username]}
                    onChange={() => handleCheckboxChange(student.username)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={handleSave}>Save Attendance</button>
    </div>
  );
}

export default Attendance;
