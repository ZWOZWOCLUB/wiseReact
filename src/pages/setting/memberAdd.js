import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, createContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callSearchDepAPI } from "../../apis/SettingMemberListAPICalls";
import { callMemberAddAPI } from "../../apis/SettingMemberAPICalls";
import { callSearchPosAPI } from "../../apis/SettingSearchPosition";
import imageSample from "../../@core/img/icons/unicons/image.png";

export const MemberContext = createContext(null);

function MemberAdd() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [profileUrl, setProfileUrl] = useState();
  const profileInput = useRef();
  const depList = useSelector((state) => state.settingReducer);
  const posList = useSelector((state) => state.settingSerchPositionReducer);
  const [memCode, setMemCode] = useState(0);
  const hireDate = new Date();
  const formattedDate = hireDate.toISOString().slice(0, 10);
  const [currentDate, setCurrentDate] = useState(formattedDate);
  const memberResult = useSelector((state) => state.settingMemberReducer);

  useEffect(() => {
    dispatch(callSearchDepAPI());
  }, []);

  useEffect(() => {
    dispatch(callSearchPosAPI());
  }, []);

  const [form, setForm] = useState({
    memCode: 0,
    memName: "",
    memPhone: "",
    memEmail: "",
    memAddress: "",
    memBirth: "",
    memPassword: "0000",
    memHireDate: currentDate,
    memStatus: "N",
    memRole: "N",
    posCode: 0,
    depCode: 0,
  });

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

  const onClickMemberInsertHandler = () => {
    console.log(
      "~~~~~~~~~onClickMemberInsertHandler",
      onClickMemberInsertHandler
    );

    const formData = new FormData();

    formData.append("memName", form.memName);
    formData.append("memPhone", form.memPhone);
    formData.append("memEmail", form.memEmail);
    formData.append("memAddress", form.memAddress);
    formData.append("memBirth", form.memBirth);
    formData.append("memPassword", form.memPassword);
    formData.append("memHireDate", form.memHireDate);
    formData.append("memStatus", form.memStatus);
    formData.append("memRole", form.memRole);
    formData.append("posCode", form.posCode);
    formData.append("depCode", form.depCode);

    formData.append("profile", profile);
    dispatch(callMemberAddAPI({ form: formData }));
  };

  useEffect(() => {
    if (memberResult && memberResult.memCode > 0) {
      const memCode = memberResult.memCode;

      console.log(memCode, "memCode@@@@@@@@@@@@@@@@@@@@@@@@");
      alert("직원 등록이 완료되었습니다.");
      navigate(`/main/memberDetails?memCode=${memCode}`, { replace: true });
    }
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    console.log(form);
  };

  return (
    <>
      <h4 className="fw-bold py-3 mb-4">
        <span className="text-muted fw-light">설정 &gt;</span> 직원 등록
      </h4>
      <div className="col-xxl">
        <div className="card mb-4"></div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card mb-4">
            <h5 className="card-header">프로필 사진 등록</h5>
            <div className="card-body">
              <div className="d-flex align-items-start align-items-sm-center gap-4">
                {profileUrl ? (
                  <img
                    src={profileUrl}
                    alt="사진 등록"
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
                    <span className="d-none d-sm-block">이미지 등록</span>
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
                  >
                    <option> -- 부서 선택 --</option>
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
                  >
                    <option> -- 직위 선택 --</option>
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
                        checked="true"
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
                  />
                </div>
                <div className="btn-wrapper">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={onClickMemberInsertHandler}
                  >
                    등록
                  </button>
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
