import * as Types from "../common/models";
import "../common/styles/country.scss";

interface Props {
  data: Types.Country;
}

const Country: React.FC<Props> = ({ data }) => (
  <div className="country">
    <p>{data.name}</p>
    <p>{data.region}</p>
    <p>{data.area}</p>
  </div>
);

export { Country };
