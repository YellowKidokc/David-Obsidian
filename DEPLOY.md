# 🚀 Deploy to Cloudflare Pages

## ✅ Your Website is Built!

Location: `d:\GitHub\theophysics-web\dist`

---

## Quick Deploy (3 Steps)

### Step 1: Push to GitHub
```powershell
cd d:\GitHub\theophysics-web
git init
git add .
git commit -m "Theophysics website"
git branch -M main
git remote add origin https://github.com/YellowKidokc/theophysics-web.git
git push -u origin main
```

### Step 2: Connect to Cloudflare Pages
1. Go to https://dash.cloudflare.com
2. Click **Pages** → **Create a project**
3. Click **Connect to Git**
4. Select your GitHub repo: `theophysics-web`

### Step 3: Configure Build
- **Framework preset**: Vite
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- Click **Save and Deploy**

**Done!** Your site will be live at: `https://theophysics-web.pages.dev`

---

## Alternative: Direct Upload (No GitHub)

```powershell
cd d:\GitHub\theophysics-web
npx wrangler pages deploy dist --project-name=theophysics
```

---

## What You Have

- ✅ Beautiful UI with dark theme
- ✅ Interactive collapsible sections
- ✅ Tabbed Physics/Math layers
- ✅ 4 modals (Math Sim, Structure, Export, AI Control)
- ✅ Professional styling
- ✅ Fast Vite build (~226 KB JS, ~15 KB CSS)
- ✅ Ready for production

---

## Custom Domain (Optional)

After deployment:
1. Go to your Cloudflare Pages project
2. Click **Custom domains**
3. Add your domain (e.g., `theophysics.com`)
4. Cloudflare handles SSL automatically

---

## Next Steps

1. **Deploy now** using one of the methods above
2. **Load real axioms** - we can add your 188 axioms next
3. **Make links work** - wire up navigation
4. **Add drag-drop** - reorderable sidebar

**Your website is ready to go live!** 🎉
