import { Controller, Get, Post, ClassMiddleware, Delete } from '@overnightjs/core';
import { Repository } from 'typeorm';
import { User } from 'src/entity/User';
import { Response, Request } from 'express'
import { protect } from '../middleware/authentication';

@Controller('api/users')
@ClassMiddleware([protect.middleware])
export class UserController {
    private repo: Repository<User>;

    constructor(repo: Repository<User>) {
        this.repo = repo;
    }

    @Get()
    public async get(req: Request, res: Response) {
        const users = await this.repo.find()
        res.status(200).json(users)
    }

    @Post()
    public async post(req: Request, res: Response) {
        const user = await this.repo.create(req.body)
        await this.repo.save(user)
        res.status(200).json(user)
    }

}
