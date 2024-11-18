import Link from "next/link";

import { PiXLogo } from "react-icons/pi";

function SidebarLogo() {
   return (
      <div
         className="
   rounded-full h-14 w-14 p-4 flex items-center justify-center hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer transition
   "
      >
         {" "}
         <Link href={"/"}>
            <PiXLogo size={32} color="white" />
         </Link>
      </div>
   );
}

export default SidebarLogo;
