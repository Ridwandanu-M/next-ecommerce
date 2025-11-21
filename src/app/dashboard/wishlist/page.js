export default function WishlistPage() {
  const items = [
    {
      name: "item1",
      category: "headset",
      price: "Rp 2.000.000",
    },
    {
      name: "item2",
      category: "headset",
      price: "Rp 2.000.000",
    },
    {
      name: "item3",
      category: "headset",
      price: "Rp 2.000.000",
    },
    {
      name: "item4",
      category: "headset",
      price: "Rp 2.000.000",
    },
    {
      name: "item4",
      category: "headset",
      price: "Rp 2.000.000",
    },
    {
      name: "item4",
      category: "headset",
      price: "Rp 2.000.000",
    },
    {
      name: "item4",
      category: "headset",
      price: "Rp 2.000.000",
    },
    {
      name: "item4",
      category: "headset",
      price: "Rp 2.000.000",
    },
    {
      name: "item4",
      category: "headset",
      price: "Rp 2.000.000",
    },
  ];
  return (
    <section>
      <h2 className="text-2xl font-medium">Wishlist</h2>
      <div>
        <ul className="flex flex-col gap-4 mt-4 h-[650px] overflow-auto no-scrollbar">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between border-b border-b-gray-200 pb-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-400"></div>
                <div className="flex flex-col">
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                </div>
              </div>
              <p>{item.price}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
