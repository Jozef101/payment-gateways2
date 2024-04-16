import {defineField, defineType} from 'sanity'

export default {
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Product name'
    },
     {
        name: 'images',
        type: 'array',
        title: 'Product Images',
        of: [{type: 'image'}],
    },
    {
        name: 'description',
        type: 'text',
        title: 'Product description',
    },
    {
        name: 'slug',
        type: 'slug',
        title: 'Product slug',
        options: {
            source: 'name',
        }
    }, {
        name: 'price',
        title: 'Price',
        type: 'number'
    }, {
        name: 'price_id',
        title: 'Stripe Price ID',
        type: 'string'
    }, {
        name: 'category',
        title: 'Product Category',
        type: 'reference',
        to: [
            {
                type: 'category'
            }
        ]
    }
  ],
}