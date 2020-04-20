# Set up app 

## Install mongodb

```bash
brew tap mongodb/brew
brew install mongodb-community@4.2
brew services start mongodb-community@4.2
```

## Install dependencies

```bash
cd api && yarn install && cd client && yarn install
```

OR 

```
cd api && npm install && cd client && npm install
```

## Start App

```bash
cd api && yarn start && cd client && yarn start
```

OR 

```bash
cd api && npm start && cd client && npm start
```