import { useState } from "react";
import { Link } from "react-router-dom";
import { useSuperHeroesData } from "./hooks/useSuperHeroesData";
import { useAddSuperHeroData } from "./hooks/useSuperHeroesData";

export const RQSuperHeroesPage = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const onSuccess = (data) => {
    console.log("데이터 가져오기 후 콜백 함수 실행", data);
  };
  const onError = (error) => {
    console.log("오류 발생 후 콜백 함수 실행", error);
  };
  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError);

  const {
    mutate: addHero,
    isLoading: mutateLoading,
    isError: mutateError,
    error: mutateErrorMessage,
  } = useAddSuperHeroData();

  if (mutateLoading) {
    return <h2>Post Loading...</h2>;
  }
  if (mutateError) {
    return <h2>{mutateErrorMessage.message}</h2>;
  }

  const handleAddHeroClick = () => {
    console.log({ name, alterEgo });
    const hero = { name, alterEgo };
    addHero(hero);
  };

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      <button onClick={refetch}>Fetch Heroes</button>
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
      {/* {data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })} */}
    </>
  );
};
