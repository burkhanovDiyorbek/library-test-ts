import type { FC } from "react";
import { Dispatch, SetStateAction, useState } from "react";
import Modal from "./Modal";

interface Book {
  id: string;
  title: string;
  isPublished: boolean;
  cover_img: string;
  sales: number;
  price: number;
}

interface BookUserProps {
  book: Book;
  setBooksData: Dispatch<SetStateAction<Book[]>>;
}
const BookUser: FC<BookUserProps> = ({ book, setBooksData }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  window.addEventListener("keydown", (e) => {
    if (e.key == "Escape") {
      setShowModal(false);
    }
  });
  return (
    <div className="max-w-[350px] w-[100%]" key={book?.id}>
      <div className=" rounded-3xl overflow-hidden h-48">
        <img src={`${book?.cover_img}`} className="h-[100%] w-[100%]" />
      </div>
      <h2 className=" text-3xl my-4">
        {book?.title?.length > 200 ? book?.title?.slice(0, 200) : book?.title}
      </h2>
      <div className="flex justify-between items-center">
        <div>
          <span className="text-[12px] font-bold">PRICE</span>
          <p className="text-2xl text-blue-800 font-extrabold">
            $ {book?.price}
          </p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn">
          BUY
        </button>
      </div>
      {showModal ? (
        <Modal
          book={book}
          setShowModal={setShowModal}
          setBooksData={setBooksData}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default BookUser;
