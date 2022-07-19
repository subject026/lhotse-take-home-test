import React, { RefObject } from "react";

import { TTagCategory, TTagType } from "../../types";

interface ITextInputProps {
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

const TextInput: React.FC<ITextInputProps> = ({
  handleKeydown,
  finishAddingTags,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  //
  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <input
      className="outline-blue-400 rounded-full px-4 py-1 w-32"
      ref={inputRef}
      type="text"
      onKeyDown={(event) => handleKeydown(event, inputRef)}
      onBlur={finishAddingTags}
    />
  );
};

export default TextInput;
