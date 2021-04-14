import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserEmail } from 'src/decorators/user.email.decorator';
import { IdValidationPipe } from 'src/pipes/ad-validation.pipe';
import { REVIEW_NOT_FOUND_ERROR } from './constants/review.constants';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) { }

    @UsePipes(new ValidationPipe())
    @Post('create')
    async create(@Body() dto: CreateReviewDto){
        return this.reviewService.create(dto);
    }

    @Delete(':id')
    async delete(@Param('id', IdValidationPipe) id: string){
        const deletedDoc = await this.reviewService.delete(id);
        if(!deletedDoc){
            throw new HttpException(REVIEW_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('byProduct/:productId')
    async getByProduct(@Param('productId', IdValidationPipe) productId: string, @UserEmail() email: string){
        // console.log(email);
        return this.reviewService.findByProductId(productId);
    }
}
