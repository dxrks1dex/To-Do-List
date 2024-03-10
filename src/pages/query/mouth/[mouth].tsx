import { ReactElement } from "react";
import TodoOperationsLayout from "@/pages/query/layout";

const MouthPage = () => {};

export default MouthPage;

MouthPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <TodoOperationsLayout>
      <>{page}</>
    </TodoOperationsLayout>
  );
};
