import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type FormEvent } from "react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

type SearchFormProps = {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchForm({ userName, setUserName }: SearchFormProps) {
  const { toast } = useToast();
  const [text, setText] = useState(userName);

  function handleSearch(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    if (text === "") {
      toast({
        description: "Please enter a valid username!",
      });
      return;
    }
    setUserName(text);
  }
  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center gap-x-2 w-full lg:w-1/3 mb-8">
      <Label htmlFor="search" className="sr-only">
        Search
      </Label>
      <Input
        type="text"
        id="search"
        value={text}
        onChange={(evt) => setText(evt.target.value)}
        placeholder="Search GitHub Users..."
        className="flex-grow bg-background"
      />
      <Button type="submit">Search🔎</Button>
    </form>
  );
}
