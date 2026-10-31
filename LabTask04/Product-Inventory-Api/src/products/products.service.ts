
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Products } from './entities/products.entity.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto.js';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepo: Repository<Products>,
  ) {}

  private async getProductOrThrow(id: number): Promise<Products> {
    const product = await this.productsRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  // 1. Create a product
  async create(dto: CreateProductDto) {
    const product = this.productsRepo.create(dto);
    const savedProduct = await this.productsRepo.save(product);

    return {
      message: 'Product created successfully',
      data: savedProduct,
    };
  }

  // 2. Get all products
  async findAll() {
    const products = await this.productsRepo.find({
      order: { createdAt: 'DESC' },
    });

    return {
      message: 'Products retrieved successfully',
      count: products.length,
      data: products,
    };
  }

  // 3. Get one product by ID
  async findOne(id: number) {
    const product = await this.getProductOrThrow(id);

    return {
      message: 'Product retrieved successfully',
      data: product,
    };
  }

  // 4. Partially update a product (PATCH)
  async update(id: number, dto: PartialUpdateProductDto) {
    const product = await this.getProductOrThrow(id);

    Object.assign(product, dto);
    const updatedProduct = await this.productsRepo.save(product);

    return {
      message: 'Product updated successfully',
      data: updatedProduct,
    };
  }

  // 5. Fully replace a product (PUT)
  async replace(id: number, dto: UpdateProductDto) {
    const product = await this.getProductOrThrow(id);

    product.name = dto.name;
    product.description = dto.description ?? '';
    product.price = dto.price;
    product.stock = dto.stock ?? 0;
    product.category = dto.category;
    product.isActive = dto.isActive ?? true;

    const updatedProduct = await this.productsRepo.save(product);

    return {
      message: 'Product replaced successfully',
      data: updatedProduct,
    };
  }

  // 6. Delete a product
  async remove(id: number) {
    await this.getProductOrThrow(id);
    await this.productsRepo.delete(id);

    return {
      message: 'Product deleted successfully',
      id,
    };
  }

  // 7. Filter products by category
  async findByCategory(category: string) {
    const products = await this.productsRepo.find({
      where: { category },
    });

    return {
      message: 'Products filtered successfully',
      count: products.length,
      data: products,
    };
  }

  // 8. Search products by name
  async search(keyword: string) {
    const products = await this.productsRepo.find({
      where: {
        name: ILike(`%${keyword}%`),
      },
    });

    return {
      message: 'Search completed successfully',
      count: products.length,
      data: products,
    };
  }

  // 9. Toggle product active status
  async toggleActive(id: number) {
    const product = await this.getProductOrThrow(id);

    product.isActive = !product.isActive;

    const updatedProduct = await this.productsRepo.save(product);

    return {
      message: 'Product status toggled successfully',
      data: updatedProduct,
    };
  }
}

