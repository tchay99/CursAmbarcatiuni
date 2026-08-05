# Publicarea pe Oracle Cloud Free Tier (VPS)

Ghid pas-cu-pas pentru a publica aplicația pe o mașină virtuală gratuită în
Oracle Cloud (OCI), cu autentificare, link privat de înregistrare și panou de
administrare. Pentru maxim ~10 utilizatori, free tier-ul este mai mult decât
suficient.

---

## 1. Creează mașina virtuală (VM) în Oracle Cloud

1. Creează un cont pe [oracle.com/cloud/free](https://www.oracle.com/cloud/free/)
   (cere card la înscriere, dar resursele *Always Free* nu se taxează).
2. În consola OCI: **Compute → Instances → Create instance**.
3. Alege:
   - **Image**: Ubuntu 24.04 (sau 22.04) — *Canonical Ubuntu*.
   - **Shape**: `VM.Standard.A1.Flex` (ARM; până la 4 OCPU / 24 GB RAM sunt
     Always Free) — recomandat. Alternativ `VM.Standard.E2.1.Micro` (x86,
     1 GB RAM — suficient și el pentru această aplicație).
   - **SSH keys**: încarcă/generează o cheie SSH (o vei folosi la conectare).
4. Creează instanța și notează **IP-ul public**.

### Deschide porturile 80 și 443 în firewall-ul OCI

1. **Networking → Virtual cloud networks → (VCN-ul instanței) → Security Lists
   → Default Security List → Add Ingress Rules**:
   - Source CIDR `0.0.0.0/0`, protocol TCP, **Destination port 80**
   - Source CIDR `0.0.0.0/0`, protocol TCP, **Destination port 443**
2. Ubuntu-ul din imaginile OCI are și reguli iptables proprii. După conectarea
   prin SSH (pasul 2), rulează:
   ```bash
   sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT
   sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT
   sudo netfilter-persistent save
   ```

## 2. Conectează-te și instalează dependențele

```bash
ssh ubuntu@IP_PUBLIC

# Node.js (LTS) + git
sudo apt-get update
sudo apt-get install -y nodejs git

# Caddy (reverse proxy cu HTTPS automat)
sudo apt-get install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt-get update && sudo apt-get install -y caddy
```

> Aplicația nu are dependențe npm — nu e nevoie de `npm install`.

## 3. Instalează aplicația

```bash
sudo git clone https://github.com/tchay99/CursAmbarcatiuni.git /opt/cursambarcatiuni
cd /opt/cursambarcatiuni
sudo mkdir -p data && sudo chown ubuntu:ubuntu data

# Creează contul de administrator (email + parolă la alegerea ta)
node server/server.js --create-admin adresa-ta@email.com ParolaTaSigura123
```

## 4. Pornește serviciul (systemd)

```bash
sudo cp deploy/cursambarcatiuni.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now cursambarcatiuni
systemctl status cursambarcatiuni     # verifică: active (running)
```

## 5. Configurează Caddy (port 80/443)

```bash
sudo cp deploy/Caddyfile /etc/caddy/Caddyfile
# Dacă AI un domeniu: editează /etc/caddy/Caddyfile — decomentează varianta A
# și pune domeniul tău (cu DNS A record spre IP-ul VPS-ului). HTTPS e automat.
sudo systemctl reload caddy
```

Aplicația e acum publică la `http://IP_PUBLIC` (sau `https://domeniul-tau.ro`).

## 6. Provizionarea utilizatorilor

1. Intră pe `http://IP_PUBLIC/login` cu contul de admin.
2. Deschide **/admin** (link „👑 Admin" în bara de sus).
3. Copiază **linkul privat de înregistrare** și trimite-l cursanților
   (ex. `http://IP_PUBLIC/register?token=a1b2c3...`).
4. După ce un cursant își creează contul, apare în listă ca **„în așteptare"**
   — apasă **Aprobă** ca să-i dai acces. Poți respinge sau șterge oricând.
5. Dacă linkul de înregistrare ajunge unde nu trebuie, apasă **Regenerează**
   — linkul vechi devine instantaneu invalid.

Notă: aplicația verifică starea contului la fiecare cerere — un utilizator
respins pierde accesul imediat, chiar dacă avea o sesiune activă.

## 7. Actualizarea aplicației

```bash
cd /opt/cursambarcatiuni
sudo git pull
sudo systemctl restart cursambarcatiuni
```

## Date și backup

- Utilizatorii și tokenul de înregistrare: `/opt/cursambarcatiuni/data/`
  (două fișiere JSON — include-le în backup).
- Progresul lecțiilor fiecărui cursant se salvează în browserul lui
  (localStorage), nu pe server.

## Depanare

| Problemă | Verificare |
|---|---|
| Site inaccesibil din exterior | Regulile Ingress din OCI **și** iptables (pasul 1) |
| 502 de la Caddy | `systemctl status cursambarcatiuni`, apoi `journalctl -u cursambarcatiuni -e` |
| Am uitat parola de admin | `node server/server.js --create-admin email parola-noua` (suprascrie parola) |
| Vreau alt link de înregistrare | Buton „Regenerează" în /admin sau `node server/server.js --show-link` |
