import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import TableTwo from "@/components/Tables/TableTwo";
import TableThree from "@/components/Tables/TableThree";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";



const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableThree/>
        <TableTwo />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
