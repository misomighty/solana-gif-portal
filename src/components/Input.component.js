import React from "react";

const Input = ({ inputValue, setValue }) => {
  const onInputChange = (event) => setValue(event.target.value);
  const sendGif = async () => {
    if (inputValue.length > 0) {
      console.log('Gif link:', inputValue);
    } else {
      console.log('Empty input. Try again.');
    }
  };
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        sendGif();
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
