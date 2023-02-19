import React from "react";
import "./styles.css";
import {formatRelative, subDays} from 'date-fns'

type Props = {
  comments: any;
  date: Date;
  username: any;
  profilePic: string;
};
const CommentItem: React.FC<Props> = ({ comments, date, username, profilePic}: Props) => {
    const postedTime = formatRelative(subDays(date, 0), new Date())
  return (
    <li className="comment-item">
      <div className="comment-container">
        <img
          className="profile-img"
          src={`/avatars/${profilePic}`}
          alt="Profile Pic"
          width="35"
          height="35"
        />
        <div className="username-time-comment-container">
          <div className="username-time-container">
            <div className="d-flex align-items-center">
              <p className="username">{username}</p>
            </div>
            <div><p className="time">{postedTime}</p></div>
          </div>
          <div className="d-flex align-items-center">
            <p className="comment p-2">{comments}</p>
          </div>
        </div>
      </div>
      <hr className="lineBreak"/>
    </li>
  );
};

export default CommentItem;
