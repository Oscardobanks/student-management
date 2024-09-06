"use client";
import { useEffect, useRef, useState } from "react";
// import { students } from "../data/students";
import "@/app/styles/studentList.css";
import Sidebar from "../components/sidebar";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent, fetchStudents } from "../store/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeStudent, setActiveStudent] = useState("");
  const [activeStudentDetails, setActiveStudentDetails] = useState([]);
  const students = useSelector((state)=> state.students.students);
  const tableRef = useRef(null);

  const handleActiveStudent = (studentId) => {
    setActiveStudent(studentId);
    const filteredStudent = students.filter(
      (student) => studentId === student.id
    );
    setActiveStudentDetails(filteredStudent);
  };

  const handleClickOutside = (event) => {
    if (tableRef.current && !tableRef.current.contains(event.target)) {
      setActiveStudent("");
      setActiveStudentDetails([]);
    }
  };

  const handleDelete = (id) => {
    try {
      dispatch(deleteStudent(id));
      setActiveStudentDetails([]);
      toast.success("Student Details is deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update student detail.");
    }
  }

  useEffect(() => {
    dispatch(fetchStudents());
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  return (
    <div className="flex">
      <Sidebar active="students" />
      <div
        className={`mt-6 mb-10 ${
          activeStudentDetails ? "ms-16 me-10" : "ms-24"
        }`}
      >
        <button
          onClick={() => router.push("/addStudentForm")}
          type="button"
          className="p-3 text-white bg-secondary-300 rounded"
        >
          Add Students
        </button>
        <div className="flex gap-10 mt-14">
          <table
            ref={tableRef}
            className={`h-fit ${activeStudent ? "active" : "unactive"}`}
          >
            <thead>
              <tr>
                <th>First name</th>
                <th>Last name</th>
                <th>Student ID</th>
                <th>Email address</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr
                  key={index}
                  onClick={() => handleActiveStudent(student.id)}
                  className={`cursor-pointer ${
                    index % 2 === 0 && index !== 0 ? "bg-secondary-10" : ""
                  } ${
                    activeStudent === student.id
                      ? "bg-secondary-300 text-white"
                      : ""
                  }`}
                >
                  <td>{student.firstName}</td>
                  <td>{student.lastName} </td>
                  <td>{student.id} </td>
                  <td>{student.email} </td>
                </tr>
              ))}
            </tbody>
          </table>

          {activeStudentDetails.map((student, index) => (
            <div
              ref={tableRef}
              key={index}
              className="bg-secondary-300 text-white flex flex-col items-center gap-8 w-72 rounded-2xl p-10"
            >
              <h1 className="text-2xl font-bold">Student Info</h1>
              <div className="flex flex-col items-center gap-1">
                <p className="text-base font-bold">Student Name</p>
                <p className="text-base"> {student.firstName} </p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-base font-bold">Student ID</p>
                <p className="text-base"> {student.id} </p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-base font-bold">Email address</p>
                <p className="text-base"> {student.email} </p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-base font-bold">Date of Birth</p>
                <p className="text-base">
                  {new Date(student?.dateOfBirth).toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="flex gap-4 font-semibold mt-16">
                <button
                  type="button"
                  onClick={() => router.push(`/editStudentForm/${student.id}`)}
                  className="text-black bg-grey-10 rounded w-24 py-2"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(student.id)}
                  className="text-white bg-[#DB2525] rounded w-24 py-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentList;
