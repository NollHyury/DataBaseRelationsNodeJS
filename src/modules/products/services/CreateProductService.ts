import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const checkExistNameProduct = await this.productsRepository.findByName(
      name,
    );

    if (checkExistNameProduct) {
      throw new AppError('Name of product is already used');
    }

    const product = await this.productsRepository.create({
      quantity,
      price,
      name,
    });

    return product;
  }
}

export default CreateProductService;
