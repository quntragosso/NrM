$(function () {
    // 2020/06/05版
    // 目次 変数定義 13~97
    // プレイ全体系関数 100~488 211~のsave()はfirebaseへのデータ登録仕方で記述長くなっているところ。
    // ブラウザ起動～ 491~657 firebase使ってる系
    // リセット関数, ユーザーコマンド関連 659~918
    // ショップコマンド関連 920~1021
    // モンスターコマンド関連 1024~1286
    // バトルコマンド関連 1288~1294
    // フレンドコマンド関連 1297~1615 firebase使ってる系
    // タイトルコマンド関連 1617~1660
    // その他、進化等汎用コマンド 1662~
    const firstText = "まずはショップで育てるモンスターを手に入れよう。";
    const greetText = ["今日は何をしようか。", "はまた君に会えて嬉しそうだ。"];
    const lifeText = ["おや、", "の様子が…", "に進化した！おめでとう！", "は寿命を迎えて死んでしまった。", "強さを少し引き継いでスライムとして生まれ変わったぞ！もう一度可愛がって育てよう！", "宇宙人に乗っ取られてしまった！", "魔王として蘇った。魔王も育てられるのかな・・・。"];
    const coldSleepText = ["を冬眠させますか？", "を冬眠させました。", "を冬眠させて", "を冬眠から起こしました。", "を起こしますか？", "を眠らせるスペースがない。"]
    const shopText = [["いぬ", 250], ["とり", 250], ["ふぐ", 250], ["にく", 0], ["さかな", 0], ["やさい", 0], ["ビタミン剤", 0], ["ケーキ", 300], "円で購入しますか？", "を購入しました。", "おかねが足りなくて購入できない・・・。", "モンスターが既にいるため購入できません。"];
    const trainingText = ["こうげき", "まほう", "バリア", "のトレーニングをしますか？", "トレーニングは失敗した。", "トレーニングが成功して", "が上がった！"];
    const battleText = ["たいせんシステムは現在鋭意開発中です。なんかこういうと本物のアプリっぽいでしょ？？ふふっ。"];
    const mealText = ["にく", "さかな", "やさい", "ビタミン剤", "ケーキ", "を食事として与えますか？", "前の食事と同じで不満足だったようだ。", "を美味しくいただいた！", "は何も食べないまま食欲を失ってしまった。"];
    const sleepText = ["を寝させますか？", "は気持ちよさそうに寝始めた。", "は気持ちよく目覚めた！", "は眠気に耐えられず寝てしまった。", "は寝ぼけながら起き上がった。"];
    const toiletText = ["をトイレに行かせますか？", "はトイレに行ってきた！", "はトイレに行けずに××××××××。"];
    const friendText = ["ユーザーIDを入力してください。", "そのユーザーIDは見つかりません。", "以下のユーザーにフレンド申請を行いますか？", "申請を送りました。", "以下のユーザーからのフレンド申請を承認しますか？", "以下のユーザーとフレンドになりました。", "以下のユーザーからのフレンド申請を拒否しました。", "フレンドの上限のため申請を拒否しました。", "以下のフレンドから応援されました。", "以下のユーザーの応援により、おかね増えました。"]
    const totitleText = ["現在のデータをセーブしてタイトルへ戻りますか？", "タイトルへ戻ります。"];
    const backgroundImg = { default: "url('img/bg_img/default.jpg')", mori: "url('img/bg_img/mori.png')", yama: "url('img/bg_img/yama.png')", umi: "url('img/bg_img/umi.png')", sougen: "url('img/bg_img/sougen.png')", yukiyama: "url('img/bg_img/yukiyama.png')", sawabe: "url('img/bg_img/sawa_main.jpg')" };
    const userMonsterEmpty = { name: "", img: "", attack: [0, 0, 0], magic: [0, 0, 0], barrier: [0, 0, 0], life: 0, bonus: [0, 0, 0], evoBonus: 0, training: 0, meal: [0, 0], toilet: 0, sleep: 0, evoPattern: 0 };
    const userMonsterStatus0 = { name: "スライム", img: "url('img/m_img/m000.png')", attack: [10, 1, 0], magic: [10, 1, 1], barrier: [10, 1, 2], life: 14400, bonus: [0, 0, 0], evoBonus: 0, training: 0, meal: [10, 5], toilet: 1800, sleep: 3600, evoPattern: 0 };
    const userMonsterStatus1 = { name: "いぬ", img: "url('img/m_img/m001.png')", attack: [16, 2, 0], magic: [12, 1, 1], barrier: [12, 1, 2], life: 28800, bonus: [0, 0, 0], evoBonus: 0, training: 0, meal: [10, 5], toilet: 1800, sleep: 5400, evoPattern: 1 };
    const userMonsterStatus2 = { name: "とり", img: "url('img/m_img/m002.png')", attack: [12, 1, 0], magic: [16, 2, 1], barrier: [12, 1, 2], life: 28800, bonus: [0, 0, 0], evoBonus: 0, training: 0, meal: [10, 5], toilet: 1800, sleep: 5400, evoPattern: 2 };
    const userMonsterStatus3 = { name: "ふぐ", img: "url('img/m_img/m003.png')", attack: [12, 1, 0], magic: [12, 1, 1], barrier: [16, 2, 2], life: 28800, bonus: [0, 0, 0], evoBonus: 0, training: 0, meal: [10, 5], toilet: 1800, sleep: 5400, evoPattern: 3 };
    const userMonsterStatus4 = { name: "うま", img: "url('img/m_img/m004.png')", attack: [14, 2, 0], magic: [14, 2, 1], barrier: [14, 2, 2], life: 28800, bonus: [0, 0, 0], evoBonus: 0, training: 0, meal: [10, 5], toilet: 0, sleep: 0, evoPattern: 4 };
    const userMonsterStatus5 = { name: "オオカミ", img: "url('img/m_img/m005.png')", attack: [20, 3, 0], magic: [15, 2, 1], barrier: [15, 2, 2], life: 43200, bonus: [0, 0, 0], evoBonus: 10, training: 0, meal: [10, 5], toilet: 1800, sleep: 7200, evoPattern: 5 };
    const userMonsterStatus6 = { name: "ハイエナ", img: "url('img/m_img/m006.png')", attack: [15, 2, 0], magic: [20, 3, 1], barrier: [15, 2, 2], life: 43200, bonus: [0, 0, 0], evoBonus: 0, training: 0, meal: [10, 5], toilet: 1800, sleep: 7200, evoPattern: 5 };
    const userMonsterStatus7 = { name: "バク", img: "url('img/m_img/m007.png')", attack: [15, 2, 0], magic: [15, 2, 1], barrier: [20, 3, 2], life: 43200, bonus: [0, 0, 0], evoBonus: 0, training: 0, meal: [10, 5], toilet: 1800, sleep: 7200, evoPattern: 8 };
    const userMonsterStatus8 = { name: "軍鶏", img: "url('img/m_img/m008.png')", attack: [20, 3, 0], magic: [15, 2, 1], barrier: [15, 2, 2], life: 43200, bonus: [0, 0, 0], evoBonus: 0, training: 0, meal: [10, 5], toilet: 1800, sleep: 7200, evoPattern: 6 };
    const userMonsterStatus9 = { name: "ハゲワシ", img: "url('img/m_img/m009.png')", attack: [15, 2, 0], magic: [20, 3, 1], barrier: [15, 2, 2], life: 43200, bonus: [0, 0, 0], evoBonus: 10, training: 0, meal: [10, 5], toilet: 1800, sleep: 7200, evoPattern: 6 };
    const userMonsterStatus10 = { name: "食べる青い鳥", img: "url('img/m_img/m010.png')", attack: [15, 2, 0], magic: [15, 2, 1], barrier: [20, 3, 2], life: 43200, bonus: [0, 0, 0], evoBonus: 0, training: 0, meal: [5, 5], toilet: 900, sleep: 10800, evoPattern: 9 };
    const userMonsterStatus11 = { name: "イルカ", img: "url('img/m_img/m011.png')", attack: [15, 2, 0], magic: [20, 3, 1], barrier: [15, 2, 2], life: 43200, bonus: [0, 0, 0], evoBonus: 0, training: 0, meal: [10, 5], toilet: 1800, sleep: 7200, evoPattern: 7 };
    const userMonsterStatus12 = { name: "ハナヒゲウツボ", img: "url('img/m_img/m012.png')", attack: [20, 3, 0], magic: [15, 2, 1], barrier: [15, 2, 2], life: 43200, bonus: [0, 0, 0], evoBonus: 10, training: 0, meal: [10, 5], toilet: 1800, sleep: 7200, evoPattern: 7 };
    const userMonsterStatus13 = { name: "サザエ", img: "url('img/m_img/m013.png')", attack: [15, 2, 0], magic: [15, 2, 1], barrier: [20, 3, 2], life: 43200, bonus: [0, 0, 0], evoBonus: 0, training: 0, meal: [10, 5], toilet: 1800, sleep: 43201, evoPattern: 10 };
    const userMonsterStatus14 = { name: "キリン", img: "url('img/m_img/m014.png')", attack: [18, 1, 0], magic: [18, 1, 1], barrier: [18, 1, 2], life: 43200, bonus: [0, 0, 0], evoBonus: 0, training: 0, meal: [10, 5], toilet: 1800, sleep: 7200, evoPattern: 11 };
    const userMonsterStatus15 = { name: "ユニコーン", img: "url('img/m_img/m015.png')", attack: [15, 3, 0], magic: [15, 3, 1], barrier: [15, 3, 2], life: 43200, bonus: [0, 0, 0], evoBonus: 0, training: 0, meal: [10, 5], toilet: 1800, sleep: 7200, evoPattern: 12 };
    const userMonsterStatus16 = { name: "ゴロゴロしてる馬", img: "url('img/m_img/m016.png')", attack: [17, 3, 0], magic: [17, 3, 1], barrier: [17, 3, 2], life: 43200, bonus: [0, 0, 0], evoBonus: 0, training: 0, meal: [10, 5], toilet: 1800, sleep: 7200, evoPattern: 13 };
    const userMonsterStatus17 = { name: "ケルベロス", img: "url('img/m_img/m017.png')", attack: [25, 5, 0], magic: [20, 3, 1], barrier: [15, 3, 2], life: 28800, bonus: [0, 0, 0], evoBonus: 0, training: 0, meal: [10, 5], toilet: 1800, sleep: 3600, evoPattern: 13 };
    const userMonsterStatus18 = { name: "メガテリウム", img: "url('img/m_img/m018.png')", attack: [20, 3, 0], magic: [15, 3, 1], barrier: [25, 5, 2], life: 0, bonus: [0, 0, 0], evoBonus: 0, training: 0, meal: [10, 5], toilet: 1800, sleep: 3600, evoPattern: 13 };
    const userMonsterStatus19 = { name: "ヒポグリフ", img: "url('img/m_img/m019.png')", attack: [20, 3, 0], magic: [25, 5, 1], barrier: [15, 3, 2], life: 28800, bonus: [0, 0, 0], evoBonus: 0, training: 0, meal: [10, 5], toilet: 1800, sleep: 3600, evoPattern: 13 };
    const userMonsterStatus20 = { name: "燃え上がる青い鳥", img: "url('img/m_img/m020.png')", attack: [30, 5, 0], magic: [15, 3, 1], barrier: [15, 3, 2], life: 28800, bonus: [0, 0, 0], evoBonus: 0, training: 0, meal: [10, 5], toilet: 1800, sleep: 3600, evoPattern: 13 };
    const userMonsterStatus21 = { name: "レヴィアタン", img: "url('img/m_img/m021.png')", attack: [22, 4, 0], magic: [22, 4, 1], barrier: [16, 3, 2], life: 28800, bonus: [0, 0, 0], evoBonus: 0, training: 0, meal: [10, 5], toilet: 1800, sleep: 3600, evoPattern: 13 };
    const userMonsterStatus22 = { name: "アンモナイト", img: "url('img/m_img/m022.png')", attack: [10, 5, 0], magic: [18, 5, 1], barrier: [32, 1, 2], life: 28800, bonus: [0, 0, 0], evoBonus: 0, training: 0, meal: [10, 5], toilet: 1800, sleep: 28801, evoPattern: 13 };
    const userMonsterStatus23 = { name: "麒麟", img: "url('img/m_img/m023.png')", attack: [22, 3, 0], magic: [22, 3, 1], barrier: [22, 3, 2], life: 28800, bonus: [0, 0, 0], evoBonus: 0, training: 0, meal: [10, 5], toilet: 1800, sleep: 3600, evoPattern: 13 };
    const userMonsterStatus24 = { name: "ユニコーン企業", img: "url('img/m_img/m024.png')", attack: [15, 5, 0], magic: [25, 5, 1], barrier: [25, 5, 2], life: 28800, bonus: [0, 0, 0], evoBonus: 999, training: 0, meal: [10, 5], toilet: 1800, sleep: 3600, evoPattern: 13 };
    const userMonsterStatus25 = { name: "魔王", img: "url('img/m_img/m025.png')", attack: [25, 0, 0], magic: [25, 0, 1], barrier: [25, 0, 2], life: 14400, bonus: [0, 0, 0], evoBonus: 0, training: 0, meal: [10, 5], toilet: 5, sleep: 14401, evoPattern: 13 };
    const userMonsterStatus26 = { name: "宇宙人", img: "url('img/m_img/m026.png')", attack: [15, 10, 0], magic: [15, 10, 1], barrier: [15, 10, 2], life: 28800, bonus: [0, 0, 0], evoBonus: 999, training: 0, meal: [10, 5], toilet: 28801, sleep: 28801, evoPattern: 14 };

    const cheerInterval = 240;

    const userStatusNew = {
        name: "", password: "", gold: 500, background: "url('img/bg_img/default.jpg')", userID: "", foodStock: [0, 0, 0, 0, 0], nowMonster: userMonsterEmpty, monsterStock: [userMonsterEmpty, userMonsterEmpty, userMonsterEmpty], playTime: 0, friend: [], cheered: [], cheeredTime: [cheerInterval, cheerInterval, cheerInterval], friendWait: []
    };
    const userMonsterPackage0 = [userMonsterStatus1, userMonsterStatus2, userMonsterStatus3, userMonsterStatus4];
    const userMonsterPackage1 = [[userMonsterStatus7, userMonsterStatus6, userMonsterStatus5], [userMonsterStatus10, userMonsterStatus8, userMonsterStatus9], [userMonsterStatus13, userMonsterStatus11, userMonsterStatus12]];
    const userMonsterPackage2 = [userMonsterStatus17, userMonsterStatus19, userMonsterStatus21];
    let userStatus = "";
    let selectItem = "";
    let selectMonster = "";
    let newFriend = "";
    let trainingFlag = false;
    let deathSwitch = false;
    let bonusSave;
    // demo用
    // const trainingInterval = 30;
    // let trainingNow = "";
    // let mealFlag = false;
    // const mealInterval = 10;
    // let toiletFlag = false;
    // const toiletInterval = 10;
    // let sleepFlag = false;
    // const sleepInterval = 10;

    // インターバル。3600は一時間。
    const trainingInterval = 3600;
    let trainingNow = "";
    let mealFlag = false;
    const mealInterval = 3150;
    let toiletFlag = false;
    const toiletInterval = 3150;
    let sleepFlag = false;
    const sleepInterval = 6850;

    // モンスターに対する時間、モンスター移動の時間、プレイの時間。
    let timer = "";
    let monsterMove = "";
    let playTimeTimer = "";
    // 経過時間、timerが動いているかどうか、monsterMoveが動いているかどうか。
    let elapsedTime = "";
    let timerSwitch = false;
    let moveSwitch = false;


    // プレイ中全体に関わる系。時系列的にはスタートログインの後がよさそうだけど一番上に。
    // モンスターが自由移動。一定周期で判定を繰り返す。
    // 育成中モンスターがいない場合に動かないように修正。
    function monsterMoveStart() {
        if (userStatus.nowMonster.name == "") {

        } else {
            moveSwitch = true;
            let moveRN = Math.floor(Math.random() * 2);
            if (moveRN == 0) {
                let moveRNX = Math.floor(Math.random() * 11);
                $("#pm_box").animate({ left: moveRNX * 5 + 25 + "%" }, 3000);
            } else if (moveRN == 1) {
                let moveRNY = Math.floor(Math.random() * 11);
                $("#pm_box").animate({ top: moveRNY * 5 + 25 + "%" }, 3000);
            };
            monsterMove = setInterval(function () {
                moveRN = Math.floor(Math.random() * 2);
                if (moveRN == 0) {
                    let moveRNX = Math.floor(Math.random() * 11);
                    $("#pm_box").animate({ left: moveRNX * 5 + 25 + "%" }, 3000);
                } else if (moveRN == 1) {
                    let moveRNY = Math.floor(Math.random() * 11);
                    $("#pm_box").animate({ top: moveRNY * 5 + 25 + "%" }, 3000);
                };
            }, 3000);
        };
    };

    // 育成系コマンドのタッチ不可判定。
    function untouchableManager() {
        if (trainingFlag == true) {
            $("#monster_commands1").removeClass("untouchable");
        } else if (mealFlag == false) {
            $("#monster_commands1").addClass("untouchable");
        };
        if (mealFlag == true) {
            $("#monster_commands2").removeClass("untouchable");
        } else if (mealFlag == false) {
            $("#monster_commands2").addClass("untouchable");
        };
        if (toiletFlag == true) {
            $("#monster_commands3").removeClass("untouchable");
        } else if (toiletFlag == false) {
            $("#monster_commands3").addClass("untouchable");
        };
        if (sleepFlag == true) {
            $("#monster_commands4").removeClass("untouchable");
        } else if (sleepFlag == false) {
            $("#monster_commands4").addClass("untouchable");
        };
    };

    // 育成アイコンの表示管理。最後にはコマンドと連動。
    function iconsManager() {
        if (userStatus.friendWait != 0 || userStatus.cheered != 0) {
            $("#friend_command").addClass("inform");
        } else {
            $("#friend_command").removeClass("inform");
        }
        if (userStatus.nowMonster.name == "") {
            trainingFlag = false;
            mealFlag = false;
            toiletFlag = false;
            sleepFlag = false;
            $("#meal_icon").css("display", "none");
            $("#toilet_icon").css("display", "none");
            $("#sleep_icon").css("display", "none");
        } else {
            if (userStatus.nowMonster.training <= 0) {
                trainingFlag = true;
            } else {
                trainingFlag = false;
            };
            if (userStatus.nowMonster.meal[0] <= 0) {
                mealFlag = true;
                $("#meal_icon").css("display", "flex");
            } else {
                mealFlag = false;
                $("#meal_icon").css("display", "none");
            };
            if (userStatus.nowMonster.toilet <= 0) {
                toiletFlag = true;
                $("#toilet_icon").css("display", "flex");
            } else {
                toiletFlag = false;
                $("#toilet_icon").css("display", "none");
            };
            if (userStatus.nowMonster.sleep <= 0) {
                sleepFlag = true;
                $("#sleep_icon").css("display", "flex");
            } else {
                sleepFlag = false;
                $("#sleep_icon").css("display", "none");
            };
            untouchableManager();
        }
    };

    // セーブ関数。
    // 本作はイベント終了を踏むごとにsave()が起動する、半自動セーブ型。
    // 時間ごとにもセーブしようと思ったが書き込み量がヤバいということになって。
    // 経過時間を算出して更新する。
    function saveTimer() {
        userStatus.nowMonster.training = userStatus.nowMonster.training - elapsedTime;
        userStatus.nowMonster.meal[0] = userStatus.nowMonster.meal[0] - elapsedTime;
        userStatus.nowMonster.toilet = userStatus.nowMonster.toilet - elapsedTime;
        userStatus.nowMonster.sleep = userStatus.nowMonster.sleep - elapsedTime;
        userStatus.nowMonster.life = userStatus.nowMonster.life - elapsedTime;
    };

    function save() {
        // Object.createで値が引き継がれるバグを潰したせいで、本当か？っていう記述に。
        // もっとスマートにならないものか。
        // 三項演算子実用したのでよしとする。なるほどねって言ってる。
        const saveNowMonster = userStatus.nowMonster ? {
            name: userStatus.nowMonster.name,
            img: userStatus.nowMonster.img,
            attack: userStatus.nowMonster.attack,
            magic: userStatus.nowMonster.magic,
            barrier: userStatus.nowMonster.barrier,
            life: userStatus.nowMonster.life,
            bonus: userStatus.nowMonster.bonus,
            evoBonus: userStatus.nowMonster.evoBonus,
            training: userStatus.nowMonster.training,
            meal: userStatus.nowMonster.meal,
            toilet: userStatus.nowMonster.toilet,
            sleep: userStatus.nowMonster.sleep,
            evoPattern: userStatus.nowMonster.evoPattern
        } : userMonsterEmpty;

        const saveMonsterStock0 = userStatus.monsterStock[0] ? {
            name: userStatus.monsterStock[0].name,
            img: userStatus.monsterStock[0].img,
            attack: userStatus.monsterStock[0].attack,
            magic: userStatus.monsterStock[0].magic,
            barrier: userStatus.monsterStock[0].barrier,
            life: userStatus.monsterStock[0].life,
            bonus: userStatus.monsterStock[0].bonus,
            evoBonus: userStatus.monsterStock[0].evoBonus,
            training: userStatus.monsterStock[0].training,
            meal: userStatus.monsterStock[0].meal,
            toilet: userStatus.monsterStock[0].toilet,
            sleep: userStatus.monsterStock[0].sleep,
            evoPattern: userStatus.monsterStock[0].evoPattern,
        } : userMonsterEmpty;

        const saveMonsterStock1 = userStatus.monsterStock[1] ? {
            name: userStatus.monsterStock[1].name,
            img: userStatus.monsterStock[1].img,
            attack: userStatus.monsterStock[1].attack,
            magic: userStatus.monsterStock[1].magic,
            barrier: userStatus.monsterStock[1].barrier,
            life: userStatus.monsterStock[1].life,
            bonus: userStatus.monsterStock[1].bonus,
            evoBonus: userStatus.monsterStock[1].evoBonus,
            training: userStatus.monsterStock[1].training,
            meal: userStatus.monsterStock[1].meal,
            toilet: userStatus.monsterStock[1].toilet,
            sleep: userStatus.monsterStock[1].sleep,
            evoPattern: userStatus.monsterStock[1].evoPattern,
        } : userMonsterEmpty;

        const saveMonsterStock2 = userStatus.monsterStock[2] ? {
            name: userStatus.monsterStock[2].name,
            img: userStatus.monsterStock[2].img,
            attack: userStatus.monsterStock[2].attack,
            magic: userStatus.monsterStock[2].magic,
            barrier: userStatus.monsterStock[2].barrier,
            life: userStatus.monsterStock[2].life,
            bonus: userStatus.monsterStock[2].bonus,
            evoBonus: userStatus.monsterStock[2].evoBonus,
            training: userStatus.monsterStock[2].training,
            meal: userStatus.monsterStock[2].meal,
            toilet: userStatus.monsterStock[2].toilet,
            sleep: userStatus.monsterStock[2].sleep,
            evoPattern: userStatus.monsterStock[2].evoPattern,
        } : userMonsterEmpty;

        const saveData = {
            name: userStatus.name,
            password: userStatus.password,
            gold: userStatus.gold,
            background: userStatus.background,
            userID: userStatus.userID,
            foodStock: userStatus.foodStock,
            nowMonster: saveNowMonster,
            monsterStock: [saveMonsterStock0, saveMonsterStock1, saveMonsterStock2],
            playTime: userStatus.playTime,
            friend: userStatus.friend,
            cheered: userStatus.cheered,
            cheeredTime: userStatus.cheeredTime,
            friendWait: userStatus.friendWait
        };

        userDB.doc(userStatus.userID).set(saveData);
    };

    // 進化分岐。
    function lifeEvent() {
        bonusSave = [Math.floor(userStatus.nowMonster.bonus[0] / 2), Math.floor(userStatus.nowMonster.bonus[1] / 2), Math.floor(userStatus.nowMonster.bonus[2] / 2), Math.floor(userStatus.nowMonster.bonus[3] / 2)];
        const bonusNow = userStatus.nowMonster.bonus;
        const evoInfo1 = userStatus.nowMonster.evoPattern;
        const evoInfo2 = userStatus.nowMonster.evoBonus;
        if (evoInfo1 == 0) {
            if (evoInfo2 <= 8) {
                userStatus.nowMonster = Object.create(userMonsterPackage0[2]);
            } else if (evoInfo2 >= 9 && evoInfo2 <= 15) {
                userStatus.nowMonster = Object.create(userMonsterPackage0[0]);
            } else if (evoInfo2 >= 14 && evoInfo2 <= 19) {
                userStatus.nowMonster = Object.create(userMonsterPackage0[1]);
            } else if (evoInfo2 >= 20) {
                userStatus.nowMonster = Object.create(userMonsterPackage0[3]);
            }
        } else if (evoInfo1 >= 1 && evoInfo1 <= 3) {
            if (evoInfo2 <= 12) {
                userStatus.nowMonster = Object.create(userMonsterPackage1[evoInfo1 - 1][0]);
            } else if (evoInfo2 >= 13 && evoInfo2 <= 25) {
                userStatus.nowMonster = Object.create(userMonsterPackage1[evoInfo1 - 1][1]);
            } else if (evoInfo2 >= 26) {
                userStatus.nowMonster = Object.create(userMonsterPackage1[evoInfo1 - 1][2]);
            };
        } else if (evoInfo1 == 4) {
            if (evoInfo2 >= 30) {
                userStatus.nowMonster = Object.create(userMonsterStatus15);
            } else if (evoInfo2 >= 22 && evoInfo2 <= 29 && userStatus.nowMonster.bonus[0] >= 3) {
                userStatus.nowMonster = Object.create(userMonsterStatus14);
            } else {
                userStatus.nowMonster = Object.create(userMonsterStatus16);
            };
        } else if (evoInfo1 >= 5 && evoInfo1 <= 7) {
            if (evoInfo2 <= 29) {
                deathSwitch = true;
            } else {
                userStatus.nowMonster = Object.create(userMonsterPackage2[evoInfo1 - 5]);
            };
        } else if (evoInfo1 == 8) {
            if (userStatus.nowMonster.bonus[0] >= 3 && userStatus.nowMonster.bonus[1] >= 3 && userStatus.nowMonster.bonus[2] >= 3) {
                userStatus.nowMonster = Object.create(userMonsterStatus18);
            } else {
                deathSwitch = true;
            };
        } else if (evoInfo1 == 9) {
            if (evoInfo2 <= 0) {
                userStatus.nowMonster = Object.create(userMonsterStatus20);
            } else {
                deathSwitch = true;
            };
        } else if (evoInfo1 == 10) {
            if (userStatus.nowMonster.bonus[2] >= 10) {
                userStatus.nowMonster = Object.create(userMonsterStatus22);
            } else {
                deathSwitch = true;
            };
        } else if (evoInfo1 == 11) {
            if (userStatus.nowMonster.bonus[0] >= 4 && userStatus.nowMonster.bonus[1] >= 4 && userStatus.nowMonster.bonus[2] >= 4) {
                userStatus.nowMonster = Object.create(userMonsterStatus23);
            } else {
                deathSwitch = true;
            };
        } else if (evoInfo1 == 12) {
            if (evoInfo2 >= 30) {
                userStatus.nowMonster = Object.create(userMonsterStatus24);
            } else {
                deathSwitch = true;
            };
        } else if (evoInfo1 == 13) {
            const rn = Math.floor(Math.random() * 1);
            if (rn == 0) {
                userStatus.nowMonster = Object.create(userMonsterStatus26);
            } else {
                deathSwitch = true;
            }
        } else if (evoInfo1 == 14) {
            deathSwitch = true;
        };
        timerSwitch = false;
        userStatus.nowMonster.bonus = bonusNow;
    };

    // monsterに対するタイマーの関数。
    // ありえん長くなった。辛い。
    function startTimer() {
        // 育成中モンスターがいない場合起動しない。
        if (userStatus.nowMonster.name == "") {

        } else {
            timerSwitch = true;
            elapsedTime = 0;
            // timer start
            timer = setInterval(async function () {
                elapsedTime++;
                console.log(elapsedTime, userStatus.nowMonster.meal, userStatus.nowMonster.toilet, userStatus.nowMonster.sleep);
                // training時間判定。
                if (elapsedTime >= userStatus.nowMonster.training) {
                    trainingFlag = true;
                    untouchableManager();
                };
                // meal時間判定。
                if (elapsedTime >= userStatus.nowMonster.meal[0] && elapsedTime < userStatus.nowMonster.meal[0] + 10) {
                    mealFlag = true;
                    $("#meal_icon").css("display", "flex");
                    untouchableManager();
                } else if (elapsedTime >= userStatus.nowMonster.meal[0] + 600) {
                    mealFlag = false;
                    $("#meal_icon").css("display", "none");
                    untouchableManager();
                    userStatus.nowMonster.evoBonus = userStatus.nowMonster.evoBonus - 2;
                    $("#text_box").css("display", "flex");
                    $("#text_text").text(userStatus.nowMonster.name + mealText[8]);
                    $("#close_box").css("display", "flex");
                    await saveTimer();
                    mealRNG();
                    elapsedTime = 0;
                };
                // toilet時間判定。
                if (elapsedTime >= userStatus.nowMonster.toilet && elapsedTime < userStatus.nowMonster.toilet + 10) {
                    toiletFlag = true;
                    $("#toilet_icon").css("display", "flex");
                    untouchableManager();
                } else if (elapsedTime >= userStatus.nowMonster.toilet + 600) {
                    toiletFlag = false;
                    $("#toilet_icon").css("display", "none");
                    untouchableManager();
                    userStatus.nowMonster.evoBonus = userStatus.nowMonster.evoBonus - 3;
                    $("#text_box").css("display", "flex");
                    $("#text_text").text(userStatus.nowMonster.name + toiletText[2]);
                    $("#close_box").css("display", "flex");
                    await saveTimer();
                    toiletRNG();
                    elapsedTime = 0;
                };
                // sleep時間判定。
                if (elapsedTime >= userStatus.nowMonster.sleep && elapsedTime < userStatus.nowMonster.sleep + 10) {
                    sleepFlag = true;
                    $("#sleep_icon").css("display", "flex");
                    untouchableManager();
                } else if (elapsedTime >= userStatus.nowMonster.sleep + 900) {
                    sleepFlag = false;
                    $("#sleep_icon").css("display", "none");
                    untouchableManager();
                    userStatus.nowMonster.evoBonus = userStatus.nowMonster.evoBonus - 3;
                    $("#main_commandbox").css("display", "none");
                    $("#text_box").css("display", "flex");
                    $("#text_text").text(userStatus.nowMonster.name + sleepText[3]);
                    $("#close_text").css("display", "flex");
                    await saveTimer();
                    clearInterval(monsterMove);
                    clearInterval(timer);
                    moveSwitch = false;
                    timerSwitch = false;
                    sleepRNG();
                    elapsedTime = 0;
                    // sleepのみイベント。
                    setTimeout(function () {
                        $("#main_scene").animate({ opacity: '0' }, 500);
                    }, 3000);
                    setTimeout(function () {
                        $("#close_box").css("display", "flex");
                        $("#text_text").text(userStatus.nowMonster.name + sleepText[4]);
                    }, 3500);
                    setTimeout(function () {
                        $("#main_scene").animate({ opacity: '1' }, 500);
                    }, 4000);
                };
                if (elapsedTime >= userStatus.nowMonster.life) {
                    $("#text_box").css("display", "flex");
                    $("#life_nextbox").css("display", "flex");
                    $("#text_text").text(lifeText[0] + userStatus.nowMonster.name + lifeText[1]);
                    clearInterval(timer);
                    lifeEvent();
                    $(".command_boxes").css("display", "none");
                };
            }, 1000);
        }
    };

    // プレイ時間用のタイマー。1分で1カウント。
    // cheeredTimerも動かさないといけない。
    function startPlayTimer() {
        playTimeTimer = setInterval(async function () {
            userStatus.playTime++;
            userStatus.cheeredTime[0]++;
            userStatus.cheeredTime[1]++;
            userStatus.cheeredTime[2]++;
            await saveTimer();
            elapsedTime = 0;
            // save(); これ起動させ続けるとヤバそう。
        }, 60000);
    };


    // ブラウザ読み込み時。タイトル画面。
    $(document).ready(function () {
        $("#title_scene").css("display", "flex");
        $("#title_scene1").css("display", "flex");
        // userStatus = Object.create(userStatusNew);
        // $("#main_scene").css("display", "flex");
        // $("#home_scene").css("display", "flex");
        // $("#text_box").css("display", "flex");
        // $("#gold_box").text("おかね：　" + userStatus.gold);
        // $("#main_scene").css("background-image", userStatus.background);
        // $("#text_text").text(firstText);
        // $("#close_box").css("display", "flex");
    });

    // タイトル画面のコマンド。
    $("#new_game").on("click", function () {
        $("#title_scene1").css("display", "none");
        $("#title_scene2").css("display", "flex");
    });

    $("#load_game").on("click", function () {
        $("#title_scene1").css("display", "none");
        $("#title_scene3").css("display", "flex");
    });

    $(".title_return").on("click", function () {
        $(".title_scenes").css("display", "none");
        $("#title_scene1").css("display", "flex");
    });

    // start_btn内にしか存在しない。
    // ID作成。IDを作れる検証とドキュメントのID指定の検証という目的ありきで今回は作成。
    function userIDGenerator() {
        const a = Math.floor(Math.random() * 10);
        const b = Math.floor(Math.random() * 10);
        const c = Math.floor(Math.random() * 10);
        const d = Math.floor(Math.random() * 10);
        const e = Math.floor(Math.random() * 10);
        const f = Math.floor(Math.random() * 10);
        const g = Math.floor(Math.random() * 10);
        const h = Math.floor(Math.random() * 10);
        const i = Math.floor(Math.random() * 10);
        const j = Math.floor(Math.random() * 10);
        const k = Math.floor(Math.random() * 10);
        const l = Math.floor(Math.random() * 10);
        const newArray = [a, b, c, d, e, f, g, h, i, j, k, l];
        let newID = "";
        for (let i = 0; i < newArray.length; i++) {
            newID = newID + String(newArray[i]);
        };
        userStatus.userID = newID;
    };

    // はじめるを押す。同名、同パスワードがある場合のみ、重複登録を防ぐ。
    $("#start_btn").on("click", function () {
        userStatus = Object.create(userStatusNew);
        userStatus.name = $("#username_new").val();
        userStatus.password = $("#password_new").val();
        if (userStatus.name == "" || userStatus.password == "") {
            alert("項目を入力してください。");
            $("#username_new").val("");
            $("#password_new").val("");
            userStatus = "";
        } else {
            userDB.get().then(function (querySnapshot) {
                let dataArray = [];
                let newUserPass = true;
                querySnapshot.forEach(function (doc) {
                    const usersData = { name: doc.data().name, password: doc.data().password };
                    dataArray.push(usersData);
                });
                const newUser = { name: userStatus.name, password: userStatus.password };
                for (let i = 0; i < dataArray.length; i++) {
                    if (newUser.name == dataArray[i].name && newUser.password == dataArray[i].password) {
                        newUserPass = false;
                    } else {
                    };
                };
                if (newUserPass == false) {
                    alert("既に登録済みの情報です。")
                    $("#username_new").val("");
                    $("#password_new").val("");
                } else if (newUserPass == true) {
                    $("#username_new").val("");
                    $("#password_new").val("");
                    $("#title_scene").fadeOut(500);
                    setTimeout(function () {
                        $("#loading_scene").fadeIn(500);
                    }, 500);
                    setTimeout(function () {
                        $("#loading_scene").fadeOut(500);
                    }, 2500);
                    setTimeout(function () {
                        $("#main_scene").css("display", "flex");
                    }, 3000);
                    setTimeout(function () {
                        userIDGenerator();
                        $("#main_scene").animate({ opacity: '1' }, 500);
                        $("#home_scene").css("display", "flex");
                        $("#text_box").css("display", "flex");
                        $("#gold_box").text("おかね：　" + userStatus.gold);
                        $("#main_scene").css("background-image", userStatus.background);
                        $("#text_text").text(firstText);
                        $("#close_box").css("display", "flex");
                        startPlayTimer();
                    }, 3500);
                };
            });
        };
    });

    // ログインボタン。同名のユーザー名のものを全て取得し、そのうちパスワードが一致するものを返す。登録条件がユーザー名、パスワードの非重複のため、大丈夫のはず。
    $("#login_btn").on("click", function () {
        const inputName = $("#username_load").val();
        const inputPassword = $("#password_load").val();
        if (inputName == "" || inputPassword == "") {
            alert("項目を入力してください。");
            $("#username_load").val("");
            $("#password_load").val("");
        } else {
            userDB.where("name", "==", inputName)
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(async function (doc) {
                        const userLoadData = doc.data();
                        checkPassword = userLoadData.password;
                        if (checkPassword == inputPassword) {
                            function a() {
                                userStatus = Object.create(userLoadData);
                            };
                            await a();
                            $("#username_load").val("");
                            $("#password_load").val("");
                            $("#title_scene").fadeOut(500);
                            setTimeout(function () {
                                $("#loading_scene").fadeIn(500);
                            }, 500);
                            setTimeout(function () {
                                $("#loading_scene").fadeOut(500);
                            }, 2500);
                            setTimeout(function () {
                                $("#main_scene").css("display", "flex");
                            }, 3000);
                            setTimeout(function () {
                                $("#home_scene").css("display", "flex");
                                $("#text_box").css("display", "flex");
                                $("#gold_box").text("おかね：　" + userStatus.gold);
                                $("#main_scene").css("background-image", userStatus.background);
                                if (userStatus.nowMonster.name == "") {
                                    $("#text_text").text(greetText[0]);
                                    $("#close_box").css("display", "flex");
                                } else {
                                    $("#pmimg_box").css("background", userStatus.nowMonster.img);
                                    $("#text_text").text(userStatus.nowMonster.name + greetText[1]);
                                    $("#close_box").css("display", "flex");
                                }
                                $("#main_scene").animate({ opacity: '1' }, 500);
                                startPlayTimer();
                            }, 3500);

                        } else {

                        };
                    });
                });
        };
    });

    // 以下コマンド押すたびに呼ばれる。reset関数。
    // 表示系のreset。
    function resetScenes() {
        $(".command_boxes").css("display", "none");
        $(".scenes").css("display", "none");
        $("#text_text").text("");
        $(".tc_boxes").css("display", "none");
        $("#text_box").css("display", "none");
    };

    // timer系のreset。
    async function resetTimers() {
        if (timerSwitch == true) {
            await saveTimer();
            clearInterval(timer);
            timerSwitch = false;
        } else {

        };
    }

    // ユーザーコマンド。
    $("#user_command").on("click", function () {
        resetScenes();
        resetTimers();
        $("#user_commandbox").css("display", "flex");
        $("#home_scene").css("display", "flex");
    });

    // ユーザープロフィール。
    $("#user_commands0").on("click", function () {
        resetScenes();
        const h = Math.floor(userStatus.playTime / 60).toString().padStart(3, "0");
        const m = (userStatus.playTime % 60).toString().padStart(2, "0");
        const playTimeFull = h + ":" + m;
        $("#user_commandbox").css("display", "flex");
        $("#profile_scene").css("display", "flex");
        $("#profile_name").text("Username　: " + userStatus.name);
        $("#profile_id").text("UserID　　: " + userStatus.userID);
        $("#profile_playtimefull").text("プレイ時間 : " + playTimeFull);
        $("#profile_gold").text("おかね　　: " + userStatus.gold);
        $("#profile_foodstock0").text("にく　　　: " + userStatus.foodStock[0]);
        $("#profile_foodstock1").text("さかな　　: " + userStatus.foodStock[1]);
        $("#profile_foodstock2").text("やさい　　: " + userStatus.foodStock[2]);
        $("#profile_foodstock3").text("ビタミン剤: " + userStatus.foodStock[3]);
        $("#profile_foodstock4").text("ケーキ　　: " + userStatus.foodStock[4]);
    });

    // 背景変更。ホーム画面に対して変更を行うためシーンはホーム。
    // userStatusも書き換えるため、次回ログイン時に引き継がれるように仕様変更。
    $("#user_commands1").on("click", function () {
        resetScenes();
        $("#background_commandbox").css("display", "flex");
        $("#home_scene").css("display", "flex");
    });

    $("#background_commands0").on("click", function () {
        userStatus.background = backgroundImg.default;
        $("#main_scene").css("background-image", userStatus.background);
    });

    $("#background_commands1").on("click", function () {
        userStatus.background = backgroundImg.mori;
        $("#main_scene").css("background-image", userStatus.background);
    });

    $("#background_commands2").on("click", function () {
        userStatus.background = backgroundImg.umi;
        $("#main_scene").css("background-image", userStatus.background);
    });

    $("#background_commands3").on("click", function () {
        userStatus.background = backgroundImg.yama;
        $("#main_scene").css("background-image", userStatus.background);
    });

    $("#background_commands4").on("click", function () {
        userStatus.background = backgroundImg.sougen;
        $("#main_scene").css("background-image", userStatus.background);
    });

    $("#background_commands5").on("click", function () {
        userStatus.background = backgroundImg.yukiyama;
        $("#main_scene").css("background-image", userStatus.background);
    });

    $("#background_commands6").on("click", function () {
        userStatus.background = backgroundImg.sawabe;
        $("#main_scene").css("background-image", userStatus.background);
    });

    // 冬眠コマンド。commands3なのは間に合いそうにない要素を消した跡、敗北の証。
    // userStatus.monsterStockがEmptyの場合は表示せずタッチも不可。
    // 冬眠のスペースがなくなるともう保存できないのだ。しかも消去もできない。ここはアップデート必要。
    $("#user_commands3").on("click", function () {
        resetScenes();
        $("#userm_commandbox").css("display", "flex");
        $("#home_scene").css("display", "flex");
        if (userStatus.monsterStock[0].name == "") {
            $("#userm_commands0").addClass("untouchable");
        } else {
            $("#userm_commands0").removeClass("untouchable");
            $("#userm_commands0").text(userStatus.monsterStock[0].name);
        };
        if (userStatus.monsterStock[1].name == "") {
            $("#userm_commands1").addClass("untouchable");
        } else {
            $("#userm_commands1").removeClass("untouchable");
            $("#userm_commands1").text(userStatus.monsterStock[1].name);
        };
        if (userStatus.monsterStock[2].name == "") {
            $("#userm_commands2").addClass("untouchable");
        } else {
            $("#userm_commands2").removeClass("untouchable");
            $("#userm_commands2").text(userStatus.monsterStock[2].name);
        };
        if (userStatus.nowMonster.name == "") {
            $("#userm_commands3").addClass("untouchable");
        } else {
            $("#userm_commands3").removeClass("untouchable");
        };
    });

    // 冬眠中モンスターのステータス表示。
    $("#userm_commands0").on("click", function () {
        resetScenes();
        selectMonster = 0;
        $("#sleeping_scene").css("display", "flex");
        $("#sleeping_img").css("background", userStatus.monsterStock[selectMonster].img);
        $("#sleeping_name").text(userStatus.monsterStock[selectMonster].name);
        $("#sleeping_attack").text("こうげき：" + (userStatus.monsterStock[selectMonster].attack[0] + userStatus.monsterStock[selectMonster].bonus[0]));
        $("#sleeping_magic").text("まほう　：" + (userStatus.monsterStock[selectMonster].magic[0] + userStatus.monsterStock[selectMonster].bonus[1]));
        $("#sleeping_barrier").text("バリア　：" + (userStatus.monsterStock[selectMonster].barrier[0] + userStatus.monsterStock[selectMonster].bonus[2]));
        $("#text2_box").css("display", "flex");
        $("#text2_text").text(userStatus.monsterStock[0].name + coldSleepText[4]);
        $("#userm_yn1").css("display", "flex");
    });

    $("#userm_commands1").on("click", function () {
        resetScenes();
        selectMonster = 1;
        $("#sleeping_scene").css("display", "flex");
        $("#sleeping_img").css("background", userStatus.monsterStock[selectMonster].img);
        $("#sleeping_name").text(userStatus.monsterStock[selectMonster].name);
        $("#sleeping_attack").text("こうげき：" + (userStatus.monsterStock[selectMonster].attack[0] + userStatus.monsterStock[selectMonster].bonus[0]));
        $("#sleeping_magic").text("まほう　：" + (userStatus.monsterStock[selectMonster].magic[0] + userStatus.monsterStock[selectMonster].bonus[1]));
        $("#sleeping_barrier").text("バリア　：" + (userStatus.monsterStock[selectMonster].barrier[0] + userStatus.monsterStock[selectMonster].bonus[2]));
        $("#text2_box").css("display", "flex");
        $("#text2_text").text(userStatus.monsterStock[1].name + coldSleepText[4]);
        $("#userm_yn1").css("display", "flex");
    });

    $("#userm_commands2").on("click", function () {
        resetScenes();
        selectMonster = 2;
        $("#sleeping_scene").css("display", "flex");
        $("#sleeping_img").css("background", userStatus.monsterStock[selectMonster].img);
        $("#sleeping_name").text(userStatus.monsterStock[selectMonster].name);
        $("#sleeping_attack").text("こうげき：" + (userStatus.monsterStock[selectMonster].attack[0] + userStatus.monsterStock[selectMonster].bonus[0]));
        $("#sleeping_magic").text("まほう　：" + (userStatus.monsterStock[selectMonster].magic[0] + userStatus.monsterStock[selectMonster].bonus[1]));
        $("#sleeping_barrier").text("バリア　：" + (userStatus.monsterStock[selectMonster].barrier[0] + userStatus.monsterStock[selectMonster].bonus[2]));
        $("#text2_box").css("display", "flex");
        $("#text2_text").text(userStatus.monsterStock[2].name + coldSleepText[4]);
        $("#userm_yn1").css("display", "flex");
    });

    // これは今育ててるやつのステータス。
    $("#userm_commands3").on("click", function () {
        resetScenes();
        $("#sleeping_scene").css("display", "flex");
        $("#sleeping_img").css("background", userStatus.nowMonster.img);
        $("#sleeping_name").text(userStatus.nowMonster.name);
        $("#sleeping_attack").text("こうげき：" + (userStatus.nowMonster.attack[0] + userStatus.nowMonster.bonus[0]));
        $("#sleeping_magic").text("まほう　：" + (userStatus.nowMonster.magic[0] + userStatus.nowMonster.bonus[1]));
        $("#sleeping_barrier").text("バリア　：" + (userStatus.nowMonster.barrier[0] + userStatus.nowMonster.bonus[2]));
        $("#text2_box").css("display", "flex");
        $("#text2_text").text(userStatus.nowMonster.name + coldSleepText[0]);
        $("#userm_yn2").css("display", "flex");
    });

    // 冬眠から起こす。
    // 育成中がいなければダイレクトに、いるならば一旦別の変数に格納してから移動。ハノイの塔方式。
    $("#userm_yes1").on("click", async function () {
        if (userStatus.nowMonster.name == "") {
            function a() {
                userStatus.nowMonster = Object.create(userStatus.monsterStock[selectMonster]);
            };
            function b() {
                userStatus.monsterStock[selectMonster] = userMonsterEmpty;
            };
            await $("#text2_text").text(userStatus.monsterStock[selectMonster].name + coldSleepText[3]);
            await a();
            await b();
            $("#userm_yn1").css("display", "none");
            $("#close2_box").css("display", "flex");
        } else {
            let sleptMonster = "";
            function a() {
                sleptMonster = userStatus.monsterStock[selectMonster];
            };
            function b() {
                userStatus.monsterStock[selectMonster] = Object.create(userStatus.nowMonster);
            };
            function c() {
                userStatus.nowMonster = Object.create(sleptMonster);
            };
            await $("#text2_text").text(userStatus.nowMonster.name + coldSleepText[2] + userStatus.monsterStock[selectMonster].name + coldSleepText[3]);
            await a();
            await b();
            await c();
            $("#userm_yn1").css("display", "none");
            $("#close2_box").css("display", "flex");
        };
    });

    // 冬眠させる。
    // 上のボックスから空いてる場所に眠らせる。いっぱいの場合は拒否される。
    $("#userm_yes2").on("click", async function () {
        if (userStatus.monsterStock[0].name == "") {
            function a() {
                userStatus.monsterStock[0] = Object.create(userStatus.nowMonster);
            };
            function b() {
                userStatus.nowMonster = Object.create(userMonsterEmpty);
            };
            await $("#text2_text").text(userStatus.nowMonster.name + coldSleepText[1]);
            await a();
            await b();
            $("#userm_yn2").css("display", "none");
            $("#close2_box").css("display", "flex");
        } else if (userStatus.monsterStock[1].name == "") {
            function a() {
                userStatus.monsterStock[1] = Object.create(userStatus.nowMonster);
            };
            function b() {
                userStatus.nowMonster = Object.create(userMonsterEmpty);
            };
            await $("#text2_text").text(userStatus.nowMonster.name + coldSleepText[1]);
            await a();
            await b();
            $("#userm_yn2").css("display", "none");
            $("#close2_box").css("display", "flex");
        } else if (userStatus.monsterStock[2].name == "") {
            function a() {
                userStatus.monsterStock[2] = Object.create(userStatus.nowMonster);
            };
            function b() {
                userStatus.nowMonster = Object.create(userMonsterEmpty);
            };
            await $("#text2_text").text(userStatus.nowMonster.name + coldSleepText[1]);
            await a();
            await b();
            $("#userm_yn2").css("display", "none");
            $("#close2_box").css("display", "flex");
        } else {
            $("#text2_text").text(userStatus.nowMonster.name + coldSleepText[5]);
            $("#userm_yn2").css("display", "none");
            $("#close2_box").css("display", "flex");
        };
    });

    // ショップコマンド。
    // command記述圧縮用。
    function shopCommandZip() {
        $("#home_scene").css("display", "flex");
        $("#text_box").css("display", "flex");
        $("#text_text").text(shopText[selectItem][0] + "を" + shopText[selectItem][1] + shopText[8]);
        $("#shop_yn").css("display", "flex");
    };

    // selectItemから名前と値段をとってきて使い回す。shop関数使うまでもなかったか。
    $("#shop_command").on("click", function () {
        resetScenes();
        resetTimers();
        $("#shop_commandbox").css("display", "flex");
        $("#home_scene").css("display", "flex");
    });

    // ショップ内のモンスター
    $("#shop_commands0").on("click", function () {
        resetScenes();
        $("#shopm_commandbox").css("display", "flex");
        $("#home_scene").css("display", "flex");
    });

    $("#shopm_commands0").on("click", function () {
        selectItem = 0;
        resetScenes();
        shopCommandZip();
    });

    $("#shopm_commands1").on("click", function () {
        selectItem = 1;
        resetScenes();
        shopCommandZip();
    });

    $("#shopm_commands2").on("click", function () {
        selectItem = 2;
        resetScenes();
        shopCommandZip();
    });

    // ショップ内のたべもの。ID紛らわしいのは人間に優しくないかも。
    $("#shop_commands1").on("click", function () {
        resetScenes();
        $("#shopf_commandbox").css("display", "flex");
        $("#home_scene").css("display", "flex");
    });

    $("#shopf_commands0").on("click", function () {
        selectItem = 3;
        resetScenes();
        shopCommandZip();
    });

    $("#shopf_commands1").on("click", function () {
        selectItem = 4;
        resetScenes();
        shopCommandZip();
    });

    $("#shopf_commands2").on("click", function () {
        selectItem = 5;
        resetScenes();
        shopCommandZip();
    });

    $("#shopf_commands3").on("click", function () {
        selectItem = 6;
        resetScenes();
        shopCommandZip();
    });

    $("#shopf_commands4").on("click", function () {
        selectItem = 7;
        resetScenes();
        shopCommandZip();
    });

    $("#shop_yes").on("click", function () {
        if (userStatus.gold >= shopText[selectItem][1]) {
            $("#text_text").text(shopText[selectItem][0] + shopText[9]);
            userStatus.gold = userStatus.gold - shopText[selectItem][1];
            $("#shop_yn").css("display", "none");
            $("#close_box").css("display", "flex");
            $("#gold_box").text("おかね：　" + userStatus.gold);
            if (selectItem <= 2) {
                if (userStatus.nowMonster.name == "") {
                    userStatus.nowMonster = Object.create(userMonsterPackage0[selectItem]);
                    $("#pmimg_box").css("background", userStatus.nowMonster.img);
                } else {
                    $("#text_text").text(shopText[11]);
                };
            } else {
                userStatus.foodStock[selectItem - 3]++;
            };
        } else if (userStatus.gold < shopText[selectItem][1]) {
            $("#text_text").text(shopText[10]);
            $("#shop_yn").css("display", "none");
            $("#close_box").css("display", "flex");
        };
    });


    // モンスターコマンド。中に分岐が多い。
    // 育成コマンドもここにぶん投げているのでとりあえず判定関数がおおい。
    // command記述圧縮用。
    function trainingCommandZip() {
        $("#home_scene").css("display", "flex");
        $("#text_box").css("display", "flex");
        $("#text_text").text(trainingText[trainingNow[2]] + trainingText[3]);
        $("#training_yn").css("display", "flex");
    };

    function mealCommandZip() {
        $("#text_box").css("display", "flex");
        $("#meal_yn").css("display", "flex");
        $("#text_text").text(mealText[mealNow] + mealText[5]);
    };

    // トレーニングによる能力上昇の判定と管理。
    function training() {
        trainingFlag = false;
        let trainingRN = Math.floor(Math.random() * (trainingNow[1] + 1));
        if (trainingRN == 0) {
            $("#text_text").text(trainingText[4]);
        } else {
            userStatus.nowMonster.bonus[trainingNow[2]]++;
            userStatus.nowMonster.evoBonus++
            $("#text_text").text(trainingText[5] + trainingText[trainingNow[2]] + trainingText[6]);
        }
        userStatus.nowMonster.training = trainingInterval;
        iconsManager();
    };

    // 次回食事時間を決める乱数生成。
    function mealRNG() {
        // 一応demo用
        // const mealMax = 1;
        // const mealMin = 1;

        const mealMax = 900;
        const mealMin = 0;
        let mealRN = Math.floor(Math.random() * (mealMax - mealMin));
        userStatus.nowMonster.meal[0] = mealInterval + mealRN;
    };

    // 食事行動の成功失敗判定。
    function meal() {
        if (mealNow == 4) {
            userStatus.nowMonster.evoBonus = userStatus.nowMonster.evoBonus + 3;
            $("#text_text").text(userStatus.nowMonster.name + "は" + mealText[mealNow] + mealText[7]);
            mealFlag = false;
            iconsManager();
            mealRNG();
        } else {
            if (mealNow == userStatus.nowMonster.meal[1]) {
                userStatus.nowMonster.evoBonus--;
                $("#text_text").text(mealText[6]);
                mealFlag = false;
                iconsManager();
                mealRNG();
            } else {
                userStatus.nowMonster.evoBonus++;
                $("#text_text").text(userStatus.nowMonster.name + "は" + mealText[mealNow] + mealText[7]);
                mealFlag = false;
                iconsManager();
                mealRNG();
            };
        };
        userStatus.foodStock[mealNow]--;
        userStatus.nowMonster.meal[1] = mealNow;
    };

    // 次回トイレ時間を決める乱数生成。
    function toiletRNG() {
        const toiletMax = 900;
        const toiletMin = 0;
        toiletRN = Math.floor(Math.random() * (toiletMax - toiletMin));
        userStatus.nowMonster.toilet = toiletInterval + toiletRN;
    };

    // トイレによる能力上昇管理。
    function toilet() {
        userStatus.nowMonster.evoBonus = userStatus.nowMonster.evoBonus + 2;
        toiletFlag = false;
        iconsManager();
        toiletRNG();
    };

    // 次回睡眠時間を決める乱数生成。
    function sleepRNG() {
        const sleepMax = 900;
        const sleepMin = 0;
        sleepRN = Math.floor(Math.random() * (sleepMax - sleepMin));
        userStatus.nowMonster.sleep = sleepInterval + sleepRN;
    };

    // 睡眠による能力上昇管理。
    function sleep() {
        userStatus.nowMonster.evoBonus = userStatus.nowMonster.evoBonus + 3;
        sleepFlag = false;
        iconsManager();
        sleepRNG();
    };

    // やっとモンスターコマンド本編。
    $("#monster_command").on("click", function () {
        resetScenes();
        resetTimers();
        $("#monster_commandbox").css("display", "flex");
        $("#home_scene").css("display", "flex");
    });

    // ステータスコマンド。例によってuserStatus.nowMonsterから数値を参照。
    $("#monster_commands0").on("click", function () {
        resetScenes();
        $("#return_commandbox").css("display", "flex");
        $("#status_scene").css("display", "flex");
        $("#status_img").css("background", userStatus.nowMonster.img);
        $("#status_name").text(userStatus.nowMonster.name);
        $("#status_attack").text("こうげき：" + (userStatus.nowMonster.attack[0] + userStatus.nowMonster.bonus[0]));
        $("#status_magic").text("まほう　：" + (userStatus.nowMonster.magic[0] + userStatus.nowMonster.bonus[1]));
        $("#status_barrier").text("バリア　：" + (userStatus.nowMonster.barrier[0] + userStatus.nowMonster.bonus[2]));
    });

    // トレーニングコマンド
    $("#monster_commands1").on("click", function () {
        resetScenes();
        $("#training_commandbox").css("display", "flex");
        $("#home_scene").css("display", "flex");
    });

    $("#training_commands0").on("click", function () {
        resetScenes();
        trainingNow = userStatus.nowMonster.attack;
        trainingCommandZip();
    });

    $("#training_commands1").on("click", function () {
        resetScenes();
        trainingNow = userStatus.nowMonster.magic;
        trainingCommandZip();
    });

    $("#training_commands2").on("click", function () {
        resetScenes();
        trainingNow = userStatus.nowMonster.barrier;
        trainingCommandZip();
    });

    $("#training_yes").on("click", async function () {
        training();
        $("#training_yn").css("display", "none");
        $("#close_box").css("display", "flex");
    });

    // 食事コマンド
    // foodStockがないものは選択できないようにしている。
    $("#monster_commands2").on("click", function () {
        resetScenes();
        $("#meal_commandbox").css("display", "flex");
        $("#home_scene").css("display", "flex");
        if (userStatus.foodStock[0] == 0) {
            $("#meal_commands0").addClass("untouchable");
        } else {
            $("#meal_commands0").removeClass("untouchable");
        };
        if (userStatus.foodStock[1] == 0) {
            $("#meal_commands1").addClass("untouchable");
        } else {
            $("#meal_commands1").removeClass("untouchable");
        };
        if (userStatus.foodStock[2] == 0) {
            $("#meal_commands2").addClass("untouchable");
        } else {
            $("#meal_commands2").removeClass("untouchable");
        };
        if (userStatus.foodStock[3] == 0) {
            $("#meal_commands3").addClass("untouchable");
        } else {
            $("#meal_commands3").removeClass("untouchable");
        };
        if (userStatus.foodStock[4] == 0) {
            $("#meal_commands4").addClass("untouchable");
        } else {
            $("#meal_commands4").removeClass("untouchable");
        };
    });

    $("#meal_commands0").on("click", function () {
        mealNow = 0;
        mealCommandZip();
    });

    $("#meal_commands1").on("click", function () {
        mealNow = 1;
        mealCommandZip();
    });

    $("#meal_commands2").on("click", function () {
        mealNow = 2;
        mealCommandZip();
    });

    $("#meal_commands3").on("click", function () {
        mealNow = 3;
        mealCommandZip();
    });

    $("#meal_commands4").on("click", function () {
        mealNow = 4;
        mealCommandZip();
    });

    $("#meal_yes").on("click", function () {
        meal();
        $("#meal_yn").css("display", "none");
        $("#close_box").css("display", "flex");
    });

    // トイレコマンド
    $("#monster_commands3").on("click", function () {
        resetScenes();
        $("#home_scene").css("display", "flex");
        $("#text_box").css("display", "flex");
        $("#text_text").text(userStatus.nowMonster.name + toiletText[0]);
        $("#toilet_yn").css("display", "flex");
    });

    $("#toilet_yes").on("click", function () {
        toilet();
        $("#toilet_yn").css("display", "none");
        $("#text_text").text(userStatus.nowMonster.name + toiletText[1]);
        $("#close_box").css("display", "flex");
    });

    // 睡眠コマンド
    $("#monster_commands4").on("click", function () {
        resetScenes();
        $("#home_scene").css("display", "flex");
        $("#text_box").css("display", "flex");
        $("#text_text").text(userStatus.nowMonster.name + sleepText[0]);
        $("#sleep_yn").css("display", "flex");
    });

    $("#sleep_yes").on("click", function () {
        sleep();
        $("#sleep_yn").css("display", "none");
        $("#text_text").text(userStatus.nowMonster.name + sleepText[1]);
        $("#sleep_closebox").css("display", "flex")
    });

    // 睡眠のとじるは演出が入るので別作成。
    $("#sleep_close").on("click", function () {
        setTimeout(function () {
            $("#main_scene").animate({ opacity: '0' }, 500);
        }, 500);
        setTimeout(function () {
            $("#main_commandbox").css("display", "none");
            $("#sleep_closebox").css("display", "none");
            $("#close_box").css("display", "flex");
            $("#text_text").text(userStatus.nowMonster.name + sleepText[2]);
        }, 1000);
        setTimeout(function () {
            $("#main_scene").animate({ opacity: '1' }, 500);
        }, 1500);
    })

    // バトルコマンド。増えているだろうか。
    $("#battle_command").on("click", function () {
        resetScenes();
        resetTimers();
        $("#battle_commandbox").css("display", "flex");
        $("#home_scene").css("display", "flex");
    });


    // フレンドコマンド。Firebaseとのデータのやりとりが多いため記述長し。
    // friendがいなければ一覧はタッチできない。
    // friendWaitがいなければ承認はタッチできない。
    // cheeredがいなければ応援受け取りはタッチできない。
    $("#friend_command").on("click", function () {
        resetScenes();
        resetTimers();
        $("#friend_commandbox").css("display", "flex");
        $("#home_scene").css("display", "flex");
        $("#friend_command").removeClass("inform");
        if (userStatus.friend.length == 0) {
            $("#friend_commands0").addClass("untouchable");
        } else {
            $("#friend_commands0").removeClass("untouchable");
        };
        if (userStatus.friendWait.length == 0) {
            $("#friend_commands2").addClass("untouchable");
        } else {
            $("#friend_commands2").removeClass("untouchable");
        };
        if (userStatus.cheered.length == 0) {
            $("#friend_commands3").addClass("untouchable");
        } else {
            $("#friend_commands3").removeClass("untouchable");
        };
    });

    // 一覧はfriendから作成する。
    // 消去を押すと一発で消去。。。
    $("#friend_commands0").on("click", async function () {
        let friend0 = userStatus.friend[0] ? await userDB.doc(userStatus.friend[0]).get().then(function (doc) {
            return doc.data().name
        }) : "";
        let friend1 = userStatus.friend[1] ? await userDB.doc(userStatus.friend[1]).get().then(function (doc) {
            return doc.data().name
        }) : "";
        let friend2 = userStatus.friend[2] ? await userDB.doc(userStatus.friend[2]).get().then(function (doc) {
            return doc.data().name
        }) : "";
        resetScenes();
        $("#return_commandbox").css("display", "flex");
        $("#friend_box").css("display", "flex");
        if (friend0 == "") {

        } else {
            $("#friend0").css("display", "flex");
            $("#friend0_name").text(friend0);
            if (userStatus.cheeredTime[0] >= cheerInterval) {
                $("#cheer0").removeClass("untouchable");
            } else {

            };
        };
        if (friend1 == "") {

        } else {
            $("#friend1").css("display", "flex");
            $("#friend1_name").text(friend1);
            if (userStatus.cheeredTime[1] >= cheerInterval) {
                $("#cheer1").removeClass("untouchable");
            } else {

            };
        };
        if (friend2 == "") {

        } else {
            $("#friend2").css("display", "flex");
            $("#friend2_name").text(friend2);
            if (userStatus.cheeredTime[2] >= cheerInterval) {
                $("#cheer2").removeClass("untouchable");
            } else {

            };
        };
    });

    // 応援するを押すと相手のcheeredに追加される。
    // 一定時間経たないと再応援はできない。
    $("#cheer0").on("click", async function () {
        await userDB.doc(userStatus.friend[0]).update({
            cheered: firebase.firestore.FieldValue.arrayUnion(userStatus.userID)
        });
        userStatus.cheeredTime[0] = 0;
        $("#cheer0").addClass("untouchable");
    });

    $("#cheer1").on("click", async function () {
        await userDB.doc(userStatus.friend[1]).update({
            cheered: firebase.firestore.FieldValue.arrayUnion(userStatus.userID)
        });
        userStatus.cheeredTime[1] = 0;
        $("#cheer1").addClass("untouchable");
    });

    $("#cheer2").on("click", async function () {
        await userDB.doc(userStatus.friend[2]).update({
            cheered: firebase.firestore.FieldValue.arrayUnion(userStatus.userID)
        });
        userStatus.cheeredTime[2] = 0;
        $("#cheer2").addClass("untouchable");
    });

    // delete押すと一発で消去です。警告を出すのはまた分岐複雑になるので。
    $("#delete0").on("click", async function () {
        userStatus.friend.splice(0, 1);
        userDB.doc(userStatus.userID).update({
            friend: userStatus.friend
        });
        await function () { userStatus.cheeredTime[0] = userStatus.cheeredTime[1]; };
        await function () { userStatus.cheeredTime[1] = userStatus.cheeredTime[2]; };
        userStatus.cheeredTime[2] = cheerInterval;

        save();
        resetScenes();
        $("#main_commandbox").css("display", "flex");
        $("#home_scene").css("display", "flex");
        iconsManager();
        if (userStatus.nowMonster.name == "") {
            $("#monster_command").addClass("untouchable");
            $("#pmimg_box").css("background", "");
        } else {
            $("#monster_command").removeClass("untouchable");
            $("#pmimg_box").css("background", userStatus.nowMonster.img);
        }
        if (timerSwitch == true) {

        } else if (timerSwitch == false) {
            startTimer();
        };
    });

    $("#delete1").on("click", async function () {
        userStatus.friend.splice(1, 1);
        userDB.doc(userStatus.userID).update({
            friend: userStatus.friend
        });
        await function () { userStatus.cheeredTime[1] = userStatus.cheeredTime[2]; };
        userStatus.cheeredTime[2] = cheerInterval;

        save();
        resetScenes();
        $("#main_commandbox").css("display", "flex");
        $("#home_scene").css("display", "flex");
        iconsManager();
        if (userStatus.nowMonster.name == "") {
            $("#monster_command").addClass("untouchable");
            $("#pmimg_box").css("background", "");
        } else {
            $("#monster_command").removeClass("untouchable");
            $("#pmimg_box").css("background", userStatus.nowMonster.img);
        }
        if (timerSwitch == true) {

        } else if (timerSwitch == false) {
            startTimer();
        };
    });

    $("#delete2").on("click", function () {
        userStatus.friend.splice(2, 1);
        userDB.doc(userStatus.userID).update({
            friend: userStatus.friend
        });
        userStatus.cheeredTime[2] = cheerInterval;

        save();
        resetScenes();
        $("#main_commandbox").css("display", "flex");
        $("#home_scene").css("display", "flex");
        iconsManager();
        if (userStatus.nowMonster.name == "") {
            $("#monster_command").addClass("untouchable");
            $("#pmimg_box").css("background", "");
        } else {
            $("#monster_command").removeClass("untouchable");
            $("#pmimg_box").css("background", userStatus.nowMonster.img);
        }
        if (timerSwitch == true) {

        } else if (timerSwitch == false) {
            startTimer();
        };
    });

    // フレンド検索システム。入力したIDと同IDを持つユーザー情報を取得して書き換え。
    $("#friend_commands1").on("click", function () {
        resetScenes();
        $("#return_commandbox").css("display", "flex");
        $("#friend_search").css("display", "flex");
        $("#fsearch_text").text(friendText[0]);
        $("#friend_future").css("display", "none");
        $("#input_search").css("display", "flex");
        $("#search_btn").css("display", "flex");
    });

    // sWはそのIDのユーザーがいるかどうかの判定。初期値はfalseで、いたときにtrue、違うIDでは値変更を行わない。
    $("#search_btn").on("click", async function () {
        const searchUser = $("#input_search").val();
        if (searchUser == userStatus.userID || userStatus.friend.includes(searchUser) == true) {
            $("#fsearch_text").text(friendText[1]);
            $("#input_search").val("");
        } else {
            let sW = false;
            await userDB.get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    const user = doc.data().userID;
                    if (searchUser == user) {
                        newFriend = doc.data();
                        sW = true;
                    } else {

                    };
                });
            });
            if (sW == true) {
                $("#fsearch_text").text(friendText[2]);
                $("#input_search").val("");
                $("#input_search").css("display", "none");
                $("#friend_future").css("display", "flex");
                $("#friend_future").text("username: " + newFriend.name);
                $("#search_btn").css("display", "none");
                $("#shinsei_btn").css("display", "flex");
            } else {
                $("#fsearch_text").text(friendText[1]);
                $("#input_search").val("");
            };
        };
    });

    // 申請すると相手のfriendWait配列を書き換え。承認待ちに。
    $("#shinsei_btn").on("click", async function () {
        await userDB.doc(newFriend.userID).update({
            friendWait: firebase.firestore.FieldValue.arrayUnion(userStatus.userID)
        });
        $("#fsearch_text").text(friendText[3]);
        $("#friend_future").text("");
        $("#shinsei_btn").css("display", "none");
        newFriend = "";
    });

    // フレンド承認。承認すると両者のfriendを書き換える。
    // friendWaitの0番目に対して承認するかどうか効く。一括表示のUIは難しい。
    $("#friend_commands2").on("click", async function () {
        resetScenes();
        let friendBecome;
        await userDB.doc(userStatus.friendWait[0]).get().then(function (doc) {
            friendBecome = doc.data().name;
        });
        $("#return_commandbox").css("display", "flex");
        $("#become_friend").css("display", "flex");
        $("#fbecome_text").text(friendText[4]);
        $("#user_indicate").text("username: " + friendBecome);
        $("#shonin_btn").css("display", "flex");
        $("#block_btn").css("display", "flex");
    });

    // friendは3人まで。
    $("#shonin_btn").on("click", async function () {
        $("#shonin_btn").css("display", "none");
        $("#block_btn").css("display", "none");
        function a() {
            if (userStatus.friend.length < 3) {
                userStatus.friend.push(userStatus.friendWait[0]);
                userDB.doc(userStatus.friendWait[0]).update({
                    friend: firebase.firestore.FieldValue.arrayUnion(userStatus.userID)
                });
                $("#fbecome_text").text(friendText[5]);
            } else {
                $("#fbecome_text").text(friendText[7]);
            }
        };
        await a();
        userStatus.friendWait.shift();
        userDB.doc(userStatus.userID).update({
            friendWait: userStatus.friendWait,
            friend: userStatus.friend
        });
    });

    // 拒否するとfriendWaitから消されるだけです。
    $("#block_btn").on("click", function () {
        $("#fbecome_text").text(friendText[6]);
        $("#shonin_btn").css("display", "none");
        $("#block_btn").css("display", "none");
        userStatus.friendWait.shift();
        userDB.doc(userStatus.userID).update({
            friendWait: userStatus.friendWait
        });
    });

    $("#friend_commands3").on("click", async function () {
        resetScenes();
        let friendC;
        await userDB.doc(userStatus.cheered[0]).get().then(function (doc) {
            friendC = doc.data().name;
        });
        $("#return_commandbox").css("display", "flex");
        $("#cheered_scene").css("display", "flex");
        $("#fcheered_text").text(friendText[8]);
        $("#user_indicate2").text("username: " + friendC);
        $("#cheer_accept").css("display", "flex");
    });

    $("#cheer_accept").on("click", async function () {
        function a() {
            userStatus.gold = userStatus.gold + 50;
            userStatus.cheered.splice(0, 1);
            console.log(userStatus.gold);
        };
        await a();
        await userDB.doc(userStatus.userID).update({
            cheered: userStatus.cheered,
            gold: userStatus.gold
        });
        $("#fcheered_text").text(friendText[9]);
        $("#cheer_accept").css("display", "none");
        $("#gold_box").text("おかね：　" + userStatus.gold);
    });

    // タイトルに戻るコマンド
    $("#title_command").on("click", function () {
        resetScenes();
        resetTimers();
        $("#home_scene").css("display", "flex");
        $("#text_box").css("display", "flex");
        $("#text_text").text(totitleText[0]);
        $("#totitle_yn1").css("display", "flex");
    });

    $("#totitle_yes1").on("click", function () {
        $("#totitle_yn1").css("display", "none");
        $("#totitle_closebox").css("display", "flex");
        $("#text_text").text(totitleText[1]);
        save();
    });

    $("#totitle_close").on("click", function () {
        $("#main_scene").animate({ opacity: '0' }, 500);
        setTimeout(function () {
            $("#loading_scene").fadeIn(500);
            userStatus = "";
            moveSwitch = false;
            clearInterval(timer);
            clearInterval(monsterMove);
            clearInterval(playTimeTimer);
            resetScenes();
            resetTimers();
            $("#pmimg_box").css("background", "");
            $("#main_scene").css("display", "none");
        }, 500);
        setTimeout(function () {
            $("#loading_scene").fadeOut(500);
        }, 2500);
        setTimeout(function () {
            $("#title_scene").fadeIn(500);
            $(".title_scenes").css("display", "none");
            $("#title_scene1").css("display", "flex");
        }, 3000);
    });

    // 進化イベント
    $("#life_next").on("click", function () {
        $("#main_scene").animate({ opacity: '0' }, 500);
        setTimeout(function () {
            $("#main_scene").css("display", "none");
            $("#loading_scene").fadeIn(500);
        }, 500);
        setTimeout(function () {
            $("#loading_scene").fadeOut(500);
        }, 1000);
        setTimeout(function () {
            $("#main_scene").css("display", "flex");
            $("#life_nextbox").css("display", "none");
            if (deathSwitch == true) {
                $("#text_text").text(userStatus.nowMonster.name + lifeText[3]);
                $("#pmimg_box").css("background", "");
                $(".icons").css("display", "none");
                $("#life_closebox").css("display", "flex");
                deathSwitch = false;
            } else if (deathSwitch == false) {
                if (userStatus.nowMonster.name == "宇宙人") {
                    $("#text_text").text(lifeText[5]);
                    $("#close_box").css("display", "flex");
                    $("#pmimg_box").css("background", userStatus.nowMonster.img);
                    iconsManager();
                } else {
                    $("#text_text").text(userStatus.nowMonster.name + lifeText[2]);
                    $("#close_box").css("display", "flex");
                    $("#pmimg_box").css("background", userStatus.nowMonster.img);
                    iconsManager();
                };
            };
            $("#main_scene").animate({ opacity: '1' }, 500);
        }, 1500);
    });

    $("#life_close").on("click", function () {
        $("#main_scene").animate({ opacity: '0' }, 500);
        setTimeout(function () {
            $("#main_scene").css("display", "none");
            $("#loading_scene").fadeIn(500);
        }, 500);
        setTimeout(function () {
            $("#loading_scene").fadeOut(500);
        }, 1000);
        setTimeout(function () {
            $("#main_scene").css("display", "flex");
            if (userStatus.nowMonster.evoBonus < 0) {
                const rn = Math.floor(Math.random() * 5);
                if (rn == 0) {
                    userStatus.nowMonster = userMonsterStatus25;
                    $("#text_text").text(lifeText[6]);
                } else {
                    userStatus.nowMonster = userMonsterStatus0;
                    $("#text_text").text(lifeText[4]);
                };
            } else {
                userStatus.nowMonster = userMonsterStatus0;
                $("#text_text").text(lifeText[4]);
            };
            $("#pmimg_box").css("background", userStatus.nowMonster.img);
            $("#life_closebox").css("display", "none");
            $("#close_box").css("display", "flex");
            userStatus.nowMonster.bonus = bonusSave;
            iconsManager();
            $("#main_scene").animate({ opacity: '1' }, 500);
            bonusSave = "";
        }, 1500);
    });

    // 共通特殊コマンド。
    // 天才なので、noコマンドは全部挙動を同じにしてしまえばかなり記述量が減ることに気づいた。
    $(".closes").on("click", function () {
        // データ同期起動のタイミング。
        // フレンド関係のみの書き換えじゃないと齟齬が生じることに気づいた。時間が巻き戻ってしまう。
        userDB.doc(userStatus.userID).onSnapshot(doc => {
            userStatus.friend = doc.data().friend;
            userStatus.friendWait = doc.data().friendWait;
            userStatus.cheered = doc.data().cheered;
            if (userStatus.friendWait != 0 || userStatus.cheered != 0) {
                $("#friend_command").addClass("inform");
            } else {
                $("#friend_command").removeClass("inform");
            }
        });
        save();
        resetScenes();
        $("#main_commandbox").css("display", "flex");
        $("#home_scene").css("display", "flex");
        iconsManager();
        if (userStatus.nowMonster.name == "") {
            $("#monster_command").addClass("untouchable");
            $("#pmimg_box").css("background", "");
        } else {
            $("#monster_command").removeClass("untouchable");
            $("#pmimg_box").css("background", userStatus.nowMonster.img);
        }
        if (timerSwitch == true) {

        } else if (timerSwitch == false) {
            startTimer();
        };
        if (moveSwitch == true) {

        } else if (moveSwitch == false) {
            monsterMoveStart();
        };

    });

    $(".no").on("click", function () {
        resetScenes();
        mealNow = "";
        $("#main_commandbox").css("display", "flex");
        $("#home_scene").css("display", "flex");
        iconsManager();
        if (userStatus.nowMonster.name == "") {
            $("#monster_command").addClass("untouchable");
            $("#pmimg_box").css("background", "");
        } else {
            $("#monster_command").removeClass("untouchable");
            $("#pmimg_box").css("background", userStatus.nowMonster.img);
        }
        if (timerSwitch == true) {

        } else if (timerSwitch == false) {
            startTimer();
        };
    });

    $(".return").on("click", function () {
        resetScenes();
        $("#main_commandbox").css("display", "flex");
        $("#home_scene").css("display", "flex");
        iconsManager();
        if (userStatus.nowMonster.name == "") {
            $("#monster_command").addClass("untouchable");
            $("#pmimg_box").css("background", "");
        } else {
            $("#monster_command").removeClass("untouchable");
            $("#pmimg_box").css("background", userStatus.nowMonster.img);
        }
        if (timerSwitch == true) {

        } else if (timerSwitch == false) {
            startTimer();
        };
    });

});