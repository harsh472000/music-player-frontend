import { musicSidebarImage } from "../../utils/images";
import { StyledRightBoxWrapper } from "./StyledComponent";

const RightIntro = () => {
  return (
    <StyledRightBoxWrapper>
      <img
        src={musicSidebarImage}
        alt="mac-book"
        style={{ width: "100%", maxHeight: "100vh", objectFit: "cover" }}
      />
    </StyledRightBoxWrapper>
  );
};

export default RightIntro;
