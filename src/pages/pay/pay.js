import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";

function Pay(){

    
    return(
        <>
        <div class="container-xxl flex-grow-1 container-p-y">
              <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">급여 </span> 급여명세서</h4>

             
                <div class="col-xxl">
                  <div class="card mb-4">
                    <div class="pay-top-wrapper">
                      <div style="width: 10%;"><b>조회연도</b></div>
                        <select id="defaultSelect" class="form-select" style="width: 10%;">
                          <option>--선택--</option>
                          <option value="2024">2024</option>
                          <option value="2023">2023</option>
                          <option value="2022">2022</option>
                        </select>
                        <div style="width: 100%;"></div>
                        <div style="width: 20%;"><b>급여명세표 출력</b></div>
                        {/* <img src="../../assets/img/icons/unicons/excel.png" class="pay-img"><div style="width: 5%;">엑셀</div> */}
                        {/* <img src="../../assets/img/icons/unicons/pdf.png" class="pay-img"><div style="width: 5%;">PDF</div> */}
                    </div>
                    <table class="table table-hover">
                      <thead>
                      <tr style="background-color: #DCDCFF;">
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
                      <tr style="background-color: #EEEEFF;">
                        <td>&nbsp;</td>
                        <td><b>합계</b></td>
                        <td><b>원</b></td>
                        <td><b>원</b></td>
                        <td><b>원</b></td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                      </tr>
                     </table>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 col-12 mb-md-0 mb-4">
                    <div class="card">
                      <h5 class="card-header"><b>지급사항</b></h5>
                      <table class="table">                        
                        <tr style="background-color: #DCDCFF;">
                          <th>항목</th>
                          <th>금액</th>
                        </tr>
                        <tr>
                          <td style="text-align: left;">기본급</td>
                          <td style="text-align: right;">3,800,000원</td>
                        </tr>
                        <tr>
                          <td style="text-align: left;">식비</td>
                          <td style="text-align: right;">200,000원</td>
                        </tr>
                        <tr>
                          <td style="border-bottom: #ffffff;">&nbsp;</td>
                          <td style="border-bottom: #ffffff;">&nbsp;</td>
                        </tr>
                        <tr>
                          <td style="border-bottom: #ffffff;">&nbsp;</td>
                          <td style="border-bottom: #ffffff;">&nbsp;</td>
                        </tr>
                        <tr>
                          <td style="border-bottom: #ffffff;">&nbsp;</td>
                          <td style="border-bottom: #ffffff;">&nbsp;</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        
                        <tr style="background-color: #EEEEFF;">
                          <td style="text-align: left;"><b>합계</b></td>
                          <td style="text-align: right;"><b>4,000,000원</b></td>
                        </tr>
                       </table>
                    </div>
                  </div>
                  <div class="col-md-6 col-12">
                    <div class="card">
                      <h5 class="card-header"><b>공제사항</b></h5>
                      <table class="table">                        
                        <tr style="background-color: #DCDCFF;">
                          <th>항목</th>
                          <th>금액</th>
                        </tr>
                        <tr>
                          <td style="text-align: left;">국민연금</td>
                          <td style="text-align: right;">171,000원</td>
                        </tr>
                        <tr>
                          <td style="text-align: left;">고용보험</td>
                          <td style="text-align: right;">34,200원</td>
                        </tr>
                        <tr>
                          <td style="text-align: left;">건강보험료</td>
                          <td style="text-align: right;">134,710원</td>
                        </tr>
                        <tr>
                          <td style="text-align: left;">노인장기요양보험료</td>
                          <td style="text-align: right;">17,250원</td>
                        </tr>
                        <tr>
                          <td style="text-align: left;">소득세</td>
                          <td style="text-align: right;">184,260원</td>
                        </tr>
                        <tr>
                          <td style="text-align: left;">지방소득세</td>
                          <td style="text-align: right;">18,420원</td>
                        </tr>
                        <tr style="background-color: #EEEEFF;">
                          <td style="text-align: left;"><b>합계</b></td>
                          <td style="text-align: right;"><b>559,840원</b></td>
                        </tr>
                       </table>
                          
                    </div>
                  </div>
                </div>
            </div>
            </>
    );
}

export default Pay;