import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { StatisticModule } from './statistic/statistic.module';
import { PaginationModule } from './pagination/pagination.module';

@Module({
  imports: [ConfigModule.forRoot() ,AuthModule, UserModule, ProductModule, ReviewModule, CategoryModule, OrderModule, StatisticModule, PaginationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
