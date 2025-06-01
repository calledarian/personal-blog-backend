import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private articleRepository: Repository<Article>,
    ) { }

    findAll(): Promise<Article[]> {
        return this.articleRepository.find();
    }

    async findOne(id: number): Promise<Article> {
        const articleEntity = await this.articleRepository.findOneBy({ id: id });
        if (!articleEntity) {
            throw new NotFoundException(`Article with id ${id} not found`);
        }
        return articleEntity;
    }

    async create(articleData: Partial<Article>): Promise<Article> {
        const newArticle = this.articleRepository.create(articleData);
        return await this.articleRepository.save(newArticle)
    }

    async update(id: number, articleData: Partial<Article>): Promise<Article> {
        const existingArticle = await this.findOne(id);
        Object.assign(existingArticle, articleData);
        return this.articleRepository.save(existingArticle);
    }

    async remove(id: number): Promise<void> {
        const deleteArticle = await this.articleRepository.delete(id);
        if (deleteArticle.affected === 0) {
            throw new NotFoundException(`Article with id ${id} not found`);
        }
    }
}
