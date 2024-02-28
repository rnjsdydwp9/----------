"use client";

import Page from "@/components/Page";
import { useQuery } from "@tanstack/react-query";

const getProductsUrl =
  "https://port-0-express-server-17xco2nlsidlckv.sel5.cloudtype.app/products";

function HomePage() {
  const {
    data: products,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryFn: () =>
      fetch(getProductsUrl)
        .then((response) => response.json())
        .then((data) => data.result),
    queryKey: ["products"],
  });

  if (isError) {
    return <Page title="홈">에러났어요...</Page>;
  }

  return (
    <Page title="홈">
      <div className="bg-red-50 h-[400px]">
        이곳은 배너 영역~~ 쇼핑몰 배너 상상해 주세요~
      </div>

      <div>
        <h2>전체 상품 미리보기 영역~</h2>

        {isLoading
          ? "로딩중 ..."
          : products.map((product: any) => (
              <div key={product.id}>{product.name}</div>
            ))}
      </div>
    </Page>
  );
}

export default HomePage;
