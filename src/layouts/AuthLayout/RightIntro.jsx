import { AuthSidebarImageSvg } from "../../utils/images";
import { StyledRightBoxWrapper } from "./StyledComponent";

const RightIntro = () => {
  return (
    <StyledRightBoxWrapper>
      <img src={AuthSidebarImageSvg} alt="mac-book" style={{ width: "100%", maxHeight: "100vh", objectFit: "contain" }} />
    </StyledRightBoxWrapper>
  );
};

export default RightIntro;
