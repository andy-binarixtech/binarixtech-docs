# SICBO GAME

# RFC v1.0.0

Internal BinarixTech

Protocol Specification

Tài liệu đặc tả giao thức giao tiếp giữa client và server cho mini game sicbo.

Mục đích: định nghĩa cấu trúc message, vòng đời trò chơi, hành động và sự kiện.

Thuật ngữ:
- `Round` (Ván chơi): Một phiên tung xúc xắc.
- `Side` (Cửa cược): TAI hoặc XIU.
- `Dice` (Xúc xắc): 3 số nguyên từ 1–6.
- `Payout` (Trả thưởng): Tỉ lệ 1:1.

### Giao thức truyền tải

- Transport: WebSocket qua TCP.
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
    "side": "TAI", 
    "amount": 1000
  }
}
```

### Vòng đời (ROUND)
BETTING_OPEN: Cho phép đặt cược.
BETTING_CLOSE: Ngừng nhận cược, chuẩn bị tung xúc xắc.
FINISH: Hoàn tất trả thưởng, kết thúc ván.

### Action (Client > Server)
subscribe_rounds: Đăng ký nhận thông tin vòng chơi.
```json
{
    "action": "subscribe_rounds"
}
```

place_bet: Đặt cược.
```json
{
    "action": "place_bet",
    "payload": { "roundId": "R1", "side": "XIU", "amount": 5000 }
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

### Events (Server > Client)

round_state: Thông báo trạng thái ván.
```json
{
    "action": "round_state",
    "payload": {
        "roundId": "R1", 
        "status": "BETTING_OPEN", 
        "openAt": 1731880500, 
        "closeAt": 1731880515
    }
}
```

- openAt : BETTING_OPEN time
- closeAt : BETTING_CLOSE time

bet_accepted: Xác nhận cược.
```json
{
    "action": "bet_accepted",
    "payload": {
        "betId": "B1",
        "roundId": "R1", 
        "side": "TAI", 
        "amount": 1000
    }
}
```

reveal_result: Công bố kết quả tung xúc xắc.
```json
{
  "action": "round_result",
  "payload": {
    "roundId": "R1", 
    "dice": [3,5,6], 
    "sum": 14, 
    "result": "TAI"
    ]}
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

### Mã lỗi phổ biến:

    BET_WINDOW_CLOSED: Ván đã đóng.
    ROUND_NOT_FOUND: Sai roundId.
    INVALID_SIDE: Sai cửa cược.
    INVALID_AMOUNT: Số tiền không hợp lệ.

### Quy tắc

- Xác định kết quả: 
    - Tổng 11–17 > TAI
    - tổng 4–10 > XIU.
- Trả thưởng: 
    - WIN = tiền cược × 2
    - LOSE = 0.

### Flow

1. subscribe_rounds
2. `new_round`
3. `round_state (BETTING_OPEN, R1)`
4. place_bet(R1, TAI, 1000)
5. `bet_accepted(B1, R1, TAI, 1000)`
6. `round_state(BETTING_CLOSE, R1)`
7. `reveal_result(R1, dice=[3,5,6], sum=14, result=TAI)`
8. `payout(R1, B1, WIN, payout=2000)`
9. `round_state(FINISH, R1)`
10. `game_over`

### Sequence diagram

https://drive.google.com/file/d/1JsXq79ASlwgpmdNxA9Rm8BdfH-n36azN/view?usp=sharing

### Environment

- DEV
    - `IP` : 192.168.1.14
    - `Port` : 8889
- TEST
- UAT
- PROD
