import { useEffect, useRef } from 'react';

// executes when the user tries to close a window
function useBeforeUnload(handler) {
  useEffect(() => {
    window.addEventListener('beforeunload', handler);
  });
};

export default useBeforeUnload;
