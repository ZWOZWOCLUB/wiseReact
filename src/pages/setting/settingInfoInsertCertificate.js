import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function SettingInfoInsertCertificate({ onUpdate }) {
  const [searchParams] = useSearchParams();
  const memberCode = searchParams.get("memCode");

  const [stateIndex, setStateIndex] = useState();
  let [certificateRows, setCertificateRows] = useState([0]);
  const prevList = useSelector((state) => state.settingCertificateInsertReducer);

  const [cerForm, setCerForm] = useState([
    {
      memCode: memberCode,
      cerCode: "",
      cerName: "",
      cerKind: "",
      cerDay: "",
      cerEndDate: "",
      cerDescription: "",
      cerInstitution: "",
    },
  ]);

  const onChangeCerHandler = (e, index) => {
    const { name, value } = e.target;
    setCerForm((prevForms) => {
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

  useEffect(() => {
    setCerForm([
      {
        memCode: memberCode,
        cerCode: "",
        cerName: "",
        cerKind: "",
        cerDay: "",
        cerEndDate: "",
        cerDescription: "",
        cerInstitution: "",
      }
    ]);
    setCertificateRows([0])
  }, [prevList]);
  
  const handleAddRow = () => {
    console.log("클릭", certificateRows);
    setCertificateRows((prevRows) => [...prevRows, {}]);
    setCerForm((prevForms) => [
      ...prevForms,
      {
        memCode: memberCode,
        cerCode: "",
        cerName: "",
        cerKind: "",
        cerDay: "",
        cerEndDate: "",
        cerDescription: "",
        cerInstitution: "",
      },
    ]);
  };

  const handleRemoveRow = (index) => {
    console.log("................................", index);
    certificateRows.splice(index, 1);
    setCerForm((prevForms) => prevForms.filter((form, i) => i !== index));
  };
  console.log("cerForm", cerForm);

  useEffect(() => {
    onUpdate(cerForm);
  }, [cerForm, onUpdate]);

  return (
    <>
      <div>
        {certificateRows.map((row, index) => (
          <div className="input-group3" key={index}>
            <div className="inputWrapper">
              <input
                className="form-control3"
                type="date"
                style={{
                  borderTopLeftRadius: "0.375rem",
                  borderBottomLeftRadius: "0.375rem",
                }}
                id="inputGroup1"
                onChange={(e) => onChangeCerHandler(e, index)}
                name="cerDay"
              value={cerForm[index]? cerForm[index].cerDay : ''}

              />
            </div>
            <div className="inputWrapper">
              <input
                type="date"
                className="form-control3"
                aria-describedby="basic-addon11"
                onChange={(e) => onChangeCerHandler(e, index)}
                name="cerEndDate"
              value={cerForm[index]? cerForm[index].cerEndDate : ''}

              />
            </div>
            <div className="inputWrapper">
              <input
                type="text"
                className="form-control3"
                aria-describedby="basic-addon11"
                id="inputGroup2"
                name="cerName"
                onChange={(e) => onChangeCerHandler(e, index)}
              value={cerForm[index]? cerForm[index].cerName : ''}

              />
            </div>
            <div className="inputWrapper">
              <input
                type="number"
                className="form-control3"
                aria-describedby="basic-addon11"
                onChange={(e) => onChangeCerHandler(e, index)}
                name="cerKind"
              value={cerForm[index]? cerForm[index].cerKind : ''}

              />
            </div>
            <div className="inputWrapper">
              <input
                type="text"
                className="form-control3"
                aria-describedby="basic-addon11"
                id="inputGroup3"
                onChange={(e) => onChangeCerHandler(e, index)}
                name="cerInstitution"
              value={cerForm[index]? cerForm[index].cerInstitution : ''}

              />
            </div>
            <div className="inputWrapper">
              <input
                type="text"
                className="form-control3"
                aria-describedby="basic-addon11"
                id="inputGroup4"
                onChange={(e) => onChangeCerHandler(e, index)}
                name="cerDescription"
              value={cerForm[index]? cerForm[index].cerDescription : ''}

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
      </div>
      <div className="addList" onClick={() => handleAddRow()}>
        +추가
      </div>
      <br />
      <hr className="m-0" style={{ marginTop: 20, marginBottom: 20 }} />
      <br />
    </>
  );
}

export default SettingInfoInsertCertificate;
