import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

function Mirror() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blurBackgroundCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    handleStartMirrorClick();
  }, []);

  const handleStartMirrorClick = async () => {
    const video = document.createElement("video");
    const canvas = canvasRef.current;
    const blurBackgroundCanvas = blurBackgroundCanvasRef.current;
    const container = containerRef.current;
    const ctx = canvas?.getContext("2d");
    const blurBackgroundCtx = blurBackgroundCanvas?.getContext("2d");

    if (!canvas || !ctx) {
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    // Wait for video metadata to load to access video dimensions
    video.addEventListener("loadedmetadata", () => {
      const isVerticalOrientation =
        container?.offsetWidth &&
        container.offsetHeight &&
        container.offsetWidth < container.offsetHeight;

      if (!isVerticalOrientation) {
        canvas.style.width = "auto";
        canvas.style.height = "100%";
      } else {
        canvas.style.width = "100%";
        canvas.style.height = "auto";
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      blurBackgroundCanvas.width = video.videoWidth;
      blurBackgroundCanvas.height = video.videoHeight;

      video.play();

      const draw = () => {
        blurBackgroundCtx?.drawImage(
          video,
          0,
          0,
          video.videoWidth,
          video.videoHeight,
        );

        ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        requestAnimationFrame(draw);
      };

      draw();
    });
  };

  return (
    <Box sx={{ width: "100%", height: "100%", background: "grey" }}>
      {/*<button onClick={handleStartMirrorClick}>Start</button>*/}
      <Box
        ref={containerRef}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        <canvas
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            filter: "blur(100px)",
          }}
          ref={blurBackgroundCanvasRef}
          id="blurBackgroundCanvas"
        ></canvas>

        <canvas
          style={{
            position: "relative",
            zIndex: 1,
          }}
          ref={canvasRef}
          id="mirrorCanvas"
        ></canvas>
      </Box>
    </Box>
  );
}

export default Mirror;
