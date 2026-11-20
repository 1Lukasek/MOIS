# FitPlanner – Backend

## Požadavky
- Java 25
- MySQL na portu `3307` (uživatel `root`, heslo `root`)
- Vlastní JWT secret (v repozitáři není)

## Spuštění

### 1. Databáze
Stačí jedna z možností:

| Možnost | Postup |
|---|---|
| Docker (doporučeno) | Ve složce projektu spustit `docker compose up -d` |
| Vlastní MySQL | Server na portu `3307`, uživatel `root`, heslo `root` |

### 2. JWT secret
Min. 32 znaků, bez něj aplikace nenastartuje. Stačí jedna z možností:

| Možnost | Postup |
|---|---|
| Soubor (doporučeno) | Vytvořit `Backend/secrets.properties` s řádkem `app.jwt.secret=...` |
| Proměnná prostředí | Nastavit `JWT_SECRET` (IntelliJ: Run configuration → Environment variables) |

`secrets.properties` je v `.gitignore`, nikdy ho necommitovat.
Soubor se čte ze složky, odkud se aplikace spouští (v IntelliJ musí být working directory `Backend`).

Náhodný secret:
- `openssl rand -base64 48`
- PowerShell: `$b = New-Object byte[] 48; [Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($b); [Convert]::ToBase64String($b)`

### 3. Aplikace
- spustit `FitPlannerApplication`

Při prvním spuštění se stáhne katalog cviků (Wger) a potravin (Open Food Facts).
