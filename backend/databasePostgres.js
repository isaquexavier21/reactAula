import { randomUUID } from "node:crypto";
import {sql} from './sql.js';

export class DatabasePostgres{
    async list() {
        try{
            const result = await sql`SELECT * FROM users`;
            return result;
        } catch (err){
            console.log("Erro ao listar usuários: ", err);
            return [];
        }

    }

    async create(user){
        const userId = randomUUID();
        const {name, email} = user;

        await sql`
            INSERT INTO users (id, name, email) VALUES (${userId}, ${name}, ${email})
        `;
    }

    async update(id,user){
        const {name, email} = user;
        await sql`
            UPDATE users
            SET name = ${name}, email = ${email}
            WHERE id  = ${id}
        `;
    }

    async delete(id){
        await sql`DELETE FROM users WHERE id = ${id}`;
    }
}