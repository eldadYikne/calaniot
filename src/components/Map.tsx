import React, { useEffect, useState } from "react";
import User from "../types/user";
import chair from "../assets/chair.svg";
import man from "../assets/man.svg";
import { collection } from "firebase/firestore";
import { db } from "..";
import { onSnapshot } from "firebase/firestore";
import { Button } from "@mui/material";

function Map() {
  const seat = [8, 18];
  const allSeats: any = [];
  const [seats, setSeats] = useState<any>();
  useEffect(() => {
    async function fetchData() {
      // await getUsers();
    }
    fetchData();
  }, [seats]);

  const getUsers = async () => {
    let updatedUsers: User[] = [];
    const unsub = await onSnapshot(collection(db, "users"), (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let updatedUser: any = { id: String(doc.id), ...doc.data() };
        if (doc.data().name === "הלוי") {
          console.log("Document ID: ", doc.id);
          console.log("Document data: ", doc.data());
        }
        updatedUsers.push(updatedUser);
      });
      getSeats(JSON.parse(JSON.stringify(updatedUsers)));
      updatedUsers = [];
    });

    // await getDocs(collection(db, "users"))
    //   .then((shot) => {
    //     const news = shot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    //     // setUsers(news);
    //     console.log("news", news);
    //     getSeats(news as User[]);
    //   })
    //   .catch((error) => console.log(error));
  };

  const getSeats = (users: User[]) => {
    try {
      console.log("users", users);
      for (var i = 0; i < seat[0]; i++) {
        allSeats[i] = [];
        for (var j = 0; j < seat[1]; j++) {
          if (j > 6 && j < 11 && i > 2) {
            allSeats[i][j] = "";
          } else {
            let currentSeat = `${i}${j}`;
            allSeats[i][j] =
              users.find((user: User) =>
                user.seats?.find((seat: string) => seat === currentSeat)
              ) ?? currentSeat;
          }
        }
      }
      setSeats(JSON.parse(JSON.stringify(allSeats)));
      console.table(allSeats);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      dir="ltr"
      className="bg-amber-700  flex flex-col items-center  justify-center text-white"
    >
      <Button onClick={getUsers} color="inherit">
        הצג מפה
      </Button>
      <table>
        <tbody>
          {seats?.length > 1 &&
            seats?.map((row: any, rowIndex: number) => (
              <tr className="py-2 flex" key={rowIndex}>
                {row.map((seatData: any, columnIndex: number) => {
                  let currentSeatNumber = `${rowIndex}${columnIndex}`;
                  return seatData.name ? (
                    <td
                      className="px-2 w-14 h-14 flex flex-col items-center justify-center relative"
                      key={columnIndex}
                      style={{
                        marginLeft:
                          (currentSeatNumber?.length === 3 &&
                            currentSeatNumber?.split("")[2] === "4") ||
                          (currentSeatNumber?.length === 2 &&
                            currentSeatNumber?.split("")[1] === "4") ||
                          (currentSeatNumber?.length === 2 &&
                            currentSeatNumber?.split("")[1] === "9")
                            ? "25px"
                            : "",
                      }}
                    >
                      <img
                        src={chair}
                        className="w-12 h-12 shadow-xl"
                        alt="logo"
                      />
                      {typeof seatData === "object" && seatData.present && (
                        <img
                          src={man}
                          className="w-4 h-4 absolute bottom-[30px]"
                          alt="man"
                        />
                      )}
                      <span
                        className="shadow-innerdow"
                        style={{
                          fontSize:
                            seatData.name.split(" ").length === 2
                              ? "9px"
                              : "12px",
                        }}
                      >
                        {typeof seatData === "object"
                          ? seatData.name
                          : seatData}
                        {/* {currentSeatNumber} */}
                      </span>
                    </td>
                  ) : (
                    <td
                      className="px-2 w-14 h-14 flex flex-col items-center justify-center relative"
                      key={columnIndex}
                      style={{
                        marginLeft:
                          (currentSeatNumber?.length === 3 &&
                            currentSeatNumber?.split("")[2] === "4") ||
                          (currentSeatNumber?.length === 2 &&
                            currentSeatNumber?.split("")[1] === "4") ||
                          (currentSeatNumber?.length === 2 &&
                            currentSeatNumber?.split("")[1] === "9")
                            ? "25px"
                            : "",
                      }}
                    >
                      {/* {currentSeatNumber} */}
                      {currentSeatNumber === "48" && (
                        <div className=" border-2 flex justify-center items-center absolute border-black h-32 w-44 left-[-18px] text-black ">
                          תיבה
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
        </tbody>
      </table>
      <div className=" border-2 flex justify-center items-center p-2 mb-2  border-black h-32 w-3/4 left-[-18px] text-black ">
        ארון
      </div>
    </div>
  );
}

export default Map;