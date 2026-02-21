# Интернет-магазин часов (Vue + API)

Frontend для брендируемого интернет-магазина часов.

## ENV

Создайте `.env` (или используйте переменные из корневого `.env`):

```env
VITE_API_URL=http://localhost:8000/api
VITE_BRAND_NAME=Ваш бренд
```

## Запуск

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
npm run preview
```

## Ключевые изменения

- Бренд через `VITE_BRAND_NAME`
- Данные товаров и категорий из Django API (`VITE_API_URL`)
- Карточка товара по `slug`
- Фильтры каталога: поиск, категория, только в наличии
- Форма связи отправляет заявки в backend (`POST /api/contact/`)
- Оформление заказа отправляет заявки на покупку (`POST /api/purchase/`)
- PWA: `manifest.json`, service worker, offline-кеш
