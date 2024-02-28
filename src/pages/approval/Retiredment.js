import "../../@core/vendor/css/core.css";
import "./approval.css";
import "./retire.css";
import "../../@core/vendor/css/themeDefault.css";
import "../../@core/css/demo.css";
import "../../@core/css/pay.css";
import "../../@core/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
import "../../@core/vendor/libs/apex-charts/apex-charts.css";
import { decodeJwt } from "../../utils/tokenUtils";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { callAprovalRetiredAPI } from "../../apis/ApprovalAPICalls";

function Retiredment({ appCodes, refCodes }) {
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
        payKind: "퇴직 신청",
        approvalMember: {
          memCode: token.memCode,
        },
        payName: "퇴직 신청",
      },
      cMember: {
        memCode: memberCode,
      },
      rMember: refCode,
    });
  }, [memberCode, refCode]);

  const [form, setForm] = useState({
    tirDate: "",
    tirContents: "",
    approval: {
      payDate: formattedDate,
      payKind: "퇴직 신청",
      approvalMember: {
        memCode: token.memCode,
      },
      payName: "퇴직 신청",
    },
    cMember: {
      memCode: memberCode,
    },
  });

  const dispatch = useDispatch();

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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
  function clearClick() {
    window.location.replace("/main/requestApproval");
  }

  const approvalComplete = () => {
    const formData = new FormData();

    formData.append("tirDate", form.tirDate);
    formData.append("tirContents", form.tirContents);
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
      callAprovalRetiredAPI({
        form: formData,
      }),
      console.log("dt")
    );
    if (confirmLeave) {
      navigate(`/main/Approval`, { replace: false });
    }

    // navigate(`/main/Approval`, { replace: false });
  };
  return (
    <>
      <div id="re-div">
        <div id="top-section">
          <span style={{ height: "50px" }}>퇴직 준비 확인</span>
          <input type="checkbox" style={{ marginBottom: "50px" }}></input>
        </div>
        <div id="bottom-section">
          <span>퇴직 절차에 관한 안내와 서류 결재처리가 완료되었나요?</span>
          <br />
          <span>입사시 받은 물품 반납 및 휴가, 미결재 문서 처리 등</span>
        </div>
      </div>
      <div id="margintop">
        <div>
          퇴직일<span style={{ color: "red" }}> *</span>
          <input
            onChange={onChange}
            name="tirDate"
            type="date"
            id="annual-date"
            style={{
              marginLeft: "10px",
              marginRight: "10px",
              width: "80%",
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label htmlFor="basic-default-message">
            내용<span style={{ color: "red" }}> *</span>
          </label>
          <textarea
            onChange={onChange}
            name="tirContents"
            id="annual-content"
            placeholder="퇴직 사유을 작성해주세요."
            style={{
              height: "100px",
              width: "82%",
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
              onChange={fileChange}
              accept="image/jpg,image/png,image/jpeg,image/gif"
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

export default Retiredment;
