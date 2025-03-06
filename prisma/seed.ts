// Consult documentation for more information: https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding
// Start seeding with command: npx prisma db seed

import {Prisma, PrismaClient} from "@prisma/client";
const prisma = new PrismaClient()

const initialUsers: Prisma.UserCreateInput[] = [
    {
        username: "demotest",
        email: "demo@test.com",
        password: "test1234",
    }
]

async function main() {
    console.log("Start seeding...")

    // Initialize users
    for (const user of initialUsers) {
        const newUser = await prisma.user.create({
            data: user
        })
        console.log(`Created user "${newUser.username}" with id "${newUser.id}"`)
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })