"use client";

import { Chess } from "chess.js";
import dynamic from "next/dynamic";
import { useState } from "react";

const ChessboardJSX = dynamic(() => import("chessboardjsx"), {
  ssr: false,
});

function Chessboard({ userId }: { userId?: string }) {
  const [chess] = useState(new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"));
  const [fen, setFen] = useState(chess.fen());

  const handleMove = (move: { sourceSquare: string; targetSquare: string; piece: string }) => {
    try {
      if (!userId) {
        throw new Error("Not logged in");
      }

      if (
        chess.move({
          from: move.sourceSquare,
          to: move.targetSquare,
          promotion: "q",
        })
      ) {
        setFen(chess.fen());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calcWidth = ({ screenWidth, screenHeight }: { screenWidth: number; screenHeight: number }) => Math.min(screenWidth, screenHeight) * 0.8;
  return <ChessboardJSX position={fen} calcWidth={calcWidth} onDrop={handleMove} />;
}

export default Chessboard;
