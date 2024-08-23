import axios from "axios";
import { useEffect, useState } from "react";

interface Order {
  id: string;
  cover_img: string;
  title: string;
  purchased_date: string;
  price: number;
  count: number;
  isPaid: boolean;
}

const Order = () => {
  const [ordersData, setOrdersData] = useState<Order[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://d38686458ba89a5d.mokky.dev/orders"
        );
        setOrdersData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <section>
      <div className="container">
        <h2 className="title">Orders List (admin)</h2>
      </div>
      <div className="container orders">
        <div className="column">
          <b>Product</b>
          <b>Purchase Date</b>
          <b>Price</b>
          <b>Count</b>
          <b>Total</b>
          <b>Status</b>
        </div>
        {ordersData?.map((item) => (
          <div className="column" key={item.id}>
            <div className="flex items-center gap-2">
              <img src={"/" + item.cover_img} alt={item.title} />
              <h2>
                {item.title.length > 70
                  ? item.title.slice(0, 70) + "..."
                  : item.title}
              </h2>
            </div>
            <p>{item.purchased_date}</p>
            <p>${item.price}</p>
            <p>{item.count}</p>
            <p>${item.price * item.count}</p>
            <li className={item.isPaid ? "paid" : "created"}>
              {item.isPaid ? "Paid" : "Created"}
            </li>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Order;
