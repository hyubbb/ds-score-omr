import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const FormProviderWrapper = ({ children }: any) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default FormProviderWrapper;
