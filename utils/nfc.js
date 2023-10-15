var NfcAdapter;
var NdefRecord;
var NdefMessage;
var waiting;
var readyRead = false;
var nfcAdapter, main, pendingIntent, intentFiltersArray, techListsArray, IntentFilter;

const useNfc = () => {
  let count = 0;
  let timestampShow = 0;
  let timestampHide = 0;
  let currentNFCInfo = ref('');

  const listenNFCStatus = () => {
    try {
      console.log('Init NFC...');
      main = plus.android.runtimeMainActivity();
      var Intent = plus.android.importClass('android.content.Intent');
      var Activity = plus.android.importClass('android.app.Activity');
      var PendingIntent = plus.android.importClass('android.app.PendingIntent');
      IntentFilter = plus.android.importClass('android.content.IntentFilter');
      NfcAdapter = plus.android.importClass('android.nfc.NfcAdapter');
      nfcAdapter = NfcAdapter.getDefaultAdapter(main);
      var intent = new Intent(main, main.getClass());
      intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
      pendingIntent = PendingIntent.getActivity(main, 0, intent, 0);
      var ndef = new IntentFilter('android.nfc.action.TECH_DISCOVERED');
      ndef.addDataType('*/*');
      intentFiltersArray = [ndef];
      techListsArray = [
        ['android.nfc.tech.IsoDep'],
        ['android.nfc.tech.NfcA'],
        ['android.nfc.tech.NfcB'],
        ['android.nfc.tech.NfcF'],
        ['android.nfc.tech.Ndef'],
        ['android.nfc.tech.NfcV'],
        ['android.nfc.tech.NdefFormatable'],
        ['android.nfc.tech.MifareClassic'],
        ['android.nfc.tech.MifareUltralight'],
      ];
    } catch (e) {
      console.error(e);
    }
  };
  const handle_nfc_data = () => {
    NdefRecord = plus.android.importClass('android.nfc.NdefRecord');
    NdefMessage = plus.android.importClass('android.nfc.NdefMessage');
    // main = plus.android.runtimeMainActivity();
    var intent = main.getIntent();

    console.log('action type:' + intent.getAction());
    if ('android.nfc.action.TECH_DISCOVERED' == intent.getAction()) {
      if (readyRead) {
        __read(intent);
        readyRead = false;
      }
    } else {
      // waiting.close();
      console.log('nfc读取失败');
    }
  };
  const __read = (intent) => {
    try {
      var content = '';
      waiting = plus.nativeUI.showWaiting('请将NFC标签靠近！');
      waiting.setTitle('请勿移开标签\n正在读取数据...');
      var tag = plus.android.importClass('android.nfc.Tag');
      waiting.close();
      var Parcelable = plus.android.importClass('android.os.Parcelable');
      // var rawmsgs = intent.getParcelableArrayExtra("android.nfc.extra.NDEF_MESSAGES");
      var rawmsgs = intent.getParcelableArrayExtra(NfcAdapter.EXTRA_NDEF_MESSAGES);

      if (rawmsgs != null && rawmsgs.length > 0) {
        waiting.close();
        // console.log(JSON.stringify(rawmsgs[0]));
        var records = rawmsgs[0].getRecords();
        var result = records[0].getPayload();
        // console.log(result)
        if (result != null) {
          var s = plus.android.newObject('java.lang.String', result);
          console.log(s);
          currentNFCInfo.value = s.split('en')[1];
          console.log(currentNFCInfo.value);
        } else {
          currentNFCInfo.value = '';
        }
      } else {
        console.log('NFC获取失败');
        uni.showToast({
          title: 'NFC获取失败.',
          icon: 'none',
        });
      }
    } catch (e) {
      console.log(e);
      console.log('NFC获取失败,丢出异常');
      waiting.close();
      uni.showToast({
        title: 'NFC获取失败,丢出异常.',
        icon: 'none',
      });
      //TODO handle the exception
    }
  };
  const readData = () => {
    readyRead = true;
    //  waiting = plus.nativeUI.showWaiting("请将NFC标签靠近！");
    setTimeout(handle_nfc_data, 1000);
  };

  onLoad((options) => {
    listenNFCStatus();
  });

  onShow(() => {
    console.log('page Show');
    timestampShow = new Date().getTime();
    console.log(timestampShow);
    var TimeScale = timestampShow - timestampHide;
    console.log(TimeScale);
    nfcAdapter.enableForegroundDispatch(main, pendingIntent, intentFiltersArray, techListsArray);
    if (count++ == 0) {
      // this.listenNFCStatus()
      return false;
    } else if (TimeScale > 400) {
      return false;
    } else {
      readData();
    }
  });

  onHide(() => {
    console.log('page Hide');
    timestampHide = new Date().getTime();
    console.log(timestampHide);
    nfcAdapter.disableForegroundDispatch(main);
  });

  return {
    currentNFCInfo,
  };
};

export default useNfc;
