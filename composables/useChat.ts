interface Message {
  text: string;
  type: "user" | "other";
}

export default function useChat() {
  const { data, send } = useWebSocket("wss://chat-backend.shieru-lab.com/ws");
  const messages = ref<Message[]>([]);
  const clientId = useState("clientId");

  watch(data, (newData) => {
    const data = JSON.parse(newData);
    if (data) {
      if (data["type"] == "CONNECT") {
        clientId.value = data["id"];
        messages.value.push({
          text: `Client id: ${data["id"]} (${clientId.value})`,
          type: "other",
        });
      }
      if (data["type"] == "MESSAGE") {
        messages.value.push({
          text: data["content"],
          type: clientId.value === data["sender"] ? "user" : "other",
        });
      }
    }
  });

  const sendMessage = (message: string) => {
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      send(JSON.stringify({ type: "MESSAGE", content: trimmedMessage }));
    }
  };

  return { messages, sendMessage };
}
