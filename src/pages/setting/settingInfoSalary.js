// import { useSearchParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { callInfoSearchAPI } from "../../apis/SettingInfoSearchAPICalls";

// function Salary(){
//   const [updateSalState, setUpdateSalState] = useState(false);
//   const prevList = useSelector((state) => state.settingInfoSearchReducer);
//   const [salCode, setSalCode] = useState();
//   const [searchParams] = useSearchParams();
//   const memberCode = searchParams.get("memCode");
//   const dispatch = useDispatch();

//   useEffect((memCode) => {
//     dispatch(callInfoSearchAPI({
//       memCode: memberCode,
//   }));
//   },[])

//   const [salForm, setSalForm] = useState(
//     {
//       memCode: memberCode,
//       salNumber: 0,
//       salBankName: "",
      
//     }
//   );

//   const onChangeSalHandler = (e) => {
//     setUpdateSalState(true)
//     setSalForm({...salForm,
//     [e.target.name] : e.target.value})
//     console.log(salForm)
//   };


//     return(
//         <>
//                     <div>
//                 <div
//                   style={{
//                     color: "#696cff",
//                     fontWeight: "bold",
//                     fontSize: "large",
//                   }}
//                 >
//                   급여 통장 정보
//                   <br />
//                 </div>
//                 <div
//                   className="d-flex align-items-start align-items-sm-center gap-4"
//                   id="groupList1"
//                 >
//                   <div className="labelWrapper">
//                     <div className="form-label" style={{ width: "50%" }}>
//                       은행명
//                     </div>
//                     <div className="form-label" style={{ width: "50%" }}>
//                       통장번호
//                     </div>
//                     <div className="form-label" style={{ width: "5%" }} />
//                   </div>
//                 </div>
//                   <div className="input-group3">
//                     <input type="hidden"
//                     value=                    
//                     {(!updateSalState ? (prevList.salary === undefined ? 
//                       0:
//                       prevList.salary.salCode) : salForm.salCode)
//                       }
//                     />
//                     <div className="inputWrapper">
//                     <input
//                         type="text"
//                         className="form-control3"
//                         aria-describedby="basic-addon11"
//                         name="salBankName"
//                         value=                    
//                         {(!updateSalState ? (prevList.salary === undefined ? 
//                           '':
//                           prevList.salary.salBankName) : salForm.salBankName)
//                           }
//                       onChange={onChangeSalHandler}
//                       />
//                     </div>
//                     <div className="inputWrapper">
//                       <input
//                         type="number"
//                         className="form-control3"
//                         aria-describedby="basic-addon11"
//                         name="salNumber"
//                         value=                    
//                         {(!updateSalState ? (prevList.salary === undefined ? 
//                           0:
//                           prevList.salary.salNumber) : salForm.salNumber)
//                           }
//                       onChange={onChangeSalHandler}
//                       />
//                     </div>
//                     <div>
//                       <div
//                         className="form-control3"
//                         style={{
//                           borderTopRightRadius: "0.375rem",
//                           borderBottomRightRadius: "0.375rem",
//                         }}
//                       >
//                         <button
//                           className="bx bx-x"
//                           style={{
//                             border: 0,
//                             backgroundColor: "rgba(0, 0, 0, 0)",
//                           }}
//                         ></button>
//                       </div>
//                     </div>
//                   </div>
//               </div>
//               <br />
//               <hr className="m-0" style={{ marginTop: 20, marginBottom: 20 }} />
//               <br />
//         </>
//     )
// }
// export default Salary;