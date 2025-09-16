"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import type { ErrorRange } from "@/app/types";

export default function ErrorWord({
  text,
  error,
  onAccept,
  onIgnore,
}: {
  text: string;
  error: ErrorRange;
  onAccept: (replacement: string) => void; // 부모에 입력값 전달
  onIgnore: () => void;
}) {
  const [open, setOpen] = useState(false);
  const spanRef = useRef<HTMLSpanElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [inputValue, setInputValue] = useState(error.suggestion || '');

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node) && spanRef.current && !spanRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (spanRef.current) {
      const rect = spanRef.current.getBoundingClientRect();
      setPos({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
      setOpen((v) => !v);
    }
  };

  const underlineColor =
    error.type === "spelling"
      ? "decoration-red-500"
      : error.type === "grammar"
      ? "decoration-yellow-500"
      : "decoration-blue-500";

  return (
    <>
      <span
        ref={spanRef}
        onClick={handleToggle}
        className={`underline ${underlineColor} decoration-2 cursor-pointer px-[1px]`}
        title={error.info}
      >
        {text}
      </span>

      {open &&
        createPortal(
          <div
            ref={popupRef}
            className="fixed bg-white border border-gray-200 rounded-md shadow-lg p-3 z-50 animate-fadeIn text-sm"
            style={{ top: pos.top, left: pos.left, minWidth: 180 }}
          >
            <div className="mb-2">
              <strong className="text-gray-800">{error.word}</strong>
              {error.suggestion && <span className="text-green-700 ml-2">{error.suggestion}</span>}
            </div>
            {error.info && <div className="text-gray-500 text-xs mb-2">{error.info}</div>}

            {/* 직접 입력 필드 */}
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onAccept(inputValue);
                  setOpen(false);
                }
              }}
              className="w-full border border-gray-300 rounded px-2 py-1 text-xs mb-2"
            />

            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAccept(inputValue);
                  setOpen(false);
                }}
                className="flex-1 text-blue-600 hover:text-blue-700 text-xs font-medium border border-gray-200 rounded px-2 py-1 transition"
              >
                Accept
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onIgnore();
                  setOpen(false);
                }}
                className="flex-1 text-gray-500 hover:text-gray-700 text-xs font-medium border border-gray-200 rounded px-2 py-1 transition"
              >
                Ignore
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
