import { Controller, ClassMiddleware, Get, Post, Put, Delete } from '@overnightjs/core'
import { Repository } from 'typeorm'

import { Task } from '../entity/Task'
import { protect } from '../middleware/authentication'
import { Request, Response } from 'express'

@Controller('api/tasks')
@ClassMiddleware(protect.middleware)
export class TaskController {
    private repo: Repository<Task>

    constructor(repo: Repository<Task>) {
        this.repo = repo
    }

    @Get()
    public async get(request: Request, response: Response) {
        try {
            if (request.query.userId) {
                const tasks = await this.repo.find({
                    where: {owner: request.query.userId},
                })
                response.status(200).json(tasks)
            } else {
                throw new Error('No userId provided.')
            }
        } catch (err) {
            response.status(400).json(err.message)
        }
    }

    @Post()
    public async post(request: Request, response: Response) {
        try {
            const data = {
                name: request.body.name,
                owner: request.body.userId,
            }
            const task = await this.repo.create(data)
            await this.repo.save(task)
            response.status(200).json(task)
        } catch (err) {
            response.status(400).json(err.message)
        }
    }

    @Put(':id')
    public async update(request: Request, response: Response) {
        try {
            const task = await this.repo.findOneOrFail(request.params.id)
            await this.repo.save({
                ...task,
                ...request.body,
            })
            response.status(200).json()
        } catch (err) {
            response.status(400).json(err.message)
        }
    }

    @Delete(':id')
    public async delete(request: Request, response: Response) {
        try {
            await this.repo.delete(request.params.id)
            response.status(200).json()
        } catch (err) {
            response.status(400).json(err.message)
        }
    }
}
