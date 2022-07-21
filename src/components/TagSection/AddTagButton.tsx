interface IAddTagButton {
  onClick: () => void;
}

const AddTagButton: React.FC<IAddTagButton> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-1 px-4 py-1 text-gray-800 hover:text-gray-900"
    data-js="btn-add-tag"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
        clipRule="evenodd"
      />
    </svg>
    New Tag
  </button>
);

export default AddTagButton;
