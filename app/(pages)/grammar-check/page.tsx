"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/app/components";
import { SAMPLE_ESSAY } from "@/app/data";
import { tokenizeWithIndices } from "@/app/utils";
import type { ErrorRange } from "@/app/types";
import ErrorWord from "./ErrorWord";
import Notification from "./Notification";


export default function Page() {
  const [text, setText] = useState(SAMPLE_ESSAY);
  const [mode, setMode] = useState<"edit" | "view">("edit");
  const [errors, setErrors] = useState<ErrorRange[]>([]);
  const [checking, setChecking] = useState(false);
  const ignoredRef = useRef<Set<string>>(new Set());
  const timerRef = useRef<number | null>(null);

  const callCheckApi = useCallback(async (txt: string) => {
    setChecking(true);
    try {
      const res = await fetch("/api/grammar-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: txt }),
      });
      const json = await res.json();
      let errs: ErrorRange[] = json.errors || [];
      errs = errs.filter((e) => !ignoredRef.current.has(e.word.toLowerCase()));
      setErrors(errs);
    } catch (err) {
      console.error("check api error", err);
    } finally {
      setChecking(false);
    }
  }, []);

  const debouncedCheck = useCallback(
    (txt: string) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        callCheckApi(txt);
      }, 500);
    },
    [callCheckApi]
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSubmit = async () => {
    setMode("view");
    ignoredRef.current.clear();
    await callCheckApi(text);
  };
  
  const handleAccept = (err: ErrorRange, replacement: string) => {
    const before = text.slice(0, err.start);
    const after = text.slice(err.end);
    const newText = before + replacement + after;
    setText(newText);
    debouncedCheck(newText);
  };

  const handleIgnore = (err: ErrorRange) => {
    ignoredRef.current.add(err.word.toLowerCase());
    setErrors((prev) => prev.filter((e) => !(e.start === err.start && e.end === err.end)));
  };

  const tokens = tokenizeWithIndices(text);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center hover-lift">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Grammar Checker</h1>
          </div>
          <span className="text-sm text-gray-500">
            {checking ? "Checking..." : `${errors.length} issue(s)`}
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200 px-4 py-2 text-sm text-gray-500 flex justify-between">
              <span>{text.length} characters</span>
              <span>{text.split(" ").length} words</span>
            </div>

            <div className="p-4">
              {mode === "edit" ? (
                <>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write something..."
                    className="w-full h-60 p-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button onClick={handleSubmit}>Submit</Button>
                </>
              ) : (
                <div className="p-3 min-h-[200px] whitespace-pre-wrap text-sm leading-relaxed">
                  {tokens.map((t, i) => {
                    if (!t.isWord) return <span key={i}>{t.text}</span>;
                    const overlapped = errors.find(
                      (e) => e.start < t.end && e.end > t.start
                    );
                    if (overlapped) {
                      return (
                        <ErrorWord
                          key={i}
                          text={t.text}
                          error={overlapped}
                          onAccept={(replacement) => handleAccept(overlapped, replacement)}
                          onIgnore={() => handleIgnore(overlapped)}
                        />
                      );
                    }
                    return <span key={i}>{t.text}</span>;
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Writing Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Words</span>
                <span className="font-medium">{text.split(" ").length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Characters</span>
                <span className="font-medium">{text.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Issues</span>
                <span className="font-medium text-red-600">{errors.length}</span>
              </div>
            </div>
          </div>

          <Notification />
        </div>
      </main>
    </div>
  );
}
