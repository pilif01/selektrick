# Ghid Media pentru Pagina About - Echipa Selectrik

## Video Intro (Autoplay cu sunet)

**Locație:** La intrarea pe pagina About, video full-screen
**Fișier:** `/public/videos/echipa-selectrik-intro.mp4`

**Funcționalitate:**
- Se redă automat când intri pe pagină CU SUNET
- Buton mute/unmute în dreapta sus
- Când dai scroll în jos (>200px), video-ul face fade out și sunetul se oprește
- Apare animat textul "Despre noi"

**Recomandări:**
- Durată: 15-30 secunde
- Video de prezentare a echipei
- Muzică de fundal + voiceover (opțional)

---

## Media Frames - Locații

### FRAME 1: Echipa la lucru
**Locație:** Secțiunea "Cine suntem?" - partea dreaptă
**Fișier:** `/public/images/echipa-1.jpg` sau `/public/videos/echipa-1.mp4`
**Aspect Ratio:** 4:3 (vertical-ish)
**Sugestie:** Poză sau video cu echipa Selectrik pozând sau la lucru

**Cod pentru imagine:**
```jsx
<img
  src="/images/echipa-1.jpg"
  alt="Echipa Selectrik"
  className="w-full h-full object-cover"
/>
```

**Cod pentru video (autoplay, fără sunet, loop):**
```jsx
<video
  autoPlay
  loop
  muted
  playsInline
  className="w-full h-full object-cover"
>
  <source src="/videos/echipa-1.mp4" type="video/mp4" />
</video>
```

---

### FRAME 2-5: Galerie "Echipa în acțiune"
**Locație:** Secțiune dedicată cu grid 2x2
**Fișiere:**
- `/public/images/echipa-2.jpg` (Instalare panouri)
- `/public/images/echipa-3.jpg` (Proiect finalizat)
- `/public/images/echipa-4.jpg` (Membrii echipei)
- `/public/images/echipa-5.jpg` (Echipamente & siguranță)

**Aspect Ratio:** 16:9 (landscape)
**Sugestii:**
- Frame 2: Echipa instalând panouri fotovoltaice
- Frame 3: Imagine before/after sau proiect complet
- Frame 4: Membri ai echipei (poate portrete)
- Frame 5: Close-up echipamente profesionale

---

### FRAME 6: Dedicare client
**Locație:** Secțiunea "De ce să ne alegi?" - partea dreaptă
**Fișier:** `/public/images/echipa-6.jpg`
**Aspect Ratio:** 4:3
**Sugestie:** Echipa discutând cu un client sau pozând fericiți

---

### FRAME 7: Viziunea echipei
**Locație:** Secțiunea "Misiunea" - partea dreaptă
**Fișier:** `/public/images/echipa-7.jpg`
**Aspect Ratio:** 4:3
**Sugestie:** Imagine inspirațională - poate panouri solare la apus sau echipa privind spre viitor

---

## Cum să adaugi media

### Pentru imagini:
1. Pune fișierele în `/public/images/`
2. În componenta AboutPage.tsx, găsește comentariul pentru frame-ul respectiv
3. Decomentează codul pentru `<img>` și verifică calea fișierului

### Pentru videouri:
1. Pune fișierele în `/public/videos/`
2. În componenta AboutPage.tsx, găsește comentariul pentru frame-ul respectiv
3. Decomentează codul pentru `<video>` și verifică calea fișierului

## Exemple de înlocuire

### Frame 1 (în AboutPage.tsx, linia ~239-255):
**Găsești:**
```jsx
{/* Uncomment și înlocuiește când ai media:
<img
  src="/images/echipa-1.jpg"
  alt="Echipa Selectrik"
  className="w-full h-full object-cover"
/>
...
*/}
```

**Înlocuiești cu:**
```jsx
<img
  src="/images/echipa-1.jpg"
  alt="Echipa Selectrik"
  className="w-full h-full object-cover"
/>
```

### Frames 2-5 (în AboutPage.tsx, liniile ~302, 321, 340, 359):
**Găsești:**
```jsx
{/* Pune poză/video aici: /public/images/echipa-2.jpg sau /videos/echipa-2.mp4 */}
```

**Înlocuiești cu:**
```jsx
<img
  src="/images/echipa-2.jpg"
  alt="Echipa Selectrik instalând panouri"
  className="w-full h-full object-cover"
/>
```

---

## Recomandări tehnice

- **Format imagini:** JPG/PNG optimizate pentru web (max 500KB per imagine)
- **Format video intro:** MP4, H.264, max 10MB
- **Format videouri loop:** MP4, H.264, max 5MB fiecare
- **Rezoluție imagini:** min 1920x1080px
- **Rezoluție video intro:** 1920x1080px (Full HD)

---

## Testare

După ce adaugi media:
1. Refreshează pagina About
2. Verifică dacă video intro se redă automat cu sunet
3. Testează butonul mute/unmute
4. Scrollează în jos și verifică dacă video face fade out
5. Verifică dacă toate imaginile se încarcă corect
