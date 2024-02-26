import { notFound } from "next/navigation";

function getRandomInt(count: number) {
  return Math.floor(Math.random() * count);
}

export default function ReviewDetail({
  params,
}: {
  params: {
    productId: string;
    reviewId: string;
  };
}) {
  const random = getRandomInt(2);
  if (random === 1) {
    throw new Error("난수를 이용한 에러 핸들링 학습중");
  }
  if (parseInt(params.reviewId) > 1000) {
    notFound();
  }

  return (
    <div>
      Review {params.reviewId} for product {params.productId}
    </div>
  );
}
