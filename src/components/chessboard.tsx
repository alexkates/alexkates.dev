"use client";

import { Chess } from "chess.js";
import dynamic from "next/dynamic";
import { useState } from "react";

const ChessboardJSX = dynamic(() => import("chessboardjsx"), {
  ssr: false,
});

function Chessboard() {
  const [chess] = useState(new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"));
  const [fen, setFen] = useState(chess.fen());

  type Move = {
    from: string;
    to: string;
    promotion?: string;
  };

  const handleMove = (move: Move) => {
    if (chess.move(move)) {
      setTimeout(() => {
        const moves = chess.moves();
        if (moves.length > 0) {
          const computerMove = moves[Math.floor(Math.random() * moves.length)];
          chess.move(computerMove);
          setFen(chess.fen());
        }
      }, 300);
      setFen(chess.fen());
    }
  };

  const calcWidth = ({ screenWidth, screenHeight }: { screenWidth: number; screenHeight: number }) => Math.min(screenWidth, screenHeight) * 0.8;
  return (
    <ChessboardJSX
      position={fen}
      calcWidth={calcWidth}
      onDrop={(move) =>
        handleMove({
          from: move.sourceSquare,
          to: move.targetSquare,
          promotion: "q",
        })
      }
    />
  );
}

export default Chessboard;
