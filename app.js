const app = require("express")();
const cors = require("cors");
const http = require("http").createServer(app);
const port = process.env.PORT || 3000;
const io = require("socket.io")(http);
// const { User } = require("./models") // integrasi database

app.use(cors());

let rooms = [];
let onlineUsers = [];
let activeRoom = [];

let playerOne = [] // feet
let playerTwo = [] // hip

//team Two
let playerThree = [] // feet
let playerFour = [] // hip


io.on("connection", (socket) => {
  console.log("a user connected");
  // game
  
  // socket.emit("hello", "HELLO WORLD")
  // io.emit("gamePlayer", gamePlayers)
  // io.on('hello', )
  
  // socket.on('moveBone', (payload) => {
  //   if(payload.team === "teamOne") {
  //     let user = gamePlayers.teamOne.find(e => e.username === payload.username)
  //     user.cordinatX = payload.cordinatX
  //     user.cordinatY = payload.cordinatY
  //   } else {
  //     let user = gamePlayers.teamTwo.find(e => e.username === payload.username)
  //     user.cordinatX = payload.cordinatX
  //     user.cordinatY = payload.cordinatY
  //   }

  //   io.emit("moveBone", gamePlayers)
  // })

  //end game


  socket.on("createRoom", (payload) => {
    let room = {
      id: payload.id,
      name: payload.roomName,
      teamOne: [],
      teamTwo: [],
      status: false,
      isActive: false,
      roomMaster: payload.roomMaster,
      scoreTeamOne: 0,
      scoreTeamTwo: 0,
    };
    rooms.push(room);
    activeRoom.push(room)
    io.emit("createRoom", rooms);
  });

  socket.on("joinRoom", (payload) => {
    socket.join(payload.roomName, () => {
      const roomFind = activeRoom.find((e) => e.id === payload.idRoom)
      // const playerData = {
      //   username: payload.username,
      //   cordinatX: null,
      //   cordinatY: null,
      //   roomName: payload.roomName
      // }
      if (payload.team === "teamOne") {
        roomFind.teamOne.push(payload.username)
        // roomFind.teamOne[0] ? playerTwo.push(playerData) : playerOne.push(playerData)
      } else if (payload.team === "teamTwo") {
        roomFind.teamTwo.push(payload.username);
        // roomFind.teamTwo[0] ? playerFour.push(playerData) : playerThree.push(playerData)
      }
      roomFind.isActive = true;
      // activeRoom.push(roomFind);
      io.sockets.in(payload.roomName).emit("roomDetail", roomFind);
      // io.emit("activeRoom", activeRoom);
      io.emit("joinRoom", activeRoom);
    });
  });

  socket.on("startGame", (payload) => {
    // console.log(payload)
    let room = activeRoom.find((e) => e.id === payload.id);
    room.status = true;
    console.log(playerOne, "<<<" , room.teamOne[0])

    room.teamOne[0] && playerOne.push({
      username: room.teamOne[0],
      cordinatX: null,
      cordinatY: null,
      roomName: room.name,
      role: 'feet',
      team: 'teamOne'
    }) 
    room.teamOne[1] && playerTwo.push({
      username: room.teamOne[1],
      cordinatX: null,
      cordinatY: null,
      roomName: room.name,
      role: 'hip',
      team: 'teamOne'
    })
    room.teamTwo[0] && playerThree.push({
      username: room.teamTwo[0],
      cordinatX: null,
      cordinatY: null,
      roomName: room.name,
      role: 'feet',
      team: 'teamTwo'
    }) 
    room.teamTwo[1] && playerFour.push({
      username: room.teamTwo[1],
      cordinatX: null,
      cordinatY: null,
      roomName: room.name,
      role: 'hip',
      team: 'teamTwo'
    })

    let findPlayerOne = playerOne.find(e => e.username === room.teamOne[0])
    let findPlayerTwo = playerTwo.find(e => e.username === room.teamOne[1])
    let findPlayerThree = playerThree.find(e => e.username === room.teamTwo[0])
    let findPlayerFour = playerFour.find(e => e.username === room.teamTwo[1])
    console.log(findPlayerOne,findPlayerTwo, findPlayerThree, findPlayerFour, "find player" )
    let data = {
      room,
      playerOne: findPlayerOne,
      playerTwo: findPlayerTwo,
      playerThree: findPlayerThree,
      playerFour: findPlayerFour
    }

    // io.in(room.name).emit("startGame", data);
    io.emit("startGame", data);
    io.sockets.in(room.name).emit("moveRoom", data);
  });

  socket.on("updateScore", (payload) => {
    let room = activeRoom.find((e) => e.id === payload.id);
    room = payload;
    io.in(payload.name).emit("updateScore", room);
  });

  socket.on("playingGame", (payload) => {
    let room = activeRoom.find((e) => e.id === payload.id);
    io.in(payload.name).broadcast("playingGame", room);
  });

  socket.on("action", (action) => {
    if (action.type === "server/players") {
      // console.log("Got hello data!", action.data);
      onlineUsers.push(action.data);
      // //insert user online ke db
      // User.create({
      //   username: action.data.username
      // }).then(_ => console.log).catch(err => console.log(err))

      socket.emit("action", { type: "SET_PLAYERS", payload: onlineUsers });
    } else if (action.type === "server/online") {
      socket.emit("action", { type: "SET_PLAYERS", payload: onlineUsers });
    } else if (action.type === "server/createRoom") {
      rooms.push(action.data);
      socket.emit("action", { type: "CREATE_ROOM", payload: rooms });
    } else if (action.type === "server/rooms") {
      socket.emit("action", { type: "CREATE_ROOM", payload: rooms });
    }
  });

  //game
  // socket.on('hai', data => {
  //   console.log(data, "socket hai di server")
  //   io.emit('hai', 'hai juga from server to game')
  // })

  socket.on('moveBone', data => {
    // console.log(data)
    socket.broadcast.emit('updateBone', data)
  })

  // socket.on('goalP1', )

  //

  socket.on("disconnect", () => {
    // ? event pada saat user disconnected
    console.log("user disconnected");
  });
});

http.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app
