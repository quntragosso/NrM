$(async function () {
    const battleText = ["　との対戦が始まった。"];
    // firebase側で更新するはするが、参照用に常にステータスを保持しておいた方が便利である。
    let hostStatus;
    let guestStatus;
    let hostHandStatus;
    let guestHandStatus;
    let hostDamageStatus;
    let guestDamageStatus;
    let serverID;
    let you; //"host" or "guest" 
    let inputName;
    let inputPassword;
    let judge;
    let hostJudge;
    let hostDamage;
    let guestJudge;
    let guestDamage;
    const win = 2;
    const draw = 1;
    const lose = 0.5;
    const maxHp = 100;
    let dbCount1 = 0;
    let matching = false;

    $(document).ready(function () {
        $("#login_scene").css("display", "flex");
    });

    function judgeReset() {
        judge = "";
        hostJudge = "";
        guestJudge = "";
    };

    // "guest"が"unset"のドキュメントを検索し、あれば"guest"なければ"host"が割り当てられる。
    async function hostOrGuest() {
        let areYouGuest = false;
        await battleServer.where("guest", "==", "unset").get().then(function (querySnapshot) {
            querySnapshot.forEach(async function (doc) {
                serverID = doc.id;
                areYouGuest = true;
            });
        });
        if (areYouGuest == true) {
            you = "guest";
        } else {
            you = "host";
        };
    };

    function hostAction() {
        userDB.where("name", "==", inputName).get().then(function (querySnapshot) {
            querySnapshot.forEach(async function (doc) {
                const loadData = doc.data();
                checkPassword = loadData.password;
                if (checkPassword == inputPassword) {
                    const loadMonster = loadData.nowMonster;
                    let setting = {};
                    function a() {
                        serverID = loadData.userID;
                        hostStatus = {
                            name: loadData.name + "　の　" + loadMonster.name,
                            img: loadMonster.img,
                            attack: loadMonster.attack[0] + loadMonster.bonus[0],
                            magic: loadMonster.magic[0] + loadMonster.bonus[1],
                            barrier: loadMonster.barrier[0] + loadMonster.bonus[2],
                            hp: maxHp,
                        };
                        setting = {
                            host: hostStatus,
                            guest: "unset",
                            hostHand: "unset",
                            guestHand: "unset",
                            hostDamage: "unset",
                            guestDamage: "unset"
                        };
                    };
                    await a();
                    $("#loadname").val("");
                    $("#loadpass").val("");
                    battleServer.doc(serverID).set(setting);
                } else {

                };
            });
        });
    };

    function guestAction() {
        userDB.where("name", "==", inputName).get().then(function (querySnapshot) {
            querySnapshot.forEach(async function (doc) {
                const loadData = doc.data();
                checkPassword = loadData.password;
                if (checkPassword == inputPassword) {
                    const loadMonster = loadData.nowMonster;
                    function a() {
                        guestStatus = {
                            name: loadData.name + "　の　" + loadMonster.name,
                            img: loadMonster.img,
                            attack: loadMonster.attack[0] + loadMonster.bonus[0],
                            magic: loadMonster.magic[0] + loadMonster.bonus[1],
                            barrier: loadMonster.barrier[0] + loadMonster.bonus[2],
                            hp: maxHp,
                        };
                    };
                    await a();
                    $("#loadname").val("");
                    $("#loadpass").val("");
                    battleServer.doc(serverID).update({
                        guest: guestStatus
                    });
                } else {

                };
            });
        });
    };

    function matchStart() {
        battleServer.doc(serverID).onSnapshot(doc => {
            hostStatus = doc.data().host;
            guestStatus = doc.data().guest;
            if (doc.data().guest == "unset") {

            } else {
                if (matching == false) {
                    console.log("matchstart起動中");
                    matching = true;
                    setTimeout(function () {
                        $(".scenes").css("display", "none");
                        $("#battle_scene").css("display", "flex");
                        if (you == "host") {
                            $("#battle_text").text(guestStatus.name + battleText[0]);
                            $("#battle_close").css("display", "flex");
                        } else if (you == "guest") {
                            $("#battle_text").text(hostStatus.name + battleText[0]);
                            $("#battle_close").css("display", "flex");
                        };
                    }, 500);
                } else {

                };
            };
        });
    };

    function battleTurn() {
        battleServer.doc(serverID).onSnapshot(async doc => {
            hostStatus = doc.data().host;
            guestStatus = doc.data().guest;
            hostHandStatus = doc.data().hostHand;
            guestHandStatus = doc.data().guestHand;
            hostDamageStatus = doc.data().hostDamage;
            guestDamageStatus = doc.data().guestDamage;
            if (hostHandStatus != "unset" && guestHandStatus != "unset") {
                dbCount1++;
                if (dbCount1 == 1) {
                    let guestDamageNow;
                    let hostDamageNow;
                    function a() { // じゃんけん勝敗判定。
                        judge = (hostHandStatus.handNumber - guestHandStatus.handNumber + 3) % 3;
                        if (judge == 0) {
                            hostJudge = draw;
                            guestJudge = draw;
                        } else if (judge == 1) {
                            hostJudge = win;
                            guestJudge = lose;
                        } else if (judge == 2) {
                            hostJudge = lose;
                            guestJudge = win;
                        };
                    };
                    function b() { // ダメージ計算。
                        if (you == "host") {
                            guestDamageNow = Math.floor(guestHandStatus.damageNumber * guestJudge);
                            hostStatus.hp = hostStatus.hp - guestDamageNow;
                            if (hostStatus.hp <= 0) {
                                hostStatus.hp = 0;
                            } else {

                            };
                        } else if (you == "guest") {
                            hostDamageNow = Math.floor(hostHandStatus.damageNumber * hostJudge);
                            guestStatus.hp = guestStatus.hp - hostDamageNow;
                            if (guestStatus.hp <= 0) {
                                guestStatus.hp = 0;
                            } else {

                            }
                        };
                    };
                    function c() { // ダメージ計算処理を更新。
                        if (you == "host") {
                            battleServer.doc(serverID).update({
                                host: hostStatus,
                                hostHand: "unset",
                                guestDamage: { damage: guestDamageNow, hand: hostHandStatus.hand }
                            });
                        } else if (you == "guest") {
                            battleServer.doc(serverID).update({
                                guest: guestStatus,
                                guestHand: "unset",
                                hostDamage: { damage: hostDamageNow, hand: guestHandStatus.hand }
                            });
                        };
                    };
                    await a();
                    await b();
                    await c();
                    judgeReset();
                } else {

                };
            } else if (hostDamageStatus != "unset" && guestDamageStatus != "unset") {
                $("#battle_text").text(hostStatus.name + "は" + hostDamageStatus.hand + "を選択。" + guestStatus.name + "に" + guestDamageStatus.damage + "のダメージ。" + guestStatus.name + "は" + guestDamageStatus.hand + "を選択。" + hostStatus.name + "に" + hostDamageStatus.damage + "のダメージ。");
                $("#battle_close").css("display", "flex");
                if (you == "host") {
                    battleServer.doc(serverID).update({
                        guestDamage: "unset"
                    });
                } else if (you == "guest") {
                    battleServer.doc(serverID).update({
                        hostDamage: "unset"
                    });
                };
            } else {
                console.log("通信待機中");
            };
        });
    };

    $("#login").on("click", async function () {
        inputName = $("#loadname").val();
        inputPassword = $("#loadpass").val();
        if (inputName == "" || inputPassword == "") {
            alert("項目を入力してください。");
            $("#loadname").val("");
            $("#loadpass").val("");
        } else {
            function a() {
                if (you == "guest") {
                    guestAction();
                } else if (you == "host") {
                    hostAction();
                };
            };
            await hostOrGuest();
            await a();
            $("#loadname").val("");
            $("#loadpass").val("");
            $(".scenes").css("display", "none");
            $("#match_scene").css("display", "flex");
            setTimeout(function () {
                matchStart();
            }, 1000);
        };
    });

    $("#bmattack_left").on("click", function () {
        dbCount1 = 0;
        const hostHandUP = {
            hand: "こうげき",
            handNumber: 0,
            damageNumber: hostStatus.attack
        };
        battleServer.doc(serverID).update({
            hostHand: hostHandUP
        });
        $(".lefthand").addClass("untouchable");
        battleTurn();
    });

    $("#bmmagic_left").on("click", function () {
        dbCount1 = 0;
        const hostHandUP = {
            hand: "まほう",
            handNumber: 1,
            damageNumber: hostStatus.magic
        };
        battleServer.doc(serverID).update({
            hostHand: hostHandUP
        });
        $(".lefthand").addClass("untouchable");
        battleTurn();
    });

    $("#bmbarrier_left").on("click", function () {
        dbCount1 = 0;
        const hostHandUP = {
            hand: "バリア",
            handNumber: 2,
            damageNumber: hostStatus.barrier
        };
        battleServer.doc(serverID).update({
            hostHand: hostHandUP
        });
        $(".lefthand").addClass("untouchable");
        battleTurn();
    });

    $("#bmattack_right").on("click", function () {
        dbCount1 = 0;
        const guestHandUP = {
            hand: "こうげき",
            handNumber: 0,
            damageNumber: guestStatus.attack
        };
        battleServer.doc(serverID).update({
            guestHand: guestHandUP
        });
        $(".righthand").addClass("untouchable");
        battleTurn();
    });

    $("#bmmagic_right").on("click", function () {
        dbCount1 = 0;
        const guestHandUP = {
            hand: "まほう",
            handNumber: 1,
            damageNumber: guestStatus.magic
        };
        battleServer.doc(serverID).update({
            guestHand: guestHandUP
        });
        $(".righthand").addClass("untouchable");
        battleTurn();
    });

    $("#bmbarrier_right").on("click", function () {
        dbCount1 = 0;
        const guestHandUP = {
            hand: "バリア",
            handNumber: 2,
            damageNumber: guestStatus.barrier
        };
        battleServer.doc(serverID).update({
            guestHand: guestHandUP
        });
        $(".righthand").addClass("untouchable");
        battleTurn();
    });

    $("#battle_close").on("click", function () {
        $(".lefthand").removeClass("untouchable");
        $(".righthand").removeClass("untouchable");
        $("#bmHP_left").text(hostStatus.hp + " / 100");
        $("#bmimg_left").css("background-image", hostStatus.img);
        $("#bmname_left").text(hostStatus.name);
        $("#bmHP_right").text(guestStatus.hp + " / 100");
        $("#bmimg_right").css("background-image", guestStatus.img);
        $("#bmname_right").text(guestStatus.name);
        $("#battle_text").text("");
        $("#battle_close").css("display", "none");
        if (you == "host") {
            if (hostStatus.hp == 0) {
                $("#battle_text").text(guestStatus.name + "との勝負に敗北した。");
                $("#battle_end").css("display", "flex");
            } else if (guestStatus.hp == 0 && hostStatus.hp > 0) {
                $("#battle_text").text(guestStatus.name + "との勝負に勝利した！！");
                $("#battle_end").css("display", "flex");
            } else {
                $("#bmhands_left").css("display", "flex");
                $("#bmbrank_right").css("display", "flex");
            };
        } else if (you == "guest") {
            if (guestStatus.hp == 0) {
                $("#battle_text").text(hostStatus.name + "との勝負に敗北した。");
                $("#battle_end").css("display", "flex");
            } else if (hostStatus.hp == 0 && guestStatus.hp > 0) {
                $("#battle_text").text(hostStatus.name + "との勝負に勝利した！！");
                $("#battle_end").css("display", "flex");
            } else {
                $("#bmbrank_left").css("display", "flex");
                $("#bmhands_right").css("display", "flex");
            };
        };
    });

    $("#battle_end").on("click", function () {
        if (you == "host") {
            battleServer.doc(serverID).delete()
        };
        setTimeout(function () {
            location.reload();
        }, 500);
    });

});
