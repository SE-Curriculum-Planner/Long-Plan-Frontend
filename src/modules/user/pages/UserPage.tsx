import React, { useState } from "react";

interface Props {
	user: any;
}

const GeneralData = ({ user }: Props) => {
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
							{user.prename} {user.first_name} {user.last_name}
						</h1>
						<h1 className="text-xl font-medium mb-4 text-[#4351CC]">
							{user.student_id}
						</h1>
						<h4 className="px-4 text-base font-normal mb-3 bg-[#6974D6] rounded-lg text-white">
							ปี 2 เทอม 1
						</h4>
					</div>
				</div>
			</div>
			<div
				style={{ border: "2px solid #ECEEFA", borderTop: "0" }}
				className="text-black border-2 border-[#6974D6]-current border-t-transparent rounded-b-2xl font-normal"
			>
				<table className="table-fixed w-1/0.5 ms-36">
					<tbody>
						<tr>
							<td className="text-right">
								<span className="text-[#4351CC]">ระดับการศึกษา : </span>
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
								<span className="text-[#4351CC]">หลักสูตร : </span>
							</td>
							<td className=" pt-2">{user.program}</td>
						</tr>
						<tr>
							<td className="text-right">
								<span className="text-[#4351CC]">อาจารย์ที่ปรึกษา : </span>
							</td>
							<td className=" pt-2">{user.advisor}</td>
						</tr>
						<tr>
							<td className="text-right">
								<span className="text-[#4351CC]">วันที่เข้าศึกษา : </span>
							</td>
							<td className=" pt-2">{user.startDate}</td>
						</tr>
						<tr>
							<td className="text-right">
								<span className="text-[#4351CC]">ภาคการศึกษา : </span>
							</td>
							<td className=" pt-2">{user.semester}</td>
						</tr>
						<tr>
							<td className="text-right">
								<span className="text-[#4351CC]">สถานภาพ : </span>
							</td>
							<td className=" pt-2">{user.status}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

const EnrollData = () => {
	return (
		<div className="rounded-2xl my-20 mx-48 ">
			<div className="bg-[#ECEEFA] rounded-t-2xl">
				<div></div>
			</div>
		</div>
	);
};

const UserPage: React.FC = () => {
	const [user] = useState({
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
						<EnrollData />
					)}
				</div>
			</div>
		</div>
	);
};

export default UserPage;
