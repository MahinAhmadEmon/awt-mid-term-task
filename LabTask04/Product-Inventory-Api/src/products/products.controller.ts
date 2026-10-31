
import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
} from '@nestjs/common';

import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto.js';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
  ) {}

  // 1. Create a product
  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  // 2. Get all products
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  // 3. Search products by name
  @Get('search')
  search(@Query('keyword') keyword: string) {
    return this.productsService.search(keyword);
  }

  // 4. Filter products by category
  @Get('category/:cat')
  findByCategory(@Param('cat') category: string) {
    return this.productsService.findByCategory(category);
  }

  // 5. Get a product by ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  // 6. Partially update a product (PATCH)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: PartialUpdateProductDto,
  ) {
    return this.productsService.update(id, dto);
  }

  // 7. Fully replace a product (PUT)
  @Put(':id')
  replace(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productsService.replace(id, dto);
  }

  // 8. Delete a product
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  // 9. Toggle product active status
  @Patch(':id/toggle')
  toggleActive(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.toggleActive(id);
  }
}

