import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import coreCSS from "../../@core/vendor/css/core.module.css";
import payCSS from "../../@core/css/pay.module.css";
import pdfImg from "../../@core/img/icons/unicons/pdf.png";
import excelImg from "../../@core/img/icons/unicons/excel.png";
import { callPayListAPI } from "../../apis/PayAPICalls";
import { callPayYEARAPI } from "../../apis/OtherAPICalls";
import { decodeJwt } from "../../utils/tokenUtils";

function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatDate(date) {
  const options = { year: "numeric", month: "2-digit" };
  const formattedDate = new Date(date)
    .toLocaleDateString("en-US", options)
    .replace("/", "-");
  const [year, month] = formattedDate.split("-");
  return `${month}-${year}`;
}

function Pay() {
  const dispatch = useDispatch();
  const params = useParams();
  const token = decodeJwt(window.localStorage.getItem("accessToken"));
  const [payDetailsData, setPayDetailsData] = useState();
  const firstYearMonth = new Date();
  const currentYears = firstYearMonth.getFullYear();
  const [currentYear, setCurrentYear] = useState(currentYears);
  console.log("currentYear : ", currentYear);

  const payList = useSelector((state) => state.payReducer);
  const yList = useSelector((state) => state.otherReducer);
  console.log("yList -------------", yList);
  console.log("payList ~~~~~~~~~~~~~", payList);

  useEffect(() => {
    dispatch(
      callPayListAPI({
        memCode: token.memCode,
        yearMonth: currentYear,
      })
    );
    setPayDetailsData(null);
    console.log(payDetailsData);
    console.log(payList);
  }, [currentYear]);

  useEffect(() => {
    dispatch(
      callPayYEARAPI({
        memCode: token.memCode,
      })
    );
    console.log(yList);
  }, []);

  useEffect(() => {
    setPayDetailsData(null);
  }, [payList]);

  const onClickDetailPay = (pdeCode) => {
    const selectedPayDetail = payList.find((pay) => pay.pdeCode === pdeCode);
    if (selectedPayDetail) {
      setPayDetailsData(selectedPayDetail);
      console.log(selectedPayDetail);
    }
  };

  useEffect(() => {
    if (payList && payList.length > 0 && params.pdeCode) {
      const selectData = payList.find((p) => p.pdeCode === params.pdeCode);
      setPayDetailsData(selectData);
      console.log(selectData);
    }
  }, [payList, params.pdeCode]);

  const onClickChangeYear = (e) => {
    console.log("클릭");
    setCurrentYear(e.target.value);
  };

  // const save = async () => {
  //   const response = await fetch("your_server_url/payConvertPDF", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       payDetailsData,
  //       payList,
  //     }),
  //   });
  // };

  return (
    <>
      <h4
        className={`${coreCSS["fw-bold"]} ${coreCSS["py-3"]} ${coreCSS["mb-4"]}`}
      >
        <span className={`${coreCSS["text-muted"]} ${coreCSS["fw-light"]}`}>
          급여 &gt;
        </span>{" "}
        급여명세서
      </h4>
      <div className={`${coreCSS["col-xxl"]}`}>
        <div className={`${coreCSS["card"]} ${coreCSS["mb-4"]}`}>
          <div className={`${payCSS["pay-top-wrapper"]}`}>
            <div style={{ width: "10%" }}>
              <b>조회연도</b>
            </div>
            <select
              id="defaultSelect"
              className={`${coreCSS["form-select"]}`}
              style={{ width: "10%" }}
              onChange={onClickChangeYear}
            >
              <option>--선택--</option>
              {Array.isArray(yList) &&
                yList.map((y) => <option value={y}>{y}</option>)}
              ;
            </select>
            <div style={{ width: "100%" }} />
            <div style={{ width: "20%" }}>
              <b>급여명세표 출력</b>
            </div>
            <img
              src={pdfImg}
              alt="pdfImg"
              style={{ width: "1.5rem", margin: "0.5rem" }}
            />
            <div
              // onClick={save}
              style={{ width: "5%" }}
            >
              PDF
            </div>
          </div>
          <table className={`${coreCSS["table"]} ${coreCSS["table-hover"]}`}>
            <thead>
              <tr style={{ backgroundColor: "#DCDCFF" }}>
                <th>지급년월</th>
                <th>구분</th>
                <th>지급총액</th>
                <th>공제총액</th>
                <th>차감지급액</th>
                <th>은행명</th>
                <th>계좌번호</th>
                <th>지급일자</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(payList) && payList.length > 0 ? (
                payList.map((p) => (
                  <tr
                    key={p.pdeCode}
                    onClick={() => onClickDetailPay(p.pdeCode)}
                  >
                    <td>{formatDate(p.pdeYymm)}</td>
                    <td>{"정기급여"}</td>
                    <td>{formatNumber(p.pdeSalary)}</td>
                    <td>{formatNumber(p.totalDeduction)}</td>
                    <td>{formatNumber(p.deductedAmount)}</td>
                    <td>{p.salCode && p.salCode.salBankName}</td>{" "}
                    <td>{p.salCode && p.salCode.salNumber}</td>{" "}
                    <td>{p.pdeDate}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">데이터가 없습니다.</td>
                </tr>
              )}

              {Array.isArray(payList) && payList.length > 0 && (
                <tr style={{ backgroundColor: "#EEEEFF" }}>
                  <td>&nbsp;</td>
                  <td>
                    <b>합계</b>
                  </td>
                  <td>
                    <b>
                      {payList[
                        payList.length - 1
                      ].totalDdeSalary.toLocaleString()}
                    </b>
                  </td>
                  <td>
                    <b>
                      {payList[
                        payList.length - 1
                      ].totalDeductions.toLocaleString()}
                    </b>
                  </td>
                  <td>
                    <b>
                      {payList[
                        payList.length - 1
                      ].totalDeductedAmount.toLocaleString()}
                    </b>
                  </td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className={`${coreCSS["row"]}`}>
        <div
          className={`${coreCSS["col-md-6"]} ${coreCSS["col-12"]} ${coreCSS["mb-md-0"]} ${coreCSS["mb-4"]}`}
        >
          <div className={`${coreCSS["card"]}`}>
            <h5 className={`${coreCSS["card-header"]}`}>
              <b>지급사항</b>
            </h5>
            <table className={`${coreCSS["table"]}`}>
              <tbody>
                <tr style={{ backgroundColor: "#DCDCFF" }}>
                  <th style={{ width: "50%" }}>항목</th>
                  <th>금액</th>
                </tr>
                <tr>
                  <td style={{ textAlign: "left" }}>기본급</td>
                  <td style={{ textAlign: "right" }}>
                    {payDetailsData
                      ? formatNumber(payDetailsData.basicSalary) + "원"
                      : ""}
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "left" }}>식비</td>
                  <td style={{ textAlign: "right" }}>
                    {payDetailsData
                      ? formatNumber(payDetailsData.foodExpenses) + "원"
                      : ""}
                  </td>
                </tr>
                <tr>
                  <td style={{ borderBottom: "#ffffff" }}>&nbsp;</td>
                  <td style={{ borderBottom: "#ffffff" }}>&nbsp;</td>
                </tr>
                <tr>
                  <td style={{ borderBottom: "#ffffff" }}>&nbsp;</td>
                  <td style={{ borderBottom: "#ffffff" }}>&nbsp;</td>
                </tr>
                <tr>
                  <td style={{ borderBottom: "#ffffff" }}>&nbsp;</td>
                  <td style={{ borderBottom: "#ffffff" }}>&nbsp;</td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr style={{ backgroundColor: "#EEEEFF" }}>
                  <td style={{ textAlign: "left" }}>
                    <b>합계</b>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <b>
                      {payDetailsData
                        ? formatNumber(payDetailsData.pdeSalary) + "원"
                        : ""}
                    </b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={`${coreCSS["col-md-6"]} ${coreCSS["col-12"]}`}>
          <div className={`${coreCSS["card"]}`}>
            <h5 className={`${coreCSS["card-header"]}`}>
              <b>공제사항</b>
            </h5>
            <table className={`${coreCSS["table"]}`}>
              <tbody>
                <tr style={{ backgroundColor: "#DCDCFF" }}>
                  <th style={{ width: "50%" }}>항목</th>
                  <th>금액</th>
                </tr>
                <tr>
                  <td style={{ textAlign: "left" }}>국민연금</td>
                  <td style={{ textAlign: "right" }}>
                    {payDetailsData
                      ? formatNumber(payDetailsData.nationalPension) + "원"
                      : ""}
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "left" }}>고용보험</td>
                  <td style={{ textAlign: "right" }}>
                    {payDetailsData
                      ? formatNumber(payDetailsData.employmentInsurance) + "원"
                      : ""}
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "left" }}>건강보험료</td>
                  <td style={{ textAlign: "right" }}>
                    {payDetailsData
                      ? formatNumber(payDetailsData.healthInsurance) + "원"
                      : ""}
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "left" }}>노인장기요양보험료</td>
                  <td style={{ textAlign: "right" }}>
                    {payDetailsData
                      ? formatNumber(payDetailsData.medicalInsurance) + "원"
                      : ""}
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "left" }}>소득세</td>
                  <td style={{ textAlign: "right" }}>
                    {payDetailsData
                      ? formatNumber(payDetailsData.incomeTax) + "원"
                      : ""}
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "left" }}>지방소득세</td>
                  <td style={{ textAlign: "right" }}>
                    {payDetailsData
                      ? formatNumber(payDetailsData.localIncomeTax) + "원"
                      : ""}
                  </td>
                </tr>
                <tr style={{ backgroundColor: "#EEEEFF" }}>
                  <td style={{ textAlign: "left" }}>
                    <b>합계</b>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <b>
                      {payDetailsData
                        ? formatNumber(payDetailsData.deductedAmount) + "원"
                        : ""}
                    </b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pay;
