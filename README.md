# Gametracker

> This website helps users keep track of their video game playtime across different consoles, allowing them to easily
> see what their favorite games and consoles are. All game data is sourced from
> the [IGDB API](https://www.igdb.com/api).
> This project is still under construction.


![Collection page](/src/og-image.png)

## ⚡ Technologies Used

- **Frontend:** React, TypeScript, Next.js, Redux Toolkit, Tailwind CSS
- **Database:** PostgreSQL, Prisma ORM, Neon
- **API:** IGDB API
- **Design:** Figma

## 🛠 Set Up

#### Prerequisites:

- Node.js
- npm (or yarn)

#### Once the project is downloaded, do the following:

1. Create an application on [dev.twitch.tv](https://dev.twitch.tv/) (requires a Twitch account) and save both the Client
   ID and the Client Secret
2. Create a PostgreSQL database on an online provider such as Neon or Supabase and save the provided database url
2. Create an .env file in the root of the project with the following elements:

```
DATABASE_URL=***
TWITCH_CLIENT_ID=***
TWITCH_CLIENT_SECRET=***
```

3. Navigate into the project's directory and install all dependencies with `npm install`
4. Generate Prisma Client with `npx prisma generate`
5. Seed the database with a test user with `npx prisma db seed`
6. Run the project locally with `npm run dev`

If you make any changes to to the Prisma schema, you can push those changes to the database using `npx prisma db push` (
during production) or `npx prisma migrate dev --name [...]` (during development; replace [...] with the name of the
migration). Optionally, use `npx prisma studio` to directly look inside the database and manually change data.

## 📩 Contact

For questions or feedback, reach out at:

- **Email:** alexandre.stang.web@gmail.com
- **LinkedIn:** [/alexandre-stang](https://www.linkedin.com/in/alexandre-stang-163208a7/)
