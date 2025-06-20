import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import axios from "axios";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
type room = {
  id: string;
  name: string;
  messages: Message[];
};
type Message = {
  text: string;
  roomId: string;
  senderName: string;
};

export default function App() {
  const [topic, setTopic] = useState("");
  const [rooms, setRooms] = useState<room[]>([]);
  const navigate = useNavigate();

  const fetchRooms = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/room`);
      setRooms(res.data.rooms);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    }
  };

  const handleCreateRoom = async () => {
    if (!topic.trim()) return;
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/room`, {
        roomName: topic.toUpperCase(),
      });
      if (res.status == 201) {
        navigate(`/chat/${res.data.newRoom.id}`);
      }
    } catch (err) {
      console.error("Error creating room:", err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="min-h-screen p-6 md:p-12 bg-gray-50 dark:bg-black">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Real-Time Anonymous Chat
        </h1>
        <h2 className="text-xl font-light text-center mb-6 text-gray-800 dark:text-white">
          Join topic-based rooms. Chat anonymously. <br /> Messages vanish after 24 hours.
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <Input
            placeholder="Create or join a topic..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleCreateRoom} className="gap-2">
            <Plus className="w-4 h-4" />
            Create
          </Button>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
          Active Topics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">
              No rooms yet. Be the first to create one!
            </p>
          ) : (
            rooms.map((room) => (
              <Card
                key={room.id}
                onClick={() => navigate(`/chat/${room.id}`)}
                className="cursor-pointer hover:shadow-lg transition duration-200"
              >
                <CardHeader>
                  <CardTitle className="truncate">#{room.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Join anonymous discussion
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        <h2 className="text-md font-light text-center my-10 text-white p-4 rounded-md bg-gray-600 dark:text-white">
        ⚠️ Please do not share personal or sensitive information. <br />
        🔥 Inactive chats and messages will be automatically cleared after 24 hours.
        </h2>
      </div>
    </div>
  );
}
