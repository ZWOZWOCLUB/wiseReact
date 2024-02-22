// import { useNavigate, useParams } from 'react-router-dom';
// import { useEffect, useState, useRef } from "react";
// import { useSelector, useDispatch } from 'react-redux';
// import coreCSS from '../../@core/vendor/css/core.module.css';
// import payCSS from '../../@core/css/pay.module.css';
import JsPDF from 'jspdf';
import ReactDOMServer from 'react-dom/server';
import pdfImg from "../../@core/img/icons/unicons/pdf.png";
import youth from './YOUTH.TTF';

function PayConverPDF({payDetailsData, token}){
  
    const document = new JsPDF();
    document.addFont(youth,'YOUTH');
    document.setFont('YOUTH'); 
    
    const pdfForm =
    <div style={{ width: "210mm", height: "297mm", padding: 40, background: "white"}}>
    <div
      style={{
        fontSize: "xx-large",
        textAlign: "center",
        paddingBottom: 20,
        fontWeight: "bolder"
      }}
    >
      급여 내역서
    </div>
    <table
      style={{
        border: "black 1px solid",
        padding: 20,
        width: "100%",
        textAlign: "center"
      }}
    >
      <tbody>
        <tr style={{ border: "solid 1px black" }}>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              border: "solid 1px black",
              width: "25%"
            }}
          >
            성명
          </th>
          <td style={{ fontSize: "medium", width: "25%" }}>{token.memName}</td>
          <th
            style={{
              fontSize: "medium",
              fontWeight: 1000,
              border: "solid 1px black",
              width: "25%"
            }}
          >
            사번
          </th>
          <td style={{ fontSize: "medium" }}>~~~~~~~~~</td>
        </tr>
        <tr style={{ border: "solid 1px black" }}>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              border: "solid 1px black",
              width: "25%"
            }}
          >
            부서
          </th>
          <td style={{ fontSize: "medium", width: "25%" }}>~~~~~~~~~~~~</td>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              border: "solid 1px black",
              width: "25%"
            }}
          >
            직급
          </th>
          <td style={{ fontSize: "medium", width: "25%" }}>~~~~~~~~~</td>
        </tr>
        <tr>
          <th
            colSpan={4}
            style={{
              border: "solid 1px black",
              padding: 10,
              fontWeight: 1000,
              fontSize: "large"
            }}
          >
            세부 내역
          </th>
        </tr>
        <tr>
          <th
            colSpan={2}
            style={{
              border: "solid 1px black",
              padding: 10,
              fontWeight: 1000,
              fontSize: "large"
            }}
          >
            지급
          </th>
          <th
            colSpan={2}
            style={{
              border: "solid 1px black",
              padding: 10,
              fontWeight: 1000,
              fontSize: "large"
            }}
          >
            공제
          </th>
        </tr>
        <tr>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              border: "solid 1px black",
              width: "25%"
            }}
          >
            임금항목
          </th>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              border: "solid 1px black",
              width: "25%"
            }}
          >
            지급 금액(원)
          </th>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              border: "solid 1px black",
              width: "25%"
            }}
          >
            공제 항목
          </th>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              border: "solid 1px black",
              width: "25%"
            }}
          >
            공제 금액(원)
          </th>
        </tr>
        <tr>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              border: "solid 1px black",
              width: "25%"
            }}
          >
            기본금
          </th>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              border: "solid 1px black",
              width: "25%"
            }}
          >
            지급 금액(원)
          </th>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              border: "solid 1px black",
              width: "25%"
            }}
          >
            국민연금
          </th>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              border: "solid 1px black",
              width: "25%"
            }}
          >
            공제 금액(원)
          </th>
        </tr>
        <tr>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              border: "solid 1px black",
              width: "25%"
            }}
          >
            식대
          </th>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              border: "solid 1px black",
              width: "25%"
            }}
          >
            지급 금액(원)
          </th>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              border: "solid 1px black",
              width: "25%"
            }}
          >
            고용보험
          </th>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              border: "solid 1px black",
              width: "25%"
            }}
          >
            공제 금액(원)
          </th>
        </tr>
        <tr>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              borderLeft: "solid 1px black",
              width: "25%"
            }}
          ></th>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              width: "25%"
            }}
          ></th>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              border: "solid 1px black",
              width: "25%"
            }}
          >
            건강보험료
          </th>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              border: "solid 1px black",
              width: "25%"
            }}
          >
            공제 금액(원)
          </th>
        </tr>
        <tr>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              width: "25%"
            }}
          ></th>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              width: "25%"
            }}
          ></th>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              border: "solid 1px black",
              width: "25%"
            }}
          >
            노인장기요양보험료
          </th>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              border: "solid 1px black",
              width: "25%"
            }}
          >
            공제 금액(원)
          </th>
        </tr>
        <tr>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              width: "25%"
            }}
          ></th>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              width: "25%"
            }}
          ></th>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              border: "solid 1px black",
              width: "25%"
            }}
          >
            소득세
          </th>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              border: "solid 1px black",
              width: "25%"
            }}
          >
            공제 금액(원)
          </th>
        </tr>
        <tr>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              width: "25%"
            }}
          ></th>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              width: "25%"
            }}
          ></th>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              border: "solid 1px black",
              width: "25%"
            }}
          >
            지방소득세
          </th>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              border: "solid 1px black",
              width: "25%"
            }}
          >
            공제 금액(원)
          </th>
        </tr>
        <tr>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              border: "solid 1px black",
              width: "25%"
            }}
          >
            지급액 계
          </th>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              border: "solid 1px black",
              width: "25%"
            }}
          >
            지급 금액(원)
          </th>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              border: "solid 1px black",
              width: "25%"
            }}
          >
            공제액 계
          </th>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              border: "solid 1px black",
              width: "25%"
            }}
          >
            공제 금액(원)
          </th>
        </tr>
        <tr>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              border: "solid 1px black",
              width: "25%"
            }}
          ></th>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              border: "solid 1px black",
              width: "25%"
            }}
          >
            지급 금액(원)
          </th>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              border: "solid 1px black",
              width: "25%"
            }}
          >
            실 수령액(원)
          </th>
          <th
            style={{
              padding: 20,
              fontSize: "medium",
              fontWeight: 1000,
              border: "solid 1px black",
              width: "25%"
            }}
          >
            공제 금액(원)
          </th>
        </tr>
      </tbody>
    </table>
  </div>
  
    
    
        const save = () => {
        if(payDetailsData){
          document.html(ReactDOMServer.renderToStaticMarkup(pdfForm), {
            callback: () => {
              const currentDate = new Date();
              document.save(currentDate +"1111.pdf");
            },
          });
        };
    }
  
    
      return (
        <
        >
        <img
        src={pdfImg}
        alt="pdfImg"
        style={{ width: "1.5rem", margin: "0.5rem", cursor:"pointer" }}
        onClick={save}

      />
      <div
        
        style={{ width: "10%", cursor:"pointer" }}
        onClick={save}

      >
        PDF
      </div>
      </>

      );
    }
    
export default PayConverPDF;