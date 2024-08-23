import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import NotificationModal from "./NotificationModal";

interface Notifications {
  id: string;
  title: string;
  price: number;
  count: number;
}

const Navbar = () => {
  const { pathname } = useLocation();
  const [showNotificationModal, setShowNotificationModal] =
    useState<boolean>(false);
  const [notificationsData, setNotificationsData] = useState<Notifications[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get("https://d38686458ba89a5d.mokky.dev/notifications")
          .then(({ data }) => setNotificationsData(data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <nav className="flex p-5">
      <div className="container justify-between items-center">
        <Link className="logo" to="/">
          LOGO
        </Link>
        <ul className="flex gap-5">
          <li>
            <Link to={"/"}>user</Link>
          </li>
          <li>
            <Link to={"/admin"}>admin</Link>
          </li>
          <li>
            <Link to={"/admin/orders"}>orders</Link>
          </li>
        </ul>
        <label htmlFor="">
          <input type="text" placeholder="Search" className=" border-2 p-2" />
        </label>
        {pathname.startsWith("/admin") ? (
          <div className="notification">
            {notificationsData.length > 0 ? (
              <span>{notificationsData.length}</span>
            ) : (
              ""
            )}
            <p onClick={() => setShowNotificationModal(true)}>Notification</p>
            {showNotificationModal ? (
              <NotificationModal
                setShowModal={setShowNotificationModal}
                dataArr={notificationsData}
                setData={setNotificationsData}
              />
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
};

export default Navbar;
