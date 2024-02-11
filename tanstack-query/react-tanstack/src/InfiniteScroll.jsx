import { useInfiniteQuery } from "@tanstack/react-query";
import React, { Fragment, useCallback, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";

const fetchFood = async ({ pageParam = 1 }) => {
  console.log(`pageParam: ${pageParam}`);
  return await axios.get(
    `http://localhost:4000/food?_limit=1&_page=${pageParam}`
  );
};

export default function InfinityQueryPage() {
  const observerElem = useRef(null);

  const { isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["food"],
      queryFn: fetchFood,
      initialPageParam: 1,
      getNextPageParam: (_lastPage, pages) => {
        if (pages.length < 10) {
          return pages.length + 1;
        } else return null;
      },
    });

  const handleObserver = useCallback(
    (entries) => {
      const [target] = entries;
      console.log(target);
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    const element = observerElem.current;
    console.log(observerElem);

    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (element) observer.observe(element);
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [fetchNextPage, hasNextPage, handleObserver]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  const content =
    data &&
    data?.pages.map((group, i) => {
      console.log(group);
      return (
        <Fragment key={i}>
          {group.data.map((food) => (
            <Box key={food.id}>
              <FoodName>Name: {food.name}</FoodName>
              <FoodCategory>Category: {food.category}</FoodCategory>
            </Box>
          ))}
        </Fragment>
      );
    });

  return (
    <FoodContainer>
      {content}
      <div className="loader" ref={observerElem}>
        {isFetchingNextPage && hasNextPage ? "Loading..." : "No search left"}
      </div>
    </FoodContainer>
  );
}

const FoodContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Box = styled.div`
  border: 1px solid black;
  height: 100vh;
`;
const FoodName = styled.p``;
const FoodCategory = styled.p``;
