import "./card.css";
import Heart from "../../img/heart.svg";
import HeartFilled from "../../img/heartFilled.svg";
import Comment from "../../img/comment.svg";
import Share from "../../img/share.svg";
import Info from "../../img/info.svg";
import { useState } from "react";

const Card = ({ post, user, socket }) => {
  const [liked, setLiked] = useState(false);
  const handleClick = (action) => {
    socket.emit("sendNotification", {
      receiverName: post.username,
      senderName: user,
      action
    });
    console.log("kirim", {
      receiverName: post.username,
      senderName: user,
      action
    })
  };
  return (
    <div className="card">
      <div className="info">
        <img src={post.userImg} alt="" className="userImg" />
        <span>{post.fullname}</span>
      </div>
      <img src={post.postImg} alt="" className="postImg" />
      <div className="interaction">
        <div onClick={() => setLiked(prevLike => !prevLike)}>
          {liked ? (
            <img src={HeartFilled} alt="" className="cardIcon"/>
          ) : (
            <img
              src={Heart}
              alt=""
              className="cardIcon"
              onClick={() => handleClick("like")}
            />
          )}
        </div>
        <img
          src={Comment}
          alt=""
          className="cardIcon"
          onClick={() => handleClick("comment")}
        />
        <img
          src={Share}
          alt=""
          className="cardIcon"
          onClick={() => handleClick("share")}
        />
        <img src={Info} alt="" className="cardIcon infoIcon" />
      </div>
    </div>
  );
};

export default Card;
