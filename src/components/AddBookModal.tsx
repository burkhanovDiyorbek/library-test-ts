import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRef, useState, type FC } from "react";
import { storage } from "../firebaseConfig";
import { v4 } from "uuid";

interface AddBookModalProps {
  setShowModal: (show: boolean) => void;
  setBooksData: (update: (prev: BookList[]) => BookList[]) => void;
}

interface BookList {
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

const AddBookModal: FC<AddBookModalProps> = ({
  setShowModal,
  setBooksData,
}) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const publishedRef = useRef<HTMLInputElement>(null);
  const [imageUpload, setImageUpload] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (imageUpload == null) return;

    const imageRef = ref(storage, `images/${v4()}`);

    try {
      await uploadBytes(imageRef, imageUpload);
      const downloadURL = await getDownloadURL(imageRef);

      const data = {
        title: titleRef.current?.value || "",
        price: Number(priceRef.current?.value || 0),
        isPublished: publishedRef.current?.checked || false,
        cover_img: downloadURL,
        sales: 0,
      };

      const response = await axios.post(
        "https://d38686458ba89a5d.mokky.dev/books",
        data
      );

      setBooksData((prev) => [...prev, response.data]);
      setShowModal(false);
    } catch (error) {
      console.log("Upload failed:", error);
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
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  setImageUpload(file);
                }
              }}
            />
          </label>
          <label>
            <p>Book title</p>
            <input type="text" ref={titleRef} />
          </label>
          <label>
            <p>Book price</p>
            <input type="number" ref={priceRef} />
          </label>
          <label>
            <p>IsPublished</p>
            <input type="checkbox" ref={publishedRef} />
          </label>
          <button className="btn">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;
