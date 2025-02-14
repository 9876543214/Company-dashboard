# Dashboard Project

## Description
This project is a dashboard application built with Nuxt.js, Vue.js, and Vueify. It features a grid system for organizing components.

## Prerequisites
- npm, pnpm, yarn, or bun
- Mongodb ver 8.0 or above installed locally

## Development Setup

1. **Clone the repository**:
```bash
     git clone https://github.com/9876543214/Company-dashboard.git
     cd Company-dashboard
``` 
2. **Install dependencies**:
```bash
     # npm

     npm install
     
     # pnpm

     pnpm install
     
     # yarn

     yarn install

     # bun
     
     bun install
```

3. **Start the database**:

- Create a new folder called "db" in server/data
  
- Run the command below
```bash
     # Example file paths

     "C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --dbpath "C:\Path\To\Cloned\Repo\server\data\db"

     # Change the first url to the file path to your mongod.exe file
     # Change the second url to the file path to your db folder in the cloned repo
```

- Run insertData.ts

```bash
     # run script to insert mockdata

     node server/utils/insertData.ts
```

3. **Start the development server**:
```bash
     # npm

     npm run dev
     
     # pnpm

     pnpm run dev
     
     # yarn

     yarn dev

     # bun
     
     bun run dev
```
## Recommended Extensions
Here are some recommended extensions:
- **Vetur**: Vue tooling for VS Code
- **ESLint**: Integrates ESLint into VS Code
- **Prettier - Code formatter**: Code formatter for consistent code style
- **Nuxt.js DevTools**: Nuxt.js development tools

## Project Structure
```
Company-dashboard/
├── app/
│   ├── components/
│   ├── pages/
│   │   └── index.vue
│   └── layouts/
├── server/
│   ├── api/
│   ├── data/
│   ├── models/
│   └── utils/
├── nuxt.config.ts
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```
- **app/components/**: Contains Vue components.
- **app/pages/**: Contains the main page `index.vue`.
- **app/layouts/**: Contains layout components.
- **server/api/**: Contains Nitro API to use the database.
- **server/data/**: Contains mock data files and database.
- **server/models/**: Contains Mongoose models that define the schema for the MongoDB collections.
- **server/utils/**: Contains utility files, such as database connection setup and scripts for inserting sample data.
- **nuxt.config.ts**: Nuxt.js configuration file.
- **package.json**: Project dependencies and scripts.
- **tsconfig.json**: TypeScript configuration file.
- **.gitignore**: Specifies files and directories to be ignored by Git.
- **README.md**: Project documentation.


