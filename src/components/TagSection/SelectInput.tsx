import React, { RefObject } from "react";

import { TSuggestedTagList, TTagCategory, TTagType } from "../../types";

interface ITextInputProps {
  suggestedTags: TSuggestedTagList;
  addTag: (
    tagCategory: TTagCategory,
    tagType: TTagType,
    tagName: string
  ) => void;
  handleKeydown: (
    event: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>,
    inputRef: RefObject<HTMLSelectElement | HTMLInputElement>
  ) => void;
  finishAddingTags: () => void;
}

const SelectInput: React.FC<ITextInputProps> = ({
  addTag,
  handleKeydown,
  finishAddingTags,
  suggestedTags,
}) => {
  const inputRef = React.useRef<HTMLSelectElement>(null);

  // const handleKeydown = (event: React.KeyboardEvent<HTMLSelectElement>) => {
  //   if (!event.target.value) return;
  //   if (event.key === "Enter") {
  //     console.log("enter, input value: ", event.target.value);
  //     addTag(category, type, event.target.value);
  //     finishAddingTags();
  //   }
  //   if (event.key === "Tab") {
  //     event.preventDefault();
  //     addTag(category, type, event.target.value);
  //     if (inputRef.current) inputRef.current.value = "";
  //   }
  // };

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <select
      ref={inputRef}
      className="px-4 py-1 rounded-full outline-blue-400"
      onBlur={finishAddingTags}
      onKeyDown={(event) => handleKeydown(event, inputRef)}
    >
      {suggestedTags.map((name, i) => (
        <option key={`tag-option_${i}`}>{name}</option>
      ))}
    </select>
  );
};

export default SelectInput;
