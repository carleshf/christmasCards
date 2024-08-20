class MenuScene extends Phaser.Scene {
  constructor() {
      super({ key: 'MenuScene' });
  }

  preload ()
  {
    this.load.image('block', 'assets/input/block.png');
    this.load.image('rub', 'assets/input/rub.png');
    this.load.image('end', 'assets/input/end.png');
    this.load.bitmapFont('arcade', 'assets/fonts/arcade.png', 'assets/fonts/arcade.xml');
  }

  create() {
    const maxlen = 4;
    const chars = [
      [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ],
      [ 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T' ],
      [ 'U', 'V', 'W', 'X', 'Y', 'Z', '.', '-', '<', '>' ]
    ];
    const cursor = { x: 0, y: 0 };
    let name = '1234';

    this.add.bitmapText(90, 60, 'arcade', 'WELCOME TO THE GAME').setTint(0xff0000);

    this.add.bitmapText(85, 160, 'arcade', 'ENTER YOUR CODENAME');
    const playerText = this.add.bitmapText(315, 260, 'arcade', name).setTint(0xff8200);

    const input = this.add.bitmapText(130, 350, 'arcade', 'ABCDEFGHIJ\n\nKLMNOPQRST\n\nUVWXYZ.-').setLetterSpacing(20);

    input.setInteractive();

    const rub = this.add.image(input.x + 430, input.y + 148, 'rub');
    const end = this.add.image(input.x + 482, input.y + 148, 'end');

    const block = this.add.image(input.x - 10, input.y - 2, 'block').setOrigin(0);


    this.input.keyboard.on('keyup', event => {
      if (event.keyCode === 37) {
          //  left
          if (cursor.x > 0) {
              cursor.x--;
              block.x -= 52;
          }
      } else if (event.keyCode === 39) {
          //  right
          if (cursor.x < 9) {
              cursor.x++;
              block.x += 52;
          }
      } else if (event.keyCode === 38) {
          //  up
          if (cursor.y > 0) {
              cursor.y--;
              block.y -= 64;
          }
      } else if (event.keyCode === 40) {
          //  down
          if (cursor.y < 2) {
              cursor.y++;
              block.y += 64;
          }
      } else if (event.keyCode === 13 || event.keyCode === 32) {
        //  Enter or Space
        if (cursor.x === 9 && cursor.y === 2 && name.length > 0) {
            //  Submit
            this.scene.start('CreateJoinRoomScene', { name })
        }
        else if (cursor.x === 8 && cursor.y === 2 && name.length > 0) {
            //  Rub
            name = name.substr(0, name.length - 1);
            playerText.text = name;
        } else if (name.length < maxlen) {
            //  Add
            name = name.concat(chars[cursor.y][cursor.x]);
            playerText.text = name;
        }
      }
    });

    input.on('pointermove', (pointer, x, y) => {
      const cx = Phaser.Math.Snap.Floor(x, 52, 0, true);
      const cy = Phaser.Math.Snap.Floor(y, 64, 0, true);
      const char = chars[cy][cx];

      cursor.x = cx;
      cursor.y = cy;

      block.x = input.x - 10 + (cx * 52);
      block.y = input.y - 2 + (cy * 64);
    }, this);

    input.on('pointerup', (pointer, x, y) => {
      const cx = Phaser.Math.Snap.Floor(x, 52, 0, true);
      const cy = Phaser.Math.Snap.Floor(y, 64, 0, true);
      const char = chars[cy][cx];

      cursor.x = cx;
      cursor.y = cy;

      block.x = input.x - 10 + (cx * 52);
      block.y = input.y - 2 + (cy * 64);

      if (char === '<' && name.length > 0) {
          //  Rub
          name = name.substr(0, name.length - 1);
          playerText.text = name;
      }
      else if (char === '>' && name.length > 0) {
          //  Submit
          this.scene.start('CreateJoinRoomScene', { name })
      } else if (name.length < maxlen) {
          //  Add
          name = name.concat(char);
          playerText.text = name;
      }
    }, this);
  }
}


class CreateOrJoinRoom extends Phaser.Scene {
  constructor() {
      super({ key: 'CreateJoinRoomScene' });
  }

  init(data) {
    // Receiving player name from the previous scene
    this.playerName = data.name;
  }

  create() {;
    this.add.bitmapText(80, 60, 'arcade', 'WELCOME PLAYER ' + this.playerName).setTint(0xff0000);
  }
}


// game.js

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  scene: [MenuScene, CreateOrJoinRoom],
  dom: {
    createContainer: true,
  },
};

const game = new Phaser.Game(config);