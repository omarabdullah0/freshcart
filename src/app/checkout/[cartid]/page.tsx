import CheckOut from '../CheckOut'

export default async function page({ params }: { params: Promise<{ cartid: string }> }) {
  
  const resolvedParams = await params;
  const cartid = resolvedParams.cartid;

  console.log('Cart ID fetched on Server:', cartid);
  if (!cartid) {
    return <div className="text-center py-10">Error: Cart ID not found in URL.</div>
  }
  return (
    <CheckOut cartId={cartid}></CheckOut>
  );
}