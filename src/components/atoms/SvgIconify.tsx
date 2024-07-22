import { svgSources } from "@/libs/helpers/icon";

interface SVGIconProps {
  name: string;
}

const SVGIconify: React.FC<SVGIconProps> = ({ name }) => {
  const SvgComponent = svgSources[name];

  if (!SvgComponent) {
    return null;
  }

  return <>{SvgComponent}</>;
};

export default SVGIconify;
