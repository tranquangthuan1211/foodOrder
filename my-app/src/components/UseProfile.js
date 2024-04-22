'use client'
import {useEffect, useState} from "react";
import { getCookie } from "cookies-next";
import urlFetch from "@/URl";

export function useProfile() {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);
  const status = getCookie('c_user')
  useEffect(() => {
    setLoading(true);
    fetch(urlFetch.profile+status)
    .then(response => response.json())
    .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);

  return {loading, data};
}