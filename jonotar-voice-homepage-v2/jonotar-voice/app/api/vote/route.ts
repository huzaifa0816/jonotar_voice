import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(request: Request) {
  if (!url || !serviceKey) {
    return NextResponse.json(
      { error: "Server configuration missing." },
      { status: 500 }
    );
  }

  try {
    const { pollId, optionId } = await request.json();

    if (!pollId || !optionId) {
      return NextResponse.json(
        { error: "Poll এবং option প্রয়োজন।" },
        { status: 400 }
      );
    }

    const admin = createClient(url, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data: option, error: optionError } = await admin
      .from("poll_options")
      .select("id, poll_id")
      .eq("id", optionId)
      .eq("poll_id", pollId)
      .single();

    if (optionError || !option) {
      return NextResponse.json({ error: "Invalid option." }, { status: 400 });
    }

    const { error: voteError } = await admin.from("votes").insert({
      poll_id: pollId,
      option_id: optionId,
    });

    if (voteError) {
      return NextResponse.json({ error: "ভোট সংরক্ষণ করা যায়নি।" }, { status: 500 });
    }

    const { data: allVotes } = await admin
      .from("votes")
      .select("option_id")
      .eq("poll_id", pollId);

    const { data: options } = await admin
      .from("poll_options")
      .select("id, option_text")
      .eq("poll_id", pollId)
      .order("sort_order");

    const total = allVotes?.length ?? 0;

    const results = (options ?? []).map((o) => {
      const votes = (allVotes ?? []).filter((v) => v.option_id === o.id).length;
      return {
        option_id: o.id,
        option_text: o.option_text,
        votes,
        percentage: total ? Math.round((votes / total) * 1000) / 10 : 0,
      };
    });

    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
