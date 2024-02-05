import CSS from '../../@core/css/pay.module.css';
import { useNavigate, useParams } from 'react-router';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import{
    SettingMemverListAPICalls
} from '../../apis/SettingMemverListAPICalls';
import exp from 'constants';

function Setting(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const param = useParams();
    // const member = useSelector(state => state.)
    return(
        <div>
        askjfdljk</div>
    );
}

export default Setting;
