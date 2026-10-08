import Link from "next/link";
import type { Poll } from "@/types/poll";

export default function PollCard({ poll }: { poll: Poll }) {
  return (
    <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <div className="mb-3 flex items-center gap-2 text-sm text-teal-700">
        <span className="h-2 w-2 rounded-full bg-teal-600" />
        আজকের প্রশ্ন
      </div>
      <h2 className="text-2xl font-bold leading-tight">{poll.question}</h2>
      {poll.description && (
        <p className="mt-3 text-gray-600">{poll.description}</p>
      )}
      <Link
        href={`/poll/${poll.id}`}
        className="mt-6 inline-flex rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white transition hover:bg-teal-800"
      >
        ভোট দিন →
      </Link>
    </article>
  );
}
