# Фронтенд часть приложения для Tech notes

Демо [Demo](https://technotes-mcbl.onrender.com/)

Вход под работником
Логин: Test
Пароль: 123456

## Функционал

- Доступ к приложению через авторизацию (есть публичные и приватные страницы)
- Есть 3 типа пользователей: Админ, Менеджер, Сотрудник
- На странице приветсвия после авторизации отображается текущий пользватель и его роль
- Авторизация требуется как минимум раз в 7 дней (jwt)
- Заметки закреплены за конкретными сотрудниками
- Заметки имеют номер тикета, заголовок, тело заметки, даты создания и обновления
- Заметки либо ОТКРЫТЫ, либо ЗАВЕРШЕНЫ
- Заметки могут быть удалены только менеджерами или администраторами
- После авторизации любой пользователь может создать заметку
- Сотрудники могут только просматривать и редактировать назначенные им заметки
- Менеджеры и администраторы могут просматривать, редактировать и удалять все заметки
- Доступ к настройкам пользователей имеют только менеджеры и администраторы
- Только менеджеры и администраторы могут создавать новых пользователей

## Технологии

- TypeScript
- React
- RTKQuery
- React Router Dom
- Rect-hook-form

## Установка

Склонировать репозиторий и установить зависимости:

```sh
git clone https://github.com/Paavveel/tech-notes-frontend.git

npm install
```

Запустить приложение:

```sh
npm start
```
