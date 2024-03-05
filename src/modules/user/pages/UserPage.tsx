import React, { useState } from "react";

const GeneralData = ({ user }) => {
    return (
        <div className="rounded-2xl py-8 px-36">
            <div className="bg-[#ECEEFA] rounded-t-2xl ">
                <div className="flex flex-row items-center">
                    <img
                        src="/src/assets/ProfilePics.png"
                        width="120px"
                        className="my-6 mx-16 rounded-full border-2 border-gray-300"
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
            <div
                // style={{ border: "2px solid #ECEEFA", borderTop: "0" }}
                className="border-solid  border-[#ECEEFA] border-t-transparent rounded-b-2xl"
            >
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
                                <span className="text-[#4351CC]">คณะ : </span>
                            </td>
                            <td className=" pt-2">{user.faculty}</td>
                        </tr>
                        <tr>
                            <td className="text-right">
                                <span className="text-[#4351CC]">สาขา : </span>
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
    );
};

const EnrollData = ({ data }) => {
    console.log(data["1"]);

    return (
        <div className="rounded-2xl py-8 px-36">
            <div className="bg-[#FFFFFF] rounded-2xl border-solid border-[#ECEEFA]">
                <table className="border-collapse border-slate-400 ">
                    <thead>
                        <tr>
                            <th className="border border-slate-300 border-solid">
                                ลำดับ
                            </th>
                            <th className="border border-slate-300 border-solid">
                                รหัสวิชา
                            </th>
                            <th className="border border-slate-300 border-solid">
                                ชื่อวิชา
                            </th>
                            <th className="border border-slate-300 border-solid">
                                หน่อยกิต
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    for (let i = 1; i <= limit; i++) {
  // Do something with each number here
  console.log(i); // Example: Print each number
  if (numbers) {
    numbers.push(i); // Example: Add each number to the array
  }
}

                        <tr>
                            <td className="border border-slate-300 border-solid">
                            </td>
                            <td className="border border-slate-300 border-solid">
                                {data["1"]["1"][0].courseNo}
                            </td>
                            <td className="border border-slate-300 border-solid">
                                {data["1"]["1"][0].courseNo}
                            </td>
                            <td className="border border-slate-300 border-solid">
                                {data["1"]["1"][0].credit}
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-slate-300 border-solid">
                                Ohio
                            </td>
                            <td className="border border-slate-300 border-solid">
                                Columbus
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-slate-300 border-solid">
                                Michigan
                            </td>
                            <td className="border border-slate-300 border-solid">
                                Detroit
                            </td>
                        </tr>
                    </tbody>
                </table>
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
    const [data, setData] = useState({
        "1": {
            "1": [
                {
                    year: "1",
                    semester: "1",
                    courseNo: "001101",
                    credit: "3.00",
                    grade: "A",
                },
                {
                    year: "1",
                    semester: "1",
                    courseNo: "140104",
                    credit: "3.00",
                    grade: "B+",
                },
                {
                    year: "1",
                    semester: "1",
                    courseNo: "206161",
                    credit: "3.00",
                    grade: "C",
                },
                {
                    year: "1",
                    semester: "1",
                    courseNo: "207105",
                    credit: "3.00",
                    grade: "C+",
                },
                {
                    year: "1",
                    semester: "1",
                    courseNo: "207115",
                    credit: "1.00",
                    grade: "A",
                },
                {
                    year: "1",
                    semester: "1",
                    courseNo: "259104",
                    credit: "3.00",
                    grade: "B+",
                },
                {
                    year: "1",
                    semester: "1",
                    courseNo: "259106",
                    credit: "1.00",
                    grade: "A",
                },
                {
                    year: "1",
                    semester: "1",
                    courseNo: "259191",
                    credit: "1.00",
                    grade: "S",
                },
                {
                    year: "1",
                    semester: "1",
                    courseNo: "261103",
                    credit: "3.00",
                    grade: "A",
                },
            ],
            "2": [
                {
                    year: "1",
                    semester: "2",
                    courseNo: "001102",
                    credit: "3.00",
                    grade: "A",
                },
                {
                    year: "1",
                    semester: "2",
                    courseNo: "206162",
                    credit: "3.00",
                    grade: "C+",
                },
                {
                    year: "1",
                    semester: "2",
                    courseNo: "207106",
                    credit: "3.00",
                    grade: "C",
                },
                {
                    year: "1",
                    semester: "2",
                    courseNo: "207116",
                    credit: "1.00",
                    grade: "A",
                },
                {
                    year: "1",
                    semester: "2",
                    courseNo: "252281",
                    credit: "3.00",
                    grade: "C",
                },
                {
                    year: "1",
                    semester: "2",
                    courseNo: "261102",
                    credit: "3.00",
                    grade: "C+",
                },
                {
                    year: "1",
                    semester: "2",
                    courseNo: "702101",
                    credit: "3.00",
                    grade: "B+",
                },
            ],
        },
        "2": {
            "1": [
                {
                    year: "2",
                    semester: "1",
                    courseNo: "206261",
                    credit: "3.00",
                    grade: "B+",
                },
                {
                    year: "2",
                    semester: "1",
                    courseNo: "261111",
                    credit: "3.00",
                    grade: "A",
                },
                {
                    year: "2",
                    semester: "1",
                    courseNo: "261207",
                    credit: "2.00",
                    grade: "B+",
                },
                {
                    year: "2",
                    semester: "1",
                    courseNo: "261210",
                    credit: "3.00",
                    grade: "B+",
                },
                {
                    year: "2",
                    semester: "1",
                    courseNo: "261212",
                    credit: "1.00",
                    grade: "C+",
                },
                {
                    year: "2",
                    semester: "1",
                    courseNo: "261216",
                    credit: "3.00",
                    grade: "B",
                },
                {
                    year: "2",
                    semester: "1",
                    courseNo: "261217",
                    credit: "3.00",
                    grade: "B+",
                },
            ],
            "2": [
                {
                    year: "2",
                    semester: "2",
                    courseNo: "001225",
                    credit: "3.00",
                    grade: "A",
                },
                {
                    year: "2",
                    semester: "2",
                    courseNo: "261200",
                    credit: "3.00",
                    grade: "B",
                },
                {
                    year: "2",
                    semester: "2",
                    courseNo: "261208",
                    credit: "3.00",
                    grade: "A",
                },
                {
                    year: "2",
                    semester: "2",
                    courseNo: "261214",
                    credit: "3.00",
                    grade: "A",
                },
                {
                    year: "2",
                    semester: "2",
                    courseNo: "261215",
                    credit: "1.00",
                    grade: "A",
                },
                {
                    year: "2",
                    semester: "2",
                    courseNo: "261218",
                    credit: "3.00",
                    grade: "B",
                },
                {
                    year: "2",
                    semester: "2",
                    courseNo: "261332",
                    credit: "3.00",
                    grade: "B+",
                },
            ],
        },
        "3": {
            "1": [
                {
                    year: "3",
                    semester: "1",
                    courseNo: "261497",
                    credit: "3.00",
                    grade: "B+",
                },
                {
                    year: "3",
                    semester: "1",
                    courseNo: "261343",
                    credit: "1.00",
                    grade: "B+",
                },
                {
                    year: "3",
                    semester: "1",
                    courseNo: "261342",
                    credit: "3.00",
                    grade: "B",
                },
                {
                    year: "3",
                    semester: "1",
                    courseNo: "261336",
                    credit: "1.00",
                    grade: "A",
                },
                {
                    year: "3",
                    semester: "1",
                    courseNo: "261335",
                    credit: "3.00",
                    grade: "A",
                },
                {
                    year: "3",
                    semester: "1",
                    courseNo: "261304",
                    credit: "3.00",
                    grade: "C",
                },
                {
                    year: "3",
                    semester: "1",
                    courseNo: "013110",
                    credit: "3.00",
                    grade: "B+",
                },
                {
                    year: "3",
                    semester: "1",
                    courseNo: "001201",
                    credit: "3.00",
                    grade: "A",
                },
            ],
            "2": [
                {
                    year: "3",
                    semester: "2",
                    courseNo: "259194",
                    credit: "1.00",
                    grade: "*",
                },
                {
                    year: "3",
                    semester: "2",
                    courseNo: "261305",
                    credit: "3.00",
                    grade: "*",
                },
                {
                    year: "3",
                    semester: "2",
                    courseNo: "261306",
                    credit: "3.00",
                    grade: "*",
                },
                {
                    year: "3",
                    semester: "2",
                    courseNo: "261361",
                    credit: "3.00",
                    grade: "*",
                },
                {
                    year: "3",
                    semester: "2",
                    courseNo: "261491",
                    credit: "1.00",
                    grade: "*",
                },
                {
                    year: "3",
                    semester: "2",
                    courseNo: "261494",
                    credit: "3.00",
                    grade: "*",
                },
                {
                    year: "3",
                    semester: "2",
                    courseNo: "261498",
                    credit: "3.00",
                    grade: "*",
                },
                {
                    year: "3",
                    semester: "2",
                    courseNo: "462130",
                    credit: "3.00",
                    grade: "*",
                },
            ],
        },
    });

    const [activeTab, setActiveTab] = useState("generalData");

    const handleClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        // <div>test</div>
        <div className="h-full flex flex-col items-center">
            <div className="w-full max-w-5xl mt-16">
                <div className="flex bg-[#ECEEFA] rounded-t-2xl w-full shadow-2xl">
                    <div
                        className={`${
                            activeTab === "generalData" ? "bg-white" : ""
                        } rounded-t-2xl shadow-none w-full`}
                        onClick={() => handleClick("generalData")}
                    >
                        <p className="flex justify-center">
                            <a
                                href="#generalData"
                                className="flex items-center px-4 text-[#4351CC] text-xl font-medium"
                            >
                                ข้อมูลทั่วไป
                            </a>
                        </p>
                    </div>
                    <div
                        className={`${
                            activeTab === "enrollData" ? "bg-white" : ""
                        } rounded-t-2xl shadow-none w-full`}
                        onClick={() => handleClick("enrollData")}
                    >
                        <p className="flex justify-center">
                            <a
                                href="#enrollData"
                                className="flex items-center px-4 text-[#4351CC] text-xl font-medium"
                            >
                                ข้อมูลวิชาที่ลงทะเบียนเรียน
                            </a>
                        </p>
                    </div>
                </div>
                <div className="bg-white rounded-b-2xl shadow-lg w-full">
                    {activeTab === "generalData" ? (
                        <GeneralData user={user} />
                    ) : (
                        <EnrollData data={data} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserPage;
