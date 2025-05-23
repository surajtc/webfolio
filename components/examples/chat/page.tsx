import { cn } from "@/lib/utils";
import { AppShell } from "./components/app-shell";
import { ChatOptions } from "./components/chat-options";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MicIcon, PaperclipIcon, SparkleIcon, ZapIcon } from "lucide-react";
import { UserAvatar } from "./components/user-avatar";

const messages = [
  { role: "user", message: "Hey Volt, can you tell me more about AI Agents?" },
  {
    role: "assistant",
    message:
      "AI agents are software that perceive their environment and act autonomously to achieve goals, making decisions, learning, and interacting. For example, an AI agent might schedule meetings by resolving conflicts, contacting participants, and finding optimal times—all without constant supervision.\nLet me know if you‘d like more details!",
  },
  { role: "user", message: "All clear, thank you!" },
];

export function ChatBubble({
  role,
  message,
}: {
  role: "user" | "assistant";
  message: string;
}) {
  return (
    <div>
      <div
        className={cn("flex gap-2", role === "user" ? "flex-row-reverse" : "")}
      >
        {role === "user" ? (
          <UserAvatar />
        ) : (
          <div className="size-8 shrink-0 grid place-items-center bg-primary text-background rounded-full">
            <ZapIcon className="size-4" />
          </div>
        )}
        <div
          className={cn(
            "px-4",
            role === "user" ? "bg-input/30 rounded py-2" : "",
          )}
        >
          {message}
          {role === "assistant" && <div className="p-1">Tools</div>}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <AppShell>
      <div className="flex gap-2 h-full">
        <div className="flex-1 relative">
          <div className="max-w-4xl mx-auto p-4 pt-12">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <ChatBubble key={index} role={msg.role} message={msg.message} />
              ))}
            </div>
            <div className="absolute bottom-12 w-full max-w-2xl mx-auto border rounded-lg p-2">
              <Textarea
                placeholder="Ask anything"
                className="text-sm rounded-none border-none focus-visible:border-none focus-visible:ring-0 shadow-none resize-none dark:bg-transparent"
              />
              <div className="flex items-center justify-between px-2 py-1">
                <div className="flex items-center gap-2">
                  <Button className="rounded-full size-8" size="icon">
                    <PaperclipIcon />
                  </Button>
                  <Button className="rounded-full size-8" size="icon">
                    <MicIcon />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button className="rounded-full size-8" size="icon">
                    <SparkleIcon />
                  </Button>
                  <Button className="rounded-full" size="sm">
                    Ask Volt
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="shrink-0">
          <ChatOptions />
        </div>
      </div>
    </AppShell>
  );
}
