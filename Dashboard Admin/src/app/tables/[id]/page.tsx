"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";


import TableThree from "@/components/Tables/TableThree";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useSearchParams } from "next/navigation";





// export const metadata: Metadata = {
//   title: "Admin Dashboard",
  
// };

const TablesPageDetail = ({params}: {params: {id: string}}) => {
    const searchParams = useSearchParams();
    const firstName = searchParams.get("firstName");
    const lastName = searchParams.get("lastname");
    // console.log(firstName,lastName);
    console.log(lastName,firstName);





  
  

    return (
      <DefaultLayout>
        <Breadcrumb pageName="Tables" />
  
        <div className="flex flex-col gap-10">
            
          <TableThree id={params.id} firstName={firstName} lastName={lastName} />
        </div>
      </DefaultLayout>
    );
  };
  
  export default TablesPageDetail;

  