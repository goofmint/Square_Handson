// 定数の定義
var url = ''; // コールバックされるURL
var client_id = ''; // SquareのアプリケーションID
// ブラウザ判定
var ios =/iPad|iPhone|iPod/.test(navigator.userAgent);
// 決済方法の指定（AndroidとiOSで異なります）
var wrap_supported_tender_types = {};
if (ios) {
  wrap_supported_tender_types = {
    credit_card: "CREDIT_CARD",
    cash: "CASH",
    other: "OTHER"
  }
}else{
  wrap_supported_tender_types = {
    credit_card: "com.squareup.pos.TENDER_CARD",
    cash: "com.squareup.pos.TENDER_CASH",
    other: "com.squareup.pos.TENDER_OTHER"
  }
}

// Onsen UIが使える状態になったところから処理開始
ons.ready(function() {
  // ボタンを押した時のイベント処理
  $('#square').on('click', function(e) {
    // 変数の取得
    
    // パラメータの生成
    
    // URLの生成
    
    // POSレジアプリ呼び出し
  });
});
