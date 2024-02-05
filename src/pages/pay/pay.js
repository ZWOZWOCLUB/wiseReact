import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";
import coreCSS from '../../@core/vendor/css/core.module.css';
import payCSS from '../../@core/css/pay.module.css'

function Pay(){
  const navigate = useNavigate();

  const dispatch = useDispatch();


    return(
        <>
  <h4 className={`${coreCSS['fw-bold']} ${coreCSS['py-3']} ${coreCSS['mb-4']}`}>
    <span className={`${coreCSS['text-muted']} ${coreCSS['fw-light']}`}>급여 &gt;</span> 급여명세서
  </h4>
  <div className={`${coreCSS['col-xxl']}`}>
    <div className={`${coreCSS['card']} ${coreCSS['mb-4']}`}>
      <div className={`${payCSS['pay-top-wrapper']}`}>
        <div style={{ width: "10%" }}>
          <b>조회연도</b>
        </div>
        <select
          id="defaultSelect"
          className={`${coreCSS['form-select']}`}
          style={{ width: "10%" }}
        >
          <option>--선택--</option>
          <option value={2024}>2024</option>
          <option value={2023}>2023</option>
          <option value={2022}>2022</option>
        </select>
        <div style={{ width: "100%" }} />
        <div style={{ width: "20%" }}>
          <b>급여명세표 출력</b>
        </div>
        <div style={{ width: "5%" }}>엑셀</div>
        <div style={{ width: "5%" }}>PDF</div>
      </div>
      <table className={`${coreCSS['table']} ${coreCSS['table-hover']}`}>
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
          <tr>
            <td>2023-11</td>
            <td>정기급여</td>
            <td>4,000,000원</td>
            <td>559,840원</td>
            <td>3,440,160원</td>
            <td>국민은행</td>
            <td>000000-00-000000</td>
            <td>2023-12-25</td>
          </tr>
          <tr style={{ backgroundColor: "#EEEEFF" }}>
            <td>&nbsp;</td>
            <td>
              <b>합계</b>
            </td>
            <td>
              <b>원</b>
            </td>
            <td>
              <b>원</b>
            </td>
            <td>
              <b>원</b>
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div className={`${coreCSS['row']}`}>
    <div className={`${coreCSS['col-md-6']} ${coreCSS['col-12']} ${coreCSS['mb-md-0']} ${coreCSS['mb-4']}`}>
      <div className={`${coreCSS['card']}`}>
        <h5 className={`${coreCSS['card-header']}`}>
          <b>지급사항</b>
        </h5>
        <table className={`${coreCSS['table']}`}>
          <tbody>
            <tr style={{ backgroundColor: "#DCDCFF" }}>
              <th>항목</th>
              <th>금액</th>
            </tr>
            <tr>
              <td style={{ textAlign: "left" }}>기본급</td>
              <td style={{ textAlign: "right" }}>3,800,000원</td>
            </tr>
            <tr>
              <td style={{ textAlign: "left" }}>식비</td>
              <td style={{ textAlign: "right" }}>200,000원</td>
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
                <b>4,000,000원</b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div className={`${coreCSS['col-md-6']} ${coreCSS['col-12']}`}>
      <div className={`${coreCSS['card']}`}>
        <h5 className={`${coreCSS['card-header']}`}>
          <b>공제사항</b>
        </h5>
        <table className={`${coreCSS['table']}`}>
          <tbody>
            <tr style={{ backgroundColor: "#DCDCFF" }}>
              <th>항목</th>
              <th>금액</th>
            </tr>
            <tr>
              <td style={{ textAlign: "left" }}>국민연금</td>
              <td style={{ textAlign: "right" }}>171,000원</td>
            </tr>
            <tr>
              <td style={{ textAlign: "left" }}>고용보험</td>
              <td style={{ textAlign: "right" }}>34,200원</td>
            </tr>
            <tr>
              <td style={{ textAlign: "left" }}>건강보험료</td>
              <td style={{ textAlign: "right" }}>134,710원</td>
            </tr>
            <tr>
              <td style={{ textAlign: "left" }}>노인장기요양보험료</td>
              <td style={{ textAlign: "right" }}>17,250원</td>
            </tr>
            <tr>
              <td style={{ textAlign: "left" }}>소득세</td>
              <td style={{ textAlign: "right" }}>184,260원</td>
            </tr>
            <tr>
              <td style={{ textAlign: "left" }}>지방소득세</td>
              <td style={{ textAlign: "right" }}>18,420원</td>
            </tr>
            <tr style={{ backgroundColor: "#EEEEFF" }}>
              <td style={{ textAlign: "left" }}>
                <b>합계</b>
              </td>
              <td style={{ textAlign: "right" }}>
                <b>559,840원</b>
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