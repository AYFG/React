import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function UseQueryPage() {
  const fetchFood = async ({ pageParam = 1 }) => {
    const response = await axios.get(`http://localhost:4000/food`);
    return response.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["food"],
    queryFn: fetchFood,
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error : {error.message}</div>;
  }

  return (
    <>
      <FoodContainer>
        {data &&
          data?.map((음식들) => (
            <div>
              <FoodName>Name: {음식들.name}</FoodName>
              <FoodCategory>Category: {음식들.category}</FoodCategory>
            </div>
          ))}
      </FoodContainer>
      <Link to="/infinity">infinityQuery 페이지 이동</Link>
    </>
  );
}
const FoodContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const FoodName = styled.p``;
const FoodCategory = styled.p``;
