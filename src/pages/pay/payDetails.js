function payDetails(){
    return(
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
    )
};
e