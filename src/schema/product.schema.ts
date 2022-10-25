import {object, string, number, TypeOf} from 'zod';

const payload = {
    body: object({
        title: string({
            required_error: 'Title is required'
        }),
        price: number({
            required_error: 'Price is required'
        }),
        description: string({
            required_error: 'Description is required'
        }).min(120, 'Description should be atleast 120 characters long'),
        image: string({
            required_error: 'Image is required'
        }),
    })
}

const params = {
    params: object({
        productId: string({
            required_error: 'Product ID is required'
        })
    })
}

export const createProductSchema = object({
    ...payload
})

export const updateProductSchema = object({
    ...payload,
    ...params
}) 

export const deleteProductSchema = object({
    ...params
}) 

export const getProductSchema = object({ 
    ...params
}) 

export type CreateProductInput = TypeOf<typeof createProductSchema>
export type UpdateProductInput = TypeOf<typeof updateProductSchema>
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>
export type GetProductInput = TypeOf<typeof getProductSchema>