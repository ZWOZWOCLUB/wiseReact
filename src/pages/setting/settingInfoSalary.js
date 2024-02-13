import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callSalaryDeleteAPI } from "../../apis/SettingSalAPICalls";

function SettingInfoSalary({ onUpdate }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const memberCode = searchParams.get("memCode");
  const prevList = useSelector(state => state.settingInfoSearchReducer);
  const [updateSalState, setUpdateSalState] = useState(false);

  const [salForm, setSalForm] = useState({
    memCode: memberCode,
    salCode: '',
    salNumber: '',
    salBankName: '',
  });

  useEffect(() => {

    if (prevList.salary) {
      setSalForm(prevForm => ({
        ...prevForm,
        salCode: prevList.salary.salCode,
        salNumber: prevList.salary.salNumber,
        salBankName: prevList.salary.salBankName,
      }));
    }
  }, [prevList]);


  const onChangeSalHandler = (e) => {
    setUpdateSalState(true);

    const { name, value } = e.target;

    setSalForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
    console.log(salForm);
  };
  
 
  const handleRemoveRow = () => {
    const salCode = prevList.salary.salCode;

    if (prevList.salaryFileDTO) {
      alert('통장 증명 파일이 등록되어 있어 삭제 불가능합니다. \n 파일 먼저 삭제해 주세요')
    } else {
      dispatch(callSalaryDeleteAPI({ salCode }))
      window.location.reload();

    }
  };

  useEffect(() => {
    onUpdate(salForm);
  }, [salForm, onUpdate]);

  return (
    <>
              <div>
                <div
                  style={{
                    color: "#696cff",
                    fontWeight: "bold",
                    fontSize: "large",
                  }}
                >
                  급여 통장 정보
                  <br />
                </div>
                <div
                  className="d-flex align-items-start align-items-sm-center gap-4"
                  id="groupList1"
                >
                  <div className="labelWrapper">
                    <div className="form-label" style={{ width: "50%" }}>
                      은행명
                    </div>
                    <div className="form-label" style={{ width: "50%" }}>
                      통장번호
                    </div>
                    <div className="form-label" style={{ width: "5%" }} />
                  </div>
                </div>
                <div className="input-group3">
                  <input type="hidden"
                                        name="salBankName"
                                        id="salBankName"
                    value=
                    {(!updateSalState ? (prevList.salary ?
                      prevList.salary.salCode : 0) : salForm.salCode)
                    }
                  />
                  <div className="inputWrapper">
                    <input
                      type="text"
                      className="form-control3"
                      aria-describedby="basic-addon11"
                      name="salBankName"
                      id="salBankName"
                      value=
                      {(!updateSalState ? (prevList.salary ?
                        prevList.salary.salBankName : '') : salForm.salBankName)
                      }
                      onChange={onChangeSalHandler}
                    />
                  </div>
                  <div className="inputWrapper">
                    <input
                      type="number"
                      className="form-control3"
                      aria-describedby="basic-addon11"
                      name="salNumber"
                      id="salNumber"
                      value=
                      {(!updateSalState ? (prevList.salary ?
                        prevList.salary.salNumber : '') : salForm.salNumber)
                      }
                      onChange={onChangeSalHandler}
                    />
                  </div>
                  <div>
                    <div
                      className="form-control3"
                      style={{
                        borderTopRightRadius: "0.375rem",
                        borderBottomRightRadius: "0.375rem",
                      }}
                    >
                      <button
                        className="bx bx-x"
                        onClick={handleRemoveRow}
                        style={{
                          border: 0,
                          backgroundColor: "rgba(0, 0, 0, 0)",
                        }}
                      ></button>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <hr className="m-0" style={{ marginTop: 20, marginBottom: 20 }} />
              <br />
    </>
  );
}

export default SettingInfoSalary;
