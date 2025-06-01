import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './article.entity';

@Controller('/article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) { }

    @Get()
    getAll(): Promise<Article[]> {
        return this.articleService.findAll();
    }

    @Get(':id')
    getOne(@Param('id') id: number): Promise<Article> {
        return this.articleService.findOne(id);
    }

    @Post()
    async create(@Body() articleData: Partial<Article>): Promise<Article> {

        return this.articleService.create(articleData);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() articleData: Partial<Article>,): Promise<Article> {
        return this.articleService.update(id, articleData);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.articleService.remove(id)
    }
}
