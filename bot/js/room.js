    function join_room(roomId, zoneName) {
      if (!roomId) {
        alert('Select room, please');
        return;
      }
      if (!isSocketConnected()) {
        return;
      }
      const joinRoomMessage = [
        3, 
        zoneName, 
        roomId, 
        ""
      ]
      const msg = joinRoomMessage;
      socket.send(JSON.stringify(msg));
      log("Sent: " + JSON.stringify(msg));
    }