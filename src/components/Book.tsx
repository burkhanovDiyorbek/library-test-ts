import React, { useState } from "react";
import axios from "axios";
import EditModal from "./EditModal";

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

type BookProps = {
  book: Book;
  setBooksData: React.Dispatch<React.SetStateAction<Book[]>>;
};
const BookCard: React.FC<BookProps> = ({ book, setBooksData }) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const delBtnClickFunc = async (id: string) => {
    try {
      await axios
        .delete(`https://d38686458ba89a5d.mokky.dev/books/${id}`)
        .then(() => {
          setBooksData((prev) => prev?.filter((item) => item?.id !== id));
        });
    } catch (error) {
      console.error(error);
    }
    setShowAlert(false);
  };

  return (
    <div className="max-w-[330px] w-[100%]">
      {showAlert && (
        <div className="modal-container">
          <div className=" rounded-lg bg-white text-red-600 flex flex-col py-5 px-10">
            <h2>
              Do you really want to delete <q>{book?.title}</q>?
            </h2>
            <div className="flex gap-2">
              <button onClick={() => setShowAlert(false)} className="btn">
                No, cancel it
              </button>
              <button
                className="btn-warning"
                onClick={() => delBtnClickFunc(book?.id)}
              >
                Yes, do it
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-3xl overflow-hidden mb-5 h-48">
        <img
          src={`${book?.cover_img}`}
          alt="Book Cover"
          className="w-[100%] h-[100%]"
        />
      </div>
      <span
        className={` inline-block px-5 py-2 mb-3 text-white rounded-lg ${
          book?.isPublished ? " bg-green-700" : " bg-gray-400"
        }`}
      >
        {book?.isPublished ? "Published" : "Draft"}
      </span>
      <h2 className="text-3xl font-bold mb-5">
        {book?.title?.length > 200 ? book?.title?.slice(0, 200) : book?.title}
      </h2>
      <p className="mb-3">
        Sales: <span className="font-bold">{book?.sales}</span>
      </p>
      <div className="book-data flex justify-between">
        <div>
          <span className="text-sm">PRICE</span>
          <p className="font-extrabold text-xl">$ {book?.price}</p>
        </div>
        <button className="btn" onClick={() => setShowEditModal(true)}>
          EDIT
        </button>
        <button className="btn-warning" onClick={() => setShowAlert(true)}>
          DELETE
        </button>
        {showEditModal && (
          <EditModal
            book={book}
            setShowModal={setShowEditModal}
            setBooksData={setBooksData}
          />
        )}
      </div>
    </div>
  );
};

export default BookCard;
