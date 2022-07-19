import React from "react";

import { ITagMeta, TTagCategory, TTagType } from "../../types";

interface ITextInputProps {
  addTag: (
    tagCategory: TTagCategory,
    tagType: TTagType,
    tagName: string
  ) => void;
  tagMeta: ITagMeta;
  finishAddingTags: () => void;
}

const TextInput: React.FC<ITextInputProps> = ({
  addTag,
  finishAddingTags,
  tagMeta: { category, type },
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (!event.target.value) {
        inputRef.current?.blur();
        return;
      }
      addTag(category, type, event.target.value);
      finishAddingTags();
    }
    if (event.key === "Tab") {
      if (!event.target.value) {
        inputRef.current?.blur();
        return;
      }
      event.preventDefault();
      addTag(category, type, event.target.value);
      if (inputRef.current) inputRef.current.value = "";
    }
  };
  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <input
      className="outline-blue-400 rounded-full px-4 py-1 w-32"
      ref={inputRef}
      type="text"
      onKeyDown={handleKeydown}
      onBlur={finishAddingTags}
    />
  );
};

export default TextInput;
