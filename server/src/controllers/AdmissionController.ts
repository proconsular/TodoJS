import { Controller, Post, Put, Delete } from '@overnightjs/core'
import { User } from '../entity/User'
import { Repository } from 'typeorm'
import { Request, Response } from 'express'
import * as bcrypt from 'bcrypt'
import * as jsonwebtoken from 'jsonwebtoken'

@Controller('api/admission')
export class AdmissionController {
    public repo: Repository<User>

    constructor(repo: Repository<User>) {
        this.repo = repo
    }

    @Post()
    public async signup(req: Request, res: Response) {
        bcrypt.hash(req.body.password, 4, async (err, hash) => {
            const user = await this.repo.create({
                username: req.body.username,
                password: hash,
            })
            await this.repo.save(user)
            return res.status(200).json()
        })
    }

    @Put()
    public async signin(req: Request, res: Response) {
        try {
            const user = await this.repo.findOneOrFail({username: req.body.username})
            bcrypt.compare(req.body.password, user.password, async (err, pass) => {
                if (err || !pass) {
                    return res.status(400).json({message: 'Unauthorized.'})
                }
                const token = jsonwebtoken.sign({username: user.username, password: user.password}, '123', {expiresIn: '4h'})
                user.token = token
                user.online = true
                await this.repo.save(user)
                res.status(200).json({id: user.id, username: user.username, token})
            })
        } catch (err) {
            res.status(400).json(err.message)
        }
    }

    @Delete(':id')
    public async signout(req: Request, res: Response) {
        try {
            const user = await this.repo.findOneOrFail(req.params.id)
            user.online = false
            await this.repo.save(user)
            res.status(200).json()
        } catch(err) {
            res.status(400).json(err.message)
        }
    }
}