import { GetServerSideProps, GetStaticPaths } from "next";
import TodoInfo from "@/components/toDo/TodoInfo";
import styled, { keyframes } from "styled-components";
import { ParsedUrlQuery } from "querystring";
import { ReactElement, useRef } from "react";
import TodoOperationsLayout from "@/pages/query/layout";
import { useOutsideDetect } from "@/hooks/dom/useOutsideDetect";
import { useTodoContext } from "@/hooks/context/useTodoContext";

type RouteProps = { params?: { _id: string } };

// export async function getStaticProps({ params }: RouteProps) {
//   return {
//     props: { params },
//   };
// }
// export const getStaticPaths: GetStaticPaths<
//   NonNullable<RouteProps["params"]>
// > = async () => {
//   return {
//     paths: [],
//     fallback: true,
//   };
// };

export const getServerSideProps: ({ params }: { params: any }) => Promise<{
  props: { params: ParsedUrlQuery };
}> = async ({ params }) => {
  return {
    props: { params },
  };
};

const ChangeTodoPage = (props: RouteProps) => {
  const {
    operations: { setIsTodoOptionVisible },
  } = useTodoContext();
  const id = props.params?._id;

  const wrapperRef = useRef(null);
  useOutsideDetect({
    ref: wrapperRef,
    setVisibleState: setIsTodoOptionVisible,
  });

  if (id === undefined) {
    return <>No id</>;
  }

  return (
    <StyledTodoChangeForm ref={wrapperRef}>
      <TodoInfo id={id} />
    </StyledTodoChangeForm>
  );
};

export default ChangeTodoPage;

ChangeTodoPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <TodoOperationsLayout>
      <>{page}</>
    </TodoOperationsLayout>
  );
};

const slideInAnimation = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const StyledTodoChangeForm = styled.div`
  position: fixed;
  display: grid;

  width: 19.5%;
  height: 19%;

  animation: ${slideInAnimation} 0.5s ease;

  left: 80%;
  top: 10%;
  right: 0;

  border: 1px solid;
  border-radius: 5px;
`;
