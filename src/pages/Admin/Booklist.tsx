import { useEffect, useState } from "react";
import BookCard from "../../components/Book";
import axios from "axios";
import AddBookModal from "../../components/AddBookModal";
import { v4 } from "uuid";

interface Book {
  id: string;
  cover_img: string;
  title: string;
  purchased_date: string;
  price: number;
  count: number;
  isPaid: boolean;
  isPublished: boolean;
  sales: number;
}

const BookList = () => {
  const [booksData, setBooksData] = useState<Book[]>([]);
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  console.log(booksData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get("https://d38686458ba89a5d.mokky.dev/books")
          .then((req) => setBooksData(req.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <section>
      <div className="container">
        <h2 className="title">Books List ( admin )</h2>
      </div>
      {showAddBookModal ? (
        <AddBookModal
          setShowModal={setShowAddBookModal}
          setBooksData={setBooksData}
        />
      ) : (
        ""
      )}
      <div className="container rounded-3xl px-10 py-7 mb-30 shadow-[0 10px 10px 10px #8f8b8b21]  justify-between gap-5">
        <p>{booksData?.length} books found</p>
        <button onClick={() => setShowAddBookModal(true)} className="btn">
          + NEW BOOK
        </button>
      </div>
      <div className="container">
        <div className="flex justify-center flex-wrap g-[70px]">
          {booksData?.map((book) => {
            return (
              <BookCard key={v4()} book={book} setBooksData={setBooksData} />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BookList;
