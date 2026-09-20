import fs from 'node:fs';
import path from 'node:path';

const hostedDir = path.resolve('src/hosted-games');

// 1. Fireboy and Watergirl
const fbwgPath = path.join(hostedDir, 'fireboywatergirl/main.min.js');
if (fs.existsSync(fbwgPath)) {
  let content = fs.readFileSync(fbwgPath, 'utf8');
  const target = 'document.location = "https://html5.api.gamedistribution.com/blocked.html?domain=".concat(t._parentDomain)';
  if (content.includes(target)) {
    content = content.replace(target, 'console.log("bypassed blocked redirect")');
    fs.writeFileSync(fbwgPath, content, 'utf8');
    console.log('✓ Patched fireboywatergirl blocked.html redirect');
  }
}

// 2. Vex 6
const vex6Path = path.join(hostedDir, 'vex6/assets/js/html5.js');
if (fs.existsSync(vex6Path)) {
  let content = fs.readFileSync(vex6Path, 'utf8');
  const target = 'window.location.href="https://html5.api.gamedistribution.com/blocked.html?".concat';
  if (content.includes(target)) {
    content = content.replace(target, 'void 0; // bypassed blocked.html');
    fs.writeFileSync(vex6Path, content, 'utf8');
    console.log('✓ Patched vex6 blocked.html redirect');
  }
}

// 3. Tunnel Rush index.html
const tunnelRushPath = path.join(hostedDir, 'tunnelrush/index.html');
if (fs.existsSync(tunnelRushPath)) {
  let content = fs.readFileSync(tunnelRushPath, 'utf8');
  content = content.replace(/<meta content="deny" http-equiv="X-Frame-Options">/gi, '');
  
  // Also add ID.NET / domain mock if not already present
  if (!content.includes('idnetGetWindowUrl')) {
    const mock = `<script>
    window.idnetGetWindowUrl = function() { return window.location.href; };
    (function() {
      const host = window.location.hostname || 'localhost';
      const mockResponse = JSON.stringify({
        approved_domains: [host, '*', 'localhost', '127.0.0.1', 'unblocked-games-lab.github.io', 'github.io', '.github.io', '.y8.com', 'y8.com'],
        blacklisted_urls: []
      });
      const originalOpen = XMLHttpRequest.prototype.open;
      const originalSend = XMLHttpRequest.prototype.send;
      XMLHttpRequest.prototype.open = function(method, url, ...rest) {
        this._url = url ? url.toString() : '';
        return originalOpen.apply(this, [method, url, ...rest]);
      };
      XMLHttpRequest.prototype.send = function(body) {
        if (this._url && (this._url.includes('protektion-lists') || this._url.includes('id.net') || this._url.includes('y8.com'))) {
          Object.defineProperty(this, 'readyState', { value: 4, writable: true, configurable: true });
          Object.defineProperty(this, 'status', { value: 200, writable: true, configurable: true });
          Object.defineProperty(this, 'statusText', { value: 'OK', writable: true, configurable: true });
          Object.defineProperty(this, 'responseText', { value: mockResponse, writable: true, configurable: true });
          Object.defineProperty(this, 'response', { value: mockResponse, writable: true, configurable: true });
          setTimeout(() => {
            if (typeof this.onreadystatechange === 'function') this.onreadystatechange(new Event('readystatechange'));
            if (typeof this.onload === 'function') this.onload(new Event('load'));
          }, 10);
          return;
        }
        return originalSend.apply(this, arguments);
      };
    })();
    </script>`;
    content = content.replace('<head>', '<head>\n' + mock);
  }
  fs.writeFileSync(tunnelRushPath, content, 'utf8');
  console.log('✓ Patched tunnelrush index.html');
}

// 4. 1v1.lol beforeunload
const lolPath = path.join(hostedDir, '1v1lol/index.html');
if (fs.existsSync(lolPath)) {
  let content = fs.readFileSync(lolPath, 'utf8');
  if (content.includes('window.addEventListener("beforeunload"')) {
    content = content.replace(/window\.addEventListener\("beforeunload"[\s\S]*?\}\);/m, '// beforeunload removed');
    fs.writeFileSync(lolPath, content, 'utf8');
    console.log('✓ Patched 1v1.lol beforeunload popup');
  }
}

// 5. Snow Rider 3D index.html mock
const snowRiderPath = path.join(hostedDir, 'snowrider3d/index.html');
if (fs.existsSync(snowRiderPath)) {
  let content = fs.readFileSync(snowRiderPath, 'utf8');
  if (!content.includes('GD_OPTIONS')) {
    const mock = `<script>
    window["GD_OPTIONS"] = {
      gameId: "snowrider3d",
      onEvent: function(event) {},
      prefix: "gd_"
    };
    </script>`;
    content = content.replace('<head>', '<head>\n' + mock);
    fs.writeFileSync(snowRiderPath, content, 'utf8');
    console.log('✓ Patched snowrider3d index.html');
  }
}

console.log('All sitelock and framebuster patches applied successfully!');
