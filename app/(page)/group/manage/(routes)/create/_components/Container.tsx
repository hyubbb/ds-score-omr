"use client";
import React from "react";
import SearchForm from "./SearchForm";
import { FormProvider, useForm } from "react-hook-form";
import { IGroupList } from "../../../_types/types";
import { dummyData } from "../../../_components/dummyData";

const Container = () => {
  const methods = useForm({
    defaultValues: {
      region: "",
      groupName: "",
      image: "",
    },
  });

  return (
    <section className="flex flex-col gap-6">
      <FormProvider {...methods}>
        <SearchForm />
      </FormProvider>
    </section>
  );
};

export default Container;
