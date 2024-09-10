"use client";
import { useEffect, useRef, useState } from "react";
import "@/app/styles/studentList.css";
import Sidebar from "../components/sidebar";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent, fetchStudents } from "../store/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaX } from "react-icons/fa6";
import DeleteModal from "../components/deleteModal";

const StudentList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeStudent, setActiveStudent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [activeStudentDetails, setActiveStudentDetails] = useState([]);
  const { students, status } = useSelector((state) => state.students);
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

  const handleDeleteModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    dispatch(fetchStudents());
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="min-h-screen pb-40 lg:fixed relative lg:mt-0 mt-60 top-1/2 lg:left-1/2 flex justify-center gap-2">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar active="students" />
      <div
        className={`mt-6 mb-10 overflow-auto ${
          activeStudentDetails
            ? "w-[75%] xl:ms-auto lg:ms-72 ms-28 md:me-10 mx-11"
            : "ms-24"
        }`}
      >
        <button
          onClick={() => router.push("/addStudentForm")}
          type="button"
          className="p-3 text-white bg-secondary-300 rounded"
        >
          Add Students
        </button>
        <div className="flex md:gap-10 mt-14">
          <div className="overflow-auto">
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
            {students.length === 0 && (
              <div className="text-gray-300 text-center text-xl font-bold">
                No Student Found
              </div>
            )}
          </div>

          {activeStudentDetails.map((student, index) => (
            <div
              ref={tableRef}
              key={index}
              className="bg-secondary-300 text-white lg:w-72 w-64 rounded-2xl p-10"
            >
              {showModal && (
                <div className="bg-[#2b2a2a99] xl:pb-20 lg:pb-0 pb-40 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
                  <DeleteModal
                    student={student}
                    setShowModal={setShowModal}
                    setActiveStudentDetails={setActiveStudentDetails}
                  />
                </div>
              )}

              <div
                onClick={() => setActiveStudentDetails([])}
                className="flex justify-end mb-5 sm:hidden"
              >
                <FaX />
              </div>
              <div className="flex flex-col items-center gap-5">
                <h1 className="text-2xl font-bold">Student Info</h1>
                <div className="flex flex-col items-center gap-1">
                  <p className="text-base font-bold">Student Name</p>
                  <p className="text-base capitalize">
                    {" "}
                    {student.firstName} {student.lastName}{" "}
                  </p>
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
                    {new Date(student?.dateOfBirth).toLocaleDateString(
                      "en-US",
                      {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>

                <div className="flex gap-4 font-semibold mt-10">
                  <button
                    type="button"
                    onClick={() =>
                      router.push(`/editStudentForm/${student.id}`)
                    }
                    className="text-black bg-grey-10 rounded w-24 py-2"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteModal}
                    className="text-white bg-[#DB2525] rounded w-24 py-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentList;
