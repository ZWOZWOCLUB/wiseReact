import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function SettingInfoInsertCareer({ onUpdate, insertEvent }) {
  const [searchParams] = useSearchParams();
  const memberCode = searchParams.get("memCode");
  const [careerRows, setCareerRows] = useState([0]);

  const [crrForm, setCrrForm] = useState([
    {
      memCode: memberCode,
      crrCode: "",
      crrName: "",
      crrPosition: "",
      crrStartDate: "",
      crrEndDate: "",
      crrState: "Y",
      crrDescription: "",
    },
  ]);

  const onChangeCrrHandler = (e, index) => {
    const { name, value } = e.target;

    setCrrForm((prevForms) => {
      return prevForms.map((form, idx) => {
        if (idx === index) {
          return {
            ...form,
            [name]: value,
          };
        }
        return form;
      });
    });
  };

  const handleAddRow = () => {
    setCareerRows((prevRows) => [...prevRows, {}]);
    setCrrForm((prevForms) => [
      ...prevForms,
      {
        memCode: memberCode,
        crrCode: "",
        crrName: "",
        crrPosition: "",
        crrStartDate: "",
        crrEndDate: "",
        crrState: "Y",
        crrDescription: "",
      },
    ]);
  };

  const handleRemoveRow = (a) => {
    console.log(a);
    setCareerRows((prevRows) =>
      prevRows.filter((row, index) => {
        console.log(a, index);
      })
    );
    setCrrForm((prevForms) => prevForms.filter((form, i) => i !== a));
  };

  useEffect(() => {
    onUpdate(crrForm);
  }, [crrForm, onUpdate]);
  console.log("crrForm", crrForm);

  return (
    <>
      {careerRows.map((row, index) => (
        <div className="input-group3" key={index}>
          <div className="inputWrapper">
            <input
              className="form-control3"
              type="date"
              style={{
                borderTopLeftRadius: "0.375rem",
                borderBottomLeftRadius: "0.375rem",
              }}
              onChange={(e) => onChangeCrrHandler(e, index)}
              name="crrStartDate"
            />
          </div>
          <div className="inputWrapper">
            <input
              className="form-control3"
              type="date"
              onChange={(e) => onChangeCrrHandler(e, index)}
              name="crrEndDate"
            />
          </div>
          <div className="inputWrapper">
            <input
              type="text"
              className="form-control3"
              aria-describedby="basic-addon11"
              onChange={(e) => onChangeCrrHandler(e, index)}
              name="crrName"
            />
          </div>
          <div className="inputWrapper">
            <input
              type="text"
              className="form-control3"
              aria-describedby="basic-addon11"
              onChange={(e) => onChangeCrrHandler(e, index)}
              name="crrPosition"
            />
          </div>
          <div className="inputWrapper">
            <input
              type="text"
              className="form-control3"
              aria-describedby="basic-addon11"
              onChange={(e) => onChangeCrrHandler(e, index)}
              name="crrDescription"
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
                onClick={() => handleRemoveRow(index)}
                style={{
                  border: 0,
                  backgroundColor: "rgba(0, 0, 0, 0)",
                }}
              ></button>
            </div>
          </div>
        </div>
      ))}
      <div className="addList" onClick={() => handleAddRow()}>
        +추가
      </div>
      <br />
      <hr className="m-0" style={{ marginTop: 20, marginBottom: 20 }} />
      <br />
    </>
  );
}

export default SettingInfoInsertCareer;
