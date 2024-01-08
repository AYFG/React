import axios from "axios";
import { useQuery, useMutation } from "react-query";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const addSuperHero = (hero) => {
  return axios.post("http://localhost:4000/superheroes", hero);
};

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery("super-heroes", fetchSuperHeroes, {
    onSuccess,
    onError,
    // select: (data) => {
    //   const superHeroNames = data.data.map((hero) => hero.name);
    //   console.log(superHeroNames);
    //   return superHeroNames;
    // },
  });
};

export const useAddSuperHeroData = () => {
  return useMutation(addSuperHero);
};
