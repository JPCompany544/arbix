import { PrismaClient } from '../prisma/client'
import bcrypt from 'bcryptjs'

async function main() {
    const prisma = new PrismaClient()
    const email = 'ceaser444@gmail.com'
    const password = 'Johnpaul@3'

    console.log(`Starting admin creation for ${email}...`)

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        const user = await prisma.user.upsert({
            where: { email },
            update: {
                role: 'ADMIN',
                password: hashedPassword,
                status: 'ACTIVE'
            },
            create: {
                email,
                password: hashedPassword,
                role: 'ADMIN',
                status: 'ACTIVE'
            }
        })

        console.log('✅ Admin account successfully provisioned:')
        console.log('   ID:   ', user.id)
        console.log('   Email:', user.email)
        console.log('   Role: ', user.role)

    } catch (error) {
        console.error('❌ Failed to create admin:', error)
    } finally {
        await prisma.$disconnect()
    }
}

main()
