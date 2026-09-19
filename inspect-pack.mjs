import fs from 'node:fs';
import path from 'node:path';

const indexPath = 'E:/BaiduNetdiskDownload/h5小游戏源代码网页小游戏在线玩带网站导航html5游戏源码搭建/431套H5小游戏源码大合集 带网页导航/index.html';

if (fs.existsSync(indexPath)) {
  const content = fs.readFileSync(indexPath, 'utf-8');
  const matches = [...content.matchAll(/<a\s+[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)];
  console.log('Total game links in index.html:', matches.length);
  
  const sample = matches.slice(0, 40).map(m => ({
    href: m[1],
    title: m[2].replace(/<[^>]+>/g, '').trim()
  })).filter(x => x.href.includes('games/'));
  
  console.table(sample);
}
