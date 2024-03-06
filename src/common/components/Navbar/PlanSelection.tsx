export default function PlanSelection() {
  return (
    <div className="plan-select w-screen">
      <div className=" mx-auto flex justify-between items-center pb-10 gap-6 mt-12">
        <h1>หลักสูตรการศึกษา</h1>
        <select
          className="w-auto h-[40px]  px-4 bg-white rounded-3xl border-2 border-solid border-blue-shadeb5 justify-center items-center gap-2.5 inline-flex"
          style={{
            fontFamily: "IBM Plex Sans Thai, sans-serif",
            fontWeight: "bold",
            fontSize: "18px",
            color: "#4351CC",
          }}
        >
          {/* <div className="w-80 h-10 px-3 bg-white rounded-3xl border border-solid border-blue-shadeb5 justify-center items-center gap-2.5 inline-flex">
            <h1 className="text-center text-indigo-700 ">CPE Normal Plan</h1>
            <div className="px-2 rounded-2xl border border-solid border-zinc-300 justify-center items-center gap-2.5 flex">
              <span className="text-center text-zinc-300 ">Default</span>
            </div>
          </div> */}
          <option select-text="YES!!!">CPE Normal Plan 2563 </option>
          <option select-text="-- EMPTY --">CPE CO-OP Plan 2563 </option>
        </select>
        <button className="bg-gray-shadegr6 hover:gray-shadegr6 text-white font-bold py-2 px-4 rounded-xl">
          แก้ไขแพลนนี้
        </button>
      </div>
    </div>
  );
}
