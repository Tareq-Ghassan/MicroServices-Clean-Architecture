import { describe, expect, it, beforeEach, afterEach, jest } from '@jest/globals'
import { CartRepositoryType } from '../../types/repository.type'
import * as Repository from '../../repository/cart.repository'
import { createCart } from '../cart.service'

describe('cart Service', () => {
    let repo: CartRepositoryType;

    beforeEach(() => {
        repo = Repository.CartRepository
    });

    afterEach(() => {
        repo = {} as CartRepositoryType
    });

    it('Should return correct data while creating cart', async () => {
        const mockCart = { item: 'smart phone', price: 1200 }

        jest.spyOn(Repository.CartRepository, "create")
            .mockImplementation(() =>
                Promise.resolve({
                    message: 'fake response from cart repository',
                    input: mockCart,
                })
            )

        const res = await createCart(mockCart, repo);

        expect(res).toEqual({
            message: 'fake response from cart repository',
            input: mockCart,
        });
    });
});
