"use client";
import Sidebar from "@/app/components/sidebar";
import {
  fetchStudent,
  updateStudent,
} from "@/app/store/store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditStudentForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const studentId = pathname.split("/").pop();

  const {students, status} = useSelector((state) => state.students);
  const student = students.find((t) => t.id === parseInt(studentId, 10));
  const [firstName, setFirstName] = useState(student.firstName);
  const [lastName, setLastName] = useState(student.lastName);
  const [email, setEmail] = useState(student.email);
  const [dateOfBirth, setDateOfBirth] = useState(student.dateOfBirth);

  useEffect(() => {
    dispatch(fetchStudent(studentId));
  }, [studentId, dispatch]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const newStudent = { firstName, lastName, email, dateOfBirth };
      const updatedStudent = { ...student, ...newStudent };
      console.log(updatedStudent);
      dispatch(updateStudent(updatedStudent));
      dispatch(fetchStudent(studentId));
      toast.success("Student Details is updated successfully!");
      router.push('/studentList');
    } catch (error) {
      console.error(error);
      toast.error("Failed to update student detail.");
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen pb-40  lg:fixed relative lg:mt-0 mt-60 top-1/2 lg:left-1/2 flex justify-center gap-2">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar active="students" />
      <div className="w-[70%] md:mx-auto ms-28 md:me-20 mx-10 md:mt-32 mt-20">
        <h1 className="font-semibold text-3xl text-grey-400 mb-24">
          Edit Student
        </h1>
        <form onSubmit={handleUpdate}>
          <div className="flex flex-col gap-8">
            <div className="flex md:flex-row flex-col gap-8">
              <div className="flex flex-col gap-1">
                <label className="text-grey-200 font-medium text-sm">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="px-5 py-2 border border-grey-100 rounded"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-grey-200 font-medium text-sm">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="px-5 py-2 border border-grey-100 rounded"
                  required
                />
              </div>
            </div>
            <div className="flex md:flex-row flex-col gap-8">
              <div className="flex flex-col gap-1">
                <label className="text-grey-200 font-medium text-sm">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-5 py-2 border border-grey-100 rounded"
                  required
                />
              </div>
              <div className="mt-6">
                <input
                  type="text"
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  value={dateOfBirth}
                  className="px-5 py-2 border border-grey-100 rounded"
                  required
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-14 bg-grey-10 hover:bg-grey-25 text-grey-400 font-semibold text-sm py-3 px-6 rounded"
          >
            Edit Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditStudentForm;
