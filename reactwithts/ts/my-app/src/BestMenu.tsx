import { Menu } from "./model/restaurant";

interface OwnProps extends Omit<Menu, "price"> {
  showBestMenuName(name: string): string;
}
// type OwnProps = Menu & {
//   showBestMenuName(name: string): string;
// };

export const BestMenu: React.FC<OwnProps> = ({
  name,
  category,
  showBestMenuName,
}) => {
  return <div>{name}</div>;
};
