 "use client";

import { useState } from "react";
import type { PollWithOptions } from "@/types/poll";

type Result = { option_id: string; option_text: string; votes: number; percentage: number };

export default function VotePanel({ poll }: { poll: PollWithOptions }) {
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Result[] | null>(null);
  const [message, setMessage] = useState("");

  async function vote() {
    if (!selected) {
      setMessage("একটি উত্তর নির্বাচন করুন।");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pollId: poll.id, optionId: selected }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "ভোট দেওয়া যায়নি।");
        return;
      }

      setResults(data.results);
      setMessage("✅ আপনার ভোট গ্রহণ করা হয়েছে।");
    } catch {
      setMessage("সার্ভারে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8">
      {!results ? (
        <>
          <div className="space-y-3">
            {poll.poll_options
              .sort((a, b) => a.sort_order - b.sort_order)
              .map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelected(option.id)}
                  className={`w-full rounded-2xl border p-4 text-left font-semibold transition ${
                    selected === option.id
                      ? "border-teal-600 bg-teal-50 text-teal-800"
                      : "border-gray-200 bg-white hover:border-teal-300"
                  }`}
                >
                  {option.option_text}
                </button>
              ))}
          </div>

          <button
            disabled={loading}
            onClick={vote}
            className="mt-5 w-full rounded-2xl bg-teal-700 px-5 py-4 font-bold text-white disabled:opacity-50"
          >
            {loading ? "ভোট নেওয়া হচ্ছে..." : "আমার ভোট দিন"}
          </button>
        </>
      ) : (
        <div className="space-y-4">
          <div className="rounded-2xl bg-teal-50 p-4 font-semibold text-teal-800">
            {message}
          </div>

          {results.map((r) => (
            <div key={r.option_id}>
              <div className="mb-1 flex justify-between text-sm font-semibold">
                <span>{r.option_text}</span>
                <span>{r.percentage}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-teal-600 transition-all"
                  style={{ width: `${r.percentage}%` }}
                />
              </div>
              <div className="mt-1 text-xs text-gray-500">{r.votes} ভোট</div>
            </div>
          ))}

          <button
            onClick={() => window.location.reload()}
            className="mt-3 rounded-xl border border-gray-300 px-4 py-3 font-semibold"
          >
            আবার দেখুন
          </button>
        </div>
      )}
    </div>
  );
}
