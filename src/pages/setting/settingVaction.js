import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import coreCSS from '../../@core/vendor/css/core.module.css';
import payCSS from '../../@core/css/pay.module.css';

function SettingVacation(){
    const navigate = useNavigate();


    const [activeTab, setActiveTab] = useState();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
  
        if (tab === '프로필 정보'){
          navigate("/memberAdd", { replace: true })
        }
        if (tab === '인사 정보'){
          navigate("/settingInfo", { replace: true })
        }
        if (tab === '연차 관리'){
          navigate("/settingVacation", { replace: true })
        }
        if (tab === '서류함'){
          navigate("/settingDocument", { replace: true })
        }
      };

    return(
        <>
  <h4 className="fw-bold py-3 mb-4">
    <span className="text-muted fw-light">설정 &gt;</span> 직원 등록
  </h4>
  {/* Basic Layout */}
  <div className="col-xxl">
    <div className="card mb-4"></div>
  </div>
  <div className="row">
    <div className="col-md-12">
    <ul className="nav nav-pills flex-column flex-md-row mb-3">
    <li className={`nav-item`} style={{ cursor: "pointer"}}>
                <li className={`nav-link `}
                onClick={() => handleTabClick('프로필 정보')}>
                        프로필 정보
                    </li>
                    </li>
                    <li className={`nav-item`} style={{ cursor: "pointer"}}>
                    <li className={`nav-link `}
                onClick={() => handleTabClick('인사 정보')}>
                        인사 정보
                    </li>
                    </li>
                    <li className={`nav-item`} style={{ cursor: "pointer"}}>
                    <li className={`nav-link `}
                onClick={() => handleTabClick('서류함')}>
                        서류함
                    </li>
                    </li>
                    <li className={`nav-item`} style={{ cursor: "pointer"}}>
                    <li className={`nav-link active`}
                onClick={() => handleTabClick('연차 관리')}>
                    연차 관리
                    </li>
                    </li>
                </ul>
      <div className="card mb-4">
        <div className="card-body">
          <table className="table table-striped" id="table">
            <colgroup>
              <col style={{ width: "20%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "5%" }} />
              <col style={{ width: "5%" }} />
              <col style={{ width: "5%" }} />
            </colgroup>
            <thead>
              <tr style={{ textAlign: "left" }}>
                <th>증빙서류</th>
                <th>제출일</th>
                <th>수정일</th>
                <th>첨부파일</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              <tr style={{ textAlign: "left" }} className="List">
                <td>
                  <input type="text" />
                </td>
                <td>0000-00-0000</td>
                <td>0000-00-0000</td>
                <td>~~~~~~~~~.pdf</td>
                <td>
                  <i
                    className="bx bx-down-arrow-alt"
                    style={{ paddingRight: 10 }}
                  />
                </td>
                <td>
                  <label
                    htmlFor="file"
                    style={{ paddingRight: 10, cursor: "pointer" }}
                  >
                    <i className="bx bx-up-arrow-alt" />
                  </label>
                  <input type="file" id="file" />
                </td>
                <td>
                  <button
                    className="bx bx-x"
                    name="btnX"
                    onclick="remove(this)"
                    style={{ border: 0, backgroundColor: "rgba(0, 0, 0, 0)" }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button id="addList">+추가</button>
        </div>
      </div>
    </div>
  </div>

        </>
    )
};

export default SettingVacation;