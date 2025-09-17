"use client";

import { useState, useEffect } from "react";
import { useFloating, autoUpdate, offset, flip, shift, useClick, useDismiss, useRole, useInteractions } from "@floating-ui/react";
import type { ErrorRange } from "@/app/types";
import { Button } from "@/app/components";

export default function ErrorWord({
  text,
  error,
  onAccept,
  onIgnore,
}: {
  text: string;
  error: ErrorRange;
  onAccept: (replacement: string) => void;
  onIgnore: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(error.suggestion || '');

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [
      offset(8),
      flip(),
      shift({ padding: 8 }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  useEffect(() => {
    if (open) {
      setInputValue(error.suggestion || '');
    }
  }, [open, error.suggestion]);

  const underlineColor =
    error.type === "spelling"
      ? "decoration-red-500"
      : error.type === "grammar"
      ? "decoration-yellow-500"
      : "decoration-blue-500";

  return (
    <>
      <span
        ref={refs.setReference}
        {...getReferenceProps()}
        className={`underline ${underlineColor} decoration-2 cursor-pointer px-[1px] hover:bg-gray-50 rounded-sm transition-colors`}
        title={error.info}
      >
        {text}
      </span>

      {open && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-50 text-sm min-w-64 max-w-sm animate-fadeIn"
        >
          <div className="mb-2">
            <div className="flex items-center justify-between mb-1">
              <strong className="text-gray-800">{error.word}</strong>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                error.type === "spelling" ? "bg-red-100 text-red-700" :
                error.type === "grammar" ? "bg-yellow-100 text-yellow-700" :
                "bg-blue-100 text-blue-700"
              }`}>
                {error.type}
              </span>
            </div>
            {error.suggestion && (
              <div className="text-green-700 text-sm font-medium">
                → {error.suggestion}
              </div>
            )}
          </div>
          
          {error.info && (
            <div className="text-gray-500 text-xs mb-3 p-2 bg-gray-50 rounded">
              {error.info}
            </div>
          )}

          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onAccept(inputValue);
                setOpen(false);
              } else if (e.key === "Escape") {
                setOpen(false);
              }
            }}
            className="w-full border border-gray-300 rounded px-2 py-1 text-xs mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="수정할 텍스트 입력..."
          />

          <div className="flex gap-2">
            <Button
              onClick={() => {
                onAccept(inputValue);
                setOpen(false);
              }}
            >
              Accept
              </Button>
            <Button
              onClick={() => {
                onIgnore();
                setOpen(false);
              }}
              className="bg-gray-200"
            >
              Ignore
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
