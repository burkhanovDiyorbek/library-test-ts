import { useEffect, useState, FC } from "react";
import BookUser from "../../components/BookUser";
import axios from "axios";

// Book tipini aniqlash
interface Book {
  id: string;
  title: string;
  isPublished: boolean;
  cover_img: string;
  sales: number;
  price: number;
}

const Home: FC = () => {
  const [booksData, setBooksData] = useState<Book[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://d38686458ba89a5d.mokky.dev/books"
        );
        setBooksData(response.data.filter((item: Book) => item.isPublished));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <section>
      <div className="container">
        <h2 className="title">Home Page for user</h2>
      </div>
      <div className="container">
        <div className="books flex flex-wrap gap-10 justify-center">
          {booksData?.map((book) => (
            <BookUser key={book.id} book={book} setBooksData={setBooksData} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
