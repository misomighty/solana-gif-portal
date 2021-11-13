import React from "react";

const Input = ({ inputValue, setValue }) => {
  const onInputChange = (event) => setValue(event.target.value);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <input
        type="text"
        placeholder="Enter gif link!"
        value={inputValue}
        onChange={onInputChange}
      />
      <button type="submit" className="cta-button submit-gif-button">
        Submit
      </button>
    </form>
  );
};

export { Input };
