import { useState, useEffect } from "react";
import useSWR from "swr";
import axios from "axios";

const base = "https://react-getting-started-4000c-default-rtdb.firebaseio.com";
// const base = "FIREBASE_BASE_URL";

function LastSales(props) {
  const [sales, setSales] = useState(props.sales);
  // const [isLoading, setIsLoading] = useState();

  const { data, err } = useSWR(base + "/sales.json", (url) =>
    axios.get(url).then((res) => res.data)
  );

  useEffect(() => {
    if (data) {
      const sales = [];
      for (const key in data) {
        const sale = {
          id: key,
          ...data[key],
        };
        sales.push(sale);
      }
      setSales(sales);
    }
  }, [data]);

  if (err) {
    return <p>error!</p>;
  }

  if (!data || !sales) {
    return <p>Loading...</p>;
  }

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  // if (!sales) {
  //   return <p>No data yet</p>;
  // }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await axios.get(base + "/sales.json");
  const data = response.data;
  const sales = [];

  for (const key in data) {
    sales.push({
      id: key,
      ...data[key],
    });
  }
  return { props: { sales: sales }, revalidate: 10 };
}

export default LastSales;
