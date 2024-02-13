import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callCertificateDeleteAPI } from "../../apis/SettingCertificatAPICalls";

function SettingInfoUpdateCertificate({ onUpdate }) {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const memberCode = searchParams.get("memCode");
  const prevList = useSelector(state => state.settingInfoSearchReducer);
  const [updateCerState, setUpdateCerState] = useState(false);


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

  useEffect(() => {
    if (Array.isArray(prevList.certificateDTO)) {
      setCerForm(prevForms => {
        return prevList.certificateDTO.map(cer => ({
          memCode: memberCode,
          cerCode: cer.cerCode,
          cerName: cer.cerName,
          cerKind: cer.cerKind,
          cerDay: cer.cerDay,
          cerEndDate: cer.cerEndDate,
          cerDescription: cer.cerDescription,
          cerInstitution: cer.cerInstitution,
        }));
      });
    }
  }, [prevList]);
  const onChangeCerHandler = (e, index) => {
    setUpdateCerState(true);

    const { name, value } = e.target;

    setCerForm(prevForms => {
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
    onUpdate(cerForm);
  }, [cerForm, onUpdate]);


  const handleRemoveRow = (index) => {
    const cerCode = prevList.certificateDTO[index].cerCode;
    const findMatchCode = prevList.certificateDTO.some(file => file.cerCode === cerCode);

    if (findMatchCode) {
      alert('자격 증명 파일이 등록되어 있어 삭제 불가능합니다. \n 파일 먼저 삭제해 주세요')
    } else {
      dispatch(callCertificateDeleteAPI({ cerCode }))
      window.location.reload();

    }
  };

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
          자격
          <br />
        </div>
        <div
          className="d-flex align-items-start align-items-sm-center gap-4"
          id="groupList1"
        >
          <div className="labelWrapper">
            <div className="form-label" style={{ width: "24%" }}>
              취득일자
            </div>
            <div className="form-label" style={{ width: "24%" }}>
              자격만료일
            </div>
            <div className="form-label" style={{ width: "24%" }}>
              취득자격
            </div>
            <div className="form-label" style={{ width: "24%" }}>
              자격번호
            </div>
            <div className="form-label" style={{ width: "24%" }}>
              발행기관
            </div>
            <div className="form-label" style={{ width: "24%" }}>
              비고
            </div>
            <div className="form-label" style={{ width: "5%" }} />
          </div>
        </div>
        {Array.isArray(prevList.certificateDTO) && prevList.certificateDTO.length > 0 ? (
          prevList.certificateDTO.map((cer, index) => (
            <div className="input-group3" key={index}>
              <input type="hidden" value={cer.cerCode} />
              <div className="inputWrapper">
                <input
                  className="form-control3"
                  type="date"
                  style={{
                    borderTopLeftRadius: "0.375rem",
                    borderBottomLeftRadius: "0.375rem",
                  }}
                  onChange={(e) => onChangeCerHandler(e, index)}
                  name="cerDay"
                  value={(!updateCerState ? cer.cerDay : cerForm.cerDay)}
                />
              </div>
              <div className="inputWrapper">
                <input
                  type="date"
                  className="form-control3"
                  aria-describedby="basic-addon11"
                  onChange={(e) => onChangeCerHandler(e, index)}
                  name="cerEndDate"
                  value={(!updateCerState ? cer.cerEndDate : cerForm.cerEndDate)}
                />
              </div>
              <div className="inputWrapper">
                <input
                  type="text"
                  className="form-control3"
                  aria-describedby="basic-addon11"
                  onChange={(e) => onChangeCerHandler(e, index)}
                  name="cerName"
                  value={(!updateCerState ? cer.cerName : cerForm.cerName)}
                />
              </div>
              <div className="inputWrapper">
                <input
                  type="number"
                  className="form-control3"
                  aria-describedby="basic-addon11"
                  onChange={(e) => onChangeCerHandler(e, index)}
                  name="cerKind"
                  value={(!updateCerState ? cer.cerKind : cerForm.cerKind)}

                />
              </div>
              <div className="inputWrapper">
                <input
                  type="text"
                  className="form-control3"
                  aria-describedby="basic-addon11"
                  onChange={(e) => onChangeCerHandler(e, index)}
                  name="cerInstitution"
                  value={(!updateCerState ? cer.cerInstitution : cerForm.cerInstitution)}

                />
              </div>
              <div className="inputWrapper">
                <input
                  type="text"
                  className="form-control3"
                  aria-describedby="basic-addon11"
                  onChange={(e) => onChangeCerHandler(e, index)}
                  name="cerDescription"
                  value={(!updateCerState ? cer.cerDescription : cerForm.cerDescription)}
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
          ))
        ) : null}
      </div>
    </>
  );
}

export default SettingInfoUpdateCertificate;
