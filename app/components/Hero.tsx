import Image from "next/image"
import Link from "next/link"
import { client, urlFor } from "../lib/sanity"

async function getData() {
    const query = "*[_type=='heroImage'][0]"
    const data = await client.fetch(query)
    return data
}

export default async function Hero() {
    const data = await getData()
    return (
        <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
            <div className="mb-8 flex flex-wrap justify-between md:mb-16">
                <div className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
                    <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl md:mb-8 md:text-6xl">
                       Produkty z našich viníc
                    </h1>
                    <p className="max-w-md  text-gray-500 xl:text-lg">
                        Ponúkame bezkonkurenčnú kvalitu pre vás a vašich najbližších
                    </p>
                </div>
                <div className="mb-12 flex w-full md:mb-16 lg:w-2/3">
                    <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-0">
                        <Image
                        width={500}
                        height={500}
                        src={urlFor(data.image1).url()} 
                        alt="Wine picture"
                        className="h-full w-full object-cover object-center"
                        priority
                        />
                    </div>
                    <div className="overflow-hidden rounded-lg bg-gray-100 shadow-lg">
                        <Image 
                        src={urlFor(data.image2).url()}
                        alt="Wineyard picture"
                        className="h-full w-full object-cover object-center"
                        width={500}
                        height={500}
                        priority
                        />
                    </div>
                </div>
            </div>
            {/* <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                <div className="flex h-12 w-80 divid-x overflow-hidden rounded-lg border">
                    <Link href="/Cervene-vina" className="flex w-1/3 items-center justify-center text-gray-500 transition-duration-100 hover:bg-gray-100 active:bg-gray-200">
                        Červené vína
                    </Link>
                    <Link href="/Biele-vina" className="flex w-1/3 items-center justify-center text-gray-500 transition-duration-100 hover:bg-gray-100 active:bg-gray-200">
                        Biele vína
                    </Link>
                    <Link href="/Ruzove-vina" className="flex w-1/3 items-center justify-center text-gray-500 transition-duration-100 hover:bg-gray-100 active:bg-gray-200">
                        Ružové vína
                    </Link>

                </div>
            </div> */}
        </section>
    )
}