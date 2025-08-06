import { Backdrop, useTheme } from "@mui/material";
import { keyframes, styled } from "@mui/system";

const bounce = keyframes`
  0%, 100% {
    height: 15px;
    y: 13;
  }
  50% {
    height: 28px;
    y: 0;
  }
`;

const Bar = styled("rect")(({ delay }) => ({
  animation: `${bounce} 1.2s ease-in-out infinite`,
  animationDelay: delay,
}));

const Loader = ({ loading }) => {
  const theme = useTheme();

  return (
    <Backdrop sx={{ zIndex: 9999, color: theme.palette.common.white, backgroundColor: "rgba(255, 255, 255, 0.80)" }} open={loading}>
      <svg xmlns="http://www.w3.org/2000/svg" width="52" height="28" viewBox="0 0 52 28" fill="none">
        <Bar y="13" width="10" height="15" rx="5" fill="#303E8E" delay="0s" />
        <Bar x="14.0834" width="9.75" height="28" rx="4.875" fill="#303E8E" delay="0.4s" />
        <Bar x="28.1666" width="9.75" height="28" rx="4.875" fill="#303E8E" delay="0.1s" />
        <Bar x="42.25" width="9.75" height="28" rx="4.875" fill="#303E8E" delay="0.6s" />
      </svg>
    </Backdrop>
  );
};

export default Loader;
