import React from "react";

const Input = ({ inputValue, setValue, setList, sendGif, getGifList }) => {
  const onInputChange = (event) => setValue(event.target.value);
  // const { getGifList, sendGif } = useAccountHook()
  const onSubmit = async () => {
    if (inputValue.length === 0) {
      console.log("No gif link given!")
      return
    }
    console.log('Gif link:', inputValue);
    try {
      sendGif(inputValue);
      await getGifList().then(res => setList(res));
    } catch (error) {
      console.log("Error sending GIF:", error)
    }
  };
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
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
