import { useInfiniteQuery } from "@tanstack/react-query";
import React, { Fragment } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

const fetchFood = async ({ pageParam = 1 }) => {
  console.log(pageParam);
  return await axios.get(
    `http://localhost:4000/food?_limit=1&_page=${pageParam}`
  );
};
export default function InfinityQueryPage() {
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
    initialPageParam: 0,
    getNextPageParam: (_lastPage, pages) => {
      if (
        pages &&
        Array.isArray(pages) &&
        pages.length > 0 &&
        pages.length < 4
      ) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error : {error.message}</div>;
  }
  const content = data?.pages.map((group, i) => {
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
