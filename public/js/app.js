// 定数の定義
var url = 'https://cryptic-oasis-18035.herokuapp.com/'; // コールバックするURL
var client_id = 'sq0idp-6RKMWthYz8P4CnavGgHGZw'; // SquareのアプリケーションID

// Onsen UIが使える状態になったところから処理開始
ons.ready(function() {
  // ボタンを押した時のイベント処理
  $('#square').on('click', function(e) {
    // 変数の取得
    var price = $('#price').val();
    var notes = $('#notes').val();
    var supported_tender_types = $("input[name='supported_tender_types[]']:checked").map(function() {
      return $(this).val();
    }).toArray();

    // パラメータの生成
    var dataParameter = {
      // 金額に関する情報
      "amount_money": {
        "amount": price,
        "currency_code" : "JPY"
      },
      // POSレジアプリがコールバックするURL
      "callback_url" : url,
      // アプリケーションID（自分のものに置き換えてください）
      "client_id" : client_id,
      // バージョン（現在は1.3固定です）
      "version": "1.3",
      // 取引に関する説明書き
      "notes": notes,
      "options": {
        "supported_tender_types": supported_tender_types
      }
    };

    // URLの生成
    var uri = "square-commerce-v1://payment/create?data=" + encodeURIComponent(JSON.stringify(dataParameter));

    // POSレジアプリ呼び出し
    location.href = uri;
  });
});
