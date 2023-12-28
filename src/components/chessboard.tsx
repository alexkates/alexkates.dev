"use client";

import ChessboardJSX from "chessboardjsx";

function Chessboard() {
  function calcWidth({ screenWidth, screenHeight }: { screenWidth: number; screenHeight: number }) {
    return screenWidth < 500 ? 350 : Math.min(screenWidth, screenHeight) * 0.8;
  }

  return (
    <section className="flex flex-col w-full items-center">
      <ChessboardJSX position={"start"} calcWidth={calcWidth} />
    </section>
  );
}

export default Chessboard;
