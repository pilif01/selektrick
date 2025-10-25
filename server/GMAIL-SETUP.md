# Configurare Gmail SMTP pentru Trimitere Email-uri

## Pasul 1: Activează autentificarea în doi pași (2FA)

1. Mergi la https://myaccount.google.com/security
2. Găsește secțiunea "Cum te conectezi la Google"
3. Click pe "Verificare în doi pași"
4. Urmează pașii pentru a activa 2FA (dacă nu e deja activat)

## Pasul 2: Generează App Password

1. După ce 2FA este activat, mergi la https://myaccount.google.com/apppasswords
   - SAU: Google Account → Security → 2-Step Verification → App passwords

2. Click pe "Select app" și alege "Mail" (sau "Other (Custom name)")
   - Dacă alegi "Other", scrie "Selectrik" ca nume

3. Click pe "Select device" și alege dispozitivul tău (sau "Other")

4. Click pe "Generate"

5. Google va genera un **App Password** de 16 caractere (format: xxxx xxxx xxxx xxxx)

6. **IMPORTANT**: Copiază imediat acest password! Nu va mai fi afișat din nou.

## Pasul 3: Actualizează fișierul .env

Deschide fișierul `server/.env` și înlocuiește `your-app-password-here` cu App Password-ul generat:

```env
EMAIL_USER=blueprintstudioworks@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
```

**NOTĂ**: Poți lăsa sau scoate spațiile din App Password - ambele variante funcționează:
- Cu spații: `xxxx xxxx xxxx xxxx`
- Fără spații: `xxxxxxxxxxxxxxxx`

## Pasul 4: Restart Server

După ce ai actualizat `.env`, restart serverul:

```bash
# Dacă rulează deja, oprește-l (Ctrl+C) și pornește-l din nou
cd server
npm run dev
```

## Testare

Pentru a testa că email-urile funcționează:

1. Înregistrează un cont nou la http://localhost:5173/login
2. Ar trebui să primești un email cu codul de verificare pe adresa folosită
3. Dacă nu primești email, verifică:
   - Folderul Spam/Junk
   - Console-ul serverului pentru erori
   - Că App Password-ul e corect în `.env`

## Probleme Comune

### "Invalid login" sau "Username and Password not accepted"
- Verifică că 2FA este activat pe contul Google
- Verifică că App Password-ul e corect copiat în `.env`
- Asigură-te că folosești App Password, NU parola normală Gmail

### "Less secure app access"
- Nu mai e necesar! Google a eliminat această opțiune.
- Folosește App Passwords în schimb (pașii de mai sus)

### Email-urile nu ajung
- Verifică spam/junk folder
- Verifică că `EMAIL_USER` e corect în `.env`
- Verifică console-ul serverului pentru erori

## Link-uri Utile

- Google Account Security: https://myaccount.google.com/security
- App Passwords: https://myaccount.google.com/apppasswords
- Nodemailer Gmail Setup: https://nodemailer.com/usage/using-gmail/

## Securitate

⚠️ **IMPORTANT**:
- Nu partaja niciodată App Password-ul
- Adaugă `.env` în `.gitignore` (e deja adăugat)
- Pentru producție, folosește variabile de environment, nu `.env` files
