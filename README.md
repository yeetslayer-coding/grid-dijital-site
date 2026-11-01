# Grid Dijital

Grid Dijital'in HTML, CSS ve JavaScript ile hazırlanan web sitesi.

- **Canlı site:** https://grid-dijital-studio.vercel.app
- **GitHub:** https://github.com/yeetslayer-coding/grid-dijital-site
- **ZIP indir:** https://github.com/yeetslayer-coding/grid-dijital-site/archive/refs/heads/main.zip

## Ömer'in bilgisayarında açma

### Windows: ZIP indirerek

1. [Node.js LTS](https://nodejs.org/en/download) sürümünü kurun. Node.js 22 veya üzeri gerekir; npm kurulumla birlikte gelir.
2. Yukarıdaki **ZIP indir** bağlantısından projeyi indirin ve ZIP'i bir klasöre çıkarın.
3. Çıkardığınız klasördeki **SITEYI-AC.cmd** dosyasını çift tıklayın. İlk açılışta gerekli paketler otomatik kurulur; ilk kurulum için internet gerekir.
4. Terminal hazır olduğunu yazınca tarayıcıda **http://127.0.0.1:4317** adresini açın.

Terminal açık kaldığı sürece site çalışır. Durdurmak için terminalde `Ctrl+C` kullanın. ZIP'in içinden doğrudan çalıştırmayın; önce dosyaları çıkarın. `.html` dosyasını çift tıklamak yerine yerel sunucuyu kullanın; font, harita ve görsel yolları sunucu köküne göre tanımlıdır.

### Windows, macOS veya Linux: terminalden

ZIP'ten çıkardığınız ve `package.json` bulunan klasörde:

```sh
npm ci
npm run dev
```

Ardından http://127.0.0.1:4317 adresini açın. Python, Vercel girişi, API anahtarı veya `.env` dosyası gerekmez. Yerel sunucu yalnızca kendi bilgisayarınızdan erişilebilir.

Windows PowerShell `npm.ps1` için çalıştırma ilkesi hatası verirse politika değiştirmeden `npm.cmd ci` ve `npm.cmd run dev` kullanın veya `SITEYI-AC.cmd` dosyasını açın.

### Git ile indirme ve güncelleme

[Git](https://git-scm.com/downloads) kuruluysa:

```sh
git clone https://github.com/yeetslayer-coding/grid-dijital-site.git
cd grid-dijital-site
npm ci
npm run dev
```

Daha sonra sunucuyu durdurup güncel sürümü almak için:

```sh
git pull --ff-only
npm ci
npm run dev
```

ZIP ile indirdiyseniz yeni sürüm için ZIP'i tekrar indirin. Yerelde yaptığınız düzenlemeleri güncellemeden önce saklayın. Yerel dosya değişikliklerini tarayıcıyı yenileyerek görebilirsiniz; otomatik yeniden yükleme yoktur.

## Proje yapısı

- `dist/`: hem düzenlenen kaynaklar hem yayımlanan statik site; ayrı derleme adımı yoktur.
- `dist/index.html`: sayfa içeriği ve bileşenler.
- `dist/styles.css`, `dist/features.css`: görünüm ve responsive düzen.
- `dist/app.js`, `dist/features.js`, `dist/selection.js`, `dist/grid-motion.js`: etkileşimler, ortak seçim durumu ve hareket.
- `dist/assets/`: yerel görseller, fontlar, ikonlar ve Türkiye haritası.
- `tests/`: davranış kontrolleri; `scripts/`: tarayıcı doğrulama yardımcıları.
- `DESIGN.md`: tasarım sistemi; `ASSETS.md`: görsel kaynakları ve lisansları; `VALIDATION.md`: yapılmış doğrulamalar.

İl seçim alanı, Türkiye haritası ve görüşme notu aynı durumu kullanır. WhatsApp'a aktarım ziyaretçinin açık eylemiyle gerçekleşir; otomatik gönderim, veri tabanı, kalıcı ziyaretçi verisi veya sunucu API'si yoktur. Gerçek müşteri videoları yalnızca tıklanınca yüklenir. Site önizlemesi `noindex` olarak kalır.

## Kontroller

```sh
npm run check
npm test
```

Tarayıcı kontrolleri isteğe bağlıdır; normal kurulum için Playwright gerekmez. `scripts/browser-qa.mjs` çalışan bir yerel sunucu ve ayrı kurulmuş Playwright/Chromium kullanır. Gerekirse `PLAYWRIGHT_MODULE` ile modül yolunu, `BROWSER_PATH` ile tarayıcı yolunu belirtin. Ekran görüntüleri Git'e alınmayan `qa/` klasörüne, taşınabilir doğrulama kayıtları `verification/` klasörüne yazılır. Otomatik video kontrolleri gerçek oynatma testi değildir.

## Yayın

`vercel.json`, `dist/` klasörünü derleme ve uzak paket kurulumu olmadan sunar. GitHub'a kod yüklemek veya yerelde çalıştırmak mevcut canlı siteyi otomatik değiştirmez.

Mevcut Vercel hedefi: `g-class/grid-dijital-studio`. Yayın yalnız bu projede yetkili hesaptan yapılmalıdır:

```sh
vercel deploy --prod --scope g-class --project prj_cTH7ZgouJd9WAt29KG1bs7x5u9eW
```

`.env*`, `.vercel/`, `node_modules/` ve `qa/` Git dışında tutulur. `griddijital.com` özel alan adı bu önizlemeden ayrıdır.
