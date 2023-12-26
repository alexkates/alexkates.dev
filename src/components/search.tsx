import { Input } from "./ui/input";

type Props = {
  placeholder: string;
};

function Search({ placeholder }: Props) {
  return <Input placeholder={placeholder} />;
}

export default Search;
