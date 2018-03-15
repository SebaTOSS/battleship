export function createAlphaGo() {
  return {
    name: 'AlphaGo',
    shoots: function() {
      console.log('Shoots AlphaGo');
      return {x: 1, y:1};
    }
  };
}

export function createDeepBlue() {
  return {
    name: 'DeepBlue',
    shoots: function() {
      console.log('Shoots DeepBlue');
      return {x: 1, y:1};
    }
  };
}

export function createRandom() {
  return {
    name: 'Random',
    shoots: function(board) {
      console.log('Shoots Random');
      return {x: 1, y:1};
    }
  };
}

export function buildBot(type) {
  let bot;
  switch (type) {
    case '1':
      bot = createAlphaGo();
      break;
    case '2':
      bot = createDeepBlue();
      break;
    default:
      bot = createRandom();
      break;
  }
  bot.board = [ [{x:0, y:0}, {x:0, y:1}], [{x:1, y:0}, {x:1, y:1, ship: true}] ];
  bot.remainingShips = 1;
  return bot;
}