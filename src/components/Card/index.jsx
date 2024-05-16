import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

function Card({
  isWinner,
  subheader,
  avatar,
  href,
  name,
  children,
}) {
  const className = isWinner ? "card winner" : "card loser";

  return (
    <div className={className}>
      <h2 className="header-sm center-text">
        {isWinner?  "Winner " : "Loser "}
        <a className="link" href={href}>
          {name}
        </a>
      </h2>
      {subheader && <h4 className="Score-text">{subheader}점</h4>}
      <img className="avatar" src={avatar} alt={`Avatar for ${name}`} />
      {children}
    </div>
  );
}

export default Card;

Card.propTypes = {
  subheader: PropTypes.number,
  avatar: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
