import { ArrowRight } from "lucide-react"
import { simplifiedProduct } from "../interface"
import { client } from "../lib/sanity"
import Link from "next/link"
import Image from "next/image";
import { translateCategoryName } from "./CategoryUtils";

async function getData() {
    const query = `
    *[_type=='product'][0...4] | order(_createdAt desc){
        _id,
          price,
          name,
          "slug": slug.current,
          "categoryName": category->name,
          "imageUrl": images[0].asset->url
      }`

      const data = await client.fetch(query)

      return data
}

export default async function Featured() {
    const data: simplifiedProduct[] = await getData()

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-800">Najnovšie vínka pre Vás</h2>
                    <Link className="text-primary flex items-center gap-x-1" href="/all">Pozri všetky produkty{" "}<span><ArrowRight/></span></Link>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {data.map((product) => (
                        <div className="group relative" key={product._id}>
                            <Link href={`/product/${product.slug}`}>
                                <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-60 lg:h-80" >
                                    <Image 
                                    src={product.imageUrl}
                                    alt={"Fotka produktu"} 
                                    className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                                    width={300}
                                    height={300}
                                />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm max-w-60">
                                            {product.name}
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-400">
                                            {translateCategoryName(product.categoryName)}
                                        </p>
                                    </div>
                                    <p className="mt-1 font-medium text-gray-900">{product.price} €</p>
                                </div>
                            </Link>                  
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}