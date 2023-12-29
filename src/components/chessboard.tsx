"use client";

import dynamic from "next/dynamic";

const ChessboardJSX = dynamic(() => import("chessboardjsx"), {
  ssr: false,
});

function Chessboard() {
  const calcWidth = ({ screenWidth, screenHeight }: { screenWidth: number; screenHeight: number }) => {
    return Math.min(screenWidth, screenHeight) * 0.8;
  };

  return <ChessboardJSX position="start" calcWidth={calcWidth} />;
}

export default Chessboard;
