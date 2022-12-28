// // import {Server} from 'socket.io'

// let io;

// module.exports  = {
//     init: httpServer => {
//         io = new Server(httpServer, {
//             cors: {
//                 origin: "https://posts-feed.vercel.app",
//                 allowedHeaders: ["Socket-Connect"],
//                 credentials: true,
//                 methods: ["GET", "POST"]
//             },
//             allowEIO3: true,
//         });
//         return io;
//     },
//     getIO: () => {
//         if(!io){
//             throw new Error('Socket.io not initialized');
//         }
//         return io;
//     }
// }
   