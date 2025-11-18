# RFC for game sicbo (Internal BinarixTech)

Protocol Specification

Tài liệu đặc tả giao thức giao tiếp giữa client và server cho mini game sicbo.
Mục đích: định nghĩa cấu trúc message, vòng đời trò chơi, hành động và sự kiện.
Thuật ngữ:
`Round` (Ván chơi): Một phiên tung xúc xắc, có vòng đời OPEN > CLOSED > RESULT > SETTLED
`Side` (Cửa cược): TAI hoặc XIU.
`Dice` (Xúc xắc): 3 số nguyên từ 1–6.
`Payout` (Trả thưởng): Tỉ lệ 1:1 (thắng nhận lại tiền gốc + tiền thắng bằng số tiền cược).

### Giao thức truyền tải
Transport: WebSocket qua TCP.
Encoding: JSON UTF-8.
Cấu trúc thông điệp:
- `action` : tên hành động/sự kiện.
- `requestId` : tùy chọn, để client đối chiếu phản hồi.
- `payload` : dữ liệu chi tiết.

Example
```json
{
  "action": "place_bet",
  "requestId": "req-123",
  "payload": { "roundId": "R1", "side": "TAI", "amount": 1000 }
}
```

### Vòng đời (ROUND)
OPEN: Cho phép đặt cược.
CLOSED: Ngừng nhận cược, chuẩn bị tung xúc xắc.
RESULT: Công bố kết quả tung xúc xắc.
SETTLED: Hoàn tất trả thưởng, kết thúc ván.

### Action (Client>  Server)
subscribe_rounds: Đăng ký nhận thông tin vòng chơi.
```json
{
    "action": "subscribe_rounds"
}
```

place_bet: Đặt cược
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

### Events (Server>  Client)
round_state: Thông báo trạng thái ván.
```json
{
    "action": "round_state",
    "payload": {
        "roundId": "R1", 
        "status": "OPEN", 
        "openAt": 1731880500, 
        "closeAt": 1731880515
    }
}
```
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
round_result: Công bố kết quả tung xúc xắc.
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

settlement: Trả thưởng cho cược.
```json
{
  "action": "settlement",
  "payload": { "roundId": "R1", "betId": "B1", "outcome": "WIN", "payout": 2000 }
}
```

pong: Phản hồi ping.
```json
    {"action": "pong", "requestId": "heartbeat-1" }
```

### Thông báo lỗi
error: Server trả về khi hành động thất bại.
```json
{
  "action": "error",
  "payload": { "code": "BET_WINDOW_CLOSED", "message": "Round is closed", "requestId": "req-42" }
}
```

### Mã lỗi phổ biến:
    BET_WINDOW_CLOSED: Ván đã đóng.
    ROUND_NOT_FOUND: Sai roundId.
    INVALID_SIDE: Sai cửa cược.
    INVALID_AMOUNT: Số tiền không hợp lệ.

### Quy tắc
Xác định kết quả: Tổng 11–17 > TAI, tổng 4–10 > XIU.
Trả thưởng: Thắng = tiền cược × 2; thua = 0.
Thứ tự sự kiện:
    round_state(OPEN) > bet_accepted > round_state(CLOSED) > round_result > settlement.

### Luồng
1. Server > Client: round_state(OPEN, R1)
2. Client > Server: place_bet(R1, TAI, 1000)
3. Server > Client: bet_accepted(B1, R1, TAI, 1000)
4. Server > Client: round_state(CLOSED, R1)
5. Server > Client: round_result(R1, dice=[3,5,6], sum=14, result=TAI)
6. Server > Client: settlement(R1, B1, WIN, payout=2000)
7. Server > Client: round_state(SETTLED, R1)

### Sequence diagramß
https://app.diagrams.net/?splash=0#G1JsXq79ASlwgpmdNxA9Rm8BdfH-n36azN#%7B%22pageId%22%3A%22G1JlG__NbhJptndctZcm%22%7D
