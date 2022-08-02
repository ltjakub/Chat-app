const DisplayMessage = ({ messages }) => {
  return messages.map((item, index) => {
    let name = item.userName;
    if (!item.userName) {
      name = item.id;
    }
    console.log(item);
    return (
      <>
        <p>
          {item.date} {name}: {item.input}
        </p>
      </>
    );
  });
};
export default DisplayMessage;
