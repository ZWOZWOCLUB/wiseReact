import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";
import coreCSS from '../../@core/vendor/css/core.module.css';
import payCSS from '../../@core/css/pay.module.css'

import{
    SettingMemverListAPICalls
} from '../../apis/SettingMemverListAPICalls';

function Setting(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const member = useSelector(state => state.)
    return(
        <>
  <h4 className={`${coreCSS['fw-bold']} ${coreCSS['py-3']} ${coreCSS['mb-4']}`}>
    <span className={`${coreCSS['text-muted']} ${coreCSS['fw-light']}`}>설정 &gt;</span> 전체직원조회 <span><button>직원 등록</button></span>
  </h4>
  <div className={`${coreCSS['col-xxl']}`}>
    <div className={`${coreCSS['card']} ${coreCSS['mb-4']}`}>
      <table className={`${coreCSS['table']} ${coreCSS['table-hover']}`}>
        <thead>
          <tr style={{ backgroundColor: "#DCDCFF" }}>
            <th>No.</th>
            <th>사번</th>
            <th>성명</th>
            <th>부서</th>
            <th>직책</th>
            <th>입사일</th>
            <th>퇴사일</th>
            <th>연락처</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1.</td>
            <td>000000</td>
            <td>김김김</td>
            <td>간호1팀</td>
            <td>의과장</td>
            <td>2000-00-00</td>
            <td>0000-00-00</td>
            <td>000-0000-0000</td>
          </tr>
        </tbody>
      </table>
      <div className={`${payCSS['input-group2']}`}>
        <span className={`${payCSS['input-group-text2']}`} id="basic-addon11">
          사번/성명
        </span>
        <input
          type="text"
          className={`${payCSS['form-control2']}`}
          placeholder="검색어를 입력하세요"
          aria-describedby="basic-addon11"
        />
        <span className={`${payCSS['input-group-text']}`} id="basic-addon-search31">
          <i className="bx bx-search" />
        </span>
      </div>
      <nav aria-label="Page navigation">
        <ul
          className={`${coreCSS['pagination']} ${coreCSS['justify-content-center']}`}
          style={{ paddingTop: 20 }}
        >
          <li className={`${coreCSS['page-item']} ${coreCSS['first']}`}>
            <a className={`${coreCSS['page-link']}`} href="javascript:void(0);">
              <i className="tf-icon bx bx-chevrons-left" />
            </a>
          </li>
          <li className={`${coreCSS['page-item']} ${coreCSS['prev']}`}>
            <a className={`${coreCSS['page-link']}`} href="javascript:void(0);">
              <i className="tf-icon bx bx-chevron-left" />
            </a>
          </li>
          <li className={`${coreCSS['page-item']}`}>
            <a className={`${coreCSS['page-link']}`} href="javascript:void(0);">
              1
            </a>
          </li>
          <li className={`${coreCSS['page-item']}`}>
            <a className={`${coreCSS['page-link']}`} href="javascript:void(0);">
              2
            </a>
          </li>
          <li className={`${coreCSS['page-item']} ${coreCSS['active']}`}>
            <a className={`${coreCSS['page-link']}`} href="javascript:void(0);">
              3
            </a>
          </li>
          <li className={`${coreCSS['page-item']}`}>
            <a className={`${coreCSS['page-link']}`} href="javascript:void(0);">
              4
            </a>
          </li>
          <li className={`${coreCSS['page-item']}`}>
            <a className={`${coreCSS['page-link']}`} href="javascript:void(0);">
              5
            </a>
          </li>
          <li className={`${coreCSS['page-item']} ${coreCSS['next']}`}>
            <a className={`${coreCSS['page-link']}`} href="javascript:void(0);">
              <i className="tf-icon bx bx-chevron-right" />
            </a>
          </li>
          <li className={`${coreCSS['page-item']} ${coreCSS['last']}`}>
            <a className={`${coreCSS['page-link']}`} href="javascript:void(0);">
              <i className="tf-icon bx bx-chevrons-right" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>

        </>
    );
}

export default Setting;
