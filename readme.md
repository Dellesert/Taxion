# 🛠 Backend Server

Этот репозиторий содержит backend-сервер, написанный на **NestJS**. Используется **PostgreSQL** и авторизация через **JWT**.

## 🚀 Запуск проекта

1. Установите зависимости:

   ```bash
   npm install

2. Запустить проект:

   ```bash
   npm run start

3.	Убедитесь, что у вас есть файл .env в корне проекта:

Пример .env
```bash
# AUTH
JWT_SECRET=secret
EXPIRE_TOKEN=9999999h

# Database
HOST=localhost
PORT=5432
USERNAMEDB=postgres
PASSWORDDB=pg
DBNAME=chat_pg