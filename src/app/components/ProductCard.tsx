"use client";

import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Product } from "../products/actions/getProducts";
import Image from "next/image";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card
      className="shadow-md border border-gray-200 text-black p-6 mt-3 flex flex-col justify-between h-full"
      header={
        <Image
          alt={product.name}
          src={product.product_image}
          width={200}
          height={100}
          className="w-full h-40 object-contain p-4 rounded"
          style={{
            backgroundColor: product.color_code || "#f9fafb",
          }}
        />
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
