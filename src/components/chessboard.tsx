"use client";

import createBrowserClient from "@/lib/createSupabaseBrowserClient";
import { Chess } from "chess.js";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ChessboardJSX = dynamic(() => import("chessboardjsx"), {
  ssr: false,
});

function Chessboard() {
  const newGameFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
  const [fen, setFen] = useState<string | undefined>(newGameFen);
  const [chess, setChess] = useState<Chess | undefined>(new Chess(newGameFen));
  const [gameId, setGameId] = useState<string | undefined>(undefined);
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function init() {
      const supabase = createBrowserClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserId(user?.id);

      let existingActiveChessGame = await supabase
        .from("ChessGames")
        .select("id, ChessMoves(fen)")
        .eq("active", true)
        .order("createdAt", { ascending: false })
        .order("createdAt", { referencedTable: "ChessMoves", ascending: false })
        .maybeSingle();

      setGameId(existingActiveChessGame?.data?.id);

      const mostRecentChessMove = existingActiveChessGame?.data?.ChessMoves[0];
      if (mostRecentChessMove) {
        setFen(mostRecentChessMove.fen);
        setChess(new Chess(mostRecentChessMove.fen));
      }
    }

    init();
  }, []);

  async function handleMove(move: { sourceSquare: string; targetSquare: string; piece: string }) {
    const supabase = createBrowserClient();

    try {
      if (!userId) throw new Error("Not logged in");

      let existingGameId = gameId;
      if (!existingGameId) {
        const { data: newGame } = await supabase
          .from("ChessGames")
          .insert([{ active: true }])
          .select("id")
          .single();

        existingGameId = newGame?.id;
        setGameId(newGame?.id);
      }

      if (
        chess?.move({
          from: move.sourceSquare,
          to: move.targetSquare,
          promotion: "q",
        })
      ) {
        const newFen = chess?.fen();
        setFen(newFen);
        await supabase.from("ChessMoves").insert([{ userId, gameId: existingGameId!, fen: newFen }]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!fen || !chess) return null;

  const calcWidth = ({ screenWidth, screenHeight }: { screenWidth: number; screenHeight: number }) => Math.min(screenWidth, screenHeight) * 0.7;
  return <ChessboardJSX position={fen} calcWidth={calcWidth} onDrop={handleMove} />;
}

export default Chessboard;
