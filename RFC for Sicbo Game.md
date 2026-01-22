# SICBO GAME

# RFC v1.0.1

Internal BinarixTech

Protocol Specification

Tài liệu đặc tả giao thức giao tiếp giữa client và server cho mini game sicbo.

Mục đích: định nghĩa cấu trúc message, vòng đời trò chơi, hành động và sự kiện.

Thuật ngữ:
- `Round` (Ván chơi): Một phiên tung xúc xắc.
- `Side` (Cửa cược): BIG hoặc SMALL.
- `Dice` (Xúc xắc): 3 số nguyên từ 1–6.
- `Payout` (Trả thưởng): Tỉ lệ 1:1.

### Giao thức truyền tải

- Transport: WebSocket
- Encoding: JSON UTF-8.
- Cấu trúc message:
    - `action` : tên hành động/sự kiện.
    - `requestId` : tùy chọn, để client đối chiếu phản hồi.
    - `payload` : dữ liệu chi tiết.

Example
```json
{
  "action": "place_bet",
  "requestId": "req-123",
  "payload": {
    "roundId": "R1", 
    "side": "BIG", 
    "amount": 1000
  }
}
```

### Round state

BETTING_OPEN: open betting.
BETTING_CLOSE: close betting.
FINISH: end round.

### Action (Client > Server)

subscribe_rounds: Đăng ký nhận thông tin vòng chơi.
Request
```json
{
  "action": "subscribe_rounds"
}
```

place_bet: Đặt cược.
```json
{
    "action": "place_bet",
    "payload": { "roundId": "R1", "side": "SMALL", "amount": 5000 }
}
```

ping: Kiểm tra kết nối.
```json
{
    "action": "ping", 
    "requestId": "123456"
}
```

get_user_info: lấy thông tin user (thông tin này là thông tin tạm chưa chuẩn).
```json
{
    "action": "get_user_info", 
    "requestId": "123456"
}
```

get_table_info: lấy thông tin bàn
request
```json
{
  "action": "get_table_info",
  "payload": {
  }
}
```
response
```json
[
    5,
    {
        "payload": {},
        "datas": {
            "tableInfo": {
                "totalBetBig": 0,
                "dice": [],
                "totalBetSmall": 0,
                "sum": 0,
                "closeAt": 1764640096502,
                "betPlayer": 0,
                "result": "",
                "betPlayerBig": 0,
                "totalBet": 0,
                "roundId": "ROUND_5",
                "openAt": 1764640066502,
                "status": "BETTING_OPEN",
                "elapsedTime": 25,
                "betPlayerSmall": 0
            },
            "histories": [
                {
                    "totalBetBig": 0,
                    "dice": [
                        2,
                        2,
                        1
                    ],
                    "totalBetSmall": 0,
                    "sum": 5,
                    "closeAt": 1764639932292,
                    "betPlayer": 0,
                    "result": "SMALL",
                    "betPlayerBig": 0,
                    "totalBet": 0,
                    "roundId": "ROUND_1",
                    "openAt": 1764639902292,
                    "status": "FINISH",
                    "elapsedTime": 0,
                    "betPlayerSmall": 0
                }
            ]
        },
        "action": "get_table_info"
    }
]
```

- openAt : BETTING_OPEN time
- closeAt : BETTING_CLOSE time

bet_accepted: Xác nhận cược.
request
```json
{
    "action": "bet_accepted",
    "payload": {
        "betId": "B1",
        "roundId": "R1", 
        "side": "BIG", 
        "amount": 1000
    }
}
```
response
```json

```

reveal_result: Công bố kết quả tung xúc xắc.
```json
{
  "action": "round_result",
  "payload": {
    "roundId": "R1", 
    "dice": [3,5,6], 
    "sum": 14, 
    "result": "BIG"
  }
}
```

payout: Trả thưởng cho cược.
```json
{
  "action": "payout",
  "payload": { "roundId": "R1", "betId": "B1", "outcome": "WIN", "payout": 2000 }
}
```

pong: Phản hồi ping.
```json
{
  "action": "pong",
  "requestId": "heartbeat-1"
}
```

### Thông báo lỗi
error: Server trả về khi hành động thất bại.
```json
{
  "action": "error",
  "payload": {
    "code": "BET_WINDOW_CLOSED",
    "message": "Round is closed",
    "requestId": "req-42" 
  }
}
```

### Error code:

    BET_WINDOW_CLOSED: Ván đã đóng.
    ROUND_NOT_FOUND: Sai roundId.
    INVALID_SIDE: Sai cửa cược.
    INVALID_AMOUNT: Số tiền không hợp lệ.

### Rule

- 3 dices (1-6)
- Sum: 11 - 17 > BIG
- Sum: 4 - 10 > SMALL
- Payout: abs(total_bet_tai - total_bet_xiu) * 2

### Flow

1. subscribe_rounds
2. `new_round`
3. `round_state (BETTING_OPEN, R1)`
4. place_bet(R1, BIG, 1000)
5. `bet_accepted(B1, R1, BIG, 1000)`
6. `round_state(BETTING_CLOSE, R1)`
7. `reveal_result(R1, dice=[3,5,6], sum=14, result=BIG)`
8. `payout(R1, B1, WIN, payout=2000)`
9. `round_state(FINISH, R1)`
10. `game_over`

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

### Flow (MGS x Mario3)

- zoneName: `SicboZone`
- pluginName: 'sicboPlugin'

connect websocket

login
```
> [1,"SicboZone","user_test","pw_123",{}]
```

new_round
```
> [5,{"action":"new_round"}]
```

round_state: BETTING_OPEN
```
[5,{"payload":{"roundId":"R19","closeAt":1764208281333,"openAt":1764208266333,"status":"BETTING_OPEN"},"action":"round_state"}]
```

place_bet
```
[6,"SicboZone","sicboPlugin",{"action":"place_bet","payload":{"roundId":"R1","side":"BIG","amount":1000}}]
```

bet_accepted
```
[5,{"payload":{"side":"BIG","amount":1000,"totalBetSmall":0,"betPlayerBIG":1,"totalBetBig":1000,"roundId":"R1","betPlayerSmall":0},"action":"bet_accepted"}]
```

round_state: BETTING_CLOSE
```
[5,{"payload":{"roundId":"R44","closeAt":1764208932179,"openAt":1764208917179,"status":"BETTING_CLOSE"},"action":"round_state"}]
```

reveal_result
```
[5,{"payload":{"result":"SMALL","dice":[2,5,2],"sum":9,"roundId":"R46"},"action":"reveal_result"}]
```

payout
```
[5,{"payload":{"betId":"","payout":2000,"roundId":"R50","outcome":"LOSS"},"action":"payout"}]
```

round_state: FINISH
```
[5,{"payload":{"roundId":"R50","closeAt":1764209088367,"openAt":1764209073367,"status":"FINISH"},"action":"round_state"}]
```

get_user_info
Request
```
[6,"SicboZone","sicboPlugin",{"action":"get_user_info"}]
```
Response
```
[5,{"payload":{"balance":1000000,"tableId":7385},"action":"get_user_info","chipSet":[10000,20000,30000,40000,50000,60000]}]
```

get_table_info
Request
```
[6,"SicboZone","sicboPlugin",{"action":"get_table_info"}]
```
Response
```
> [5,{"payload":{},"datas":{"tableInfo":{"totalBetSmall":0,"betPlayerBig":0,"dice":[],"totalBet":0,"sum":0,"totalBetBig":0,"roundId":"R1","closeAt":1764211675949,"betPlayer":0,"betPlayerSmall":0,"openAt":1764211660949,"status":"BETTING_CLOSE"},"tableInfos":[]},"action":"get_table_info"}]
```

### Sequence diagram

https://drive.google.com/file/d/1JsXq79ASlwgpmdNxA9Rm8BdfH-n36azN/view?usp=sharing

### Environment

- DEV
    - `IP` : 192.168.1.13
    - `Port` : 8889
- DEV MARIO
    - `IP` : 192.168.1.13
    - `Port` : 8892
- TEST
- UAT
- PROD


