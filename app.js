const app = require("express")();
const cors = require("cors");
const http = require("http").createServer(app);
const port = process.env.PORT || 3000;
const io = require("socket.io")(http);

app.use(cors());

let rooms = []
let onlineUsers = []
let activeRoom = []

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on('createRoom', (payload) => {
    let room = {
      id: payload.id,
      name: payload.roomName,
      teamOne: [],
      teamTwo: [],
      status: false,
      isActive: false,
      roomMaster: payload.roomMaster
    }
    rooms.push(room)
    io.emit('createRoom', rooms)
  })

  socket.on('joinRoom', payload => {
    socket.join(payload.roomName, () => {
      const roomFind = rooms.find(e => e.id === payload.idRoom)
      console.log(roomFind, "<< room di join room server")
      if(roomFind.teamOne.length === 3) {
        roomFind.teamTwo.push(payload.username)
      } else {
        roomFind.teamOne.push(payload.username)
      }
      roomFind.isActive = true
      activeRoom.push(roomFind)
      io.sockets.in(payload.roomName).emit('roomDetail', roomFind)
      io.emit('activeRoom', activeRoom)
      io.emit('joinRoom', rooms)
    })
  })

  socket.on('startGame', payload => {
    // console.log(payload)
    let room = activeRoom.find(e => e.id === payload.id)
    // console.log(room, "<<< room start game")
    room.status = true
    io.sockets.in(room.name).emit('startGame', room)
  })

  socket.on('action', (action) => {
    if(action.type === 'server/players'){
      console.log('Got hello data!', action.data);
      onlineUsers.push(action.data)
      socket.emit('action', { type:'SET_PLAYERS', payload: onlineUsers });
    } else if ( action.type === 'server/online') {
      socket.emit('action', {type:'SET_PLAYERS', payload: onlineUsers});
    } else if ( action.type === 'server/createRoom') {
      rooms.push(action.data)
      socket.emit('action', {type: 'CREATE_ROOM', payload: rooms})
    } else if ( action.type === 'server/rooms' ) {
      socket.emit('action', {type: 'CREATE_ROOM', payload: rooms})
    }
  })

  socket.on("disconnect", () => {
    // ? event pada saat user disconnected
    console.log("user disconnected");
  });
});

http.listen(port, () => {
  console.log(`listening on port ${port}`);
});