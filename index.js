const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

// ライブラリ読み込み
const unirest = require('unirest');
const uuidv1 = require('uuid/v1');

// 定数設定
const accessToken = 'MY_ACCESS_TOKEN';
const location_id = 'MY_LOCATION_ID';
const url = 'http://localhost:3000';

// POSTのBody処理に必要
const bodyParser = require('body-parser');
app.use(bodyParser());

// 静的ファイルはpublic以下に
app.use(express.static('public'));

// レンダリングはejs
app.set('view engine', 'ejs');

// 注文処理
app.post('/orders', function (req, res) {
  // 注文処理を実行します
  
  // データを取得します
  const params = req.body;
  
  // URL
  const url = `https://connect.squareup.com/v2/locations/${location_id}/transactions`;
  
  // REST APIをコールします
  unirest
    // POSTメソッドを指定します
    .post(url)
    // ヘッダー情報です。アクセストークンを指定します
    .headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    })
    // sendの中でパラメータを指定します
    .send({
    })
    .end(function (response) {
      // 処理がうまくいけばこちらに結果がきます
      // 再読込で処理が重複実行されないよう、リダイレクトします
      res.redirect(`/success?data=${JSON.stringify(response.body.transaction)}`);
    });
});

// EコマースAPIの処理が成功した場合です
app.get('/success', function(req, res) {
  res.render('success', {
    data: JSON.parse(req.query.data)
  })
});

// Square CheckoutのURLを生成してリダイレクトします。
app.post('/checkout', function(req, res) {
  // パラメータの設定
  const params = {
    // 決済後に戻ってくるURL
    "redirect_url": `${serverUrl}/callback`,
    // ユニークなID
    "idempotency_key": uuidv1(),
    // 住所を必要とするかどうか
    "ask_for_shipping_address": true,
    // 販売店のサポートメールアドレス
    "merchant_support_email": "support@example.com",
    // 注文情報について
    "order": {
      // サーバ側で指定するリファレンスIDです。
      "reference_id": 'CHECKOUT_REFERENCE_ID',
      "line_items": []
    },
    // 購入者のメールアドレス（オプション）
    "pre_populate_buyer_email": req.body.email,
    // 購入者の配送先情報（オプション）
    "pre_populate_shipping_address": {
      "address_line_1": "",
      "address_line_2": "",
      "locality": "",
      "administrative_district_level_1": "",
      "postal_code": req.body.zipCode,
      "country": "JP",
      "first_name": req.body.firstName,
      "last_name": req.body.lastName
    }
  };
  
  // 擬似的に5つの商品を生成します
  for (let i = 0; i < 5; i++) {
    let productNo = i + 1;
    params.order.line_items.push({
      // 商品名
      "name": `商品 ${productNo}`,
      // 数量（文字列指定）
      "quantity": String(productNo),
      // 商品価格
      "base_price_money": {
        "amount": productNo * 1000,
        "currency": 'JPY'
      },
      // 値引き情報
      discounts: [{
        // 値引きの名称
        "name": `値引き ${productNo}`,
        // 値引き価格
        "amount_money": {
          "amount": productNo * 10,
          "currency": 'JPY'
        }
      }],
      // 税金に関する情報
      "taxes": [{
        // 税金の名前
        "name": `税金 ${productNo}`,
        // 税金のパーセンテージ
        "percentage": String(productNo * 10),
        // 種類
        "type": "ADDITIVE"
      }]
    });
  }
  
  // Web APIのURL
  
  // REST APIをコールします
    // POSTメソッドを指定します
    // ヘッダー情報です。アクセストークンを指定します
    // sendの中でパラメータを指定します
      // 処理がうまくいけばこちらに結果がきます
      // Square CheckoutのURLに飛びます
});

// Square Checkout後にコールバックされるURLです
app.get('/callback', function(req, res) {
  res.render('callback', req.query);
});

app.listen(port, function () {
  console.log(`http://127.0.0.1:${port}/ を開いてください。`);
});
