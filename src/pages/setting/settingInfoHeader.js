// import { useNavigate, useSearchParams } from "react-router-dom";
// import { useEffect, useState } from "react";



// function SettingNav(){
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState();


//     const handleTabClick = (tab) => {
//         setActiveTab(tab);
    
//         if (tab === "프로필 정보") {
//           navigate("/memberAdd", { replace: true });
//         }
//         if (tab === "인사 정보") {
//           navigate("/settingInfo", { replace: true });
//         }
//         if (tab === "연차 관리") {
//           navigate("/settingVacation", { replace: true });
//         }
//         if (tab === "서류함") {
//           navigate("/settingDocument", { replace: true });
//         }
//       };
    
//     return(
//         <>
//         <ul className="nav nav-pills flex-column flex-md-row mb-3">
//             <li className={`nav-item`} style={{ cursor: "pointer" }}>
//               <li
//                 className={`nav-link `}
//                 onClick={() => handleTabClick("프로필 정보")}
//               >
//                 프로필 정보
//               </li>
//             </li>
//             <li className={`nav-item`} style={{ cursor: "pointer" }}>
//               <li
//                 className={`nav-link active`}
//                 onClick={() => handleTabClick("인사 정보")}
//               >
//                 인사 정보
//               </li>
//             </li>
//             <li className={`nav-item`} style={{ cursor: "pointer" }}>
//               <li
//                 className={`nav-link `}
//                 onClick={() => handleTabClick("서류함")}
//               >
//                 서류함
//               </li>
//             </li>
//             <li className={`nav-item`} style={{ cursor: "pointer" }}>
//               <li
//                 className={`nav-link `}
//                 onClick={() => handleTabClick("연차 관리")}
//               >
//                 연차 관리
//               </li>
//             </li>
//           </ul>
//         </>
//     )
// }

// export default SettingNav;