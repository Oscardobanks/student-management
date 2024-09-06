"use client";
import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import { useDispatch } from "react-redux";
import { createStudent } from "../store/store";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddStudentForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const student = {
      firstName,
      lastName,
      email,
      dateOfBirth,
    };
    dispatch(createStudent(student));
    toast.success("Student has been created successfully!");
    router.push('/studentList');
  };

  return (
    <div className="flex">
      <Sidebar active="students" />
      <div className="md:ms-36 md:me-20 mx-10 md:mt-36 mt-20">
        <h1 className="font-semibold text-3xl text-grey-400 mb-24">
          Add Student
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-8">
            <div className="flex md:flex-row flex-col gap-8">
              <div className="flex flex-col gap-1">
                <label className="text-grey-200 font-medium text-sm">
                  First Name
                </label>
                <input
                  type="text"
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
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-5 py-2 border border-grey-100 rounded"
                  required
                />
              </div>
              <div className="mt-6">
                <input
                  type="text"
                  placeholder="Date of birth"
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
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
            Add Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudentForm;
