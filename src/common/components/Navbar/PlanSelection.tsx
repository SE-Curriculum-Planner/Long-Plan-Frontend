export default function PlanSelection() {
  return (
    <div className="plan-select w-screen">
      <div className=" mx-auto flex justify-between items-center pb-10 gap-4">
        <a>แผนการเรียนรู้หลักสูตร</a>
        <select className="w-[200px] h-[40px] rounded-xl">
          <option select-text="-- EMPTY --">CPE Not Normal Plan </option>
          <option select-text="YES!!!">CPE Normal Plan</option>
        </select>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl">
          แก้ไขแพลนนี้
        </button>
      </div>
    </div>
  );
}
