import { useNavigate, useParams } from 'react-router-dom';


function Main(){
    const navigate = useNavigate();

    const onClickMyPage = () => {
        navigate("/mp",{replace: true})
    }

    return(
        <>
        <div>메인~~~</div>
        <div onClick={ onClickMyPage }>마이페이지로 가기</div>


        </>
    
    );
}

export default Main;