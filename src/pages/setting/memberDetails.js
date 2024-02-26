import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef, createContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callSearchDepAPI } from "../../apis/SettingMemberListAPICalls";
import { callMemberUpdateAPI } from "../../apis/SettingMemberAPICalls";
import { callSearchPosAPI } from "../../apis/SettingSearchPosition";
import imageSample from "../../@core/img/icons/unicons/image.png";
import { callMemberDetailAPI } from "../../apis/MyPageAPICalls";
import { callProfileAPI } from "../../apis/MyPageAPICalls";

export const MemberContext = createContext(null);

function MemberAdd() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [updateState, setUpdateState] = useState(false);
  const profileResult = useSelector((state) => state.mpProReducer);
  const profileDetail = profileResult.data;

  const memberCode = searchParams.get("memCode");
  const [profile, setProfile] = useState(null);
  const [profileUrl, setProfileUrl] = useState(null);
  const profileInput = useRef();
  const depList = useSelector((state) => state.settingReducer);
  const posList = useSelector((state) => state.settingSerchPositionReducer);
  const memDetailList = useSelector((state) => state.mypageReducer);
  const resutlList = memDetailList.data;
  const hireDate = new Date();
  const formattedDate = hireDate.toISOString().slice(0, 10);
  const [currentDate, setCurrentDate] = useState(formattedDate);
  const [activeTab, setActiveTab] = useState("프로필 정보");
  console.log("~~~~~~~~resutlList", resutlList);
  console.log("~~~~~~~~profileResult", profileResult);

  console.log("currentDate", currentDate);
  useEffect(() => {
    dispatch(callSearchDepAPI());
  }, []);

  useEffect(() => {
    dispatch(callSearchPosAPI());
  }, []);

  useEffect(() => {
    dispatch(
      callMemberDetailAPI({
        memCode: memberCode,
      })
    );
    dispatch(
      callProfileAPI({
        memCode: memberCode,
      })
    );
  }, [memberCode]);

  const [form, setForm] = useState({
    memCode: 0,
    memName: "",
    memPhone: "",
    memEmail: "",
    memAddress: "",
    memBirth: "",
    memPassword: "",
    memHireDate: currentDate,
    memStatus: "N",
    memRole: "N",
    posCode: 0,
    depCode: 0,
  });

  useEffect(() => {
    if (resutlList) {
      setForm((prevForm) => ({
        ...prevForm,
        memName: resutlList.memName,
        memBirth: resutlList.memBirth,
        memEmail: resutlList.memEmail,
        memPhone: resutlList.memPhone,
        memAddress: resutlList.memAddress,
        depCode: resutlList.depCode,
        posCode: resutlList.posCode,
        memRole: resutlList.memRole,
      }));
    }
  }, [resutlList]);

  useEffect(() => {
    if (profile) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result) {
          setProfileUrl(result);
        }
      };
      fileReader.readAsDataURL(profile);
    }
  }, [profile]);

  const onChangeImageUpload = (e) => {
    const profile = e.target.files[0];
    setProfile(profile);
    console.log(profile);
  };

  const onChangeImgReset = () => {
    setProfileUrl(null);
    console.log(profile);
  };

  const onClickImageUpload = () => {
    profileInput.current.click();
    console.log("~~~~~~~~~클릭");
  };

  const onChangeHandler = (e) => {
    setUpdateState(true);

    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    console.log(form);
  };

  const onClickUpdateHandler = () => {
    const updateData = new FormData();
    updateData.append("memCode", memberCode);
    updateData.append("memName", form.memName);
    updateData.append("memPhone", form.memPhone);
    updateData.append("memEmail", form.memEmail);
    updateData.append("memAddress", form.memAddress);
    updateData.append("memBirth", form.memBirth);
    updateData.append("memPassword", form.memPassword);
    updateData.append("memHireDate", form.memHireDate);
    updateData.append("memStatus", form.memStatus);
    updateData.append("memRole", form.memRole);
    updateData.append("posCode", form.posCode);
    updateData.append("depCode", form.depCode);

    updateData.append("profile", profile);
    dispatch(callMemberUpdateAPI({ form: updateData }));
    console.log(form);
    console.log(profile);

    alert("직원수정이 완료되었습니다.");
  };

  const onClickPassReset = () => {
    const updateData = new FormData();
    updateData.append("memCode", memberCode);
    updateData.append("memPassword", "0000");
    dispatch(callMemberUpdateAPI({ form: updateData }));
    alert("비밀번호가 초기화되었습니다.");
  };

  const onClickMemHire = () => {
    const updateData = new FormData();

    updateData.append("memCode", memberCode);
    updateData.append("memHireDate", currentDate);
    updateData.append("memStatus", "Y");
    dispatch(callMemberUpdateAPI({ form: updateData }));
    alert("직원 정보를 삭제했습니다");
    navigate(`/main/setting`);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);

    if (tab === "인사 정보") {
      navigate(`/main/settingInfo?memCode=${memberCode}`, {
        replace: true,
      });
    } else if (tab === "연차 관리") {
      navigate(`/main/settingVacation?memCode=${memberCode}`, {
        replace: true,
      });
    } else if (tab === "서류함") {
      navigate(`/main/settingDocument?memCode=${memberCode}`, {
        replace: true,
      });
    }
  };
  console.log("profileUrl", profileUrl);

  return (
    <>
      <h4 className="fw-bold py-3 mb-4">
        <span className="text-muted fw-light">설정 &gt;</span> 직원 수정
      </h4>
      <div className="col-xxl">
        <div className="card mb-4"></div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <ul className="nav nav-pills flex-column flex-md-row mb-3">
            <li className={`nav-item`} style={{ cursor: "pointer" }}>
              <li
                className={`nav-link active`}
                onClick={() => handleTabClick("프로필 정보")}
              >
                프로필 정보
              </li>
            </li>
            <li className={`nav-item`} style={{ cursor: "pointer" }}>
              <li
                className={`nav-link `}
                onClick={() => handleTabClick("인사 정보")}
              >
                인사 정보
              </li>
            </li>
            <li className={`nav-item`} style={{ cursor: "pointer" }}>
              <li
                className={`nav-link`}
                onClick={() => handleTabClick("서류함")}
              >
                서류함
              </li>
            </li>
            <li className={`nav-item`} style={{ cursor: "pointer" }}>
              <li
                className={`nav-link`}
                onClick={() => handleTabClick("연차 관리")}
              >
                연차 관리
              </li>
            </li>
          </ul>
          <div className="card mb-4">
            <h5 className="card-header">프로필 사진 수정</h5>
            <div className="card-body">
              <div className="d-flex align-items-start align-items-sm-center gap-4">
                {profileUrl ? (
                  <img
                    src={profileUrl}
                    alt="profileUrl 사진 등록"
                    className="d-block rounded"
                    height={120}
                    width={100}
                    style={{ marginLeft: 10, marginRight: 10 }}
                  />
                ) : profileDetail ? (
                  <img
                    src={profileDetail.docAtcPath}
                    alt="profileDetail 사진 등록"
                    className="d-block rounded"
                    height={120}
                    width={100}
                    style={{ marginLeft: 10, marginRight: 10 }}
                  />
                ) : (
                  <img
                    src={imageSample}
                    alt="사진 등록 전이미지"
                    className="d-block rounded"
                    height={50}
                    width={60}
                    style={{
                      marginTop: 35,
                      marginBottom: 35,
                      marginLeft: 30,
                      marginRight: 30,
                    }}
                  />
                )}
                <div className="button-wrapper">
                  <label
                    htmlFor="upload"
                    className="btn btn-primary me-2 mb-4"
                    tabIndex={0}
                  >
                    <span className="d-none d-sm-block">이미지 수정</span>
                    <i className="bx bx-upload d-block d-sm-none" />
                    <input
                      type="file"
                      name="profile"
                      id="upload"
                      className="account-file-input"
                      accept="image/jpg,image/png,image/jpeg,image/gif"
                      onChange={onChangeImageUpload}
                      onClick={onClickImageUpload}
                      ref={profileInput}
                    />
                  </label>
                  <button
                    type="button"
                    className="btn btn-outline-secondary account-image-reset mb-4"
                    onClick={onChangeImgReset}
                  >
                    <i className="bx bx-reset d-block d-sm-none" />
                    <span className="d-none d-sm-block">초기화</span>
                  </button>
                </div>
              </div>
            </div>
            <hr className="my-0" />
            <div className="card-body">
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label htmlFor="Number" className="form-label">
                    사번
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="memCode"
                    name="memCode"
                    defaultValue={memberCode}
                    disabled="true"
                    input
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="memName" className="form-label">
                    이름
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="memName"
                    id="Name"
                    onChange={onChangeHandler}
                    value={
                      !updateState
                        ? resutlList
                          ? resutlList.memName
                          : ""
                        : form.memName
                    }
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="birthDate" className="form-label">
                    생년월일
                  </label>
                  <input
                    type="Date"
                    className="form-control"
                    id="birthday"
                    name="memBirth"
                    onChange={(e) => onChangeHandler(e)}
                    value={
                      !updateState
                        ? resutlList
                          ? resutlList.memBirth
                          : ""
                        : form.memBirth
                    }
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="email" className="form-label">
                    E-mail
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="email"
                    name="memEmail"
                    placeholder="abc@example.com"
                    onChange={onChangeHandler}
                    value={
                      !updateState
                        ? resutlList
                          ? resutlList.memEmail
                          : ""
                        : form.memEmail
                    }
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label" htmlFor="country">
                    부서
                  </label>
                  <select
                    name="depCode"
                    className="select2 form-select"
                    onChange={onChangeHandler}
                    value={
                      !updateState
                        ? resutlList
                          ? resutlList.depCode
                            ? resutlList.depCode
                            : ""
                          : ""
                        : form.depCode
                    }
                  >
                    {Array.isArray(depList) &&
                      depList.map((d) => (
                        <option value={d.depCode}>{d.depName}</option>
                      ))}
                    ;
                  </select>
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label" htmlFor="country">
                    직위
                  </label>
                  <select
                    name="posCode"
                    className="select2 form-select"
                    onChange={onChangeHandler}
                    value={
                      !updateState
                        ? resutlList
                          ? resutlList.posCode
                          : ""
                        : form.posCode
                    }
                  >
                    {Array.isArray(posList) &&
                      posList.map((p) => (
                        <option value={p.posCode}>{p.posName}</option>
                      ))}
                    ;
                  </select>
                  <span>
                    <label
                      className="form-label"
                      htmlFor="country"
                      style={{
                        paddingTop: "0.5rem",
                        paddingRight: "1rem",
                        paddingLeft: "0.5rem",
                      }}
                    >
                      관리자로 지정
                    </label>
                    <label
                      style={{
                        paddingTop: "0.5rem",
                        paddingRight: "1rem",
                        paddingLeft: "0.5rem",
                      }}
                    >
                      <input
                        type="radio"
                        name="memRole"
                        id="memRole"
                        onChange={onChangeHandler}
                        value={"Y"}
                        checked={
                          !updateState
                            ? resutlList
                              ? resutlList.memRole === "ADMIN" ||
                                resutlList.memRole === "SUPERADMIN"
                              : false
                            : form.memRole === "Y"
                        }
                        style={{
                          paddingRight: "1rem",
                          marginRight: "0.5rem",
                        }}
                      />
                      예{" "}
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="memRole"
                        id="memRole"
                        onChange={onChangeHandler}
                        value={"N"}
                        style={{
                          paddingRight: "1rem",
                          marginRight: "0.5rem",
                        }}
                        checked={
                          !updateState
                            ? resutlList
                              ? resutlList.memRole === "USER"
                              : true
                            : form.memRole === "N"
                        }
                      />
                      아니오
                    </label>
                  </span>
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="phone" className="form-label">
                    전화번호
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="phone"
                    name="memPhone"
                    placeholder="000-0000-0000"
                    onChange={onChangeHandler}
                    value={
                      !updateState
                        ? resutlList
                          ? resutlList.memPhone
                          : ""
                        : form.memPhone
                    }
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="email" className="form-label">
                    주소
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="address"
                    name="memAddress"
                    onChange={onChangeHandler}
                    value={
                      !updateState
                        ? resutlList
                          ? resutlList.memAddress
                          : ""
                        : form.memAddress
                    }
                  />
                </div>
                <div className="btn-wrapper">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={onClickPassReset}
                    style={{ marginRight: "20px" }}
                  >
                    비밀번호 초기화
                  </button>
                  <div>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={onClickMemHire}
                      style={{ marginRight: "20px" }}
                    >
                      직원 탈퇴
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={onClickUpdateHandler}
                    >
                      수정
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MemberAdd;
