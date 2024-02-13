import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function SettingInfoInsertDegree({ onUpdate }) {
  const [searchParams] = useSearchParams();
  const memberCode = searchParams.get("memCode");
  const [degreeRows, setDegreeRows] = useState([0]);

  const [degForm, setDegForm] = useState([{
    memCode: memberCode,
    degCode: "",
    degKind: "",
    degMajor: "",
    degName: "",
    degGraduation: "",
    degState: "",
    degAdmissions: "",
  }]);


  const onChangeDegHandler = (e, index) => {

    const { name, value } = e.target;

    setDegForm(prevForms => {
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
      setDegreeRows((prevRows) => [...prevRows, {}]);
      setDegForm((prevForms) => [
        ...prevForms,
        {
          memCode: memberCode,
          degCode: "",
          degKind: "",
          degMajor: "",
          degName: "",
          degGraduation: "",
          degState: "",
          degAdmissions: "",
        },
      ]);
  };

  const handleRemoveRow = (index) => {
      setDegreeRows((prevRows) => prevRows.filter((row, i) => i !== index));
      setDegForm((prevForms) => prevForms.filter((form, i) => i !== index));
  };

  useEffect(() => {
    onUpdate(degForm);
  }, [degForm, onUpdate]);


  return (
    <>
      {degreeRows.map((row, index) => (
        <div className="input-group3" key={index}>
          <div className="inputWrapper">
            <input
              className="form-control3"
              type="date"
              style={{
                borderTopLeftRadius: "0.375rem",
                borderBottomLeftRadius: "0.375rem",
              }}
              onChange={(e) => onChangeDegHandler(e, index)}
              name="degAdmissions"
            />
          </div>
          <div className="inputWrapper">
            <input
              className="form-control3"
              type="date"
              onChange={(e) => onChangeDegHandler(e, index)}
              name="degGraduation"
            />
          </div>
          <div className="inputWrapper">
            <input
              type="text"
              className="form-control3"
              aria-describedby="basic-addon11"
              onChange={(e) => onChangeDegHandler(e, index)}
              name="degName"
            />
          </div>
          <div className="inputWrapper">
            <input
              type="text"
              className="form-control3"
              onChange={(e) => onChangeDegHandler(e, index)}
              aria-describedby="basic-addon11"
              id="degMajor"
            />
          </div>
          <div className="inputWrapper">
            <input
              type="text"
              className="form-control3"
              aria-describedby="basic-addon11"
              onChange={(e) => onChangeDegHandler(e, index)}
              name="degKind"
            />
          </div>
          <div className="inputWrapper">
            <select name="degState" className="form-select1">
              <option value={0}>선택</option>
              <option value="졸업">졸업</option>
              <option value="수료">수료</option>
              <option value="재학">재학</option>
              <option value="휴학">휴학</option>
              <option value="중퇴">중퇴</option>
            </select>
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

    </>
  );
}

export default SettingInfoInsertDegree;
