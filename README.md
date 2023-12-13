# Онлайн магазин на базе Create React App

### Области хранения данных:

-   база данных на MongoDB
-   redux store

### Сущности приложения:

-   пользователь: БД (список пользователей), JWT (сессия текущего), store (отображение в браузере)
-   роль пользователя: сервер (список ролей), JWT (сессия пользователя с ролью), store (использование на клиенте)
-   категория товара: БД (список категорий), store (отображение в браузере)
-   товар: БД (список товаров), store (отображение в браузере)
-   корзина пользователя: БД (корзина с товарами), store (отображение в браузере)

### Таблицы БД:

-   пользователи - users: id / fullName / email / avatarUrl /roleId / createdAt / updatedAt / password
-   категории - categories: id / title
-   товары - products: id / title / categoryId / price / amount / description / comments:[массив: commentId] / createdAt / updatedAt
-   комментарии - comments: id / content / author / createdAt / updatedAt
-   корзины - carts: id / userId / items:[массив: cartItemId] / createdAt / updatedAt
-   товары в корзинах - cart_items: id / cartId / productId / quantity / createdAt / updatedAt
-   избранные товары - favorites: id / userId / productId / createdAt / updatedAt

### Сессия пользователя:

-   сессия текущего пользователя: JWT

### Схема для redux store (на клиенте)

-   user: id / email / fullName / avatarUrl / roleId
-   users: массив user: id / email / fullName / avatarUrl / roleId
-   product: id / title / categoryId / price / amount / imageUrl / description / createdAt / comments: массив comment: id / author / content / createdAt
-   products: массив product: id / title / categoryId / price / amount / imageUrl / description / createdAt / comments: массив comment: id / author / content / createdAt
