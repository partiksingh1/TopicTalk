import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils"; // For merging class names
import { generateAnonName } from "@/utils/generateAnonName";
import axios from "axios";

interface Message {
  id: string;
  text: string;
  senderName: string;
  createdAt: string;
}

export default function Chat() {
  const { id: roomId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const storedName = localStorage.getItem("anon-name");
  const [senderName] = useState(() => {
    if (storedName) return storedName;
    const newName = generateAnonName();
    localStorage.setItem("anon-name", newName);
    return newName;
  });

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000");
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "join", roomId, senderName }));
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "MESSAGE") {
        setMessages((prev) => [...prev, data]);
      }
    };

    setSocket(ws);
    return () => ws.close();
  }, [roomId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/messages/${roomId}`
        );
        setMessages(res.data.messages); // or adapt based on response shape
      } catch (error) {
        console.error("Failed to fetch messages", error);
      }
    };

    fetchMessages();
  }, [roomId]);

  const sendMessage = () => {
    if (!input.trim() || !socket) return;
    socket.send(
      JSON.stringify({ type: "message", roomId, text: input, senderName })
    );
    setInput("");
  };

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 max-w-3xl mx-auto">
      <Card className="w-full flex flex-col flex-grow">
        <CardHeader className="border-b">
          <CardTitle className="text-xl sm:text-2xl font-bold">
            Topic Chat
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col flex-grow overflow-hidden p-0">
          <ScrollArea
            className="flex-1 px-4 py-2 h-[calc(100vh-250px)]"
            ref={chatRef}
          >
            <div className="flex flex-col space-y-2">
              {messages.map((msg) => (
                <div
                  key={msg.id + msg.createdAt}
                  className={cn(
                    "max-w-xs px-4 py-2 rounded-lg shadow text-sm",
                    msg.senderName === senderName
                      ? "self-end bg-primary text-white"
                      : "self-start bg-muted text-foreground"
                  )}
                >
                  <div className="font-semibold">{msg.senderName}</div>
                  <div>{msg.text}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t px-4 py-3 flex gap-2 items-center">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button onClick={sendMessage}>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
