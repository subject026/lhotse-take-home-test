import React, { RefObject } from "react";

import AddTagButton from "./AddTagButton";
import SelectInput from "./SelectInput";
import Tag from "./Tag";
import TextInput from "./TextInput";

import type { ITagData, ITagMeta, TTagCategory, TTagType } from "../../types";

interface ITagSectionProps {
  displayName: string;
  tagMeta: ITagMeta;
  tagList: ITagData[];
  suggestedTags?: string[];
  addTag: (
    tagCategory: TTagCategory,
    tagType: TTagType,
    tagName: string
  ) => void;
  removeTag: (tagCategory: TTagCategory, tagId: number) => void;
}

const TagSection: React.FC<ITagSectionProps> = ({
  displayName,
  tagList,
  tagMeta: { category, type },
  addTag,
  removeTag,
  suggestedTags,
}) => {
  const [isAddingTags, setIsAddingTags] = React.useState(true);

  const handleKeydown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>,
    inputRef: RefObject<HTMLSelectElement | HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      if (!event.target.value) {
        inputRef.current?.blur();
        return;
      }
      addTag(category, type, event.target.value);
      setIsAddingTags(false);
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

  const finishAddingTags = () => {
    setIsAddingTags(false);
  };

  return (
    <section>
      <h3 className="text-gray-700 mb-2">{displayName}</h3>
      <ul className="h-8 flex flex-row flex-wrap gap-2">
        {tagList.map((tagData, i) => (
          <Tag
            key={`${category}_${tagData.id}`}
            tagData={tagData}
            category={category}
            isFirstTag={i === 0}
            removeTag={removeTag}
          />
        ))}
        {isAddingTags &&
          (suggestedTags ? (
            <SelectInput
              addTag={addTag}
              handleKeydown={handleKeydown}
              finishAddingTags={finishAddingTags}
              suggestedTags={suggestedTags}
            />
          ) : (
            <TextInput
              addTag={addTag}
              handleKeydown={handleKeydown}
              finishAddingTags={finishAddingTags}
            />
          ))}
        {!isAddingTags && (
          <AddTagButton onClick={() => setIsAddingTags(true)} />
        )}
      </ul>
    </section>
  );
};

export default TagSection;
