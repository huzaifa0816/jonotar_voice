import PollCard from "@/components/PollCard";
import { supabase } from "@/lib/supabase";
import type { Poll } from "@/types/poll";

export default async function Home() {
  let poll: Poll | null = null;

  if (supabase) {
    const { data } = await supabase
      .from("polls")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    poll = data;
  }

  return (
    <main className="min-h-screen bg-[#f7f8fa]">
      <header className="absolute left-0 right-0 top-0 z-20 border-b border-white/15 bg-black/10 text-white backdrop-blur-sm">
        <div className="container-main flex h-16 items-center justify-between">
          <a href="/" className="text-lg font-black md:text-xl">
            🇧🇩 সাধারণ মানুষের কথা
          </a>
          <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold">
            জনমত প্ল্যাটফর্ম
          </span>
        </div>
      </header>

      <section className="relative isolate min-h-[620px] overflow-hidden text-white">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/c4/Sunset_in_Padma_river.jpg"
          alt="পদ্মা নদীর সূর্যাস্ত"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-black/55" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/45 via-black/30 to-teal-950/85" />

        <div className="container-main relative flex min-h-[620px] items-center pb-16 pt-28">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              মানুষের মতামত • মানুষের ভোট
            </div>

            <h1 className="text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
              সাধারণ মানুষের কথা
            </h1>

            <p className="mt-6 max-w-2xl text-xl leading-8 text-white/90 md:text-2xl">
              দেশের গুরুত্বপূর্ণ বিষয় নিয়ে আপনার মতামত জানান।
              আপনার একটি ভোটও জনমতের চিত্রের অংশ।
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#today-poll"
                className="rounded-2xl bg-white px-6 py-4 font-bold text-teal-900 shadow-xl transition hover:-translate-y-0.5"
              >
                আজকের Poll-এ ভোট দিন →
              </a>
              <a
                href="#how-it-works"
                className="rounded-2xl border border-white/30 bg-white/10 px-6 py-4 font-bold backdrop-blur-md transition hover:bg-white/20"
              >
                কীভাবে কাজ করে?
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-5 right-5 z-10 rounded-lg bg-black/35 px-3 py-2 text-[10px] text-white/75 backdrop-blur-sm">
          Photo: Alphakitty / Wikimedia Commons • CC BY-SA 4.0
        </div>
      </section>

      <section id="today-poll" className="container-main -mt-16 relative z-10 pb-10">
        {poll ? (
          <PollCard poll={poll} />
        ) : (
          <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-black/5">
            <div className="mb-3 text-sm font-bold text-teal-700">আজকের প্রশ্ন</div>
            <h2 className="text-2xl font-black">
              এখনো কোনো active poll প্রকাশ করা হয়নি।
            </h2>
            <p className="mt-2 text-gray-600">
              Supabase connect করে প্রথম poll তৈরি করলে এখানে দেখা যাবে।
            </p>
          </div>
        )}
      </section>

      <section id="how-it-works" className="container-main grid gap-5 pb-16 md:grid-cols-3">
        {[
          ["01", "প্রশ্ন দেখুন", "দেশের গুরুত্বপূর্ণ বিষয় নিয়ে সহজ প্রশ্ন দেখুন।"],
          ["02", "নিজের মত দিন", "আপনার নিজের মতামত থেকে একটি উত্তর বেছে নিন।"],
          ["03", "ফলাফল দেখুন", "ভোট দেওয়ার পর aggregate result দেখুন ও নিজের মতামত শেয়ার করুন।"],
        ].map(([num, title, text]) => (
          <div key={num} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <div className="text-sm font-black text-teal-700">{num}</div>
            <h3 className="mt-3 text-xl font-black">{title}</h3>
            <p className="mt-2 leading-7 text-gray-600">{text}</p>
          </div>
        ))}
      </section>

      <footer className="border-t bg-white py-8">
        <div className="container-main text-sm leading-6 text-gray-500">
          <p>
            Poll results অংশগ্রহণকারী ব্যবহারকারীদের মতামত প্রকাশ করে। এটি
            জাতীয়ভাবে representative scientific survey নয়।
          </p>
          <p className="mt-2">
            Background photo: Alphakitty, Wikimedia Commons, CC BY-SA 4.0.
          </p>
        </div>
      </footer>
    </main>
  );
}
