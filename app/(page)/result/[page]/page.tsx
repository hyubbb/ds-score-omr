import React from "react";
import Container from "../_components/Container";
import { notFound, redirect } from "next/navigation";
import NotFound from "@/app/[...not_found]/page";

const page = ({ params }: { params: { page: string } }) => {
  console.log(params);

  if (params.page === "personal" || params.page === "group") {
    return <Container params={params} />;
  }

  return redirect("/not_found");
};

export default page;
