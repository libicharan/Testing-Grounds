"use client";

import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Product } from "../products/actions/getProducts";
import Image from "next/image";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card
      className="shadow-md border border-gray-200 text-black p-4 m-4 flex flex-col justify-between h-full hover:shadow-lg"
      header={
        <div
          className="w-full h-40 bg-gray-100 rounded relative overflow-hidden"
          style={{ backgroundColor: product.color_code || "#f9fafb" }}
        >
          <Image
            alt={product.name}
            src={product.product_image}
            fill
            className="object-contain p-4"
          />
        </div>
      }
    >
      <div className="flex flex-col flex-grow">
        <div className="mb-3">
          <h2 className="text-lg font-semibold text-gray-800">
            {product.name}
          </h2>
          <p className="text-sm text-gray-500">{product.short_description}</p>
        </div>

        <p className="text-sm text-gray-700 mb-4">{product.description}</p>

        <div className="mt-auto pt-2">
          <Button
            label="Visit App"
            icon="pi pi-external-link"
            className="p-button-sm w-full"
            onClick={() => window.open(product.product_url, "_blank")}
          />
        </div>
      </div>
    </Card>
  );
}
