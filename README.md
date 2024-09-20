# Wymagania

Wymagane jest zainstalowanie:

- Node.js
- MongoDB

Przed każdym uruchomieniem należy uruchomić MongoDB.

# Pierwsze uruchomienie

Wszystkie poniższe instrukcje należy wykonać z głównego katalogu projektu.

Zainstaluj potrzebne moduły npm:

```
npm install
```

W pliku `.env` należy podać url do uruchomionej instancji MongoDB jako wartość zmiennej środowiskowej `DB_URL`, np:

```
DB_URL=mongodb://localhost:27017/loldle
```

Następnie, przed pierwszym uruchomieniem projektu należy uruchomić skrypt tworzący dane konieczne do przeprowadzania rozgrywki:

```
node ./db_data/createChampions.js
```

Opcjonalnie, dla stworzenia przykładowych danych generowanych przez użytkowników (np. postów na forum, komentarzy), można także uruchomić dodatkowy skrypt:

```
node ./db_data/addExampleData.js
```

# Uruchomienie projektu

```
node ./index.js
```
