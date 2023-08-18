import React from "react";

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import MonthPickerDropdown from "@/components/common/MonthPicker/MonthPickerDropdown";

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async (context) => {
  // eslint-disable-next-line no-console
  console.log(context.params);
  return {
    props: { params: context.params },
  };
};

const KennyTestPage = ({ params } : { params: string }) => {
  // eslint-disable-next-line no-console
  console.log(params);
  const router = useRouter();
  // eslint-disable-next-line no-console
  console.log(router.query.month);
  return (
    <div style={{
      height: "100vh", display: "flex", justifyContent: "center", marginTop: "50px",
    }}
    >
      <MonthPickerDropdown />
    </div>

  );
};

export default KennyTestPage;
