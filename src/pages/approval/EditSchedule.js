import "../../@core/vendor/css/core.css";
import "./approval.css";
import "../../@core/vendor/css/themeDefault.css";
import "../../@core/css/demo.css";
import "../../@core/css/pay.css";
import "../../@core/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
import "../../@core/vendor/libs/apex-charts/apex-charts.css";
import "../../@core/css/payment-annual.css";
import { decodeJwt } from "../../utils/tokenUtils";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { callAprovalScheduleAPI } from "../../apis/ApprovalAPICalls";

function EditSchedule({ appCodes, refCodes }) {
  const token = decodeJwt(window.localStorage.getItem("accessToken"));
  const navigate = useNavigate();
  const [img, setImg] = useState(null);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
  const day = ("0" + currentDate.getDate()).slice(-2);

  const formattedDate = year + "-" + month + "-" + day;

  const memberCode = appCodes;
  const refCode = refCodes;

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    const day = ("0" + currentDate.getDate()).slice(-2);

    const formattedDate = year + "-" + month + "-" + day;
    setForm({
      approval: {
        payDate: formattedDate,
        payKind: "스케줄 정정",
        approvalMember: {
          memCode: token.memCode,
        },
        payName: "스케줄 정정",
      },
      cMember: {
        memCode: memberCode,
      },
      rMember: refCode,
    });
  }, [memberCode, refCode]);

  const [form, setForm] = useState({
    eshDateType: "",
    eshContents: "",
    eshStartDate: "",
    eshEndDate: "",
    eshOffStartDate: "",
    eshOffEndDate: "",
    approval: {
      payDate: formattedDate,
      payKind: "스케줄 정정",
      approvalMember: {
        memCode: token.memCode,
      },
      payName: "",
    },
    cMember: {
      memCode: memberCode,
    },
  });

  function clearClick() {
    window.location.replace("/main/Assignment");
  }
  const dispatch = useDispatch();

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(form);
  };

  const changePayname = (payname) => {
    setForm((prevForm) => ({
      ...prevForm,
      approval: {
        ...prevForm.approval,
        payName: payname,
      },
    }));

    console.log(form);
  };

  const fileChange = (e) => {
    const file = e.target.files[0];

    console.log("file name : ", file.name);

    setImg(file);

    setForm((prevForm) => ({
      ...prevForm,
      file: file,
    }));
  };

  const approvalComplete = () => {
    console.log("Form:", form);
    console.log("form.vac", form.eshDateType);
    console.log("formDate", form.approval.payDate);

    const formData = new FormData();

    formData.append("eshDateType", form.eshDateType);
    formData.append("eshContents", form.eshContents);
    formData.append("eshStartDate", form.eshStartDate);
    formData.append("eshEndDate", form.eshEndDate);
    formData.append("eshOffEndDate", form.eshOffEndDate);
    formData.append("eshOffStartDate", form.eshOffStartDate);
    formData.append("approval.payDate", form.approval.payDate);
    formData.append(
      "approval.approvalMember.memCode",
      form.approval.approvalMember.memCode
    );
    formData.append("approval.payName", form.approval.payName);
    formData.append("approval.payKind", form.approval.payKind);
    formData.append("cMember.memCode", form.cMember.memCode);
    form.rMember.forEach((memCode, index) => {
      formData.append(`rMember[${index}]`, memCode);
    });

    if (form.file) {
      formData.append("approvalFile", form.file);
    }
    const confirmLeave = window.confirm("결재를 상신하시겠습니까? ");

    dispatch(
      callAprovalScheduleAPI({
        form: formData,
      })
    );
    if (confirmLeave) {
      navigate(`/main/Approval`, { replace: false });
    }
  };

  return (
    <>
      <div>
        제목<span style={{ color: "red" }}> *</span>{" "}
        <input
          type="text"
          id="input-name"
          onChange={(e) => changePayname(e.target.value)}
          name="payName"
        />
      </div>
      <div id="margintop">
        <div>
          정정일<span style={{ color: "red" }}> *</span>
          <input
            name="eshOffStartDate"
            type="date"
            id="annual-date"
            style={{
              marginLeft: "10px",
              marginRight: "10px",
              width: "36%",
            }}
            onChange={onChange}
          />
          <span> ~ </span>
          <input
            name="eshOffEndDate"
            type="date"
            id="annual-date"
            style={{ marginLeft: "10px", width: "36%" }}
            onChange={onChange}
          />
        </div>
        <div>
          근무일<span style={{ color: "red" }}> *</span>
          <input
            name="eshStartDate"
            type="date"
            id="annual-date"
            style={{
              marginLeft: "10px",
              marginRight: "10px",
              width: "36%",
            }}
            onChange={onChange}
          />
          <span> ~ </span>
          <input
            type="date"
            name="eshEndDate"
            id="annual-date"
            style={{ marginLeft: "10px", width: "36%" }}
            onChange={onChange}
          />
        </div>
        <div>
          근무 시간<span style={{ color: "red" }}> *</span>{" "}
          <select
            name="eshDateType"
            style={{ width: "75%", marginLeft: "10px" }}
            onChange={onChange}
          >
            <option value="0"> -- 선택 -- </option>
            <option value="Day"> 07:00 ~ 15:00 </option>
            <option value="Night"> 23:00 ~ 07:00 </option>
            <option value="Evening"> 15:00 ~ 23:00 </option>
          </select>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label htmlFor="basic-default-message">
            내용<span style={{ color: "red" }}> *</span>
          </label>
          <textarea
            onChange={onChange}
            name="eshContents"
            id="annual-content"
            placeholder="내용을 작성해주세요."
            style={{
              height: "150px",
              width: "80%",
              marginLeft: "20px",
            }}
          ></textarea>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label htmlFor="formFileMultiple" className="form-label">
            파일첨부
          </label>
          <div
            className="input-group"
            style={{
              marginLeft: "20px",
              width: "80%",
              paddingBottom: "45px",
            }}
          >
            <input
              name="approvalFile"
              accept="image/jpg,image/png,image/jpeg,image/gif"
              onChange={fileChange}
              type="file"
              className="form-control"
              id="inputGroupFile02"
              style={{
                width: "70%",
                height: "30px",
                paddingBottom: "30px",
              }}
            />
          </div>
        </div>
      </div>
      <hr />
      <div id="last-thing">
        <div
          className="btn btn-danger"
          id="clean-btn1"
          style={{
            width: "20%",
            boxShadow: "0px 0px 10px #bbbdfc",
            backgroundColor: "#bbbdfc",
            borderColor: "#bbbdfc",
          }}
          onClick={clearClick}
        >
          <b>초기화</b>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          id="complete-payment1"
          onClick={approvalComplete}
        >
          작성 완료
        </button>
      </div>
    </>
  );
}

export default EditSchedule;
