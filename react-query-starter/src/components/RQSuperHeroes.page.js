import { useSuperHeroesData } from "./hooks/useSuperHeroesData";

export const RQSuperHeroesPage = () => {
  const onSuccess = (data) => {
    console.log("데이터 가져오기 후 콜백 함수 실행", data);
  };
  const onError = (error) => {
    console.log("오류 발생 후 콜백 함수 실행", error);
  };
  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError);

  console.log({ isLoading, isFetching });
  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      <button onClick={refetch}>Fetch Heroes</button>
      {data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })}
    </>
  );
};
