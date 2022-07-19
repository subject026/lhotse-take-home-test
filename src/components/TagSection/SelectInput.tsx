import React from "react";

import {
  ITagMeta,
  TSuggestedTagList,
  TTagCategory,
  TTagType,
} from "../../types";

interface ITextInputProps {
  addTag: (
    tagCategory: TTagCategory,
    tagType: TTagType,
    tagName: string
  ) => void;
  finishAddingTags: () => void;
  tagMeta: ITagMeta;
  suggestedTags: TSuggestedTagList;
}

const SelectInput: React.FC<ITextInputProps> = ({
  addTag,
  finishAddingTags,
  tagMeta: { category, type },
  suggestedTags,
}) => {
  const inputRef = React.useRef<HTMLSelectElement>(null);

  const handleKeydown = (event: React.KeyboardEvent<HTMLSelectElement>) => {
    if (!event.target.value) return;
    if (event.key === "Enter") {
      console.log("enter, input value: ", event.target.value);
      addTag(category, type, event.target.value);
      finishAddingTags();
    }
    if (event.key === "Tab") {
      event.preventDefault();
      addTag(category, type, event.target.value);
      if (inputRef.current) inputRef.current.value = "";
    }
  };
  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <select
      ref={inputRef}
      className="px-4 py-1 rounded-full outline-blue-400"
      onBlur={finishAddingTags}
      onKeyDown={handleKeydown}
    >
      {suggestedTags.map((name, i) => (
        <option key={`tag-option_${i}`}>{name}</option>
      ))}
    </select>
  );
};

export default SelectInput;
