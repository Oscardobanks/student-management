"use client";
import Image from "next/image";
import logo from "../../../public/assets/images/logo.png";
import homeIcon from "../../../public/assets/icons/home-2.svg";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

const Sidebar = ({ active }) => {
  return (
    <div>
      <div className="h-screen relative lg:w-60 w-20 bg-secondary-400 text-white">
        <div className="flex flex-col items-center gap-3 pt-6 pb-10">
          <Image src={logo} alt="Udemy Logo" />
          <p className="font-semibold text-sm text-center lg:w-full w-1/2">
            Udemy Inter. school
          </p>
        </div>
        <hr className="border-grey-300" />
        <div className="flex flex-col lg:items-stretch items-center gap-2 mt-4 lg:ms-7 lg:me-5 mx-3 font-semibold text-sm">
          <Link href="/">
            <div
              className={`flex gap-4 py-3 px-4 rounded lg:w-full w-fit ${
                active === "dashboard" ? "bg-secondary-300" : ""
              }`}
            >
              <Image src={homeIcon} alt="" />
              <p className="hidden lg:block font-semibold text-sm">Dashboard</p>
            </div>
          </Link>
          <Link href="/studentList">
            <div
              className={`flex justify-between items-center gap-5 py-3 px-4 rounded lg:w-full w-fit ${
                active === "students" ? "bg-secondary-300" : ""
              }`}
            >
              <div className="flex gap-4">
                <Image src={homeIcon} alt="" />
                <p className="hidden lg:block font-semibold text-sm">
                  Students
                </p>
              </div>
              {active === "students" && (
                <div className="hidden lg:block">
                  <FaChevronRight />
                </div>
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
