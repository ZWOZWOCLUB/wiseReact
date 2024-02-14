import React from 'react';

function ImageDownloader() {
  const imageUrl = 'http://localhost:8001/salary/d1d5cefa23184c4f9b7be548862379bf.png';

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'image.png'; // 파일명을 지정할 수 있습니다.

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  return (
    <div>
      <button onClick={handleDownload}>이미지 다운로드</button>
    </div>
  );
}

export default ImageDownloader;