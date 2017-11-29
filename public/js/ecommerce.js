var applicationId = ''; // アプリケーションID

// Square EコマースAPI用のフォームライブラリ
var paymentForm = new SqPaymentForm({
  applicationId: applicationId, // アプリケーションID
  inputClass: 'sq-input', // 入力用クラス（オプション）
  
  // ここから入力項目毎の設定です
  cardNumber: { // カード番号
    elementId: 'sq-card-number',
    placeholder: '•••• •••• •••• ••••'
  },
  cvv: { // セキュリティコード
    elementId: 'sq-cvv',
    placeholder: 'CVV'
  },
  expirationDate: {  // 有効期限
    elementId: 'sq-expiration-date',
    placeholder: 'MM/YY'
  },
  postalCode: {  // 郵便番号
    elementId: 'sq-postal-code',
    placeholder: '100-0001'
  },
  callbacks: {  // 各種コールバック
    // nonceを取得した時のコールバック
    cardNonceResponseReceived: function(errors, nonce, cardData) {
    },
    
    // フォームを読み込んだ時のコールバック
    paymentFormLoaded: function() {
    },
    
    // 非対応ブラウザからのアクセスがあった時のコールバック
    unsupportedBrowserDetected: function() {
    }
  }
});
