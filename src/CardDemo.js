import { Button, Card, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import RemoveIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({
  cardStl: {
    width: "25vw",
    height: "8vh",
    backgroundColor: "pink",
    margin: "3%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border:'2px solid #333',
    borderRadius:'8px'
  },
}));

export default function CardDemo() {
  const classes = useStyles();
  // myCardList
  const [cardList, setCardList] = useState([]);
  // counter for plus one
  const [couter, setCouter] = useState(1);

  const addCard = () => {
    setCardList([...cardList, "Card " + couter]);
    setCouter(couter + 1);
  };

  const removeCard = (data) => {
    const cards = cardList.filter((card) => data !== card);
    setCardList(cards);

    // found Last Card Details
    var last = cardList[cardList.length - 1];
    const myArray = last.split("Card ");
    var cardPos = parseInt(myArray[1]);
    // found Deleted Card Details
    const findDeletedCard = cardList.filter((card) => data === card);
    var delCard = findDeletedCard[0];
    var getLastPos = delCard.split("Card ");
    var delCardNo = getLastPos[1];

    // Is Empty?
    if (cardList.length === 1) {
      console.log(cardList);
      setCouter(1);
      return;
    }
    // Is Last?
    if (parseInt(cardPos) === parseInt(delCardNo)) {
      setCouter(cardPos);
      return;
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        style={{ padding: "2%" }}
        onClick={() => addCard()}
      >
        Add Card
      </Button>

      {/* body */}
      <div>
        {cardList.map((data) => (
          <div className={classes.cardStl}>
            <Typography
              style={{
                flex: 1,
                padding: "2%",
                fontWeight: "bold",
                // color: "white",
              }}
            >
              {data}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => removeCard(data)}
              startIcon={
                <RemoveIcon/>
              }
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
