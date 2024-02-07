import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { callSearchDepAPI, callMemberAddAPI } from '../../apis/SettingMemberListAPICalls';
import { callSearchPosAPI } from '../../apis/OtherAPICalls';



function MemberAdd(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [profileUrl, setProfileUrl] = useState();
    const profileInput = useRef();
    const depList = useSelector(state => state.settingReducer)
    const posList = useSelector(state => state.otherReducer)
    const hireDate = new Date();
    const formattedDate = hireDate.toISOString().slice(0, 10); 
    const [currentDate, setCurrentDate] = useState(formattedDate);
    const [activeTab, setActiveTab] = useState('프로필 정보');
    console.log('~~~~~~~~', currentDate);
    console.log('MemberAdd----------', window.localStorage.getItem('accessToken'));
    useEffect(
        () => {
            dispatch(callSearchDepAPI());
            console.log('--------',depList);
        },[]
    );

    useEffect(
        () => {
            dispatch(callSearchPosAPI());
            console.log('--------',posList);
        },[]
    );

    
    const [form, setForm] = useState({
        memName: '',
        memPhone: '',
        memEmail: '',
        memAddress: '',
        memBirth: '',
        memPassword: '0000',
        memHireDate: currentDate,
        memStatus: 'N',
        memRole: '일반사원',
        posCode: 0,
        depCode: 0,

    });


    useEffect(() => {
        // 이미지 업로드시 미리보기 세팅
        if(profile){
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if( result ){
                    setProfileUrl(result);
                }
            }
            fileReader.readAsDataURL(profile);
        }
    },
    [profile]);

    const onChangeImageUpload = (e) => {
        const profile = e.target.files[0];
        setProfile(profile);
        console.log(profile);
    };

    const onChangeImgReset = () => {
        setProfileUrl(null);
        console.log(profile);
    }

    const onClickImageUpload = () => {
        profileInput.current.click();
        console.log('~~~~~~~~~클릭');
    }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        console.log('~~~~~~~~~~~~~~', form);
    };

    const onClickMemberInsertHandler = () => {
        console.log('~~~~~~~~~onClickMemberInsertHandler' , onClickMemberInsertHandler);
        dispatch(callMemberAddAPI({form, profile}));
        console.log(form);
        console.log(profile);
        
        
    }
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
            <div className="col-xxl">
                <div className="card mb-4"></div>
            </div>
            <div className="row">
                <div className="col-md-12">
                <ul className="nav nav-pills flex-column flex-md-row mb-3">
            <li className={`nav-item`} style={{ cursor: "pointer"}}>
                <li className={`nav-link active`}
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
                <li className={`nav-link`}
                     onClick={() => handleTabClick('프로필 정보')}>
                        서류함
                    </li>
                    </li>
                    <li className={`nav-item`} style={{ cursor: "pointer"}}>
                <li className={`nav-link`}
                     onClick={() => handleTabClick('프로필 정보')}>
                    연차 관리
                    </li>
                    </li>
                </ul>
                <div className="card mb-4">
                    <h5 className="card-header">프로필 사진 등록</h5>
                    <div className="card-body">
                    <div className="d-flex align-items-start align-items-sm-center gap-4">
                    { profileUrl && <img
                        src={ profileUrl }
                        alt="사진 등록"
                        className="d-block rounded"
                        height={100}
                        width={100}
                        />}
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
                            name='profile'
                            id="upload"
                            className="account-file-input"
                            accept='image/jpg,image/png,image/jpeg,image/gif'
                            onChange={ onChangeImageUpload }
                            onClick={ onClickImageUpload } 
                            ref={ profileInput }                            />
                        </label>
                        <button
                            type="button"
                            className="btn btn-outline-secondary account-image-reset mb-4"
                            onClick={ onChangeImgReset }>
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
                            id="firstName"
                            name="firstName"
                            defaultValue="사번은 등록후 출력됩니다."
                            disabled="true"
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
                            onChange={ onChangeHandler }
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
                            onChange={ onChangeHandler }
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
                            onChange={ onChangeHandler }
                            />
                        </div>
                        <div className="mb-3 col-md-6">
                            <label className="form-label" htmlFor="country">
                            부서
                            </label>
                            <select  
                            name="depCode" className="select2 form-select" 
                                onChange={ onChangeHandler }
                                >
                                { Array.isArray(depList) && depList.map((d) => (
                                <option value={d.depCode}
                                >{d.depName}</option>
                                ))};
                            </select>
                        </div>
                        <div className="mb-3 col-md-6">
                            <label className="form-label" htmlFor="country">
                            직위
                            </label>
                            <select name="posCode" className="select2 form-select"
                            onChange={ onChangeHandler }
                            >
                            { Array.isArray(posList) && posList.map((p) => (
                            <option value={p.posCode}>{p.posName}</option>
                            ))};
                            </select>
                            <span>
                            <label className="form-label" htmlFor="country" style={{ paddingTop:"0.5rem", paddingRight: "1rem", paddingLeft:"0.5rem"}}>
                            관리자로 지정 
                            </label>
                            <input type="checkbox" name="memRole" id="memRole" 
                                                            onChange={ onChangeHandler }
                                                            />
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
                            onChange={ onChangeHandler }
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
                            onChange={ onChangeHandler }
                            />
                        </div>
                        <div className="btn-wrapper">
                            <button type="button" className="btn btn-primary"
                            onClick={ onClickMemberInsertHandler }>
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