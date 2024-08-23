// import React, { useEffect, useState } from "react";
// import { imageDb } from "./firebaseConfig";
// import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
// import { v4 as uuidv4 } from "uuid";

// const FirebaseImageUpload: React.FC = () => {
//   const [img, setImg] = useState<File | string>("");
//   const [imgUrl, setImgUrl] = useState<string[]>([]);

//   const handleClick = (e) => {
//     const imgs = ref(imageDb, `Imgs/${uuidv4()}`);
//     uploadBytes(imgs, e.target.files[0]).then((data) => {
//       console.log(data, "imgs");
//       getDownloadURL(data.ref).then((val) => {
//         setImg(val);
//       });
//     });
//   };

//   useEffect(() => {
//     listAll(ref(imageDb, "files")).then((result) => {
//       console.log(result);
//       result.items.forEach((val) => {
//         getDownloadURL(val).then((url) => {
//           setImgUrl((prevUrls) => [...prevUrls, url]);
//         });
//       });
//     });
//   }, []);

//   return (
//     <div className="App">
//       <input
//         type="file"
//         onChange={(e) => {
//           if (e.target.files && e.target.files.length > 0) {
//             setImg(e.target.files[0]);
//           }
//         }}
//       />
//       <button onClick={handleClick}>Upload</button>
//       <br />
//       {imgUrl.map((dataVal, index) => (
//         <div key={index}>
//           <img
//             src={dataVal}
//             height="200px"
//             width="200px"
//             alt={`Uploaded ${index}`}
//           />
//           <br />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FirebaseImageUpload;

// import type { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home/Home";
import Admin from "./pages/Admin/Admin";
import BookList from "./pages/Admin/Booklist";
import Order from "./pages/Admin/Order";
import "./App.css";
// interface AppProps {}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="admin" element={<Admin />}>
          <Route index element={<BookList />} />
          <Route path="orders" element={<Order />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
