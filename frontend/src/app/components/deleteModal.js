import React from "react";
import { FaX } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { deleteStudent, fetchStudents } from "../store/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteModal = ({ student, setShowModal, setActiveStudentDetails }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    try {
      dispatch(deleteStudent(student.id));
      setActiveStudentDetails([]);
      dispatch(fetchStudents());
      setShowModal(false)
      toast.success("Student Details has been deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update student detail.");
    }
  };

  return (
    <div>
      <div
        className="h-fit bg-[#F5F6F7] border border-gray-200] p-8 md:pt-10 rounded-3xl"
      >
        <div className="flex flex-col gap-5 items-center max-[350px]">
          <div className="p-2 rounded-full border-2 border-red-500">
            <FaX className="h-3 w-3 text-red-500" />
          </div>
          <div className="text-center px-2">
            <p className="font-semibold text-gray-800 my-3 text-lg capitalize">
              Confirm that you want to delete <span className="font-bold">{student.firstName} {student.lastName}</span>
            </p>
          </div>
          <div className="flex gap-4 font-semibold">
            <button
              onClick={() => setShowModal(false)}
              className="text-white bg-grey-100 rounded px-5 py-2"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="text-white bg-[#DB2525] rounded px-5 py-2"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
