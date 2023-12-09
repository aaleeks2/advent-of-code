const fs = require("fs");
const INPUT = 'input.txt';
const TEST_INPUT = 'test_input.txt';
const IS_TEST = true;
let count = 0;

const SYMBOLS_DICT = {
    "A": 14,
    "K": 13,
    "Q": 12,
    "J": 11,
    "T": 10
};

const HANDS_BY_RANK = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
}

fs.readFile(!IS_TEST ? TEST_INPUT : INPUT, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const handsWithRanks = data.replace('\r', '').split('\n').map(line => {
    const splittedLine = line.split(' ');
    const hand = splittedLine[0].split('');
    const bid = splittedLine[1].replace('\r', '');
    let rank;
    const set = new Set(hand);

    if(set.size == 1) {
        rank = 7;
    } else if(set.size == 5) {
        rank = 1;
    }
    
    if(!rank) {
        let groupCounts = {};
        hand.forEach(card => {
            if(groupCounts[card]) {
                groupCounts[card]++;
            } else {
                groupCounts[card] = 1;
            }
        });

        const entries = Object.entries(groupCounts);
        if(entries.length == 2) {
            rank = Math.abs(parseInt(entries[0][1]) - parseInt(entries[1][1])) === 3 ? 6 : 5;
        } else if(entries.length == 3) {
            rank = entries.map(x => x[1]).sort((a, b) => b - a)[0] === 3 ? 4 : 3; 
        } else {
            rank = 2;
        }
    }

    return { hand: hand.join(''), bid: bid, rank: rank};
  });
  
  handsWithRanks.forEach(hand => {
    HANDS_BY_RANK[hand.rank].push(hand);
  });

  const res = Object.entries(HANDS_BY_RANK).reduce((accumulator, currentVal) => {
    currentVal[1].sort(compareHandsWithSameRank);
    return accumulator + countResult(currentVal[1]);
  }, 0);
  
  console.log(res);
});

const countResult = (handsWithRanks) => {
    return handsWithRanks.reduce((accumulator, current) => {
        count++;
        const res = current.bid * count;
        return accumulator + res;
    }, 0);
}

const compareHandsWithSameRank = (a, b) => {
    for(let i = 0; i < a.hand.length; ++i) {
        if(a.hand[i] !== b.hand[i]) {
            const aMapped = SYMBOLS_DICT[a.hand[i]] 
                ? SYMBOLS_DICT[a.hand[i]]
                : a.hand[i];
            
            const bMapped = SYMBOLS_DICT[b.hand[i]]
                ? SYMBOLS_DICT[b.hand[i]]
                : b.hand[i];
            
            return aMapped - bMapped;
        }
    }
}