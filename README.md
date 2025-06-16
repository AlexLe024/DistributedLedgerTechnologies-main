![image](https://github.com/user-attachments/assets/f5c00f35-86ef-47fc-b3dd-b3dec908affa)# 🖼 SimpleNFT Marketplace

Простой NFT-магазин, разработанный на базе Scaffold-ETH 2. Проект включает смарт-контракт ERC-721 с функциями минта, выставления на продажу и покупки NFT, а также веб-интерфейс на Next.js.

## 🚀 Возможности

- Контракт SimpleNFT (ERC-721 + Ownable + Listings)
- Только владелец контракта может минтить NFT
- Владельцы токенов могут выставлять их на продажу
- Любой пользователь может купить NFT, отправив ETH
- Интерфейс с кнопками Mint, List, Buy
- Интеграция с Scaffold-ETH 2: burner-кошельки, хуки, дебаг-панель

## 🖼 Интерфейс

Добавьте сюда скриншот интерфейса с главной страницы http://localhost:3000, где видно список токенов и кнопки.

Пример:
![image](https://github.com/user-attachments/assets/39d3d771-9de8-4640-b0ac-6fdfc4ef7844)

![image](https://github.com/user-attachments/assets/f43edc00-64d5-4980-9ebb-6819001d1a7b)


## 📋 Установка

Склонируйте проект и установите зависимости:

git clone https://github.com/your-name/nft-marketplace.git  
cd nft-marketplace  
yarn install

Если используется Yarn 3+, убедитесь, что включён Corepack:

corepack enable  
corepack prepare yarn@3.2.3 --activate  
yarn install

## ▶️ Запуск проекта

Откройте 3 терминала в корне проекта:

1. Локальная сеть Hardhat:

yarn chain

2. Деплой контракта:

yarn deploy

3. Запуск фронтенда:

yarn start

После запуска откройте в браузере http://localhost:3000

## 🛠 Структура проекта

packages/  
├── hardhat/ — Контракты и деплой  
│   └── contracts/SimpleNFT.sol  
│   └── deploy/00_deploy_simple_nft.ts  
├── nextjs/ — Интерфейс  
│   └── app/page.tsx

## 💡 Контракт SimpleNFT.sol

Контракт написан на Solidity и использует OpenZeppelin. Содержит:

- safeMint(address) — минт NFT (только для owner)
- listItem(tokenId, price) — выставление токена на продажу
- buyItem(tokenId) — покупка токена
- listings[tokenId] — отображает цену выставленного токена

Добавьте сюда скриншот из вкладки Debug Contracts Scaffold-ETH с открытым контрактом SimpleNFT:

![image](https://github.com/user-attachments/assets/a70d2026-fbb1-4462-8beb-63e4e4b60e59)


## 🧪 Как протестировать

1. Перейдите на http://localhost:3000
2. Нажмите кнопку Mint NFT (доступна только владельцу контракта)
3. После минта NFT появится в списке
4. Введите цену и нажмите «Выставить на продажу»
5. Переключитесь на другой кошелёк через Burner Wallet
6. Нажмите кнопку «Купить» для покупки NFT
7. Проверьте, что NFT сменил владельца, а ETH переведены продавцу

Добавьте скриншот с токеном, выставленным на продажу, или с успешной покупкой:

![image](https://github.com/user-attachments/assets/ad38bec7-3dc2-4247-93fc-69a38cca92b2)

![image](https://github.com/user-attachments/assets/71f2ede4-c2a8-4c24-95a7-04dd84953d3e)

## 📦 Зависимости

- Scaffold-ETH 2  
- Solidity / Hardhat / OpenZeppelin  
- React / Next.js App Router  
- Ethers.js / Wagmi / Viem

## 🧑‍💻 Автор

Проект создан в рамках учебного курса. Основан на Scaffold-ETH 2 с индивидуальной логикой и фронтендом.
