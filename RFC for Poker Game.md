# RFC for Poker Game

version v1.0.0

## Basic Rules of Texas Hold'em Poker

Texas Hold'em is the most popular variant of poker. The game is played with a standard 52-card deck and usually involves 2–9 players at a table. The objective is to make the best possible five-card hand using a combination of **two private cards** (hole cards) and **five community cards**.

### Game Setup
- Each player is dealt **two private cards** face down.
- The dealer position rotates clockwise after each hand.
- The two players to the left of the dealer post the **small blind** and **big blind** to start the betting.

### Betting Rounds
There are four betting rounds in Texas Hold'em:
1. **Pre-Flop**  
   - After receiving hole cards, players decide whether to fold, call, or raise.
2. **Flop**  
   - The dealer reveals the first **three community cards**. Another round of betting follows.
3. **Turn**  
   - The dealer reveals the **fourth community card**. Another round of betting follows.
4. **River**  
   - The dealer reveals the **fifth and final community card**. The last betting round takes place.

### Showdown
- If more than one player remains after the final betting round, all active players reveal their hole cards.
- The winner is the player with the **highest-ranking five-card hand** according to standard poker hand rankings (Royal Flush, Straight Flush, Four of a Kind, Full House, Flush, Straight, Three of a Kind, Two Pair, One Pair, High Card).

### Player Actions
During betting rounds, players can:
- **Fold**: Discard their hand and forfeit the round.
- **Check**: Pass the action without betting (only if no bet has been made).
- **Call**: Match the current highest bet.
- **Raise**: Increase the current bet.
- **All-in**: Bet all remaining chips.

### Winning
- A player wins by either:
  - Forcing all other players to fold, or
  - Holding the strongest hand at showdown.

--- 

### Mario Framework Protocol

#### Reqeust Definitions

#### 1. LoginMessage

```
JsonArray = [1, zoneName:String, username:String, password:String, JsonObject:params]
```

Example

```json
[]
```

- The first parameter (`1`) indicates that this is a **login message**.

#### 2. LogoutMessage

```
JsonArray = [2, zoneName:String]
```

Example

```json
[]
```

## 3. JoinRoomMessage

```
JsonArray = [3, zoneName:String, roomId:Integer, password:String]
```

Example

```json
[]
```

## 4. LeaveRoomMessage

```
JsonArray = [4, zoneName:String, roomId:Int]
```

Example

```json
[]
```

## 5. RoomPluginMessage

```
JsonArray = [5, zoneName:String, roomId:Int, params:JsonObject]
```

Example

```json
[]
```

## 6. ZonePluginMessage

```
JsonArray = [6, zoneName:String, pluginName:String, params:JsonObject]
```

Example

```json
[]
```

## 7. PingMessage

```
JsonArray = [7, zoneName:String, id:Int, timestamp:Long]
```

- `id:Int` — Message ID, defined by the client.
- `timestamp:Long` — Unix timestamp at the moment the message is sent.

Example

```json
[]
```

#### Response Definitions

## 1. LoginResponse

```
JsonArray = [messageId:Int 1, success:bool, errorCode:int, username:String, zoneName:String, message:String]
```

Example

```json
[]
```

## 2. LogoutResponse

```
JsonArray = [messageId:Int 2, success:bool, reason:Int]
```

Example

```json
[]
```

## 3. JoinRoomResponse

```
JsonArray = [messageId:Int 3, success:bool, errorCode:Int, roomId:int, message:String]
```

Example

```json
[]
```

## 4. LeaveRoomResponse

```
JsonArray = [messageId:Int 4, success:bool, errorCode:Int, roomId:Int, reason:Int]
```

Example

```json
[]
```

## 5. ExtensionResponse

```
JsonArray = [messageId:Int 5, data:JsonObject]
```

Example

```json
[]
```

## 6. PingResponse

```
JsonArray = [messageId:Int 6, id:Int, timestamp:Long]
```

Example

```json
[]
```

---

#### Actions

##### Action: connect

##### Action: login

<details>
<summary>more ..</summary>

- Request

```json
[1,"SicboZone","user_test","pw_123",{}]
```

- Response 
```json
[1, true, 7000, "user_test", "SicboZone", "Welcome"]
```

</details>

##### Action: get_room_types

<details>
<summary>more ..</summary>

- Request

```json
[6, "SicboZone", "pokerGame", {
    "action": "get_groups",
    "requestId": "test_123_abc_456_789",
    "payload": {

    }
}]
```

- Response

```json
[5, {
    "action": "get_groups",
    "requestId": "test_123_abc_456_789",
    "payload": {

    },
    "datas": {
        "groups": [
            {
                "groupId": "POKER_1000",
                "samllBlind": 5000,
                "bigBlind": 10000,
                "minBuyIn": 1000000
            },
            {
                "groupId": "POKER_2000",
                "samllBlind": 5000,
                "bigBlind": 10000,
                "minBuyIn": 1000000
            }
        ]
    }
}]
```

</details>

##### Action: search_room

<details>
<summary>more ..</summary>

- Request

```json
> [6, "SicboZone", "pokerGame", {
    "action": "search_room",
    "requestId": "test_123_abc_456_789",
    "payload": {
        "groupId": "POKER_2000"
    }
}]
```

- Response

```json
> [5, {
    "action": "search_rooms",
    "requestId": "test_123_abc_456_789",
    "payload": {
        "groupId": "POKER_2000"
    },
    "datas": {
        "roomInfo": {
            "roomId": 9129,
            "roomName": "room_abc"
        }
    }
}]
```

</details>

##### Action: create_room

<details>
<summary>more ..</summary>

- Request

```json
[6, "SicboZone", "pokerGame", {
    "action": "create_room",
    "requestId": "test_123_abc_456_789",
    "payload": {
        "groupId": "POKER_2000"
    }
}]
```

- Response

```json
[5, {
    "action": "search_rooms",
    "requestId": "test_123_abc_456_789",
    "payload": {
        "groupId": "POKER_2000"
    },
    "datas": {
        "roomInfo": {
            "roomId": 9129,
            "roomName": "room_abc"
        }
    }
}]
```

</details>

##### Action: join_room

<details>
<summary>more ..</summary>

- Request

```json
[3, "SicboZone", 9129, ""]
```

- Response

```json
[3, true, 9000, 9129, "Welcom room"]
```

</details>

<--- start_game>
```json
[
    5,
    {
        "action": "start_game",
        "datas": {
            
        }
    }
]
```

<--- place_blind
```json
[
    5,
    {
        "action": "place_blind",
        "datas": {
            
        }
    }
]
```

<--- deal_card
```json
[
    5,
    {
        "action": "deal_card",
        "datas": {
            
        }
    }
]
```

<--- pre_flop
```json
[
    5,
    {
        "action": "pre_flop",
        "datas": {
            
        }
    }
]
```

<--- flop
```json
[
    5,
    {
        "action": "flop",
        "datas": {
            
        }
    }
]
```

<--- flop
```json
[
    5,
    {
        "action": "flop",
        "datas": {
            
        }
    }
]
```

<--- flop_betting
```json
[
    5,
    {
        "action": "flop_betting",
        "datas": {
            
        }
    }
]
```

<--- turn
```json
[
    5,
    {
        "action": "turn",
        "datas": {
            
        }
    }
]
```

<--- turn_betting
```json
[
    5,
    {
        "action": "turn_betting",
        "datas": {
            
        }
    }
]
```


<--- river
```json
[
    5,
    {
        "action": "river",
        "datas": {
            
        }
    }
]
```

<--- showdown
```json
[
    5,
    {
        "action": "showdown",
        "datas": {
            
        }
    }
]
```

<--- payout
```json
[
    5,
    {
        "action": "payout",
        "datas": {
            
        }
    }
]
```

<--- end_game>
```json
[
    5,
    {
        "action": "end_game",
        "datas": {
            
        }
    }
]
```

### Round betting
<--- start_round_betting
```json
[
    5,
    {
        "action": "start_round_betting",
        "datas": {
            
        }
    }
]
```

<--- player_turn_betting
```json
[
    5,
    {
        "action": "player_turn_betting",
        "datas": {
            "userAction": ["FOLD", "CALL", "CHECK", "RAISE"]
        }
    }
]
```

---> user_betting
```json
[
    5, "SicboZone", 9129,
    {
        "action": "user_betting",
        "payload": {
            "selectedAction": "RAISE",
            "raiseValue": {}
        }
    }
]
```

<--- end_round_betting
```json
[
    5,
    {
        "action": "end_round_betting",
        "datas": {
            
        }
    }
]
```

---> join_room
Request
```json
> [3, zoneName:String, roomId:Integer, password:String]
```
Response
```json
> [messageId:Int 3, success:bool, errorCode:Int, roomId:int, message:String]
```

## Flow game poker

| IDX | FLOW            | Action             | Descipttion                                 |
|-----|-----------------|--------------------|---------------------------------------------|
| 1   | Server → Client | `start_game`       | Bắt đầu ván mới, khởi tạo bàn chơi          |
| 2   | Server → Client | `place_blind`      | Đặt small blind và big blind                |
| 3   | Server → Client | `deal_hole_cards`  | Chia 2 lá bài riêng cho mỗi người chơi      |
| 4   | Server → Client | `pre_flop_betting` | Bắt đầu vòng cược Pre-Flop                  |
| 5   | Server → Client | `deal_flop`        | Lật 3 lá bài chung đầu tiên                 |
| 6   | Server → Client | `flop_betting`     | Vòng cược sau Flop                          |
| 7   | Server → Client | `deal_turn`        | Lật lá bài chung thứ 4                      |
| 8   | Server → Client | `turn_betting`     | Vòng cược sau Turn                          |
| 9   | Server → Client | `deal_river`       | Lật lá bài chung thứ 5                      |
| 10  | Server → Client | `river_betting`    | Vòng cược sau River                         |
| 11  | Server → Client | `showdown`         | So bài, xác định người thắng                |
| 12  | Server → Client | `payout`           | Trao pot cho người thắng                    |
| 13  | Server → Client | `end_game`         | Kết thúc ván, chuẩn bị ván mới              |


## Flow betting

| IDX | Flow            | Action               | Descipttion                                         |
|-----|-----------------|----------------------|-----------------------------------------------------|
| 1   | Server → Client | `start_betting_round`| Bắt đầu vòng cược mới                               |
| 2   | Server → Client | `player_turn`        | Thông báo lượt cược của người chơi                  |
| 3   | Client → Server | `user_bet`           | Người chơi gửi hành động cược (fold, call, raise…)  |
| 4   | Server → Client | `end_betting_round`  | Kết thúc vòng cược, chuyển sang giai đoạn tiếp theo |

## Flow connect and join room

| IDX  | Flow.           | Action                                    | Descipttion                    |
|------|-----------------|-------------------------------------------|--------------------------------|
| 1    | Client → Server | [connect](#action-connect)                | Khởi tạo kết nối socket        |
| 2    | Client → Server | [login](#action-login)                    | Đăng nhập / xác thực           |
| 3    | Client → Server | [get_room_types](#action-get_room_types)  | Lấy danh sách loại phòng       |
| 4    | Server → Client | `room_types`                              | Trả về danh sách loại phòng    |
| 5    | Client → Server | [search_room](#action-search_room)        | Tìm phòng theo tiêu chí        |
| 6    | Client → Server | [create_room](#action-create_room)        | Tạo phòng mới                  |
| 7    | Server → Client | `room_info`                               | Trả về thông tin phòng         |
| 8    | Client → Server | [join_room](#action-join_room)            | Vào phòng đã chọn              |

