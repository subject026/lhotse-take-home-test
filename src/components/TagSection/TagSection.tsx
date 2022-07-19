import React from "react";

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
  tagMeta,
  addTag,
  removeTag,
  suggestedTags,
}) => {
  const [isAddingTags, setIsAddingTags] = React.useState(true);

  return (
    <section>
      <h3 className="text-gray-700 mb-2">{displayName}</h3>
      <ul className="h-8 flex flex-row flex-wrap gap-2">
        {tagList.map((tagData, i) => (
          <Tag
            key={`${tagMeta.category}_${tagData.id}`}
            tagData={tagData}
            category={tagMeta.category}
            isFirstTag={i === 0}
            removeTag={removeTag}
          />
        ))}
        {isAddingTags &&
          (suggestedTags ? (
            <SelectInput
              tagMeta={tagMeta}
              finishAddingTags={() => setIsAddingTags(false)}
              addTag={addTag}
              suggestedTags={suggestedTags}
            />
          ) : (
            <TextInput
              tagMeta={tagMeta}
              finishAddingTags={() => setIsAddingTags(false)}
              addTag={addTag}
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
