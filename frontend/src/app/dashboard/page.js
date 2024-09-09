"use client";
import React from "react";
import bankIcon from "../../../public/assets/icons/bank.svg";
import profile from "../../../public/assets/icons/profile-add.svg";
import teacher from "../../../public/assets/icons/teacher.svg";
import Sidebar from "../components/sidebar";
import Image from "next/image";

const Dashboard = () => {
  const dashboardContents = [
    {
      title: "View all students",
      subtitle: "View all the students stored in our database.",
      icon: profile
    },
    {
      title: "Add student",
      subtitle: "Add other student to the system.",
      icon: bankIcon
    },
    {
      title: "Edit and Delete student",
      subtitle: "You can also edit and delete users on the system",
      icon: teacher
    },
  ];

  return (
    <div className="flex">
      <Sidebar active="dashboard" />
      <div className="lg:ms-64 ms-20 w-[90%]">
        <div className="flex flex-col gap-4 items-center mt-28 md:px-20 px-10">
          <p className="font-semibold text-grey-400 md:text-4xl text-3xl">
            Welcome to the Students Dashboard
          </p>
          <p className="font-semibold text-black md:text-2xl text-xl">
            Here is how you can manage students{" "}
          </p>
        </div>
        <div className="flex flex-col gap-12 mt-3 md:py-14 py-8 md:px-24 px-10">
          {dashboardContents.map((content, index) => (
            <div key={index} className="flex gap-5">
              <div className="p-2 bg-secondary-10 h-fit rounded-lg">
                <Image src={content.icon} alt={`${content.icon}`} />
              </div>
              <div className="flex flex-col gap-2 text-grey-400">
                <p className="text-2xl font-medium"> {content.title} </p>
                <p className="text-sm"> {content.subtitle} </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
