import fs from 'node:fs';
import path from 'node:path';

const baseDir = 'E:/BaiduNetdiskDownload/h5小游戏源代码网页小游戏在线玩带网站导航html5游戏源码搭建';

if (!fs.existsSync(baseDir)) {
  console.log('Path does not exist:', baseDir);
  process.exit(1);
}

const entries = fs.readdirSync(baseDir, { withFileTypes: true });

for (const entry of entries) {
  if (entry.isDirectory()) {
    const fullPath = path.join(baseDir, entry.name);
    try {
      const items = fs.readdirSync(fullPath);
      console.log(`\n========================================`);
      console.log(`📁 Directory: ${entry.name} (${items.length} files/dirs)`);
      console.log(`Sample items (first 15):`);
      console.log(items.slice(0, 15).join('\n'));
    } catch (err) {
      console.error(`Error reading ${entry.name}:`, err.message);
    }
  }
}
