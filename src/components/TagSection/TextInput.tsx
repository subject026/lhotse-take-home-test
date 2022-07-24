import React, { RefObject } from "react";

interface ITextInputProps {
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
      ref={inputRef}
      data-test="input-text"
      className="outline-blue-400 rounded-full px-4 py-1 w-32"
      type="text"
      onKeyDown={(event) => handleKeydown(event, inputRef)}
      onBlur={finishAddingTags}
    />
  );
};

export default TextInput;
