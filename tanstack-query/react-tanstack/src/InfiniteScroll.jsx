/* eslint-disable */
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { Fragment, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

const fetchFood = async ({ pageParam }) => {
  console.log(pageParam);
  return await axios.get(
    `http://localhost:4000/food?_limit=1&_page=${pageParam}`
  );
};

export default function InfinityQueryPage() {
  // const observer = new IntersectionObserver();
  // observer.observe;
  const observerElem = useRef(null);

  const {
    isLoading,
    isError,
    error,
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["food"],
    queryFn: fetchFood,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length;
    },
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error : {error.message}</div>;
  }
  const content =
    data &&
    data?.pages.map((group, i) => {
      console.log(group);
      return (
        <Fragment key={i}>
          {group.data.map((food) => (
            <div key={food.id}>
              <FoodName>Name: {food.name}</FoodName>
              <FoodCategory>Category: {food.category}</FoodCategory>
            </div>
          ))}
        </Fragment>
      );
    });

  return (
    <FoodContainer>
      <Link to="/">뒤로</Link>
      {content}
      <NextFood disabled={!hasNextPage} onClick={fetchNextPage}>
        다음 음식 불러오기
      </NextFood>
      <div>{isFetching && !isFetchingNextPage ? "fetching..." : null}</div>
    </FoodContainer>
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
const NextFood = styled.button``;
