import React, { useRef, useEffect, useState } from "react";

function SignatureCanvas() {
  const canvasRef = useRef(null);
  const [drawble, setDrawble] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const div = canvas.parentElement;

    function canvasResize() {
      canvas.height = div.clientHeight;
      canvas.width = div.clientWidth;
    }

    function draw(e) {
      function getPosition() {
        return {
          X: e.pageX - canvas.offsetLeft,
          Y: e.pageY - canvas.offsetTop
        };
      }

      switch (e.type) {
        case "mousedown":
          setDrawble(true);
          ctx.beginPath();
          ctx.moveTo(getPosition().X, getPosition().Y);
          break;
        case "mousemove":
          if (drawble) {
            ctx.lineTo(getPosition().X, getPosition().Y);
            ctx.stroke();
          }
          break;
        case "mouseup":
        case "mouseout":
          setDrawble(false);
          ctx.closePath();
          break;
      }
    }

    function touchdraw(e) {
      function getPosition() {
        return {
          X: e.changedTouches[0].pageX - canvas.offsetLeft,
          Y: e.changedTouches[0].pageY - canvas.offsetTop
        };
      }

      switch (e.type) {
        case "touchstart":
          setDrawble(true);
          ctx.beginPath();
          ctx.moveTo(getPosition().X, getPosition().Y);
          break;
        case "touchmove":
          if (drawble) {
            e.preventDefault();
            ctx.lineTo(getPosition().X, getPosition().Y);
            ctx.stroke();
          }
          break;
        case "touchend":
        case "touchcancel":
          setDrawble(false);
          ctx.closePath();
          break;
      }
    }

    window.addEventListener("resize", canvasResize);
    canvas.addEventListener("mousedown", draw);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", draw);
    canvas.addEventListener("mouseout", draw);

    canvas.addEventListener("touchstart", touchdraw);
    canvas.addEventListener("touchend", touchdraw);
    canvas.addEventListener("touchcancel", touchdraw);
    canvas.addEventListener("touchmove", touchdraw);

    return () => {
      window.removeEventListener("resize", canvasResize);
      canvas.removeEventListener("mousedown", draw);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", draw);
      canvas.removeEventListener("mouseout", draw);

      canvas.removeEventListener("touchstart", touchdraw);
      canvas.removeEventListener("touchend", touchdraw);
      canvas.removeEventListener("touchcancel", touchdraw);
      canvas.removeEventListener("touchmove", touchdraw);
    };
  }, [drawble]);

  const handleSaveClick = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div style={{ width: "300px", height: "300px" }}>
        <canvas ref={canvasRef} style={{ border: "1px solid black" }} />
      </div>
      <div>
        <button onClick={handleSaveClick}>save</button>
      </div>
    </div>
  );
}

export default SignatureCanvas;