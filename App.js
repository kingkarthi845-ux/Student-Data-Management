import React, { useState, useEffect } from 'react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import Attendance from './components/Attendance';
import MarksInput from './components/MarksInput';
import AnalysisDashboard from './components/AnalysisDashboard';
import Login from './components/Login';
import MyProfile from './components/MyProfile';
import PasswordReset from './components/PasswordReset';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState('studentList');
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  // Mock initial user data for demo, including password updates
  const [users, setUsers] = useState([
    {
      username: 'Karthi',
      password: 'Karthi@123',
      role: 'admin',
      profile: {
        email: 'admin@example.com',
        phone: '1234567890',
        name: 'Admin Karthi',
      },
      firstLogin: true,
    },
    {
      username: 'S001',
      password: '2000-01-01',
      role: 'staff',
      profile: {
        email: 'staff1@example.com',
        phone: '1112223333',
        name: 'Staff One',
        dob: '2000-01-01',
      },
    },
    {
      username: 'ST001',
      password: '2005-05-15',
      role: 'student',
      profile: {
        email: 'student1@example.com',
        phone: '4445556666',
        name: 'Student One',
        dob: '2005-05-15',
      },
      attendance: [],
    },
  ]);

  // Derived students list from users state
  const [students, setStudents] = useState(users.filter((u) => u.role === 'student'));

  useEffect(() => {
    setStudents(users.filter((u) => u.role === 'student'));
  }, [users]);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setShowPasswordReset(false);
    if (user.role === 'admin') {
      setView('studentList');
    } else if (user.role === 'staff') {
      setView('attendance');
    } else if (user.role === 'student') {
      setView('analysisDashboard');
    } else {
      setView('studentList');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('studentList');
    setShowPasswordReset(false);
  };

  const handleProfileUpdate = (updatedProfile) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      profile: updatedProfile,
    }));

    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.username === currentUser.username ? { ...u, profile: updatedProfile } : u
      )
    );
  };

  const handlePasswordResetComplete = (username, newPassword) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) => (u.username === username ? { ...u, password: newPassword } : u))
    );
    setShowPasswordReset(false);
  };

  const handleAddStudent = () => {
    setView('studentForm');
    setEditingStudent(null);
  };

  const [editingStudent, setEditingStudent] = useState(null);

  const handleEditStudent = (username) => {
    const student = students.find((s) => s.username === username);
    if (student) {
      setEditingStudent(student);
      setView('studentForm');
    }
  };

  const handleSaveStudent = (studentData) => {
    setUsers((prevUsers) => {
      const exists = prevUsers.find((u) => u.username === studentData.username);
      if (exists) {
        // Update existing student
        return prevUsers.map((u) => (u.username === studentData.username ? studentData : u));
      } else {
        // Add new student
        return [...prevUsers, studentData];
      }
    });
    setView('studentList');
    setEditingStudent(null);
  };

  const handleSaveAttendance = (attendanceMap) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) => {
        if (u.role !== 'student') return u;
        const attendance = u.attendance ? [...u.attendance] : [];
        const present = attendanceMap[u.username];
        attendance.push({ date: new Date().toLocaleDateString(), present });
        return { ...u, attendance };
      })
    );
    alert('Attendance saved successfully!');
  };

  const renderView = () => {
    switch (view) {
      case 'studentList':
        return <StudentList students={students} onAdd={handleAddStudent} />;
      case 'studentForm':
        return (
          <StudentForm
            existingStudent={editingStudent}
            onSave={handleSaveStudent}
            onCancel={() => {
              setView('studentList');
              setEditingStudent(null);
            }}
          />
        );
      case 'attendance':
        return <Attendance students={students} onSaveAttendance={handleSaveAttendance} />;
      case 'marksInput':
        return <MarksInput />;
      case 'analysisDashboard':
        return <AnalysisDashboard />;
      case 'myProfile':
        return <MyProfile user={currentUser} onUpdate={handleProfileUpdate} />;
      default:
        return <StudentList />;
    }
  };

  if (!currentUser && !showPasswordReset) {
    return (
      <Login
        onLogin={handleLogin}
        onShowPasswordReset={() => setShowPasswordReset(true)}
      />
    );
  }

  if (showPasswordReset) {
    return (
      <PasswordReset
        users={users}
        onResetComplete={handlePasswordResetComplete}
        onBack={() => setShowPasswordReset(false)}
      />
    );
  }

  // Role-based navigation options
  const adminNav = (
    <>
      <button onClick={() => setView('studentList')}>Student List</button>
      <button onClick={() => setView('studentForm')}>Add/Edit Student</button>
      <button onClick={() => setView('attendance')}>Attendance</button>
      <button onClick={() => setView('marksInput')}>Internal Marks</button>
      <button onClick={() => setView('analysisDashboard')}>Analysis Dashboard</button>
      <button onClick={() => setView('myProfile')}>My Profile</button>
      <button onClick={handleLogout}>Logout</button>
    </>
  );

  const staffNav = (
    <>
      <button onClick={() => setView('attendance')}>Attendance</button>
      <button onClick={() => setView('marksInput')}>Internal Marks</button>
      <button onClick={() => setView('studentList')}>Student List</button>
      <button onClick={() => setView('myProfile')}>My Profile</button>
      <button onClick={handleLogout}>Logout</button>
    </>
  );

  const studentNav = (
    <>
      <button onClick={() => setView('analysisDashboard')}>Analysis Dashboard</button>
      <button onClick={() => setView('myProfile')}>My Profile</button>
      <button onClick={handleLogout}>Logout</button>
    </>
  );

  return (
    <div>
      <nav>
        {currentUser.role === 'admin'
          ? adminNav
          : currentUser.role === 'staff'
          ? staffNav
          : studentNav}
      </nav>
      <main>{renderView()}</main>
    </div>
  );
}

export default App;
