import {
    Button,
    Card,
    IconButton,
    makeStyles,
    TextField,
    Tooltip,
    Typography,
  } from "@material-ui/core";
  import React, { useEffect, useState } from "react";
  import AddIcon from "@material-ui/icons/Add";
  import EditIcon from "@material-ui/icons/Edit";
  import CompletedIcon from "@material-ui/icons/CheckCircle";
  import NotCompletedIcon from "@material-ui/icons/CheckCircleOutline";
  import DeleteIcon from "@material-ui/icons/Delete";
  import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";
  
  const useStyle = makeStyles((theme) => ({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100vw",
      height: "100vh",
      backgroundColor: "#FEE3EC",
    },
  
    mainCard: {
      backgroundColor: "#F999B7",
      [theme.breakpoints.down("md")]: {
        width: "55vw",
        height: "82vh",
      },
      [theme.breakpoints.down("sm")]: {
        width: "85vw",
        height: "82vh",
      },
      width: "25vw",
      height: "80vh",
    },
    header: {
      height: "5vh",
      textAlign: "center",
      padding: "2%",
      backgroundColor: "#DB6B97",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    commonFlex: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    fieldOutline: {
      borderWidth: "1px",
      borderColor: "#DB6B97 !important",
    },
    body: {
      overflowY: "scroll",
      height: "62vh",
      "&::-webkit-scrollbar": {
        width: "0.4em",
      },
    },
  }));
  
  export default function ToDo() {
    const classes = useStyle();
    const navigation = useNavigate()
    const [btnText, setBtnText] = useState("Add");
    const [tempFieldData, setTempFieldData] = useState(""); // { text: "", isComplete: false }
  
    const [myList, setMyList] = useState([]);
  
    const addToDo = () => {
      console.log(tempFieldData);
      if (tempFieldData.trim() === "") {
        alert("TextField Cannot be Empty")
      } else {
        setMyList([
          ...myList,
          { id: uuid(), text: tempFieldData, isComplete: false },
        ]);
      }
      setTempFieldData("");
    };
  
    const fieldToDo = (e) => {
      setBtnText("Add");
      let data = e.target.value;
      setTempFieldData(data);
      console.log(data);
    };
  
    const completeToDo = (sToDo) => {
      // console.log(myList[index]);
      // myList[index].isComplete  = !myList[index].isComplete
      // setMyList(myList)
  
      var comOb = {};
  
      myList.map((data) => {
        if (data.id === sToDo.id) {
          comOb = data.isComplete = !data.isComplete;
        }
      });
      setMyList(myList);
      console.log(comOb);
    };
  
    const editToDo = (id) => {
      setBtnText("Edit");
      const findObj = myList.find((todo) => todo.id === id);
      console.log(findObj);
      setTempFieldData(findObj.text);
    };
  
    const deleteToDo = (id) => {
      const delUpdList = myList.filter((item) => item.id !== id);
      setMyList(delUpdList);
    };


    // navToCard
    const navToCard = () => {
        navigation("/card")
    }
  
    useEffect(() => {
  
    }, [myList]);
  
    return (
      <div className={classes.root}>
        <Card className={classes.mainCard} elevation={10}>
          {/* Header */}
          <div className={classes.header}>
            <Typography
              style={{ fontWeight: "bold", color: "white", fontSize: "20px" }}
            >
              Todo-List
            </Typography>
          </div>
          {/* Input and button */}
          <div
            style={{
              display: "flex",
              padding: "2%",
            }}
          >
            <TextField
              variant="outlined"
              style={{ flex: 1, marginRight: "1%", marginLeft: "1%" }}
              placeholder="Enter Todo"
              InputProps={{
                classes: {
                  notchedOutline: classes.fieldOutline,
                },
              }}
              value={tempFieldData}
              onChange={(e) => fieldToDo(e)}
            />
  
            <Button
              variant="contained"
              style={{
                backgroundColor: "#F999B7",
                color: "white",
                fontWeight: "bold",
                marginRight: "2%",
                marginLeft: "2%",
              }}
              startIcon={btnText === "Add" ? <AddIcon /> : <EditIcon />}
              onClick={() => addToDo()}
            >
              {btnText}
            </Button>
          </div>
  
          {/* body */}
          <div className={classes.body}>
            {myList.map((data, index) => (
              <div>
                <Card style={{ margin: "2%", padding: "2%" }}>
                  <div className={classes.commonFlex}>
                    {data.isComplete ? (
                      <Typography
                        style={{
                          flex: 1,
                          textDecoration: "line-through",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {data.text}
                      </Typography>
                    ) : (
                      <Typography
                        style={{
                          flex: 1,
                          fontWeight: "bold",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {data.text}
                      </Typography>
                    )}
  
                        <Tooltip title="Complete" placement="left">
                        <IconButton onClick={() => completeToDo(data)}>
                      {data.isComplete ? (
                        <CompletedIcon style={{ color: "green" }} />
                      ) : (
                        <NotCompletedIcon style={{ color: "green" }} />
                      )}
                    </IconButton>
                        </Tooltip>
                   
                   <Tooltip title="Edit" placement="bottom">
                   <IconButton onClick={() => editToDo(data.id)}>
                      <EditIcon style={{ color: "orange" }} />
                    </IconButton>
                   </Tooltip>
                  
                    <Tooltip title="Delete" placement="right" >
                    <IconButton onClick={() => deleteToDo(data.id)}>
                      <DeleteIcon style={{ color: "red" }} />
                    </IconButton>
                    </Tooltip>

                  </div>
                </Card>
              </div>
            ))}
          </div>
  
          {/* footer */}
          <div
            className={classes.commonFlex}
            style={{
              height: "3vh",
            }}
          >
            <Typography
              style={{
                textAlign: "center",
                fontSize: "15px",
                color: "whitesmoke",
                flex:1
              }}
            >
              Developer: mbganesh
            </Typography>

            <Button style={{backgroundColor:'darkcyan' , color:'white'  , flex:1}}
            onClick={() => navToCard()}
            >
              Nav Card Page
            </Button>
          </div>
        </Card>
      </div>
    );
  }
  
  