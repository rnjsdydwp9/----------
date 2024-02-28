"use client";

import Page from "@/components/Page";
import { useEffect, useState } from "react";

function ProductsListPage() {
  const getProductsUrl =
    "https://port-0-express-server-17xco2nlsidlckv.sel5.cloudtype.app/products";

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    fetch(getProductsUrl, { method: "GET" })
      .then((response) => response.json())
      .catch((e) => {
        setIsError("에러 났어요...");
        setIsLoading(false);
      })
      .then((data) => {
        setProducts(data.result);
        setIsLoading(false);
      });
  }, []);

  if (isError) {
    return <Page title="홈">에러났어요...</Page>;
  }

  return (
    <Page title="전체 상품">
      {isLoading
        ? "로딩중 ..."
        : products.map((product: any) => (
            <div key={product.id}>{product.name}</div>
          ))}
    </Page>
  );
}

export default ProductsListPage;
