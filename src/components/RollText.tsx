import type { CSSProperties } from "react";
import "./RollText.css";

// On hover of the parent link/button, each letter rolls up to reveal a duplicate, staggered left to right.
export default function RollText({ text }: { text: string }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span className="roll" aria-hidden="true">
        {text.split("").map((ch, i) => {
          const glyph = ch === " " ? " " : ch;
          return (
            <span key={i} className="roll-char" style={{ "--i": i } as CSSProperties}>
              <span>{glyph}</span>
              <span>{glyph}</span>
            </span>
          );
        })}
      </span>
    </>
  );
}
