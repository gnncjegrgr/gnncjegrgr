import { useState, useCallback } from 'react';

export default function useInput(initValue = null) {
  const [value, setter] = useState(initValue);
  const handler = useCallback((e) => {
    setter(e.target.value);
  }, []);
  return [value, handler];
}
