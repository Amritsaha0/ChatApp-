import { WebSocketServer, WebSocket } from "ws";
let userCount = 0;
let allsockets = [];
const wss = new WebSocketServer({ port: 8080 });
wss.on("connection", (socket) => {
    console.log("✅ WebSocket Server Connected");
    socket.send("Hello from Server");
    socket.on("message", (message) => {
        console.log("Received:", message.toString());
        const ParsedMessage = JSON.parse(message.toString());
        if (ParsedMessage.type === "join") {
            allsockets.push({
                socket: socket,
                room: ParsedMessage.payload.roomId,
            });
            console.log(`User joined room: ${ParsedMessage.payload.roomId}`);
        }
        if (ParsedMessage.type === "chat") {
            console.log(ParsedMessage.payload.message);
            const currentUserRoom = allsockets.find((s) => s.socket === socket)?.room;
            for (let i = 0; i < allsockets.length; i++) {
                // @ts-ignore
                if (allsockets[i].room === currentUserRoom && allsockets[i].socket !== socket) {
                    //@ts-ignore
                    allsockets[i].socket.send(ParsedMessage.payload.message);
                }
            }
        }
    });
    socket.on("close", () => {
        allsockets = allsockets.filter((s) => s.socket !== socket);
        userCount--;
        console.log("User disconnected");
        console.log(`Total users: ${userCount}`);
    });
});
console.log("WebSocket server is running on ws://localhost:8080");
//# sourceMappingURL=index.js.map