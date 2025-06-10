interface selectOptionObj {
  label: string;
  value: string | number;
}

interface paramsObj {
  [key: string]: string;
}

// key, value 형태의 객체를 배열로 만들어주는 것
export const getSelectOption = (object: paramsObj, baseValue?: selectOptionObj) => {
  if (baseValue) {
    const arrayWithSelection = [baseValue, ...Object.entries(object).map(([value, label]) => ({ label, value }))];
    return arrayWithSelection;
  } else {
    const arrayWithSelection = [
      { label: '선택', value: '' },
      ...Object.entries(object).map(([value, label]) => ({ label, value })),
    ];
    return arrayWithSelection;
  }
};
// key, value 형태의 객체를 배열로 만들어주는 것 base없이 이넘으로만
export const getOnlySelectOption = (object: paramsObj): selectOptionObj[] => {
  const arrayWithSelection = [...Object.entries(object).map(([value, label]) => ({ label, value }))];
  return arrayWithSelection;
};

export const sizeSelectOption = [
  { label: '10', value: 10 },
  { label: '25', value: 25 },
  { label: '50', value: 50 },
  { label: '100', value: 100 },
];

export const responseType = {
  Y: 'Y',
  N: 'N',
};
