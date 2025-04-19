 import { faker } from '@faker-js/faker';
import sequelize from './api/db.js';
import { Inscription } from './api/models/index.js';
import dotenv from 'dotenv';

dotenv.config()

const seed = async () => {
    try {
        console.log('🌱 Starting fake data seed...')

        // Reset DB
        // await sequelize.sync({ force: true })

        const inscriptions = []

        for (let i = 0; i < 30; i++) {
            const validated = faker.datatype.boolean()
            const inscription = await Inscription.create({
                name: faker.person.firstName(),
                lastname: faker.person.lastName(),
                email: faker.internet.email(),
                validated,
                bearer_token: validated ? faker.string.alphanumeric(32) : null,
                validation_date: validated ? faker.date.recent({ days: 30 }) : null,
            })

            inscriptions.push(inscription)
        }

        console.log(`✅ Successfully inserted ${inscriptions.length} inscriptions.`)
    } catch (error) {
        console.error('❌ Seeding failed:', error)
    } finally {
        await sequelize.close()
    }
}

seed()
