import { Oval } from "react-loader-spinner";

export const LoaderSpinner = () => {
  return (
    <Oval
      height="20"
      width="20"
      color="blue"
      secondaryColor="white"
      wrapperStyle={{ justifyContent: "center" }}
      ariaLabel="oval-loading"
    />
  );
};
