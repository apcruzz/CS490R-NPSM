import { useState, type FormEvent } from "react";

type TripAssistantProps = {
  parkName: string;
  startDate: string;
  endDate: string;
  pace: string;
  interests: string[];
};

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  content: string;
};

const suggestedPrompts = [
  "Create a simple daily schedule",
  "What should I pack?",
  "Suggest activities for bad weather",
];

function buildPreviewResponse(
  message: string,
  trip: TripAssistantProps
) {
  const park = trip.parkName || "your selected park";
  const question = message.toLowerCase();
  const interestText =
    trip.interests.length > 0
      ? trip.interests.join(", ").toLowerCase()
      : "scenic highlights";

  if (question.includes("pack")) {
    return `For ${park}, start with layered clothing, water, sun protection, a first-aid kit, navigation, and sturdy shoes. Check the weather and park alerts before leaving.`;
  }

  if (
    question.includes("weather") ||
    question.includes("rain") ||
    question.includes("bad weather")
  ) {
    return `For a weather backup at ${park}, plan shorter viewpoints, visitor-center exhibits, ranger programs, and scenic drives. Keep one flexible block in the schedule.`;
  }

  if (
    question.includes("schedule") ||
    question.includes("itinerary") ||
    question.includes("daily")
  ) {
    return `For a ${trip.pace.toLowerCase()} trip to ${park}, use mornings for popular trails, afternoons for ${interestText}, and evenings for an easy viewpoint or rest. Your final plan should use current park hours and alerts.`;
  }

  return `I would plan around ${interestText} at ${park}. Tell me your preferred hike difficulty, transportation, and budget so I can make the suggestion more specific.`;
}

export default function TripAssistant(props: TripAssistantProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Tell me what kind of national park trip you want. I can help organize activities, packing ideas, and a daily schedule.",
    },
  ]);

  function sendMessage(content: string) {
    const trimmedMessage = content.trim();

    if (!trimmedMessage) return;

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: Date.now(),
        role: "user",
        content: trimmedMessage,
      },
      {
        id: Date.now() + 1,
        role: "assistant",
        content: buildPreviewResponse(trimmedMessage, props),
      },
    ]);
    setMessage("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(message);
  }

  return (
    <section className="flex min-h-[520px] flex-col rounded-md border border-zinc-200 bg-white">
      <header className="border-b border-zinc-200 px-5 py-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold">AI trip assistant</h3>
            <p className="mt-1 text-xs text-zinc-500">
              Frontend preview with sample responses
            </p>
          </div>
          <span className="rounded bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-800">
            Preview
          </span>
        </div>
      </header>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((chatMessage) => (
          <div
            key={chatMessage.id}
            className={`flex ${
              chatMessage.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <p
              className={`max-w-[88%] rounded-md px-3 py-2 text-sm leading-6 ${
                chatMessage.role === "user"
                  ? "bg-emerald-700 text-white"
                  : "bg-zinc-100 text-zinc-700"
              }`}
            >
              {chatMessage.content}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-zinc-200 p-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {suggestedPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => sendMessage(prompt)}
              className="rounded-md border border-zinc-300 px-2 py-1 text-xs text-zinc-600 hover:border-emerald-700 hover:text-emerald-800"
            >
              {prompt}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <label htmlFor="trip-assistant-message" className="sr-only">
            Message the trip assistant
          </label>
          <input
            id="trip-assistant-message"
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Ask about your trip..."
            className="min-w-0 flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
}
