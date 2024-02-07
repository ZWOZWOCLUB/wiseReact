import '../../@core/vendor/css/themeDefault.css';
import './dataformat.css';
function DataFormat() {
    return(
        <>
    <div className="layout-wrapper layout-content-navbar">
  <div className="layout-container">
    <div className="layout-page">
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className='fw-bold py-3 mb-4'>
                                    <span className='text-muted fw-light'>자료실 {'>'}</span> 서식자료실
                                </h4>
          <div className="col-xxl">
            <div className="card mb-4">
              <div className="pay-top-wrapper">
              <div style={{ width: "6%" }} />
                <div style={{ width: "10%", color: "#8184ff" }}>
                  <b>서식자료실</b>
                </div>
                <div style={{ width: "100%" }} />
                <form className="d-flex">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="검색"
                    />
                    <span className="input-group-text">
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAd5JREFUSEu11cvLTWEUx/HPGxnIpSiXiZAwcIuSAQpFL2XqUgxIURhQBv4AMiEhDCgk5Q+Q0VsImSAlopTIgFwi9+uz6nl1HO/e5xnssya7zn7O+j5rrd9v7R5djp4u51cHmIB1WInZ+SJ3cAkX8LzkcgMBRuAcVtck+I2L2IRPdaB2wFDcwgx8xUkcxpOcZDJ2YQuG5LOL8L0K0g44iw14hhV4UPHHWbicLjAeB7G7BDAT9/Aj9Xk+ot91sRhX8A2T8GKgw60VHMF2HMWOkgHiPNYnyF7s7wR4jCm5//cLAUvQh2vpGRX9F60VfEQMeRB+FQJGpWpf4w1GdwK8x3AMQ8BKIs5+wCuM6QS4mw01L3ngdkn2pKQFSW03c5uWdQIcSKbZgxPYVgg4kzyyMbUnBLKzE2AqHuJnoUzDYFdz0sqq2412Ktv/KZYnCT6qqGRONtrY7PatJUaLM62r4guO41B2dryPKmNVbMbgnDRmEK6PYdfKtP/lyGygVTVzeJd20b7U0rWYm12/FPH7P1G3ridml/Yids/nrK4bOIa3CB+E0WKdhwpDSeGJv9HEBycg1zEdsQ0W4mU/oQlA5AqThaKm5fmcbhoQ+cal9b4mfz8abVGtJ5tqUSWk64A/OxFWGSrrSC8AAAAASUVORK5CYII=" />
                    </span>
                  </div>
                </form>
                <div style={{ width: "5%" }} />
                <div className="btn btn-primary" style={{ width: "14%" }}>
                  <b>자료 추가</b>
                </div>
                <div style={{ width: "6%" }} />
              </div>
              <table
                className="table table-hover"
                style={{ width: "90%", margin: "0 auto" }}
              >
                <tbody>
                  <tr style={{ backgroundColor: "#DCDCFF" }}>
                    <th style={{ width: "20%" }}>파일명</th>
                    <th style={{ width: "15%" }}>작성자</th>
                    <th style={{ width: "15%" }}>작성일</th>
                    <th style={{ width: "10%" }}>파일크기</th>
                    <th style={{ width: "40%" }} />
                  </tr>
                  <tr>
                    <td>진료계산서.doc</td>
                    <td>인사과 김자료</td>
                    <td>2024-01-12</td>
                    <td>43.5 KB</td>
                    <td style={{ textAlign: "right" }}>
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAANFJREFUSEvtlMENAWEQRt+6uStBEVx1INEHpdCHRAeuFKEEdzfkJSS7sr+ZPWyQ+M4z35v/m9mt6FlVz/58DeBWeGk4YFjwMP4Dwlv6vYjWwDJ8V7NgA6xee0pXNAC2wDwJ2QEL4JoFWDcE9sAkgByBGXBpq4u+gxFwAMYFyAmYAufSEBHAPs2FCKtLU82FFJUB2GxMxmVsyjiMxXjeKgvQxIW7eOVCXWyoLgDNnmfoGafUFZAyrRd9BFD672Snbwzd9oLeAdlJU3Uf2UFqsmzRHehrHBmAe1VEAAAAAElFTkSuQmCC" />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAARlJREFUSEvt1M8qxUEYxvHP2SrZEMpCUlyD/Cls5TZkq9yJzsZKuQG5AmSFbP3JmiVX4PfWqF/6nZlx6mRzZjm98zzv8513pmfEqzdifWODIuF/R3SMM7wPaHUFGzgdFCWX4BAneMFmh8kyrjGHfVx0meQM4mAIhNBr6vQnyRJuMYtHbOHrrwZR32UyUSseAjWXPI+rlOQJU8n4vkm4g8/cKNUYxPmFhGsxiWWxtA1rDYJ1MA/2sR6aVNul7msRhfhNQvScEMXeXbO/WzIpJWh3/oY1TLbGs5gkZ9Al/pEQxegGspkSrpzBQTPnfQSWmPPfr3k1JZnGHi6HeQdHOM98FWGyPuxXUfwpawpKl1yjka0ZGxQRjhzRNxi0NBmpupZSAAAAAElFTkSuQmCC" />
                      &nbsp;&nbsp;
                    </td>
                  </tr>
                  <tr>
                    <td>진료계산서.doc</td>
                    <td>인사과 김자료</td>
                    <td>2024-01-12</td>
                    <td>43.5 KB</td>
                    <td style={{ textAlign: "right" }}>
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAANFJREFUSEvtlMENAWEQRt+6uStBEVx1INEHpdCHRAeuFKEEdzfkJSS7sr+ZPWyQ+M4z35v/m9mt6FlVz/58DeBWeGk4YFjwMP4Dwlv6vYjWwDJ8V7NgA6xee0pXNAC2wDwJ2QEL4JoFWDcE9sAkgByBGXBpq4u+gxFwAMYFyAmYAufSEBHAPs2FCKtLU82FFJUB2GxMxmVsyjiMxXjeKgvQxIW7eOVCXWyoLgDNnmfoGafUFZAyrRd9BFD672Snbwzd9oLeAdlJU3Uf2UFqsmzRHehrHBmAe1VEAAAAAElFTkSuQmCC" />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAARlJREFUSEvt1M8qxUEYxvHP2SrZEMpCUlyD/Cls5TZkq9yJzsZKuQG5AmSFbP3JmiVX4PfWqF/6nZlx6mRzZjm98zzv8513pmfEqzdifWODIuF/R3SMM7wPaHUFGzgdFCWX4BAneMFmh8kyrjGHfVx0meQM4mAIhNBr6vQnyRJuMYtHbOHrrwZR32UyUSseAjWXPI+rlOQJU8n4vkm4g8/cKNUYxPmFhGsxiWWxtA1rDYJ1MA/2sR6aVNul7msRhfhNQvScEMXeXbO/WzIpJWh3/oY1TLbGs5gkZ9Al/pEQxegGspkSrpzBQTPnfQSWmPPfr3k1JZnGHi6HeQdHOM98FWGyPuxXUfwpawpKl1yjka0ZGxQRjhzRNxi0NBmpupZSAAAAAElFTkSuQmCC" />
                      &nbsp;&nbsp;
                    </td>
                  </tr>
                  <tr>
                    <td>진료계산서.doc</td>
                    <td>인사과 김자료</td>
                    <td>2024-01-12</td>
                    <td>43.5 KB</td>
                    <td style={{ textAlign: "right" }}>
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAANFJREFUSEvtlMENAWEQRt+6uStBEVx1INEHpdCHRAeuFKEEdzfkJSS7sr+ZPWyQ+M4z35v/m9mt6FlVz/58DeBWeGk4YFjwMP4Dwlv6vYjWwDJ8V7NgA6xee0pXNAC2wDwJ2QEL4JoFWDcE9sAkgByBGXBpq4u+gxFwAMYFyAmYAufSEBHAPs2FCKtLU82FFJUB2GxMxmVsyjiMxXjeKgvQxIW7eOVCXWyoLgDNnmfoGafUFZAyrRd9BFD672Snbwzd9oLeAdlJU3Uf2UFqsmzRHehrHBmAe1VEAAAAAElFTkSuQmCC" />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAARlJREFUSEvt1M8qxUEYxvHP2SrZEMpCUlyD/Cls5TZkq9yJzsZKuQG5AmSFbP3JmiVX4PfWqF/6nZlx6mRzZjm98zzv8513pmfEqzdifWODIuF/R3SMM7wPaHUFGzgdFCWX4BAneMFmh8kyrjGHfVx0meQM4mAIhNBr6vQnyRJuMYtHbOHrrwZR32UyUSseAjWXPI+rlOQJU8n4vkm4g8/cKNUYxPmFhGsxiWWxtA1rDYJ1MA/2sR6aVNul7msRhfhNQvScEMXeXbO/WzIpJWh3/oY1TLbGs5gkZ9Al/pEQxegGspkSrpzBQTPnfQSWmPPfr3k1JZnGHi6HeQdHOM98FWGyPuxXUfwpawpKl1yjka0ZGxQRjhzRNxi0NBmpupZSAAAAAElFTkSuQmCC" />
                      &nbsp;&nbsp;
                    </td>
                  </tr>
                  <tr>
                    <td>진료계산서.doc</td>
                    <td>인사과 김자료</td>
                    <td>2024-01-12</td>
                    <td>43.5 KB</td>
                    <td style={{ textAlign: "right" }}>
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAANFJREFUSEvtlMENAWEQRt+6uStBEVx1INEHpdCHRAeuFKEEdzfkJSS7sr+ZPWyQ+M4z35v/m9mt6FlVz/58DeBWeGk4YFjwMP4Dwlv6vYjWwDJ8V7NgA6xee0pXNAC2wDwJ2QEL4JoFWDcE9sAkgByBGXBpq4u+gxFwAMYFyAmYAufSEBHAPs2FCKtLU82FFJUB2GxMxmVsyjiMxXjeKgvQxIW7eOVCXWyoLgDNnmfoGafUFZAyrRd9BFD672Snbwzd9oLeAdlJU3Uf2UFqsmzRHehrHBmAe1VEAAAAAElFTkSuQmCC" />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAARlJREFUSEvt1M8qxUEYxvHP2SrZEMpCUlyD/Cls5TZkq9yJzsZKuQG5AmSFbP3JmiVX4PfWqF/6nZlx6mRzZjm98zzv8513pmfEqzdifWODIuF/R3SMM7wPaHUFGzgdFCWX4BAneMFmh8kyrjGHfVx0meQM4mAIhNBr6vQnyRJuMYtHbOHrrwZR32UyUSseAjWXPI+rlOQJU8n4vkm4g8/cKNUYxPmFhGsxiWWxtA1rDYJ1MA/2sR6aVNul7msRhfhNQvScEMXeXbO/WzIpJWh3/oY1TLbGs5gkZ9Al/pEQxegGspkSrpzBQTPnfQSWmPPfr3k1JZnGHi6HeQdHOM98FWGyPuxXUfwpawpKl1yjka0ZGxQRjhzRNxi0NBmpupZSAAAAAElFTkSuQmCC" />
                      &nbsp;&nbsp;
                    </td>
                  </tr>
                  <tr>
                    <td>진료계산서.doc</td>
                    <td>인사과 김자료</td>
                    <td>2024-01-12</td>
                    <td>43.5 KB</td>
                    <td style={{ textAlign: "right" }}>
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAANFJREFUSEvtlMENAWEQRt+6uStBEVx1INEHpdCHRAeuFKEEdzfkJSS7sr+ZPWyQ+M4z35v/m9mt6FlVz/58DeBWeGk4YFjwMP4Dwlv6vYjWwDJ8V7NgA6xee0pXNAC2wDwJ2QEL4JoFWDcE9sAkgByBGXBpq4u+gxFwAMYFyAmYAufSEBHAPs2FCKtLU82FFJUB2GxMxmVsyjiMxXjeKgvQxIW7eOVCXWyoLgDNnmfoGafUFZAyrRd9BFD672Snbwzd9oLeAdlJU3Uf2UFqsmzRHehrHBmAe1VEAAAAAElFTkSuQmCC" />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAARlJREFUSEvt1M8qxUEYxvHP2SrZEMpCUlyD/Cls5TZkq9yJzsZKuQG5AmSFbP3JmiVX4PfWqF/6nZlx6mRzZjm98zzv8513pmfEqzdifWODIuF/R3SMM7wPaHUFGzgdFCWX4BAneMFmh8kyrjGHfVx0meQM4mAIhNBr6vQnyRJuMYtHbOHrrwZR32UyUSseAjWXPI+rlOQJU8n4vkm4g8/cKNUYxPmFhGsxiWWxtA1rDYJ1MA/2sR6aVNul7msRhfhNQvScEMXeXbO/WzIpJWh3/oY1TLbGs5gkZ9Al/pEQxegGspkSrpzBQTPnfQSWmPPfr3k1JZnGHi6HeQdHOM98FWGyPuxXUfwpawpKl1yjka0ZGxQRjhzRNxi0NBmpupZSAAAAAElFTkSuQmCC" />
                      &nbsp;&nbsp;
                    </td>
                  </tr>
                  <tr>
                    <td>진료계산서.doc</td>
                    <td>인사과 김자료</td>
                    <td>2024-01-12</td>
                    <td>43.5 KB</td>
                    <td style={{ textAlign: "right" }}>
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAANFJREFUSEvtlMENAWEQRt+6uStBEVx1INEHpdCHRAeuFKEEdzfkJSS7sr+ZPWyQ+M4z35v/m9mt6FlVz/58DeBWeGk4YFjwMP4Dwlv6vYjWwDJ8V7NgA6xee0pXNAC2wDwJ2QEL4JoFWDcE9sAkgByBGXBpq4u+gxFwAMYFyAmYAufSEBHAPs2FCKtLU82FFJUB2GxMxmVsyjiMxXjeKgvQxIW7eOVCXWyoLgDNnmfoGafUFZAyrRd9BFD672Snbwzd9oLeAdlJU3Uf2UFqsmzRHehrHBmAe1VEAAAAAElFTkSuQmCC" />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAARlJREFUSEvt1M8qxUEYxvHP2SrZEMpCUlyD/Cls5TZkq9yJzsZKuQG5AmSFbP3JmiVX4PfWqF/6nZlx6mRzZjm98zzv8513pmfEqzdifWODIuF/R3SMM7wPaHUFGzgdFCWX4BAneMFmh8kyrjGHfVx0meQM4mAIhNBr6vQnyRJuMYtHbOHrrwZR32UyUSseAjWXPI+rlOQJU8n4vkm4g8/cKNUYxPmFhGsxiWWxtA1rDYJ1MA/2sR6aVNul7msRhfhNQvScEMXeXbO/WzIpJWh3/oY1TLbGs5gkZ9Al/pEQxegGspkSrpzBQTPnfQSWmPPfr3k1JZnGHi6HeQdHOM98FWGyPuxXUfwpawpKl1yjka0ZGxQRjhzRNxi0NBmpupZSAAAAAElFTkSuQmCC" />
                      &nbsp;&nbsp;
                    </td>
                  </tr>
                  <tr>
                    <td>진료계산서.doc</td>
                    <td>인사과 김자료</td>
                    <td>2024-01-12</td>
                    <td>43.5 KB</td>
                    <td style={{ textAlign: "right" }}>
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAANFJREFUSEvtlMENAWEQRt+6uStBEVx1INEHpdCHRAeuFKEEdzfkJSS7sr+ZPWyQ+M4z35v/m9mt6FlVz/58DeBWeGk4YFjwMP4Dwlv6vYjWwDJ8V7NgA6xee0pXNAC2wDwJ2QEL4JoFWDcE9sAkgByBGXBpq4u+gxFwAMYFyAmYAufSEBHAPs2FCKtLU82FFJUB2GxMxmVsyjiMxXjeKgvQxIW7eOVCXWyoLgDNnmfoGafUFZAyrRd9BFD672Snbwzd9oLeAdlJU3Uf2UFqsmzRHehrHBmAe1VEAAAAAElFTkSuQmCC" />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAARlJREFUSEvt1M8qxUEYxvHP2SrZEMpCUlyD/Cls5TZkq9yJzsZKuQG5AmSFbP3JmiVX4PfWqF/6nZlx6mRzZjm98zzv8513pmfEqzdifWODIuF/R3SMM7wPaHUFGzgdFCWX4BAneMFmh8kyrjGHfVx0meQM4mAIhNBr6vQnyRJuMYtHbOHrrwZR32UyUSseAjWXPI+rlOQJU8n4vkm4g8/cKNUYxPmFhGsxiWWxtA1rDYJ1MA/2sR6aVNul7msRhfhNQvScEMXeXbO/WzIpJWh3/oY1TLbGs5gkZ9Al/pEQxegGspkSrpzBQTPnfQSWmPPfr3k1JZnGHi6HeQdHOM98FWGyPuxXUfwpawpKl1yjka0ZGxQRjhzRNxi0NBmpupZSAAAAAElFTkSuQmCC" />
                      &nbsp;&nbsp;
                    </td>
                  </tr>
                  <tr>
                    <td>진료계산서.doc</td>
                    <td>인사과 김자료</td>
                    <td>2024-01-12</td>
                    <td>43.5 KB</td>
                    <td style={{ textAlign: "right" }}>
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAANFJREFUSEvtlMENAWEQRt+6uStBEVx1INEHpdCHRAeuFKEEdzfkJSS7sr+ZPWyQ+M4z35v/m9mt6FlVz/58DeBWeGk4YFjwMP4Dwlv6vYjWwDJ8V7NgA6xee0pXNAC2wDwJ2QEL4JoFWDcE9sAkgByBGXBpq4u+gxFwAMYFyAmYAufSEBHAPs2FCKtLU82FFJUB2GxMxmVsyjiMxXjeKgvQxIW7eOVCXWyoLgDNnmfoGafUFZAyrRd9BFD672Snbwzd9oLeAdlJU3Uf2UFqsmzRHehrHBmAe1VEAAAAAElFTkSuQmCC" />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAARlJREFUSEvt1M8qxUEYxvHP2SrZEMpCUlyD/Cls5TZkq9yJzsZKuQG5AmSFbP3JmiVX4PfWqF/6nZlx6mRzZjm98zzv8513pmfEqzdifWODIuF/R3SMM7wPaHUFGzgdFCWX4BAneMFmh8kyrjGHfVx0meQM4mAIhNBr6vQnyRJuMYtHbOHrrwZR32UyUSseAjWXPI+rlOQJU8n4vkm4g8/cKNUYxPmFhGsxiWWxtA1rDYJ1MA/2sR6aVNul7msRhfhNQvScEMXeXbO/WzIpJWh3/oY1TLbGs5gkZ9Al/pEQxegGspkSrpzBQTPnfQSWmPPfr3k1JZnGHi6HeQdHOM98FWGyPuxXUfwpawpKl1yjka0ZGxQRjhzRNxi0NBmpupZSAAAAAElFTkSuQmCC" />
                      &nbsp;&nbsp;
                    </td>
                  </tr>
                  <tr>
                    <td>진료계산서.doc</td>
                    <td>인사과 김자료</td>
                    <td>2024-01-12</td>
                    <td>43.5 KB</td>
                    <td style={{ textAlign: "right" }}>
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAANFJREFUSEvtlMENAWEQRt+6uStBEVx1INEHpdCHRAeuFKEEdzfkJSS7sr+ZPWyQ+M4z35v/m9mt6FlVz/58DeBWeGk4YFjwMP4Dwlv6vYjWwDJ8V7NgA6xee0pXNAC2wDwJ2QEL4JoFWDcE9sAkgByBGXBpq4u+gxFwAMYFyAmYAufSEBHAPs2FCKtLU82FFJUB2GxMxmVsyjiMxXjeKgvQxIW7eOVCXWyoLgDNnmfoGafUFZAyrRd9BFD672Snbwzd9oLeAdlJU3Uf2UFqsmzRHehrHBmAe1VEAAAAAElFTkSuQmCC" />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAARlJREFUSEvt1M8qxUEYxvHP2SrZEMpCUlyD/Cls5TZkq9yJzsZKuQG5AmSFbP3JmiVX4PfWqF/6nZlx6mRzZjm98zzv8513pmfEqzdifWODIuF/R3SMM7wPaHUFGzgdFCWX4BAneMFmh8kyrjGHfVx0meQM4mAIhNBr6vQnyRJuMYtHbOHrrwZR32UyUSseAjWXPI+rlOQJU8n4vkm4g8/cKNUYxPmFhGsxiWWxtA1rDYJ1MA/2sR6aVNul7msRhfhNQvScEMXeXbO/WzIpJWh3/oY1TLbGs5gkZ9Al/pEQxegGspkSrpzBQTPnfQSWmPPfr3k1JZnGHi6HeQdHOM98FWGyPuxXUfwpawpKl1yjka0ZGxQRjhzRNxi0NBmpupZSAAAAAElFTkSuQmCC" />
                      &nbsp;&nbsp;
                    </td>
                  </tr>
                  <tr>
                    <td>진료계산서.doc</td>
                    <td>인사과 김자료</td>
                    <td>2024-01-12</td>
                    <td>43.5 KB</td>
                    <td style={{ textAlign: "right" }}>
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAANFJREFUSEvtlMENAWEQRt+6uStBEVx1INEHpdCHRAeuFKEEdzfkJSS7sr+ZPWyQ+M4z35v/m9mt6FlVz/58DeBWeGk4YFjwMP4Dwlv6vYjWwDJ8V7NgA6xee0pXNAC2wDwJ2QEL4JoFWDcE9sAkgByBGXBpq4u+gxFwAMYFyAmYAufSEBHAPs2FCKtLU82FFJUB2GxMxmVsyjiMxXjeKgvQxIW7eOVCXWyoLgDNnmfoGafUFZAyrRd9BFD672Snbwzd9oLeAdlJU3Uf2UFqsmzRHehrHBmAe1VEAAAAAElFTkSuQmCC" />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAARlJREFUSEvt1M8qxUEYxvHP2SrZEMpCUlyD/Cls5TZkq9yJzsZKuQG5AmSFbP3JmiVX4PfWqF/6nZlx6mRzZjm98zzv8513pmfEqzdifWODIuF/R3SMM7wPaHUFGzgdFCWX4BAneMFmh8kyrjGHfVx0meQM4mAIhNBr6vQnyRJuMYtHbOHrrwZR32UyUSseAjWXPI+rlOQJU8n4vkm4g8/cKNUYxPmFhGsxiWWxtA1rDYJ1MA/2sR6aVNul7msRhfhNQvScEMXeXbO/WzIpJWh3/oY1TLbGs5gkZ9Al/pEQxegGspkSrpzBQTPnfQSWmPPfr3k1JZnGHi6HeQdHOM98FWGyPuxXUfwpawpKl1yjka0ZGxQRjhzRNxi0NBmpupZSAAAAAElFTkSuQmCC" />
                      &nbsp;&nbsp;
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="pay-top-wrapper">
                <div style={{ width: "45%" }} />


                <ul className="pagination pagination-sm">
                    <li className="page-item next">
                      <a className="page-link" href="javascript:void(0);">
                        <i className="tf-icon bx bx-chevrons-left">
                        </i>
                      </a>
                    </li>
                    <li className="page-item active">
                      <a className="page-link" href="javascript:void(0);">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link " href="javascript:void(0);">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="javascript:void(0);">
                        3
                      </a>
                    </li>
                    <li className="page-item next">
                      <a className="page-link" href="javascript:void(0);">
                        <i className="tf-icon bx bx-chevrons-right">
                        </i>
                      </a>
                    </li>
                  </ul>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="layout-overlay layout-menu-toggle" />
</div>
        </>
    )

}
export default DataFormat;