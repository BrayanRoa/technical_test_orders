import { createContainer, asClass, InjectionMode, AwilixContainer } from 'awilix';
import { AuthDatasourceImp } from '../datasource/auth.datasource.imp';
import { AuthRepositoryImpl } from '../repositories/auth.repository.imp';
import { BcryptPasswordHasher } from '../../utils/passwordHasher/bcryptPasswordHasher';
import { ProductsRepositoryImpl } from '../repositories/products.repository.imp';
import { ProductDatasourceImp } from '../datasource/products.datasource.imp';
import { UserRepositoryImpl } from '../repositories/user.repository.imp';
import { UserDatasourceImp } from '../datasource/user.datasource.imp';

interface IContainer {
    passwordHasher: BcryptPasswordHasher,
    authDatasource: AuthDatasourceImp,
    authRepository: AuthRepositoryImpl,
    productRepository: ProductsRepositoryImpl
    productDatasource: ProductDatasourceImp,
    userRepository: UserRepositoryImpl,
    userDatasource: UserDatasourceImp
}

export const container: AwilixContainer<IContainer> = createContainer<IContainer>({
    injectionMode: InjectionMode.CLASSIC,
    strict: true
});
;
container.register({
    passwordHasher: asClass(BcryptPasswordHasher).singleton(),
    authDatasource: asClass(AuthDatasourceImp).singleton(),
    authRepository: asClass(AuthRepositoryImpl).singleton(),
    productRepository: asClass(ProductsRepositoryImpl).singleton(),
    productDatasource: asClass(ProductDatasourceImp).singleton(),
    userRepository: asClass(UserRepositoryImpl).singleton(),
    userDatasource: asClass(UserDatasourceImp).singleton()
});