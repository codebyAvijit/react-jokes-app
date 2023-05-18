import React, { useEffect, useState } from "react";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import axios from "axios";
import "./home.css";

const Home = () => {
  const [data, setData] = useState([]);
  const [book, setBook] = useState([]);
  const [show, setShow] = useState(false);
  const getData = async () => {
    const joke = await axios.get(
      `https://official-joke-api.appspot.com/random_joke`
    );
    setData(joke.data);
  };

  const onhandlebook = () => {
    setShow(!show);
    setBook(JSON.parse(localStorage.getItem("Bookmarks")));
  };

  const onBookmark = () => {
    let arr = [];
    let temp = false;
    if (localStorage.getItem("Bookmarks")) {
      JSON.parse(localStorage.getItem("Bookmarks")).map((item) => {
        if (item.id === data.id) {
          alert("Already Added");
          temp = true;
          return;
        }
      });
      if (temp === true) {
        return;
      } else {
        arr.push(...JSON.parse(localStorage.getItem("Bookmarks")));
      }
    }
    arr.push(data);
    localStorage.setItem("Bookmarks", JSON.stringify(arr));
    setBook(JSON.parse(localStorage.getItem("Bookmarks")));

    // console.log(JSON.parse(localStorage.getItem("Bookmarks")))
  };

  const handleRemove = (id) => {
    let arr = JSON.parse(localStorage.getItem("Bookmarks")).filter((data) => {
      return data.id !== id;
    });
    localStorage.setItem("Bookmarks", JSON.stringify(arr));
    setBook(JSON.parse(localStorage.getItem("Bookmarks")));
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="home">
      <div className="cont">
        <div className="cont-head">
          <h1>Jokes Application</h1>
          <div className="cont-div">
            <BookmarkAddIcon onClick={onhandlebook} className="icon" />
          </div>
        </div>
        <div className="cont-main">
          <p>{`${data.setup}${data.punchline}`}</p>
        </div>
        <div className="cont-foot">
          <button className="next" onClick={getData}>
            New Joke
          </button>
          <button className="book-btn" onClick={onBookmark}>
            Bookmark
          </button>
        </div>
      </div>
      {show && (
        <>
          <h1 className="book-head">Bookmarks</h1>
          <div className="bookmark-sec">
            {book.map((item) => {
              return (
                <div className="book" key={item.id}>
                  <p>{`${item.setup}${item.punchline}`}</p>
                  <button
                    className="next"
                    onClick={() => {
                      handleRemove(item.id);
                    }}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
