import fs from 'node:fs';
import path from 'node:path';

const gamesDir = 'E:/BaiduNetdiskDownload/h5小游戏源代码网页小游戏在线玩带网站导航html5游戏源码搭建/431套H5小游戏源码大合集 带网页导航/games';

const folders = fs.readdirSync(gamesDir);
console.log(`Scanning ${folders.length} game folders...`);

const candidates = [];

for (const folder of folders) {
  const p = path.join(gamesDir, folder);
  try {
    if (fs.statSync(p).isDirectory()) {
      const indexHtml = path.join(p, 'index.html');
      let title = folder;
      if (fs.existsSync(indexHtml)) {
        const html = fs.readFileSync(indexHtml, 'utf-8');
        const m = html.match(/<title>([\s\S]*?)<\/title>/i);
        if (m) title = m[1].replace(/\r?\n/g, ' ').trim();
      }
      candidates.push({ folder, title });
    }
  } catch (e) {}
}

console.log(`Total scanned: ${candidates.length}`);

// Filter interesting games
const targetKeywords = [
  '1942', 'boxing', 'block', 'brain', 'jelly', 'soccer', 'golf', 'card', 'puzzle',
  'black', 'bird', 'run', 'jump', 'ninja', 'tank', 'fly', 'moto', 'car',
  'tetris', 'snake', 'chess', 'ball', 'space', 'race', 'shoot', 'defense', 'star',
  'pac', 'sudoku', 'candy', 'fish', 'match', 'bubble', 'alien', 'hero', 'rider',
  'flappy', 'fruit', 'cut', 'tower', 'runner', 'doodle', 'helix', 'stack', 'piano',
  'pingpong', 'tennis', 'bowling', 'archery', 'pool', 'billiards', 'darts'
];

const filtered = candidates.filter(c => {
  const s = (c.folder + ' ' + c.title).toLowerCase();
  return targetKeywords.some(k => s.includes(k));
});

console.log(`Filtered matches: ${filtered.length}`);
console.table(filtered.slice(0, 50));
