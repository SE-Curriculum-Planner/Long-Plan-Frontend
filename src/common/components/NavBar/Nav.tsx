// Navbar.tsx
import React from "react";
import "./Nav.css";

const Navbar: React.FC<{}> = () => {
  return (
    <div className="navbar bg-white text-black flex flex-col ">
      {/* ส่วนโลโก้หรือเนื้อหาที่ต้องการให้เป็นโลโก้ */}
      <div className="logo">Logo</div>
      
        {/* ปุ่ม Create */}
        <button className="create-btn">Create</button>

        {/* ปุ่ม Profile */}
        <button className="profile-btn">Profile</button>

        {/* ปุ่ม Logout */}
        <button className="logout-btn">Logout</button>
      
    </div>
  );
};

export default Navbar;
