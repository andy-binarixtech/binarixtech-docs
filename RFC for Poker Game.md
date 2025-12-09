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
<summary>more ...</summary>

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
<summary>more ...</summary>

- Request

```json
[6, "SicboZone", "pokerGame", {
    "action": "get_room_types",
    "requestId": "test_123_abc_456_789",
    "payload": {

    }
}]
```

- Response

```json
[
  5,
  {
    "payload": {},
    "requestId": "test_123_abc",
    "datas": {
      "roomTypes": [
        {
          "minBuyIn": 1000000,
          "groupId": "POKER_1000",
          "smallBlind": 500,
          "bigBlind": 1000
        },
        {
          "minBuyIn": 1000000,
          "groupId": "POKER_2000",
          "smallBlind": 1000,
          "bigBlind": 2000
        }
      ]
    },
    "action": "get_room_types",
    "event": "room_types"
  }
]
```

</details>

##### Action: search_room

<details>
<summary>more ...</summary>

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
<summary>more ...</summary>

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
<summary>more ...</summary>

- Request

```json
[3, "SicboZone", 9129, ""]
```

- Response

```json
[3, true, 9000, 9129, "Welcom room"]
```

</details>

##### Action: user_enter_room

<details>
<summary>more ...</summary>

```json
[
  5,
  {
    "datas": {
      "playerInfo": {
        "chip": 1000000,
        "balance": 1000000,
        "avatarUrl": "no avatar",
        "seatIndex": 2,
        "name": "user_0lowr39d"
      },
      "roomId": 18678,
      "roomInfo": {
        "roomId": 18678,
        "roomName": "Poker_1"
      }
    },
    "action": "user_enter_room",
    "event": "user_enter_room"
  }
]
```

</details>

##### Action: room_data

<details>
<summary>more ...</summary>

```json
[
  5,
  {
    "datas": {
      "playerInfos": [
        {
          "chip": 1000000,
          "balance": 1000000,
          "avatarUrl": "no avatar",
          "seatIndex": 1,
          "name": "user_0vsbf0im"
        }
      ],
      "roomInfo": {
        "roomId": 18678,
        "roomName": "Poker_1"
      }
    },
    "action": "room_data",
    "event": "room_data"
  }
]
```

</details>

#### start_game

<details>
<summary>more ...</summary>

```json
[
  5,
  {
    "datas": {},
    "action": "start_game",
    "event": "start_game"
  }
]
```

</details>

#### place_blind

<details>
<summary>more ...</summary>

```json
[
  5,
  {
    "datas": {
      "playerInfo": {
        "chip": 1000000,
        "role": "DEALER",
        "balance": 1000000,
        "avatarUrl": "https://res.cloudinary.com/dvqf9cl2u/image/upload/anh-gai-xinh-sexy-2_nnf69k.jpg",
        "seatIndex": 0,
        "name": "user_56rwp9c1",
        "betInfo": {
          "betValue": 0,
          "playerName": "user_56rwp9c1",
          "success": true,
          "newBalance": 0,
          "action": "RAISE",
          "roomId": 2575,
          "newTablePos": 0
        }
      },
      "betInfo": {
        "betValue": 0,
        "playerName": "user_56rwp9c1",
        "success": true,
        "newBalance": 0,
        "action": "RAISE",
        "roomId": 2575,
        "newTablePos": 0
      }
    },
    "action": "place_bind",
    "event": "place_bind"
  }
]
```

- role: DEALER, SMALL_BLIND< BIG_BLIND, PLAYER, NULL (VIEWER)

</details>

#### deal_hole_cards

<details>
<summary>more ...</summary>

```json
[
  5,
  {
    "datas": {
      "playerInfo": {
        "chip": 1000000,
        "role": "BIG_BLIND",
        "balance": 1000000,
        "avatarUrl": "https://res.cloudinary.com/dvqf9cl2u/image/upload/anh-gai-xinh-sexy-2_nnf69k.jpg",
        "seatIndex": 2,
        "name": "user_r9bi7xhm",
        "betInfo": {
          "betValue": 1000,
          "playerName": "user_r9bi7xhm",
          "success": true,
          "newBalance": 2000,
          "action": "RAISE",
          "roomId": 2575,
          "newTablePos": 0
        },
        "hand": [
          {
            "cardSpriteName": "8D",
            "rank": "8",
            "suit": "spade",
            "id": 7
          },
          {
            "cardSpriteName": "5C",
            "rank": "5",
            "suit": "club",
            "id": 43
          }
        ]
      },
      "handCards": [
        {
          "cardSpriteName": "8D",
          "rank": "8",
          "suit": "spade",
          "id": 7
        },
        {
          "cardSpriteName": "5C",
          "rank": "5",
          "suit": "club",
          "id": 43
        }
      ],
      "dealCard": {
        "playerTurnId": [
          "user_vzfyhv9h",
          "user_r9bi7xhm",
          "user_56rwp9c1"
        ],
        "cardId": [
          7,
          43
        ],
        "roomId": 2575
      }
    },
    "action": "deal_hole_cards",
    "event": "deal_hole_cards"
  }
]
```

</details>

#### pre_flop_betting

<details>
<summary>more ...</summary>

```json
[
  5,
  {
    "datas": {},
    "action": "pre_flop_betting",
    "event": "pre_flop_betting"
  }
]
```

</details>

#### deal_flop

<details>
<summary>more ...</summary>

```json
[
  5,
  {
    "datas": {
      "dealTableCard": {
        "tableCards": [
          {
            "cardSpriteName": "5B",
            "rank": "5",
            "suit": "diamond",
            "id": 30
          },
          {
            "cardSpriteName": "6A",
            "rank": "6",
            "suit": "heart",
            "id": 18
          },
          {
            "cardSpriteName": "7C",
            "rank": "7",
            "suit": "club",
            "id": 45
          }
        ],
        "cardId": [
          30,
          18,
          45
        ],
        "roomId": 2575
      }
    },
    "action": "deal_flop",
    "event": "deal_flop"
  }
]
```

</details>

#### flop_betting

<details>
<summary>more ...</summary>

```json
[
  5,
  {
    "datas": {},
    "action": "flop_betting",
    "event": "flop_betting"
  }
]
```

</details>

#### deal_turn

<details>
<summary>more ...</summary>

```json
[
  5,
  {
    "datas": {
      "dealTableCard": {
        "tableCards": [
          {
            "cardSpriteName": "KD",
            "rank": "13",
            "suit": "spade",
            "id": 12
          }
        ],
        "cardId": [
          12
        ],
        "roomId": 2575
      }
    },
    "action": "deal_turn",
    "event": "deal_turn"
  }
]
```

</details>

#### turn_betting

<details>
<summary>more ...</summary>

```json
[
  5,
  {
    "datas": {},
    "action": "turn_betting",
    "event": "turn_betting"
  }
]
```

</details>

#### deal_river

#### deal_river

<details>
<summary>more ...</summary>

```json
[
  5,
  {
    "datas": {
      "dealTableCard": {
        "tableCards": [
          {
            "cardSpriteName": "6D",
            "rank": "6",
            "suit": "spade",
            "id": 5
          }
        ],
        "cardId": [
          5
        ],
        "roomId": 2575
      }
    },
    "action": "deal_river",
    "event": "deal_river"
  }
]
```

</details>

#### river_betting

<details>
<summary>more ...</summary>

```json
[
  5,
  {
    "datas": {},
    "action": "river_betting",
    "event": "river_betting"
  }
]
```

</details>

#### showdown

<details>
<summary>more ...</summary>

```json
[
  5,
  {
    "datas": {},
    "action": "showdown",
    "event": "showdown"
  }
]
```

</details>

#### payout

<details>
<summary>more ...</summary>

```json
[
  5,
  {
    "datas": {},
    "action": "payout",
    "event": "payout"
  }
]
```

</details>

#### end_game>

<details>
<summary>more ...</summary>

```json
[
  5,
  {
    "datas": {},
    "action": "end_game",
    "event": "end_game"
  }
]
```

</details>

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

## Flow game poker

| IDX | FLOW            | Action             | Descipttion                                 |
|-----|-----------------|--------------------|---------------------------------------------|
| 1   | Server → Client | [start_game](#start_game)       | Bắt đầu ván mới, khởi tạo bàn chơi          |
| 2   | Server → Client | [place_blind](#place_blind)      | Đặt small blind và big blind                |
| 3   | Server → Client | [deal_hole_cards](#deal_hole_cards)  | Chia 2 lá bài riêng cho mỗi người chơi      |
| 4   | Server → Client | [pre_flop_betting](#pre_flop_betting) | Bắt đầu vòng cược Pre-Flop                  |
| 5   | Server → Client | [deal_flop](#deal_flop)        | Lật 3 lá bài chung đầu tiên                 |
| 6   | Server → Client | [flop_betting](#flop_betting)     | Vòng cược sau Flop                          |
| 7   | Server → Client | [deal_turn](#deal_turn)        | Lật lá bài chung thứ 4                      |
| 8   | Server → Client | [turn_betting](#turn_betting)     | Vòng cược sau Turn                          |
| 9   | Server → Client | [deal_river](#deal_river)       | Lật lá bài chung thứ 5                      |
| 10  | Server → Client | [river_betting](#river_betting)    | Vòng cược sau River                         |
| 11  | Server → Client | [showdown](#showdown)         | So bài, xác định người thắng                |
| 12  | Server → Client | [payout](#payout)           | Trao pot cho người thắng                    |
| 13  | Server → Client | [end_game](#end_game)         | Kết thúc ván, chuẩn bị ván mới              |


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
| 9    | Server → Client | [user_enter_room](#action-user_enter_room)            | user vào phòng              |
| 10   | Server → Client | [room_data](#action-room_data)            | dach sách user trong phòng             |
