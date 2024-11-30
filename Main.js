FBInstant.initializeAsync()
    .then(() => {
        console.log("FB Instant Games Initialized");
        startGame(); // تابع تشغيل اللعبة بعد التهيئة
    });

function startGame() {
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        backgroundColor: '#87CEEB',
        parent: 'game-container',
        scene: {
            preload: preload,
            create: create,
            update: update,
        },
    };

    const game = new Phaser.Game(config);

    let robot, coin, score = 0, scoreText, bgMusic;

    function preload() {
        this.load.image('robot', 'assets/robot.png');
        this.load.image('coin', 'assets/coin.png');
        this.load.audio('bg-music', 'assets/bg-music.mp3');
        this.load.audio('win-sound', 'assets/win-sound.mp3');
    }

    function create() {
        // الموسيقى الخلفية
        bgMusic = this.sound.add('bg-music', { loop: true });
        bgMusic.play();

        // إضافة الروبوت والعملة
        robot = this.add.sprite(100, 300, 'robot').setScale(0.5);
        coin = this.add.sprite(400, 300, 'coin').setScale(0.2);

        // نص النقاط
        scoreText = this.add.text(10, 10, 'Score: 0', {
            fontSize: '32px',
            fill: '#000',
        });

        // جعل العملة تفاعلية
        coin.setInteractive();
        coin.on('pointerdown', () => {
            score += 10;
            scoreText.setText(`Score: ${score}`);
            this.sound.play('win-sound');
            coin.setPosition(
                Phaser.Math.Between(50, 750),
                Phaser.Math.Between(50, 550)
            );
        });

        // حركة الروبوت (بسيطة)
        this.input.keyboard.on('keydown-RIGHT', () => {
            robot.x += 10;
        });
        this.input.keyboard.on('keydown-LEFT', () => {
            robot.x -= 10;
        });
    }

    function update() {
        // أي سلوك ديناميكي يُضاف هنا
    }
}
