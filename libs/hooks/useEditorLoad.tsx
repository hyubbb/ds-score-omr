'use client';

import { useState } from 'react';

// CkEditor 로딩 상태를 가져오기 위한
const useEditorLoad = () => {
  const [isEditorLoad, setIsEditorLoad] = useState(false);

  const getEditorLoading = (data: boolean) => {
    setIsEditorLoad(data);
  };

  return { isEditorLoad, getEditorLoading };
};

export default useEditorLoad;
