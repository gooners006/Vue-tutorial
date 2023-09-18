const playerInitialHealth = 100;
const monsterInitialHealth = 300;

function rollDice(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

const gameStatus = {
  WIN: "Win",
  LOST: "Lost",
  DRAW: "Draw",
};

const actor = {
  PLAYER: "Player",
  MONSTER: "Monster",
};

const action = {
  ATTACK: "attack",
  SP_ATTACK: "special attack",
  HEAL: "heal",
  DIED: "died",
  MISSED: "missed",
};

function getInitialData() {
  return {
    playerHealth: playerInitialHealth,
    monsterHealth: monsterInitialHealth,
    battleLog: [],
    currentRound: 0,
    specialAttackCooldown: 0,
    healCooldown: 0,
    surrenderConfirmed: 0,
    result: "",
  };
}

const app = Vue.createApp({
  data() {
    return getInitialData();
  },
  methods: {
    attack() {
      this.currentRound += 1;
      const attackDmg = rollDice(1, 8) + 1;
      this.monsterHealth -= attackDmg;
      this.addLog(actor.PLAYER, action.ATTACK, `${attackDmg} damage`);
      this.monsterAttack();
    },
    monsterAttack() {
      const attackRoll = rollDice(1, 20);
      if (attackRoll > 2) {
        const damageRoll = rollDice(2, 2 * 6) + 2;
        this.playerHealth -= damageRoll;
        this.addLog(actor.MONSTER, action.ATTACK, `${damageRoll} damage`);
      } else {
        this.addLog(actor.MONSTER, action.MISSED);
      }
    },
    specialAttack() {
      this.currentRound += 1;
      this.specialAttackCooldown = 3;
      const attackDmg = rollDice(4, 4 * 8) + 4;
      this.monsterHealth -= attackDmg;
      this.addLog(actor.PLAYER, action.SP_ATTACK, `${attackDmg} damage`);
      this.monsterAttack();
    },
    heal() {
      this.currentRound += 1;
      this.healCooldown = 2;
      const healAmount = rollDice(4, 4 * 4) + 2;
      if (this.playerHealth + healAmount > playerInitialHealth) {
        this.addLog(
          actor.PLAYER,
          action.HEAL,
          `${playerInitialHealth - this.playerHealth} hit points`
        );
        this.playerHealth = playerInitialHealth;
      } else {
        this.playerHealth += healAmount;
        this.addLog(actor.PLAYER, action.HEAL, `${healAmount} hit points`);
      }
      this.monsterAttack();
    },
    surrender() {
      this.surrenderConfirmed += 1;
      if (this.surrenderConfirmed === 2) {
        this.result = gameStatus.LOST;
      }
    },
    restartGame() {
      Object.assign(this.$data, getInitialData());
    },
    addLog(who, what, value = "") {
      const className = [];
      switch (who) {
        case actor.PLAYER:
          className.push("log--player");
          break;
        case actor.MONSTER:
          className.push("log--monster");
          break;

        default:
          break;
      }

      switch (what) {
        case action.ATTACK:
        case action.SP_ATTACK:
          className.push("log--damage");
          break;
        case action.HEAL:
          className.push("log--heal");
          break;

        default:
          break;
      }

      this.battleLog.unshift({
        who,
        what,
        value,
        className,
      });
    },
  },
  computed: {
    monsterHealthBarWidth() {
      if (this.monsterHealth < 0) {
        return { width: 0 };
      }
      return {
        width:
          ((this.monsterHealth / monsterInitialHealth) * 100).toFixed(2) + "%",
      };
    },
    playerHealthBarWidth() {
      if (this.playerHealth < 0) {
        return { width: 0 };
      }
      return {
        width:
          ((this.playerHealth / playerInitialHealth) * 100).toFixed(2) + "%",
      };
    },
    disableSpecialAttack() {
      return this.specialAttackCooldown !== 0;
    },
    disableHeal() {
      return this.healCooldown !== 0;
    },
    showSurrenderConfirmation() {
      return this.surrenderConfirmed === 1;
    },
    gameOverText() {
      let text = "";
      switch (this.result) {
        case gameStatus.WIN:
          text = "Victory!!!";
          break;
        case gameStatus.LOST:
          text = "You Lost!!!";
          break;
        case gameStatus.DRAW:
          text = "You died, but the day is saved!!!";
          break;

        default:
          break;
      }

      return text;
    },
  },
  watch: {
    currentRound() {
      if (this.specialAttackCooldown > 0) {
        this.specialAttackCooldown -= 1;
      }

      if (this.healCooldown > 0) {
        this.healCooldown -= 1;
      }

      this.surrenderConfirmed = 0;
    },
    playerHealth(value) {
      if (value <= 0) {
        this.addLog(actor.PLAYER, action.DIED);

        if (this.monsterHealth <= 0) {
          this.result = gameStatus.DRAW;
        } else {
          this.result = gameStatus.LOST;
        }
      }
    },
    monsterHealth(value) {
      if (value <= 0) {
        this.addLog(actor.MONSTER, action.DIED);

        if (this.playerHealth <= 0) {
          this.result = gameStatus.DRAW;
        } else {
          this.result = gameStatus.WIN;
        }
      }
    },
  },
});

app.mount("#game");
