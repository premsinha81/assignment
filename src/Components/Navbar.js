import React from "react";
import { useEffect, useState } from 'react';
const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");
  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme)
  }, [theme])

  return (

    <main>
      <div className="relative navbar bg-base-100">
        <div className="modePostion">
        <div class="size-32">
          <div className="size-14">
          <label className="swap swap-rotate text-right">
            <input type="checkbox" onChange={handleToggle}  /> <span>Change Mode</span>
          </label>
        </div>
        </div>
        </div>
      </div>


    </main>
  )
}
export default Navbar;