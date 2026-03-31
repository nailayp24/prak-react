import { createRoot } from "react-dom/client";
// import TailwindCSS from "./TailwindCSS";
import './tailwind.css';
import UserForm from "./UserForm";
import TaiwindCSS from "./TailwindCSS";
import HitungGajiForm from "./HitungGajiForm";

createRoot(document.getElementById("root"))
    .render(
        <div>
          {/* <TaiwindCSS/> */}
           {/* <UserForm/> */}
           <HitungGajiForm/>
        </div>
    )

    