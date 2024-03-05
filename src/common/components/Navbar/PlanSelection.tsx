export default function PlanSelection() {
  return (
    <div className="plan-select w-screen">
      <div className=" mx-auto flex justify-between items-center pb-10 gap-4 mt-10">
        <h1>หลักสูตรการศึกษา</h1>
        <select
          className="w-auto h-[40px] rounded-xl"
          style={{ fontFamily: "IBM Plex Sans Thai, sans-serif" }}
        >
          <option select-text="-- EMPTY --">CPE CO-OP Plan </option>
          <option select-text="YES!!!">CPE Normal Plan</option>
        </select>
        <button className="bg-gray-shadegr6 hover:gray-shadegr6 text-white font-bold py-2 px-4 rounded-xl">
          แก้ไขแพลนนี้
        </button>
      </div>
    </div>
  );
}
