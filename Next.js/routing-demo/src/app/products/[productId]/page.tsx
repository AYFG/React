export default function DetailsProduct({
  params,
}: {
  params: { productId: string };
}) {
  return <div>Details about product {params.productId}</div>;
}
