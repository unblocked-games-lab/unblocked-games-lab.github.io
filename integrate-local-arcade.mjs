import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const SRC_GAMES_DIR = path.join(ROOT_DIR, 'src', 'hosted-games');
const SOURCE_BASE = 'E:/BaiduNetdiskDownload/h5小游戏源代码网页小游戏在线玩带网站导航html5游戏源码搭建/431套H5小游戏源码大合集 带网页导航/games';

if (!fs.existsSync(SRC_GAMES_DIR)) {
  fs.mkdirSync(SRC_GAMES_DIR, { recursive: true });
}

// 8 Top Hand-Picked Classic Universal Games
const selectedGames = [
  {
    srcFolder: '1942',
    slug: '1942-arcade',
    name: '1942 Classic Arcade',
    category: 'Shooting',
    tagline: 'Legendary WWII vertical scrolling fighter plane combat',
    seoTitle: '1942 Unblocked - Play WWII Air Combat | Unblocked Games Lab',
    seoDescription: 'Play 1942 arcade unblocked in your browser. Pilot your P-38 Lightning fighter, dodge enemy fire, and take down enemy fleets in 60 FPS.',
    h1: '1942 Classic Arcade Unblocked',
    rating: 4.93,
    plays: '165,000+',
    icon: '✈️',
    gradient: 'from-sky-600 to-slate-800',
    controls: [
      { key: 'Arrow Keys / WASD / Mouse', action: 'Steer Fighter Plane' },
      { key: 'Space / Left Click', action: 'Fire Machine Guns' },
      { key: 'B / Right Click', action: 'Loop-the-Loop Special Evasion' }
    ],
    overview: '1942 is the legendary vertical scrolling shooter arcade game set in the Pacific theater of World War II. Pilot a Lockheed P-38 Lightning fighter plane, dogfight squadrons of enemy aircraft, sink naval battleships, and execute tactical aerial loop-the-loops to evade dense bullet storms.',
    howToPlay: 'Steer your plane across the screen, shooting down formations of enemy bombers and fighters. Collect power-up icons to gain twin companion wingmen and heavier firepower.',
    tips: [
      'Save your special evasive loops for when you are completely trapped by bullet patterns.',
      'Defeat full red enemy plane formations to spawn special score and weapon power-ups.',
      'Stay near the lower third of the screen to give yourself maximum reaction time.'
    ],
    faq: [
      {
        q: 'Is this the full classic 1942 arcade game?',
        a: 'Yes, running on our zero-lag self-hosted HTML5 emulator engine directly on GitHub Pages.'
      }
    ]
  },
  {
    srcFolder: '3dboxing',
    slug: '3d-boxing',
    name: '3D Boxing Ring',
    category: 'Action',
    tagline: 'Immersive first-person 3D knockout boxing brawl',
    seoTitle: '3D Boxing Unblocked - Play Fighting Game | Unblocked Games Lab',
    seoDescription: 'Play 3D Boxing unblocked in your browser. Throw jabs, hooks, and uppercuts to KO championship contenders in full 3D WebGL.',
    h1: '3D Boxing Unblocked',
    rating: 4.88,
    plays: '140,000+',
    icon: '🥊',
    gradient: 'from-red-600 to-rose-800',
    controls: [
      { key: 'A / D or Left / Right', action: 'Dodge Left / Right & Weave' },
      { key: 'J / K / L', action: 'Left Jab, Right Cross, Heavy Uppercut' },
      { key: 'Space', action: 'Guard / Block Incoming Punches' }
    ],
    overview: 'Step inside the championship squared circle in 3D Boxing. Face off against aggressive heavyweight boxers, read your opponent stance, weave past heavy blows, and unleash devastating counter-punch combos to score decisive knockouts.',
    howToPlay: 'Watch your opponent wind-up animations. Dodge when they swing, then retaliate with fast multi-hit combinations while their guard is broken.',
    tips: [
      'Never punch continuously while your stamina meter is low.',
      'Counter-punching immediately after a successful dodge deals 2x critical damage.',
      'Keep your guard raised when trapped against the ropes.'
    ],
    faq: [
      {
        q: 'Does 3D Boxing support keyboard controls on Chromebooks?',
        a: 'Yes, full responsive WASD and Arrow key mappings are supported.'
      }
    ]
  },
  {
    srcFolder: 'blackjack',
    slug: 'blackjack-21',
    name: 'Blackjack 21 Master',
    category: 'Puzzle',
    tagline: 'Casino style classic 21 card strategy and dealer duels',
    seoTitle: 'Blackjack Unblocked - Play 21 Card Game | Unblocked Games Lab',
    seoDescription: 'Play classic Blackjack 21 unblocked online. Practice hit, stand, double down, and split strategy against the dealer with free chips.',
    h1: 'Blackjack 21 Unblocked',
    rating: 4.91,
    plays: '175,000+',
    icon: '🃏',
    gradient: 'from-emerald-700 to-slate-900',
    controls: [
      { key: 'Hit Button / H', action: 'Draw Another Card' },
      { key: 'Stand Button / S', action: 'Hold Total and End Turn' },
      { key: 'Double / Split Buttons', action: 'Double Bet or Split Matching Pair' }
    ],
    overview: 'Blackjack 21 is the authentic browser simulation of the world-famous casino table game. Test your probability and mental math skills against the virtual dealer. Aim for a hand total of 21 without busting, and master optimal strategy charts completely risk-free.',
    howToPlay: 'Place your chip bet, receive two cards, and decide whether to Hit for additional cards or Stand with your current hand score. Beat the dealer score or let them bust to win 1:1 or 3:2 on natural Blackjacks.',
    tips: [
      'Always Double Down on a hard 11 when the dealer shows a 2 through 10.',
      'Always split Aces and 8s, but never split 10s or 5s.',
      'Stand on 12-16 if the dealer up-card is 4, 5, or 6.'
    ],
    faq: [
      {
        q: 'Is real money required to play?',
        a: 'No, Blackjack 21 uses 100% free virtual chips with instant free refills.'
      }
    ]
  },
  {
    srcFolder: 'blockgame',
    slug: 'classic-block-puzzle',
    name: 'Classic Block Puzzle',
    category: 'Puzzle',
    tagline: 'Falling tetromino block clearing and line stacking classic',
    seoTitle: 'Block Puzzle Unblocked - Play Free Online | Unblocked Games Lab',
    seoDescription: 'Play Classic Block Puzzle unblocked. Rotate falling tetromino blocks, clear horizontal lines, and chase endless high-score marathons.',
    h1: 'Classic Block Puzzle Unblocked',
    rating: 4.95,
    plays: '290,000+',
    icon: '🧱',
    gradient: 'from-indigo-600 to-blue-800',
    controls: [
      { key: 'Left / Right Arrow', action: 'Move Falling Block' },
      { key: 'Up Arrow / Space', action: 'Rotate Block' },
      { key: 'Down Arrow', action: 'Soft Drop (Speed Up)' }
    ],
    overview: 'Classic Block Puzzle delivers timeless geometric line-clearing arcade gameplay. Manipulate falling multi-colored tetromino pieces into solid horizontal rows to clear lines and prevent the stack from reaching the ceiling.',
    howToPlay: 'Guide each falling piece into the matrix grid. Complete horizontal lines to clear blocks and score points. Set up multi-line clears (Tetris) for exponential point multipliers.',
    tips: [
      'Keep the surface of your block stack as flat and even as possible.',
      'Reserve an open lane on the far right column to execute 4-line Tetris clears with long straight bars.',
      'Do not panic as speed increases — look at the upcoming Next Piece preview window.'
    ],
    faq: [
      {
        q: 'Does it save high scores?',
        a: 'Yes, your all-time high score and level records save locally in browser storage.'
      }
    ]
  },
  {
    srcFolder: 'coreball',
    slug: 'core-ball',
    name: 'Core Ball Arcade',
    category: 'Skill',
    tagline: 'Hyper-precise needle pin shooting into rotating central cores',
    seoTitle: 'Core Ball Unblocked - Play Free Online | Unblocked Games Lab',
    seoDescription: 'Play Core Ball unblocked reflex skill game. Launch numbered needle pins into the rotating core sphere without colliding with other pins.',
    h1: 'Core Ball Unblocked',
    rating: 4.89,
    plays: '185,000+',
    icon: '🎯',
    gradient: 'from-amber-600 to-rose-700',
    controls: [
      { key: 'Left Mouse Click / Space / Touch', action: 'Launch Pin into Core' }
    ],
    overview: 'Core Ball (inspired by the viral hit aa) is a minimalist, hyper-addictive reflex arcade game. A central sphere rotates at varying speeds and directions in the center. Your mission is to launch all available needle pins into the rotating sphere without hitting existing pins.',
    howToPlay: 'Tap the screen or press Space to shoot pins into open gaps on the rotating core. Advance across 60+ increasingly tricky stages with reversing rotation and obstacle barriers.',
    tips: [
      'Find the rhythmic cadence of the core rotation before firing consecutive pins.',
      'Watch for sudden direction reversals that occur every few seconds on higher levels.',
      'Fire in quick double-taps when you spot wide open gaps on the core.'
    ],
    faq: [
      {
        q: 'How many stages are in Core Ball?',
        a: 'Over 60 challenging stages with unique rotation physics and obstacle speeds.'
      }
    ]
  },
  {
    srcFolder: 'cutfruit',
    slug: 'fruit-slicer',
    name: 'Fruit Slicer Classic',
    category: 'Skill',
    tagline: 'Juicy blade swiping and explosive fruit combo slashing',
    seoTitle: 'Fruit Slicer Unblocked - Play Ninja Slash | Unblocked Games Lab',
    seoDescription: 'Play Fruit Slicer unblocked (Fruit Ninja style). Slice flying watermelons, bananas, and pineapples while dodging explosive bombs.',
    h1: 'Fruit Slicer Unblocked',
    rating: 4.92,
    plays: '240,000+',
    icon: '🍉',
    gradient: 'from-emerald-500 to-green-700',
    controls: [
      { key: 'Mouse Click & Drag / Touch Swipe', action: 'Slash Blade Across Screen' }
    ],
    overview: 'Fruit Slicer brings classic fruit-slashing arcade action directly to your browser. Swipe your blade across flying watermelons, oranges, coconuts, and strawberries to create juicy multi-fruit combo slices while avoiding dangerous explosive bombs.',
    howToPlay: 'Drag your mouse cursor rapidly across airborne fruits before they fall off-screen. Chain 3 or more fruits in a single slice for combo score multipliers. Avoid slicing any black bombs.',
    tips: [
      'Wait for multiple fruits to cluster at the peak of their arc before slicing through them all in one stroke.',
      'Do not swipe frantically — calm, precise slices prevent accidental bomb hits.',
      'Slice special glowing fruit to activate frenzy and slow-motion time power-ups.'
    ],
    faq: [
      {
        q: 'Does it work smoothly with Chromebook trackpads?',
        a: 'Yes, ultra-responsive mouse and trackpad swipe physics are fully supported.'
      }
    ]
  },
  {
    srcFolder: 'golfblast',
    slug: 'golf-blast',
    name: 'Golf Blast 3D',
    category: 'Sports',
    tagline: 'Casual mini-golf trajectory aiming and hole-in-one puzzles',
    seoTitle: 'Golf Blast Unblocked - Play Mini Golf Game | Unblocked Games Lab',
    seoDescription: 'Play Golf Blast unblocked mini golf game. Aim trajectory, calculate bank shots, and sink hole-in-one putts across 30+ creative green courses.',
    h1: 'Golf Blast Unblocked',
    rating: 4.9,
    plays: '150,000+',
    icon: '⛳',
    gradient: 'from-lime-500 to-emerald-700',
    controls: [
      { key: 'Mouse Click & Drag', action: 'Aim Shot Power & Direction' },
      { key: 'Release Click', action: 'Putt Ball Towards Hole' }
    ],
    overview: 'Golf Blast is a polished physics-based mini-golf puzzle game. Navigate undulating greens, bounce off wooden walls, jump over sand traps, and sink the ball into the cup with the fewest strokes possible.',
    howToPlay: 'Click and drag backwards from your golf ball to set shot trajectory and power. Release to launch the ball. Score an albatross or hole-in-one to earn 3 gold stars on each level.',
    tips: [
      'Use bank shots off side cushions to navigate around difficult sand traps.',
      'Do not always use max power — gentle putts prevent your ball from rolling off the green.',
      'Collect bonus gems scattered on the fairway before sinking the final putt.'
    ],
    faq: [
      {
        q: 'How many golf courses are available?',
        a: 'Over 30 handcrafted levels with increasing terrain complexity and obstacles.'
      }
    ]
  },
  {
    srcFolder: 'saolei',
    slug: 'classic-minesweeper',
    name: 'Classic Minesweeper',
    category: 'Puzzle',
    tagline: 'The iconic retro grid logic and mine-defusing challenge',
    seoTitle: 'Minesweeper Unblocked - Play Free Online | Unblocked Games Lab',
    seoDescription: 'Play Classic Minesweeper unblocked in your browser. Uncover safe tiles, flag hidden mines, and solve Easy, Medium, and Expert grids.',
    h1: 'Classic Minesweeper Unblocked',
    rating: 4.96,
    plays: '310,000+',
    icon: '💣',
    gradient: 'from-slate-600 to-zinc-800',
    controls: [
      { key: 'Left Click', action: 'Uncover Safe Square' },
      { key: 'Right Click / Long Press', action: 'Place Flag on Suspected Mine' },
      { key: 'Smiley Face Icon', action: 'Restart Game Board' }
    ],
    overview: 'Classic Minesweeper is the timeless single-player logic puzzle created for Windows. Clear a rectangular minefield grid without detonating any hidden naval mines, using number clues on revealed tiles that indicate how many adjacent mines touch each square.',
    howToPlay: 'Left click any square to reveal the board. Numbers (1 to 8) tell you exactly how many mines surround that square. Right click to plant red warning flags on confirmed mine locations.',
    tips: [
      'Master the basic 1-1 and 1-2 patterns along outer corners to identify safe squares instantly.',
      'Your very first click is always 100% safe and guaranteed to open an expanse of tiles.',
      'Flag all known mines before attempting risky guesses in dense corners.'
    ],
    faq: [
      {
        q: 'Does it support Easy, Medium, and Expert difficulty levels?',
        a: 'Yes, full 9x9 (Easy), 16x16 (Medium), and 30x16 (Expert) board sizes with timer tracking are included.'
      }
    ]
  }
];

// 1. Copy Selected Game Folders into src/hosted-games/
function copyDirSync(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('Copying selected games from Baidu folder to src/hosted-games/...');

for (const g of selectedGames) {
  const sourceGamePath = path.join(SOURCE_BASE, g.srcFolder);
  const targetGamePath = path.join(SRC_GAMES_DIR, g.srcFolder);
  
  if (fs.existsSync(sourceGamePath)) {
    copyDirSync(sourceGamePath, targetGamePath);
    console.log(`✓ Copied ${g.srcFolder} -> src/hosted-games/${g.srcFolder}`);
  } else {
    console.error(`✗ Source folder missing: ${sourceGamePath}`);
  }
}

// 2. Read existing games.json and append self-hosted games
const existingGames = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'games.json'), 'utf-8'));

for (const g of selectedGames) {
  const exists = existingGames.some(x => x.slug === g.slug);
  if (!exists) {
    existingGames.push({
      slug: g.slug,
      name: g.name,
      isHero: false,
      category: g.category,
      tagline: g.tagline,
      seoTitle: g.seoTitle,
      seoDescription: g.seoDescription,
      h1: g.h1,
      rating: g.rating,
      plays: g.plays,
      iframeUrl: `https://unblocked-games-lab.github.io/hosted-games/${g.srcFolder}/index.html`,
      icon: g.icon,
      gradient: g.gradient,
      controls: g.controls,
      overview: g.overview,
      howToPlay: g.howToPlay,
      tips: g.tips,
      faq: g.faq
    });
  }
}

fs.writeFileSync(path.join(ROOT_DIR, 'games.json'), JSON.stringify(existingGames, null, 2));
console.log(`✓ Updated games.json (Total games: ${existingGames.length})`);
