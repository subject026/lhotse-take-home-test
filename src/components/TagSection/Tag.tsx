import React from "react";

import { ITagData, TTagCategory } from "../../types";

interface ITagProps {
  tagData: ITagData;
  isFirstTag: boolean;
  category: TTagCategory;
  removeTag: (tagCategory: TTagCategory, tagId: number) => void;
}

const Tag: React.FC<ITagProps> = ({
  tagData,
  isFirstTag,
  category,
  removeTag,
}) => {
  return (
    <li className="bg-neutral-200 px-3 py-1 rounded-full outline-white flex items-center">
      <span data-test="tag-text">{tagData.name}</span>
      {!isFirstTag && (
        <button
          className="pl-2 text-gray-500 hover:text-gray-800"
          onClick={() => removeTag(category, tagData.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </li>
  );
};

export default Tag;
