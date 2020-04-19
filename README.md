# Set up app 

## Install mongodb

```bash
brew tap mongodb/brew
brew install mongodb-community@4.2
brew services start mongodb-community@4.2
```

## Install dependencies

```bash
cd api && yarn install && cd .. && cd client && yarn install
```

OR 

```
cd api && npm install && cd .. && cd client && npm install
```

## Start App

```bash
cd api && yarn start && cd .. && cd client && yarn start
```

OR 

```
cd api && npm start && cd .. && cd client && npm start