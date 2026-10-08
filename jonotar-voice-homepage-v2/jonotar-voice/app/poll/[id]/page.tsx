import { notFound } from "next/navigation";
import VotePanel from "@/components/VotePanel";
import { supabase } from "@/lib/supabase";
import type { PollWithOptions } from "@/types/poll";

export default async function PollPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!supabase) {
    return (
      <main className="container-main py-16">
        <h1 className="text-3xl font-bold">Supabase configuration missing</h1>
        <p className="mt-3 text-gray-600">.env.local-এ Supabase credentials দিন।</p>
      </main>
    );
  }

  const { data: poll } = await supabase
    .from("polls")
    .select("*, poll_options(*)")
    .eq("id", id)
    .single();

  if (!poll) notFound();

  const typedPoll = poll as PollWithOptions;

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container-main flex h-16 items-center">
          <a href="/" className="font-black">সাধারণ মানুষের কথা</a>
        </div>
      </header>

      <section className="container-main max-w-2xl py-12">
        <p className="text-sm font-semibold text-teal-700">জনমত জরিপ</p>
        <h1 className="mt-3 text-3xl font-black leading-tight md:text-4xl">
          {typedPoll.question}
        </h1>

        {typedPoll.description && (
          <p className="mt-4 text-gray-600">{typedPoll.description}</p>
        )}

        <VotePanel poll={typedPoll} />

        <p className="mt-8 text-xs leading-5 text-gray-500">
          আপনার ভোট আপনার নিজের মতামত হিসেবে গণ্য হবে। কোনো poll-এর ফলাফলকে
          বাংলাদেশের সম্পূর্ণ জনগোষ্ঠীর প্রতিনিধিত্বকারী scientific survey হিসেবে
          ব্যাখ্যা করা উচিত নয়।
        </p>
      </section>
    </main>
  );
}
