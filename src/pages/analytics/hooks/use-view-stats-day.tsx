import instance from "@/shared/model/api/axios-instance";
import { useEffect, useState } from "react";

async function fetchViewStatsForDay(date: string) {
  try {
    const response = await instance.get(`/views/stats?date=${date}`);
    console.log("Response fetchViewStatsForDay - ", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default function useViewStatsDay() {
  const [views, setViews] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const timeNow = new Date();
  const timeNowISOString = timeNow.toISOString();

  useEffect(() => {
    fetchViewStatsForDay(timeNowISOString)
      .then((data) => {
        setViews(data);
      })
      .catch((error) => setError(error))
      .finally(() => setIsPending(false));
  }, []);

  return { views, isPending, error };
}
