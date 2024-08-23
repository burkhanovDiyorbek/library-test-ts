import axios from "axios";
import type { Dispatch, FC, SetStateAction } from "react";
import { Link } from "react-router-dom";

interface BookList {
  id: string;
  title: string;
  price: number;
  count: number;
}

interface NotificationModalProps {
  dataArr: BookList[];
  setData: Dispatch<SetStateAction<BookList[]>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const NotificationModal: FC<NotificationModalProps> = ({
  dataArr,
  setData,
  setShowModal,
}) => {
  const handleClick = async (id: string) => {
    try {
      await axios
        .delete("https://d38686458ba89a5d.mokky.dev/notifications/" + id)
        .then(() => setData((prev) => prev.filter((item) => item.id != id)));
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="modal-container">
      <div className="modal">
        <button onClick={() => setShowModal(false)}>❌</button>
        <div className="modal-content">
          <div className="flex flex-col">
            {dataArr.length > 0 ? (
              dataArr?.map((item) => {
                return (
                  <label
                    className="flex border-2 border-solid border-gray-300 rounded-lg py-2 px-4"
                    key={item?.id}
                    onClick={() => handleClick(item?.id)}
                  >
                    <Link to={"/admin/orders"}>
                      <div>
                        <h2>{item?.title}</h2>
                        <p>
                          ${item?.price} x {item?.count} = $
                          {item?.price * item?.count}
                        </p>
                      </div>
                    </Link>
                  </label>
                );
              })
            ) : (
              <p>You have not any notifications...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
