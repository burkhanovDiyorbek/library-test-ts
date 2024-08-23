import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Dispatch, SetStateAction, useState, FC } from "react";
import { storage } from "../firebaseConfig";
import { v4 } from "uuid";

interface EditModalProps {
  book: Book;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setBooksData: Dispatch<SetStateAction<Book[]>>;
}

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

const EditModal: FC<EditModalProps> = ({
  setShowModal,
  book,
  setBooksData,
}) => {
  const [title, setTitle] = useState<string>(book?.title);
  const [price, setPrice] = useState<number>(book?.price);
  const [isPublished, setIsPublished] = useState<boolean>(book?.isPublished);
  const [coverImg, setCoverImg] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let downloadURL = book?.cover_img;

      if (coverImg) {
        const imageRef = ref(storage, `images/${v4()}`);
        await uploadBytes(imageRef, coverImg);
        downloadURL = await getDownloadURL(imageRef);
      }

      await axios
        .patch(`https://d38686458ba89a5d.mokky.dev/books/${book?.id}`, {
          ...book,
          title: title,
          price: price,
          isPublished: isPublished,
          cover_img: downloadURL,
        })
        .then(({ data }) =>
          setBooksData((prev) =>
            prev.map((item) => (item?.id === data?.id ? data : item))
          )
        );
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <button onClick={() => setShowModal(false)}>❌</button>
        <form className="modal-content" onSubmit={handleSubmit}>
          <label>
            <p>Book cover img</p>
            <input
              type="file"
              placeholder="select cover img"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setCoverImg(file);
                }
              }}
            />
          </label>
          <label>
            <p>Book title</p>
            <input
              type="text"
              value={title}
              onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
            />
          </label>
          <label>
            <p>Book price</p>
            <input
              type="number"
              value={price}
              onInput={(e) =>
                setPrice(parseFloat((e.target as HTMLInputElement).value))
              }
            />
          </label>
          <label>
            <p>IsPublished</p>
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
            />
          </label>
          <button className="btn" type="submit">
            EDIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
