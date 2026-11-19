import { Pool } from 'pg'
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely'
import { LunarBase, Mission, Reservation, Ticket } from './types'

interface Database {
    missions: Mission,
    reservations: Reservation,
    tickets: Ticket,
    lunarBases: LunarBase
}

const dialect = new PostgresDialect({
  pool: new Pool({
    host: 'aws-0-us-east-1.pooler.supabase.com',
    port: 5432,                                
    database: 'postgres',
    user: 'postgres.gklawltosxpyvzszcapg',
    password: 'decfomjpL0EDhp9d',
    ssl: { rejectUnauthorized: false }
  })
})


export const db = new Kysely<Database>({
    dialect,
    plugins: [new CamelCasePlugin()]
})

// ---- missions ----

export async function clearMission(mission: Mission) {
    await deleteReservation(mission.id)
    await deleteTicket(mission.id)
    await deleteMission(mission.id)
}

export async function clearAndInsertMission(mission: Mission) {
    await clearMission(mission)
    await insertMission(mission)
}

export async function insertMission(mission: Mission) {
    await db
        .insertInto('missions')
        .values(mission)
        .execute()
}

export async function deleteMission(id: string) {
    await db
        .deleteFrom('missions')
        .where('id', '=', id)
        .execute()
}

// ---- reservations ----

export async function deleteReservation(missionId: string) {
    await db
        .deleteFrom('reservations')
        .where('missionId', '=', missionId)
        .execute()
}

export async function insertReservation(reservation: Reservation) {
    await db
        .insertInto('reservations')
        .values(reservation)
        .execute()
}

// ---- tickets ----

export async function deleteTicket(missionId: string) {
    await db
        .deleteFrom('tickets')
        .where('missionId', '=', missionId)
        .execute()
}

export async function insertTicket(ticket: Ticket) {
    await db
        .insertInto('tickets')
        .values(ticket)
        .execute()
}

// ---- lunar bases ----

export async function clearAndInsertLunarBase(base: LunarBase) {
    await deleteLunarBase(base.id)
    await insertLunarBase(base)
}

export async function insertLunarBase(base: LunarBase) {
    await db
        .insertInto('lunarBases')
        .values(base)
        .execute()
}

export async function deleteLunarBase(id: string) {
    const missions = await db
        .selectFrom('missions')
        .select('id')
        .where('baseId', '=', id)
        .execute()
    for (const m of missions) {
        await deleteReservation(m.id)
        await deleteTicket(m.id)
        await deleteMission(m.id)
    }
    await db
        .deleteFrom('lunarBases')
        .where('id', '=', id)
        .execute()
}