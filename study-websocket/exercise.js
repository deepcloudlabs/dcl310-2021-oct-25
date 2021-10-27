// HTTP: connection -> request -> response -> close connection
// pull application
// REST API over HTTP: GET URL
// REST API over WEBSOCKET
//                Connection -> request-response/push notification/publish-subscribe
//                Stream Data -> Text/Binary
// Aggregate/Entity/Value Object vs Domain Event: trade
// SSE (=Server Sent Event) HTTP/2
// 1. PUSH Notification
// 2. Text-based: JSON/XML/SVG/CSV/...
// 3. cannot stream
// HTTP/3 -> QUIC
// WebTransport -> QUIC
// 5G
// WebRTC vs WebSocket (All clients connect to the server)
// Client-to-client communication
//let fetch = require("node-fetch");
const url = "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT";
let fetch = require("node-fetch");

setInterval( () => {
    fetch(url).then(res => res.json())
             .then(ticker => console.log(ticker))
} , 50)

let Websocket = require("ws");
const wsUrl = "wss://stream.binance.com:9443/ws/btcusdt@trade";

let ws = new Websocket(wsUrl);

ws.on('message', frame => {
    let trade = JSON.parse(frame);
    console.log(trade);
})