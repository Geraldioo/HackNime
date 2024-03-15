import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../constant";


function DetailPage() {
  const [anime, setAnime] = useState(null);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const { data } = await axios({
        method: "GET",
        url: `${BASE_URL}/anime/${id}`,
      });
      console.log(data, "<<< INI DATA DI DETAIL");
      setAnime(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return(
    <>
    <h1>HELLO WORLD</h1>
    </>
  )
}

export default DetailPage