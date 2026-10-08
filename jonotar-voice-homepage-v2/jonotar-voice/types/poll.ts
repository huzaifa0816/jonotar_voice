export type Poll = {
  id: string;
  question: string;
  description: string | null;
  status: string;
  created_at: string;
};

export type PollOption = {
  id: string;
  poll_id: string;
  option_text: string;
  sort_order: number;
};

export type PollWithOptions = Poll & {
  poll_options: PollOption[];
};
