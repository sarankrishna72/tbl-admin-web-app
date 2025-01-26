export const getObjValueFromPath = (obj: any, dotNotationString: any) => {
  const keys = dotNotationString.split('.');
  let current = obj;

  for (let i = 0; i < keys.length; i++) {
    if (current?.[keys?.[i]] === undefined) {
      return undefined; // or return a default value
    }
    current = current[keys[i]];
  }

  return current;
}


export const returnStatusClass = (status: string) => {
  switch (status.split(" ")?.join("")?.toLowerCase()) {
    case "completed":
      return "text-success-400";
    case "pending":
      return "text-error-500";
  }

  return '';
}

export const checkIsUrl = (text: string) => {
  try {
    new URL(text);
    return true;
  } catch {
    return false;
  }
}

export const checkActionShow = (action: any, data: any) => {
  return (typeof action.isShow == 'function' && action.isShow!(data) )|| !action.isShow
}