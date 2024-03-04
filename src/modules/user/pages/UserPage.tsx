import React, { useState } from "react";

const GeneralData = ({ user }) => {
    return (
        <div className="bg-white rounded-b-2xl shadow-lg p-4 ">
            <div className="rounded-2xl my-20 mx-48 ">
                <div className="bg-[#ECEEFA] rounded-t-2xl">
                    <div className="flex flex-row items-center">
                        <img
                            src="https://via.placeholder.com/120"
                            alt="profile picture"
                            className="w-120 h-120 my-6 mx-16 rounded-full border-2 border-gray-300"
                        />
                        <div>
                            <h1 className="text-xl font-medium mb-4 text-[#4351CC]">
                                {user.name}
                            </h1>
                            <h1 className="text-xl font-medium mb-4 text-[#4351CC]">
                                {user.studentId}
                            </h1>
                            <h4 className="px-4 text-base font-normal mb-3 bg-[#6974D6] rounded-lg text-white">
                                ปี 2 เทอม 1
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="text-black border-2 border-[#6974D6]-current border-t-transparent rounded-b-2xl font-normal">
                    <table className="table-fixed w-1/0.5 ms-36">
                        <tbody>
                            <tr>
                                <td className="text-right">
                                    <span className="text-[#4351CC]">
                                        ระดับการศึกษา :{" "}
                                    </span>
                                </td>
                                <td className=" pt-2">{user.level}</td>
                            </tr>
                            <tr>
                                <td className="text-right">
                                    <span className="text-[#4351CC]">
                                        คณะ :{" "}
                                    </span>
                                </td>
                                <td className=" pt-2">{user.faculty}</td>
                            </tr>
                            <tr>
                                <td className="text-right">
                                    <span className="text-[#4351CC]">
                                        สาขา :{" "}
                                    </span>
                                </td>
                                <td className=" pt-2">{user.major}</td>
                            </tr>
                            <tr>
                                <td className="text-right">
                                    <span className="text-[#4351CC]">
                                        หลักสูตร :{" "}
                                    </span>
                                </td>
                                <td className=" pt-2">{user.program}</td>
                            </tr>
                            <tr>
                                <td className="text-right">
                                    <span className="text-[#4351CC]">
                                        อาจารย์ที่ปรึกษา :{" "}
                                    </span>
                                </td>
                                <td className=" pt-2">{user.advisor}</td>
                            </tr>
                            <tr>
                                <td className="text-right">
                                    <span className="text-[#4351CC]">
                                        วันที่เข้าศึกษา :{" "}
                                    </span>
                                </td>
                                <td className=" pt-2">{user.startDate}</td>
                            </tr>
                            <tr>
                                <td className="text-right">
                                    <span className="text-[#4351CC]">
                                        ภาคการศึกษา :{" "}
                                    </span>
                                </td>
                                <td className=" pt-2">{user.semester}</td>
                            </tr>
                            <tr>
                                <td className="text-right">
                                    <span className="text-[#4351CC]">
                                        สถานภาพ :{" "}
                                    </span>
                                </td>
                                <td className=" pt-2">{user.status}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const EnrollData = () => {
    return (
        <div className="bg-white rounded-b-2xl shadow-lg p-4">
            <div className="rounded-2xl my-20 mx-48 ">
                <div className="bg-[#ECEEFA] rounded-t-2xl">
                    <div></div>
                </div>
            </div>
        </div>
    );
};

const UserPage: React.FC = () => {
    const [user, setUser] = useState({
        name: "ชื่อ นามสกุล",
        studentId: "640610000",
        level: "ปริญญาตรี",
        faculty: "คณะวิศวกรรมศาสตร์",
        major: "สาขาวิศวกรรมคอมพิวเตอร์",
        program: "วิศวกรรมศาสตรบัณฑิต (หลักสูตรปี 2563)",
        advisor: "ชื่อ นามสกุล",
        startDate: "วันที่ 21 เดือน มิถุนายน พ.ศ. 2564",
        semester: "1/2564",
        status: "กำลังศึกษา",
    });
    const [activeTab, setActiveTab] = useState("generalData");

    const handleClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div className="flex flex-col items-center h-full w-full mt-24">
            <div className="w-full max-w-5xl">
                <div className="flex bg-[#ECEEFA] rounded-t-2xl w-full shadow-2xl">
                    <div
                        className={`${
                            activeTab === "generalData" ? "bg-white" : ""
                        } rounded-t-2xl shadow-none p-4 w-full`}
                        onClick={() => handleClick("generalData")}
                    >
                        <ul className="flex justify-around">
                            <li className="mr-20">
                                <a
                                    href="#generalData"
                                    className="flex items-center px-4 py-2 text-[#4351CC] text-xl font-medium"
                                >
                                    ข้อมูลทั่วไป
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div
                        className={`${
                            activeTab === "enrollData" ? "bg-white" : ""
                        } rounded-t-2xl shadow-none p-4 w-full`}
                        onClick={() => handleClick("enrollData")}
                    >
                        <ul className="flex justify-around">
                            <li className="mr-2">
                                <a
                                    href="#enrollData"
                                    className="flex items-center px-4 py-2 text-[#4351CC] text-xl font-medium"
                                >
                                    ข้อมูลวิชาที่ลงทะเบียนเรียน
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                {activeTab === "generalData" ? (
                    <GeneralData user={user} />
                ) : (
                    <EnrollData />
                )}
            </div>
        </div>
    );
};

export default UserPage;
