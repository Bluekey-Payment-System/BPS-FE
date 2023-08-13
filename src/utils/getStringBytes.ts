const getStringBytes = (msg: string) => {
  let nbytes = 0;

  for (let i = 0; i < msg.length; i += 1) {
    const ch = msg.charAt(i);
    if (escape(ch).length > 4) {
      nbytes += 2;
    } else if (ch === "\n") {
      if (msg.charAt(i - 1) !== "\r") {
        nbytes += 1;
      }
    } else if (ch === "<" || ch === ">") {
      nbytes += 4;
    } else {
      nbytes += 1;
    }
  }

  return nbytes;
};

export default getStringBytes;
