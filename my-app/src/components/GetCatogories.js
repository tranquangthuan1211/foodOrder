'use client'
import {useEffect, useState} from "react";
import urlFetch from "@/URl";
export function Categories() {
  const [data, setData] = useState(false);
  useEffect(() => {
    fetch(urlFetch.catogories)
    .then(response => response.json())
    .then(data => {
        setData(data);
      });
  }, []);

  return data;
}