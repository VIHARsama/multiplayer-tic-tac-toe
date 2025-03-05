import { io } from "socket.io-client";

const BACKEND_URL = "http://localhost:3000";

const initSocket = async () => {
   const options = {
      "force new connection": true,
      reconnectionAttempt: "Infinity",
      timeout: 10000,
      transports: ["websocket"],
   };

   return io(BACKEND_URL, options);
};

export { initSocket };
